"use client";

import React from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { EditorPane } from "./editor-pane";
import { PreviewPane } from "./preview-pane";
import { ImperativePanelGroupHandle } from "react-resizable-panels";
import { ChevronsLeft, ChevronsRight, ChevronsUpDown } from "lucide-react";

export function EditorLayout() {
  const panelGroupRef = React.useRef<ImperativePanelGroupHandle>(null);
  const [layout, setLayout] = React.useState([50, 50]);
  const [lastGoodLayout, setLastGoodLayout] = React.useState([50, 50]);
  const [isEditorCollapsed, setIsEditorCollapsed] = React.useState(true);
  const [isPreviewCollapsed, setIsPreviewCollapsed] = React.useState(true);

  // This function is called whenever the user drags the handle.
  // We use it to track the layout and determine if a panel is collapsed.
  const handleLayout = (sizes: number[]) => {
    setLayout(sizes);
    setIsEditorCollapsed(sizes[0] < 5);
    setIsPreviewCollapsed(sizes[1] < 5);

    // If neither panel is collapsed, save this as the last "good" layout
    if (sizes[0] >= 5 && sizes[1] >= 5) {
      setLastGoodLayout(sizes);
    }
  };

  // Toggles the preview panel
  const togglePreview = () => {
    const panelGroup = panelGroupRef.current;
    if (!panelGroup) return;

    if (isPreviewCollapsed) {
      // If preview is collapsed, restore to the last good layout
      panelGroup.setLayout(lastGoodLayout);
    } else {
      // Otherwise, collapse the preview panel
      panelGroup.setLayout([100, 0]);
    }
  };

  // Toggles the editor panel
  const toggleEditor = () => {
    const panelGroup = panelGroupRef.current;
    if (!panelGroup) return;

    if (isEditorCollapsed) {
      // If editor is collapsed, restore to the last good layout
      panelGroup.setLayout(lastGoodLayout);
    } else {
      // Otherwise, collapse the editor panel
      panelGroup.setLayout([0, 100]);
    }
  };

  return (
    <ResizablePanelGroup
      ref={panelGroupRef}
      direction="horizontal"
      onLayout={handleLayout}
      className="flex-1"
    >
      <ResizablePanel defaultSize={50} minSize={0}>
        <EditorPane />
      </ResizablePanel>

      <ResizableHandle
        withHandle // Re-add the default handle for a clear grab area
      >
        <div className="flex h-24 w-8 flex-col items-center justify-center rounded-full border bg-background p-1 shadow-lg">
          <button
            onClick={toggleEditor}
            title={isEditorCollapsed ? "Open Editor" : "Collapse Editor"}
            className="rounded p-1 transition-colors hover:bg-muted"
          >
            {isEditorCollapsed ? (
              <ChevronsRight size={16} />
            ) : (
              <ChevronsLeft size={16} />
            )}
          </button>

          <div className="my-1 h-8 w-[1px] bg-border" />

          <button
            onClick={togglePreview}
            title={isPreviewCollapsed ? "Open Preview" : "Collapse Preview"}
            className="rounded p-1 transition-colors hover:bg-muted"
          >
            {isPreviewCollapsed ? (
              <ChevronsLeft size={16} />
            ) : (
              <ChevronsRight size={16} />
            )}
          </button>
        </div>
      </ResizableHandle>

      <ResizablePanel defaultSize={50} minSize={0}>
        <PreviewPane />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
