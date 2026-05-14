import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

import { palette, radius, semantic, spacing } from '@/theme';

export interface SnackbarContentProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
  style?: ViewStyle;
}

export function SnackbarContent({ title, description, action, style }: SnackbarContentProps) {
  return (
    <Animated.View
      entering={FadeInUp.duration(300).springify().damping(25).stiffness(300)}
      exiting={FadeOutDown.duration(200)}
      style={[styles.container, style]}
    >
      <View style={styles.indicator} />
      <View style={styles.group}>
        <View style={styles.textContainer}>
          <Animated.Text style={styles.title}>{title}</Animated.Text>
          {description && (
            <Animated.Text style={styles.description}>{description}</Animated.Text>
          )}
        </View>
        {action && (
          <Animated.Text style={styles.action} onPress={action.onPress}>
            {action.label}
          </Animated.Text>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing[4],
    marginBottom: spacing[4],
    borderRadius: radius.md,
    backgroundColor: semantic.error.dark,
    borderWidth: 1,
    borderColor: semantic.error.default + '40',
    shadowColor: semantic.error.default,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  indicator: {
    width: 4,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: semantic.error.default,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    flex: 1,
  },
  textContainer: {
    gap: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: palette.white,
    letterSpacing: -0.2,
  },
  description: {
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.7)',
  },
  action: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.white,
    paddingLeft: spacing[2],
  },
});
