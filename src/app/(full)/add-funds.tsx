import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { BackHandler, ScrollView, StyleSheet, View } from "react-native";

import { Button, Select, Summary, Text } from "@/components";
import { InputAmount } from "@/components/inputs/InputAmount";
import { BankPreviewTrigger } from "@/components/selects/BankSelect";
import { CARD_OPTIONS } from "@/constants/banks";
import { palette, spacing } from "@/theme";

const FEE_RATE = 0.025;
const MIN_AMOUNT = 10;
const MAX_AMOUNT = 10000;

export default function AddFundsScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [selectedCard, setSelectedCard] = useState<string>("");

  const numericAmount = useMemo(() => {
    return parseInt(amount, 10) || 0;
  }, [amount]);

  const amountError = useMemo(() => {
    if (numericAmount <= 0) return "";
    if (numericAmount < MIN_AMOUNT)
      return `Minimum amount is $${MIN_AMOUNT}.00`;
    if (numericAmount > MAX_AMOUNT)
      return `Maximum amount is $${MAX_AMOUNT.toLocaleString()}.00`;
    return "";
  }, [numericAmount]);

  const hasAmountError = amountError.length > 0;

  const fee = useMemo(() => {
    return numericAmount * FEE_RATE;
  }, [numericAmount]);

  const totalCharged = useMemo(() => {
    return numericAmount + fee;
  }, [numericAmount, fee]);

  const isButtonDisabled =
    numericAmount <= 0 || hasAmountError || !selectedCard;

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => true,
    );
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <InputAmount
          label="Amount (USD)"
          onChangeText={setAmount}
          hasError={hasAmountError}
          errorMessage={amountError}
        />

        <View style={styles.section}>
          <Text
            variant="bodyLarge"
            color="secondary"
            style={styles.sectionLabel}
          >
            Source
          </Text>
          <Select
            placeholder="Select a card..."
            options={CARD_OPTIONS}
            value={selectedCard}
            onChange={(value) => setSelectedCard(value)}
            modalTitle="Select card"
            showSearch={false}
            renderTrigger={({ selectedOption, onPress, placeholder: ph }) => (
              <BankPreviewTrigger
                selectedOption={selectedOption}
                placeholder={ph}
                onPress={onPress}
              />
            )}
          />
        </View>

        <Summary
          title="Transaction Details"
          items={[
            { label: "Fee", value: `$${fee.toFixed(2)}` },
            { label: "Processing time", value: "Instant" },
            {
              label: "Total Charged",
              value: `$${totalCharged.toFixed(2)} USD`,
            },
          ]}
        />
      </ScrollView>

      <View style={styles.bottomSection}>
        <Button
          variant="primary"
          size="lg"
          disabled={isButtonDisabled}
          onPress={() => router.push("/(full)/funds-processing")}
        >
          Add ${numericAmount.toFixed(2)} USD
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
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing[4],
    gap: spacing[6],
  },
  bottomSection: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    alignSelf: "stretch",
    paddingHorizontal: 24,
    paddingBottom: 42,
  },
  section: {
    gap: spacing[3],
  },
  sectionLabel: {
    marginBottom: spacing[1],
  },
});
