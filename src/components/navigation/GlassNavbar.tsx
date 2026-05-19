import React from 'react';
import { View, StyleSheet, type ViewStyle, Text as RNText } from 'react-native';

import {
  layout,
  spacing,
  palette,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
} from '@/theme';
import { GlassButton } from '@/components/buttons';

export interface GlassNavbarProps {
  title?: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  leftIcon?: string;
  rightIcon?: string;
  leftLabel?: string;
  rightLabel?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  transparent?: boolean;
  bgColor?: string;
  style?: ViewStyle;
}

export function GlassNavbar({
  title,
  leftContent,
  rightContent,
  leftIcon,
  rightIcon,
  leftLabel,
  rightLabel,
  onLeftPress,
  onRightPress,
  transparent = false,
  bgColor,
  style,
}: GlassNavbarProps) {

  const containerStyle: ViewStyle[] = [
    styles.container,
    ...(style ? [style] : []),
  ];

  const renderLeftButton = () => {
    if (leftContent) {
      return leftContent;
    }
    if (leftIcon) {
      return (
        <GlassButton
          iconName={leftIcon}
          label={leftLabel}
          onPress={onLeftPress}
        />
      );
    }
    return null;
  };

  const renderRightButton = () => {
    if (rightContent) {
      return rightContent;
    }
    if (rightIcon) {
      return (
        <GlassButton
          iconName={rightIcon}
          label={rightLabel}
          onPress={onRightPress}
        />
      );
    }
    return null;
  };

  return (
    <View style={containerStyle}>
      {!transparent && (
        <View style={[
          StyleSheet.absoluteFill, 
          styles.glassFallback,
          bgColor ? { backgroundColor: bgColor, borderBottomWidth: 0 } : {}
        ]} />
      )}
      <View style={styles.inner}>
        <View style={styles.sideSection}>
          {renderLeftButton()}
        </View>
        <View style={styles.titleSection}>
          {title && (
            <RNText style={styles.title} numberOfLines={1}>
              {title}
            </RNText>
          )}
        </View>
        <View style={[styles.sideSection, styles.rightSide]}>
          {renderRightButton()}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: layout.headerHeight,
    width: '100%',
  },
  glassFallback: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.08)',
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[4],
    zIndex: 1,
  },
  sideSection: {
    minWidth: 42,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightSide: {
    alignItems: 'flex-end',
  },
  titleSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[2],
  },
  title: {
    fontSize: fontSize.h4,
    fontWeight: fontWeight.button,
    color: palette.gray[100],
    fontFamily: fontFamily.display,
    lineHeight: lineHeight.h4,
    includeFontPadding: false,
    textAlign: 'center',
  },
});
