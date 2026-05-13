import React, { useEffect, useRef } from "react";
import {
  Animated,
  Platform,
  StyleSheet,
  View,
  type DimensionValue,
  type ViewStyle,
} from "react-native";

import { radius, semantic } from "@/theme";

export interface SkeletonProps {
  width?: DimensionValue;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
  variant?: "text" | "circle" | "rectangular";
}

const ANIMATION_DURATION = 1500;

export function Skeleton({
  width = "100%",
  height = 16,
  borderRadius,
  style,
  variant = "rectangular",
}: SkeletonProps) {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.6,
          duration: ANIMATION_DURATION / 2,
          useNativeDriver: Platform.OS !== "web",
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: ANIMATION_DURATION / 2,
          useNativeDriver: Platform.OS !== "web",
        }),
      ]),
    );

    animation.start();

    return () => animation.stop();
  }, [fadeAnim]);

  const getBorderRadius = (): number => {
    if (borderRadius !== undefined) return borderRadius;
    if (variant === "circle") return height / 2;
    if (variant === "text") return radius.xs || 4;
    return radius.sm || 8;
  };

  const skeletonStyle: ViewStyle = {
    width,
    height,
    borderRadius: getBorderRadius(),
    backgroundColor: semantic.surface.secondary,
  };

  return (
    <Animated.View style={[skeletonStyle, style, { opacity: fadeAnim }]} />
  );
}

export function SkeletonText({
  lines = 1,
  ...props
}: SkeletonProps & { lines?: number }) {
  return (
    <View style={styles.textContainer}>
      {Array.from({ length: lines }).map((_, index) => (
        <View
          key={index}
          style={index === lines - 1 && lines > 1 ? styles.lastLine : undefined}
        >
          <Skeleton
            variant="text"
            height={16}
            width={index === lines - 1 && lines > 1 ? "60%" : "100%"}
            {...props}
          />
        </View>
      ))}
    </View>
  );
}

export function SkeletonCircle({
  size = 40,
  ...props
}: Omit<SkeletonProps, "width" | "height" | "variant"> & { size?: number }) {
  return <Skeleton variant="circle" width={size} height={size} {...props} />;
}

const styles = StyleSheet.create({
  textContainer: {
    gap: 8,
  },
  lastLine: {
    width: "60%",
  },
});
