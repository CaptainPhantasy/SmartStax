import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/AppNavigator";
import useInterviewStore from "../state/interviewStore";

function ComplianceCard({ icon, title, description, whenNeeded, selected, onPress, level }: { 
  icon: string; 
  title: string; 
  description: string; 
  whenNeeded: string;
  selected: boolean; 
  onPress: () => void;
  level?: "required" | "optional" | "recommended";
}) {
  const levelColor = level === "required" ? "bg-red-100 text-red-800" : level === "recommended" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-600";
  const levelText = level === "required" ? "Required" : level === "recommended" ? "Recommended" : "Optional";
  
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
              style={{ flex: 1, minWidth: 120 }}
            >
              {title}
            </Text>
            {level && (
              <View className={`px-2 py-1 rounded-full ${levelColor}`} style={{ flexShrink: 0 }}>
                <Text className="text-xs font-medium">{levelText}</Text>
              </View>
            )}
          </View>
          <Text 
            className={selected ? "text-blue-700 text-sm mb-2" : "text-gray-600 text-sm mb-2"}
            numberOfLines={3}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
          <Text 
            className={selected ? "text-blue-600 text-xs" : "text-gray-500 text-xs"}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            When needed: {whenNeeded}
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
    <Pressable onPress={onPress} className={selected ? "px-4 py-2 rounded-full bg-blue-600 mr-2 mb-2" : "px-4 py-2 rounded-full bg-gray-100 mr-2 mb-2"}>
      <Text className={selected ? "text-white font-medium" : "text-gray-900 font-medium"}>{label}</Text>
    </Pressable>
  );
}

export default function ComplianceScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "compliance">) {
  const insets = useSafeAreaInsets();
  const { compliance, setCompliance } = useInterviewStore();

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic" className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      <View className="px-5 py-6 gap-6">
        <View>
          <Text className="text-2xl font-bold text-gray-900 mb-2">Legal Requirements</Text>
          <Text className="text-gray-600">Most apps don't need special compliance, but some industries have requirements</Text>
        </View>

        <View className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <View className="flex-row items-center gap-2 mb-2">
            <Ionicons name="information-circle" size={20} color="#2563eb" />
            <Text className="text-blue-900 font-semibold">Don't worry!</Text>
          </View>
          <Text className="text-blue-800 text-sm">Most simple apps don't need any of these. Select only what applies to your specific situation.</Text>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-3">Privacy & Data Protection</Text>
          
          <ComplianceCard
            icon="shield-outline"
            title="European Privacy Laws (GDPR)"
            description="Required if you have users in Europe or store their personal data"
            whenNeeded="European users, email collection, user profiles"
            selected={compliance.gdpr}
            onPress={() => setCompliance({ gdpr: !compliance.gdpr })}
            level="recommended"
          />

          <ComplianceCard
            icon="medical-outline"
            title="Healthcare Privacy (HIPAA)"
            description="Required for apps that handle medical information"
            whenNeeded="Health records, medical data, doctor-patient communication"
            selected={compliance.hipaa}
            onPress={() => setCompliance({ hipaa: !compliance.hipaa })}
            level="required"
          />

          <ComplianceCard
            icon="people-outline"
            title="Children's Privacy (COPPA)"
            description="Required for apps designed for kids under 13"
            whenNeeded="Educational apps, games for children, family apps"
            selected={compliance.coppa}
            onPress={() => setCompliance({ coppa: !compliance.coppa })}
            level="required"
          />
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-2">Business Security Standards</Text>
          <Text className="text-gray-600 text-sm mb-3">Do you need enterprise-grade security certification?</Text>
          <View className="flex-row flex-wrap">
            <Chip label="Not needed" selected={compliance.soc2 === false} onPress={() => setCompliance({ soc2: false })} />
            <Chip label="Nice to have" selected={compliance.soc2 === "nice_to_have"} onPress={() => setCompliance({ soc2: "nice_to_have" })} />
            <Chip label="Required" selected={compliance.soc2 === true} onPress={() => setCompliance({ soc2: true })} />
          </View>
          <Text className="text-gray-500 text-xs mt-2">SOC2 is mainly for B2B apps that handle sensitive business data</Text>
        </View>

        <View>
          <Text className="text-lg font-semibold text-gray-900 mb-2">Data Storage Location</Text>
          <Text className="text-gray-600 text-sm mb-3">Where should your user data be stored?</Text>
          <View className="flex-row flex-wrap">
            <Chip label="United States" selected={compliance.data_residency === "us"} onPress={() => setCompliance({ data_residency: "us" })} />
            <Chip label="Europe only" selected={compliance.data_residency === "eu"} onPress={() => setCompliance({ data_residency: "eu" })} />
            <Chip label="Anywhere" selected={compliance.data_residency === "global"} onPress={() => setCompliance({ data_residency: "global" })} />
          </View>
          <Text className="text-gray-500 text-xs mt-2">Some countries require data to stay within their borders</Text>
        </View>

        <View className="pt-4">
          <Pressable className="bg-blue-600 rounded-xl py-4 items-center" onPress={() => navigation.navigate("budgetScale")}>
            <Text className="text-white font-semibold text-lg">Next: Budget & Costs</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
