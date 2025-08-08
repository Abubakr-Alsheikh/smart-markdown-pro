"use client";

import { useDocumentStore } from "@/lib/store/useDocumentStore";

export function EditorPane() {
  const activeDocument = useDocumentStore((state) =>
    state.activeDocumentId ? state.documents[state.activeDocumentId] : null
  );

  const updateActiveDocumentContent = useDocumentStore(
    (state) => state.updateActiveDocumentContent
  );

  if (!activeDocument) {
    return (
      <div className="flex h-full w-full items-center justify-center p-4 text-center text-muted-foreground">
        Select a document or create a new one to start writing.
      </div>
    );
  }

  return (
    <div className="h-full w-full ">
      <textarea
        key={activeDocument.id}
        value={activeDocument.content}
        onChange={(e) => updateActiveDocumentContent(e.target.value)}
        className="min-h-full w-full resize-none border-none bg-transparent p-4 font-mono text-base outline-none"
        placeholder="Start typing your markdown here..."
      />
    </div>
  );
}
