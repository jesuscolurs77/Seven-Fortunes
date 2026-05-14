import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Button } from "@/components/buttons";
import { Text } from "@/components/typography";
import { Icon } from "@/icons";
import { useAuth } from "@/providers/AuthProvider";
import { fontFamily, palette } from "@/theme";

const BG_IMAGE = require("../../img/background_login.png");

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useAuth();

  const handleGetStarted = () => {
    completeOnboarding();
    router.push("/(noAuth)/login");
  };

  const handleLogIn = () => {
    completeOnboarding();
    router.push("/(noAuth)/login");
  };

  return (
    <ImageBackground
      source={BG_IMAGE}
      style={StyleSheet.absoluteFill}
      resizeMode="cover"
    >
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Icon name="logo" width={32} height={32} />

          <View style={styles.textBlock}>
            <Text style={styles.titleText}>Send money to Peru.</Text>
            <Text style={styles.subtitleText}>
              Spend at a growing list of merchants across the nation.
            </Text>
          </View>

          <Button variant="primary" size="lg" onPress={handleGetStarted}>
            Get started
          </Button>

          <View style={styles.loginRow}>
            <Text style={styles.loginPrompt}>Already have an account?</Text>
            <TouchableOpacity onPress={handleLogIn} activeOpacity={0.7}>
              <Text style={styles.loginLink}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 42,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 32,
    alignSelf: "stretch",
  },
  textBlock: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    alignSelf: "stretch",
  },
  titleText: {
    alignSelf: "stretch",
    color: palette.white,
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 32,
    lineHeight: 42,
    letterSpacing: -0.3,
  },
  subtitleText: {
    width: 326,
    color: palette.gray[200],
    fontFamily: fontFamily.displayMedium,
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: -0.1,
  },
  loginRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    marginTop: 10,
    gap: 4,
  },
  loginPrompt: {
    color: palette.gray[200],
    fontFamily: fontFamily.body,
    fontWeight: "500",
    fontSize: 14,
    includeFontPadding: false,
  },
  loginLink: {
    color: palette.blue[300],
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 14,
    textDecorationLine: "underline",
    includeFontPadding: false,
  },
});
