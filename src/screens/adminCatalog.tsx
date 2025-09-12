import React from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import useCatalogStore from "../state/catalogStore";

export default function AdminCatalogScreen({}: NativeStackScreenProps<RootStackParamList, "adminCatalog">) {
  const insets = useSafeAreaInsets();
  const { stacks, importStacks } = useCatalogStore();
  const [json, setJson] = React.useState(JSON.stringify(stacks, null, 2));
  const apply = () => {
    try { importStacks(JSON.parse(json)); } catch {}
  };
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 bg-white dark:bg-gray-900" style={{ paddingTop: insets.top }}>
      <View className="px-5 py-6 gap-3">
        <Text className="text-gray-900 dark:text-gray-100 font-semibold">Catalog JSON</Text>
        <TextInput value={json} onChangeText={setJson} multiline className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-md p-3 min-h-[240px]" />
        <Pressable className="bg-blue-600 rounded-xl py-4 items-center" onPress={apply}> 
          <Text className="text-white font-semibold">Apply</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
