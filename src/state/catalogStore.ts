import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { StackCandidate } from "../types/smartstack";

interface CatalogState {
  version: string;
  stacks: StackCandidate[];
  importStacks: (json: StackCandidate[]) => void;
  exportStacks: () => StackCandidate[];
}

const seed: StackCandidate[] = [
  {
    id: "swiftui_grdb",
    title: "SwiftUI + CloudKit + GRDB",
    summary: "Native iOS development with local-first architecture. Perfect for performance-critical apps with offline capabilities and seamless iCloud sync.",
    components: ["SwiftUI for UI", "GRDB for local SQLite", "CloudKit for sync", "Core Data integration", "Xcode Cloud CI/CD"],
    category: "apple_first",
    regions: ["us", "eu"],
    compliance: ["gdpr"],
    est_monthly: 20,
    tech_stack: {
      frontend_framework: "SwiftUI",
      database: "SQLite with GRDB wrapper",
      programming_languages: ["Swift"],
      state_management: "SwiftUI @State, @StateObject, @ObservableObject",
      authentication: "Sign in with Apple + CloudKit",
      deployment_platform: "App Store via Xcode Cloud",
      development_tools: ["Xcode 15+", "iOS Simulator", "Instruments"],
      testing_framework: "XCTest + XCUITest",
      package_manager: "Swift Package Manager"
    },
    detailed_architecture: `graph TD
    A[SwiftUI App] --> B[GRDB SQLite]
    A --> C[CloudKit]
    C --> D[iCloud Private Database]
    A --> E[Sign in with Apple]
    B --> F[Core Data Models]
    A --> G[App Store]
    H[Xcode Cloud] --> G`,
    setup_commands: {
      initialization: [
        "Create new iOS project in Xcode",
        "Select SwiftUI interface and Swift language",
        "Enable CloudKit capability in project settings"
      ],
      dependencies: [
        "Add GRDB via Swift Package Manager: https://github.com/groue/GRDB.swift",
        "Add CloudKit framework to project"
      ],
      configuration: [
        "Configure CloudKit schema in CloudKit Console",
        "Set up Core Data model if needed",
        "Configure App Groups for data sharing"
      ],
      development: [
        "Run in iOS Simulator: Cmd+R",
        "Test on device: Select device and run",
        "Debug with Instruments for performance"
      ],
      deployment: [
        "Archive app: Product > Archive",
        "Upload to App Store Connect",
        "Configure Xcode Cloud for CI/CD"
      ]
    },
    specific_features: [
      "Native iOS performance and animations",
      "Offline-first with automatic CloudKit sync",
      "Deep iOS integration (Shortcuts, Widgets, etc.)",
      "Advanced Core Data relationships",
      "Sign in with Apple integration",
      "App Store optimization and TestFlight distribution"
    ],
    limitations: [
      "iOS only - no Android or web support",
      "Requires Mac for development",
      "CloudKit vendor lock-in",
      "Limited to Apple's ecosystem",
      "Steeper learning curve for non-iOS developers"
    ],
    learning_resources: [
      "Apple SwiftUI Documentation",
      "GRDB Documentation and Tutorials",
      "CloudKit Best Practices Guide",
      "iOS App Development with SwiftUI (Apple)",
      "Advanced iOS Architecture Patterns"
    ],
    example_projects: [
      {
        name: "TaskMaster iOS",
        description: "Task management app with offline sync",
        github_url: "https://github.com/example/taskmaster-ios",
        complexity: "intermediate"
      }
    ]
  },
  {
    id: "rn_expo_supabase",
    title: "React Native + Expo + Supabase",
    summary: "Full-stack TypeScript solution for rapid cross-platform development. Includes authentication, real-time database, and serverless functions out of the box.",
    components: ["React Native with Expo", "Supabase PostgreSQL", "TypeScript", "Expo Router", "Supabase Auth", "Real-time subscriptions"],
    category: "fullstack_js",
    regions: ["us", "eu"],
    compliance: ["gdpr", "soc2"],
    est_monthly: 50,
    tech_stack: {
      frontend_framework: "React Native with Expo SDK 50+",
      backend_framework: "Supabase Edge Functions (Deno)",
      database: "PostgreSQL 15 with Supabase",
      programming_languages: ["TypeScript", "JavaScript"],
      css_framework: "NativeWind (Tailwind CSS for React Native)",
      state_management: "Zustand with AsyncStorage persistence",
      authentication: "Supabase Auth (Google, Apple, Email)",
      deployment_platform: "EAS Build + App Store/Play Store",
      development_tools: ["Expo CLI", "EAS CLI", "VS Code", "Expo Go"],
      testing_framework: "Jest + React Native Testing Library",
      package_manager: "npm or yarn"
    },
    detailed_architecture: `graph TD
    A[React Native App] --> B[Expo Router]
    A --> C[Supabase Client]
    C --> D[PostgreSQL Database]
    C --> E[Supabase Auth]
    C --> F[Supabase Storage]
    C --> G[Edge Functions]
    A --> H[AsyncStorage]
    I[EAS Build] --> J[App Store]
    I --> K[Google Play]
    L[Supabase Dashboard] --> D`,
    setup_commands: {
      initialization: [
        "npx create-expo-app MyApp --template blank-typescript",
        "cd MyApp"
      ],
      dependencies: [
        "npx expo install @supabase/supabase-js",
        "npx expo install @react-native-async-storage/async-storage",
        "npm install zustand",
        "npm install nativewind",
        "npm install --save-dev tailwindcss"
      ],
      configuration: [
        "Create Supabase project at supabase.com",
        "Copy API keys to .env file",
        "Configure Tailwind CSS with nativewind",
        "Set up Supabase client configuration"
      ],
      development: [
        "npx expo start",
        "Press 'i' for iOS simulator",
        "Press 'a' for Android emulator",
        "Scan QR code with Expo Go for device testing"
      ],
      deployment: [
        "eas build --platform all",
        "eas submit --platform ios",
        "eas submit --platform android"
      ]
    },
    package_dependencies: {
      dependencies: {
        "@supabase/supabase-js": "^2.39.0",
        "@react-native-async-storage/async-storage": "1.21.0",
        "zustand": "^4.4.7",
        "nativewind": "^2.0.11",
        "expo-router": "~3.4.7"
      },
      devDependencies: {
        "tailwindcss": "3.3.2",
        "@types/react": "~18.2.45",
        "typescript": "^5.1.3"
      }
    },
    specific_features: [
      "Cross-platform iOS and Android from single codebase",
      "Real-time database subscriptions",
      "Built-in authentication with social providers",
      "Serverless functions with Edge Functions",
      "File storage and CDN with Supabase Storage",
      "Over-the-air updates with Expo Updates",
      "Push notifications with Expo Notifications"
    ],
    limitations: [
      "Expo limitations for certain native modules",
      "Supabase vendor lock-in",
      "Performance may not match native apps",
      "Limited offline capabilities compared to native",
      "Pricing scales with database usage"
    ],
    learning_resources: [
      "Expo Documentation",
      "Supabase Documentation",
      "React Native Documentation",
      "NativeWind Setup Guide",
      "Zustand State Management Guide"
    ],
    example_projects: [
      {
        name: "Social Feed App",
        description: "Instagram-like social media app with real-time features",
        github_url: "https://github.com/example/social-feed-rn",
        demo_url: "https://expo.dev/@example/social-feed",
        complexity: "intermediate"
      }
    ]
  },
  {
    id: "nextjs_prisma_postgres",
    title: "Next.js + Prisma + PostgreSQL",
    summary: "Modern full-stack web application with server-side rendering, type-safe database access, and seamless deployment. Perfect for web-first applications with mobile-responsive design.",
    components: ["Next.js 14 App Router", "Prisma ORM", "PostgreSQL", "NextAuth.js", "Tailwind CSS", "Vercel deployment"],
    category: "fullstack_js",
    regions: ["us", "eu", "global"],
    compliance: ["gdpr", "soc2"],
    est_monthly: 40,
    tech_stack: {
      frontend_framework: "Next.js 14 with App Router",
      backend_framework: "Next.js API Routes",
      database: "PostgreSQL with Prisma ORM",
      programming_languages: ["TypeScript", "JavaScript"],
      css_framework: "Tailwind CSS",
      state_management: "React Context + Server Components",
      authentication: "NextAuth.js with multiple providers",
      deployment_platform: "Vercel",
      development_tools: ["VS Code", "Prisma Studio", "Vercel CLI"],
      testing_framework: "Jest + React Testing Library + Playwright",
      package_manager: "npm or pnpm"
    },
    detailed_architecture: `graph TD
    A[Next.js App] --> B[App Router]
    A --> C[API Routes]
    C --> D[Prisma Client]
    D --> E[PostgreSQL]
    A --> F[NextAuth.js]
    F --> G[OAuth Providers]
    A --> H[Tailwind CSS]
    I[Vercel] --> A
    J[Prisma Studio] --> E`,
    setup_commands: {
      initialization: [
        "npx create-next-app@latest my-app --typescript --tailwind --eslint --app",
        "cd my-app"
      ],
      dependencies: [
        "npm install prisma @prisma/client",
        "npm install next-auth",
        "npm install @next-auth/prisma-adapter",
        "npm install bcryptjs",
        "npm install @types/bcryptjs"
      ],
      configuration: [
        "npx prisma init",
        "Configure DATABASE_URL in .env.local",
        "Set up Prisma schema",
        "npx prisma migrate dev --name init",
        "Configure NextAuth.js providers"
      ],
      development: [
        "npm run dev",
        "npx prisma studio (database GUI)",
        "npm run build (production build)",
        "npm run lint (code linting)"
      ],
      deployment: [
        "Connect GitHub repo to Vercel",
        "Configure environment variables",
        "Deploy automatically on git push",
        "Set up production database"
      ]
    },
    package_dependencies: {
      dependencies: {
        "next": "14.1.0",
        "react": "^18",
        "react-dom": "^18",
        "prisma": "^5.9.1",
        "@prisma/client": "^5.9.1",
        "next-auth": "^4.24.6",
        "@next-auth/prisma-adapter": "^1.0.7",
        "bcryptjs": "^2.4.3"
      },
      devDependencies: {
        "typescript": "^5",
        "@types/node": "^20",
        "@types/react": "^18",
        "@types/react-dom": "^18",
        "@types/bcryptjs": "^2.4.6",
        "eslint": "^8",
        "eslint-config-next": "14.1.0",
        "tailwindcss": "^3.3.0"
      }
    },
    specific_features: [
      "Server-side rendering and static generation",
      "Type-safe database queries with Prisma",
      "Built-in API routes and serverless functions",
      "Multiple authentication providers",
      "Automatic code splitting and optimization",
      "Edge runtime support",
      "Built-in SEO optimization"
    ],
    limitations: [
      "Web-only (no native mobile apps)",
      "Vercel vendor lock-in for optimal performance",
      "Cold start latency for serverless functions",
      "Database connection limits with serverless",
      "Requires separate mobile app for native features"
    ],
    learning_resources: [
      "Next.js Documentation",
      "Prisma Documentation",
      "NextAuth.js Documentation",
      "Tailwind CSS Documentation",
      "Vercel Deployment Guide"
    ],
    example_projects: [
      {
        name: "E-commerce Platform",
        description: "Full-featured online store with admin dashboard",
        github_url: "https://github.com/example/nextjs-ecommerce",
        demo_url: "https://nextjs-ecommerce-demo.vercel.app",
        complexity: "advanced"
      }
    ]
  },
  {
    id: "flutter_firebase",
    title: "Flutter + Firebase",
    summary: "Google's cross-platform framework with comprehensive backend services. Single codebase for iOS, Android, and web with real-time features and Google Cloud integration.",
    components: ["Flutter SDK", "Firebase Auth", "Cloud Firestore", "Firebase Functions", "Firebase Hosting", "FlutterFire plugins"],
    category: "hybrid",
    regions: ["global"],
    compliance: ["gdpr"],
    est_monthly: 35,
    tech_stack: {
      frontend_framework: "Flutter",
      backend_framework: "Firebase Cloud Functions (Node.js)",
      database: "Cloud Firestore (NoSQL)",
      programming_languages: ["Dart", "JavaScript/TypeScript"],
      state_management: "Provider or Riverpod",
      authentication: "Firebase Auth",
      deployment_platform: "Google Play Store, App Store, Firebase Hosting",
      development_tools: ["Flutter CLI", "Android Studio", "VS Code", "Firebase CLI"],
      testing_framework: "Flutter Test + Integration Tests",
      package_manager: "pub (Dart package manager)"
    },
    detailed_architecture: `graph TD
    A[Flutter App] --> B[Firebase SDK]
    B --> C[Firebase Auth]
    B --> D[Cloud Firestore]
    B --> E[Cloud Functions]
    B --> F[Firebase Storage]
    A --> G[Provider/Riverpod]
    H[Firebase Console] --> D
    I[Firebase Hosting] --> J[Web App]
    K[App Store] --> A
    L[Google Play] --> A`,
    setup_commands: {
      initialization: [
        "flutter create my_app",
        "cd my_app",
        "flutter pub get"
      ],
      dependencies: [
        "flutter pub add firebase_core",
        "flutter pub add firebase_auth",
        "flutter pub add cloud_firestore",
        "flutter pub add provider",
        "flutter pub add firebase_storage"
      ],
      configuration: [
        "Create Firebase project at console.firebase.google.com",
        "flutter pub global activate flutterfire_cli",
        "flutterfire configure",
        "Configure authentication providers in Firebase Console"
      ],
      development: [
        "flutter run (iOS simulator)",
        "flutter run -d android (Android emulator)",
        "flutter run -d chrome (web browser)",
        "flutter test (run tests)"
      ],
      deployment: [
        "flutter build apk (Android)",
        "flutter build ios (iOS)",
        "flutter build web (web)",
        "firebase deploy (web hosting)"
      ]
    },
    specific_features: [
      "Single codebase for iOS, Android, and web",
      "Hot reload for fast development",
      "Rich widget library and custom UI",
      "Real-time database synchronization",
      "Offline data persistence",
      "Push notifications with FCM",
      "Google services integration"
    ],
    limitations: [
      "Larger app size compared to native",
      "Firebase vendor lock-in",
      "Limited access to platform-specific APIs",
      "Dart language learning curve",
      "Performance may not match native for complex UIs"
    ],
    learning_resources: [
      "Flutter Documentation",
      "Firebase Documentation",
      "Dart Language Tour",
      "FlutterFire Documentation",
      "Flutter Widget Catalog"
    ],
    example_projects: [
      {
        name: "Chat Application",
        description: "Real-time messaging app with Firebase backend",
        github_url: "https://github.com/example/flutter-chat",
        complexity: "intermediate"
      }
    ]
  }
];

const useCatalogStore = create<CatalogState>()(
  persist(
    (set, get) => ({
      version: "0.1.0",
      stacks: seed,
      importStacks: (json) => set({ stacks: json }),
      exportStacks: () => get().stacks,
    }),
    { name: "smartstack-catalog", storage: createJSONStorage(() => AsyncStorage) },
  ),
);

export default useCatalogStore;
