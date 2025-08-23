import { create } from "zustand";

interface LayoutState {
  isEditorCollapsed: boolean;
  isPreviewCollapsed: boolean;
  toggleEditor: () => void;
  togglePreview: () => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  isEditorCollapsed: false,
  isPreviewCollapsed: false,
  toggleEditor: () =>
    set((state) => {
      return {
        isEditorCollapsed: !state.isEditorCollapsed,
        isPreviewCollapsed: state.isEditorCollapsed
          ? false
          : state.isPreviewCollapsed,
      };
    }),
  togglePreview: () =>
    set((state) => {
      return {
        isPreviewCollapsed: !state.isPreviewCollapsed,
        isEditorCollapsed: state.isPreviewCollapsed
          ? false
          : state.isEditorCollapsed,
      };
    }),
}));
