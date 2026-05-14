import { Stack, useGlobalSearchParams, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { GlassNavbar } from "@/components";
import { palette } from "@/theme";

const TITLES: Record<string, string> = {
  components: "Components",
  "add-funds": "Add Funds",
  "funds-processing": "",
  "funds-confirmation": "",
  "movement-history": "My movements",
  "transaction-detail": "Transaction Details",
  "select-contact": "Select a contact",
  "send-summary": "Transaction Summary",
};

const NO_NAVBAR_ROUTES = new Set(["funds-processing", "funds-confirmation"]);

const BACK_TO_TABS = new Set(["add-funds"]);

const RIGHT_ICONS: Record<string, string> = {
  "select-contact": "user-add",
};

export default function FullScreenLayout() {
  const router = useRouter();
  const segments = useSegments();
  const params = useGlobalSearchParams<{ name?: string }>();
  const currentRoute = (segments[segments.length - 1] ?? "components") as string;
  const hideNavbar = NO_NAVBAR_ROUTES.has(currentRoute);
  const backToTabs = BACK_TO_TABS.has(currentRoute);
  const rightIcon = RIGHT_ICONS[currentRoute];

  const title =
    currentRoute === "send" && params.name
      ? `Send to ${params.name}`
      : (TITLES[currentRoute] ?? "Components");

  const handleBack = () => {
    if (backToTabs) {
      router.replace("/(tabs)");
    } else {
      router.back();
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.gray[950] }}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        {!hideNavbar && (
          <GlassNavbar
            title={title}
            leftIcon="arrow-left"
            onLeftPress={handleBack}
            rightIcon={rightIcon}
            onRightPress={rightIcon ? () => {} : undefined}
            transparent
          />
        )}
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
            animation: "slide_from_right",
          }}
        >
          <Stack.Screen
            name="add-funds"
            options={{ gestureEnabled: false, fullScreenGestureEnabled: false }}
          />
        </Stack>
      </SafeAreaView>
    </View>
  );
}
