import React, { useState, useEffect } from 'react';
import { View, StyleSheet, type ViewStyle, Text as RNText, Platform } from 'react-native';

import {
  glassTheme,
  glassFallbacks,
  layout,
  spacing,
  palette,
  typography,
} from '@/theme';

let GlassViewComponent: any = null;
let isGlassEffectAPIAvailableFn: (() => boolean) | null = null;
let isLiquidGlassAvailableFn: (() => boolean) | null = null;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const expoGlassEffect = require('expo-glass-effect');
  GlassViewComponent = expoGlassEffect.GlassView || null;
  isGlassEffectAPIAvailableFn = expoGlassEffect.isGlassEffectAPIAvailable || null;
  isLiquidGlassAvailableFn = expoGlassEffect.isLiquidGlassAvailable || null;
} catch {
  GlassViewComponent = null;
}

export interface GlassNavbarProps {
  title?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  style?: ViewStyle;
}

export function GlassNavbar({ title, leftContent, rightContent, style }: GlassNavbarProps) {
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
    } catch {
      setUseNativeGlass(false);
    }
  }, []);

  const containerStyle: ViewStyle[] = [
    styles.container,
    ...(style ? [style] : []),
  ];

  return (
    <View style={containerStyle}>
      {useNativeGlass && GlassViewComponent ? (
        <GlassViewComponent
          style={StyleSheet.absoluteFill}
          glassEffectStyle={glassTheme.variants.bar.effectStyle}
          tintColor={glassTheme.variants.bar.tintColor}
          colorScheme="dark"
          isInteractive={true}
        />
      ) : (
        <View style={[StyleSheet.absoluteFill, glassFallbacks.bar]} />
      )}
      <View style={styles.inner}>
        <View style={styles.leftSection}>
          {leftContent}
        </View>
        {title && (
          <View style={styles.titleSection}>
            <RNText style={styles.title} numberOfLines={1}>
              {title}
            </RNText>
          </View>
        )}
        <View style={styles.rightSection}>
          {rightContent}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: layout.headerHeight,
    overflow: 'hidden',
    width: '100%',
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    zIndex: 1,
  },
  leftSection: {
    width: 44,
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    width: 44,
    alignItems: 'flex-end',
  },
   title: {
     ...typography.title,
     color: palette.white,
     fontWeight: '600',
   },
});
