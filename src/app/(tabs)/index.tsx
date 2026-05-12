import React from 'react';
import { View, ScrollView, StyleSheet, Text as RNText } from 'react-native';
import { useRouter } from 'expo-router';

import { spacing, palette } from '@/theme';
import { GlassCard, GlassButton, Text } from '@/ui';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.section}>
        <Text variant="h4" className="mb-4">Welcome Back</Text>
        
        <GlassCard style={styles.balanceCard}>
          <GlassCard.Header>
            <Text variant="bodySmall" color="muted">Total Balance</Text>
          </GlassCard.Header>
          <GlassCard.Content>
            <RNText style={styles.balanceAmount}>$24,580.50</RNText>
          </GlassCard.Content>
          <GlassCard.Footer>
            <View style={styles.buttonRow}>
              <GlassButton
                icon={
                  <RNText style={styles.buttonIcon}>↓</RNText>
                }
                label="Receive"
                onPress={() => router.push('/(tabs)/add-money')}
              />
              <GlassButton
                icon={
                  <RNText style={styles.buttonIcon}>↑</RNText>
                }
                label="Send"
                onPress={() => console.log('Send pressed')}
              />
            </View>
          </GlassCard.Footer>
        </GlassCard>
      </View>

      <View style={styles.section}>
        <Text variant="h4" className="mb-4">Recent Transactions</Text>
        
        <GlassCard>
          <GlassCard.Content>
            {[1, 2, 3, 4].map((i) => (
              <View key={i} style={[styles.transactionRow, i < 4 && styles.transactionBorder]}>
                <View style={styles.transactionIcon}>
                  <RNText style={styles.transactionIconText}>
                    {i % 2 === 0 ? '☕' : '📱'}
                  </RNText>
                </View>
                <View style={styles.transactionInfo}>
                  <Text variant="body">{i % 2 === 0 ? 'Coffee Shop' : 'App Store'}</Text>
                  <Text variant="caption" color="muted">Today, 2:{30 + i} PM</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text variant="body" style={{ color: i % 2 === 0 ? '#FF453A' : '#34C759' }}>
                    {i % 2 === 0 ? '-' : '+'}${(4.99 * i).toFixed(2)}
                  </Text>
                </View>
              </View>
            ))}
          </GlassCard.Content>
        </GlassCard>
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
  balanceCard: {
    marginBottom: spacing[4],
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: palette.white,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing[3],
    flexWrap: 'wrap',
  },
  buttonIcon: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.white,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
  },
  transactionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionIconText: {
    fontSize: 20,
  },
  transactionInfo: {
    flex: 1,
    marginLeft: spacing[3],
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
});
