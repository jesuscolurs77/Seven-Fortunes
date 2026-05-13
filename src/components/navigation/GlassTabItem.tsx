import React, { useMemo } from 'react';
import {
  View,
  Text as RNText,
  StyleSheet,
  useColorScheme,
  ViewProps,
  Image,
  ImageSourcePropType,
} from 'react-native';

import { palette, spacing, fontFamily } from '@/theme';

export interface GlassTabItemProps {
  index: number;
  icon: React.ReactNode | string | ImageSourcePropType;
  label?: string;
  active: boolean;
  onLayout?: ViewProps['onLayout'];
  colorScheme?: 'light' | 'dark' | 'auto' | null;
}

const TAB_ITEM_HEIGHT = 56;
const TAB_ITEM_MIN_WIDTH = 64;
const TAB_ICON_SIZE = 24;
const TAB_LABEL_FONT_SIZE = 10;

function isImageSource(
  icon: React.ReactNode | string | ImageSourcePropType
): icon is ImageSourcePropType {
  return (
    typeof icon === 'number' ||
    (typeof icon === 'object' && icon !== null && 'uri' in icon)
  );
}

function isStringIcon(
  icon: React.ReactNode | string | ImageSourcePropType
): icon is string {
  return typeof icon === 'string';
}

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

  const iconColor = active ? activeColor : inactiveColor;

  const renderIconContent = useMemo(() => {
    if (isStringIcon(icon)) {
      return (
        <RNText
          style={[
            styles.iconEmoji,
            { color: iconColor, fontSize: TAB_ICON_SIZE },
          ]}
        >
          {icon}
        </RNText>
      );
    }

    if (isImageSource(icon)) {
      return (
        <Image
          source={icon}
          style={[
            styles.iconImage,
            { tintColor: iconColor },
          ]}
        />
      );
    }

    return icon;
  }, [icon, iconColor]);

  return (
    <View
      style={[
        styles.tabItem,
        { height: TAB_ITEM_HEIGHT },
      ]}
      onLayout={onLayout}
    >
      <View style={styles.iconBox}>
        {renderIconContent}
      </View>
      {label && (
        <RNText
          style={[
            styles.label,
            { color: iconColor, fontSize: TAB_LABEL_FONT_SIZE },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.8}
        >
          {label}
        </RNText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    minWidth: TAB_ITEM_MIN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  iconBox: {
    width: TAB_ICON_SIZE,
    height: TAB_ICON_SIZE,
    maxWidth: TAB_ICON_SIZE,
    maxHeight: TAB_ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    flexShrink: 0,
  },
  iconImage: {
    width: TAB_ICON_SIZE,
    height: TAB_ICON_SIZE,
    resizeMode: 'contain',
  },
  iconEmoji: {
    width: TAB_ICON_SIZE,
    height: TAB_ICON_SIZE,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    fontWeight: '600',
  },
  label: {
    textAlign: 'center',
    marginTop: 2,
    fontWeight: '500',
    fontFamily: fontFamily.display,
    includeFontPadding: false,
  },
});

export { TAB_ITEM_HEIGHT, TAB_ITEM_MIN_WIDTH, TAB_ICON_SIZE, TAB_LABEL_FONT_SIZE };
