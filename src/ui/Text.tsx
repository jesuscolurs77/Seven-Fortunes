import React from "react";
import {
  Text as RNText,
  StyleSheet,
  type TextProps,
  type TextStyle,
} from "react-native";

import { semantic, typography, type TextVariant } from "@/theme";

export type TextColorVariant =
  | "primary"
  | "secondary"
  | "muted"
  | "disabled"
  | "inverse";

export interface TextComponentProps extends TextProps {
  variant?: TextVariant;
  color?: TextColorVariant;
  className?: string;
  children: React.ReactNode;
}

const colorMap: Record<TextColorVariant, string> = {
  primary: semantic.text.primary,
  secondary: semantic.text.secondary,
  muted: semantic.text.muted,
  disabled: semantic.text.disabled,
  inverse: semantic.text.inverse,
};

export function Text({
  variant = "body",
  color = "primary",
  className,
  style,
  children,
  ...props
}: TextComponentProps) {
  const typoStyle = styles[variant];
  const colorStyle = { color: colorMap[color] };

  return (
    <RNText
      className={className}
      style={[typoStyle, colorStyle, style as TextStyle]}
      {...props}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  display: typography.display,
  h1: typography.h1,
  h2: typography.h2,
  subtitle: typography.subtitle,
  h3: typography.h3,
  title: typography.title,
  button: typography.button,
  input: typography.input,
  body: typography.body,
  bodySmall: typography.bodySmall,
  caption: typography.caption,
  label: typography.label,
  mono: typography.mono,
});
