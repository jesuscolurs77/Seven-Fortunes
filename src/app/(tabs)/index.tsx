import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Platform,
  Text as RNText,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import { IconButton, InfiniteScrollList, Skeleton, Text } from "@/components";
import { Icon } from "@/icons";
import { fontFamily, fontSize, fontWeight, palette, spacing } from "@/theme";

const USDC_IMAGE = require("../../img/USDC.png");

const MAIN_PADDING_H = Platform.select({
  ios: spacing[4],
  android: spacing[2],
}) as number;

interface Transaction {
  id: string;
  title: string;
  description: string;
  amount: string;
  date: string;
  type: "send" | "receive" | "exchange" | "add";
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Coffee Shop",
    description: "Cafe Americano",
    amount: "$4.99",
    date: "Ene 3, 2026",
    type: "send",
  },
  {
    id: "2",
    title: "App Store",
    description: "Suscripción mensual",
    amount: "$9.99",
    date: "Ene 2, 2026",
    type: "send",
  },
  {
    id: "3",
    title: "Transferencia",
    description: "De: Juan Pérez",
    amount: "$1,000.00",
    date: "Ene 1, 2026",
    type: "receive",
  },
  {
    id: "4",
    title: "Uber Ride",
    description: "Viaje centro",
    amount: "$12.50",
    date: "Dic 30, 2025",
    type: "send",
  },
  {
    id: "5",
    title: "Depósito Nómina",
    description: "Pago mensual",
    amount: "$3,500.00",
    date: "Dic 28, 2025",
    type: "receive",
  },
];

export default function HomeScreen() {
  const [showBalance, setShowBalance] = useState(true);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [hasMore] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBalanceLoading(false);
      setTransactions(MOCK_TRANSACTIONS);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const router = useRouter();
  const renderTransaction = useCallback(
    ({ item }: { item: Transaction }) => (
      <TouchableOpacity
        style={styles.transactionRow}
        onPress={() => router.push("/(tabs)/add-money")}
        activeOpacity={0.7}
      >
        <View style={styles.transactionIconWrapper}>
          <View style={styles.transactionIconBox}>
            <Icon
              name={item.type === "send" ? "send" : item.type === "receive" ? "receive" : item.type === "exchange" ? "exchange" : "add"}
              color={palette.gray[300]}
            />
          </View>
        </View>
        <View style={styles.transactionMiddle}>
          <RNText style={styles.transactionTitle}>{item.title}</RNText>
          <RNText style={styles.transactionDescription}>{item.description}</RNText>
        </View>
        <View style={styles.transactionRight}>
          <RNText style={styles.transactionDate} numberOfLines={1}>{item.date}</RNText>
          <RNText style={styles.transactionAmount} numberOfLines={1}>+{item.amount}</RNText>
        </View>
      </TouchableOpacity>
    ),
    [router],
  );

  return (
    <View style={styles.parent}>
      <View style={styles.container}>
        <View style={styles.con1}>
          <View style={styles.usdcBadge}>
            <Image source={USDC_IMAGE} style={styles.usdcImage} />
            <Text variant="bodyLarge" color="primary">
              USDC
            </Text>
          </View>
        </View>

        <View style={styles.con2}>
          {balanceLoading ? (
            <Skeleton width={160} height={48} borderRadius={8} />
          ) : (
            <RNText style={styles.balanceText}>
              {showBalance ? "$ 500" : "$ ****"}
            </RNText>
          )}
          <View style={styles.eyeRow}>
            <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
              <Icon
                name={showBalance ? "eye-closed" : "eye-open"}
                color={palette.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.actionsRow}>
        <View style={styles.actionItem}>
          <IconButton
            variant="primary"
            icon={<Icon name="add" color={palette.gray[950]} />}
            onPress={() => router.push("/(full)/add-funds")}
          />
          <Text variant="bodyLarge" color="primary">
            Add money
          </Text>
        </View>
        <View style={styles.actionItem}>
          <IconButton
            variant="secondary"
            icon={<Icon name="exchange" color={palette.white} />}
          />
          <Text variant="bodyLarge" color="primary">
            Convert
          </Text>
        </View>
        <View style={styles.actionItem}>
          <IconButton
            variant="secondary"
            icon={<Icon name="receive" color={palette.white} />}
          />
          <Text variant="bodyLarge" color="primary">
            Receive
          </Text>
        </View>
        <View style={styles.actionItem}>
          <IconButton
            variant="secondary"
            icon={<Icon name="send" color={palette.white} />}
          />
          <Text variant="bodyLarge" color="primary">
            Send
          </Text>
        </View>
      </View>

      <View style={styles.activitySection}>
        <Text variant="subtitle" color="primary">
          Activity
        </Text>
        <InfiniteScrollList
          data={transactions}
          renderItem={renderTransaction}
          loading={balanceLoading}
          hasMore={hasMore}
          showDividers
          loadingSkeletonCount={4}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacing[2],
    width: "100%",
    flex: 1,
    paddingHorizontal: MAIN_PADDING_H,
    overflow: "hidden",
  },
  container: {
    display: "flex",
    paddingVertical: spacing[4],
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: spacing[2],
    alignSelf: "stretch",
  },
  con1: {
    display: "flex",
    alignItems: "center",
    gap: spacing[1],
    flexDirection: "row",
  },
  usdcBadge: {
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    borderRadius: 79.2,
    flexDirection: "row",
  },
  usdcImage: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
  con2: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
  },
  balanceText: {
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: 42,
    fontWeight: fontWeight.h1,
  },
  actionsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "stretch",
    flexDirection: "row",
  },
  actionItem: {
    display: "flex",
    paddingVertical: spacing[3],
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing[2],
    flex: 1,
  },
  eyeRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing[2],
    flexDirection: "row",
  },
  activitySection: {
    display: "flex",
    width: "100%",
    flex: 1,
    paddingVertical: spacing[3],
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacing[3],
  },
  transactionRow: {
    display: "flex",
    paddingVertical: spacing[4],
    alignItems: "center",
    gap: 12,
    alignSelf: "stretch",
    flexDirection: "row",
  },
  transactionIconWrapper: {
    display: "flex",
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionIconBox: {
    display: "flex",
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: palette.gray[900],
  },
  transactionMiddle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    flex: 1,
  },
  transactionTitle: {
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bodyLarge,
  },
  transactionDescription: {
    color: palette.gray[300],
    fontFamily: fontFamily.display,
    fontSize: fontSize.captionLarge,
    fontWeight: fontWeight.captionLarge,
  },
  transactionRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 4,
    flexShrink: 1,
  },
  transactionDate: {
    color: palette.gray[300],
    fontFamily: fontFamily.display,
    fontSize: fontSize.captionLarge,
    fontWeight: fontWeight.captionLarge,
  },
  transactionAmount: {
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.button,
  },
});
