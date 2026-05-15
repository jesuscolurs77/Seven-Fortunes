import { usePreventRemove } from "@react-navigation/native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BackHandler,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text as RNText,
  View,
  useWindowDimensions,
} from "react-native";
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

const FUNDS_FEE_RATE = 0.025;
const FUNDS_MOCK_AMOUNT = 500;

const TRANSFER_FEE_RATE = 0.02;
const TRANSFER_EXCHANGE_RATE = 3.76;
const TRANSFER_TARGET_CURRENCY = "fIPE";
const MOCK_TRANSFER_HASH = "MP1knuDcFsa2LJrny5YFGGFJ3gg4ByhuDA";
const BASESCAN_URL = `https://basescan.org/tx/${MOCK_TRANSFER_HASH}`;

const LOGO_SIZE = 72;
const TOP_PADDING = 42;

export default function FundsConfirmationScreen() {
  const router = useRouter();
  const [done, setDone] = useState(false);
  const params = useLocalSearchParams<{
    type?: string;
    name?: string;
    amount?: string;
  }>();

  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => true);
    return () => sub.remove();
  }, []);

  usePreventRemove(!done, () => {});

  useEffect(() => {
    if (done) {
      router.replace("/(tabs)");
    }
  }, [done, router]);

  const handleDone = () => setDone(true);

  const isTransfer = params.type === "transfer";

  return (
    <>
      <Stack.Screen
        options={{
          gestureEnabled: false,
          fullScreenGestureEnabled: false,
          headerBackVisible: false,
        }}
      />
      {isTransfer ? (
        <TransferComplete
          onDone={handleDone}
          name={params.name ?? "Recipient"}
          amount={parseInt(params.amount ?? "0", 10) || 0}
        />
      ) : (
        <FundsAdded onDone={handleDone} />
      )}
    </>
  );
}

function FundsAdded({ onDone }: { onDone: () => void }) {
  const receiptRef = useRef<View>(null);
  const { height: screenHeight } = useWindowDimensions();

  const fee = FUNDS_MOCK_AMOUNT * FUNDS_FEE_RATE;
  const totalCharged = FUNDS_MOCK_AMOUNT + fee;

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
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
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
      </ScrollView>

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
        <Button variant="primary" size="lg" onPress={onDone}>
          Done
        </Button>
      </Animated.View>
    </View>
  );
}

function TransferComplete({
  onDone,
  name,
  amount,
}: {
  onDone: () => void;
  name: string;
  amount: number;
}) {
  const receiptRef = useRef<View>(null);
  const { height: screenHeight } = useWindowDimensions();

  const { fee, total, targetAmount, equivalent } = useMemo(() => {
    const fee = amount * TRANSFER_FEE_RATE;
    return {
      fee,
      total: amount + fee,
      targetAmount: amount * TRANSFER_EXCHANGE_RATE,
      equivalent: amount * TRANSFER_EXCHANGE_RATE,
    };
  }, [amount]);

  const firstName = name.split(" ")[0] || "Recipient";

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

  const linkValue = (
    <Pressable
      onPress={() => Linking.openURL(BASESCAN_URL).catch(() => {})}
      hitSlop={8}
    >
      <RNText style={styles.linkText}>Go to link</RNText>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={styles.transferTopWrapper}
          ref={receiptRef}
          collapsable={false}
        >
          <View style={styles.transferHeader}>
          <Animated.View style={[styles.circle, logoAnimatedStyle]}>
            <Icon name="check" width={42} height={42} color={palette.white} />
          </Animated.View>
          <Animated.View
            entering={FadeInUp.delay(1200)
              .duration(500)
              .springify()
              .damping(25)
              .stiffness(300)}
            style={styles.transferTextBlock}
          >
            <RNText style={styles.transferTitle}>Transfer Complete</RNText>
            <RNText style={styles.transferSubtitle}>
              Your contact will receive your money shortly
            </RNText>
          </Animated.View>
        </View>

        <Animated.View entering={FadeIn.delay(1800).duration(500)}>
          <Summary
            items={[
              { label: "Sent", value: `$${amount.toFixed(0)} USD` },
              { label: "Sent to", value: name },
              { label: "Fee", value: `$${fee.toFixed(0)} USD` },
              { label: "Total Charged", value: `$${total.toFixed(0)} USD` },
            ]}
          />
        </Animated.View>

        <Animated.View entering={FadeIn.delay(2000).duration(500)}>
          <Summary
            title=""
            items={[
              {
                label: "Exchange Rate",
                value: `1 USD = ${TRANSFER_EXCHANGE_RATE} ${TRANSFER_TARGET_CURRENCY}`,
              },
              {
                label: `${firstName} Gets`,
                value: `${targetAmount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} ${TRANSFER_TARGET_CURRENCY}`,
              },
              {
                label: "Equivalent",
                value: `= S/ ${equivalent.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`,
              },
            ]}
          />
        </Animated.View>

          <Animated.View entering={FadeIn.delay(2200).duration(500)}>
            <Summary
              title=""
              items={[
                {
                  label: "Transfer Hash",
                  value: (
                    <RNText
                      style={styles.transferHashValue}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {MOCK_TRANSFER_HASH}
                    </RNText>
                  ),
                },
                { label: "View in Basescan", value: linkValue },
              ]}
            />
          </Animated.View>
        </View>
      </ScrollView>

      <Animated.View
        entering={FadeInUp.delay(2600)
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
            captureAndShare(receiptRef, { title: "Share Transfer" })
          }
        >
          Share Transfer ID
        </Button>
        <Button variant="primary" size="lg" onPress={onDone}>
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
  scroll: {
    flex: 1,
    alignSelf: "stretch",
  },
  scrollContent: {
    flexGrow: 1,
  },
  topWrapper: {
    gap: 48,
    alignSelf: "stretch",
    backgroundColor: semantic.background.primary,
    paddingTop: 42,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  transferTopWrapper: {
    gap: 24,
    alignSelf: "stretch",
    backgroundColor: semantic.background.primary,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  topSection: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
  },
  transferHeader: {
    flexDirection: "column",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
    alignSelf: "stretch",
  },
  transferTextBlock: {
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    alignSelf: "stretch",
  },
  transferTitle: {
    color: palette.white,
    fontFamily: fontFamily.displayMedium,
    fontSize: 24,
    textAlign: "center",
    includeFontPadding: false,
  },
  transferSubtitle: {
    color: palette.gray[200],
    fontFamily: fontFamily.display,
    fontSize: 18,
    textAlign: "center",
    includeFontPadding: false,
  },
  circle: {
    width: 72,
    height: 72,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 36,
    backgroundColor: palette.blue[500],
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
  transferHashValue: {
    color: palette.white,
    fontFamily: fontFamily.displayMedium,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "right",
    maxWidth: 226,
    includeFontPadding: false,
  },
  linkText: {
    color: palette.blue[400],
    fontFamily: fontFamily.displayMedium,
    fontSize: 16,
    fontWeight: "500",
    textDecorationLine: "underline",
    includeFontPadding: false,
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
