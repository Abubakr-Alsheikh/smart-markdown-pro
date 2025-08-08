import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import fs from "fs/promises"; // <-- Import Node.js File System module
import path from "path"; // <-- Import Node.js Path module

// Helper function to fetch the application's global CSS by reading the file
async function getAppCss() {
  try {
    // Construct the correct path to the globals.css file
    // process.cwd() gives the root of your project
    const cssPath = path.join(process.cwd(), "src", "app", "globals.css");
    const css = await fs.readFile(cssPath, "utf-8");

    // Also read the prism theme file
    const prismPath = path.join(
      process.cwd(),
      "src",
      "styles",
      "prism-tomorrow.css"
    );
    const prismCss = await fs.readFile(prismPath, "utf-8");

    // Combine both stylesheets
    return `${css}\n${prismCss}`;
  } catch (error) {
    console.error("Error reading CSS files:", error);
    return ""; // Return empty string on failure
  }
}

export async function POST(req: NextRequest) {
  let browser = null;
  try {
    const { htmlContent, documentTitle, settings } = await req.json();
    if (!htmlContent) {
      return NextResponse.json(
        { error: "Missing htmlContent" },
        { status: 400 }
      );
    }

    // This now reads the files directly from the disk
    const appCss = await getAppCss();

    const direction = settings?.isRTL ? "rtl" : "ltr";
    const inlineStyles = [
      settings?.fontSize ? `font-size: ${settings.fontSize}px;` : "",
      settings?.fontFamily ? `font-family: ${settings.fontFamily};` : "",
    ].join(" ");

    let executablePath: string;
    if (process.env.VERCEL) {
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
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
      executablePath = localChromePath;
    }

    browser = await puppeteer.launch({
      executablePath,
      args: process.env.VERCEL ? chromium.args : [],
      headless: "shell",
    });

    const page = await browser.newPage();

    // Construct the final HTML for Puppeteer
    const finalHtml = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF--8">
          <style>${appCss}</style>
          ${
            // Inject the Google Font link if it exists
            settings?.fontFamily
              ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily
                  .split(",")[0]
                  .replace(/['"]/g, "")
                  .replace(
                    " ",
                    "+"
                  )}:wght@200..700&display=swap" rel="stylesheet">`
              : ""
          }
        </head>
        <body class="dark bg-background">
          <div 
            class="prose prose-invert p-4"
            dir="${direction}" 
            style="${inlineStyles}"
          >
            ${htmlContent}
          </div>
        </body>
      </html>
    `;

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "0.5in", right: "0.5in", bottom: "0.5in", left: "0.5in" },
    });

    await browser.close();

    const webStandardBuffer = new Uint8Array(pdfBuffer);

    // 2. Create the Blob from this new, type-safe buffer.
    const pdfBlob = new Blob([webStandardBuffer], { type: "application/pdf" });

    const sanitizedTitle = (documentTitle || "document")
      .replace(/[^a-z0-9]/gi, "_")
      .toLowerCase();
    const headers = new Headers();
    headers.set("Content-Type", "application/pdf");
    headers.set(
      "Content-Disposition",
      `attachment; filename="${sanitizedTitle}.pdf"`
    );

    // 3. Pass the valid Blob to the NextResponse.
    return new NextResponse(pdfBlob, { headers });
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
