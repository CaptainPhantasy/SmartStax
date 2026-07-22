import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/welcome";
import ProfileScreen from "../screens/profile";
import ProductBriefScreen from "../screens/productBrief";
import ComplianceScreen from "../screens/compliance";
import BudgetScaleScreen from "../screens/budgetScale";
import IntegrationsScreen from "../screens/integrations";
import SummaryScreen from "../screens/summary";
import RecommendScreen from "../screens/recommend";
import Day1PlanScreen from "../screens/day1Plan";
import ReadinessScreen from "../screens/readiness";
import AdminCatalogScreen from "../screens/adminCatalog";
import TechStackSelectionScreen from "../screens/techStackSelection";

export type RootStackParamList = {
  welcome: undefined;
  profile: undefined;
  productBrief: undefined;
  compliance: undefined;
  budgetScale: undefined;
  integrations: undefined;
  techStackSelection: undefined;
  summary: undefined;
  recommend: undefined;
  day1Plan: undefined;
  readiness: undefined;
  adminCatalog: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerLargeTitle: true }} initialRouteName="welcome">
      <Stack.Screen name="welcome" component={WelcomeScreen} options={{ title: "SmartStax" }} />
      <Stack.Screen name="profile" component={ProfileScreen} options={{ title: "Your Profile" }} />
      <Stack.Screen name="productBrief" component={ProductBriefScreen} options={{ title: "Product Brief" }} />
      <Stack.Screen name="compliance" component={ComplianceScreen} options={{ title: "Compliance" }} />
      <Stack.Screen name="budgetScale" component={BudgetScaleScreen} options={{ title: "Budget & Scale" }} />
      <Stack.Screen name="integrations" component={IntegrationsScreen} options={{ title: "Integrations" }} />
      <Stack.Screen name="techStackSelection" component={TechStackSelectionScreen} options={{ title: "Tech Stack" }} />
      <Stack.Screen name="summary" component={SummaryScreen} options={{ title: "Summary" }} />
      <Stack.Screen name="recommend" component={RecommendScreen} options={{ title: "Recommendations" }} />
      <Stack.Screen name="day1Plan" component={Day1PlanScreen} options={{ title: "Day 1 Plan" }} />
      <Stack.Screen name="readiness" component={ReadinessScreen} options={{ title: "Readiness" }} />
      <Stack.Screen name="adminCatalog" component={AdminCatalogScreen} options={{ title: "Catalog Admin" }} />
    </Stack.Navigator>
  );
}
