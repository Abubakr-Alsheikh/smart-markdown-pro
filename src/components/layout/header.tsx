"use client"; // This component now needs client-side state hooks

import { useDocumentStore } from "@/lib/store/useDocumentStore";
import { AiFormatButton } from "@/components/editor/ai-format-button";
import { FileManagementSidebar } from "./file-management-sidebar";
import { Input } from "@/components/ui/input";

export function Header() {
  const { getActiveDocument, updateActiveDocumentTitle } = useDocumentStore();
  const activeDocument = getActiveDocument();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <FileManagementSidebar />
      <div className="flex-1">
        {activeDocument && (
          <Input
            key={activeDocument.id} // Force re-render on doc change
            defaultValue={activeDocument.title}
            onChange={(e) => updateActiveDocumentTitle(e.target.value)}
            className="w-full max-w-sm border-none bg-transparent text-lg font-semibold focus-visible:ring-0"
          />
        )}
      </div>
      <div className="ml-auto">
        <AiFormatButton />
      </div>
    </header>
  );
}
