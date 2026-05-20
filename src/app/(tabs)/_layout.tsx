import { Redirect, Tabs, usePathname, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useMemo } from "react";
import {
  ImageBackground,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  GlassNavbar,
  LiquidGlassTabBar,
  TAB_ICON_SIZE,
  type LiquidGlassTabItem,
} from "@/components";
import { useAuth } from "@/providers/AuthProvider";
import { palette } from "@/theme";
import { TAB_KEYS, TAB_ROUTES, TAB_TITLES } from "@/tab-constants/constants";
import { AddMoneyIcon, HomeIcon, ProfileIcon } from "@/icons/tab-icons";

const HOME_BG = require("../../img/Background_home.png");

export default function TabLayout() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const systemColorScheme = useColorScheme();

  const colorScheme: "light" | "dark" =
    !systemColorScheme || systemColorScheme === "unspecified"
      ? "dark"
      : systemColorScheme;

  const getActiveTab = useCallback((): number => {
    const cleanPath = pathname.replace(/^\//, "").replace(/\/$/, "");

    for (let i = 0; i < TAB_KEYS.length; i++) {
      const key = TAB_KEYS[i];
      if (key === "home") {
        if (
          cleanPath === "" ||
          cleanPath === "(tabs)" ||
          cleanPath === "index"
        ) {
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
        key: "home",
        label: "Home",
        icon: <HomeIcon active={activeIndex === 0} colorScheme={colorScheme} />,
      },
      {
        key: "add-money",
        label: "Add Money",
        icon: (
          <AddMoneyIcon active={activeIndex === 1} colorScheme={colorScheme} />
        ),
      },
      {
        key: "profile",
        label: "Profile",
        icon: (
          <ProfileIcon active={activeIndex === 2} colorScheme={colorScheme} />
        ),
      },
    ];
  }, [activeIndex, colorScheme]);

  const handleTabChange = useCallback(
    (_index: number, key: string) => {
      const route = TAB_ROUTES[key];
      if (!route) return;

      try {
        router.navigate(route as any);
      } catch (e) {
        console.log("Navigation error:", e);
      }
    },
    [router],
  );

  if (isLoading) return null;
  if (!isAuthenticated) return <Redirect href="/(noAuth)/login" />;

  const getTitle = TAB_TITLES[TAB_KEYS[activeIndex]] ?? "Home";

  const isHome = activeIndex === 0;
  const isPeruUser = user?.country === "PE";
  const showBackground = (isHome || activeIndex === 1) && !isPeruUser;

  return (
    <View style={styles.root}>
      {showBackground && (
        <ImageBackground
          source={HOME_BG}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      )}
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <SafeAreaView
        style={showBackground ? styles.safeAreaTransparent : styles.safeArea}
        edges={["top", "left", "right", "bottom"]}
      >
        <GlassNavbar
          title={!isHome ? getTitle : undefined}
          leftIcon={
            isHome ? "qr" : activeIndex === 2 ? "arrow-left" : undefined
          }
          leftLabel={isHome && isPeruUser ? "Pagar" : undefined}
          rightIcon={isHome ? "clock" : undefined}
          onLeftPress={
            activeIndex === 2
              ? () => router.back()
              : isHome && isPeruUser
                ? () => router.push("/(full)/select-payment-method")
                : isHome
                  ? () => router.push("/(full)/work-in-progress")
                  : undefined
          }
          onRightPress={isHome ? () => router.push("/(full)/movement-history") : undefined}
          transparent={true}
        />

        <View style={styles.content}>
          <Tabs
            screenOptions={{
              headerShown: false,
              sceneStyle: {
                backgroundColor: "transparent",
              },
              tabBarStyle: {
                display: "none",
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarShowLabel: false,
                tabBarIcon: () => null,
              }}
            />
            <Tabs.Screen
              name="add-money"
              options={{
                title: "Add Money",
                tabBarShowLabel: false,
                tabBarIcon: () => null,
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: "Profile",
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
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: palette.gray[950],
  },
  safeArea: {
    flex: 1,
    backgroundColor: palette.gray[950],
  },
  safeAreaTransparent: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    flex: 1,
  },
  tabIconContainer: {
    width: TAB_ICON_SIZE,
    height: TAB_ICON_SIZE,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
