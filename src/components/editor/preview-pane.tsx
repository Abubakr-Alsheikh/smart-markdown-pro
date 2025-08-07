"use client";

import { useDocumentStore } from "@/lib/store/useDocumentStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils"; // Import our utility function

export function PreviewPane() {
  const content = useDocumentStore((state) => state.content);

  return (
    // Apply the prose classes to the parent div.
    // This div will now correctly style all the h1, p, ul, etc. rendered by ReactMarkdown.
    <div
      className={cn(
        "prose prose-invert max-w-none h-full w-full overflow-y-auto p-4 focus:outline-none"
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
