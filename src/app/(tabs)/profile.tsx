import React from 'react';
import { View, ScrollView, StyleSheet, Text as RNText } from 'react-native';
import { useRouter } from 'expo-router';

import { spacing, palette } from '@/theme';
import { GlassCard, GlassButton, Text, IconButton } from '@/ui';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <RNText style={styles.avatarText}>JS</RNText>
        </View>
        <Text variant="h4" style={{ marginTop: spacing[3] }}>John Smith</Text>
        <Text variant="bodySmall" color="muted" style={{ marginTop: spacing[1] }}>
          john.smith@email.com
        </Text>
      </View>

      <View style={styles.section}>
        <GlassCard>
          <GlassCard.Content>
            {[
              { icon: '⚙️', label: 'Settings', desc: 'App preferences' },
              { icon: '🔒', label: 'Security', desc: 'Password, 2FA' },
              { icon: '💳', label: 'Payment Methods', desc: 'Manage cards' },
              { icon: '📊', label: 'Transaction History', desc: 'View all transactions' },
              { icon: '❓', label: 'Help & Support', desc: 'Get assistance' },
            ].map((item, index) => (
              <View 
                key={index} 
                style={[
                  styles.menuItem, 
                  index < 4 && styles.menuItemBorder
                ]}
              >
                <View style={styles.menuIcon}>
                  <RNText style={styles.menuIconText}>{item.icon}</RNText>
                </View>
                <View style={styles.menuInfo}>
                  <Text variant="body">{item.label}</Text>
                  <Text variant="caption" color="muted">{item.desc}</Text>
                </View>
                <View style={styles.menuArrow}>
                  <RNText style={styles.menuArrowText}>›</RNText>
                </View>
              </View>
            ))}
          </GlassCard.Content>
        </GlassCard>
      </View>

      <View style={styles.section}>
        <GlassCard>
          <GlassCard.Content>
            <View style={styles.statsRow}>
              <View style={styles.stat}>
                <RNText style={styles.statValue}>156</RNText>
                <Text variant="caption" color="muted">Transactions</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <RNText style={styles.statValue}>12</RNText>
                <Text variant="caption" color="muted">Months Active</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <RNText style={styles.statValue}>⭐ 4.9</RNText>
                <Text variant="caption" color="muted">Rating</Text>
              </View>
            </View>
          </GlassCard.Content>
        </GlassCard>
      </View>

      <View style={styles.section}>
        <GlassButton
          icon={<RNText style={styles.buttonIcon}>🚪</RNText>}
          label="Sign Out"
          onPress={() => router.push('/(tabs)')}
        />
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing[6],
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: palette.blue[500],
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '600',
    color: palette.white,
  },
  section: {
    marginBottom: spacing[6],
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[3],
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuIconText: {
    fontSize: 20,
  },
  menuInfo: {
    flex: 1,
    marginLeft: spacing[3],
  },
  menuArrow: {
    paddingHorizontal: spacing[2],
  },
  menuArrowText: {
    fontSize: 24,
    color: 'rgba(255,255,255,0.4)',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.white,
    marginBottom: spacing[1],
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  buttonIcon: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.white,
  },
});
