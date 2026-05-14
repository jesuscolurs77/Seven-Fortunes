import React, { useCallback, useEffect, useState } from "react";
import {
  Text as RNText,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { useRouter } from "expo-router";

import { InfiniteScrollList } from "@/components";
import { Icon } from "@/icons";
import { fontFamily, fontSize, fontWeight, palette, spacing } from "@/theme";
import { formatCurrency } from "@/utils";

interface Movement {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: "send" | "receive" | "exchange" | "add";
}

const generateMockMovements = (start: number, count: number): Movement[] =>
  Array.from({ length: count }, (_, i) => {
    const idx = start + i;
    const types: Movement["type"][] = ["send", "receive", "exchange", "add"];
    const type = types[idx % types.length];
    const amounts = [4.99, 9.99, 1000, 12.5, 3500, 25, 150, 89.99, 500, 45];
    return {
      id: String(idx),
      title: [
        "Coffee Shop",
        "App Store",
        "Transferencia",
        "Uber Ride",
        "Depósito Nómina",
        "Spotify",
        "Amazon",
        "Netflix",
        "PayPal",
        "Stripe",
      ][idx % 10],
      description: [
        "Cafe Americano",
        "Suscripción mensual",
        "De: Juan Pérez",
        "Viaje centro",
        "Pago mensual",
        "Premium Family",
        "Compra en línea",
        "Plan estándar",
        "Pago recibido",
        "Cobro",
      ][idx % 10],
      amount: amounts[idx % amounts.length],
      date: [
        "Ene 3, 2026",
        "Ene 2, 2026",
        "Ene 1, 2026",
        "Dic 30, 2025",
        "Dic 28, 2025",
        "Dic 27, 2025",
        "Dic 25, 2025",
        "Dic 22, 2025",
        "Dic 20, 2025",
        "Dic 18, 2025",
      ][idx % 10],
      type,
    };
  });

const PAGE_SIZE = 15;

export default function MovementHistoryScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMovements(generateMockMovements(0, PAGE_SIZE));
      setPage(1);
      setLoading(false);
      setHasMore(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = page;
      const newMovements = generateMockMovements(
        nextPage * PAGE_SIZE,
        PAGE_SIZE,
      );
      setMovements((prev) => [...prev, ...newMovements]);
      const nextHasMore = nextPage < 4;
      setHasMore(nextHasMore);
      setPage((prev) => prev + 1);
      setLoadingMore(false);
    }, 1500);
  }, [loadingMore, hasMore, page]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setMovements(generateMockMovements(0, PAGE_SIZE));
      setPage(1);
      setHasMore(true);
      setRefreshing(false);
    }, 1500);
  }, []);

  const router = useRouter();

  const renderMovement = useCallback(
    ({ item }: { item: Movement }) => (
      <TouchableOpacity
        style={styles.movementRow}
        activeOpacity={0.7}
        onPress={() => router.push("/(full)/transaction-detail")}
      >
        <View style={styles.movementIconWrapper}>
          <View style={styles.movementIconBox}>
            <Icon
              name={
                item.type === "receive" || item.type === "add"
                  ? "reload"
                  : item.type === "send"
                    ? "send"
                    : "exchange"
              }
              color={palette.gray[300]}
            />
          </View>
        </View>
        <View style={styles.movementMiddle}>
          <RNText style={styles.movementTitle}>{item.title}</RNText>
          <RNText style={styles.movementDescription}>{item.description}</RNText>
        </View>
        <View style={styles.movementRight}>
          <RNText style={styles.movementDate} numberOfLines={1}>
            {item.date}
          </RNText>
          {item.type === "receive" || item.type === "add" ? (
            <RNText style={styles.movementAmount} numberOfLines={1}>
              {formatCurrency(item.amount, "USD")}
            </RNText>
          ) : (
            <RNText style={styles.movementAmountOut} numberOfLines={1}>
              -{formatCurrency(item.amount, "USD")}
            </RNText>
          )}
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <InfiniteScrollList
        data={movements}
        renderItem={renderMovement}
        loading={loading}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        hasMore={hasMore}
        loadingMore={loadingMore}
        onLoadMore={handleLoadMore}
        showDividers
        loadingSkeletonCount={8}
        emptyIcon="clock"
        style={styles.listPadding}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gray[950],
  },
  listPadding: {
    paddingHorizontal: spacing[4],
  },
  movementRow: {
    display: "flex",
    paddingVertical: spacing[4],
    alignItems: "center",
    gap: 12,
    alignSelf: "stretch",
    flexDirection: "row",
  },
  movementIconWrapper: {
    display: "flex",
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
  },
  movementIconBox: {
    display: "flex",
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: palette.gray[900],
  },
  movementMiddle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 4,
    flex: 1,
  },
  movementTitle: {
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.bodyLarge,
  },
  movementDescription: {
    color: palette.gray[300],
    fontFamily: fontFamily.display,
    fontSize: fontSize.captionLarge,
    fontWeight: fontWeight.captionLarge,
  },
  movementRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 4,
    flexShrink: 1,
  },
  movementDate: {
    color: palette.gray[300],
    fontFamily: fontFamily.display,
    fontSize: fontSize.captionLarge,
    fontWeight: fontWeight.captionLarge,
  },
  movementAmount: {
    color: palette.white,
    fontFamily: 'NeueHaasGroteskDisplayPro',
    fontSize: 16,
    fontWeight: '600',
  },
  movementAmountOut: {
    color: '#D76255',
    fontFamily: 'NeueHaasGroteskDisplayPro',
    fontSize: 16,
    fontWeight: '600',
  },
});
