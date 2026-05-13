import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Text as RNText } from 'react-native';
import { useRouter } from 'expo-router';

import { spacing, palette } from '@/theme';
import { GlassCard, GlassButton, Text, Button, Input } from '@/components';

export default function AddMoneyScreen() {
  const [amount, setAmount] = useState('');
  const router = useRouter();

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.section}>
        <GlassCard>
          <GlassCard.Header>
            <Text variant="h4">Add Money</Text>
          </GlassCard.Header>
          <GlassCard.Content>
            <Text variant="bodySmall" color="muted" className="mb-2">Enter amount</Text>
            <View style={styles.amountInput}>
              <RNText style={styles.currencySymbol}>$</RNText>
              <Input
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                style={styles.amountInputField}
              />
            </View>
          </GlassCard.Content>
          <GlassCard.Footer>
            <View style={styles.quickAmounts}>
              {['50', '100', '250', '500'].map((val) => (
                <GlassButton
                  key={val}
                  icon={<RNText style={styles.buttonIcon}>+</RNText>}
                  label={`$${val}`}
                  onPress={() => setAmount(val)}
                />
              ))}
            </View>
          </GlassCard.Footer>
        </GlassCard>
      </View>

      <View style={styles.section}>
        <GlassCard>
          <GlassCard.Header>
            <Text variant="h4">Payment Method</Text>
          </GlassCard.Header>
          <GlassCard.Content>
            {[1, 2].map((i) => (
              <View key={i} style={[styles.paymentMethod, i < 2 && styles.paymentBorder]}>
                <View style={styles.cardIcon}>
                  <RNText style={styles.cardIconText}>💳</RNText>
                </View>
                <View style={styles.cardInfo}>
                  <Text variant="body">{i === 1 ? 'Visa •••• 4242' : 'Mastercard •••• 8888'}</Text>
                  <Text variant="caption" color="muted">Expires {i === 1 ? '12/26' : '08/27'}</Text>
                </View>
                <View style={[styles.radioDot, i === 1 && styles.radioDotActive]}>
                  {i === 1 && <View style={styles.radioDotInner} />}
                </View>
              </View>
            ))}
          </GlassCard.Content>
        </GlassCard>
      </View>

      <View style={styles.section}>
        <Button
          variant="primary"
          onPress={() => router.push('/(tabs)')}
        >
          Add ${amount || '0.00'}
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing[4],
  },
  section: {
    marginBottom: spacing[6],
  },
  amountInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 8,
    padding: spacing[4],
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: '600',
    color: palette.white,
    marginRight: spacing[2],
  },
  amountInputField: {
    flex: 1,
    backgroundColor: 'transparent',
    fontSize: 32,
    fontWeight: '600',
    color: palette.white,
  },
  quickAmounts: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
  buttonIcon: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.white,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
  },
  paymentBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconText: {
    fontSize: 20,
  },
  cardInfo: {
    flex: 1,
    marginLeft: spacing[3],
  },
  radioDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDotActive: {
    borderColor: palette.blue[500],
  },
  radioDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: palette.blue[500],
  },
});
