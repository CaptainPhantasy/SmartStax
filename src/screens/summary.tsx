import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import useInterviewStore from "../state/interviewStore";
import { createSafeContainer } from "../utils/textUtils";

function SummaryCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mb-5">
      <View className="flex-row items-center gap-3 mb-4">
        <Ionicons name={icon as any} size={22} color="#374151" />
        <Text className="text-gray-900 dark:text-gray-100 font-semibold text-lg">{title}</Text>
      </View>
      {children}
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="py-2" style={{ gap: 20 }}>
      <View className="flex-row items-start" style={{ gap: 20 }}>
        <View style={{ width: '40%', minWidth: 120 }}>
          <Text 
            className="text-gray-600 dark:text-gray-400 text-base"
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {label}
          </Text>
        </View>
        <View style={createSafeContainer({ width: '60%' })}>
          <Text 
            className="text-gray-900 dark:text-gray-100 font-medium text-base"
            numberOfLines={4}
            ellipsizeMode="tail"
            style={{ textAlign: 'left' }}
          >
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function SummaryScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "summary">) {
  const insets = useSafeAreaInsets();
  const { profile, brief, compliance, budget } = useInterviewStore();
  
  // Check if user came directly from welcome screen (advanced path)
  const isDirectAccess = !profile.app_type || profile.app_type === "other";
  
  const gaps: string[] = [];
  if (brief.surfaces.length === 0) gaps.push("Please select where your app will work");
  if (!profile.app_type || profile.app_type === "other" && !profile.description) gaps.push("Tell us more about your app idea");

  const appTypeLabels = {
    social: "Social & Community",
    ecommerce: "Online Store", 
    food: "Food & Delivery",
    health: "Health & Fitness",
    productivity: "Productivity & Business",
    education: "Education & Learning",
    travel: "Travel & Local",
    games: "Games & Entertainment",
    other: "Custom App"
  };

  const budgetLabels = {
    "<50": "Testing budget ($0-50/month)",
    "50_200": "Small business ($50-200/month)",
    "200_500": "Growing company ($200-500/month)", 
    "500_plus": "Enterprise ($500+/month)"
  };

  const techComfortLabels = {
    beginner: "Beginner - prefer simple solutions",
    some_experience: "Some experience with development",
    advanced: "Advanced - comfortable with technical concepts"
  };

  const timelineLabels = {
    asap: "ASAP",
    "3_months": "3 months",
    "6_months": "6+ months",
    flexible: "Flexible timeline"
  };

  const enabledFeatures = Object.entries(brief.features)
    .filter(([_, enabled]) => enabled === true)
    .map(([key, _]) => {
      const labels: Record<string, string> = {
        auth: "User accounts",
        payments: "Payments", 
        realtime: "Live updates",
        file_uploads: "File sharing"
      };
      return labels[key] || key;
    });

  const featuresText = enabledFeatures.length > 0 ? enabledFeatures.join(", ") : "Basic app";

  const complianceNeeds = [
    compliance.gdpr && "European privacy laws",
    compliance.hipaa && "Healthcare privacy", 
    compliance.coppa && "Children's privacy",
    compliance.soc2 === true && "Business security standards"
  ].filter(Boolean);

  // Tech stack preferences
  const techPreferences = profile.tech_preferences;
  const totalTechSelections = techPreferences ? 
    Object.values(techPreferences).reduce((sum, selections) => sum + selections.length, 0) : 0;

  const techCategoryLabels = {
    frontend: "Frontend",
    backend: "Backend", 
    database: "Database",
    mobile: "Mobile",
    cloud: "Cloud",
    devtools: "Dev Tools",
    languages: "Languages"
  };

  const techNameMap: Record<string, string> = {
    // Frontend
    react: "React", vue: "Vue.js", angular: "Angular", svelte: "Svelte", solid: "SolidJS", alpine: "Alpine.js", htmx: "HTMX",
    // Backend
    express: "Express.js", nextjs: "Next.js", fastapi: "FastAPI", django: "Django", rails: "Ruby on Rails", spring: "Spring Boot", gin: "Gin", actix: "Actix Web", phoenix: "Phoenix", hono: "Hono",
    // Database
    postgresql: "PostgreSQL", mysql: "MySQL", mongodb: "MongoDB", redis: "Redis", sqlite: "SQLite", supabase: "Supabase", planetscale: "PlanetScale", cockroachdb: "CockroachDB", cassandra: "Cassandra", neo4j: "Neo4j",
    // Mobile
    "react-native": "React Native", flutter: "Flutter", swift: "Swift/SwiftUI", kotlin: "Kotlin", expo: "Expo", ionic: "Ionic", xamarin: "Xamarin", capacitor: "Capacitor",
    // Cloud
    aws: "AWS", vercel: "Vercel", netlify: "Netlify", gcp: "Google Cloud", azure: "Microsoft Azure", railway: "Railway", render: "Render", fly: "Fly.io", digitalocean: "DigitalOcean", cloudflare: "Cloudflare",
    // DevTools
    vite: "Vite", webpack: "Webpack", jest: "Jest", cypress: "Cypress", docker: "Docker", "github-actions": "GitHub Actions", turbo: "Turbo", playwright: "Playwright", vitest: "Vitest", bun: "Bun",
    // Languages
    javascript: "JavaScript", typescript: "TypeScript", python: "Python", java: "Java", csharp: "C#", go: "Go", rust: "Rust", dart: "Dart"
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 bg-white dark:bg-gray-900" style={{ paddingTop: insets.top }}>
      <View className="px-6 py-8">
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            {isDirectAccess ? "Configure Your App" : "Review Your Answers"}
          </Text>
          <Text className="text-gray-600 text-base leading-6">
            {isDirectAccess 
              ? "Set up your app details to get personalized technology recommendations"
              : "Make sure everything looks right before we generate your recommendations"
            }
          </Text>
        </View>

        {gaps.length > 0 && (
          <View className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-8">
            <View className="flex-row items-center gap-3 mb-3">
              <Ionicons name="warning-outline" size={22} color="#d97706" />
              <Text className="text-yellow-800 font-semibold text-base">
                {isDirectAccess ? "Complete these required fields" : "Please complete these items"}
              </Text>
            </View>
            {gaps.map((gap) => (
              <Text key={gap} className="text-yellow-800 text-base leading-6 mb-1">• {gap}</Text>
            ))}
          </View>
        )}

        {isDirectAccess && gaps.length > 0 && (
          <View className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
            <View className="flex-row items-center gap-3 mb-3">
              <Ionicons name="information-circle-outline" size={22} color="#2563eb" />
              <Text className="text-blue-900 font-semibold text-base">Quick Setup</Text>
            </View>
            <Text className="text-blue-800 text-base leading-6 mb-3">
              You can fill out the missing information directly on this screen, or go through the guided interview for a more detailed setup.
            </Text>
            <Pressable 
              className="bg-blue-600 rounded-lg py-3 px-4 items-center"
              onPress={() => navigation.navigate("profile")}
            >
              <Text className="text-white font-semibold">Start Guided Interview</Text>
            </Pressable>
          </View>
        )}

        <SummaryCard icon="person-outline" title="About You">
          <InfoRow label="App type" value={appTypeLabels[profile.app_type]} />
          <InfoRow label="Tech comfort" value={techComfortLabels[profile.tech_comfort]} />
          <InfoRow label="Timeline" value={timelineLabels[profile.timeline]} />
          <InfoRow label="Platform preference" value={profile.prefs.apple_first ? "iOS first" : "All platforms"} />
          {profile.app_type === "other" && profile.description && (
            <View className="mt-4 pt-4 border-t border-gray-200">
              <Text className="text-gray-600 text-base leading-6">Your idea: {profile.description}</Text>
            </View>
          )}
        </SummaryCard>

        <SummaryCard icon="phone-portrait-outline" title="App Details">
          <InfoRow label="Platforms" value={brief.surfaces.length > 0 ? brief.surfaces.join(", ") : "Not selected"} />
          <InfoRow label="Key features" value={featuresText} />
          <InfoRow label="Search" value={brief.features.search === "none" ? "Not needed" : brief.features.search} />
          <InfoRow label="AI features" value={brief.features.ai === "none" ? "Not needed" : brief.features.ai} />
          <InfoRow label="Offline use" value={brief.features.offline === "none" ? "Always online" : brief.features.offline.replace("_", " ")} />
          <InfoRow label="User regions" value={brief.regions.join(", ")} />
        </SummaryCard>

        <SummaryCard icon="shield-checkmark-outline" title="Legal & Compliance">
          {complianceNeeds.length > 0 ? (
            <View className="mb-4">
              <Text className="text-gray-600 text-base mb-2">Required compliance:</Text>
              {complianceNeeds.map((need, index) => (
                <Text key={index} className="text-gray-900 text-base leading-6 mb-1">• {need}</Text>
              ))}
            </View>
          ) : (
            <View className="mb-4">
              <Text className="text-gray-600 text-base">No special compliance requirements</Text>
            </View>
          )}
          <InfoRow label="Data storage" value={compliance.data_residency === "us" ? "United States" : compliance.data_residency === "eu" ? "Europe only" : "Anywhere"} />
        </SummaryCard>

        <SummaryCard icon="cash-outline" title="Budget & Scale">
          <InfoRow label="Monthly budget" value={budgetLabels[budget.monthly_mvp_band]} />
          <InfoRow label="Year 1 maximum" value={`$${budget.year1_ceiling.toLocaleString()}`} />
          <InfoRow label="Expected users" value={`${budget.usage.mau.toLocaleString()} monthly active`} />
          <InfoRow label="Peak usage" value={`${budget.usage.peak_concurrent} concurrent users`} />
        </SummaryCard>

        <SummaryCard icon="code-slash-outline" title="Tech Stack Preferences">
          {totalTechSelections > 0 ? (
            <View>
              <Text className="text-gray-600 text-base mb-3">
                {totalTechSelections} technologies selected
              </Text>
              {Object.entries(techPreferences || {}).map(([category, selections]) => {
                if (selections.length === 0) return null;
                return (
                  <View key={category} className="mb-3">
                    <Text className="text-gray-700 font-medium text-sm mb-1">
                      {techCategoryLabels[category as keyof typeof techCategoryLabels]}:
                    </Text>
                    <Text className="text-gray-900 text-base">
                      {selections.map((id: string) => techNameMap[id] || id).join(", ")}
                    </Text>
                  </View>
                );
              })}
              <Pressable 
                className="mt-3 pt-3 border-t border-gray-200"
                onPress={() => navigation.navigate("techStackSelection")}
              >
                <Text className="text-blue-600 font-medium">Edit preferences</Text>
              </Pressable>
            </View>
          ) : (
            <View>
              <Text className="text-gray-600 text-base mb-3">
                No specific technology preferences set
              </Text>
              <Pressable 
                className="bg-blue-50 border border-blue-200 rounded-lg py-3 px-4"
                onPress={() => navigation.navigate("techStackSelection")}
              >
                <Text className="text-blue-700 font-medium text-center">
                  Choose Your Tech Stack
                </Text>
              </Pressable>
            </View>
          )}
        </SummaryCard>

        <View className="mt-8 gap-4">
          <Pressable 
            className={gaps.length > 0 ? "bg-gray-400 rounded-xl py-5 items-center" : "bg-blue-600 rounded-xl py-5 items-center"} 
            onPress={() => gaps.length === 0 && navigation.navigate("recommend")}
            disabled={gaps.length > 0}
          > 
            <Text className="text-white font-semibold text-lg">Get My Recommendations</Text>
            <Text className="text-white text-base opacity-90 mt-1">Personalized for your needs</Text>
          </Pressable>

          {isDirectAccess && (
            <Pressable 
              className="border border-gray-300 rounded-xl py-4 items-center"
              onPress={() => navigation.navigate("welcome")}
            >
              <Text className="text-gray-900 font-semibold">Back to Welcome</Text>
            </Pressable>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
