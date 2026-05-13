import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutUp,
  LinearTransition,
} from 'react-native-reanimated';

import { palette, radius, semantic, spacing, spring as springConfig } from '@/theme';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export interface ToastContentProps {
  title: string;
  description?: string;
  type: ToastType;
  icon?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  style?: ViewStyle;
}

const typeConfig: Record<ToastType, { icon: string; color: string; bg: string }> = {
  success: { icon: '✓', color: semantic.success.default, bg: semantic.success.muted },
  error: { icon: '✕', color: semantic.error.default, bg: semantic.error.muted },
  info: { icon: 'ℹ', color: semantic.info.default, bg: semantic.info.muted },
  warning: { icon: '⚠', color: semantic.warning.default, bg: semantic.warning.muted },
  loading: { icon: '⋯', color: palette.blue[400], bg: semantic.brand.muted },
};

export function ToastContent({ title, description, type, icon, action, style }: ToastContentProps) {
  const config = typeConfig[type];

  return (
    <Animated.View
      entering={FadeInDown.duration(250).springify().damping(springConfig.default.damping).stiffness(springConfig.default.stiffness)}
      exiting={FadeOutUp.duration(200)}
      layout={LinearTransition.duration(200)}
      style={[styles.container, style]}
    >
      <View style={[styles.iconBox, { backgroundColor: config.bg }]}>
        <Animated.Text style={[styles.icon, { color: config.color }]}>
          {icon ?? config.icon}
        </Animated.Text>
      </View>
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.title, { color: semantic.text.primary }]}>
          {title}
        </Animated.Text>
        {description && (
          <Animated.Text style={[styles.description, { color: semantic.text.secondary }]}>
            {description}
          </Animated.Text>
        )}
      </View>
      {action && (
        <Animated.Text style={styles.action} onPress={action.onPress}>
          {action.label}
        </Animated.Text>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderRadius: radius.lg,
    backgroundColor: semantic.background.secondary,
    borderWidth: 1,
    borderColor: semantic.border.subtle,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    minWidth: 300,
    maxWidth: 400,
    alignSelf: 'center',
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 16,
    fontWeight: '600',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 13,
    fontWeight: '400',
  },
  action: {
    fontSize: 14,
    fontWeight: '600',
    color: semantic.brand.primary,
    paddingLeft: spacing[2],
  },
});
