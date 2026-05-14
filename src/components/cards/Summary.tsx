import React from 'react';
import { StyleSheet, Text as RNText, View, type ViewStyle } from 'react-native';

import { palette, semantic } from '@/theme';

export interface SummaryItem {
  label: string;
  value: React.ReactNode;
  key?: string;
}

export interface SummaryProps {
  title?: string;
  items: SummaryItem[];
  showDividers?: boolean;
  style?: ViewStyle;
}

export function Summary({
  title = 'Transaction Details',
  items,
  showDividers = false,
  style,
}: SummaryProps) {
  return (
    <View style={[styles.wrapper, style]}>
      {title ? <RNText style={styles.title}>{title}</RNText> : null}
      <View style={styles.card}>
        {items.map((item, index) => (
          <React.Fragment key={item.key ?? `${item.label}-${index}`}>
            <View style={styles.row}>
              <RNText style={styles.label}>{item.label}</RNText>
              {typeof item.value === 'string' || typeof item.value === 'number' ? (
                <RNText style={styles.value}>{item.value}</RNText>
              ) : (
                item.value
              )}
            </View>
            {showDividers && index < items.length - 1 ? (
              <View style={styles.divider} />
            ) : null}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
    alignSelf: 'stretch',
  },
  title: {
    color: palette.gray[200],
    fontFamily: 'NeueHaasGroteskDisplayPro',
    fontSize: 16,
    fontWeight: '500',
  },
  card: {
    alignSelf: 'stretch',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  label: {
    color: palette.white,
    fontFamily: 'NeueHaasGroteskDisplayPro',
    fontSize: 16,
    fontWeight: '400',
  },
  value: {
    color: palette.white,
    fontFamily: 'NeueHaasGroteskDisplayPro',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'right',
  },
  divider: {
    height: 1,
    backgroundColor: semantic.border.subtle,
  },
});
