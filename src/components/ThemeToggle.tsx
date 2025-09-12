import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useThemeStore, { type ThemeMode } from "../state/themeStore";

interface ThemeOption {
  mode: ThemeMode;
  label: string;
  icon: string;
  description: string;
}

const themeOptions: ThemeOption[] = [
  {
    mode: "light",
    label: "Light",
    icon: "sunny-outline",
    description: "Always use light theme"
  },
  {
    mode: "dark", 
    label: "Dark",
    icon: "moon-outline",
    description: "Always use dark theme"
  },
  {
    mode: "system",
    label: "System",
    icon: "phone-portrait-outline", 
    description: "Follow device setting"
  }
];

export default function ThemeToggle() {
  const { themeMode, setThemeMode } = useThemeStore();

  return (
    <View className="bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3">
      <View className="flex-row items-center gap-3 mb-3">
        <Ionicons name="color-palette-outline" size={20} color="#6b7280" />
        <View className="flex-1">
          <Text className="text-gray-900 dark:text-gray-100 font-medium">
            Theme
          </Text>
          <Text className="text-gray-500 dark:text-gray-400 text-sm">
            Choose your preferred appearance
          </Text>
        </View>
      </View>
      
      <View className="flex-row gap-2">
        {themeOptions.map((option) => (
          <Pressable
            key={option.mode}
            onPress={() => setThemeMode(option.mode)}
            className={`flex-1 rounded-lg px-3 py-2 items-center ${
              themeMode === option.mode
                ? "bg-blue-600"
                : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
            }`}
          >
            <Ionicons
              name={option.icon as any}
              size={18}
              color={themeMode === option.mode ? "#ffffff" : "#6b7280"}
            />
            <Text
              className={`text-xs font-medium mt-1 ${
                themeMode === option.mode
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}