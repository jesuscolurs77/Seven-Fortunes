import React, { useState } from 'react';
import { type ViewStyle, StyleSheet } from 'react-native';

import { palette, radius, semantic } from '@/theme';
import { PressableScale } from '@/components/common/PressableScale';

export type IconButtonVariant = 'primary' | 'secondary';

export interface IconButtonProps {
  variant?: IconButtonVariant;
  disabled?: boolean;
  icon: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  base: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.full,
    padding: 4,
  },
});

export function IconButton({
  variant = 'primary',
  disabled = false,
  icon,
  onPress,
  style,
}: IconButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const getBackgroundColor = (): string => {
    if (variant === 'primary') {
      if (disabled) {
        return palette.gray[300];
      }
      if (isPressed) {
        return palette.gray[50];
      }
      return palette.white;
    }

    if (variant === 'secondary') {
      if (disabled) {
        return semantic.background.tertiary;
      }
      if (isPressed) {
        return semantic.surface.primary;
      }
      return semantic.background.primary;
    }

    return palette.white;
  };

  const containerStyle = [
    styles.base,
    { backgroundColor: getBackgroundColor() },
    disabled && { opacity: 0.5 },
    style,
  ];

  return (
    <PressableScale
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => !disabled && setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={containerStyle}
    >
      {icon}
    </PressableScale>
  );
}
