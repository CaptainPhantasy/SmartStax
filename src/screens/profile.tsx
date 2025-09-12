import React from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import type { AppType } from "../types/smartstack";
import useInterviewStore from "../state/interviewStore";

function OptionCard({ icon, title, description, selected, onPress }: { icon: string; title: string; description: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className={selected ? "border-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4" : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-4"}>
      <View className="flex-row items-start gap-3">
        <View style={{ flexShrink: 0 }}>
          <Ionicons name={icon as any} size={24} color={selected ? "#2563eb" : "#6b7280"} />
        </View>
        <View className="flex-1" style={{ minWidth: 0 }}>
          <Text 
            className={selected ? "text-blue-900 dark:text-blue-100 font-semibold" : "text-gray-900 dark:text-gray-100 font-semibold"}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Text 
            className={selected ? "text-blue-700 dark:text-blue-300 text-sm" : "text-gray-600 dark:text-gray-400 text-sm"}
            numberOfLines={3}
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

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className={selected ? "px-4 py-2 rounded-full bg-blue-600 mr-2 mb-2" : "px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 mr-2 mb-2"}>
      <Text className={selected ? "text-white font-medium" : "text-gray-900 dark:text-gray-100 font-medium"}>{label}</Text>
    </Pressable>
  );
}

const appTypes: { type: AppType; icon: string; title: string; description: string; examples: string }[] = [
  { type: "social", icon: "people-outline", title: "Social & Community", description: "Connect people with shared interests", examples: "Like Instagram, Discord, or LinkedIn" },
  { type: "ecommerce", icon: "storefront-outline", title: "Online Store", description: "Sell products or services", examples: "Like Amazon, Etsy, or Shopify" },
  { type: "food", icon: "restaurant-outline", title: "Food & Delivery", description: "Restaurants, recipes, or delivery", examples: "Like DoorDash, Yelp, or meal planning" },
  { type: "health", icon: "fitness-outline", title: "Health & Fitness", description: "Wellness, tracking, or medical", examples: "Like MyFitnessPal, Headspace, or telemedicine" },
  { type: "productivity", icon: "briefcase-outline", title: "Productivity & Business", description: "Tools to get work done", examples: "Like Slack, Notion, or project management" },
  { type: "education", icon: "school-outline", title: "Education & Learning", description: "Teaching, courses, or skills", examples: "Like Duolingo, Khan Academy, or online courses" },
  { type: "travel", icon: "airplane-outline", title: "Travel & Local", description: "Trips, maps, or local discovery", examples: "Like Airbnb, Google Maps, or travel guides" },
  { type: "games", icon: "game-controller-outline", title: "Games & Entertainment", description: "Fun, gaming, or media", examples: "Like mobile games, streaming, or puzzles" },
  { type: "other", icon: "bulb-outline", title: "Something Else", description: "Unique idea or different category", examples: "Tell us more about your vision" },
];

export default function ProfileScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "profile">) {
  const insets = useSafeAreaInsets();
  const { profile, setProfile } = useInterviewStore();

  const selectedAppType = appTypes.find(t => t.type === profile.app_type) || appTypes[appTypes.length - 1];

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 bg-white dark:bg-gray-900" style={{ paddingTop: insets.top }}>
      <View className="px-5 py-6 gap-6">
        <View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Tell us about your app</Text>
          <Text className="text-gray-600 dark:text-gray-400">Help us understand what you want to build so we can recommend the best tools</Text>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">What type of app are you building?</Text>
          <View className="gap-3">
            {appTypes.map((type) => (
              <OptionCard
                key={type.type}
                icon={type.icon}
                title={type.title}
                description={type.description}
                selected={profile.app_type === type.type}
                onPress={() => setProfile({ app_type: type.type })}
              />
            ))}
          </View>
          <Text className="text-gray-500 dark:text-gray-400 text-sm mt-2">{selectedAppType.examples}</Text>
        </View>

        {profile.app_type === "other" && (
          <View>
            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Tell us more about your idea</Text>
            <TextInput
              value={profile.description}
              onChangeText={(text) => setProfile({ description: text })}
              placeholder="Describe your app idea in a few sentences..."
              multiline
              numberOfLines={3}
              className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl p-4 text-gray-900 dark:text-gray-100"
              style={{ textAlignVertical: "top" }}
              placeholderTextColor="#9ca3af"
            />
          </View>
        )}

        <View>
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">How comfortable are you with technology?</Text>
          <Text className="text-gray-600 dark:text-gray-400 text-sm mb-3">This helps us recommend the right level of complexity</Text>
          <View className="gap-3">
            <OptionCard
              icon="leaf-outline"
              title="Beginner"
              description="New to app development, prefer simple solutions"
              selected={profile.tech_comfort === "beginner"}
              onPress={() => setProfile({ tech_comfort: "beginner" })}
            />
            <OptionCard
              icon="trending-up-outline"
              title="Some Experience"
              description="Built websites or used development tools before"
              selected={profile.tech_comfort === "some_experience"}
              onPress={() => setProfile({ tech_comfort: "some_experience" })}
            />
            <OptionCard
              icon="code-slash-outline"
              title="Advanced"
              description="Comfortable with coding and technical concepts"
              selected={profile.tech_comfort === "advanced"}
              onPress={() => setProfile({ tech_comfort: "advanced" })}
            />
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">When do you want to launch?</Text>
          <View className="flex-row flex-wrap">
            <Chip label="ASAP" selected={profile.timeline === "asap"} onPress={() => setProfile({ timeline: "asap" })} />
            <Chip label="3 months" selected={profile.timeline === "3_months"} onPress={() => setProfile({ timeline: "3_months" })} />
            <Chip label="6+ months" selected={profile.timeline === "6_months"} onPress={() => setProfile({ timeline: "6_months" })} />
            <Chip label="Flexible" selected={profile.timeline === "flexible"} onPress={() => setProfile({ timeline: "flexible" })} />
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Do you prefer iPhone/iOS apps?</Text>
          <Text className="text-gray-600 dark:text-gray-400 text-sm mb-3">This affects which tools we recommend</Text>
          <View className="flex-row gap-3">
            <Pressable 
              className={profile.prefs.apple_first ? "flex-1 bg-blue-600 rounded-xl py-4 items-center" : "flex-1 bg-gray-100 dark:bg-gray-700 rounded-xl py-4 items-center"} 
              onPress={() => setProfile({ prefs: { ...profile.prefs, apple_first: true } })}
            >
              <Text className={profile.prefs.apple_first ? "text-white font-semibold" : "text-gray-900 dark:text-gray-100 font-semibold"}>Yes, iOS first</Text>
            </Pressable>
            <Pressable 
              className={!profile.prefs.apple_first ? "flex-1 bg-blue-600 rounded-xl py-4 items-center" : "flex-1 bg-gray-100 dark:bg-gray-700 rounded-xl py-4 items-center"} 
              onPress={() => setProfile({ prefs: { ...profile.prefs, apple_first: false } })}
            >
              <Text className={!profile.prefs.apple_first ? "text-white font-semibold" : "text-gray-900 dark:text-gray-100 font-semibold"}>All platforms</Text>
            </Pressable>
          </View>
        </View>

        <View className="pt-4">
          <Pressable className="bg-blue-600 rounded-xl py-4 items-center" onPress={() => navigation.navigate("productBrief")}> 
            <Text className="text-white font-semibold text-lg">Next: App Features</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
