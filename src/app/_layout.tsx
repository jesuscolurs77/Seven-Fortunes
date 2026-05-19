import '@/global.css';

import { useFonts } from 'expo-font';
import { Stack, SplashScreen } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';

import { AppProvider, AuthProvider } from '@/providers';
import { palette } from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    NeueHaasGroteskDisplayPro: require('@/assets/fonts/NeueHaasDisplayRoman.ttf'),
    NeueHaasGroteskDisplayPro_500: require('@/assets/fonts/NeueHaasDisplayMediu.ttf'),
    NeueHaasGroteskDisplayPro_600: require('@/assets/fonts/NeueHaasDisplayBold.ttf'),
    NeueHaasGroteskDisplayPro_Italic: require('@/assets/fonts/NeueHaasDisplayRomanItalic.ttf'),
    Geist: require('@/assets/fonts/Geist-VariableFont_wght.ttf'),
    GeistVariable: require('@/assets/fonts/Geist-VariableFont_wght.ttf'),
    Geist_500: require('@/assets/fonts/Geist-Medium.ttf'),
    Geist_600: require('@/assets/fonts/Geist-SemiBold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AppProvider>
      <AuthProvider>
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
      </AuthProvider>
    </AppProvider>
  );
}
