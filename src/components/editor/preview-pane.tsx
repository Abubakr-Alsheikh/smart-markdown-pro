"use client";

// Import our new settings store
import { useSettingsStore } from "@/lib/store/useSettingsStore";
import { useDocumentStore } from "@/lib/store/useDocumentStore";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";

export function PreviewPane() {
  // Get the content from the document store
  const content = useDocumentStore((state) => {
    if (!state.activeDocumentId) return "";
    return state.documents[state.activeDocumentId]?.content ?? "";
  });

  // Get the settings from the settings store
  const { isRTL, fontSize } = useSettingsStore();

  return (
    <div
      // Add the dir and style props here
      dir={isRTL ? "rtl" : "ltr"}
      style={
        {
          "font-size": `${fontSize}px`,
        } as React.CSSProperties
      }
      className={cn(
        "prose dark:prose-invert max-w-none h-full w-full overflow-y-auto p-4 focus:outline-none"
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
  );
}
