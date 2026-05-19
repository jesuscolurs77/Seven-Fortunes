import { useRouter } from "expo-router";
import React from "react";
import {
  ImageBackground,
  Text as RNText,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Icon } from "@/icons";
import { fontFamily, palette, spacing } from "@/theme";

const CARD_BG_IMAGE = require("../../img/background_card_peru.png");

type PaymentMethod = {
  id: string;
  icon: string;
  iconSize: number;
  title: string;
  subtitle: string;
};

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "qr",
    icon: "qr",
    iconSize: 32,
    title: "Pagar con QR",
    subtitle: "Escanea el código en la terminal",
  },
  {
    id: "nfc",
    icon: "nfc",
    iconSize: 22,
    title: "Pagar con Toque",
    subtitle: "Paga por medio de NFC",
  },
];

export default function SelectPaymentMethodScreen() {
  const router = useRouter();

  const handleSelect = (method: PaymentMethod) => {
    if (method.id === "qr") {
      router.push("/(full)/pay-qr");
      return;
    }
    router.push({
      pathname: "/(full)/funds-processing",
      params: { type: method.id },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.balanceCardWrapper}>
        <ImageBackground
          source={CARD_BG_IMAGE}
          style={styles.balanceCard}
          imageStyle={styles.balanceCardBg}
          resizeMode="cover"
        >
          <View style={styles.brandRow}>
            <View style={styles.logoCircle}>
              <Icon name="logo" color="#0A0F1C" width={11.2} height={11.2} />
            </View>
            <RNText style={styles.brandLabel}>Mis fIPE</RNText>
          </View>
          <View style={styles.amountRow}>
            <RNText style={styles.amountValue}>1,128</RNText>
            <RNText style={styles.amountCurrency}>7fIPE</RNText>
          </View>
        </ImageBackground>
      </View>

      {PAYMENT_METHODS.map((method) => (
        <TouchableOpacity
          key={method.id}
          style={styles.optionRow}
          activeOpacity={0.7}
          onPress={() => handleSelect(method)}
        >
          <View style={styles.optionIconBox}>
            <Icon
              name={method.icon}
              color={palette.white}
              width={method.iconSize}
              height={method.iconSize}
            />
          </View>
          <View style={styles.optionTexts}>
            <RNText style={styles.optionTitle}>{method.title}</RNText>
            <RNText style={styles.optionSubtitle}>{method.subtitle}</RNText>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[6],
    gap: spacing[3],
  },
  balanceCardWrapper: {
    width: "100%",
  },
  balanceCard: {
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    overflow: "hidden",
    backgroundColor: palette.gray[800],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  balanceCardBg: {
    borderRadius: 12,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  logoCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: palette.white,
    alignItems: "center",
    justifyContent: "center",
  },
  brandLabel: {
    color: palette.gray[100],
    fontFamily: fontFamily.display,
    fontSize: 16,
    includeFontPadding: false,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  amountValue: {
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: 24,
    includeFontPadding: false,
  },
  amountCurrency: {
    color: palette.white,
    fontFamily: fontFamily.displayItalic,
    fontSize: 14,
    includeFontPadding: false,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  optionIconBox: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  optionTexts: {
    flex: 1,
    gap: 2,
  },
  optionTitle: {
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: 16,
    includeFontPadding: false,
  },
  optionSubtitle: {
    color: "rgba(255,255,255,0.5)",
    fontFamily: fontFamily.display,
    fontSize: 13,
    includeFontPadding: false,
  },
});
