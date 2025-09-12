import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import useInterviewStore from "../state/interviewStore";
import useCatalogStore from "../state/catalogStore";
import { scoreStacks } from "../utils/scoring";
import { generateReadinessChecklist, getReadinessProgress } from "../utils/readinessUtils";

export default function ReadinessScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "readiness">) {
  const insets = useSafeAreaInsets();
  const { profile, brief, compliance, budget, weights, selectedStackId } = useInterviewStore();
  const { stacks } = useCatalogStore();
  
  // Get the selected stack or fall back to top recommendation
  const results = scoreStacks(stacks, { profile, brief, compliance, budget, weights });
  const selectedStack = selectedStackId 
    ? stacks.find(s => s.id === selectedStackId) 
    : results[0]?.candidate;
  
  // Generate dynamic readiness checklist
  const readinessItems = selectedStack ? generateReadinessChecklist(selectedStack) : [];
  const progress = getReadinessProgress(readinessItems);

  if (!selectedStack) {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
        <View className="px-6 py-8 items-center">
          <Ionicons name="alert-circle-outline" size={48} color="#ef4444" />
          <Text className="text-gray-900 font-semibold text-lg mt-4 mb-2">No Stack Selected</Text>
          <Text className="text-gray-600 text-center mb-6">Please go back and select a technology stack to see your readiness checklist.</Text>
          <Pressable className="bg-blue-600 rounded-xl py-4 px-6 items-center" onPress={() => navigation.navigate("recommend")}> 
            <Text className="text-white font-semibold">Choose Stack</Text>
          </Pressable>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="px-6 py-8">
        {/* Stack Context Header */}
        <View className="mb-8">
          <View className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
            <Text className="text-blue-900 font-bold text-xl mb-2">{selectedStack.title}</Text>
            <Text className="text-blue-800 text-base leading-6 mb-3">{selectedStack.summary}</Text>
            <View className="flex-row items-center gap-2">
              <Ionicons name="cash-outline" size={16} color="#2563eb" />
              <Text className="text-blue-700 font-semibold">${selectedStack.est_monthly}/month estimated cost</Text>
            </View>
          </View>

          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-gray-900 font-bold text-2xl">Readiness Checklist</Text>
            <View className="bg-green-100 px-3 py-1 rounded-full">
              <Text className="text-green-800 font-semibold text-sm">{progress.percentage}% Ready</Text>
            </View>
          </View>
          
          <Text className="text-gray-600 text-base leading-6">
            Complete these items to ensure your {selectedStack.title} stack is production-ready
          </Text>
        </View>

        {/* Readiness Items */}
        <View className="gap-4 mb-8">
          {readinessItems.map((item) => (
            <View key={item.id} className="bg-gray-50 rounded-xl p-4">
              <View className="flex-row items-start gap-4">
                <View className="flex-row items-center gap-3 flex-1">
                  <View className="h-6 w-6 rounded-full bg-green-500 items-center justify-center">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                  <View style={{ flexShrink: 0 }}>
                    <Ionicons name={item.icon as any} size={20} color="#374151" />
                  </View>
                  <View className="flex-1" style={{ minWidth: 0 }}>
                    <Text className="text-gray-900 font-semibold text-base mb-1" numberOfLines={2} ellipsizeMode="tail">
                      {item.title}
                    </Text>
                    <Text className="text-gray-600 text-sm leading-5" numberOfLines={3} ellipsizeMode="tail">
                      {item.description}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View className="gap-4">
          <Pressable 
            className="border border-gray-300 rounded-xl py-4 items-center" 
            onPress={() => navigation.navigate("recommend")}
          > 
            <Text className="text-gray-900 font-semibold text-base">Change Stack</Text>
          </Pressable>
          
          <Pressable 
            className="bg-blue-600 rounded-xl py-4 items-center" 
            onPress={() => navigation.navigate("welcome")}
          > 
            <Text className="text-white font-semibold text-base">Start Over</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
