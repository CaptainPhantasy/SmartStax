import React, { useState } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import useInterviewStore from "../state/interviewStore";
import type { TechStackPreferences } from "../types/smartstack";

interface TechOption {
  id: string;
  name: string;
  description: string;
  popularity: "popular" | "emerging" | "niche";
}

interface TechCategory {
  id: keyof TechStackPreferences;
  title: string;
  icon: string;
  description: string;
  options: TechOption[];
}

const techCategories: TechCategory[] = [
  {
    id: "frontend",
    title: "Frontend Frameworks",
    icon: "phone-portrait-outline",
    description: "User interface and client-side technologies",
    options: [
      { id: "react", name: "React", description: "Popular JavaScript library for building UIs", popularity: "popular" },
      { id: "vue", name: "Vue.js", description: "Progressive JavaScript framework", popularity: "popular" },
      { id: "angular", name: "Angular", description: "Full-featured TypeScript framework", popularity: "popular" },
      { id: "svelte", name: "Svelte", description: "Compile-time optimized framework", popularity: "emerging" },
      { id: "solid", name: "SolidJS", description: "Fine-grained reactive framework", popularity: "emerging" },
      { id: "alpine", name: "Alpine.js", description: "Lightweight JavaScript framework", popularity: "niche" },
      { id: "htmx", name: "HTMX", description: "HTML-first approach to modern web apps", popularity: "emerging" },
      { id: "qwik", name: "Qwik", description: "Resumable framework for instant loading", popularity: "emerging" },
      { id: "lit", name: "Lit", description: "Simple library for building web components", popularity: "niche" }
    ]
  },
  {
    id: "backend",
    title: "Backend Frameworks",
    icon: "server-outline",
    description: "Server-side frameworks and APIs",
    options: [
      { id: "express", name: "Express.js", description: "Minimal Node.js web framework", popularity: "popular" },
      { id: "nextjs", name: "Next.js", description: "Full-stack React framework", popularity: "popular" },
      { id: "fastapi", name: "FastAPI", description: "Modern Python web framework", popularity: "popular" },
      { id: "django", name: "Django", description: "High-level Python web framework", popularity: "popular" },
      { id: "rails", name: "Ruby on Rails", description: "Convention over configuration", popularity: "popular" },
      { id: "spring", name: "Spring Boot", description: "Java enterprise framework", popularity: "popular" },
      { id: "gin", name: "Gin", description: "Fast Go web framework", popularity: "emerging" },
      { id: "actix", name: "Actix Web", description: "Rust web framework", popularity: "emerging" },
      { id: "phoenix", name: "Phoenix", description: "Elixir web framework", popularity: "niche" },
      { id: "hono", name: "Hono", description: "Ultrafast web framework for edge", popularity: "emerging" },
      { id: "nestjs", name: "NestJS", description: "Progressive Node.js framework", popularity: "popular" },
      { id: "trpc", name: "tRPC", description: "End-to-end typesafe APIs", popularity: "emerging" },
      { id: "remix", name: "Remix", description: "Full-stack web framework", popularity: "emerging" },
      { id: "flask", name: "Flask", description: "Lightweight Python web framework", popularity: "popular" }
    ]
  },
  {
    id: "database",
    title: "Databases",
    icon: "library-outline",
    description: "Data storage and management systems",
    options: [
      { id: "postgresql", name: "PostgreSQL", description: "Advanced open-source relational database", popularity: "popular" },
      { id: "mysql", name: "MySQL", description: "Popular relational database", popularity: "popular" },
      { id: "mongodb", name: "MongoDB", description: "Document-based NoSQL database", popularity: "popular" },
      { id: "redis", name: "Redis", description: "In-memory data structure store", popularity: "popular" },
      { id: "sqlite", name: "SQLite", description: "Lightweight embedded database", popularity: "popular" },
      { id: "supabase", name: "Supabase", description: "Open-source Firebase alternative", popularity: "emerging" },
      { id: "planetscale", name: "PlanetScale", description: "Serverless MySQL platform", popularity: "emerging" },
      { id: "cockroachdb", name: "CockroachDB", description: "Distributed SQL database", popularity: "niche" },
      { id: "cassandra", name: "Cassandra", description: "Wide-column NoSQL database", popularity: "niche" },
      { id: "neo4j", name: "Neo4j", description: "Graph database", popularity: "niche" },
      { id: "firebase", name: "Firebase", description: "Google's mobile and web app platform", popularity: "popular" },
      { id: "dynamodb", name: "DynamoDB", description: "AWS NoSQL database", popularity: "popular" },
      { id: "turso", name: "Turso", description: "Edge SQLite database", popularity: "emerging" },
      { id: "neon", name: "Neon", description: "Serverless PostgreSQL", popularity: "emerging" }
    ]
  },
  {
    id: "mobile",
    title: "Mobile Development",
    icon: "phone-portrait",
    description: "Mobile app development frameworks",
    options: [
      { id: "react-native", name: "React Native", description: "Cross-platform mobile with React", popularity: "popular" },
      { id: "flutter", name: "Flutter", description: "Google's cross-platform framework", popularity: "popular" },
      { id: "swift", name: "Swift/SwiftUI", description: "Native iOS development", popularity: "popular" },
      { id: "kotlin", name: "Kotlin", description: "Native Android development", popularity: "popular" },
      { id: "expo", name: "Expo", description: "React Native development platform", popularity: "popular" },
      { id: "ionic", name: "Ionic", description: "Hybrid mobile app framework", popularity: "emerging" },
      { id: "xamarin", name: "Xamarin", description: "Microsoft cross-platform framework", popularity: "niche" },
      { id: "capacitor", name: "Capacitor", description: "Cross-platform native runtime", popularity: "emerging" }
    ]
  },
  {
    id: "cloud",
    title: "Cloud & Hosting",
    icon: "cloud-outline",
    description: "Cloud platforms and hosting services",
    options: [
      { id: "aws", name: "AWS", description: "Amazon Web Services", popularity: "popular" },
      { id: "vercel", name: "Vercel", description: "Frontend deployment platform", popularity: "popular" },
      { id: "netlify", name: "Netlify", description: "JAMstack deployment platform", popularity: "popular" },
      { id: "gcp", name: "Google Cloud", description: "Google Cloud Platform", popularity: "popular" },
      { id: "azure", name: "Microsoft Azure", description: "Microsoft cloud platform", popularity: "popular" },
      { id: "railway", name: "Railway", description: "Simple cloud deployment", popularity: "emerging" },
      { id: "render", name: "Render", description: "Cloud application platform", popularity: "emerging" },
      { id: "fly", name: "Fly.io", description: "Global application platform", popularity: "emerging" },
      { id: "digitalocean", name: "DigitalOcean", description: "Developer-focused cloud", popularity: "popular" },
      { id: "cloudflare", name: "Cloudflare", description: "Edge computing platform", popularity: "emerging" },
      { id: "heroku", name: "Heroku", description: "Platform as a service", popularity: "popular" },
      { id: "linode", name: "Linode", description: "Cloud computing platform", popularity: "niche" },
      { id: "coolify", name: "Coolify", description: "Self-hosted deployment platform", popularity: "niche" }
    ]
  },
  {
    id: "devtools",
    title: "Development Tools",
    icon: "construct-outline",
    description: "Build tools, testing, and development utilities",
    options: [
      { id: "vite", name: "Vite", description: "Fast build tool", popularity: "popular" },
      { id: "webpack", name: "Webpack", description: "Module bundler", popularity: "popular" },
      { id: "jest", name: "Jest", description: "JavaScript testing framework", popularity: "popular" },
      { id: "cypress", name: "Cypress", description: "End-to-end testing", popularity: "popular" },
      { id: "docker", name: "Docker", description: "Containerization platform", popularity: "popular" },
      { id: "github-actions", name: "GitHub Actions", description: "CI/CD automation", popularity: "popular" },
      { id: "turbo", name: "Turbo", description: "High-performance build system", popularity: "emerging" },
      { id: "playwright", name: "Playwright", description: "Cross-browser testing", popularity: "emerging" },
      { id: "vitest", name: "Vitest", description: "Vite-native testing framework", popularity: "emerging" },
      { id: "bun", name: "Bun", description: "Fast JavaScript runtime", popularity: "emerging" },
      { id: "eslint", name: "ESLint", description: "JavaScript linting utility", popularity: "popular" },
      { id: "prettier", name: "Prettier", description: "Code formatter", popularity: "popular" },
      { id: "storybook", name: "Storybook", description: "Tool for building UI components", popularity: "popular" },
      { id: "rollup", name: "Rollup", description: "Module bundler for libraries", popularity: "niche" }
    ]
  },
  {
    id: "languages",
    title: "Programming Languages",
    icon: "code-slash-outline",
    description: "Primary programming languages",
    options: [
      { id: "javascript", name: "JavaScript", description: "Dynamic programming language", popularity: "popular" },
      { id: "typescript", name: "TypeScript", description: "Typed JavaScript superset", popularity: "popular" },
      { id: "python", name: "Python", description: "Versatile programming language", popularity: "popular" },
      { id: "java", name: "Java", description: "Enterprise programming language", popularity: "popular" },
      { id: "csharp", name: "C#", description: "Microsoft programming language", popularity: "popular" },
      { id: "go", name: "Go", description: "Google's systems language", popularity: "emerging" },
      { id: "rust", name: "Rust", description: "Systems programming language", popularity: "emerging" },
      { id: "swift", name: "Swift", description: "Apple's programming language", popularity: "popular" },
      { id: "kotlin", name: "Kotlin", description: "Modern JVM language", popularity: "popular" },
      { id: "dart", name: "Dart", description: "Google's client-optimized language", popularity: "niche" }
    ]
  },
  {
    id: "styling",
    title: "CSS & Styling",
    icon: "color-palette-outline",
    description: "Styling frameworks and CSS tools",
    options: [
      { id: "tailwind", name: "Tailwind CSS", description: "Utility-first CSS framework", popularity: "popular" },
      { id: "bootstrap", name: "Bootstrap", description: "Popular CSS framework", popularity: "popular" },
      { id: "styled-components", name: "Styled Components", description: "CSS-in-JS library", popularity: "popular" },
      { id: "emotion", name: "Emotion", description: "CSS-in-JS library", popularity: "popular" },
      { id: "sass", name: "Sass/SCSS", description: "CSS preprocessor", popularity: "popular" },
      { id: "chakra", name: "Chakra UI", description: "React component library", popularity: "emerging" },
      { id: "mui", name: "Material-UI", description: "React Material Design components", popularity: "popular" },
      { id: "antd", name: "Ant Design", description: "Enterprise React UI library", popularity: "popular" },
      { id: "bulma", name: "Bulma", description: "Modern CSS framework", popularity: "niche" },
      { id: "unocss", name: "UnoCSS", description: "Instant on-demand atomic CSS", popularity: "emerging" }
    ]
  }
];

