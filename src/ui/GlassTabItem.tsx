import React, { useMemo } from 'react';
import { View, Text as RNText, StyleSheet, useColorScheme, ViewProps } from 'react-native';

import { palette, spacing } from '@/theme';

export interface GlassTabItemProps {
  index: number;
  icon: React.ReactNode;
  label?: string;
  active: boolean;
  onLayout?: ViewProps['onLayout'];
  colorScheme?: 'light' | 'dark' | 'auto' | null;
}

const TAB_ITEM_HEIGHT = 56;
const TAB_ITEM_MIN_WIDTH = 64;
const TAB_ICON_SIZE = 24;

export function GlassTabItem({
  index,
  icon,
  label,
  active,
  onLayout,
  colorScheme: propColorScheme,
}: GlassTabItemProps) {
  const systemColorScheme = useColorScheme();

  const actualColorScheme = useMemo(() => {
    if (propColorScheme && propColorScheme !== 'auto') return propColorScheme;
    if (!systemColorScheme || systemColorScheme === 'unspecified') return 'dark';
    return systemColorScheme;
  }, [propColorScheme, systemColorScheme]);

  const activeColor = useMemo(() => {
    if (actualColorScheme === 'dark') {
      return palette.white;
    }
    return palette.gray[900];
  }, [actualColorScheme]);

  const inactiveColor = useMemo(() => {
    if (actualColorScheme === 'dark') {
      return 'rgba(255, 255, 255, 0.5)';
    }
    return 'rgba(0, 0, 0, 0.4)';
  }, [actualColorScheme]);

  const iconStyle = useMemo(() => {
    return {
      color: active ? activeColor : inactiveColor,
      fontSize: TAB_ICON_SIZE,
      fontWeight: '600' as const,
    };
  }, [active, activeColor, inactiveColor]);

  const labelStyle = useMemo(() => {
    return {
      color: active ? activeColor : inactiveColor,
      fontSize: 11,
      fontWeight: '500' as const,
      marginTop: 2,
    };
  }, [active, activeColor, inactiveColor]);

  return (
    <View
      style={[
        styles.tabItem,
        { height: TAB_ITEM_HEIGHT },
      ]}
      onLayout={onLayout}
    >
      <View style={styles.iconContainer}>
        {typeof icon === 'string' ? (
          <RNText style={[styles.iconText, iconStyle]}>{icon}</RNText>
        ) : (
          icon
        )}
      </View>
      {label && (
        <RNText style={[styles.label, labelStyle]} numberOfLines={1}>
          {label}
        </RNText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    minWidth: TAB_ITEM_MIN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[3],
    zIndex: 10,
  },
  iconContainer: {
    width: TAB_ICON_SIZE,
    height: TAB_ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  label: {
    textAlign: 'center',
  },
});

export { TAB_ITEM_HEIGHT, TAB_ITEM_MIN_WIDTH, TAB_ICON_SIZE };
