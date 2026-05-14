import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text as RNText, StyleSheet, View } from "react-native";

import { Summary } from "@/components";
import { Icon } from "@/icons";
import {
  fontFamily,
  fontSize,
  fontWeight,
  palette,
  spacing,
} from "@/theme";
import { formatCurrency } from "@/utils";

interface TransactionDetail {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: "send" | "receive" | "exchange" | "add";
  senderName: string;
}

const TYPE_LABELS: Record<TransactionDetail["type"], string> = {
  send: "Total enviado",
  receive: "Total recibido",
  exchange: "Total convertido",
  add: "Total agregado",
};

const MOCK: TransactionDetail = {
  id: "1",
  title: "Coffee Shop",
  description: "Cafe Americano",
  amount: 4.99,
  date: "Ene 3, 2026",
  type: "send",
  senderName: "Juan Pérez",
};

export default function TransactionDetailScreen() {
  const params = useLocalSearchParams<{ id?: string }>();

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <View style={styles.iconCircle}>
            <Icon
              name={
                MOCK.type === "send"
                  ? "send"
                  : MOCK.type === "receive"
                    ? "receive"
                    : MOCK.type === "exchange"
                      ? "exchange"
                      : "add"
              }
              color={palette.white}
            />
          </View>
          <RNText style={styles.headerLabel}>{TYPE_LABELS[MOCK.type]}</RNText>
        </View>
      </View>

      <View style={styles.sectionAmount}>
        <View style={styles.amountRow}>
          <RNText style={styles.amountText}>
            {formatCurrency(MOCK.amount, "USD")}
          </RNText>
          <RNText style={styles.currencyText}>USDC</RNText>
        </View>
        <RNText style={styles.approxText}>
          Apróx. {formatCurrency(MOCK.amount * 3.76, "PEN")}
        </RNText>
      </View>

      <View style={styles.sectionFrom}>
        <View style={styles.fromHeader}>
          <View style={styles.iconCircleSmall}>
            <Icon name="user" color={palette.gray[300]} />
          </View>
          <RNText style={styles.fromLabel}>De</RNText>
        </View>
        <View style={styles.userCard}>
          <View style={styles.initialCircle}>
            <RNText style={styles.initialText}>
              {MOCK.senderName.charAt(0)}
            </RNText>
          </View>
          <RNText style={styles.userName}>{MOCK.senderName}</RNText>
        </View>
      </View>

      <Summary
        title="Transaction Details"
        style={styles.summarySpacing}
        items={[
          {
            label: 'Sending',
            value: `${formatCurrency(MOCK.amount, 'USD')} USDC`,
          },
          {
            label: 'fee',
            value: formatCurrency(MOCK.amount * 0.025, 'USD'),
          },
          {
            label: 'Total Charged',
            value: `${formatCurrency(MOCK.amount * 1.025, 'USD')} USD`,
          },
          { label: 'Exchange Rate', value: '$1 = S/ 3.76' },
          {
            label: 'Maria Gets',
            value: formatCurrency(MOCK.amount, 'USD'),
          },
          {
            label: 'Equivalent',
            value: formatCurrency(MOCK.amount * 3.76, 'PEN'),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gray[950],
    padding: spacing[4],
    gap: spacing[2],
  },
  headerSection: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacing[2],
    alignSelf: "stretch",
    marginTop: 32,
    marginBottom: spacing[2],
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  iconCircle: {
    width: 28,
    height: 28,
    paddingVertical: spacing[2],
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: palette.gray[900],
  },
  headerLabel: {
    color: palette.gray[200],
    fontFamily: fontFamily.display,
    fontSize: fontSize.body,
    fontWeight: fontWeight.body,
  },
  sectionAmount: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacing[2],
    alignSelf: "stretch",
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  amountText: {
    color: palette.white,
    fontFamily: fontFamily.displayMedium,
    fontSize: 42,
    fontWeight: fontWeight.h1,
  },
  currencyText: {
    color: "rgba(255, 255, 255, 0.50)",
    fontFamily: fontFamily.display,
    fontSize: 16,
    fontWeight: fontWeight.h2,
  },
  approxText: {
    color: palette.gray[200],
    fontFamily: fontFamily.display,
    fontSize: 16,
    fontWeight: fontWeight.h2,
  },
  sectionFrom: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacing[2],
    alignSelf: "stretch",
    marginTop: spacing[4],
  },
  fromHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1],
  },
  iconCircleSmall: {
    width: 28,
    height: 28,
    paddingVertical: spacing[2],
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: palette.gray[900],
  },
  fromLabel: {
    color: palette.gray[300],
    fontFamily: fontFamily.display,
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bodyLarge,
  },
  userCard: {
    display: "flex",
    padding: spacing[4],
    alignItems: "center",
    gap: 12,
    alignSelf: "stretch",
    flexDirection: "row",
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  initialCircle: {
    display: "flex",
    width: 36,
    height: 36,
    paddingVertical: spacing[2],
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    aspectRatio: 1,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#D7E0F2",
    backgroundColor: "#C3D1EC",
  },
  initialText: {
    color: "#1C3360",
    fontFamily: fontFamily.display,
    fontSize: 16,
    fontWeight: fontWeight.h2,
  },
  userName: {
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bodyLarge,
  },
  summarySpacing: {
    marginTop: 8,
  },
});
