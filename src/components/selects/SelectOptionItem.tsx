import React, { useMemo } from 'react';
import {
  View,
  Text as RNText,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import { palette, radius, spacing, semantic } from '@/theme';

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  image?: ImageSourcePropType;
  subtitle?: string;
}

export interface SelectOptionItemProps {
  option: SelectOption;
  selected: boolean;
  onPress: () => void;
}

const ITEM_HEIGHT = 48;
const ICON_SIZE = 24;

export function SelectOptionItem({
  option,
  selected,
  onPress,
}: SelectOptionItemProps) {
  const bgColor = useMemo(() => {
    if (selected) {
      return 'rgba(56, 101, 192, 0.20)';
    }
    return 'transparent';
  }, [selected]);

  const renderIcon = () => {
    if (option.image) {
      return (
        <Image
          source={option.image}
          style={styles.itemIconImage}
          resizeMode="contain"
        />
      );
    }

    if (option.icon) {
      return (
        <View style={styles.itemIconContainer}>
          {option.icon}
        </View>
      );
    }

    return null;
  };

  const hasLeftElement = option.image || option.icon;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.itemContainer, { backgroundColor: bgColor }]}>
        {hasLeftElement && renderIcon()}
        <View style={styles.itemTextContainer}>
          <RNText style={styles.itemLabel}>
            {option.label}
          </RNText>
          {option.subtitle && (
            <RNText style={styles.itemSubtitle}>
              {option.subtitle}
            </RNText>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    minHeight: ITEM_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing[2],
    gap: spacing[2],
    alignSelf: 'stretch',
    borderRadius: radius.sm,
  },
  itemIconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIconImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: palette.white,
    includeFontPadding: false,
  },
  itemSubtitle: {
    fontSize: 12,
    color: semantic.text.muted,
    includeFontPadding: false,
    marginTop: 2,
  },
  selectedIndicator: {
    fontSize: 16,
    color: palette.blue[500],
    fontWeight: '600',
  },
});

export { ITEM_HEIGHT, ICON_SIZE };
