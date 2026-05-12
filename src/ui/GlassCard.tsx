import React, { useState, useEffect } from 'react';
import { View, StyleSheet, type ViewStyle, type ViewProps, Platform } from 'react-native';

import {
  glassTheme,
  radius,
  spacing,
  radiusUsage,
} from '@/theme';
import { 
  FallbackCornerBorders, 
  FallbackSubtleInnerGlow 
} from './FallbackCornerBorders';

let GlassViewComponent: any = null;
let isGlassEffectAPIAvailableFn: (() => boolean) | null = null;
let isLiquidGlassAvailableFn: (() => boolean) | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const expoGlassEffect = require('expo-glass-effect');
  GlassViewComponent = expoGlassEffect.GlassView || null;
  isGlassEffectAPIAvailableFn = expoGlassEffect.isGlassEffectAPIAvailable || null;
  isLiquidGlassAvailableFn = expoGlassEffect.isLiquidGlassAvailable || null;
} catch (e) {
  GlassViewComponent = null;
}

export interface GlassCardProps extends ViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
  isInteractive?: boolean;
}

export function GlassCard({ 
  children, 
  style, 
  isInteractive = true,
  ...props 
}: GlassCardProps) {
  const [useNativeGlass, setUseNativeGlass] = useState(false);

  useEffect(() => {
    if (Platform.OS !== 'ios' || !GlassViewComponent) {
      setUseNativeGlass(false);
      return;
    }
    try {
      const runtimeAvailable = isGlassEffectAPIAvailableFn ? isGlassEffectAPIAvailableFn() : true;
      const compileAvailable = isLiquidGlassAvailableFn ? isLiquidGlassAvailableFn() : true;
      setUseNativeGlass(runtimeAvailable && compileAvailable);
    } catch (e) {
      setUseNativeGlass(false);
    }
  }, []);

  const containerStyle: ViewStyle[] = [
    styles.base,
    ...(style ? [style] : []),
  ];

  return (
    <View style={containerStyle} {...props}>
      {useNativeGlass && GlassViewComponent ? (
        <GlassViewComponent
          style={StyleSheet.absoluteFill}
          glassEffectStyle={glassTheme.variants.card.effectStyle}
          tintColor={glassTheme.variants.card.tintColor}
          colorScheme="dark"
          isInteractive={isInteractive}
        />
      ) : (
        <>
          <View style={[StyleSheet.absoluteFill, styles.fallbackBg]} />
          <View style={[StyleSheet.absoluteFill, styles.fallbackBorder]} />
          <View style={[StyleSheet.absoluteFill, styles.fallbackTopShine]} />
          <FallbackSubtleInnerGlow />
          <FallbackCornerBorders 
            variant="card"
            borderWidth={2.5}
            borderColor="rgba(255, 255, 255, 0.65)"
            cornerSize={24}
          />
        </>
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radiusUsage.card,
    overflow: 'hidden',
  },
  content: {
    zIndex: 1,
  },
  fallbackBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
  },
  fallbackBorder: {
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.30)',
    borderRadius: radiusUsage.card,
  },
  fallbackTopShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    borderTopLeftRadius: radiusUsage.card,
    borderTopRightRadius: radiusUsage.card,
  },
});

GlassCard.Header = function GlassCardHeader({ children, style, ...props }: ViewProps) {
  return (
    <View style={[{ padding: spacing[5], paddingBottom: spacing[3] }, style]} {...props}>
      {children}
    </View>
  );
};

GlassCard.Content = function GlassCardContent({ children, style, ...props }: ViewProps) {
  return (
    <View style={[{ padding: spacing[5], paddingTop: spacing[2], paddingBottom: spacing[2] }, style]} {...props}>
      {children}
    </View>
  );
};

GlassCard.Footer = function GlassCardFooter({ children, style, ...props }: ViewProps) {
  return (
    <View style={[{ padding: spacing[5], paddingTop: spacing[3] }, style]} {...props}>
      {children}
    </View>
  );
};
