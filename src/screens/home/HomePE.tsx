import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  Text as RNText,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import {
  HorizontalScroll,
  IconButton,
  InfiniteScrollList,
  Text,
} from "@/components";
import type { HorizontalScrollItem } from "@/components/lists/HorizontalScroll";
import { Icon } from "@/icons";
import { fontFamily, fontSize, fontWeight, palette, spacing } from "@/theme";
import { formatCurrency } from "@/utils";

const INTERCORP_IMAGE = require("../../img/intercorp.png");
const CARD_BG_IMAGE = require("../../img/background_card_peru.png");

const COMMERCES: HorizontalScrollItem[] = [
  {
    id: "plazavea",
    label: "Plaza Vea",
    image: require("../../img/comercios/plazavea.png"),
  },
  {
    id: "vivanda",
    label: "Vivanda",
    image: require("../../img/comercios/vivanda.png"),
  },
  { id: "mass", label: "Mass", image: require("../../img/comercios/mass.png") },
  {
    id: "popeyes",
    label: "Popeyes",
    image: require("../../img/comercios/popeyes.png"),
  },
  {
    id: "china_wok",
    label: "China Wok",
    image: require("../../img/comercios/china_wok.png"),
  },
  {
    id: "cruz_verde",
    label: "Cruz Verde",
    image: require("../../img/comercios/cruz-verde.png"),
  },
  {
    id: "b_azul",
    label: "B Azul",
    image: require("../../img/comercios/b_azul.png"),
  },
];

const MAIN_PADDING_H = Platform.select({
  ios: spacing[4],
  android: spacing[2],
}) as number;

interface Transaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: string;
  type: "send" | "receive" | "exchange" | "add";
}

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Recarga Yape",
    description: "Tarjeta *2983",
    amount: 150,
    date: "Ene 3, 2026",
    type: "add",
  },
  {
    id: "2",
    title: "Plaza Vea",
    description: "Compra con tarjeta",
    amount: 89.5,
    date: "Ene 2, 2026",
    type: "send",
  },
  {
    id: "3",
    title: "Transferencia",
    description: "De: María Quispe",
    amount: 500,
    date: "Ene 1, 2026",
    type: "receive",
  },
  {
    id: "4",
    title: "Uber",
    description: "Viaje a Miraflores",
    amount: 22.4,
    date: "Dic 30, 2025",
    type: "send",
  },
];

