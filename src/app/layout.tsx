import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"; // Shadcn uses Sonner for toasts
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import "./globals.css";
import { FontLoader } from "@/components/settings/font-loader";
import { ThemeProvider } from "@/components/theme/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // --- Core Metadata ---
  title: {
    default: "Smart Markdown Pro | AI-Powered Live Editor",
    template: "%s | Smart Markdown Pro",
  },
  description:
    "A modern, AI-powered markdown editor with a real-time, side-by-side live preview. Customize your preview, format text instantly with AI, and export your work to MD, HTML, or PDF. All local, no account needed.",

  // --- Keywords & Audience ---
  keywords: [
    "Markdown Editor",
    "Live Preview Markdown",
    "AI Markdown Formatting",
    "Next.js",
    "React",
    "Tailwind CSS",
    "Local-first",
    "GitHub Flavored Markdown",
    "GFM Editor",
    "Online Markdown Tool",
  ],
  authors: [
    {
      name: "Abubakr Alsheikh",
      url: "https://abubakr-alsheikh.github.io/my-portfolio/",
    },
  ],
  creator: "Abubakr Alsheikh",

  // --- Open Graph (for Social Media Sharing) ---
  openGraph: {
    title: "Smart Markdown Pro | AI-Powered Live Editor",
    description:
      "The ultimate markdown editor with a live, customizable preview and AI formatting.",
    url: "https://smart-markdown-pro.vercel.app",
    siteName: "Smart Markdown Pro",
    images: [
      {
        url: "/og-image.png", // We will create this image next
        width: 1200,
        height: 630,
        alt: "Smart Markdown Pro Editor Interface",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // --- Twitter Card (for Twitter Sharing) ---
  twitter: {
    card: "summary_large_image",
    title: "Smart Markdown Pro | AI-Powered Live Editor",
    description:
      "Instantly format text, see a live preview, and export your work. The modern markdown editor for developers and writers.",
    creator: "@your_twitter_handle", // Replace with your Twitter handle
    images: ["/og-image.png"], // Re-use the Open Graph image
  },

  // --- Viewport & Theme Color ---
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],

  // --- Icons & Manifest ---
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {" "}
      {/* <-- Add suppressHydrationWarning */}
      <FontLoader />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-screen w-full flex-col">
            <Header />
            <main className="flex flex-1 flex-col overflow-hidden">
              {children}
            </main>
          </div>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
