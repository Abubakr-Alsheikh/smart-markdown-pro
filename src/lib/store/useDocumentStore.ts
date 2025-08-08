import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid"; // We need a UUID library to generate unique IDs
import { toast } from "sonner";

// First, install the uuid library and its types
// npm install uuid
// npm install -D @types/uuid

// Define the structure of a single document
export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

// Define the shape of our store's state and actions
interface DocumentState {
  documents: Record<string, Document>; // Using an object for faster lookups
  activeDocumentId: string | null;
  addDocument: () => void;
  deleteDocument: (id: string) => void;
  setActiveDocumentId: (id: string | null) => void;
  updateActiveDocumentContent: (content: string) => void;
  updateActiveDocumentTitle: (title: string) => void;
  getActiveDocument: () => Document | undefined;
}

const createNewDocument = (): Document => {
  const newId = uuidv4();
  return {
    id: newId,
    title: "Untitled Document",
    content: `# Welcome!

This is a new document. Start typing here.`,
    createdAt: new Date().toISOString(),
  };
};

export const useDocumentStore = create<DocumentState>()(
  persist(
    (set, get) => ({
      documents: {},
      activeDocumentId: null,

      // Utility function to get the current active document
      getActiveDocument: () => {
        const { documents, activeDocumentId } = get();
        return activeDocumentId ? documents[activeDocumentId] : undefined;
      },

      // Action to add a new document
      addDocument: () => {
        const newDoc = createNewDocument();
        set((state) => ({
          documents: { ...state.documents, [newDoc.id]: newDoc },
          activeDocumentId: newDoc.id,
        }));
        toast.success(`Created "${newDoc.title}"`);
      },

      // Action to delete a document
      deleteDocument: (id) => {
        set((state) => {
          const newDocs = { ...state.documents };
          const docTitle = newDocs[id]?.title || "document";
          delete newDocs[id];

          let newActiveId = state.activeDocumentId;
          // If the deleted doc was the active one, pick a new active doc
          if (newActiveId === id) {
            const remainingIds = Object.keys(newDocs);
            newActiveId = remainingIds.length > 0 ? remainingIds[0] : null;
          }
          toast.error(`Deleted "${docTitle}"`);
          return { documents: newDocs, activeDocumentId: newActiveId };
        });
      },

      // Action to set the active document
      setActiveDocumentId: (id) => set({ activeDocumentId: id }),

      // Action to update the content of the currently active document
      updateActiveDocumentContent: (content) => {
        const { activeDocumentId } = get();
        if (!activeDocumentId) return;

        set((state) => ({
          documents: {
            ...state.documents,
            [activeDocumentId]: {
              ...state.documents[activeDocumentId],
              content,
            },
          },
        }));
      },

      // Action to update the title of the currently active document
      updateActiveDocumentTitle: (title) => {
        const { activeDocumentId } = get();
        if (!activeDocumentId) return;

        set((state) => ({
          documents: {
            ...state.documents,
            [activeDocumentId]: {
              ...state.documents[activeDocumentId],
              title,
            },
          },
        }));
      },
    }),
    {
      name: "smart-markdown-pro-storage-v2", // Use a new name to avoid conflicts with old structure
      // onRehydrateStorage is a good place to ensure there's at least one doc
      onRehydrateStorage: () => (state) => {
        if (state && Object.keys(state.documents).length === 0) {
          const newDoc = createNewDocument();
          state.documents[newDoc.id] = newDoc;
          state.activeDocumentId = newDoc.id;
        }
      },
    }
  )
);
