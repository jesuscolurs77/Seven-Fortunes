import React, { useState, useEffect } from 'react';
import { View, StyleSheet, type ViewStyle, Text as RNText, Platform } from 'react-native';

import {
  glassTheme,
  glassFallbacks,
  layout,
  spacing,
  palette,
  typography,
  opacity,
} from '@/theme';
import { PressableScale } from './PressableScale';

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

export interface GlassBottomTabItem {
  label?: string;
  icon?: React.ReactNode;
  activeIcon?: React.ReactNode;
  onPress?: () => void;
  active?: boolean;
}

export interface GlassBottomBarProps {
  items?: GlassBottomTabItem[];
  style?: ViewStyle;
  children?: React.ReactNode;
}

export function GlassBottomBar({ items, style, children }: GlassBottomBarProps) {
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
        {children || (
          items?.map((item, index) => (
            <PressableScale
              key={index}
              style={[
                styles.tabButton,
                ...(item.active ? [styles.tabButtonActive] : []),
              ]}
              onPress={item.onPress}
              activeScale={0.9}
            >
              <View style={styles.tabContent}>
                <View style={styles.tabIcon}>
                  {item.active ? (item.activeIcon || item.icon) : item.icon}
                </View>
                {item.label && (
                  <RNText
                    style={[
                      styles.tabLabel,
                      ...(item.active ? [styles.tabLabelActive] : []),
                    ]}
                  >
                    {item.label}
                  </RNText>
                )}
              </View>
            </PressableScale>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: layout.tabBarHeight,
    overflow: 'hidden',
    width: '100%',
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    zIndex: 1,
  },
  tabButton: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButtonActive: {
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
  },
  tabIcon: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    ...typography.caption,
    fontSize: 11,
    color: `rgba(255, 255, 255, ${opacity[50]})`,
  },
  tabLabelActive: {
    color: palette.white,
  },
});
