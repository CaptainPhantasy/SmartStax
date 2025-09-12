import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import useInterviewStore from "../state/interviewStore";
import useCatalogStore from "../state/catalogStore";
import { scoreStacks } from "../utils/scoring";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

function markdownPacket(md: string) { return md }

export default function Day1PlanScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "day1Plan">) {
  const insets = useSafeAreaInsets();
  const { profile, brief, compliance, budget, weights, selectedStackId } = useInterviewStore();
  const { stacks } = useCatalogStore();
  const results = scoreStacks(stacks, { profile, brief, compliance, budget, weights });
  
  // Use the selected stack or fall back to top recommendation
  const selectedStack = selectedStackId 
    ? stacks.find(s => s.id === selectedStackId) 
    : results[0]?.candidate;
  
  // Find the full recommendation object for the selected stack
  const primary = selectedStackId && selectedStack
    ? results.find(r => r.candidate.id === selectedStackId) || results[0]
    : results[0];

  // Use the detailed architecture from the selected stack
  const mermaid = primary?.candidate?.detailed_architecture || `graph TD\n  App[Client App] --> API[Auth+Data]\n  API --> DB[(DB/Storage)]\n  App --> Notif[Notifications]\n`;

  // Generate stack-specific setup checklist
  const checklist = primary?.candidate?.setup_commands ? [
    ...primary.candidate.setup_commands.initialization,
    ...primary.candidate.setup_commands.dependencies.slice(0, 2),
    ...primary.candidate.setup_commands.configuration.slice(0, 2),
  ] : [
    "Initialize repo and environment",
    "Create app bundle IDs and config", 
    "Provision auth and database",
    "Implement health check and crash reporting",
    "Ship internal build",
  ];

  // Generate stack-specific next steps
  const day7 = primary?.candidate?.specific_features ? [
    `Set up ${primary.candidate.tech_stack.authentication}`,
    `Configure ${primary.candidate.tech_stack.database}`,
    `Implement core UI with ${primary.candidate.tech_stack.frontend_framework}`,
    `Add ${primary.candidate.tech_stack.state_management} for state management`,
    `Set up ${primary.candidate.tech_stack.testing_framework} testing`,
  ] : [
    "Implement core flows",
    "Integrate payments if applicable", 
    "Add analytics and error tracking",
    "Write smoke tests",
  ];

  async function exportPacket() {
    const stack = primary.candidate;
    const techStack = stack.tech_stack;
    
    const md = `# Stack Decision Packet

## Primary Recommendation: ${stack.title}

**Score:** ${primary.score.toFixed(2)} | **TCO:** ${primary.tco_band}

### Technology Stack
- **Frontend:** ${techStack.frontend_framework}
- **Backend:** ${techStack.backend_framework || 'Client-side only'}
- **Database:** ${techStack.database}
- **Languages:** ${techStack.programming_languages.join(', ')}
- **Styling:** ${techStack.css_framework || 'Native styling'}
- **State Management:** ${techStack.state_management}
- **Authentication:** ${techStack.authentication}
- **Deployment:** ${techStack.deployment_platform}
- **Testing:** ${techStack.testing_framework}

### Why This Stack?
${primary.rationale.map((x) => "- "+x).join("\n")}

### Potential Risks
${primary.risks.map((x) => "- "+x).join("\n")}

### Technical Limitations
${stack.limitations?.map((x) => "- "+x).join("\n") || "- No major limitations identified"}

## Architecture Diagram

\`\`\`mermaid
${mermaid}
\`\`\`

## Setup Instructions

### Initial Setup
${stack.setup_commands.initialization.map((x) => "- "+x).join("\n")}

### Install Dependencies
${stack.setup_commands.dependencies.map((x) => "- "+x).join("\n")}

### Configuration
${stack.setup_commands.configuration.map((x) => "- "+x).join("\n")}

### Development Commands
${stack.setup_commands.development.map((x) => "- "+x).join("\n")}

## Next 7 Days Implementation Plan
${day7.map((x, i) => `${i+1}. ${x}`).join("\n")}

## Key Features You'll Get
${stack.specific_features.map((x) => "- "+x).join("\n")}

## Learning Resources
${stack.learning_resources.map((x) => "- "+x).join("\n")}

## Example Projects
${stack.example_projects.map((p) => `- **${p.name}**: ${p.description} (${p.complexity})`).join("\n")}
`;
    
    const path = FileSystem.cacheDirectory + "decision-packet.md";
    await FileSystem.writeAsStringAsync(path, markdownPacket(md));
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(path);
    }
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 bg-white dark:bg-gray-900" style={{ paddingTop: insets.top }}>
      <View className="px-5 py-6 gap-4">
        <View className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-blue-900 dark:text-blue-100 font-semibold text-lg flex-1">{primary.candidate.title}</Text>
            {selectedStackId && (
              <View className="bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                <Text className="text-green-800 dark:text-green-300 text-xs font-medium">Your Choice</Text>
              </View>
            )}
          </View>
          <Text className="text-blue-800 dark:text-blue-200 text-sm mb-3">{primary.candidate.summary}</Text>
          <View className="flex-row flex-wrap gap-2">
            {primary.candidate.tech_stack.programming_languages.map((lang) => (
              <View key={lang} className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                <Text className="text-blue-800 dark:text-blue-200 text-xs font-medium">{lang}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <Text className="text-gray-900 dark:text-gray-100 font-semibold mb-2">Technology Stack</Text>
          <View className="gap-2">
            <View className="flex-row justify-between">
              <Text className="text-gray-600 dark:text-gray-400">Frontend:</Text>
              <Text className="text-gray-900 dark:text-gray-100 font-medium">{primary.candidate.tech_stack.frontend_framework}</Text>
            </View>
            {primary.candidate.tech_stack.backend_framework && (
              <View className="flex-row justify-between">
                <Text className="text-gray-600 dark:text-gray-400">Backend:</Text>
                <Text className="text-gray-900 dark:text-gray-100 font-medium">{primary.candidate.tech_stack.backend_framework}</Text>
              </View>
            )}
            <View className="flex-row justify-between">
              <Text className="text-gray-600 dark:text-gray-400">Database:</Text>
              <Text className="text-gray-900 dark:text-gray-100 font-medium">{primary.candidate.tech_stack.database}</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600 dark:text-gray-400">Authentication:</Text>
              <Text className="text-gray-900 dark:text-gray-100 font-medium">{primary.candidate.tech_stack.authentication}</Text>
            </View>
          </View>
        </View>

        <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <Text className="text-gray-900 dark:text-gray-100 font-semibold mb-2">Architecture Diagram</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text className="text-gray-600 dark:text-gray-400 font-mono text-xs" style={{ minWidth: 300 }}>
              {mermaid}
            </Text>
          </ScrollView>
        </View>

        <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <Text className="text-gray-900 dark:text-gray-100 font-semibold mb-2">Initial Setup Steps</Text>
          {checklist.slice(0, 5).map((x, index) => (
            <Text key={x} className="text-gray-600 dark:text-gray-400 mb-1">
              {index + 1}. {x}
            </Text>
          ))}
        </View>

        <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <Text className="text-gray-900 dark:text-gray-100 font-semibold mb-2">Week 1 Implementation Plan</Text>
          {day7.map((x, index) => (
            <Text key={x} className="text-gray-600 dark:text-gray-400 mb-1">
              Day {index + 1}: {x}
            </Text>
          ))}
        </View>

        <View className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
          <Text className="text-gray-900 dark:text-gray-100 font-semibold mb-2">Key Features You'll Get</Text>
          {primary.candidate.specific_features.slice(0, 4).map((feature) => (
            <Text key={feature} className="text-gray-600 mb-1">• {feature}</Text>
          ))}
        </View>
        <View className="gap-3">
          <Pressable className="bg-blue-600 rounded-xl py-4 items-center" onPress={() => navigation.navigate("readiness")}> 
            <Text className="text-white font-semibold">Go to Readiness</Text>
          </Pressable>
          
          <Pressable 
            className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl py-4 items-center" 
            onPress={() => navigation.navigate("recommend")}
          > 
            <Text className="text-gray-900 dark:text-gray-100 font-semibold">Change Selection</Text>
          </Pressable>
        </View>
        <Pressable className="bg-gray-900 rounded-xl py-4 items-center" onPress={exportPacket}> 
          <Text className="text-white font-semibold">Export Decision Packet</Text>
        </Pressable>
        <Pressable className="bg-gray-800 rounded-xl py-4 items-center" onPress={async () => {
          const stack = primary.candidate;
          const setupCommands = stack.setup_commands;
          
          let scaffoldContent = `# ${stack.title} - Project Scaffold

## Prerequisites
- ${stack.tech_stack.development_tools.join('\n- ')}

## Setup Commands

### 1. Initialize Project
\`\`\`bash
${setupCommands.initialization.join('\n')}
\`\`\`

### 2. Install Dependencies  
\`\`\`bash
${setupCommands.dependencies.join('\n')}
\`\`\`

### 3. Configuration
${setupCommands.configuration.map(cmd => `- ${cmd}`).join('\n')}

### 4. Development
\`\`\`bash
${setupCommands.development.join('\n')}
\`\`\`

### 5. Deployment
\`\`\`bash
${setupCommands.deployment.join('\n')}
\`\`\`

## Package Dependencies
${stack.package_dependencies ? `
### Dependencies
\`\`\`json
${JSON.stringify(stack.package_dependencies.dependencies, null, 2)}
\`\`\`

### Dev Dependencies  
\`\`\`json
${JSON.stringify(stack.package_dependencies.devDependencies, null, 2)}
\`\`\`
` : 'See setup commands above for dependency installation'}

## Next Steps
1. Follow the setup commands in order
2. Refer to learning resources for detailed guides
3. Check example projects for implementation patterns
4. Join community forums for support

## Support Resources
${stack.learning_resources.map(resource => `- ${resource}`).join('\n')}
`;

          const path = FileSystem.cacheDirectory + "scaffold-guide.md";
          await FileSystem.writeAsStringAsync(path, scaffoldContent);
          if (await Sharing.isAvailableAsync()) { await Sharing.shareAsync(path); }
        }}> 
          <Text className="text-white font-semibold">Export Setup Guide</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
