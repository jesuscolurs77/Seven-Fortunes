import React from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { semantic, spacing, radius } from '@/theme';
import type { FeedbackType } from '@/services/feedback/feedback.types';

export interface InlineFeedbackProps {
  type: FeedbackType;
  message: string;
  style?: ViewStyle;
}

const typeColors: Record<FeedbackType, { text: string; bg: string; border: string }> = {
  success: { text: semantic.success.default, bg: semantic.success.muted, border: semantic.success.default + '30' },
  error: { text: semantic.error.default, bg: semantic.error.muted, border: semantic.error.default + '30' },
  warning: { text: semantic.warning.default, bg: semantic.warning.muted, border: semantic.warning.default + '30' },
  info: { text: semantic.info.default, bg: semantic.info.muted, border: semantic.info.default + '30' },
  loading: { text: semantic.text.secondary, bg: semantic.surface.tertiary, border: semantic.border.subtle },
};

const typeIcons: Record<FeedbackType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
  loading: '⋯',
};

export function InlineFeedback({ type, message, style }: InlineFeedbackProps) {
  const colors = typeColors[type];

  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(100)}
      style={[styles.container, { backgroundColor: colors.bg, borderColor: colors.border }, style]}
    >
      <Animated.Text style={[styles.icon, { color: colors.text }]}>
        {typeIcons[type]}
      </Animated.Text>
      <Animated.Text style={[styles.message, { color: colors.text }]}>
        {message}
      </Animated.Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingVertical: spacing[2],
    paddingHorizontal: spacing[3],
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  icon: {
    fontSize: 14,
    fontWeight: '600',
  },
  message: {
    fontSize: 13,
    fontWeight: '400',
    flex: 1,
  },
});
