import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  LayoutChangeEvent,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import { spacing } from "@/theme";
import { FloatingGlassCapsule } from "@/ui/FloatingGlassCapsule";
import {
  GlassTabItem,
  TAB_ITEM_HEIGHT,
  TAB_ITEM_MIN_WIDTH,
} from "@/ui/GlassTabItem";
import {
  useLiquidTabAnimation,
  type LiquidTabConfig,
} from "@/ui/hooks/useLiquidTabAnimation";

export interface LiquidGlassTabItem {
  key: string;
  label?: string;
  icon: React.ReactNode;
}

export interface LiquidGlassTabBarProps {
  items: LiquidGlassTabItem[];
  activeIndex?: number;
  onTabChange?: (index: number, key: string) => void;
  colorScheme?: "light" | "dark" | "auto" | null;
  capsuleHeight?: number;
  floating?: boolean;
}

const CAPSULE_HEIGHT = 40;
const TAB_BAR_HEIGHT = 64;
const TAB_BAR_PADDING_HORIZONTAL = spacing[4];

export function LiquidGlassTabBar({
  items,
  activeIndex: propActiveIndex = 0,
  onTabChange,
  colorScheme: propColorScheme,
  capsuleHeight = CAPSULE_HEIGHT,
  floating = true,
}: LiquidGlassTabBarProps) {
  const systemColorScheme = useColorScheme();

   const [containerWidth, setContainerWidth] = useState(0);
   const [tabLayouts, setTabLayouts] = useState<
     { x: number; width: number; height: number }[]
   >(
     items.map(() => ({
       x: 0,
       width: TAB_ITEM_MIN_WIDTH,
       height: TAB_ITEM_HEIGHT,
     })),
   );
  const [ready, setReady] = useState(false);
  const [internalActiveIndex, setInternalActiveIndex] =
    useState(propActiveIndex);

  const actualColorScheme = useMemo(() => {
    if (propColorScheme && propColorScheme !== "auto") return propColorScheme;
    if (!systemColorScheme || systemColorScheme === 'unspecified') return "dark";
    return systemColorScheme;
  }, [propColorScheme, systemColorScheme]);

  const activeIndex = useMemo(() => {
    return propActiveIndex !== undefined
      ? propActiveIndex
      : internalActiveIndex;
  }, [propActiveIndex, internalActiveIndex]);

  const tabConfig: LiquidTabConfig = useMemo(() => {
    const tabWidths = tabLayouts.map((t) => t.width || TAB_ITEM_MIN_WIDTH);
    const tabXOffsets = tabLayouts.map((t) => t.x || 0);

    return {
      tabCount: items.length,
      tabWidths,
      tabXOffsets,
      containerWidth,
    };
  }, [tabLayouts, items.length, containerWidth]);

  const animation = useLiquidTabAnimation(tabConfig);

  useEffect(() => {
    if (ready && containerWidth > 0) {
      animation.animateToIndex(activeIndex);
    }
  }, [activeIndex, ready, containerWidth, animation]);

  const handleContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  }, []);

   const handleTabLayout = useCallback(
     (index: number, event: { nativeEvent: { layout: { x: number; width: number; height: number; y?: number } } }) => {
       const { x, width, height } = event.nativeEvent.layout;

      setTabLayouts((prev) => {
        const next = [...prev];
        next[index] = { x, width, height };

        const allMeasured = next.every((t) => t.width > 0);
        if (allMeasured && !ready) {
          setReady(true);
        }

        return next;
      });
    },
    [ready],
  );

  const handleTabSelect = useCallback(
    (index: number) => {
      const item = items[index];
      if (!item) return;

      setInternalActiveIndex(index);
      animation.animateToIndex(index);

      if (onTabChange) {
        onTabChange(index, item.key);
      }
    },
    [items, animation, onTabChange],
  );

   const panGesture = useMemo(() => {
    return animation.createTabBarGesture(handleTabSelect);
  }, [animation, handleTabSelect]);

  const bgColor = useMemo(() => {
    if (actualColorScheme === "dark") {
      return "rgba(0, 0, 0, 0.3)";
    }
    return "rgba(255, 255, 255, 0.3)";
  }, [actualColorScheme]);

  const borderColor = useMemo(() => {
    if (actualColorScheme === "dark") {
      return "rgba(255, 255, 255, 0.1)";
    }
    return "rgba(0, 0, 0, 0.1)";
  }, [actualColorScheme]);

  const capsuleTopOffset = useMemo(() => {
    return (TAB_ITEM_HEIGHT - capsuleHeight) / 2;
  }, [capsuleHeight]);

  const tabBarStyle = useMemo(() => {
    if (floating) {
      return [
        styles.tabBar,
        styles.tabBarFloating,
        {
          backgroundColor: bgColor,
          borderWidth: 1,
          borderColor: borderColor,
        },
      ];
    }
    return [
      styles.tabBar,
      {
        backgroundColor: bgColor,
        borderTopWidth: 1,
        borderTopColor: borderColor,
      },
    ];
  }, [floating, bgColor, borderColor]);

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={tabBarStyle}>
          <View style={styles.tabsContainer} onLayout={handleContainerLayout}>
            {ready && (
              <View
                style={{
                  top: capsuleTopOffset,
                  position: "absolute",
                  left: 0,
                  right: 0,
                }}
              >
                <FloatingGlassCapsule
                  animation={{
                    capsuleAnimatedStyle: animation.capsuleAnimatedStyle,
                    highlightAnimatedStyle: animation.highlightAnimatedStyle,
                    blurIntensity: animation.blurIntensity,
                    highlightOpacity: animation.highlightOpacity,
                  }}
                  height={capsuleHeight}
                  colorScheme={actualColorScheme}
                />
              </View>
            )}

             {items.map((item, index) => (
              <GlassTabItem
                key={item.key}
                index={index}
                icon={item.icon}
                label={item.label}
                active={index === activeIndex}
                onLayout={(event) => handleTabLayout(index, event)}
                colorScheme={actualColorScheme}
              />
            ))}
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  tabBar: {
    width: "100%",
    height: TAB_BAR_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarFloating: {
    width: "90%",
    maxWidth: 400,
    borderRadius: 24,
    overflow: "hidden",
  },
  tabsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: TAB_BAR_PADDING_HORIZONTAL,
    position: "relative",
    height: TAB_ITEM_HEIGHT,
  },
});

export { CAPSULE_HEIGHT, TAB_BAR_HEIGHT, TAB_BAR_PADDING_HORIZONTAL };
