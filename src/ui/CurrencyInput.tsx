import React, { useCallback, useState } from "react";
import {
  Text as RNText,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { opacity, palette, radius, semantic, spacing } from "@/theme";

export interface CurrencyInputProps extends Omit<
  TextInputProps,
  "value" | "onChangeText" | "onChange" | "keyboardType"
> {
  value?: number;
  onChange?: (value: number) => void;
  currency?: string;
  currencyPosition?: "left" | "right";
  min?: number;
  max?: number;
  decimalPlaces?: number;
  disabled?: boolean;
  hasError?: boolean;
  showErrorHint?: boolean;
}

const DEFAULT_CURRENCY = "USD";
const DEFAULT_DECIMALS = 2;

function formatNumber(value: number, decimalPlaces: number): string {
  return value.toFixed(decimalPlaces);
}

function parseCurrencyText(text: string, decimalPlaces: number): number {
  const cleaned = text.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");

  if (parts.length > 2) {
    const integerPart = parts.slice(0, -1).join("");
    const decimalPart = parts[parts.length - 1];
    return parseFloat(`${integerPart}.${decimalPart}`) || 0;
  }

  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;
  return parseFloat(num.toFixed(decimalPlaces));
}

export function CurrencyInput({
  value = 0,
  onChange,
  currency = DEFAULT_CURRENCY,
  currencyPosition = "left",
  min,
  max,
  decimalPlaces = DEFAULT_DECIMALS,
  disabled = false,
  hasError = false,
  showErrorHint = true,
  style,
  placeholderTextColor,
  ...props
}: CurrencyInputProps) {
  const [displayText, setDisplayText] = useState(() =>
    formatNumber(value, decimalPlaces),
  );
  const [isFocused, setIsFocused] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const validateValue = useCallback(
    (num: number): { valid: boolean; error: string | null } => {
      if (min !== undefined && num < min) {
        return { valid: false, error: `Valor mínimo: ${min}` };
      }
      if (max !== undefined && num > max) {
        return { valid: false, error: `Valor máximo: ${max}` };
      }
      return { valid: true, error: null };
    },
    [min, max],
  );

  const handleChangeText = useCallback(
    (text: string) => {
      setDisplayText(text);

      const num = parseCurrencyText(text, decimalPlaces);
      const validation = validateValue(num);

      if (validation.valid) {
        setLocalError(null);
        onChange?.(num);
      } else {
        setLocalError(validation.error);
      }
    },
    [decimalPlaces, validateValue, onChange],
  );

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    const validation = validateValue(value);
    if (validation.valid) {
      setDisplayText(formatNumber(value, decimalPlaces));
      setLocalError(null);
    }
  }, [value, decimalPlaces, validateValue]);

  const getBorderStyle = () => {
    if (hasError || localError) {
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

  const getTextColor = () => {
    if (disabled) {
      return `rgba(255,255,255,${opacity[50]})`;
    }
    return palette.white;
  };

  const getPlaceholderColor = () => {
    if (disabled) {
      return `rgba(255,255,255,${opacity[30]})`;
    }
    return `rgba(255,255,255,${opacity[50]})`;
  };

  const showError = hasError || localError;

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, getBorderStyle()]}>
        {currencyPosition === "left" && (
          <RNText
            style={[
              styles.currencyText,
              disabled && styles.currencyTextDisabled,
            ]}
          >
            {currency}
          </RNText>
        )}

        <TextInput
          style={[styles.input, { color: getTextColor() }, style]}
          value={displayText}
          onChangeText={handleChangeText}
          onFocus={() => !disabled && setIsFocused(true)}
          onBlur={handleBlur}
          editable={!disabled}
          keyboardType="decimal-pad"
          placeholderTextColor={placeholderTextColor || getPlaceholderColor()}
          placeholder="0.00"
          keyboardAppearance="dark"
          {...props}
        />

        {currencyPosition === "right" && (
          <RNText
            style={[
              styles.currencyText,
              disabled && styles.currencyTextDisabled,
            ]}
          >
            {currency}
          </RNText>
        )}
      </View>

      {showError && showErrorHint && localError && (
        <RNText style={styles.errorText}>{localError}</RNText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  inputContainer: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing[3],
    borderRadius: radius.sm,
    backgroundColor: semantic.surface.primary,
    gap: spacing[2],
  },
  defaultBorder: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.50)",
  },
  disabledBorder: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  focusedBorder: {
    borderWidth: 2,
    borderColor: palette.blue[500],
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: semantic.error.default,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontWeight: "500",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  currencyText: {
    fontSize: 16,
    fontWeight: "600",
    color: palette.white,
    includeFontPadding: false,
  },
  currencyTextDisabled: {
    color: "rgba(255, 255, 255, 0.50)",
  },
  errorText: {
    fontSize: 12,
    color: semantic.error.default,
    marginTop: spacing[1],
    includeFontPadding: false,
  },
});
