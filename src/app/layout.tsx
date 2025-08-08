import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner"; // Shadcn uses Sonner for toasts
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Markdown Pro",
  description: "AI-Powered Markdown Editor",
};

import { FontLoader } from "@/components/settings/font-loader"; // <-- Import

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <FontLoader /> {/* <-- Add the component here */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <div className="flex h-screen w-full flex-col">
          <Header />
          {/* The <main> tag now grows to fill the remaining space and handles overflow */}
          <main className="flex flex-1 flex-col overflow-hidden">
            {children}
          </main>
        </div>
        <Toaster richColors />
      </body>
    </html>
  );
}
