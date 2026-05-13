import React from 'react';
import { View, type ViewProps, type ViewStyle, StyleSheet } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { semantic, layout } from '@/theme';
import { cn } from '@/utils/cn';

export interface ScreenProps extends ViewProps {
  children: React.ReactNode;
  safeAreaEdges?: Edge[];
  withoutSafeArea?: boolean;
  className?: string;
}

const defaultEdges: Edge[] = ['top', 'left', 'right'];

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: semantic.background.primary,
  },
  defaultPadding: {
    padding: layout.screenPadding,
  },
});

export function Screen({
  children,
  safeAreaEdges = defaultEdges,
  withoutSafeArea = false,
  className,
  style,
  ...props
}: ScreenProps) {
  const content = (
    <View
      className={cn(className)}
      style={[styles.base, styles.defaultPadding, style as ViewStyle]}
      {...props}
    >
      {children}
    </View>
  );

  if (withoutSafeArea) {
    return content;
  }

  return (
    <SafeAreaView edges={safeAreaEdges} style={{ flex: 1, backgroundColor: semantic.background.primary }}>
      {content}
    </SafeAreaView>
  );
}
