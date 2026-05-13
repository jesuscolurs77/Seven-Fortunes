import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { semantic, palette } from '@/theme';
import { typography } from '@/theme/typography';
import { PressableScale } from '@/components/common/PressableScale';
import { Icon } from '@/icons/Icon';
import { Switch, type SwitchProps } from '@/components/inputs/Switch';

export interface ProfileButtonProps {
  icon?: string;
  label: string;
  rightIcon?: string;
  switchProps?: SwitchProps;
  destructive?: boolean;
  onPress?: () => void;
}

const DESTRUCTIVE_ICON_COLOR = '#F77B6D';
const DESTRUCTIVE_BG = '#D7625533';
const RIGHT_ICON_COLOR = 'rgba(255,255,255,0.5)';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 12,
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: palette.gray[800],
  },
  iconBox: {
    width: 32,
    height: 32,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: palette.gray[900],
  },
  iconBoxDestructive: {
    backgroundColor: DESTRUCTIVE_BG,
  },
  label: {
    flex: 1,
    color: palette.white,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'NeueHaasGroteskDisplayPro',
  },
  labelDestructive: {
    color: DESTRUCTIVE_ICON_COLOR,
  },
  rightSlot: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export function ProfileButton({
  icon = 'user',
  label,
  rightIcon = 'chevron-right',
  switchProps,
  destructive = false,
  onPress,
}: ProfileButtonProps) {
  const content = (
    <>
      <View style={[styles.iconBox, destructive && styles.iconBoxDestructive]}>
        <Icon
          name={icon}
          width={20}
          height={20}
          color={destructive ? DESTRUCTIVE_ICON_COLOR : undefined}
        />
      </View>
      <Text
        style={[styles.label, destructive && styles.labelDestructive]}
        numberOfLines={1}
      >
        {label}
      </Text>
      <View style={styles.rightSlot}>
        {switchProps ? (
          <Switch {...switchProps} />
        ) : (
          <Icon
            name={rightIcon}
            width={24}
            height={24}
            color={RIGHT_ICON_COLOR}
          />
        )}
      </View>
    </>
  );

  if (onPress) {
    return (
      <PressableScale onPress={onPress} style={styles.container}>
        {content}
      </PressableScale>
    );
  }

  return <View style={styles.container}>{content}</View>;
}
