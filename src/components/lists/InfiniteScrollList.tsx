import React, { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text as RNText,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  type FlatListProps,
  type ListRenderItem,
} from "react-native";

import { Icon } from "@/icons";
import { palette, semantic, spacing } from "@/theme";

export interface InfiniteScrollListProps<T> extends Omit<
  FlatListProps<T>,
  "data" | "renderItem" | "refreshControl"
> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor?: (item: T, index: number) => string;
  loading?: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loadingMore?: boolean;
  emptyText?: string;
  emptyIcon?: string;
  loadingSkeletonCount?: number;
  showDividers?: boolean;
  renderSkeletonItem?: () => React.ReactNode;
}

const DEFAULT_SKELETON_COUNT = 5;

function DefaultSkeletonItem() {
  return (
    <View style={styles.skeletonItem}>
      <View style={styles.skeletonIconBox}>
        <Icon name="reload" color={palette.white} opacity={0.15} />
      </View>
      <View style={styles.skeletonMiddle}>
        <View style={styles.skeletonBar} />
        <View style={styles.skeletonBarSmall} />
      </View>
      <View style={styles.skeletonRight}>
        <View style={styles.skeletonDateBar} />
        <View style={styles.skeletonAmountBar} />
      </View>
    </View>
  );
}

function LoadingMoreIndicator() {
  return (
    <View style={styles.loadingMoreContainer}>
      <ActivityIndicator size="small" color={palette.blue[500]} />
      <RNText style={styles.loadingMoreText}>Loading more...</RNText>
    </View>
  );
}

function EmptyState({ text, icon }: { text: string; icon?: string }) {
  return (
    <View style={styles.emptyContainer}>
      {icon && (
        <View style={styles.emptyIconBox}>
          <Icon name={icon} color={palette.gray[600]} />
        </View>
      )}
      <RNText style={styles.emptyText}>{text}</RNText>
    </View>
  );
}

export function InfiniteScrollList<T>({
  data,
  renderItem,
  keyExtractor,
  loading = false,
  refreshing = false,
  onRefresh,
  onLoadMore,
  hasMore = true,
  loadingMore = false,
  emptyText = "No hay elementos que mostrar",
  loadingSkeletonCount = DEFAULT_SKELETON_COUNT,
  showDividers = false,
  renderSkeletonItem,
  emptyIcon,
  style,
  contentContainerStyle,
  ListHeaderComponent,
  ...props
}: InfiniteScrollListProps<T>) {
  const defaultKeyExtractor = useCallback((item: T, index: number): string => {
    if (typeof item === "object" && item !== null && "id" in item) {
      return String((item as { id: string | number }).id);
    }
    return String(index);
  }, []);

  const handleEndReached = useCallback(() => {
    if (hasMore && !loadingMore && onLoadMore) {
      onLoadMore();
    }
  }, [hasMore, loadingMore, onLoadMore]);

  const renderItemWithDivider: ListRenderItem<T> = useCallback(
    (info) => {
      if (!showDividers || info.index === data.length - 1) {
        return renderItem(info);
      }
      return (
        <View>
          {renderItem(info)}
          <View style={styles.divider} />
        </View>
      );
    },
    [renderItem, showDividers, data.length],
  );

  const renderFooter = useCallback(() => {
    if (loadingMore) {
      return <LoadingMoreIndicator />;
    }
    if (!hasMore && data.length > 0) {
      return (
        <View style={styles.endContainer}>
          <RNText style={styles.endText}>No more moves to show</RNText>
        </View>
      );
    }
    return null;
  }, [loadingMore, hasMore, data.length]);

  const renderEmpty = useCallback(() => {
    if (loading) {
      return null;
    }
    return <EmptyState text={emptyText} icon={emptyIcon} />;
  }, [loading, emptyText, emptyIcon]);

  const showSkeleton = loading && data.length === 0;

  const renderHeader = useCallback(() => {
    if (!ListHeaderComponent) return null;
    if (React.isValidElement(ListHeaderComponent)) return ListHeaderComponent;
    const HeaderComp = ListHeaderComponent as React.ComponentType;
    return <HeaderComp />;
  }, [ListHeaderComponent]);

  if (showSkeleton) {
    const SkeletonItem = renderSkeletonItem || DefaultSkeletonItem;
    return (
      <ScrollView
        style={[styles.skeletonContainer, style]}
        contentContainerStyle={contentContainerStyle}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={palette.white}
              colors={[palette.blue[500]]}
              progressBackgroundColor={palette.gray[900]}
            />
          ) : undefined
        }
        showsVerticalScrollIndicator={false}
      >
        {renderHeader()}
        {Array.from({ length: loadingSkeletonCount }).map((_, index) => (
          <View key={index}>
            <SkeletonItem />
            {showDividers && index < loadingSkeletonCount - 1 && (
              <View style={styles.divider} />
            )}
          </View>
        ))}
      </ScrollView>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={showDividers ? renderItemWithDivider : renderItem}
      keyExtractor={keyExtractor || defaultKeyExtractor}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={palette.white}
            colors={[palette.blue[500]]}
            progressBackgroundColor={palette.gray[900]}
          />
        ) : undefined
      }
      style={[styles.container, style]}
      contentContainerStyle={[
        styles.contentContainer,
        data.length === 0 && styles.emptyContentContainer,
        contentContainerStyle,
      ]}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  skeletonContainer: {
    flex: 1,
    width: "100%",
  },
  contentContainer: {
    flexGrow: 1,
  },
  emptyContentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  skeletonItem: {
    display: "flex",
    paddingVertical: 16,
    alignItems: "center",
    gap: 12,
    alignSelf: "stretch",
    flexDirection: "row",
  },
  skeletonIconBox: {
    display: "flex",
    width: 42,
    height: 42,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: palette.gray[900],
  },
  skeletonMiddle: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    flex: 1,
    flexDirection: "column",
  },
  skeletonBar: {
    width: 128,
    height: 14,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  skeletonBarSmall: {
    width: 80,
    height: 12,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  skeletonRight: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 4,
    flex: 1,
  },
  skeletonDateBar: {
    width: 68,
    height: 12,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  skeletonAmountBar: {
    width: 48,
    height: 14,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  divider: {
    height: 1,
    backgroundColor: semantic.border.subtle,
    marginHorizontal: spacing[4],
  },
  loadingMoreContainer: {
    paddingVertical: spacing[5],
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing[2],
  },
  loadingMoreText: {
    fontSize: 13,
    color: semantic.text.muted,
    includeFontPadding: false,
  },
  emptyContainer: {
    flex: 1,
    padding: spacing[8],
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[3],
  },
  emptyIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: palette.gray[900],
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 14,
    color: semantic.text.muted,
    includeFontPadding: false,
    textAlign: "center",
  },
  endContainer: {
    paddingVertical: spacing[4],
    alignItems: "center",
  },
  endText: {
    fontSize: 12,
    color: semantic.text.muted,
    includeFontPadding: false,
  },
});
