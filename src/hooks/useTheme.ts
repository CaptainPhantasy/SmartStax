import { useColorScheme } from "nativewind";
import useThemeStore from "../state/themeStore";

export function useTheme() {
  const { colorScheme } = useColorScheme();
  const { themeMode, setThemeMode } = useThemeStore();
  
  return {
    // Current active theme (resolved from system if needed)
    currentTheme: colorScheme,
    // User's theme preference (light, dark, or system)
    themeMode,
    // Function to change theme preference
    setThemeMode,
    // Convenience booleans
    isDark: colorScheme === "dark",
    isLight: colorScheme === "light",
    isSystemMode: themeMode === "system"
  };
}