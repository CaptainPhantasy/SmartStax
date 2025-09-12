import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import useInterviewStore from "../state/interviewStore";

function FeatureCard({ icon, title, description, selected, onPress, badge }: { icon: string; title: string; description: string; selected: boolean; onPress: () => void; badge?: string }) {
  return (
    <Pressable onPress={onPress} className={selected ? "border-2 border-blue-600 bg-blue-50 rounded-xl p-4 mb-3" : "border border-gray-200 rounded-xl p-4 mb-3"}>
      <View className="flex-row items-start gap-3">
        <View style={{ flexShrink: 0 }}>
          <Ionicons name={icon as any} size={24} color={selected ? "#2563eb" : "#6b7280"} />
        </View>
        <View className="flex-1" style={{ minWidth: 0 }}>
          <View className="flex-row items-center gap-2 mb-1" style={{ flexWrap: 'wrap' }}>
            <Text 
              className={selected ? "text-blue-900 font-semibold" : "text-gray-900 font-semibold"}
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{ flex: 1, minWidth: 100 }}
            >
              {title}
            </Text>
            {badge && (
              <View className="bg-orange-100 px-2 py-1 rounded-full" style={{ flexShrink: 0 }}>
                <Text className="text-orange-800 text-xs font-medium">{badge}</Text>
              </View>
            )}
          </View>
          <Text 
            className={selected ? "text-blue-700 text-sm" : "text-gray-600 text-sm"}
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

function PlatformCard({ icon, title, description, selected, onPress }: { icon: string; title: string; description: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable 
      onPress={onPress} 
      className={selected ? "border-2 border-blue-600 bg-blue-50 rounded-xl p-4" : "border border-gray-200 rounded-xl p-4"}
      style={{ minHeight: 120 }}
    >
      <View className="items-center justify-center gap-2" style={{ flex: 1 }}>
        <Ionicons name={icon as any} size={32} color={selected ? "#2563eb" : "#6b7280"} />
        <Text 
          className={selected ? "text-blue-900 font-semibold text-center" : "text-gray-900 font-semibold text-center"}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text 
          className={selected ? "text-blue-700 text-xs text-center" : "text-gray-600 text-xs text-center"}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
        {selected && <Ionicons name="checkmark-circle" size={16} color="#2563eb" />}
      </View>
    </Pressable>
  );
}

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} className={selected ? "px-4 py-2 rounded-full bg-blue-600 mr-2 mb-2" : "px-4 py-2 rounded-full bg-gray-100 mr-2 mb-2"}>
      <Text className={selected ? "text-white font-medium" : "text-gray-900 font-medium"}>{label}</Text>
    </Pressable>
  );
}

