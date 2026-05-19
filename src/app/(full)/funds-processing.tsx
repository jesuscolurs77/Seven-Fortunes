import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import { Platform, StyleSheet, Text as RNText, View } from "react-native";
import LottieView from "lottie-react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from "react-native-reanimated";

import { Text } from "@/components/typography";
import { fontFamily, palette } from "@/theme";

const loadingAnim = require("@/animations/loading.json");

const QR_STEPS = ["QR Escaneado", "Reservación Generada", "Confirmando compra"];
const QR_STEP_DURATION = 900;
const QR_STEP_GAP = 250;
const QR_LEAD_IN = 400;
const QR_FINAL_BUFFER = 500;
const QR_TOTAL_MS =
  QR_LEAD_IN +
  QR_STEP_DURATION * (QR_STEPS.length - 1) +
  QR_STEP_GAP * (QR_STEPS.length - 2) +
  QR_FINAL_BUFFER;

const INACTIVE_COLOR = "rgba(255,255,255,0.1)";
const INACTIVE_TEXT = "rgba(255,255,255,0.3)";

export default function FundsProcessingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    type?: string;
    name?: string;
    amount?: string;
  }>();
  const lottieRef = useRef<LottieView>(null);

  const isQr = params.type === "qr";
  const isTransfer = params.type === "transfer";

  useEffect(() => {
    const totalMs = isQr ? QR_TOTAL_MS : 2000;
    const timer = setTimeout(() => {
      router.replace({
        pathname: "/(full)/funds-confirmation",
        params: {
          type: isQr ? "qr-payment" : params.type ?? "",
          ...(params.name ? { name: params.name } : {}),
          ...(params.amount ? { amount: params.amount } : {}),
        },
      });
    }, totalMs);
    return () => clearTimeout(timer);
  }, []);

  if (isQr) {
    return (
      <QrPaymentProcessing
        name={params.name ?? "Tienda Plaza Vea Norte"}
        amount={params.amount ?? "120"}
      />
    );
  }

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
        <Text style={styles.title}>
          {isTransfer
            ? "Your transfer is being processed"
            : "Your funds are being added"}
        </Text>
        <Text variant="body" style={styles.subtitle}>
          Please wait a moment while we process your transaction.
        </Text>
      </View>
    </View>
  );
}

function QrPaymentProcessing({
  name,
  amount,
}: {
  name: string;
  amount: string;
}) {
  const lottieRef = useRef<LottieView>(null);
  const progress = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    progress.value = withDelay(
      QR_LEAD_IN,
      withSequence(
        withTiming(1, {
          duration: QR_STEP_DURATION,
          easing: Easing.bezier(0.65, 0, 0.35, 1),
        }),
        withDelay(
          QR_STEP_GAP,
          withTiming(2, {
            duration: QR_STEP_DURATION,
            easing: Easing.bezier(0.65, 0, 0.35, 1),
          }),
        ),
      ),
    );
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.35, { duration: 600, easing: Easing.out(Easing.cubic) }),
        withTiming(1, { duration: 600, easing: Easing.in(Easing.cubic) }),
      ),
      -1,
      false,
    );
  }, []);

  const formattedAmount = useMemo(() => {
    const num = parseFloat(amount) || 0;
    return `S/ ${num.toFixed(2)}`;
  }, [amount]);

  return (
    <View style={qrStyles.container}>
      <View style={qrStyles.header}>
        <View style={qrStyles.circle}>
          <LottieView
            ref={lottieRef}
            source={loadingAnim}
            autoPlay
            loop
            resizeMode="contain"
            renderMode={Platform.OS === "android" ? "SOFTWARE" : "AUTOMATIC"}
            enableSafeModeAndroid
            cacheComposition={false}
            style={{ width: 42, height: 42 }}
          />
        </View>
        <RNText style={qrStyles.title}>Confirmando pago</RNText>
        <View style={qrStyles.amountBlock}>
          <RNText style={qrStyles.amount}>{formattedAmount}</RNText>
          <RNText style={qrStyles.merchant}>{name}</RNText>
        </View>
      </View>

      <View style={qrStyles.timeline}>
        {QR_STEPS.map((label, index) => (
          <QrStep
            key={label}
            index={index}
            total={QR_STEPS.length}
            progress={progress}
            pulse={pulse}
            label={label}
          />
        ))}
      </View>
    </View>
  );
}

