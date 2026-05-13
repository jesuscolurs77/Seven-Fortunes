import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';

export interface FallbackGlassStyleProps {
  style?: ViewStyle;
  variant?: 'button' | 'card' | 'bar' | 'modal';
}

export function FallbackGlassBackground({ style, variant = 'card' }: FallbackGlassStyleProps) {
  const bgVariant = variant === 'button'
    ? styles.buttonBg
    : variant === 'bar'
    ? styles.barBg
    : variant === 'modal'
    ? styles.modalBg
    : styles.cardBg;

  return (
    <View style={[bgVariant, style]} />
  );
}

export interface FallbackCornerBordersProps {
  borderColor?: string;
  borderWidth?: number;
  cornerSize?: number;
  variant?: 'button' | 'card';
}

export function FallbackCornerBorders({
  borderColor = 'rgba(255, 255, 255, 0.65)',
  borderWidth = 2,
  cornerSize = 18,
  variant = 'card',
}: FallbackCornerBordersProps) {
  const actualCornerSize = variant === 'button' ? cornerSize * 0.7 : cornerSize;

  return (
    <>
      <View
        style={[
          styles.cornerBase,
          styles.topLeft,
          {
            width: actualCornerSize,
            height: actualCornerSize,
            borderTopWidth: borderWidth,
            borderLeftWidth: borderWidth,
            borderColor,
          },
        ]}
      />
      <View
        style={[
          styles.cornerBase,
          styles.bottomRight,
          {
            width: actualCornerSize,
            height: actualCornerSize,
            borderBottomWidth: borderWidth,
            borderRightWidth: borderWidth,
            borderColor,
          },
        ]}
      />
    </>
  );
}

export function FallbackSubtleInnerGlow() {
  return (
    <View style={styles.innerGlowTop} />
  );
}

const styles = StyleSheet.create({
  cornerBase: {
    position: 'absolute',
    zIndex: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopLeftRadius: 16,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomRightRadius: 16,
  },
  cardBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  buttonBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
  },
  barBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.20)',
  },
  modalBg: {
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.30)',
  },
  innerGlowTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.20)',
    zIndex: 2,
  },
});
