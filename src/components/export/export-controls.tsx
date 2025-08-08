"use client";

import React from "react";
import { useDocumentStore } from "@/lib/store/useDocumentStore";
import { Button } from "@/components/ui/button";
import { Download, Copy, FileText, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Keep the downloadFile helper, as it's still useful!
function downloadFile(content: Blob, fileName: string) {
  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function ExportControls() {
  const [isGeneratingPdf, setIsGeneratingPdf] = React.useState(false);

  const activeDocument = useDocumentStore((state) =>
    state.activeDocumentId ? state.documents[state.activeDocumentId] : null
  );

  const handleDownloadMarkdown = () => {
    if (!activeDocument) return;
    const blob = new Blob([activeDocument.content], { type: "text/markdown" });
    downloadFile(blob, `${activeDocument.title}.md`);
    toast.success("Markdown file downloaded!");
  };

  const handleCopyHtml = async () => {
    if (!activeDocument) {
      toast.error("No active document to copy.");
      return;
    }

    try {
      // Find the preview pane's content on the page
      const previewElement = document.querySelector(".prose");
      if (!previewElement) {
        throw new Error("Could not find preview element.");
      }

      const htmlContent = previewElement.innerHTML;
      await navigator.clipboard.writeText(htmlContent);
      toast.success("HTML copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy HTML:", error);
      toast.error("Could not copy HTML to clipboard.");
    }
  };

  // --- FINAL, ROBUST PDF DOWNLOAD HANDLER ---
  const handleDownloadPdf = async () => {
    if (!activeDocument) {
      toast.error("No active document to export.");
      return;
    }
    const previewElement = document.querySelector(".prose");
    if (!previewElement) {
      toast.error("Could not find preview content to export.");
      return;
    }

    setIsGeneratingPdf(true);
    toast.info("Generating PDF on our server, please wait...");

    try {
      // 1. Call our new backend endpoint
      const response = await fetch("/api/export/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          htmlContent: previewElement.innerHTML,
          documentTitle: activeDocument.title,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      // 2. Get the PDF blob from the response
      const pdfBlob = await response.blob();

      // 3. Trigger the download
      const fileNameHeader = response.headers.get("content-disposition");
      const fileName =
        fileNameHeader?.split("filename=")[1].replace(/"/g, "") ||
        "document.pdf";
      downloadFile(pdfBlob, fileName);

      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF generation failed:", err);
      toast.error("An unexpected error occurred while generating the PDF.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="mt-auto flex flex-col gap-2 border-t p-4">
      <h3 className="mb-2 text-sm font-semibold text-muted-foreground">
        Export Options
      </h3>

      {/* --- NEW: PDF Export Button --- */}
      <Button
        variant="outline"
        onClick={handleDownloadPdf}
        disabled={!activeDocument || isGeneratingPdf}
      >
        {isGeneratingPdf ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileText className="mr-2 h-4 w-4" />
        )}
        Download as PDF
      </Button>

      <Button
        variant="outline"
        onClick={handleDownloadMarkdown}
        disabled={!activeDocument || isGeneratingPdf}
      >
        <Download className="mr-2 h-4 w-4" />
        Download as Markdown
      </Button>
      <Button
        variant="outline"
        onClick={handleCopyHtml}
        disabled={!activeDocument || isGeneratingPdf}
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy as HTML
      </Button>
    </div>
  );
}
