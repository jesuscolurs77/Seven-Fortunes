import React, { useCallback, useState } from "react";
import {
  Platform,
  Text as RNText,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

import { palette } from "@/theme";

const AMOUNT_FONT_SIZE = 46;

export interface InputAmountProps extends Omit<TextInputProps, "style"> {
  label?: string;
  hint?: string;
  prefix?: string;
  hasError?: boolean;
  errorMessage?: string;
}

function formatThousands(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function InputAmount({
  label = "Amount (USD)",
  hint = "Min. $10.00 - Max. $10,000.00",
  prefix = "$",
  onChangeText,
  placeholder,
  hasError = false,
  errorMessage,
  ...props
}: InputAmountProps) {
  const [displayText, setDisplayText] = useState("");

  const handleChangeText = useCallback(
    (text: string) => {
      const raw = text.replace(/\D/g, "");
      setDisplayText(formatThousands(raw));
      onChangeText?.(raw);
    },
    [onChangeText],
  );

  return (
    <View style={styles.container}>
      <RNText style={styles.label}>{label}</RNText>
      <View style={styles.inputRow}>
        <RNText style={styles.prefix}>{prefix}</RNText>
        <TextInput
          style={styles.input}
          value={displayText}
          onChangeText={handleChangeText}
          placeholder={placeholder || "0.00"}
          placeholderTextColor="rgba(255,255,255,0.30)"
          keyboardType="decimal-pad"
          keyboardAppearance="dark"
          {...props}
        />
      </View>
      <RNText style={[styles.hint, hasError && styles.hintError]}>
        {errorMessage || hint}
      </RNText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
    alignSelf: "stretch",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.05)",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  label: {
    color: "#C7C9D3",
    fontFamily: "NeueHaasGroteskDisplayPro",
    fontSize: 16,
    fontWeight: "500",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "stretch",
    paddingBottom: 8,
  },
  prefix: {
    color: palette.white,
    fontFamily: "NeueHaasGroteskDisplayPro",
    fontSize: AMOUNT_FONT_SIZE,
    lineHeight: AMOUNT_FONT_SIZE,
    fontWeight: "500",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  input: {
    flex: 1,
    color: palette.white,
    fontFamily: "NeueHaasGroteskDisplayPro",
    fontSize: AMOUNT_FONT_SIZE,
    fontWeight: "500",
    padding: 0,
    margin: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
    ...Platform.select({
      android: {
        lineHeight: AMOUNT_FONT_SIZE,
        height: AMOUNT_FONT_SIZE + 4,
      },
    }),
  },
  hint: {
    color: palette.gray[200],
    fontFamily: "NeueHaasGroteskDisplayPro",
    fontSize: 14,
    fontWeight: "400",
  },
  hintError: {
    color: "#FF453A",
  },
});