function TechOptionCard({ 
  option, 
  isSelected, 
  onToggle 
}: { 
  option: TechOption; 
  isSelected: boolean; 
  onToggle: () => void; 
}) {
  const popularityColors = {
    popular: "bg-green-50 border-green-200",
    emerging: "bg-blue-50 border-blue-200", 
    niche: "bg-purple-50 border-purple-200"
  };

  const popularityTextColors = {
    popular: "text-green-700",
    emerging: "text-blue-700",
    niche: "text-purple-700"
  };

  const popularityLabels = {
    popular: "Popular",
    emerging: "Emerging",
    niche: "Specialized"
  };

  return (
    <Pressable
      className={`border rounded-xl p-4 mb-3 ${
        isSelected 
          ? "bg-blue-600 border-blue-600" 
          : `bg-white dark:bg-gray-800 ${popularityColors[option.popularity]} dark:border-gray-600`
      }`}
      onPress={onToggle}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 mr-3">
          <View className="flex-row items-center gap-2 mb-1">
          <Text className={`font-semibold text-base ${
            isSelected ? "text-white" : "text-gray-900 dark:text-gray-100"
          }`}>
            {option.name}
          </Text>
            <Text className={`text-xs px-2 py-1 rounded-full ${
              isSelected 
                ? "bg-blue-500 text-white" 
                : `${popularityColors[option.popularity]} ${popularityTextColors[option.popularity]}`
            }`}>
              {popularityLabels[option.popularity]}
            </Text>
          </View>
        <Text className={`text-sm ${
          isSelected ? "text-blue-100" : "text-gray-600 dark:text-gray-400"
        }`}>
          {option.description}
        </Text>
        </View>
      <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
        isSelected 
          ? "bg-white border-white" 
          : "border-gray-300 dark:border-gray-600"
      }`}>
          {isSelected && (
            <Ionicons name="checkmark" size={16} color="#2563eb" />
          )}
        </View>
      </View>
    </Pressable>
  );
}

function CategorySection({ 
  category, 
  selectedOptions, 
  onToggleOption 
}: { 
  category: TechCategory; 
  selectedOptions: string[]; 
  onToggleOption: (categoryId: keyof TechStackPreferences, optionId: string) => void; 
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const selectedCount = category.options.filter(option => 
    selectedOptions.includes(option.id)
  ).length;

  return (
    <View className="mb-6">
      <Pressable 
        className="flex-row items-center justify-between mb-4"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View className="flex-row items-center gap-3 flex-1">
          <Ionicons name={category.icon as any} size={24} color="#374151" />
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {category.title}
            </Text>
            <Text className="text-sm text-gray-600 dark:text-gray-400">
              {category.description}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          {selectedCount > 0 && (
            <View className="bg-blue-600 rounded-full px-2 py-1">
              <Text className="text-white text-xs font-medium">
                {selectedCount}
              </Text>
            </View>
          )}
          <Ionicons 
            name={isExpanded ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#6b7280" 
          />
        </View>
      </Pressable>
      
      {isExpanded && (
        <View>
          {category.options.map((option) => (
            <TechOptionCard
              key={option.id}
              option={option}
              isSelected={selectedOptions.includes(option.id)}
              onToggle={() => onToggleOption(category.id, option.id)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

export default function TechStackSelectionScreen({ 
  navigation 
}: NativeStackScreenProps<RootStackParamList, "techStackSelection">) {
  const insets = useSafeAreaInsets();
  const { profile, setProfile } = useInterviewStore();
  const [searchQuery, setSearchQuery] = useState("");

  const techPreferences = profile.tech_preferences || {
    frontend: [],
    backend: [],
    database: [],
    mobile: [],
    cloud: [],
    devtools: [],
    languages: [],
    styling: []
  };

  const handleToggleOption = (categoryId: keyof TechStackPreferences, optionId: string) => {
    const currentSelections = techPreferences[categoryId] || [];
    const newSelections = currentSelections.includes(optionId)
      ? currentSelections.filter(id => id !== optionId)
      : [...currentSelections, optionId];

    setProfile({
      tech_preferences: {
        ...techPreferences,
        [categoryId]: newSelections
      }
    });
  };

  const filteredCategories = techCategories.map(category => ({
    ...category,
    options: category.options.filter(option =>
      searchQuery === "" || 
      option.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.options.length > 0);

  const totalSelected = Object.values(techPreferences).reduce(
    (sum, selections) => sum + selections.length, 
    0
  );

  return (
    <ScrollView 
      contentInsetAdjustmentBehavior="automatic" 
      className="flex-1 bg-white dark:bg-gray-900" 
      style={{ paddingTop: insets.top }}
    >
      <View className="px-6 py-8">
        <View className="mb-8">
          <Text className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Choose Your Tech Stack
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-base leading-6 mb-4">
            Select the technologies you prefer or want to learn. This helps us recommend the best stack for your project.
          </Text>
          
          {totalSelected > 0 && (
          <View className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <Text className="text-blue-900 dark:text-blue-100 font-medium">
              {totalSelected} technologies selected
            </Text>
            <Text className="text-blue-700 dark:text-blue-300 text-sm">
              You can always change these later
            </Text>
          </View>
          )}
        </View>

        <View className="mb-6">
          <View className="flex-row items-center bg-gray-50 dark:bg-gray-800 rounded-xl px-4 py-3 border border-gray-200 dark:border-gray-700">
            <Ionicons name="search-outline" size={20} color="#6b7280" />
            <TextInput
              className="flex-1 ml-3 text-gray-900 dark:text-gray-100"
              placeholder="Search technologies..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9ca3af"
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#6b7280" />
              </Pressable>
            )}
          </View>
        </View>

        {filteredCategories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            selectedOptions={techPreferences[category.id] || []}
            onToggleOption={handleToggleOption}
          />
        ))}

        {searchQuery && filteredCategories.length === 0 && (
          <View className="text-center py-12">
            <Ionicons name="search-outline" size={48} color="#d1d5db" />
            <Text className="text-gray-500 dark:text-gray-400 text-lg mt-4">
              No technologies found
            </Text>
            <Text className="text-gray-400 dark:text-gray-500 text-sm">
              Try a different search term
            </Text>
          </View>
        )}

        <View className="mt-8 gap-4">
          <Pressable 
            className="bg-blue-600 rounded-xl py-5 items-center"
            onPress={() => navigation.navigate("summary")}
          > 
            <Text className="text-white font-semibold text-lg">Continue</Text>
            <Text className="text-blue-100 text-sm mt-1">
              {totalSelected > 0 ? `${totalSelected} technologies selected` : "Skip for now"}
            </Text>
          </Pressable>

          <Pressable 
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl py-4 items-center"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-gray-900 dark:text-gray-100 font-semibold">Back</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}