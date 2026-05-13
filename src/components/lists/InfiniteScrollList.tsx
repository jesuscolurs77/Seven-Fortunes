import React, { useCallback, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text as RNText,
  RefreshControl,
  type FlatListProps,
  type ListRenderItem,
} from 'react-native';

import { palette, radius, spacing, semantic } from '@/theme';
import { Skeleton, SkeletonText, SkeletonCircle } from '@/components/loaders/Skeleton';

export interface InfiniteScrollListProps<T> extends Omit<FlatListProps<T>, 'data' | 'renderItem' | 'refreshControl'> {
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
  loadingSkeletonCount?: number;
  showDividers?: boolean;
}

const DEFAULT_SKELETON_COUNT = 5;

function DefaultSkeletonItem() {
  return (
    <View style={styles.skeletonItem}>
      <View style={styles.skeletonRow}>
        <SkeletonCircle size={48} />
        <View style={styles.skeletonContent}>
          <Skeleton height={16} width="60%" />
          <View style={styles.skeletonSpacer} />
          <Skeleton height={12} width="80%" />
        </View>
      </View>
    </View>
  );
}

function LoadingMoreIndicator() {
  return (
    <View style={styles.loadingMoreContainer}>
      <Skeleton height={4} width={80} borderRadius={2} />
    </View>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <View style={styles.emptyContainer}>
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
  emptyText = 'No hay elementos que mostrar',
  loadingSkeletonCount = DEFAULT_SKELETON_COUNT,
  showDividers = false,
  style,
  contentContainerStyle,
  ...props
}: InfiniteScrollListProps<T>) {
  const defaultKeyExtractor = useCallback(
    (item: T, index: number): string => {
      if (typeof item === 'object' && item !== null && 'id' in item) {
        return String((item as { id: string | number }).id);
      }
      return String(index);
    },
    []
  );

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
    [renderItem, showDividers, data.length]
  );

  const renderFooter = useCallback(() => {
    if (loadingMore) {
      return <LoadingMoreIndicator />;
    }
    if (!hasMore && data.length > 0) {
      return (
        <View style={styles.endContainer}>
          <RNText style={styles.endText}>Has llegado al final</RNText>
        </View>
      );
    }
    return null;
  }, [loadingMore, hasMore, data.length]);

  const renderEmpty = useCallback(() => {
    if (loading) {
      return null;
    }
    return <EmptyState text={emptyText} />;
  }, [loading, emptyText]);

  if (loading && data.length === 0) {
    return (
      <View style={[styles.container, style]}>
        {Array.from({ length: loadingSkeletonCount }).map((_, index) => (
          <View key={index}>
            <DefaultSkeletonItem />
            {showDividers && index < loadingSkeletonCount - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      renderItem={showDividers ? renderItemWithDivider : renderItem}
      keyExtractor={keyExtractor || defaultKeyExtractor}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
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
    width: '100%',
  },
  contentContainer: {
    flexGrow: 1,
  },
  emptyContentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  skeletonItem: {
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
  },
  skeletonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  skeletonContent: {
    flex: 1,
    gap: spacing[1],
  },
  skeletonSpacer: {
    height: 4,
  },
  divider: {
    height: 1,
    backgroundColor: semantic.border.subtle,
    marginHorizontal: spacing[4],
  },
  loadingMoreContainer: {
    paddingVertical: spacing[4],
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    padding: spacing[8],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: semantic.text.muted,
    includeFontPadding: false,
    textAlign: 'center',
  },
  endContainer: {
    paddingVertical: spacing[4],
    alignItems: 'center',
  },
  endText: {
    fontSize: 12,
    color: semantic.text.muted,
    includeFontPadding: false,
  },
});


