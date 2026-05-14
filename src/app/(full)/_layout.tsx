import { Stack, useRouter, useSegments } from "expo-router";
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
};

const NO_NAVBAR_ROUTES = new Set(["funds-processing", "funds-confirmation"]);

export default function FullScreenLayout() {
  const router = useRouter();
  const segments = useSegments();
  const currentRoute = segments[segments.length - 1] ?? "components";
  const hideNavbar = NO_NAVBAR_ROUTES.has(currentRoute);

  return (
    <View style={{ flex: 1, backgroundColor: palette.gray[950] }}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "left", "right"]}
      >
        {!hideNavbar && (
          <GlassNavbar
            title={TITLES[currentRoute] ?? "Components"}
            leftIcon="arrow-left"
            onLeftPress={() => router.back()}
            transparent
          />
        )}
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: "transparent" },
            animation: "slide_from_right",
          }}
        />
      </SafeAreaView>
    </View>
  );
}
