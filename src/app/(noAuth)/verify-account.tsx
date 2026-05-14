import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

import { Text } from "@/components/typography";
import { fontFamily, palette, semantic } from "@/theme";
const loadingAnim = require("@/animations/loading.json");

export default function VerifyAccountScreen() {
  const router = useRouter();
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(noAuth)/account-ready");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.circle}>
          <LottieView
            ref={lottieRef}
            source={loadingAnim}
            autoPlay
            loop
            resizeMode="contain"
            renderMode={Platform.OS === "android" ? "SOFTWARE" : "AUTOMATIC"}
            enableSafeModeAndroid
            cacheComposition={false}
            style={{ width: 40, height: 40 }}
          />
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.title}>Your account is being verified</Text>
          <Text variant="body" style={styles.subtitle}>
            Our compliance team is currently reviewing your request. Please wait a moment.
          </Text>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  circle: {
    width: 72,
    height: 72,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 36,
    backgroundColor: "#1C3360",
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
});
