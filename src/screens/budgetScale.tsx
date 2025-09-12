import React from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import useInterviewStore from "../state/interviewStore";

function BudgetCard({ icon, title, description, price, examples, selected, onPress }: { 
  icon: string; 
  title: string; 
  description: string; 
  price: string;
  examples: string;
  selected: boolean; 
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className={selected ? "border-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-3" : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-4 mb-3"}>
      <View className="flex-row items-start gap-3">
        <View style={{ flexShrink: 0 }}>
          <Ionicons name={icon as any} size={24} color={selected ? "#2563eb" : "#6b7280"} />
        </View>
        <View className="flex-1" style={{ minWidth: 0 }}>
          <View className="flex-row items-start justify-between mb-1" style={{ flexWrap: 'wrap', gap: 8 }}>
            <Text 
              className={selected ? "text-blue-900 dark:text-blue-100 font-semibold" : "text-gray-900 dark:text-gray-100 font-semibold"}
              style={{ flex: 1, minWidth: 120 }}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            <Text 
              className={selected ? "text-blue-600 font-bold" : "text-gray-600 dark:text-gray-300 font-bold"}
              style={{ flexShrink: 0, minWidth: 60, textAlign: 'right' }}
            >
              {price}
            </Text>
          </View>
          <Text 
            className={selected ? "text-blue-700 dark:text-blue-300 text-sm mb-2" : "text-gray-600 dark:text-gray-400 text-sm mb-2"}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
          <Text 
            className={selected ? "text-blue-600 text-xs" : "text-gray-500 dark:text-gray-400 text-xs"}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {examples}
          </Text>
        </View>
        {selected && (
          <View style={{ flexShrink: 0, marginLeft: 8 }}>
            <Ionicons name="checkmark-circle" size={20} color="#2563eb" />
          </View>
        )}
      </View>
    </Pressable>
  );
}

function PresetCard({ title, description, selected, onPress }: { 
  title: string; 
  description: string; 
  selected: boolean; 
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} className={selected ? "border-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-3" : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-4 mb-3"}>
      <View className="flex-row items-start gap-3">
        <View className="flex-1" style={{ minWidth: 0 }}>
          <Text 
            className={selected ? "text-blue-900 dark:text-blue-100 font-semibold mb-1" : "text-gray-900 dark:text-gray-100 font-semibold mb-1"}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Text 
            className={selected ? "text-blue-700 dark:text-blue-300 text-sm" : "text-gray-600 dark:text-gray-400 text-sm"}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
        </View>
        {selected && (
          <View style={{ flexShrink: 0 }}>
            <Ionicons name="checkmark-circle" size={20} color="#2563eb" />
          </View>
        )}
      </View>
    </Pressable>
  );
}

export default function BudgetScaleScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "budgetScale">) {
  const insets = useSafeAreaInsets();
  const { budget, setBudget } = useInterviewStore();
  
  const presets = [
    { title: "Just testing my idea", description: "Small prototype, friends & family", mau: 100, concurrent: 10 },
    { title: "Local business", description: "Neighborhood or small community", mau: 1000, concurrent: 50 },
    { title: "Growing startup", description: "Regional reach, active marketing", mau: 10000, concurrent: 500 },
    { title: "Established business", description: "National presence, steady growth", mau: 100000, concurrent: 2000 },
  ];

  const selectedPreset = presets.find(p => p.mau === budget.usage.mau && p.concurrent === budget.usage.peak_concurrent);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 bg-white dark:bg-gray-900" style={{ paddingTop: insets.top }}>
      <View className="px-5 py-6 gap-6">
        <View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Budget & Scale</Text>
          <Text className="text-gray-600 dark:text-gray-400">Help us understand your budget so we can recommend cost-effective solutions</Text>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">How much can you spend per month to start?</Text>
          
          <BudgetCard
            icon="leaf-outline"
            title="Just testing ($0-50/month)"
            description="Perfect for validating your idea with basic features"
            price="$0-50"
            examples="Free tiers, simple hosting, basic analytics"
            selected={budget.monthly_mvp_band === "<50"}
            onPress={() => setBudget({ monthly_mvp_band: "<50" })}
          />

          <BudgetCard
            icon="trending-up-outline"
            title="Small business ($50-200/month)"
            description="Good for local businesses or growing user base"
            price="$50-200"
            examples="Professional hosting, email service, payment processing"
            selected={budget.monthly_mvp_band === "50_200"}
            onPress={() => setBudget({ monthly_mvp_band: "50_200" })}
          />

          <BudgetCard
            icon="rocket-outline"
            title="Growing company ($200-500/month)"
            description="Scaling features, more users, advanced tools"
            price="$200-500"
            examples="CDN, advanced analytics, premium support"
            selected={budget.monthly_mvp_band === "200_500"}
            onPress={() => setBudget({ monthly_mvp_band: "200_500" })}
          />

          <BudgetCard
            icon="business-outline"
            title="Enterprise ($500+/month)"
            description="High-scale, enterprise features, dedicated support"
            price="$500+"
            examples="Custom infrastructure, compliance tools, SLA"
            selected={budget.monthly_mvp_band === "500_plus"}
            onPress={() => setBudget({ monthly_mvp_band: "500_plus" })}
          />
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Maximum budget for first year</Text>
          <Text className="text-gray-600 dark:text-gray-400 text-sm mb-3">What's the most you could spend if your app takes off?</Text>
          <TextInput 
            keyboardType="numeric" 
            value={String(budget.year1_ceiling)} 
            onChangeText={(t) => setBudget({ year1_ceiling: parseInt(t || "0", 10) })} 
            className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl px-4 py-3 text-lg text-gray-900 dark:text-gray-100"
            placeholder="e.g. 5000"
            placeholderTextColor="#9CA3AF"
          />
          <Text className="text-gray-500 dark:text-gray-400 text-xs mt-1">This helps us plan for growth and scaling costs</Text>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Expected app usage</Text>
          <Text className="text-gray-600 dark:text-gray-400 text-sm mb-3">Choose the scenario that best matches your expectations</Text>
          
          {presets.map((preset) => (
            <PresetCard
              key={preset.title}
              title={preset.title}
              description={preset.description}
              selected={selectedPreset?.title === preset.title}
              onPress={() => setBudget({ 
                usage: { 
                  ...budget.usage, 
                  mau: preset.mau, 
                  peak_concurrent: preset.concurrent 
                } 
              })}
            />
          ))}
        </View>

        {!selectedPreset && (
          <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <Text className="text-gray-900 dark:text-gray-100 font-semibold mb-2">Custom Usage</Text>
            <View className="gap-3">
              <View>
                <Text className="text-gray-700 dark:text-gray-300 mb-1">Monthly active users</Text>
                <TextInput 
                  keyboardType="numeric" 
                  value={String(budget.usage.mau)} 
                  onChangeText={(t) => setBudget({ usage: { ...budget.usage, mau: parseInt(t || "0", 10) } })} 
                  className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2"
                  placeholder="e.g. 5000"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              <View>
                <Text className="text-gray-700 dark:text-gray-300 mb-1">Peak users at same time</Text>
                <TextInput 
                  keyboardType="numeric" 
                  value={String(budget.usage.peak_concurrent)} 
                  onChangeText={(t) => setBudget({ usage: { ...budget.usage, peak_concurrent: parseInt(t || "0", 10) } })} 
                  className="border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2"
                  placeholder="e.g. 300"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </View>
        )}

        <View className="pt-4">
          <Pressable className="bg-blue-600 rounded-xl py-4 items-center" onPress={() => navigation.navigate("integrations")}>
            <Text className="text-white font-semibold text-lg">Next: Integrations</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
