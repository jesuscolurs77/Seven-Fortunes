import React from "react";
import { Pressable, StyleSheet, type ViewStyle } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { duration, opacity, palette, semantic } from "@/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const TRACK_WIDTH = 38;
const TRACK_PADDING = 2;
const THUMB_SIZE = 16;

const TRACK_ACTIVE_BG = semantic.brand.primary;
const TRACK_INACTIVE_BG = `rgba(255,255,255,${opacity[10]})`;
const TRACK_BORDER = semantic.border.switch;

const THUMB_BG = palette.white;

export function Switch({
  value,
  onValueChange,
  disabled = false,
  style,
}: SwitchProps) {
  const progress = useSharedValue(value ? 1 : 0);

  React.useEffect(() => {
    progress.value = withTiming(value ? 1 : 0, { duration: duration.normal });
  }, [value, progress]);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [TRACK_INACTIVE_BG, TRACK_ACTIVE_BG],
      ),
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateX =
      progress.value * (TRACK_WIDTH - TRACK_PADDING * 2 - THUMB_SIZE);

    return {
      transform: [{ translateX }],
    };
  });

  const handlePress = () => {
    if (!disabled) {
      onValueChange(!value);
    }
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.track,
        trackAnimatedStyle,
        ...(style ? [style] : []),
        ...(disabled ? [styles.disabled] : []),
      ]}
    >
      <Animated.View style={[styles.thumb, thumbAnimatedStyle]} />
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: THUMB_SIZE + TRACK_PADDING * 2,
    padding: TRACK_PADDING,
    borderRadius: 44,
    borderWidth: 1,
    borderColor: TRACK_BORDER,
    justifyContent: "center",
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 30,
    backgroundColor: THUMB_BG,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  disabled: {
    opacity: 0.5,
  },
});
