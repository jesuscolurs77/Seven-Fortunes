import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  type TextInputProps,
  type ViewStyle,
  type TextStyle,
  type StyleProp,
} from "react-native";

import { opacity, palette, radius, semantic, typography } from "@/theme";

export interface InputProps extends TextInputProps {
  disabled?: boolean;
  hasError?: boolean;
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    padding: 12,
    borderRadius: radius.sm,
    backgroundColor: semantic.surface.primary,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  defaultBorder: {
    borderWidth: 1,
    borderColor: semantic.border.inputDefault,
  },
  disabledBorder: {
    borderWidth: 1,
    borderColor: semantic.border.input,
  },
  focusedBorder: {
    borderWidth: 2,
    borderColor: semantic.border.focus,
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: semantic.border.error,
  },
});

export function Input({
  disabled = false,
  hasError = false,
  style,
  placeholderTextColor,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const getBorderStyle = (): ViewStyle => {
    if (hasError) {
      return styles.errorBorder;
    }
    if (disabled) {
      return styles.disabledBorder;
    }
    if (isFocused) {
      return styles.focusedBorder;
    }
    return styles.defaultBorder;
  };

  const getTextColor = (): string => {
    if (disabled) {
      return `rgba(255,255,255,${opacity[50]})`;
    }
    return palette.white;
  };

  const getPlaceholderColor = (): string => {
    if (disabled) {
      return `rgba(255,255,255,${opacity[30]})`;
    }
    return `rgba(255,255,255,${opacity[50]})`;
  };

  const inputStyle: StyleProp<any> = [
    styles.base,
    typography.input,
    getBorderStyle(),
    { color: getTextColor() },
    style,
  ];

  return (
    <TextInput
      style={inputStyle}
      placeholderTextColor={placeholderTextColor || getPlaceholderColor()}
      editable={!disabled}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
}
