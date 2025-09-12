import type { StackCandidate } from "../types/smartstack";

export interface ReadinessItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: "setup" | "auth" | "database" | "deployment" | "testing" | "monitoring";
}

export function generateReadinessChecklist(stackCandidate: StackCandidate): ReadinessItem[] {
  const items: ReadinessItem[] = [];
  const techStack = stackCandidate.tech_stack;
  const category = stackCandidate.category;

  // Development Environment Setup
  if (techStack.development_tools && techStack.development_tools.length > 0) {
    const tools = techStack.development_tools.slice(0, 2).join(", ");
    items.push({
      id: "dev-environment",
      title: "Development environment configured",
      description: `${tools} installed and working`,
      icon: "code-slash-outline",
      category: "setup"
    });
  }

  // Authentication Setup
  if (techStack.authentication) {
    const authSystem = techStack.authentication;
    items.push({
      id: "auth-configured",
      title: "Authentication system ready",
      description: `${authSystem} configured and tested`,
      icon: "shield-checkmark-outline",
      category: "auth"
    });
  }

  // Database Setup
  if (techStack.database) {
    const dbSystem = techStack.database;
    items.push({
      id: "database-ready",
      title: "Database connection established",
      description: `${dbSystem} accessible and schema deployed`,
      icon: "server-outline",
      category: "database"
    });
  }

  // Deployment Pipeline
  if (techStack.deployment_platform) {
    const platform = techStack.deployment_platform;
    items.push({
      id: "deployment-configured",
      title: "Deployment pipeline ready",
      description: `${platform} configured for automated builds`,
      icon: "cloud-upload-outline",
      category: "deployment"
    });
  }

  // Testing Framework
  if (techStack.testing_framework) {
    const testFramework = techStack.testing_framework;
    items.push({
      id: "testing-setup",
      title: "Test suite running",
      description: `${testFramework} configured with passing tests`,
      icon: "checkmark-circle-outline",
      category: "testing"
    });
  }

  // Stack-specific items
  switch (category) {
    case "apple_first":
      items.push({
        id: "ios-simulator",
        title: "iOS Simulator working",
        description: "App runs successfully in iOS Simulator",
        icon: "phone-portrait-outline",
        category: "setup"
      });
      if (stackCandidate.id === "swiftui_grdb") {
        items.push({
          id: "cloudkit-sync",
          title: "CloudKit sync operational",
          description: "Data syncing between device and iCloud",
          icon: "cloud-outline",
          category: "database"
        });
      }
      break;

    case "fullstack_js":
      items.push({
        id: "env-variables",
        title: "Environment variables configured",
        description: "API keys and configuration properly set",
        icon: "key-outline",
        category: "setup"
      });
      if (stackCandidate.id === "rn_expo_supabase") {
        items.push({
          id: "expo-build",
          title: "Expo build system ready",
          description: "EAS Build configured for app store deployment",
          icon: "construct-outline",
          category: "deployment"
        });
      }
      if (stackCandidate.id === "nextjs_prisma_postgres") {
        items.push({
          id: "prisma-migrations",
          title: "Database migrations applied",
          description: "Prisma schema deployed to production database",
          icon: "git-branch-outline",
          category: "database"
        });
      }
      break;

    case "hybrid":
      if (stackCandidate.id === "flutter_firebase") {
        items.push({
          id: "firebase-project",
          title: "Firebase project configured",
          description: "Firebase services connected and operational",
          icon: "flame-outline",
          category: "setup"
        });
        items.push({
          id: "platform-builds",
          title: "Multi-platform builds working",
          description: "iOS, Android, and web builds successful",
          icon: "layers-outline",
          category: "deployment"
        });
      }
      break;
  }

  // Error Monitoring (universal)
  items.push({
    id: "error-monitoring",
    title: "Error reporting enabled",
    description: "Crash reporting and error tracking active",
    icon: "bug-outline",
    category: "monitoring"
  });

  // Analytics (universal)
  items.push({
    id: "analytics-flowing",
    title: "Analytics events flowing",
    description: "User behavior tracking and metrics collection",
    icon: "analytics-outline",
    category: "monitoring"
  });

  return items.slice(0, 8); // Limit to 8 items for better UX
}

export function getReadinessProgress(items: ReadinessItem[]): {
  completed: number;
  total: number;
  percentage: number;
} {
  // For now, assume all items are completed (green checkmarks)
  // In a real app, this would track actual completion status
  const completed = items.length;
  const total = items.length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return { completed, total, percentage };
}