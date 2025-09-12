import React, { useEffect } from "react";
import useThemeStore from "../state/themeStore";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    // Initialize theme on app startup
    initializeTheme();
  }, [initializeTheme]);

  return <>{children}</>;
}