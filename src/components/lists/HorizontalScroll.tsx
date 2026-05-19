import React from "react";
import {
  Image,
  Text as RNText,
  ScrollView,
  StyleSheet,
  View,
  type ImageSourcePropType,
  type ViewStyle,
} from "react-native";

import { PressableScale } from "@/components/common/PressableScale";
import { fontFamily, palette, semantic, spacing } from "@/theme";

export interface HorizontalScrollItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  image?: ImageSourcePropType;
  subtitle?: string;
  badge?: string | number;
  onPress?: () => void;
}

export interface HorizontalScrollProps {
  items: HorizontalScrollItem[];
  selectedId?: string;
  onSelect?: (id: string, item: HorizontalScrollItem) => void;
  showIndicators?: boolean;
  itemWidth?: number;
  itemHeight?: number;
  variant?: "default" | "compact" | "large";
  style?: ViewStyle;
}

const DEFAULT_ITEM_WIDTH = 80;
const DEFAULT_ITEM_HEIGHT = 100;
const COMPACT_ITEM_HEIGHT = 64;
const LARGE_ITEM_HEIGHT = 120;

function CommerceButton({
  item,
  selected,
  onPress,
  variant = "default",
}: {
  item: HorizontalScrollItem;
  selected: boolean;
  onPress: () => void;
  variant?: "default" | "compact" | "large";
}) {
  const getItemHeight = () => {
    switch (variant) {
      case "compact":
        return COMPACT_ITEM_HEIGHT;
      case "large":
        return LARGE_ITEM_HEIGHT;
      default:
        return DEFAULT_ITEM_HEIGHT;
    }
  };

  const renderIcon = () => {
    if (item.image) {
      return (
        <Image
          source={item.image}
          style={styles.itemImage}
          resizeMode="contain"
        />
      );
    }

    if (item.icon) {
      return <View style={styles.itemIconContainer}>{item.icon}</View>;
    }

    return null;
  };

  return (
    <PressableScale
      onPress={onPress}
      activeOpacity={0.6}
      style={[
        styles.itemContainer,
        variant !== "default" && { height: getItemHeight() },
        selected && styles.itemSelected,
      ]}
    >
      {item.badge !== undefined && (
        <View style={styles.badgeContainer}>
          <RNText style={styles.badgeText}>
            {typeof item.badge === "number" ? item.badge : item.badge}
          </RNText>
        </View>
      )}

      <View style={styles.itemIconWrapper}>{renderIcon()}</View>

      {variant !== "compact" && (
        <View style={styles.itemTextContainer}>
          <RNText
            style={[styles.itemLabel, selected && styles.itemLabelSelected]}
            numberOfLines={1}
          >
            {item.label}
          </RNText>
          {item.subtitle && variant === "large" && (
            <RNText style={styles.itemSubtitle} numberOfLines={1}>
              {item.subtitle}
            </RNText>
          )}
        </View>
      )}
    </PressableScale>
  );
}

export function HorizontalScroll({
  items,
  selectedId,
  onSelect,
  showIndicators = false,
  variant = "default",
  style,
}: HorizontalScrollProps) {
  const handlePress = (item: HorizontalScrollItem) => {
    onSelect?.(item.id, item);
    item.onPress?.();
  };

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToAlignment="start"
        decelerationRate="fast"
      >
        {items.map((item) => (
          <CommerceButton
            key={item.id}
            item={item}
            selected={selectedId === item.id}
            onPress={() => handlePress(item)}
            variant={variant}
          />
        ))}
      </ScrollView>

      {showIndicators && items.length > 1 && (
        <View style={styles.indicatorsContainer}>
          {items.map((item) => (
            <View
              key={item.id}
              style={[
                styles.indicator,
                selectedId === item.id && styles.indicatorActive,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  scrollContent: {
    paddingHorizontal: spacing[4],
    gap: spacing[3],
    paddingVertical: spacing[2],
  },
  itemContainer: {
    width: DEFAULT_ITEM_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing[2],
    paddingHorizontal: 0,
    borderRadius: 16,
    gap: spacing[2],
  },
  itemSelected: {
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  itemIconWrapper: {
    width: 56,
    height: 56,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemIconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
  itemTextContainer: {
    alignItems: "center",
    width: "100%",
  },
  itemLabel: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: fontFamily.displayMedium,
    color: palette.white,
    includeFontPadding: false,
    textAlign: "center",
  },
  itemLabelSelected: {
    color: palette.white,
    fontWeight: "500",
  },
  itemSubtitle: {
    fontSize: 10,
    color: semantic.text.muted,
    includeFontPadding: false,
    textAlign: "center",
    marginTop: 2,
  },
  badgeContainer: {
    position: "absolute",
    top: 4,
    right: 4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: semantic.brand.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "600",
    color: palette.white,
    includeFontPadding: false,
  },
  indicatorsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing[2],
    marginTop: spacing[2],
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: semantic.text.muted,
  },
  indicatorActive: {
    width: 16,
    backgroundColor: semantic.brand.primary,
  },
});
