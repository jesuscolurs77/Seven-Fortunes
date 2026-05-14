import { useRouter } from "expo-router";
import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import {
  Button,
  Select,
  Text,
  type SelectOption,
} from '@/components';
import { InputAmount } from '@/components/inputs/InputAmount';
import { palette, semantic, spacing } from '@/theme';

const FEE_RATE = 0.025;

const CARD_OPTIONS: SelectOption[] = [
  {
    value: 'acc_001',
    label: 'Visa •••• 4147',
    subtitle: 'Maria Lafourcade',
    image: require('../../img/bank/JP_morgan.png'),
  },
  {
    value: 'acc_002',
    label: 'Visa •••• 9943',
    subtitle: 'Maria Lafourcade',
    image: require('../../img/bank/JP_morgan.png'),
  },
];

export default function AddFundsScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [selectedCard, setSelectedCard] = useState<string>('');

  const numericAmount = useMemo(() => {
    return parseInt(amount, 10) || 0;
  }, [amount]);

  const fee = useMemo(() => {
    return numericAmount * FEE_RATE;
  }, [numericAmount]);

  const totalCharged = useMemo(() => {
    return numericAmount + fee;
  }, [numericAmount, fee]);

  const isButtonDisabled = numericAmount <= 0 || !selectedCard;

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <InputAmount
          label="Amount"
          onChangeText={setAmount}
        />

        <View style={styles.section}>
          <Text variant="bodyLarge" color="secondary" style={styles.sectionLabel}>
            Source
          </Text>
          <Select
            placeholder="Select a card..."
            options={CARD_OPTIONS}
            value={selectedCard}
            onChange={(value) => setSelectedCard(value)}
            modalTitle="Select card"
            showSearch={false}
          />
        </View>

        <View style={styles.section}>
          <Text variant="bodyLarge" color="secondary" style={styles.sectionLabel}>
            Transaction Details
          </Text>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text variant="body" color="secondary">
                Fee
              </Text>
              <Text variant="body">${fee.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text variant="body" color="secondary">
                Processing time
              </Text>
              <Text variant="body">Instant</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryRow}>
              <Text variant="body" color="secondary">
                Total Charged
              </Text>
              <Text variant="body">
                ${totalCharged.toFixed(2)} USD
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <Button
          variant="primary"
          disabled={isButtonDisabled}
          onPress={() => router.push("/(full)/funds-processing")}
        >
          Add money
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
    padding: spacing[4],
    paddingBottom: spacing[8],
  },
  section: {
    gap: spacing[3],
  },
  sectionLabel: {
    marginBottom: spacing[1],
  },
  summaryContainer: {
    backgroundColor: semantic.surface.primary,
    borderRadius: 8,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
  },
  summaryRow: {
    display: 'flex',
    paddingVertical: 8,
    paddingHorizontal: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: semantic.border.subtle,
  },
});
