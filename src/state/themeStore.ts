import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorScheme } from "nativewind";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeState {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  initializeTheme: () => void;
}

const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      themeMode: "system",
      
      setThemeMode: (mode: ThemeMode) => {
        set({ themeMode: mode });
        
        // Apply the theme change using NativeWind's colorScheme API
        if (mode === "system") {
          // Let NativeWind handle system preference automatically
          colorScheme.set("system");
        } else {
          // Set specific theme
          colorScheme.set(mode);
        }
      },
      
      initializeTheme: () => {
        const currentMode = get().themeMode;
        
        // Apply the persisted theme on app startup
        if (currentMode === "system") {
          colorScheme.set("system");
        } else {
          colorScheme.set(currentMode);
        }
      },
    }),
    { 
      name: "theme-storage", 
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useThemeStore;