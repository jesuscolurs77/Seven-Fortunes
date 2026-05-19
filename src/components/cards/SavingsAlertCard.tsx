import React from "react";
import { StyleSheet, Text as RNText, View, type ViewStyle } from "react-native";

import { Icon } from "@/icons";
import { fontFamily, palette } from "@/theme";

export interface SavingsAlertCardProps {
  amount: string;
  originalAmount: string;
  savings: string;
  style?: ViewStyle;
}

export function SavingsAlertCard({
  amount,
  originalAmount,
  savings,
  style,
}: SavingsAlertCardProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerRow}>
        <Icon name="sale" color={palette.white} width={16} height={16} />
        <RNText style={styles.headerText}>
          Ahorraste{" "}
          <RNText style={styles.savingsValue}>{savings}</RNText> en está compra
        </RNText>
      </View>
      <View style={styles.amountRow}>
        <RNText style={styles.amount}>{amount}</RNText>
        <RNText style={styles.amountOriginal}>{originalAmount}</RNText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
    alignSelf: "stretch",
    gap: 4,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#247A36",
    backgroundColor: "rgba(56, 192, 85, 0.25)",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerText: {
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: 16,
    includeFontPadding: false,
  },
  savingsValue: {
    color: "#65D27C",
    fontFamily: fontFamily.displayMedium,
    fontSize: 16,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  amount: {
    color: palette.white,
    fontFamily: fontFamily.displayMedium,
    fontSize: 28,
    includeFontPadding: false,
  },
  amountOriginal: {
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: 21,
    textDecorationLine: "line-through",
    includeFontPadding: false,
  },
});
