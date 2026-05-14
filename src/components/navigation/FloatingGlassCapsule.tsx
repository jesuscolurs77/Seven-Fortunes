import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { GlassViewComponent, useIsGlassAvailable } from '@/components/common';
import type { UseLiquidTabAnimationReturn } from '@/components/navigation/hooks/useLiquidTabAnimation';

export interface FloatingGlassCapsuleProps {
  animation: Pick<UseLiquidTabAnimationReturn,
    'capsuleAnimatedStyle' |
    'highlightAnimatedStyle' |
    'blurIntensity' |
    'highlightOpacity'
  >;
  height?: number;
  colorScheme?: 'light' | 'dark';
}

export function FloatingGlassCapsule({
  animation,
  height = 40,
  colorScheme = 'dark',
}: FloatingGlassCapsuleProps) {
  const isGlassAvailable = useIsGlassAvailable();

  const { capsuleAnimatedStyle, highlightAnimatedStyle, highlightOpacity } = animation;

  const isLight = colorScheme === 'light';

  const fallbackBgColor = isLight
    ? 'rgba(0, 0, 0, 0.08)'
    : 'rgba(255, 255, 255, 0.18)';
  const fallbackBorderColor = isLight
    ? 'rgba(0, 0, 0, 0.12)'
    : 'rgba(255, 255, 255, 0.25)';
  const highlightBgColor = isLight
    ? 'rgba(0, 0, 0, 0.06)'
    : 'rgba(255, 255, 255, 0.3)';
  const glassTint = isLight
    ? 'rgba(0, 0, 0, 0.10)'
    : 'rgba(255, 255, 255, 0.15)';
  const cornerBorderColor = isLight
    ? 'rgba(0, 0, 0, 0.18)'
    : 'rgba(255, 255, 255, 0.3)';

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
        glassEffectStyle="regular"
        tintColor={glassTint}
        colorScheme={colorScheme}
        isInteractive={true}
      />
      <Animated.View
        style={[
          styles.highlight,
          { backgroundColor: highlightBgColor },
          highlightAnimatedStyle,
        ]}
      />
      <View style={[styles.cornerTopLeft, { borderColor: cornerBorderColor }]} />
      <View
        style={[styles.cornerBottomRight, { borderColor: cornerBorderColor }]}
      />
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
