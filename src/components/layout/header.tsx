import { AiFormatButton } from "@/components/editor/ai-format-button";
import { Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div className="flex items-center gap-2 font-semibold">
        <Sparkles className="h-6 w-6" />
        <span className="">Smart Markdown Pro</span>
      </div>
      <div className="ml-auto">
        <AiFormatButton />
      </div>
    </header>
  );
}
