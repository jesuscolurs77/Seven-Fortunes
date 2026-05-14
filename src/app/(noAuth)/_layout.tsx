import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { useAuth } from '@/providers/AuthProvider';
import { palette } from '@/theme';

export default function NoAuthLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (isAuthenticated) return <Redirect href="/(tabs)" />;

  return (
    <View style={{ flex: 1, backgroundColor: palette.gray[950] }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: palette.gray[950] },
          animation: 'slide_from_right',
          animationTypeForReplace: 'push',
        }}
      />
    </View>
  );
}
