import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { FeedbackProvider } from "@/components/feedback/FeedbackProvider";

export interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <FeedbackProvider>{children}</FeedbackProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
