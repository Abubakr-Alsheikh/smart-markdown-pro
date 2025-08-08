import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  isRTL: boolean;
  fontSize: number;
  fontLink: string; // To store the <link href="..."> URL
  fontFamily: string; // To store the "Font Name", sans-serif value
  toggleRTL: () => void;
  setFontSize: (size: number) => void;
  setFont: (link: string, family: string) => void;
  resetFont: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Default values
      isRTL: false,
      fontSize: 16,
      fontLink: "", // Default is empty, using the app's default font
      fontFamily: "",

      // Actions
      toggleRTL: () => set((state) => ({ isRTL: !state.isRTL })),
      setFontSize: (size) => set({ fontSize: size }),
      setFont: (link, family) => set({ fontLink: link, fontFamily: family }),
      resetFont: () => set({ fontLink: "", fontFamily: "" }),
    }),
    {
      name: "smart-markdown-settings-storage", // A unique key for localStorage
    }
  )
);
