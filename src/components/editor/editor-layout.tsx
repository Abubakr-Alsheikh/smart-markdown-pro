"use client";

import React from "react";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import { EditorPane } from "./editor-pane";
import { PreviewPane } from "./preview-pane";
import { ImperativePanelGroupHandle } from "react-resizable-panels";
import { useLayoutStore } from "@/lib/store/useLayoutStore";

export function EditorLayout() {
  const { isEditorCollapsed, isPreviewCollapsed } = useLayoutStore();
  const panelGroupRef = React.useRef<ImperativePanelGroupHandle>(null);

  React.useEffect(() => {
    const panelGroup = panelGroupRef.current;
    if (!panelGroup) return;

    if (isEditorCollapsed && !isPreviewCollapsed) {
      panelGroup.setLayout([0, 100]);
    } else if (!isEditorCollapsed && isPreviewCollapsed) {
      panelGroup.setLayout([100, 0]);
    } else if (!isEditorCollapsed && !isPreviewCollapsed) {
      panelGroup.setLayout([50, 50]);
    } else if (isEditorCollapsed && isPreviewCollapsed) {
      panelGroup.setLayout([50, 50]); // or some other default layout
    }
  }, [isEditorCollapsed, isPreviewCollapsed]);

  return (
    <ResizablePanelGroup
      ref={panelGroupRef}
      direction="horizontal"
      className="flex-1"
    >
      <ResizablePanel collapsible>
        <EditorPane />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel collapsible>
        <PreviewPane />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
