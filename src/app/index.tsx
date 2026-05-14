import { Redirect } from "expo-router";

import { useAuth } from "@/providers/AuthProvider";

export default function Index() {
  const { isAuthenticated, isLoading, hasCompletedOnboarding } = useAuth();

  if (isLoading) return null;

  if (isAuthenticated) return <Redirect href="/(tabs)" />;
  if (hasCompletedOnboarding) return <Redirect href="/(noAuth)/login" />;

  return <Redirect href="/(noAuth)/onboarding" />;
}
