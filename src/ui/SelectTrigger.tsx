import React, { useMemo, useState } from 'react';
import {
  View,
  Text as RNText,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import { palette, radius, spacing, semantic } from '@/theme';
import { ChevronDownIcon } from '@/icons';

export interface SelectTriggerProps {
  placeholder?: string;
  selectedLabel?: string;
  selectedIcon?: React.ReactNode;
  selectedImage?: ImageSourcePropType;
  disabled?: boolean;
  isFocused?: boolean;
  onPress: () => void;
}

const TRIGGER_HEIGHT = 48;
const ICON_SIZE = 24;
const CHEVRON_WIDTH = 14;
const CHEVRON_HEIGHT = 9;

export function SelectTrigger({
  placeholder = 'Seleccionar...',
  selectedLabel,
  selectedIcon,
  selectedImage,
  disabled = false,
  isFocused = false,
  onPress,
}: SelectTriggerProps) {
  const [isPressed, setIsPressed] = useState(false);

  const textColor = useMemo(() => {
    if (disabled) {
      return 'rgba(255, 255, 255, 0.50)';
    }
    if (selectedLabel) {
      return palette.white;
    }
    return 'rgba(255, 255, 255, 0.50)';
  }, [disabled, selectedLabel]);

  const chevronColor = useMemo(() => {
    if (disabled) {
      return 'rgba(255, 255, 255, 0.50)';
    }
    return 'rgba(255, 255, 255, 0.70)';
  }, [disabled]);

  const getBorderStyles = () => {
    if (disabled) {
      return {
        borderWidth: 1,
        borderColor: semantic.border.input,
      };
    }
    if (isFocused || isPressed) {
      return {
        borderWidth: 1,
        borderColor: palette.blue[300],
      };
    }
    return {
      borderWidth: 1,
      borderColor: semantic.border.inputDefault,
    };
  };

  const renderLeftIcon = () => {
    if (selectedImage) {
      return (
        <Image
          source={selectedImage}
          style={styles.leftIconImage}
          resizeMode="contain"
        />
      );
    }

    if (selectedIcon) {
      return (
        <View style={styles.leftIconContainer}>
          {selectedIcon}
        </View>
      );
    }

    return null;
  };

  return (
    <TouchableWithoutFeedback
      onPress={disabled ? undefined : onPress}
      onPressIn={() => !disabled && setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      <View style={styles.wrapper}>
        {isFocused && (
          <View style={styles.focusOuterBorder} />
        )}
        <View style={[styles.container, getBorderStyles()]}>
          {renderLeftIcon()}
          <RNText
            style={[styles.labelText, { color: textColor }]}
            numberOfLines={1}
          >
            {selectedLabel || placeholder}
          </RNText>
          <View style={styles.chevronContainer}>
            <ChevronDownIcon color={chevronColor} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    width: '100%',
  },
  container: {
    height: TRIGGER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[3],
    borderRadius: radius.sm,
    backgroundColor: semantic.surface.primary,
  },
  focusOuterBorder: {
    position: 'absolute',
    top: -1,
    left: -1,
    right: -1,
    bottom: -1,
    borderWidth: 2,
    borderColor: palette.blue[500],
    borderRadius: radius.sm,
    zIndex: 1,
  },
  leftIconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing[2],
  },
  leftIconImage: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginRight: spacing[2],
  },
  labelText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    includeFontPadding: false,
    marginHorizontal: spacing[1],
  },
  chevronContainer: {
    width: CHEVRON_WIDTH,
    height: CHEVRON_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing[2],
  },
});

export { TRIGGER_HEIGHT, ICON_SIZE, CHEVRON_WIDTH, CHEVRON_HEIGHT };
