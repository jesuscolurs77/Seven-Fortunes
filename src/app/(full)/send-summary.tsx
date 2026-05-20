import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Text as RNText,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { Button, Summary } from "@/components";
import { Select, type SelectOption } from "@/components/selects";
import { Icon } from "@/icons";
import { fontFamily, fontWeight, palette, spacing } from "@/theme";

const FEE_RATE = 0.02;
const EXCHANGE_RATE = 3.76;
const TARGET_CURRENCY = "fIPE";

const FIRST_NAMES = [
  "Ana",
  "Bruno",
  "Carla",
  "Diego",
  "Elena",
  "Fernando",
  "Gabriela",
  "Héctor",
  "Isabel",
  "Jorge",
];
const LAST_NAMES = [
  "García",
  "Méndez",
  "Rojas",
  "Salas",
  "Pérez",
  "Ríos",
  "Torres",
  "Vargas",
  "Núñez",
  "Castillo",
];

interface Contact {
  id: string;
  name: string;
}

const MOCK_CONTACTS: Contact[] = Array.from({ length: 30 }, (_, i) => ({
  id: String(i),
  name: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${
    LAST_NAMES[Math.floor(i / FIRST_NAMES.length) % LAST_NAMES.length]
  }`,
}));

function ContactAvatar({ name }: { name: string }) {
  const initial = (name || "?").charAt(0).toUpperCase();
  return (
    <View style={styles.avatar}>
      <RNText style={styles.avatarText}>{initial}</RNText>
    </View>
  );
}

function SectionHeader({ icon, label }: { icon: string; label: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.headerIcon}>
        <Icon name={icon} width={20} height={20} color={palette.white} />
      </View>
      <RNText style={styles.headerLabel}>{label}</RNText>
    </View>
  );
}

export default function SendSummaryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ name?: string; amount?: string }>();
  const initialName = params.name ?? "";
  const numericAmount = parseInt(params.amount ?? "0", 10) || 0;

  const [contactName, setContactName] = useState(initialName);

  const fee = useMemo(() => numericAmount * FEE_RATE, [numericAmount]);
  const total = numericAmount + fee;
  const targetAmount = numericAmount * EXCHANGE_RATE;
  const equivalentPen = numericAmount * EXCHANGE_RATE;

  const contactOptions: SelectOption[] = useMemo(
    () =>
      MOCK_CONTACTS.map((c) => ({
        value: c.name,
        label: c.name,
        icon: <ContactAvatar name={c.name} />,
      })),
    [],
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.amountSection}>
          <SectionHeader icon="send" label="Amount to send" />
          <View style={styles.amountRow}>
            <RNText style={styles.amountText}>
              ${" "}
              {numericAmount.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </RNText>
            <RNText style={styles.amountCurrency}>USDC</RNText>
          </View>
        </View>

        <View style={styles.toSection}>
          <SectionHeader icon="user" label="To" />
          <Select
            placeholder="Select a contact"
            options={contactOptions}
            value={contactName}
            onChange={(v) => setContactName(v)}
            modalTitle="Change contact"
            showSearch
            searchPlaceholder="Search contacts..."
            renderTrigger={({ onPress }) => (
              <TouchableOpacity
                style={styles.toCard}
                activeOpacity={0.7}
                onPress={onPress}
              >
                <ContactAvatar name={contactName} />
                <RNText style={styles.toName} numberOfLines={1}>
                  {contactName || "Recipient"}
                </RNText>
                <View style={styles.changeButton}>
                  <RNText style={styles.changeText}>Change</RNText>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <Summary
          items={[
            { label: "Sending", value: `$${numericAmount} USD` },
            { label: "Fee", value: `$${fee.toFixed(0)} USD` },
            { label: "Total Charged", value: `$${total.toFixed(0)} USD` },
          ]}
        />

        <Summary
          title=""
          items={[
            {
              label: "Exchange Rate",
              value: `1 USD = ${EXCHANGE_RATE} ${TARGET_CURRENCY}`,
            },
            {
              label: `${contactName.split(" ")[0] || "Recipient"} Gets`,
              value: `${targetAmount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} ${TARGET_CURRENCY}`,
            },
            {
              label: "Equivalent",
              value: `= S/ ${equivalentPen.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`,
            },
          ]}
        />
      </ScrollView>

      <View style={styles.bottomSection}>
        <Button
          variant="primary"
          size="lg"
          onPress={() =>
            router.replace({
              pathname: "/(full)/funds-processing",
              params: {
                type: "transfer",
                name: contactName,
                amount: String(numericAmount),
              },
            })
          }
        >
          Confirm & Send
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gray[950],
  },
  scroll: {
    padding: spacing[4],
    paddingTop: spacing[8],
    gap: spacing[4],
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[1],
  },
  headerIcon: {
    width: 28,
    height: 28,
    borderRadius: 16,
    backgroundColor: palette.gray[900],
    alignItems: "center",
    justifyContent: "center",
  },
  headerLabel: {
    color: palette.gray[200],
    fontFamily: fontFamily.display,
    fontSize: 16,
    fontWeight: fontWeight.body,
    includeFontPadding: false,
  },
  amountSection: {
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
    fontFamily: fontFamily.display,
    fontSize: 42,
    fontWeight: fontWeight.h1,
    includeFontPadding: false,
  },
  amountCurrency: {
    color: "rgba(255, 255, 255, 0.50)",
    fontFamily: fontFamily.display,
    fontSize: 16,
    fontWeight: fontWeight.body,
    includeFontPadding: false,
  },
  toSection: {
    gap: spacing[2],
    alignSelf: "stretch",
  },
  toCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    padding: spacing[4],
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    alignSelf: "stretch",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: palette.blue[100],
    backgroundColor: palette.blue[200],
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: palette.blue[700],
    fontFamily: fontFamily.display,
    fontSize: 16,
    fontWeight: fontWeight.body,
    includeFontPadding: false,
  },
  toName: {
    flex: 1,
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: 16,
    fontWeight: fontWeight.body,
    includeFontPadding: false,
  },
  changeButton: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    alignItems: "center",
    justifyContent: "center",
  },
  changeText: {
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: 14,
    fontWeight: fontWeight.body,
    includeFontPadding: false,
  },
  bottomSection: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
    paddingHorizontal: 24,
    paddingBottom: 42,
  },
});
