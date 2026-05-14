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

import { Button, Text } from "@/components";
import { Icon } from "@/icons";
import { fontFamily, palette, semantic, spacing } from "@/theme";
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

        <Animated.View
          entering={FadeIn.delay(1800).duration(500)}
          style={styles.detailsSection}
        >
          <Text
            variant="bodyLarge"
            color="secondary"
            style={styles.detailsLabel}
          >
            Transaction Details
          </Text>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text variant="body" color="secondary">
                Fee
              </Text>
              <Text variant="body">${fee.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text variant="body" color="secondary">
                Processing time
              </Text>
              <Text variant="body">Instant</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text variant="body" color="secondary">
                Total Charged
              </Text>
              <Text variant="body">${totalCharged.toFixed(2)} USD</Text>
            </View>
          </View>
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
    gap: spacing[8],
    alignSelf: "stretch",
    backgroundColor: semantic.background.primary,
    paddingTop: 42,
    paddingHorizontal: 24,
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
    gap: 12,
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
  detailsSection: {
    gap: spacing[3],
  },
  detailsLabel: {
    marginBottom: spacing[1],
  },
  summaryContainer: {
    backgroundColor: semantic.surface.primary,
    borderRadius: 8,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  summaryRow: {
    display: "flex",
    paddingVertical: 8,
    paddingHorizontal: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
  },
  summaryDivider: {
    height: 1,
    backgroundColor: semantic.border.subtle,
  },
  bottomSection: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
    paddingHorizontal: 24,
    paddingBottom: 42,
  },
});
