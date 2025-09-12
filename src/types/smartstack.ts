export type Role = "solo" | "small_team" | "org";
export type AppType = "social" | "ecommerce" | "productivity" | "games" | "health" | "education" | "food" | "travel" | "other";
export type TechComfort = "beginner" | "some_experience" | "advanced";
export type Timeline = "asap" | "3_months" | "6_months" | "flexible";

export interface Skills {
  swift: number;
  react: number;
  node: number;
  sql: number;
  devops: number;
  security: number;
  design: number;
}

export interface Prefs {
  apple_first: boolean;
  js_only: boolean;
  oss_bias: "avoid" | "neutral" | "prefer";
  managed_bias: "avoid" | "neutral" | "prefer";
  lockin_tolerance: "low" | "medium" | "high";
}

export interface TimeBudget { weeks_to_mvp: number; hours_per_week: number }

export interface TechStackPreferences {
  frontend: string[];
  backend: string[];
  database: string[];
  mobile: string[];
  cloud: string[];
  devtools: string[];
  languages: string[];
  styling: string[];
}

export interface UserProfile {
  role: Role;
  skills: Skills;
  prefs: Prefs;
  time: TimeBudget;
  // New user-friendly fields
  app_type: AppType;
  tech_comfort: TechComfort;
  timeline: Timeline;
  description: string;
  tech_preferences?: TechStackPreferences;
}

export type Surface = "ios" | "android" | "web" | "desktop";

export interface Features {
  auth: boolean;
  payments: boolean;
  realtime: boolean;
  file_uploads: boolean;
  search: "none" | "basic" | "advanced";
  ai: "none" | "assist" | "vision" | "realtime";
  notifications: "none" | "push" | "email" | "both";
  offline: "none" | "nice_to_have" | "required";
}

export interface DataModel { model: "relational" | "document"; pii: boolean }

export interface ProjectBrief {
  surfaces: Surface[];
  features: Features;
  data: DataModel;
  regions: string[];
  latency_target_ms: number;
}

export interface Compliance {
  gdpr: boolean;
  soc2: boolean | "nice_to_have";
  hipaa: boolean;
  coppa: boolean;
  data_residency: "us" | "eu" | "global";
}

export interface UsageEstimates { mau: number; peak_concurrent: number; avg_asset_mb: number }

export interface BudgetScale {
  monthly_mvp_band: "<50" | "50_200" | "200_500" | "500_plus";
  year1_ceiling: number;
  usage: UsageEstimates;
}

export interface ProviderPricingTier { name: string; monthly: number }

export interface Provider {
  id: string;
  category: string;
  capabilities: string[];
  regions: string[];
  compliance: string[];
  pricing_tiers: ProviderPricingTier[];
}

export interface Weights {
  speed: number;
  tco: number;
  lockin: number;
  learning: number;
  compliance: number;
}

export interface TechStack {
  frontend_framework: string;
  backend_framework?: string;
  database: string;
  programming_languages: string[];
  css_framework?: string;
  state_management: string;
  authentication: string;
  deployment_platform: string;
  development_tools: string[];
  testing_framework: string;
  package_manager: string;
}

export interface SetupCommands {
  initialization: string[];
  dependencies: string[];
  configuration: string[];
  development: string[];
  deployment: string[];
}

export interface PackageDependencies {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  peerDependencies?: Record<string, string>;
}

export interface ExampleProject {
  name: string;
  description: string;
  github_url: string;
  demo_url?: string;
  complexity: "beginner" | "intermediate" | "advanced";
}

export interface StackCandidate {
  id: string; // e.g. "swiftui_grdb", "rn_expo_supabase"
  title: string;
  summary: string;
  components: string[]; // bullet list
  category: "apple_first" | "fullstack_js" | "hybrid" | "enterprise";
  regions: string[];
  compliance: string[];
  est_monthly: number; // baseline
  // New detailed specifications
  tech_stack: TechStack;
  detailed_architecture: string; // Mermaid diagram
  setup_commands: SetupCommands;
  package_dependencies?: PackageDependencies;
  specific_features: string[]; // Detailed technical capabilities
  limitations: string[]; // Technical limitations and constraints
  learning_resources: string[]; // Documentation and tutorial links
  example_projects: ExampleProject[];
  migration_notes?: string[]; // How to migrate from/to this stack
}

export interface Recommendation {
  candidate: StackCandidate;
  score: number;
  rationale: string[];
  risks: string[];
  tco_band: "low" | "medium" | "high";
}
