import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Keyboard,
  type TextInputProps,
  type ViewStyle,
  type StyleProp,
} from 'react-native';

import { opacity, palette, radius, semantic, typography } from '@/theme';
import { Icon } from '@/icons';

export interface PasswordInputProps extends TextInputProps {
  disabled?: boolean;
  hasError?: boolean;
}

export function PasswordInput({
  disabled = false,
  hasError = false,
  style,
  placeholderTextColor,
  ...props
}: PasswordInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(true);

  const getBorderStyle = (): ViewStyle => {
    if (hasError) {
      return styles.errorBorder;
    }
    if (disabled) {
      return styles.disabledBorder;
    }
    if (isFocused) {
      return styles.focusedBorder;
    }
    return styles.defaultBorder;
  };

  const getTextColor = (): string => {
    if (disabled) {
      return `rgba(255,255,255,${opacity[50]})`;
    }
    return palette.white;
  };

  const getPlaceholderColor = (): string => {
    if (disabled) {
      return `rgba(255,255,255,${opacity[30]})`;
    }
    return `rgba(255,255,255,${opacity[50]})`;
  };

  const toggleSecure = () => {
    if (!disabled) {
      Keyboard.dismiss();
      setIsSecure(!isSecure);
    }
  };

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    getBorderStyle(),
  ];

  const inputStyle: StyleProp<any> = [
    styles.input,
    typography.input,
    { color: getTextColor() },
    style,
  ];

  const getIconColor = (): string => {
    if (disabled) {
      return 'rgba(255,255,255,0.35)';
    }
    return 'rgba(255,255,255,0.75)';
  };

  return (
    <View style={containerStyle}>
      <TextInput
        style={inputStyle}
        placeholderTextColor={placeholderTextColor || getPlaceholderColor()}
        editable={!disabled}
        onFocus={() => !disabled && setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        secureTextEntry={isSecure}
        {...props}
      />
      <Pressable
        style={styles.eyeButton}
        onPress={toggleSecure}
        disabled={disabled}
      >
        <Icon
          name={isSecure ? 'eye-open' : 'eye-closed'}
          color={getIconColor()}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: semantic.surface.primary,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 12,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  eyeButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultBorder: {
    borderWidth: 1,
    borderColor: semantic.border.inputDefault,
  },
  disabledBorder: {
    borderWidth: 1,
    borderColor: semantic.border.input,
  },
  focusedBorder: {
    borderWidth: 2,
    borderColor: semantic.border.focus,
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: semantic.border.error,
  },
});
