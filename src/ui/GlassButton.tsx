import React, { useState, useEffect } from 'react';
import {
  View,
  Text as RNText,
  StyleSheet,
  type ViewStyle,
  Platform,
} from 'react-native';

import { palette, radius, typography } from '@/theme';
import { PressableScale } from './PressableScale';
import { 
  FallbackCornerBorders, 
  FallbackSubtleInnerGlow 
} from './FallbackCornerBorders';

const USE_GLASS_EFFECT = Platform.OS === 'ios';

let GlassViewComponent: any = null;
let GlassContainerComponent: any = null;
let isGlassEffectAPIAvailableFn: (() => boolean) | null = null;
let isLiquidGlassAvailableFn: (() => boolean) | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const expoGlassEffect = require('expo-glass-effect');
  GlassViewComponent = expoGlassEffect.GlassView || null;
  GlassContainerComponent = expoGlassEffect.GlassContainer || null;
  isGlassEffectAPIAvailableFn = expoGlassEffect.isGlassEffectAPIAvailable || null;
  isLiquidGlassAvailableFn = expoGlassEffect.isLiquidGlassAvailable || null;
} catch (e) {
  GlassViewComponent = null;
  GlassContainerComponent = null;
}

export { GlassContainerComponent as GlassContainer };

export interface GlassButtonProps {
  icon: React.ReactNode;
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

export function GlassButton({
  icon,
  label,
  onPress,
  disabled = false,
  style,
}: GlassButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [useNativeGlass, setUseNativeGlass] = useState(false);
  
  const isCircular = !label;

  useEffect(() => {
    if (GlassViewComponent && USE_GLASS_EFFECT) {
      try {
        const runtimeAvailable = isGlassEffectAPIAvailableFn ? isGlassEffectAPIAvailableFn() : true;
        const compileAvailable = isLiquidGlassAvailableFn ? isLiquidGlassAvailableFn() : true;
        setUseNativeGlass(runtimeAvailable && compileAvailable);
      } catch (e) {
        setUseNativeGlass(false);
      }
    }
  }, []);

  const getBackgroundStyle = (): ViewStyle => {
    if (disabled) {
      return styles.disabledBg;
    }
    if (isPressed) {
      return styles.pressedBg;
    }
    return styles.defaultBg;
  };

  const getFallbackBorderStyle = (): ViewStyle => {
    if (disabled) {
      return {};
    }
    if (isCircular) {
      return styles.fullBorder;
    }
    return {};
  };

  const getGlassStyle = (): 'regular' | 'clear' | 'none' => {
    if (disabled) {
      return 'none';
    }
    if (isPressed) {
      return 'clear';
    }
    return 'regular';
  };

  const containerStyle: ViewStyle[] = [
    styles.base,
    ...(isCircular ? [styles.iconOnly] : []),
    ...(disabled ? [styles.disabled] : []),
    ...(style ? [style] : []),
  ];

  const currentGlassStyle = getGlassStyle();

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => !disabled && setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={containerStyle}
    >
      {useNativeGlass && GlassViewComponent ? (
        <GlassViewComponent
          style={StyleSheet.absoluteFill}
          glassEffectStyle={currentGlassStyle}
          colorScheme="dark"
          isInteractive={!disabled}
        />
      ) : (
        <>
          <View style={[
            StyleSheet.absoluteFill, 
            getBackgroundStyle(),
            getFallbackBorderStyle()
          ]} />
          <FallbackSubtleInnerGlow />
          {!isCircular && (
            <FallbackCornerBorders 
              variant="button" 
              borderWidth={2}
              borderColor="rgba(255, 255, 255, 0.7)"
              cornerSize={14}
            />
          )}
        </>
      )}
      <View style={styles.content}>
        {icon}
         {label && (
           <RNText style={[styles.label, ...(disabled ? [styles.labelDisabled] : [])]}>
             {label}
           </RNText>
         )}
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderRadius: radius.full,
    overflow: 'hidden',
  },
  iconOnly: {
    width: 42,
    padding: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 12,
    zIndex: 1,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    ...typography.button,
    fontSize: 16,
    fontWeight: '600',
    color: palette.gray[100],
  },
  labelDisabled: {
    opacity: 0.5,
  },
  fullBorder: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.55)',
  },
  defaultBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.22)',
  },
  pressedBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.38)',
  },
  disabledBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
});
