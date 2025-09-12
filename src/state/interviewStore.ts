import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { UserProfile, ProjectBrief, Compliance, BudgetScale, Weights } from "../types/smartstack";

interface InterviewState {
  profile: UserProfile;
  brief: ProjectBrief;
  compliance: Compliance;
  budget: BudgetScale;
  weights: Weights;
  selectedStackId: string | null;
  setProfile: (p: Partial<UserProfile>) => void;
  setBrief: (b: Partial<ProjectBrief>) => void;
  setCompliance: (c: Partial<Compliance>) => void;
  setBudget: (b: Partial<BudgetScale>) => void;
  setWeights: (w: Partial<Weights>) => void;
  setSelectedStack: (stackId: string) => void;
  reset: () => void;
}

const defaultState: Omit<InterviewState, "setProfile" | "setBrief" | "setCompliance" | "setBudget" | "setWeights" | "setSelectedStack" | "reset"> = {
  profile: {
    role: "solo",
    skills: { swift: 2, react: 3, node: 2, sql: 2, devops: 1, security: 1, design: 2 },
    prefs: { apple_first: true, js_only: false, oss_bias: "prefer", managed_bias: "neutral", lockin_tolerance: "low" },
    time: { weeks_to_mvp: 4, hours_per_week: 20 },
    app_type: "other",
    tech_comfort: "beginner",
    timeline: "3_months",
    description: "",
    tech_preferences: {
      frontend: [],
      backend: [],
      database: [],
      mobile: [],
      cloud: [],
      devtools: [],
      languages: [],
      styling: []
    },
  },
  brief: {
    surfaces: ["ios", "web"],
    features: { auth: true, payments: true, realtime: true, file_uploads: true, search: "basic", ai: "none", notifications: "push", offline: "nice_to_have" },
    data: { model: "relational", pii: true },
    regions: ["us"],
    latency_target_ms: 200,
  },
  compliance: { gdpr: true, soc2: "nice_to_have", hipaa: false, coppa: false, data_residency: "us" },
  budget: { monthly_mvp_band: "50_200", year1_ceiling: 2000, usage: { mau: 5000, peak_concurrent: 300, avg_asset_mb: 10 } },
  weights: { speed: 3, tco: 3, lockin: 2, learning: 3, compliance: 3 },
  selectedStackId: null,
};

const useInterviewStore = create<InterviewState>()(
  persist(
    (set, get) => ({
      ...defaultState,
      setProfile: (p) => set({ profile: { ...get().profile, ...p } }),
      setBrief: (b) => set({ brief: { ...get().brief, ...b } }),
      setCompliance: (c) => set({ compliance: { ...get().compliance, ...c } as any }),
      setBudget: (b) => set({ budget: { ...get().budget, ...b } }),
      setWeights: (w) => set({ weights: { ...get().weights, ...w } }),
      setSelectedStack: (stackId) => set({ selectedStackId: stackId }),
      reset: () => set({ ...defaultState }),
    }),
    { name: "smartstack-interview", storage: createJSONStorage(() => AsyncStorage) },
  ),
);

export default useInterviewStore;
