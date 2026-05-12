import React, { useMemo, useCallback } from 'react';
import { Tabs } from 'expo-router';
import { View, Text as RNText, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';

import {
  LiquidGlassTabBar,
  type LiquidGlassTabItem,
  GlassNavbar,
  GlassBackground,
} from '@/ui';
import {
  palette,
} from '@/theme';

function TabIcon({ name, active, colorScheme }: { name: string; active: boolean; colorScheme: 'light' | 'dark' }) {
  const color = useMemo(() => {
    if (colorScheme === 'dark') {
      return active ? palette.white : 'rgba(255,255,255,0.5)';
    }
    return active ? palette.gray[900] : 'rgba(0,0,0,0.4)';
  }, [active, colorScheme]);

  return (
    <RNText style={[
      styles.tabIconText,
      { color }
    ]}>
      {name}
    </RNText>
  );
}

const TAB_KEYS = ['home', 'add-money', 'components', 'profile'] as const;
const TAB_ROUTES: Record<string, string> = {
  'home': '/',
  'add-money': '/add-money',
  'components': '/components',
  'profile': '/profile',
};

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const systemColorScheme = useColorScheme();
  const colorScheme: 'light' | 'dark' = !systemColorScheme || systemColorScheme === 'unspecified' ? 'dark' : systemColorScheme;

  const getActiveTab = useCallback((): number => {
    const cleanPath = pathname.replace(/^\//, '').replace(/\/$/, '');
    
    for (let i = 0; i < TAB_KEYS.length; i++) {
      const key = TAB_KEYS[i];
      if (key === 'home') {
        if (cleanPath === '' || cleanPath === '(tabs)' || cleanPath === 'index') {
          return i;
        }
      } else {
        if (cleanPath === key || pathname === `/${key}`) {
          return i;
        }
      }
    }
    return 0;
  }, [pathname]);

  const activeIndex = getActiveTab();

  const tabItems: LiquidGlassTabItem[] = useMemo(() => {
    return [
      {
        key: 'home',
        label: 'Home',
        icon: <TabIcon name="🏠" active={activeIndex === 0} colorScheme={colorScheme} />,
      },
      {
        key: 'add-money',
        label: 'Add Money',
        icon: <TabIcon name="💰" active={activeIndex === 1} colorScheme={colorScheme} />,
      },
      {
        key: 'components',
        label: 'Components',
        icon: <TabIcon name="🧩" active={activeIndex === 2} colorScheme={colorScheme} />,
      },
      {
        key: 'profile',
        label: 'Profile',
        icon: <TabIcon name="👤" active={activeIndex === 3} colorScheme={colorScheme} />,
      },
    ];
  }, [activeIndex, colorScheme]);

  const handleTabChange = useCallback((index: number, key: string) => {
    const route = TAB_ROUTES[key];
    if (route) {
      try {
        if (route === '/') {
          router.push('/(tabs)' as any);
        } else {
          router.push(route as any);
        }
      } catch (e) {
        console.log('Navigation error:', e);
      }
    }
  }, [router]);

  const getTitle = useMemo(() => {
    const key = TAB_KEYS[activeIndex];
    switch (key) {
      case 'home': return 'Home';
      case 'add-money': return 'Add Money';
      case 'components': return 'Components';
      case 'profile': return 'Profile';
      default: return 'Home';
    }
  }, [activeIndex]);

  const getNavIconColor = () => {
    return colorScheme === 'dark' ? palette.white : palette.gray[900];
  };

  return (
    <GlassBackground>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
        <GlassNavbar 
          title={getTitle}
          leftContent={
            <RNText style={[styles.navIcon, { color: getNavIconColor() }]}>☰</RNText>
          }
          rightContent={
            <RNText style={[styles.navIcon, { color: getNavIconColor() }]}>🔔</RNText>
          }
        />

         <View style={styles.content}>
          <Tabs
            screenOptions={{
              headerShown: false,
              sceneContainerStyle: {
                backgroundColor: 'transparent',
              },
              tabBarStyle: {
                display: 'none',
              },
            }}
          >
            <Tabs.Screen 
              name="index" 
              options={{ 
                title: 'Home',
                tabBarShowLabel: false,
                tabBarIcon: () => null,
              }} 
            />
            <Tabs.Screen 
              name="add-money" 
              options={{ 
                title: 'Add Money',
                tabBarShowLabel: false,
                tabBarIcon: () => null,
              }} 
            />
            <Tabs.Screen 
              name="components" 
              options={{ 
                title: 'Components',
                tabBarShowLabel: false,
                tabBarIcon: () => null,
              }} 
            />
            <Tabs.Screen 
              name="profile" 
              options={{ 
                title: 'Profile',
                tabBarShowLabel: false,
                tabBarIcon: () => null,
              }} 
            />
          </Tabs>
        </View>

        <LiquidGlassTabBar
          items={tabItems}
          activeIndex={activeIndex}
          onTabChange={handleTabChange}
          floating={true}
          capsuleHeight={40}
          colorScheme={colorScheme}
        />
      </SafeAreaView>
    </GlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: palette.gray[950],
  },
  content: {
    flex: 1,
  },
  tabIconText: {
    fontSize: 22,
  },
  navIcon: {
    fontSize: 18,
  },
});
