import React from 'react';
import { View, StyleSheet, type ViewStyle, Text as RNText } from 'react-native';

import {
  glassTheme,
  glassFallbacks,
  layout,
  spacing,
  palette,
  typography,
} from '@/theme';
import { GlassViewComponent, useIsGlassAvailable } from '@/components/common';

export interface GlassNavbarProps {
  title?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  style?: ViewStyle;
}

export function GlassNavbar({ title, leftContent, rightContent, style }: GlassNavbarProps) {
  const isGlassAvailable = useIsGlassAvailable();

  const containerStyle: ViewStyle[] = [
    styles.container,
    ...(style ? [style] : []),
  ];

  return (
    <View style={containerStyle}>
      {isGlassAvailable && GlassViewComponent ? (
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
