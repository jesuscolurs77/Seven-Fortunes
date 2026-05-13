import { Tabs, usePathname, useRouter } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { ImageBackground, Text as RNText, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";
import { StatusBar } from "expo-status-bar";

import {
    GlassNavbar,
    LiquidGlassTabBar,
    TAB_ICON_SIZE,
    type LiquidGlassTabItem,
  } from "@/components";
 import { palette } from "@/theme";

function getIconColor(active: boolean, colorScheme: "light" | "dark") {
  if (colorScheme === "dark") {
    return active ? palette.white : "rgba(255,255,255,0.5)";
  }
  return active ? palette.gray[900] : "rgba(0,0,0,0.4)";
}

function HomeIcon({
  active,
  colorScheme,
}: {
  active: boolean;
  colorScheme: "light" | "dark";
}) {
  const color = useMemo(
    () => getIconColor(active, colorScheme),
    [active, colorScheme],
  );
  const xml = useMemo(
    () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
      <path d="M4.80036 13.1612H13.9212M1 6.32051V17.7216H17.7216V6.32051L9.3608 1L1 6.32051Z" stroke="${color}" stroke-width="2" stroke-linejoin="round"/>
    </svg>
  `,
    [color],
  );
  return <SvgXml xml={xml} />;
}

function AddMoneyIcon({
  active,
  colorScheme,
}: {
  active: boolean;
  colorScheme: "light" | "dark";
}) {
  const color = useMemo(
    () => getIconColor(active, colorScheme),
    [active, colorScheme],
  );
  const xml = useMemo(
    () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z" fill="${color}"/>
    </svg>
  `,
    [color],
  );
  return <SvgXml xml={xml} />;
}

function ProfileIcon({
  active,
  colorScheme,
}: {
  active: boolean;
  colorScheme: "light" | "dark";
}) {
  const color = useMemo(
    () => getIconColor(active, colorScheme),
    [active, colorScheme],
  );
  const xml = useMemo(
    () => `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10.0002 3.3335C10.8842 3.3335 11.7321 3.68469 12.3572 4.30981C12.9823 4.93493 13.3335 5.78277 13.3335 6.66683C13.3335 7.55088 12.9823 8.39873 12.3572 9.02385C11.7321 9.64897 10.8842 10.0002 10.0002 10.0002C9.11611 10.0002 8.26826 9.64897 7.64314 9.02385C7.01802 8.39873 6.66683 7.55088 6.66683 6.66683C6.66683 5.78277 7.01802 4.93493 7.64314 4.30981C8.26826 3.68469 9.11611 3.3335 10.0002 3.3335ZM10.0002 5.00016C9.55814 5.00016 9.13421 5.17576 8.82165 5.48832C8.50909 5.80088 8.3335 6.2248 8.3335 6.66683C8.3335 7.10886 8.50909 7.53278 8.82165 7.84534C9.13421 8.1579 9.55814 8.3335 10.0002 8.3335C10.4422 8.3335 10.8661 8.1579 11.1787 7.84534C11.4912 7.53278 11.6668 7.10886 11.6668 6.66683C11.6668 6.2248 11.4912 5.80088 11.1787 5.48832C10.8661 5.17576 10.4422 5.00016 10.0002 5.00016ZM10.0002 10.8335C12.2252 10.8335 16.6668 11.9418 16.6668 14.1668V16.6668H3.3335V14.1668C3.3335 11.9418 7.77516 10.8335 10.0002 10.8335ZM10.0002 12.4168C7.52516 12.4168 4.91683 13.6335 4.91683 14.1668V15.0835H15.0835V14.1668C15.0835 13.6335 12.4752 12.4168 10.0002 12.4168Z" fill="${color}"/>
    </svg>
  `,
    [color],
  );
  return <SvgXml xml={xml} />;
}

const TAB_KEYS = ["home", "add-money", "components", "profile"] as const;
const TAB_ROUTES: Record<string, string> = {
  home: "/",
  "add-money": "/add-money",
  components: "/components",
  profile: "/profile",
};

export default function TabLayout() {
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
        key: "components",
        label: "Components",
        icon: (
          <RNText
            style={[
              styles.tabIconText,
              {
                color: getIconColor(activeIndex === 2, colorScheme),
                fontSize: TAB_ICON_SIZE,
              },
            ]}
          >
            🧩
          </RNText>
        ),
      },
      {
        key: "profile",
        label: "Profile",
        icon: (
          <ProfileIcon active={activeIndex === 3} colorScheme={colorScheme} />
        ),
      },
    ];
  }, [activeIndex, colorScheme]);

  const handleTabChange = useCallback(
    (index: number, key: string) => {
      const route = TAB_ROUTES[key];
      if (route) {
        try {
          router.navigate(route as any);
        } catch (e) {
          console.log("Navigation error:", e);
        }
      }
    },
    [router],
  );

  const getTitle = useMemo(() => {
    const key = TAB_KEYS[activeIndex];
    switch (key) {
      case "home":
        return "Home";
      case "add-money":
        return "Add Money";
      case "components":
        return "Components";
      case "profile":
        return "Profile";
      default:
        return "Home";
    }
  }, [activeIndex]);



  const isHome = activeIndex === 0;
  const showBackground = isHome || activeIndex === 1 || activeIndex === 2;

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
           leftIcon={isHome ? "qr" : activeIndex === 3 ? "arrow-left" : undefined}
           rightIcon={isHome ? "clock" : undefined}
           onLeftPress={activeIndex === 3 ? () => router.back() : undefined}
           transparent={true}
         />

        <View style={styles.content}>
          <Tabs
            lazy={false}
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
              name="components"
              options={{
                title: "Components",
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

const HOME_BG = require('../../img/Background_home.png');

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
  tabIconText: {
    width: TAB_ICON_SIZE,
    height: TAB_ICON_SIZE,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
    fontWeight: "600",
  },

});
