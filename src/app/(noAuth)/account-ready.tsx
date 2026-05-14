import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "@/components/buttons";
import { Text } from "@/components/typography";
import { Icon } from "@/icons";
import { useAuth } from "@/providers/AuthProvider";
import { fontFamily, palette, semantic } from "@/theme";

const BG_IMAGE = require("../../img/background_ready.png");

export default function AccountReadyScreen() {
  const router = useRouter();
  const { completeAccountSetup } = useAuth();

  const handleAuthNavigate = async (route: string) => {
    await completeAccountSetup();
    router.replace(route as any);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ImageBackground
        source={BG_IMAGE}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <View style={styles.container}>
        <View style={styles.centerSection}>
          <View style={styles.circle}>
            <Icon name="check" color={palette.white} width={32} height={32} />
          </View>

          <View style={styles.textBlock}>
            <Text style={styles.title}>All set</Text>
            <Text variant="body" style={styles.subtitle}>
              Your USDC wallet is ready. Add funds to your wallet and start sending money.
            </Text>
          </View>
        </View>

        <View style={styles.bottomSection}>
          <Button variant="primary" size="lg" onPress={() => handleAuthNavigate("/(tabs)/add-money")}>
            Add funds
          </Button>
          <Button variant="secondary" size="lg" onPress={() => handleAuthNavigate("/(tabs)")}>
            Go to home
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 42,
  },
  centerSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  circle: {
    width: 72,
    height: 72,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 36,
    backgroundColor: "#3865C0",
  },
  textBlock: {
    marginTop: 42,
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    alignSelf: "stretch",
  },
  title: {
    alignSelf: "stretch",
    textAlign: "center",
    color: palette.white,
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 24,
  },
  subtitle: {
    alignSelf: "stretch",
    textAlign: "center",
    color: palette.gray[200],
  },
  bottomSection: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
  },
});
