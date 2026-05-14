import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Platform, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import { Text } from "@/components/typography";
import { fontFamily, palette } from "@/theme";

const loadingAnim = require("@/animations/loading.json");

export default function FundsProcessingScreen() {
  const router = useRouter();
  const lottieRef = useRef<LottieView>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(full)/funds-confirmation");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
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
        <Text style={styles.title}>Your funds are being added</Text>
        <Text variant="body" style={styles.subtitle}>
          Please wait a moment while we process your transaction.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
