import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "@/components";
import { InputAmount } from "@/components/inputs/InputAmount";
import { layout, palette, spacing } from "@/theme";

const MOCK_BALANCE = 500;
const MIN_AMOUNT = 1;

export default function SendScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ name?: string }>();
  const name = params.name ?? "";
  const [amount, setAmount] = useState("");

  const numericAmount = useMemo(() => parseInt(amount, 10) || 0, [amount]);

  const amountError = useMemo(() => {
    if (numericAmount <= 0) return "";
    if (numericAmount < MIN_AMOUNT) {
      return `Minimum amount is $${MIN_AMOUNT.toFixed(2)}`;
    }
    if (numericAmount > MOCK_BALANCE) {
      return `Amount exceeds your balance of $${MOCK_BALANCE.toFixed(2)} USDC`;
    }
    return "";
  }, [numericAmount]);

  const hasAmountError = amountError.length > 0;
  const isDisabled =
    numericAmount <= 0 || hasAmountError || numericAmount > MOCK_BALANCE;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={insets.top + layout.headerHeight}
    >
      <Pressable
        style={styles.content}
        onPress={Keyboard.dismiss}
        accessible={false}
      >
        <InputAmount
          label="Amount (USD)"
          hint={`Total: ${MOCK_BALANCE.toFixed(2)} USDC`}
          autoFocus
          onChangeText={setAmount}
          hasError={hasAmountError}
          errorMessage={amountError}
        />
      </Pressable>

      <View style={styles.bottomSection}>
        <Button
          variant="primary"
          size="lg"
          disabled={isDisabled}
          onPress={() =>
            router.push({
              pathname: "/(full)/send-summary",
              params: { name, amount: String(numericAmount) },
            })
          }
        >
          Continue
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.gray[950],
  },
  content: {
    flex: 1,
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
});
