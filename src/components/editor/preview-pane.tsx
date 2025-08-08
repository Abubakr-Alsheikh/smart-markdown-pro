"use client";

import { useDocumentStore } from "@/lib/store/useDocumentStore";
import { useSettingsStore } from "@/lib/store/useSettingsStore";
import { cn } from "@/lib/utils";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";

export function PreviewPane() {
  const content = useDocumentStore((state) => {
    if (!state.activeDocumentId) return "";
    return state.documents[state.activeDocumentId]?.content ?? "";
  });

  const { isRTL, fontSize } = useSettingsStore();

  // THIS IS THE NEW, SIMPLIFIED STRUCTURE
  // A simple div that handles scrolling for its child.
  return (
    <div className="h-full w-full overflow-y-auto">
      <div
        dir={isRTL ? "rtl" : "ltr"}
        style={{ fontSize: `${fontSize}px` } as React.CSSProperties}
        className={cn(
          "prose prose-invert max-w-none min-h-full w-full p-4 focus:outline-none"
        )}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeRaw,
            [rehypePrism, { showLineNumbers: true, ignoreMissing: true }],
          ]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