export default function HomePE() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasMore] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setTransactions(MOCK_TRANSACTIONS);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const renderTransaction = useCallback(
    ({ item }: { item: Transaction }) => (
      <TouchableOpacity
        style={styles.transactionRow}
        onPress={() =>
          router.push({
            pathname: "/(full)/transaction-detail",
            params: { id: item.id },
          })
        }
        activeOpacity={0.7}
      >
        <View style={styles.transactionIconBox}>
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
        <View style={styles.transactionMiddle}>
          <RNText style={styles.transactionTitle}>{item.title}</RNText>
          <RNText style={styles.transactionDescription}>
            {item.description}
          </RNText>
        </View>
        <View style={styles.transactionRight}>
          <RNText style={styles.transactionDate} numberOfLines={1}>
            {item.date}
          </RNText>
          {item.type === "receive" || item.type === "add" ? (
            <RNText style={styles.transactionAmount} numberOfLines={1}>
              {formatCurrency(item.amount, "PEN")}
            </RNText>
          ) : (
            <RNText style={styles.transactionAmountOut} numberOfLines={1}>
              -{formatCurrency(item.amount, "PEN")}
            </RNText>
          )}
        </View>
      </TouchableOpacity>
    ),
    [router],
  );

  return (
    <View style={styles.parent}>
      <View style={styles.cardWrapper}>
        <ImageBackground
          source={CARD_BG_IMAGE}
          style={styles.card}
          imageStyle={styles.cardBgImage}
          resizeMode="cover"
        >
          <View style={styles.cardTopRow}>
            <View style={styles.cardBrand}>
              <View style={styles.circle}>
                <Icon
                  name="logo"
                  color={"#0A0F1C"}
                  width={11.2}
                  height={11.2}
                />
              </View>
              <RNText style={styles.cardBrandLabel}>fIPE</RNText>
            </View>
            <View style={styles.cardMetaRight}>
              <RNText style={styles.cardMetaText}>Tarjeta *2983</RNText>
              <View style={styles.intercorpBadge}>
                <Image
                  source={INTERCORP_IMAGE}
                  style={styles.intercorpImage}
                  resizeMode="contain"
                />
              </View>
            </View>
          </View>

          <View style={styles.balanceRow}>
            <RNText style={styles.balanceAmount}>
              {showBalance ? "$ 1,128" : "$ ****"}
            </RNText>
            <RNText style={styles.balanceCurrency}>7fIPE</RNText>
            <TouchableOpacity
              onPress={() => setShowBalance((v) => !v)}
              hitSlop={8}
            >
              <Icon
                name={showBalance ? "eye-closed" : "eye-open"}
                color={palette.white}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.cardActions}>
            <View style={styles.actionItem}>
              <IconButton
                variant="primary"
                icon={<Icon name="add" color={palette.gray[950]} />}
                onPress={() => router.push("/(full)/add-funds")}
              />
              <Text variant="bodyLarge" color="primary">
                Recarga
              </Text>
            </View>
            <View style={styles.actionItem}>
              <IconButton
                variant="secondary"
                icon={<Icon name="receive" color={palette.white} />}
              />
              <Text variant="bodyLarge" color="primary">
                Recibe
              </Text>
            </View>
            <View style={styles.actionItem}>
              <IconButton
                variant="secondary"
                icon={<Icon name="retira" color={palette.white} />}
              />
              <Text variant="bodyLarge" color="primary">
                Retira
              </Text>
            </View>
            <View style={styles.actionItem}>
              <IconButton
                variant="secondary"
                icon={<Icon name="send" color={palette.white} />}
                onPress={() => router.push("/(full)/select-payment-method")}
              />
              <Text variant="bodyLarge" color="primary">
                Pagar
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.commercesSection}>
        <View style={styles.commercesHeader}>
          <Text variant="subtitleLarge" color="primary">
            Convenios (99)
          </Text>
          <TouchableOpacity onPress={() => {}} activeOpacity={0.7} hitSlop={8}>
            <View style={styles.seeAllUnderline}>
              <RNText style={styles.seeAllLink}>Ver todos</RNText>
            </View>
          </TouchableOpacity>
        </View>
        <HorizontalScroll items={COMMERCES} style={styles.commercesScroll} />
      </View>

      <View style={styles.activitySection}>
        <Text variant="subtitleLarge" color="primary">
          Actividad
        </Text>
        <InfiniteScrollList
          data={transactions}
          renderItem={renderTransaction}
          loading={loading}
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
    flex: 1,
    width: "100%",
    paddingHorizontal: MAIN_PADDING_H,
    gap: spacing[2],
  },
  cardWrapper: {
    paddingHorizontal: 0,
    paddingTop: spacing[3],
  },
  card: {
    backgroundColor: palette.gray[800],
    borderRadius: 12,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 12,
    overflow: "hidden",
    gap: 4,
  },
  cardBgImage: {
    borderRadius: 12,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 0,
  },
  cardBrand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardBrandLabel: {
    color: palette.gray[100],
    fontFamily: fontFamily.display,
    fontSize: 16,
  },
  cardMetaRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  circle: {
    backgroundColor: "white",
    padding: 6.4,
    borderRadius: 20,
  },
  cardMetaText: {
    color: palette.gray[100],
    fontFamily: fontFamily.displayMedium,
    fontSize: 14,
    fontWeight: "500",
  },
  intercorpBadge: {
    height: 19,
    width: 64,
    borderRadius: 5.317,
    backgroundColor: "#002FA1",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  intercorpImage: {
    width: "100%",
    height: "100%",
  },
  balanceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 16,
    paddingBottom: 16,
  },
  balanceAmount: {
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: 42,
    lineHeight: 48,
    includeFontPadding: false,
  },
  balanceCurrency: {
    color: palette.white,
    fontFamily: fontFamily.displayItalic,
    fontSize: 20,
    includeFontPadding: false,
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingTop: 4,
  },
  actionItem: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing[3],
    gap: spacing[2],
  },
  commercesSection: {
    paddingTop: spacing[3],
    gap: spacing[3],
  },
  commercesHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  seeAllUnderline: {
    borderBottomWidth: 1,
    borderBottomColor: palette.blue[400],
    paddingBottom: 1,
  },
  seeAllLink: {
    color: palette.blue[400],
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 16,
    includeFontPadding: false,
  },
  commercesScroll: {
    marginHorizontal: -MAIN_PADDING_H,
  },
  activitySection: {
    flex: 1,
    paddingVertical: spacing[3],
    gap: spacing[3],
    alignItems: "flex-start",
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing[4],
    gap: 12,
    alignSelf: "stretch",
  },
  transactionIconBox: {
    width: 42,
    height: 42,
    borderRadius: 16,
    backgroundColor: palette.gray[900],
    alignItems: "center",
    justifyContent: "center",
  },
  transactionMiddle: {
    flex: 1,
    gap: 4,
    alignItems: "flex-start",
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
    fontFamily: "NeueHaasGroteskDisplayPro",
    fontSize: 16,
    fontWeight: "600",
  },
  transactionAmountOut: {
    color: "#D76255",
    fontFamily: "NeueHaasGroteskDisplayPro",
    fontSize: 16,
    fontWeight: "600",
  },
});
