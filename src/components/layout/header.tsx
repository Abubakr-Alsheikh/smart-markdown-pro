"use client";

import Link from "next/link";
import { useDocumentStore } from "@/lib/store/useDocumentStore";
import { AiFormatButton } from "@/components/editor/ai-format-button";
import { FileManagementSidebar } from "./file-management-sidebar";
import { SettingsDialog } from "../settings/settings-dialog";
import { ThemeToggle } from "../theme/theme-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Github, Sparkles, ChevronsLeft, ChevronsRight } from "lucide-react"; // Import Github icon
import { useLayoutStore } from "@/lib/store/useLayoutStore";

export function Header() {
  const { isEditorCollapsed, isPreviewCollapsed, toggleEditor, togglePreview } =
    useLayoutStore();
  const activeDocument = useDocumentStore((state) =>
    state.activeDocumentId ? state.documents[state.activeDocumentId] : null
  );
  const updateActiveDocumentTitle = useDocumentStore(
    (state) => state.updateActiveDocumentTitle
  );

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      {/* --- Left Side: Branding and File Management --- */}
      <div className="flex items-center gap-4">
        <FileManagementSidebar />
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-foreground"
        >
          <Sparkles className="h-6 w-6" />
          <span className="hidden sm:inline-block">Smart Markdown Pro</span>
        </Link>
      </div>

      {/* --- Center: Active Document Title --- */}
      <div className="flex-1">
        {activeDocument ? (
          <Input
            key={activeDocument.id}
            defaultValue={activeDocument.title}
            onChange={(e) => updateActiveDocumentTitle(e.target.value)}
            className="w-full max-w-sm border bg-transparent text-lg font-semibold focus-visible:ring-0"
          />
        ) : (
          <div className="w-full max-w-sm text-lg font-semibold text-muted-foreground">
            No Document Selected
          </div>
        )}
      </div>

      {/* --- Right Side: Actions --- */}
      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleEditor}
          aria-label={isEditorCollapsed ? "Open Editor" : "Collapse Editor"}
        >
          {isEditorCollapsed ? (
            <ChevronsRight className="h-5 w-5" />
          ) : (
            <ChevronsLeft className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={togglePreview}
          aria-label={isPreviewCollapsed ? "Open Preview" : "Collapse Preview"}
        >
          {isPreviewCollapsed ? (
            <ChevronsLeft className="h-5 w-5" />
          ) : (
            <ChevronsRight className="h-5 w-5" />
          )}
        </Button>
        <AiFormatButton />

        <Link
          href="https://github.com/Abubakr-Alsheikh/smart-markdown-pro"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="icon" aria-label="GitHub Repository">
            <Github className="h-5 w-5" />
          </Button>
        </Link>

        <ThemeToggle />
        <SettingsDialog />
      </div>
    </header>
  );
}
