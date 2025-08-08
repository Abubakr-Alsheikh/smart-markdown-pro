'use client';

import { useDocumentStore } from '@/lib/store/useDocumentStore';
import { Button } from '@/components/ui/button';
import { Download, Copy } from 'lucide-react';
import { toast } from 'sonner';

// A helper function to create and download a file
function downloadFile(content: string, fileName: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function ExportControls() {
  const activeDocument = useDocumentStore((state) =>
    state.activeDocumentId ? state.documents[state.activeDocumentId] : null
  );

  const handleDownloadMarkdown = () => {
    if (!activeDocument) {
      toast.error('No active document to download.');
      return;
    }
    
    // Sanitize title to create a valid filename
    const fileName = `${activeDocument.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.md`;
    downloadFile(activeDocument.content, fileName, 'text/markdown');
    toast.success('Markdown file downloaded!');
  };

  const handleCopyHtml = async () => {
    if (!activeDocument) {
      toast.error('No active document to copy.');
      return;
    }

    try {
      // Find the preview pane's content on the page
      const previewElement = document.querySelector('.prose');
      if (!previewElement) {
        throw new Error('Could not find preview element.');
      }
      
      const htmlContent = previewElement.innerHTML;
      await navigator.clipboard.writeText(htmlContent);
      toast.success('HTML copied to clipboard!');

    } catch (error) {
      console.error('Failed to copy HTML:', error);
      toast.error('Could not copy HTML to clipboard.');
    }
  };

  return (
    <div className="mt-auto flex flex-col gap-2 border-t p-4">
      <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Export Options</h3>
      <Button
        variant="outline"
        onClick={handleDownloadMarkdown}
        disabled={!activeDocument}
      >
        <Download className="mr-2 h-4 w-4" />
        Download as Markdown
      </Button>
      <Button
        variant="outline"
        onClick={handleCopyHtml}
        disabled={!activeDocument}
      >
        <Copy className="mr-2 h-4 w-4" />
        Copy as HTML
      </Button>
    </div>
  );
}
