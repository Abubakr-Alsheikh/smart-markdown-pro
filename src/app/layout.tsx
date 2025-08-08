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
  title: "Smart Markdown Pro",
  description: "AI-Powered Markdown Editor",
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
