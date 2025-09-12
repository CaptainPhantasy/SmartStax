import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";

export default function IntegrationsScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "integrations">) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="px-5 py-6 gap-3">
        <Text className="text-gray-900">Choose default providers on the next releases. For now, we infer from your brief and compliance.</Text>
        <Pressable className="bg-blue-600 rounded-xl py-4 items-center" onPress={() => navigation.navigate("summary")}> 
          <Text className="text-white font-semibold">Next: Summary</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
