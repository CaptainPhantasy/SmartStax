import React from "react";
import { View, Text, Pressable, Switch, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import ThemeToggle from "../components/ThemeToggle";

function ExampleCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <View className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 flex-row items-start gap-3">
      <View style={{ flexShrink: 0 }}>
        <Ionicons name={icon as any} size={24} color="#2563eb" />
      </View>
      <View className="flex-1" style={{ minWidth: 0 }}>
        <Text 
          className="text-blue-900 dark:text-blue-100 font-medium"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
        <Text 
          className="text-blue-700 dark:text-blue-300 text-sm"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {description}
        </Text>
      </View>
    </View>
  );
}

export default function WelcomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "welcome">) {
  const insets = useSafeAreaInsets();
  const [telemetry, setTelemetry] = React.useState(false);
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 bg-white dark:bg-gray-900" style={{ paddingTop: insets.top }}>
      <View className="px-5 py-6 gap-6">
        <View className="items-center gap-3">
          <Pressable onLongPress={() => navigation.navigate("adminCatalog")} className="flex-row items-center gap-3">
            <Ionicons name="phone-portrait-outline" size={32} color="#2563eb" />
            <Text className="text-3xl font-bold text-gray-900 dark:text-gray-100">Smart Stack</Text>
          </Pressable>
          <Text className="text-lg text-gray-600 dark:text-gray-300 text-center">Find the best tools to build your app</Text>
          <Text className="text-gray-500 dark:text-gray-400 text-center">Get personalized recommendations with costs and a getting started guide</Text>
        </View>

        <View className="gap-3">
          <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">Perfect for building:</Text>
          <ExampleCard icon="restaurant-outline" title="Food Delivery App" description="Like DoorDash or Uber Eats" />
          <ExampleCard icon="chatbubbles-outline" title="Social Platform" description="Connect people with shared interests" />
          <ExampleCard icon="storefront-outline" title="Online Store" description="Sell products to customers" />
          <ExampleCard icon="fitness-outline" title="Fitness Tracker" description="Help users reach health goals" />
        </View>

        <View className="flex-row items-start gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3">
          <View className="flex-1" style={{ minWidth: 0 }}>
            <Text 
              className="text-gray-900 dark:text-gray-100 font-medium"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Help improve recommendations
            </Text>
            <Text 
              className="text-gray-500 dark:text-gray-400 text-sm"
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              Anonymous usage data helps us suggest better tools
            </Text>
          </View>
          <View style={{ flexShrink: 0 }}>
            <Switch value={telemetry} onValueChange={setTelemetry} />
          </View>
        </View>

        <ThemeToggle />

        <View className="gap-4">
          <Pressable className="bg-blue-600 rounded-xl py-5 items-center" onPress={() => navigation.navigate("profile")}> 
            <View className="flex-row items-center gap-2 mb-1">
              <Ionicons name="sparkles-outline" size={20} color="white" />
              <Text className="text-white font-semibold text-lg">Get My Recommendations</Text>
            </View>
            <Text className="text-blue-100 text-sm">Guided interview • Takes 2-3 minutes</Text>
          </Pressable>
          
          <Pressable className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl py-5 items-center" onPress={() => navigation.navigate("techStackSelection")}> 
            <View className="flex-row items-center gap-2 mb-1">
              <Ionicons name="code-slash-outline" size={20} color="#374151" />
              <Text className="text-gray-900 dark:text-gray-100 font-semibold text-lg">I know what I want</Text>
            </View>
            <Text className="text-gray-600 dark:text-gray-400 text-sm">Choose your tech stack • Skip the interview</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
