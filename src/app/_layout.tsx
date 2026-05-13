import '@/global.css';

import { Stack } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { AppProvider } from '@/providers';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
          animation: Platform.OS === 'android' ? 'fade' : 'default',
        }}
      />
    </AppProvider>
  );
}
