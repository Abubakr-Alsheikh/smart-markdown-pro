import { create } from "zustand";
import { persist } from "zustand/middleware";

// Default content for a new user
const initialContent = `# Welcome to Smart Markdown Pro! ✨

This is a local-first, AI-powered markdown editor.

- **Type** your markdown in this panel.
- **See** the rendered HTML in the preview panel.
- **Click** the magic wand icon in the header to format your text with AI.

Your work is automatically saved to your browser's local storage. Enjoy!
`;

interface DocumentState {
  content: string;
  setContent: (content: string) => void;
  // This will be expanded in Phase 2 for full file management
}

// Create the store with persistence middleware
export const useDocumentStore = create<DocumentState>()(
  persist(
    (set) => ({
      content: initialContent,
      setContent: (newContent) => set({ content: newContent }),
    }),
    {
      name: "smart-markdown-storage", // The key used in localStorage
    }
  )
);
