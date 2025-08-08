"use client";

import { useDocumentStore } from "@/lib/store/useDocumentStore";

export function EditorPane() {
  const { getActiveDocument, updateActiveDocumentContent } = useDocumentStore();
  const activeDocument = getActiveDocument();

  // Handle case where no document is active
  if (!activeDocument) {
    return (
      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
        Select a document or create a new one to start writing.
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <textarea
        key={activeDocument.id} // IMPORTANT: Force re-render when switching docs
        value={activeDocument.content}
        onChange={(e) => updateActiveDocumentContent(e.target.value)}
        className="h-full w-full resize-none border-none bg-transparent p-4 font-mono text-base outline-none"
        placeholder="Start typing your markdown here..."
      />
    </div>
  );
}
