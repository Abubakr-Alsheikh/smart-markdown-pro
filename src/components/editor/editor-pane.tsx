"use client";

import { useDocumentStore } from "@/lib/store/useDocumentStore";

export function EditorPane() {
  // Connect to the global state
  const { content, setContent } = useDocumentStore();

  return (
    <div className="h-full w-full">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="h-full w-full resize-none border-none bg-transparent p-4 font-mono text-base outline-none"
        placeholder="Start typing your markdown here..."
      />
    </div>
  );
}
