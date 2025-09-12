import React from "react";
import { View, Text, Pressable, ScrollView, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import useInterviewStore from "../state/interviewStore";
import useCatalogStore from "../state/catalogStore";
import { scoreStacks } from "../utils/scoring";

const { width: screenWidth } = Dimensions.get('window');

function ComparisonCard({ recommendation, rank, cardWidth }: { 
  recommendation: any; 
  rank: number; 
  cardWidth: number;
}) {
  const badges = {
    0: { label: "🏆 Best Match", color: "bg-green-100 text-green-800" },
    1: { label: "🥈 Alternative A", color: "bg-blue-100 text-blue-800" },
    2: { label: "🥉 Alternative B", color: "bg-purple-100 text-purple-800" },
  };

  const costColors = {
    low: "text-green-600",
    medium: "text-yellow-600", 
    high: "text-red-600"
  };

  const badge = badges[rank as keyof typeof badges];
  const costColor = costColors[recommendation.tco_band as keyof typeof costColors];

  const comparisonData = [
    { 
      label: "Frontend", 
      value: recommendation.candidate.tech_stack?.frontend_framework || "Not specified",
      icon: "phone-portrait-outline" as const
    },
    { 
      label: "Backend", 
      value: recommendation.candidate.tech_stack?.backend_framework || "Client-side only",
      icon: "server-outline" as const
    },
    { 
      label: "Database", 
      value: recommendation.candidate.tech_stack?.database || "Not specified",
      icon: "library-outline" as const
    },
    { 
      label: "Authentication", 
      value: recommendation.candidate.tech_stack?.authentication || "Not specified",
      icon: "shield-checkmark-outline" as const
    },
    { 
      label: "Languages", 
      value: (recommendation.candidate.tech_stack?.programming_languages || []).join(", ") || "Not specified",
      icon: "code-slash-outline" as const
    },
    { 
      label: "Deployment", 
      value: recommendation.candidate.tech_stack?.deployment_platform || "Not specified",
      icon: "cloud-upload-outline" as const
    },
    { 
      label: "TCO Level", 
      value: recommendation.tco_band,
      icon: "cash-outline" as const
    },
    { 
      label: "Risk Count", 
      value: `${recommendation.risks.length} ${recommendation.risks.length === 1 ? 'risk' : 'risks'}`,
      icon: "alert-circle-outline" as const
    },
  ];

  return (
    <View 
      className="bg-white border border-gray-200 rounded-xl p-5 mr-4 shadow-sm" 
      style={{ width: cardWidth, minHeight: 420 }}
    >
      {/* Header */}
      <View className="mb-4">
        <View className="flex-row items-start justify-between mb-3" style={{ flexWrap: 'wrap', gap: 8 }}>
          <View className={`px-3 py-1 rounded-full ${badge.color}`} style={{ flexShrink: 0 }}>
            <Text className="text-sm font-medium">{badge.label}</Text>
          </View>
          <View className="flex-row items-center gap-1" style={{ flexShrink: 0 }}>
            <Ionicons name="cash-outline" size={16} color="#6b7280" />
            <Text className={`font-semibold ${costColor}`}>${recommendation.candidate.est_monthly}/mo</Text>
          </View>
        </View>
        
        <Text className="text-lg font-bold text-gray-900 mb-2" numberOfLines={2} ellipsizeMode="tail">
          {recommendation.candidate.title}
        </Text>
      </View>

      {/* Comparison Details */}
      <View className="flex-1">
        {comparisonData.map((item) => (
          <View key={item.label} className="mb-4">
            <View className="flex-row items-center gap-2 mb-2">
              <Ionicons name={item.icon} size={16} color="#6b7280" />
              <Text className="text-gray-600 text-sm font-medium">{item.label}</Text>
            </View>
            <Text 
              className={item.label === "TCO Level" ? `font-semibold ${costColor}` : "text-gray-900 font-medium"}
              numberOfLines={4}
              ellipsizeMode="tail"
              style={{ lineHeight: 20, paddingLeft: 24 }}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function RecommendationCard({ recommendation, rank, isSelected, onSelect }: { 
  recommendation: any; 
  rank: number; 
  isSelected: boolean; 
  onSelect: () => void;
}) {
  const badges = {
    0: { label: "🏆 Best Match", color: "bg-green-100 text-green-800" },
    1: { label: "🥈 Alternative A", color: "bg-blue-100 text-blue-800" },
    2: { label: "🥉 Alternative B", color: "bg-purple-100 text-purple-800" },
  };

  const costColors = {
    low: "text-green-600",
    medium: "text-yellow-600", 
    high: "text-red-600"
  };

  const badge = badges[rank as keyof typeof badges];
  const costColor = costColors[recommendation.tco_band as keyof typeof costColors];

  return (
    <Pressable onPress={onSelect} className={isSelected ? "border-2 border-blue-600 bg-blue-50 rounded-xl p-5 mb-4" : "border border-gray-200 rounded-xl p-5 mb-4"}>
      <View className="flex-row items-start justify-between mb-3" style={{ flexWrap: 'wrap', gap: 8 }}>
        <View className={`px-3 py-1 rounded-full ${badge.color}`} style={{ flexShrink: 0 }}>
          <Text className="text-sm font-medium">{badge.label}</Text>
        </View>
        <View className="flex-row items-center gap-1" style={{ flexShrink: 0 }}>
          <Ionicons name="cash-outline" size={16} color="#6b7280" />
          <Text className={`font-semibold ${costColor}`}>${recommendation.candidate.est_monthly}/mo</Text>
        </View>
      </View>

      <Text 
        className={isSelected ? "text-xl font-bold text-blue-900 mb-2" : "text-xl font-bold text-gray-900 mb-2"}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {recommendation.candidate.title}
      </Text>
      
      <Text 
        className={isSelected ? "text-blue-700 mb-5" : "text-gray-700 mb-5"}
        numberOfLines={6}
        ellipsizeMode="tail"
        style={{ lineHeight: 20 }}
      >
        {recommendation.candidate.summary}
      </Text>

      <View className="mb-5">
        <Text className={isSelected ? "text-blue-900 font-semibold mb-3" : "text-gray-900 font-semibold mb-3"}>Technology Stack</Text>
        <View className="gap-2 mb-4">
          <View className="flex-row justify-between">
            <Text className={isSelected ? "text-blue-700 text-sm" : "text-gray-600 text-sm"}>Frontend</Text>
            <Text className={isSelected ? "text-blue-900 text-sm font-medium" : "text-gray-900 text-sm font-medium"}>{recommendation.candidate.tech_stack?.frontend_framework || "Not specified"}</Text>
          </View>
          {recommendation.candidate.tech_stack?.backend_framework && (
            <View className="flex-row justify-between">
              <Text className={isSelected ? "text-blue-700 text-sm" : "text-gray-600 text-sm"}>Backend</Text>
              <Text className={isSelected ? "text-blue-900 text-sm font-medium" : "text-gray-900 text-sm font-medium"}>{recommendation.candidate.tech_stack.backend_framework}</Text>
            </View>
          )}
          <View className="flex-row justify-between">
            <Text className={isSelected ? "text-blue-700 text-sm" : "text-gray-600 text-sm"}>Database</Text>
            <Text className={isSelected ? "text-blue-900 text-sm font-medium" : "text-gray-900 text-sm font-medium"}>{recommendation.candidate.tech_stack?.database || "Not specified"}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text className={isSelected ? "text-blue-700 text-sm" : "text-gray-600 text-sm"}>Languages</Text>
            <Text className={isSelected ? "text-blue-900 text-sm font-medium" : "text-gray-900 text-sm font-medium"}>{recommendation.candidate.tech_stack?.programming_languages?.join(", ") || "Not specified"}</Text>
          </View>
        </View>

        <Text className={isSelected ? "text-blue-900 font-semibold mb-3" : "text-gray-900 font-semibold mb-3"}>Key Features</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          {(recommendation.candidate.specific_features || recommendation.candidate.components).slice(0, 4).map((feature: string, i: number) => (
            <View key={i} className={isSelected ? "bg-blue-100 px-3 py-2 rounded-full" : "bg-gray-100 px-3 py-2 rounded-full"}>
              <Text className={isSelected ? "text-blue-800 text-sm" : "text-gray-700 text-sm"} numberOfLines={2} ellipsizeMode="tail">{feature}</Text>
            </View>
          ))}
        </View>
      </View>

      <View className="mb-5">
        <Text className={isSelected ? "text-blue-900 font-semibold mb-3" : "text-gray-900 font-semibold mb-3"}>Why this works for you:</Text>
        {recommendation.rationale.slice(0, 2).map((reason: string, i: number) => (
          <View key={i} className="flex-row items-start gap-3 mb-2">
            <View style={{ flexShrink: 0, marginTop: 2 }}>
              <Ionicons name="checkmark-circle" size={16} color="#10b981" />
            </View>
            <Text 
              className={isSelected ? "text-blue-700 text-sm" : "text-gray-600 text-sm"}
              style={{ flex: 1, minWidth: 0, lineHeight: 18 }}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {reason}
            </Text>
          </View>
        ))}
      </View>

      {recommendation.risks.length > 0 && (
        <View className="mb-4">
          <Text className={isSelected ? "text-blue-900 font-semibold mb-3" : "text-gray-900 font-semibold mb-3"}>Things to consider:</Text>
          {recommendation.risks.slice(0, 2).map((risk: string, i: number) => (
            <View key={i} className="flex-row items-start gap-3 mb-2">
              <View style={{ flexShrink: 0, marginTop: 2 }}>
                <Ionicons name="alert-circle-outline" size={16} color="#f59e0b" />
              </View>
              <Text 
                className={isSelected ? "text-blue-700 text-sm" : "text-gray-600 text-sm"}
                style={{ flex: 1, minWidth: 0, lineHeight: 18 }}
                numberOfLines={4}
                ellipsizeMode="tail"
              >
                {risk}
              </Text>
            </View>
          ))}
        </View>
      )}

      {isSelected && (
        <View className="mt-4 pt-4 border-t border-blue-200">
          <View className="flex-row items-center gap-2">
            <Ionicons name="star" size={16} color="#2563eb" />
            <Text className="text-blue-900 font-medium">Selected as your recommendation</Text>
          </View>
        </View>
      )}
    </Pressable>
  );
}

export default function RecommendScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "recommend">) {
  const insets = useSafeAreaInsets();
  const { profile, brief, compliance, budget, weights, selectedStackId, setSelectedStack } = useInterviewStore();
  const { stacks } = useCatalogStore();
  
  // Memoize the scoring results to prevent unnecessary recalculations
  const results = React.useMemo(() => {
    return scoreStacks(stacks, { profile, brief, compliance, budget, weights });
  }, [stacks, profile, brief, compliance, budget, weights]);
  
  const top = React.useMemo(() => {
    return results.slice(0, 3);
  }, [results]);
  
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [showCompare, setShowCompare] = React.useState(false);
  const [currentCompareIndex, setCurrentCompareIndex] = React.useState(0);
  
  const cardWidth = screenWidth * 0.8; // 80% of screen width
  const cardSpacing = 16;

  const handleStackSelection = (index: number) => {
    setSelectedIndex(index);
    setSelectedStack(top[index].candidate.id);
  };

  // Set initial selection on component mount only if no selection exists
  React.useEffect(() => {
    if (top.length > 0 && !selectedStackId) {
      setSelectedStack(top[0].candidate.id);
    }
  }, [top.length, selectedStackId, setSelectedStack]); // Keep setSelectedStack but it's stable from Zustand

  // Update selectedIndex when selectedStackId changes
  React.useEffect(() => {
    if (selectedStackId && top.length > 0) {
      const index = top.findIndex(item => item.candidate.id === selectedStackId);
      if (index !== -1 && index !== selectedIndex) {
        setSelectedIndex(index);
      }
    }
  }, [selectedStackId, top, selectedIndex]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="px-5 py-6">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Your Recommendations</Text>
          <Text className="text-gray-600">Based on your app type, budget, and preferences. Tap to select your preferred option.</Text>
        </View>

        <View className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <View className="flex-row items-center gap-2 mb-2">
            <Ionicons name="bulb-outline" size={20} color="#2563eb" />
            <Text className="text-blue-900 font-semibold">Pro tip</Text>
          </View>
          <Text className="text-blue-800 text-sm">The top recommendation is personalized for your specific needs, but all options will work great for your {profile.app_type} app!</Text>
        </View>

          {top.map((recommendation, idx) => (
            <RecommendationCard
              key={recommendation.candidate.id}
              recommendation={recommendation}
              rank={idx}
              isSelected={selectedIndex === idx}
              onSelect={() => handleStackSelection(idx)}
            />
          ))}

        <View className="mt-4">
          <Pressable className="border border-gray-300 rounded-xl py-3 items-center" onPress={() => setShowCompare((s) => !s)}> 
            <Text className="text-gray-900 font-semibold">{showCompare ? "Hide Compare" : "Compare Stacks"}</Text>
          </Pressable>
        </View>

        {showCompare && (
          <View className="mt-4">
            {/* Header */}
            <View className="mb-5">
              <Text className="text-gray-900 font-semibold text-lg mb-2">Compare Stacks</Text>
              <Text className="text-gray-600 text-base leading-6">Swipe to compare different technology stacks side by side</Text>
            </View>

            {/* Horizontal Scrollable Cards */}
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              snapToInterval={cardWidth + cardSpacing}
              decelerationRate="fast"
              contentContainerStyle={{ paddingHorizontal: 4 }}
              onMomentumScrollEnd={(event) => {
                const newIndex = Math.round(event.nativeEvent.contentOffset.x / (cardWidth + cardSpacing));
                setCurrentCompareIndex(Math.max(0, Math.min(newIndex, top.length - 1)));
              }}
            >
              {top.map((recommendation, idx) => (
                <ComparisonCard
                  key={recommendation.candidate.id}
                  recommendation={recommendation}
                  rank={idx}
                  cardWidth={cardWidth}
                />
              ))}
            </ScrollView>

            {/* Navigation Indicators */}
            <View className="flex-row justify-center items-center mt-5 gap-3">
              {top.map((_, idx) => (
                <View
                  key={idx}
                  className={currentCompareIndex === idx ? "w-3 h-3 rounded-full bg-blue-600" : "w-2 h-2 rounded-full bg-gray-300"}
                />
              ))}
            </View>

            {/* Navigation Info */}
            <View className="flex-row justify-center items-center mt-3">
              <Text className="text-gray-500 text-base">
                {currentCompareIndex + 1} of {top.length} • {top[currentCompareIndex]?.candidate.title}
              </Text>
            </View>
          </View>
        )}

        <View className="mt-6">
          <Pressable className="bg-blue-600 rounded-xl py-4 items-center" onPress={() => navigation.navigate("day1Plan")}> 
            <Text className="text-white font-semibold text-lg">Get My Setup Guide</Text>
            <Text className="text-blue-100 text-sm">Step-by-step instructions to get started</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
