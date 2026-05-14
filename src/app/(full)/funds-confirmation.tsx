import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, {
  Easing,
  FadeIn,
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import { Button, Summary, Text } from "@/components";
import { Icon } from "@/icons";
import { fontFamily, palette, semantic } from "@/theme";
import { captureAndShare } from "@/utils";

const FEE_RATE = 0.025;
const MOCK_AMOUNT = 500;
const LOGO_SIZE = 72;
const TOP_PADDING = 42;

const fee = MOCK_AMOUNT * FEE_RATE;
const totalCharged = MOCK_AMOUNT + fee;

export default function FundsConfirmationScreen() {
  const router = useRouter();
  const receiptRef = useRef<View>(null);
  const { height: screenHeight } = useWindowDimensions();

  const logoScale = useSharedValue(0.6);
  const logoOpacity = useSharedValue(0);
  const logoTranslateY = useSharedValue(
    screenHeight / 2 - TOP_PADDING - LOGO_SIZE / 2 - 80,
  );

  useEffect(() => {
    logoOpacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });
    logoScale.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });

    logoTranslateY.value = withDelay(
      500,
      withTiming(0, { duration: 600, easing: Easing.inOut(Easing.cubic) }),
    );
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { translateY: logoTranslateY.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.topWrapper} ref={receiptRef} collapsable={false}>
        <View style={styles.topSection}>
          <Animated.View style={[styles.circle, logoAnimatedStyle]}>
            <Icon name="check" width={32} height={32} />
          </Animated.View>

          <Animated.View
            entering={FadeInUp.delay(1200)
              .duration(500)
              .springify()
              .damping(25)
              .stiffness(300)}
            style={styles.textBlock}
          >
            <Text style={styles.title}>Funds Added Successfully</Text>
            <Text variant="body" style={styles.subtitle}>
              Your funds will be reflected shortly.
            </Text>
          </Animated.View>
        </View>

        <Animated.View entering={FadeIn.delay(1800).duration(500)}>
          <Summary
            items={[
              { label: "Fee", value: `$${fee.toFixed(2)}` },
              { label: "Processing time", value: "Instant" },
              {
                label: "Total Charged",
                value: `$${totalCharged.toFixed(2)} USD`,
              },
            ]}
          />
        </Animated.View>
      </View>

      <Animated.View
        entering={FadeInUp.delay(2400)
          .duration(500)
          .springify()
          .damping(25)
          .stiffness(300)}
        style={styles.bottomSection}
      >
        <Button
          variant="secondary"
          size="lg"
          onPress={() =>
            captureAndShare(receiptRef, { title: "Share Receipt" })
          }
        >
          Share Deposit ID
        </Button>
        <Button
          variant="primary"
          size="lg"
          onPress={() => router.replace("/(tabs)")}
        >
          Done
        </Button>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  topWrapper: {
    gap: 48,
    alignSelf: "stretch",
    backgroundColor: semantic.background.primary,
    paddingTop: 42,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  topSection: {
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
    gap: 12,
    borderRadius: 36,
    backgroundColor: "#3865C0",
  },
  textBlock: {
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
  },
  title: {
    alignSelf: "stretch",
    textAlign: "center",
    color: palette.white,
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 24,
    lineHeight: 32,
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
    paddingHorizontal: 16,
    paddingBottom: 42,
  },
});
