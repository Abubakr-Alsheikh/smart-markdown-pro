"use client";

import { useDocumentStore } from "@/lib/store/useDocumentStore";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";

export function PreviewPane() {
  const content = useDocumentStore((state) => state.content);

  return (
    <div
      className={cn(
        "prose dark:prose-invert max-w-none",
        "h-full w-full overflow-y-auto p-4 focus:outline-none"
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypePrism, { showLineNumbers: true }]]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
