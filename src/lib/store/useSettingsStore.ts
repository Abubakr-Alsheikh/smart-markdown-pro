import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the shape of a saved font object
export interface SavedFont {
  family: string; // The CSS font-family value, e.g., '"Roboto", sans-serif'
  link: string; // The <link> href URL
}

interface SettingsState {
  isRTL: boolean;
  fontSize: number;
  activeFontFamily: string; // Renamed from fontFamily for clarity
  activeFontLink: string; // Renamed from fontLink
  savedFonts: SavedFont[]; // The list of previously used fonts

  toggleRTL: () => void;
  setFontSize: (size: number) => void;
  setActiveFont: (font: SavedFont) => void;
  saveAndApplyNewFont: (font: SavedFont) => void;
  resetActiveFont: () => void;
  deleteSavedFont: (family: string) => void;
}

// A simple utility to extract the primary font name for display
const parseFontName = (fontFamily: string): string => {
  return fontFamily.split(",")[0].replace(/['"]/g, "").trim();
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      // Default values
      isRTL: false,
      fontSize: 16,
      activeFontFamily: "",
      activeFontLink: "",
      savedFonts: [],

      // Actions
      toggleRTL: () => set((state) => ({ isRTL: !state.isRTL })),
      setFontSize: (size) => set({ fontSize: size }),

      // Select a font from the saved list
      setActiveFont: (font) =>
        set({
          activeFontFamily: font.family,
          activeFontLink: font.link,
        }),

      // Save a new font and apply it
      saveAndApplyNewFont: (newFont) => {
        set((state) => {
          // Prevent duplicates
          const isAlreadySaved = state.savedFonts.some(
            (f) => f.family === newFont.family
          );
          const updatedSavedFonts = isAlreadySaved
            ? state.savedFonts
            : [...state.savedFonts, newFont];

          return {
            savedFonts: updatedSavedFonts,
            activeFontFamily: newFont.family,
            activeFontLink: newFont.link,
          };
        });
      },

      // Reset to the application's default font
      resetActiveFont: () => set({ activeFontFamily: "", activeFontLink: "" }),

      // Delete a font from the saved list
      deleteSavedFont: (familyToDelete) => {
        set((state) => ({
          savedFonts: state.savedFonts.filter(
            (f) => f.family !== familyToDelete
          ),
        }));
      },
    }),
    {
      name: "smart-markdown-settings-storage-v2", // Increment version for new shape
      // Add the parseFontName utility to the store for easy access in components
      partialize: (state) => ({ ...state, parseFontName }),
    }
  )
);
