import React, { useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, Platform, useColorScheme } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';

import { palette, semantic } from '@/theme';
import type { UseLiquidTabAnimationReturn } from '@/ui/hooks/useLiquidTabAnimation';

let GlassViewComponent: any = null;
let isGlassEffectAPIAvailableFn: (() => boolean) | null = null;
let isLiquidGlassAvailableFn: (() => boolean) | null = null;

// eslint-disable-next-line @typescript-eslint/no-require-imports
try {
  const expoGlassEffect = require('expo-glass-effect');
  GlassViewComponent = expoGlassEffect.GlassView || null;
  isGlassEffectAPIAvailableFn = expoGlassEffect.isGlassEffectAPIAvailable || null;
  isLiquidGlassAvailableFn = expoGlassEffect.isLiquidGlassAvailable || null;
} catch (e) {
  GlassViewComponent = null;
}

function checkIsGlassEffectAvailable(): boolean {
  if (Platform.OS !== 'ios') return false;
  if (!GlassViewComponent) return false;
  try {
    const runtime = isGlassEffectAPIAvailableFn ? isGlassEffectAPIAvailableFn() : true;
    const compile = isLiquidGlassAvailableFn ? isLiquidGlassAvailableFn() : true;
    return runtime && compile;
  } catch {
    return false;
  }
}

export interface FloatingGlassCapsuleProps {
  animation: Pick<UseLiquidTabAnimationReturn, 
    'capsuleAnimatedStyle' | 
    'highlightAnimatedStyle' | 
    'blurIntensity' |
    'highlightOpacity'
  >;
  height?: number;
  colorScheme?: 'light' | 'dark' | 'auto' | null;
}

export function FloatingGlassCapsule({
  animation,
  height = 40,
  colorScheme: propColorScheme,
}: FloatingGlassCapsuleProps) {
  const systemColorScheme = useColorScheme();
  const [isGlassAvailable, setIsGlassAvailable] = useState(false);

  const actualColorScheme = useMemo(() => {
    if (propColorScheme && propColorScheme !== 'auto') return propColorScheme;
    if (!systemColorScheme || systemColorScheme === 'unspecified') return 'dark';
    return systemColorScheme;
  }, [propColorScheme, systemColorScheme]);

  useEffect(() => {
    setIsGlassAvailable(checkIsGlassEffectAvailable());
  }, []);

  const { capsuleAnimatedStyle, highlightAnimatedStyle, blurIntensity, highlightOpacity } = animation;

  const glassEffectStyle = useMemo(() => {
    if (actualColorScheme === 'dark') {
      return 'regular';
    }
    return 'regular';
  }, [actualColorScheme]);

  const tintColor = useMemo(() => {
    if (actualColorScheme === 'dark') {
      return 'rgba(255, 255, 255, 0.15)';
    }
    return 'rgba(0, 0, 0, 0.1)';
  }, [actualColorScheme]);

  const fallbackBgColor = useMemo(() => {
    if (actualColorScheme === 'dark') {
      return 'rgba(255, 255, 255, 0.18)';
    }
    return 'rgba(0, 0, 0, 0.08)';
  }, [actualColorScheme]);

  const fallbackBorderColor = useMemo(() => {
    if (actualColorScheme === 'dark') {
      return 'rgba(255, 255, 255, 0.25)';
    }
    return 'rgba(0, 0, 0, 0.1)';
  }, [actualColorScheme]);

  const highlightBgColor = useMemo(() => {
    if (actualColorScheme === 'dark') {
      return 'rgba(255, 255, 255, 0.3)';
    }
    return 'rgba(255, 255, 255, 0.5)';
  }, [actualColorScheme]);

  if (!isGlassAvailable) {
    return (
      <Animated.View
        style={[
          styles.capsule,
          { height },
          capsuleAnimatedStyle,
          {
            backgroundColor: fallbackBgColor,
            borderWidth: 1,
            borderColor: fallbackBorderColor,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.highlight,
            { backgroundColor: highlightBgColor },
            highlightAnimatedStyle,
          ]}
        />
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.capsule,
        { height },
        capsuleAnimatedStyle,
        styles.glassWrapper,
      ]}
    >
      <GlassViewComponent
        style={StyleSheet.absoluteFill}
        glassEffectStyle={glassEffectStyle}
        tintColor={tintColor}
        colorScheme={actualColorScheme}
        isInteractive={true}
      />
      <Animated.View
        style={[
          styles.highlight,
          { backgroundColor: highlightBgColor },
          highlightAnimatedStyle,
        ]}
      />
      <View style={styles.cornerTopLeft} />
      <View style={styles.cornerBottomRight} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  capsule: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  glassWrapper: {
    zIndex: 1,
  },
  highlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    opacity: 0.3,
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 12,
    height: 12,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderTopLeftRadius: 20,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderBottomRightRadius: 20,
  },
});
