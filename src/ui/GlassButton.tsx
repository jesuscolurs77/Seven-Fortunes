import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  Platform,
  Text as RNText,
  StyleSheet,
  View,
  type ViewStyle,
} from "react-native";

import { Icon } from "@/icons";
import { palette, radius, typography } from "@/theme";
import {
  FallbackCornerBorders,
  FallbackSubtleInnerGlow,
} from "./FallbackCornerBorders";
import { PressableScale } from "./PressableScale";

const USE_GLASS_EFFECT = Platform.OS === "ios";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const GLASS_EFFECT_IMAGE = require("../img/glass_efect.png");

let GlassViewComponent: any = null;
let GlassContainerComponent: any = null;
let isGlassEffectAPIAvailableFn: (() => boolean) | null = null;
let isLiquidGlassAvailableFn: (() => boolean) | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const expoGlassEffect = require("expo-glass-effect");
  GlassViewComponent = expoGlassEffect.GlassView || null;
  GlassContainerComponent = expoGlassEffect.GlassContainer || null;
  isGlassEffectAPIAvailableFn =
    expoGlassEffect.isGlassEffectAPIAvailable || null;
  isLiquidGlassAvailableFn = expoGlassEffect.isLiquidGlassAvailable || null;
} catch {
  GlassViewComponent = null;
  GlassContainerComponent = null;
}

export { GlassContainerComponent as GlassContainer };

export interface GlassButtonProps {
  icon?: React.ReactNode;
  iconName?: string;
  iconColor?: string;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

function CircularGlassBackground({
  isPressed,
  disabled,
}: {
  isPressed: boolean;
  disabled: boolean;
}) {
  const opacity = disabled ? 0.5 : isPressed ? 0.95 : 0.8;

  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        styles.circularBorderRadius,
        styles.circularBgOverlay,
        styles.circularBaseBg,
        { opacity: isPressed ? 1 : opacity },
      ]}
    >
      <Image
        source={GLASS_EFFECT_IMAGE}
        style={styles.glassImage}
        resizeMode="stretch"
      />
      {!disabled && (
        <View
          style={[
            StyleSheet.absoluteFill,
            styles.circularBorderRadius,
            {
              backgroundColor: isPressed
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(255, 255, 255, 0.02)",
            },
          ]}
        />
      )}
    </View>
  );
}

export function GlassButton({
  icon,
  iconName,
  iconColor,
  label,
  onPress,
  disabled = false,
  style,
}: GlassButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [useNativeGlass, setUseNativeGlass] = useState(false);

  const isCircular = !label;

  useEffect(() => {
    if (GlassViewComponent && USE_GLASS_EFFECT && !isCircular) {
      try {
        const runtimeAvailable = isGlassEffectAPIAvailableFn
          ? isGlassEffectAPIAvailableFn()
          : true;
        const compileAvailable = isLiquidGlassAvailableFn
          ? isLiquidGlassAvailableFn()
          : true;
        setUseNativeGlass(runtimeAvailable && compileAvailable);
      } catch {
        setUseNativeGlass(false);
      }
    }
  }, [isCircular]);

  const getBackgroundStyle = (): ViewStyle => {
    if (disabled) {
      return styles.disabledBg;
    }
    if (isPressed) {
      return styles.pressedBg;
    }
    return styles.defaultBg;
  };

  const getGlassStyle = (): "regular" | "clear" | "none" => {
    if (disabled) {
      return "none";
    }
    if (isPressed) {
      return "clear";
    }
    return "regular";
  };

  const renderedIcon = useMemo(() => {
    if (iconName) {
      return (
        <Icon
          name={iconName}
          color={iconColor || palette.white}
          opacity={disabled ? 0.6 : 1}
        />
      );
    }
    return icon;
  }, [iconName, iconColor, icon, disabled]);

  const containerStyle: ViewStyle[] = [
    styles.base,
    ...(isCircular ? [styles.iconOnly] : []),
    ...(disabled ? [styles.disabled] : []),
    ...(style ? [style] : []),
  ];

  const currentGlassStyle = getGlassStyle();
  const shouldUseFallback = isCircular || !useNativeGlass;

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => !disabled && setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={containerStyle}
    >
      {shouldUseFallback ? (
        <>
          {isCircular ? (
            <CircularGlassBackground
              isPressed={isPressed}
              disabled={disabled}
            />
          ) : (
            <>
              <View style={[StyleSheet.absoluteFill, getBackgroundStyle()]} />
              <FallbackSubtleInnerGlow />
              <FallbackCornerBorders
                variant="button"
                borderWidth={2}
                borderColor="rgba(255, 255, 255, 0.7)"
                cornerSize={14}
              />
            </>
          )}
        </>
      ) : (
        <GlassViewComponent
          style={StyleSheet.absoluteFill}
          glassEffectStyle={currentGlassStyle}
          colorScheme="dark"
          isInteractive={!disabled}
        />
      )}
      <View style={[styles.content, isCircular ? styles.circularContent : {}]}>
        {renderedIcon}
        {label && (
          <RNText
            style={[styles.label, ...(disabled ? [styles.labelDisabled] : [])]}
          >
            {label}
          </RNText>
        )}
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 42,
    borderRadius: radius.full,
    overflow: "hidden",
  },
  iconOnly: {
    width: 42,
  },
  circularBorderRadius: {
    borderRadius: 21,
  },
  circularBgOverlay: {
    overflow: "hidden",
  },
  circularBaseBg: {
    backgroundColor: "rgba(95, 95, 102, 0.10)",
  },
  glassImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 16,
    zIndex: 1,
  },
  circularContent: {
    paddingHorizontal: 0,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    ...typography.button,
    fontSize: 16,
    fontWeight: "600",
    color: palette.gray[100],
  },
  labelDisabled: {
    opacity: 0.5,
  },
  defaultBg: {
    backgroundColor: "rgba(255, 255, 255, 0.18)",
  },
  pressedBg: {
    backgroundColor: "rgba(255, 255, 255, 0.32)",
  },
  disabledBg: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
  },
});