function QrStep({
  index,
  total,
  progress,
  pulse,
  label,
}: {
  index: number;
  total: number;
  progress: SharedValue<number>;
  pulse: SharedValue<number>;
  label: string;
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const topFillStyle = useAnimatedStyle(() => {
    if (isFirst) return { height: "0%" };
    const seg = Math.min(Math.max(progress.value - (index - 1), 0), 1);
    const half = Math.min(Math.max(seg * 2 - 1, 0), 1);
    return { height: `${half * 100}%` };
  });

  const bottomFillStyle = useAnimatedStyle(() => {
    if (isLast) return { height: "0%" };
    const seg = Math.min(Math.max(progress.value - index, 0), 1);
    const half = Math.min(seg * 2, 1);
    return { height: `${half * 100}%` };
  });

  const dotStyle = useAnimatedStyle(() => {
    const reached = Math.min(Math.max(progress.value - index + 0.5, 0), 1);
    return {
      backgroundColor: interpolateColor(
        reached,
        [0, 1],
        [INACTIVE_COLOR, palette.blue[500]],
      ),
    };
  });

  const dotPulseStyle = useAnimatedStyle(() => {
    const leading =
      progress.value >= index - 0.05 && progress.value < index + 0.95 ? 1 : 0;
    return {
      opacity: leading ? Math.max(0, 1 - (pulse.value - 1) / 0.35) * 0.5 : 0,
      transform: [{ scale: pulse.value }],
    };
  });

  const labelStyle = useAnimatedStyle(() => {
    const reached = Math.min(Math.max(progress.value - index + 0.5, 0), 1);
    return {
      color: interpolateColor(
        reached,
        [0, 1],
        [INACTIVE_TEXT, palette.white],
      ),
    };
  });

  return (
    <View style={qrStyles.stepRow}>
      <View style={qrStyles.stepLineCol}>
        <View style={qrStyles.lineHalfBg}>
          {!isFirst && (
            <Animated.View
              style={[
                qrStyles.lineFill,
                topFillStyle,
                { backgroundColor: palette.blue[500] },
              ]}
            />
          )}
        </View>
        <View style={qrStyles.dotWrapper}>
          <Animated.View
            style={[
              qrStyles.dotPulse,
              dotPulseStyle,
              { backgroundColor: palette.blue[500] },
            ]}
          />
          <Animated.View style={[qrStyles.dot, dotStyle]} />
        </View>
        <View style={qrStyles.lineHalfBg}>
          {!isLast && (
            <Animated.View
              style={[
                qrStyles.lineFill,
                bottomFillStyle,
                { backgroundColor: palette.blue[500] },
              ]}
            />
          )}
        </View>
      </View>
      <Animated.Text style={[qrStyles.stepLabel, labelStyle]}>
        {label}
      </Animated.Text>
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
    lineHeight: 32,
  },
  subtitle: {
    alignSelf: "stretch",
    textAlign: "center",
    color: palette.gray[200],
  },
});

const qrStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 42,
  },
  header: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  circle: {
    width: 72,
    height: 72,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 36,
    backgroundColor: palette.blue[700],
  },
  title: {
    color: palette.white,
    fontFamily: fontFamily.displayMedium,
    fontSize: 18,
    includeFontPadding: false,
  },
  amountBlock: {
    alignItems: "center",
    gap: 4,
  },
  amount: {
    color: palette.white,
    fontFamily: fontFamily.displayMedium,
    fontSize: 24,
    includeFontPadding: false,
  },
  merchant: {
    color: palette.gray[200],
    fontFamily: fontFamily.display,
    fontSize: 14,
    includeFontPadding: false,
  },
  timeline: {
    width: 200,
    height: 135,
  },
  stepRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  stepLineCol: {
    width: 8,
    alignSelf: "stretch",
    alignItems: "center",
  },
  lineHalfBg: {
    flex: 1,
    width: 1,
    backgroundColor: INACTIVE_COLOR,
    overflow: "hidden",
  },
  lineFill: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: 1,
  },
  dotWrapper: {
    width: 8,
    height: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  dotPulse: {
    position: "absolute",
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stepLabel: {
    fontFamily: fontFamily.display,
    fontSize: 16,
    includeFontPadding: false,
  },
});
