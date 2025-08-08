"use client";

import { useDocumentStore } from "@/lib/store/useDocumentStore";
import { AiFormatButton } from "@/components/editor/ai-format-button";
import { FileManagementSidebar } from "./file-management-sidebar";
import { Input } from "@/components/ui/input";

import { SettingsDialog } from "../settings/settings-dialog";
import { ThemeToggle } from "../theme/theme-toggle";

export function Header() {
  const activeDocument = useDocumentStore((state) =>
    state.activeDocumentId ? state.documents[state.activeDocumentId] : null
  );
  const updateActiveDocumentTitle = useDocumentStore(
    (state) => state.updateActiveDocumentTitle
  );

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <FileManagementSidebar />
      <div className="flex-1">
        {activeDocument ? (
          <Input
            key={activeDocument.id}
            defaultValue={activeDocument.title}
            onChange={(e) => updateActiveDocumentTitle(e.target.value)}
            className="w-full max-w-sm border-none bg-transparent text-lg font-semibold focus-visible:ring-0"
          />
        ) : (
          <div className="w-full max-w-sm text-lg font-semibold text-muted-foreground">
            No Document Selected
          </div>
        )}
      </div>
      <div className="ml-auto flex items-center gap-2">
        <AiFormatButton />
        <ThemeToggle />
        <SettingsDialog />
      </div>
    </header>
  );
}
