"use client";

import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAiFormat } from "@/lib/hooks/useAiFormat";
import { useDocumentStore } from "@/lib/store/useDocumentStore"; // Keep this import

export function AiFormatButton() {
  const { format, isFormatting } = useAiFormat();
  const { getActiveDocument, updateActiveDocumentContent } =
    useDocumentStore.getState();

  const handleFormatClick = async () => {
    const activeDocument = getActiveDocument();
    if (!activeDocument) {
      toast.error("No active document to format.");
      return;
    }

    if (!activeDocument.content.trim()) {
      toast.info("There is no text to format.");
      return;
    }

    toast.info("AI is formatting your text...");

    try {
      const result = await format({ text: activeDocument.content });
      updateActiveDocumentContent(result.formattedText);
      toast.success("Formatting complete!");
    } catch (error) {
      console.error("Formatting error:", error);
      toast.error(
        error instanceof Error ? error.message : "An unknown error occurred."
      );
    }
  };

  return (
    <Button onClick={handleFormatClick} disabled={isFormatting} size="sm">
      {isFormatting ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Format with AI
    </Button>
  );
}
