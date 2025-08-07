"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { EditorPane } from "./editor-pane";
import { PreviewPane } from "./preview-pane";

export function EditorLayout() {
  return (
    <ResizablePanelGroup direction="horizontal" className="flex-1">
      <ResizablePanel defaultSize={50}>
        <EditorPane />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <PreviewPane />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