export default function ProductBriefScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "productBrief">) {
  const insets = useSafeAreaInsets();
  const { brief, setBrief } = useInterviewStore();

  const toggleSurface = (s: string) => {
    const has = brief.surfaces.includes(s as any);
    setBrief({ surfaces: has ? brief.surfaces.filter((x) => x !== s) : [...brief.surfaces, s as any] });
  };

  const toggleFeature = (k: keyof typeof brief.features) => {
    if (typeof brief.features[k] === "boolean") {
      const next = { ...brief.features, [k]: !(brief.features[k] as boolean) } as any;
      setBrief({ features: next });
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="px-5 py-6 gap-6">
        <View>
          <Text className="text-2xl font-bold text-gray-900 mb-2">App Features</Text>
          <Text className="text-gray-600">Select the features your app needs. Don't worry - you can always add more later!</Text>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-3">Where will your app work?</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
            <View style={{ width: '48%' }}>
              <PlatformCard
                icon="phone-portrait-outline"
                title="iPhone"
                description="iOS App Store"
                selected={brief.surfaces.includes("ios")}
                onPress={() => toggleSurface("ios")}
              />
            </View>
            <View style={{ width: '48%' }}>
              <PlatformCard
                icon="phone-portrait-outline"
                title="Android"
                description="Google Play Store"
                selected={brief.surfaces.includes("android")}
                onPress={() => toggleSurface("android")}
              />
            </View>
            <View style={{ width: '48%' }}>
              <PlatformCard
                icon="globe-outline"
                title="Website"
                description="Works in browsers"
                selected={brief.surfaces.includes("web")}
                onPress={() => toggleSurface("web")}
              />
            </View>
            <View style={{ width: '48%' }}>
              <PlatformCard
                icon="desktop-outline"
                title="Desktop"
                description="Mac/Windows app"
                selected={brief.surfaces.includes("desktop")}
                onPress={() => toggleSurface("desktop")}
              />
            </View>
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-3">Core Features</Text>
          <FeatureCard
            icon="person-circle-outline"
            title="User Accounts & Login"
            description="Let users create profiles and sign in"
            selected={brief.features.auth}
            onPress={() => toggleFeature("auth")}
          />
          <FeatureCard
            icon="card-outline"
            title="Payments & Purchases"
            description="Accept money, subscriptions, or in-app purchases"
            selected={brief.features.payments}
            onPress={() => toggleFeature("payments")}
            badge="Popular"
          />
          <FeatureCard
            icon="chatbubbles-outline"
            title="Live Updates"
            description="Real-time chat, notifications, or live data"
            selected={brief.features.realtime}
            onPress={() => toggleFeature("realtime")}
          />
          <FeatureCard
            icon="cloud-upload-outline"
            title="Photo & File Sharing"
            description="Users can upload and share images or documents"
            selected={brief.features.file_uploads}
            onPress={() => toggleFeature("file_uploads")}
          />
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-2">Search Capability</Text>
          <Text className="text-gray-600 text-sm mb-3">How important is search for your app?</Text>
          <View className="flex-row flex-wrap">
            <Chip label="No search needed" selected={brief.features.search === "none"} onPress={() => setBrief({ features: { ...brief.features, search: "none" } })} />
            <Chip label="Basic search" selected={brief.features.search === "basic"} onPress={() => setBrief({ features: { ...brief.features, search: "basic" } })} />
            <Chip label="Advanced search" selected={brief.features.search === "advanced"} onPress={() => setBrief({ features: { ...brief.features, search: "advanced" } })} />
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-2">AI Features</Text>
          <Text className="text-gray-600 text-sm mb-3">Do you want AI-powered features?</Text>
          <View className="flex-row flex-wrap">
            <Chip label="No AI" selected={brief.features.ai === "none"} onPress={() => setBrief({ features: { ...brief.features, ai: "none" } })} />
            <Chip label="Smart suggestions" selected={brief.features.ai === "assist"} onPress={() => setBrief({ features: { ...brief.features, ai: "assist" } as any })} />
            <Chip label="Image recognition" selected={brief.features.ai === "vision"} onPress={() => setBrief({ features: { ...brief.features, ai: "vision" } as any })} />
            <Chip label="Voice chat" selected={brief.features.ai === "realtime"} onPress={() => setBrief({ features: { ...brief.features, ai: "realtime" } as any })} />
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-2">Offline Use</Text>
          <Text className="text-gray-600 text-sm mb-3">Should your app work without internet?</Text>
          <View className="flex-row flex-wrap">
            <Chip label="Always online" selected={brief.features.offline === "none"} onPress={() => setBrief({ features: { ...brief.features, offline: "none" } as any })} />
            <Chip label="Nice to have" selected={brief.features.offline === "nice_to_have"} onPress={() => setBrief({ features: { ...brief.features, offline: "nice_to_have" } as any })} />
            <Chip label="Must work offline" selected={brief.features.offline === "required"} onPress={() => setBrief({ features: { ...brief.features, offline: "required" } as any })} />
          </View>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-2">Where are your users?</Text>
          <Text className="text-gray-600 text-sm mb-3">This affects data storage and performance</Text>
          <View className="flex-row flex-wrap">
            <Chip label="United States" selected={brief.regions.includes("us")} onPress={() => setBrief({ regions: brief.regions.includes("us") ? brief.regions.filter((x) => x !== "us") : [...brief.regions, "us"] })} />
            <Chip label="Europe" selected={brief.regions.includes("eu")} onPress={() => setBrief({ regions: brief.regions.includes("eu") ? brief.regions.filter((x) => x !== "eu") : [...brief.regions, "eu"] })} />
            <Chip label="Worldwide" selected={brief.regions.includes("global")} onPress={() => setBrief({ regions: brief.regions.includes("global") ? brief.regions.filter((x) => x !== "global") : [...brief.regions, "global"] })} />
          </View>
        </View>

        <View className="pt-4">
          <Pressable className="bg-blue-600 rounded-xl py-4 items-center" onPress={() => navigation.navigate("compliance")}>
            <Text className="text-white font-semibold text-lg">Next: Legal Requirements</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
