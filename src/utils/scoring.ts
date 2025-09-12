import type { BudgetScale, Compliance as ComplianceT, ProjectBrief, UserProfile, Weights, Recommendation, StackCandidate } from "../types/smartstack";

interface Inputs { profile: UserProfile; brief: ProjectBrief; compliance: ComplianceT; budget: BudgetScale; weights: Weights }

export function scoreStacks(stacks: StackCandidate[], inputs: Inputs): Recommendation[] {
  const { profile, brief, compliance, budget, weights } = inputs;

  function hardFilters(s: StackCandidate): string[] {
    const fails: string[] = [];
    // Residency
    if (compliance.data_residency === "eu" && !s.regions.includes("eu")) fails.push("European data storage required");
    if (compliance.gdpr && !s.compliance.includes("gdpr")) fails.push("GDPR compliance required");
    if (compliance.soc2 === true && !s.compliance.includes("soc2")) fails.push("Business security standards required");
    return fails;
  }

  function normalize(v: number, min: number, max: number) {
    if (max === min) return 0;
    return Math.max(0, Math.min(1, (v - min) / (max - min)));
  }

  return stacks.map((s) => {
    const fails = hardFilters(s);
    let base = 0;
    const rationale: string[] = [];

    // Speed: Use timeline and tech comfort to determine preference
    const isUrgent = profile.timeline === "asap";
    const isBeginner = profile.tech_comfort === "beginner";
    const isManaged = s.category !== "apple_first";
    
    let speedScore = 0.5; // default
    if (isUrgent && isManaged) {
      speedScore = 1;
      rationale.push("Quick setup for urgent timeline");
    } else if (isUrgent && !isManaged) {
      speedScore = 0.3;
      rationale.push("Native development takes longer for urgent projects");
    } else if (isBeginner && isManaged) {
      speedScore = 0.9;
      rationale.push("Managed solutions are beginner-friendly");
    } else if (!isBeginner && !isManaged) {
      speedScore = 0.8;
      rationale.push("Native development offers more control for experienced developers");
    } else {
      speedScore = 0.6;
      rationale.push("Good balance of features and complexity");
    }

    // TCO: estimate against budget band
    const bandMax = budget.monthly_mvp_band === "<50" ? 50 : budget.monthly_mvp_band === "50_200" ? 200 : budget.monthly_mvp_band === "200_500" ? 500 : 1000;
    const tcoScore = normalize(bandMax - s.est_monthly, 0, bandMax);
    if (s.est_monthly <= bandMax * 0.5) {
      rationale.push("Well within your budget");
    } else if (s.est_monthly <= bandMax) {
      rationale.push("Fits your budget");
    } else {
      rationale.push("May exceed your preferred budget");
    }

    // Platform preference
    let platformScore = 0.5;
    if (profile.prefs.apple_first && s.category === "apple_first") {
      platformScore = 1;
      rationale.push("Perfect match for iOS-first preference");
    } else if (profile.prefs.apple_first && s.category !== "apple_first") {
      platformScore = 0.4;
    } else if (!profile.prefs.apple_first && s.category !== "apple_first") {
      platformScore = 0.9;
      rationale.push("Great for multi-platform reach");
    }

    // App type matching
    let appTypeScore = 0.5;
    if (profile.app_type === "social" && s.category === "fullstack_js") {
      appTypeScore = 0.9;
      rationale.push("Excellent for social apps with real-time features");
    } else if (profile.app_type === "ecommerce" && s.category === "hybrid") {
      appTypeScore = 0.8;
      rationale.push("Good for e-commerce with payment integration");
    } else if (profile.app_type === "productivity" && s.category === "apple_first") {
      appTypeScore = 0.8;
      rationale.push("Native performance great for productivity apps");
    }

    // Compliance weight: match flags
    const compScore = (compliance.gdpr ? (s.compliance.includes("gdpr") ? 1 : 0.3) : 1) * 
                     (compliance.soc2 === true ? (s.compliance.includes("soc2") ? 1 : 0.2) : 1);

    base = (speedScore * weights.speed + tcoScore * weights.tco + platformScore * weights.lockin + 
            appTypeScore * weights.learning + compScore * weights.compliance) / 5;
    const score = fails.length ? 0 : base;

    const risks: string[] = [];
    if (fails.length) risks.push(...fails);
    if (s.category === "fullstack_js" && profile.prefs.apple_first) {
      risks.push("Cross-platform may not feel as native on iOS");
    }
    if (s.category !== "apple_first" && brief.features.offline === "required") {
      risks.push("Offline functionality requires additional setup");
    }
    if (profile.tech_comfort === "beginner" && s.category === "apple_first") {
      risks.push("Native development has a steeper learning curve");
    }
    if (s.est_monthly > bandMax) {
      risks.push("May exceed your preferred monthly budget");
    }

    const tco_band = s.est_monthly <= 50 ? "low" : s.est_monthly <= 200 ? "medium" : "high";

    return { candidate: s, score, rationale, risks, tco_band } as Recommendation;
  }).sort((a, b) => b.score - a.score);
}
