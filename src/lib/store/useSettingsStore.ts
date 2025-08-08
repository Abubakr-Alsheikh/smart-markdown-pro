import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  isRTL: boolean;
  fontSize: number;
  toggleRTL: () => void;
  setFontSize: (size: number) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Default values
      isRTL: false,
      fontSize: 16,

      // Actions
      toggleRTL: () => set((state) => ({ isRTL: !state.isRTL })),
      setFontSize: (size) => set({ fontSize: size }),
    }),
    {
      name: "smart-markdown-settings-storage", // A unique key for localStorage
    }
  )
);
