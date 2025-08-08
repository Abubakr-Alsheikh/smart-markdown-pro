import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

// Helper function to fetch the application's global CSS (no change here)
async function getAppCss() {
  const url = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/globals.css`
    : "http://localhost:3000/globals.css";
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok)
      throw new Error(`Failed to fetch CSS: ${response.statusText}`);
    return await response.text();
  } catch (error) {
    console.error(`Error fetching CSS from ${url}:`, error);
    return "";
  }
}

export async function POST(req: NextRequest) {
  let browser = null;
  try {
    const { htmlContent, documentTitle } = await req.json();
    if (!htmlContent) {
      return NextResponse.json(
        { error: "Missing htmlContent" },
        { status: 400 }
      );
    }

    const appCss = await getAppCss();

    // --- THIS IS THE ENVIRONMENT-AWARE FIX ---
    let executablePath: string;

    if (process.env.VERCEL) {
      // Use the serverless-optimized chromium package on Vercel
      executablePath = await chromium.executablePath();
    } else {
      // For local development, use your locally installed Chrome browser.
      // You MUST update this path to where Chrome is installed on your machine.
      // Common paths:
      // Windows: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      //          'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
      // macOS:   '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      // Linux:   '/usr/bin/google-chrome'
      const localChromePath =
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"; // <-- CHECK AND UPDATE THIS PATH
      executablePath = localChromePath;
    }

    // --- MODERNIZED LAUNCH OPTIONS ---
    browser = await puppeteer.launch({
      executablePath,
      args: process.env.VERCEL ? chromium.args : [], // Use chromium args only on Vercel
      headless: "shell", // The modern headless mode
    });
    // --- END OF FIXES ---

    const page = await browser.newPage();
    await page.setContent(
      `
      <!DOCTYPE html>
      <html>
        <head><style>${appCss}</style></head>
        <body class="dark bg-background">
          <div class="prose prose-invert p-4">${htmlContent}</div>
        </body>
      </html>
    `,
      { waitUntil: "networkidle0" }
    );

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0.5in", right: "0.5in", bottom: "0.5in", left: "0.5in" },
    });

    const sanitizedTitle = (documentTitle || "document")
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      `attachment; filename="${sanitizedTitle}.pdf"`
    );

    return new NextResponse(pdfBuffer, { headers });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    if (error instanceof Error && error.message.includes("ENOENT")) {
      return NextResponse.json(
        {
          error:
            "Failed to find local Chrome installation. Please update the path in the API route file.",
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to generate PDF." },
      { status: 500 }
    );
  } finally {
    if (browser !== null) {
      await browser.close();
    }
  }
}
