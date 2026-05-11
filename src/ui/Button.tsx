import React, { useState } from 'react';
import { ActivityIndicator, View, type ViewStyle, StyleSheet, Text as RNText } from 'react-native';

import { semantic, palette, radius, radiusUsage, typography, opacity } from '@/theme';
import { cn } from '@/utils/cn';
import { PressableScale } from './PressableScale';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  style?: ViewStyle;
  children?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  md: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 12,
  },
  buttonText: {
    ...typography.button,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

const primaryStyles = {
  borderRadius: radiusUsage.button,
  default: { backgroundColor: semantic.brand.primary },
  pressed: { backgroundColor: semantic.brand.pressed },
  disabled: { backgroundColor: semantic.brand.dark },
  textColor: {
    default: palette.white,
    disabled: semantic.brand.light,
  },
};

const secondaryStyles = {
  borderRadius: radius.xs,
  default: { backgroundColor: `rgba(255,255,255,${opacity[10]})` },
  pressed: { backgroundColor: `rgba(255,255,255,${opacity[15]})` },
  disabled: { backgroundColor: `rgba(255,255,255,${opacity[5]})` },
  textColor: {
    default: palette.white,
    disabled: `rgba(255,255,255,${opacity.disabled})`,
  },
};

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className,
  style,
  children,
  leftIcon,
  rightIcon,
  onPress,
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const isDisabled = disabled || loading;

  const getVariantConfig = () => {
    switch (variant) {
      case 'primary':
        return primaryStyles;
      case 'secondary':
        return secondaryStyles;
      default:
        return primaryStyles;
    }
  };

  const config = getVariantConfig();

  const getButtonStyles = (): ViewStyle => {
    if (variant === 'primary' || variant === 'secondary') {
      const bgStyle = isDisabled
        ? config.disabled
        : isPressed
        ? config.pressed
        : config.default;

      return {
        borderRadius: config.borderRadius,
        ...bgStyle,
      };
    }

    switch (variant) {
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: semantic.border.default,
          borderRadius: radiusUsage.button,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderRadius: radiusUsage.button,
        };
      case 'destructive':
        return {
          backgroundColor: semantic.error.default,
          borderRadius: radiusUsage.button,
        };
      default:
        return {};
    }
  };

  const getTextColor = (): string => {
    if (variant === 'primary' || variant === 'secondary') {
      return isDisabled ? config.textColor.disabled : config.textColor.default;
    }
    return palette.white;
  };

  const containerStyle = [
    styles.base,
    styles[size],
    getButtonStyles(),
    isDisabled && variant !== 'primary' && variant !== 'secondary' && { opacity: opacity.disabled },
    style,
  ];

  const textColor = getTextColor();
  const indicatorColor = variant === 'primary' || variant === 'destructive' ? textColor : semantic.text.primary;

  return (
    <PressableScale
      onPress={onPress}
      disabled={isDisabled}
      onPressIn={() => !isDisabled && setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      className={className}
      style={containerStyle}
    >
      {loading ? (
        <ActivityIndicator size="small" color={indicatorColor} />
      ) : (
        <>
          {leftIcon}
          {children && (
            <RNText style={[styles.buttonText, { color: textColor }]}>
              {children}
            </RNText>
          )}
          {rightIcon}
        </>
      )}
    </PressableScale>
  );
}
