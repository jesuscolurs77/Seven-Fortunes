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
import { SvgXml } from 'react-native-svg';

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
  renderSkeletonItem?: () => React.ReactNode;
}

const DEFAULT_SKELETON_COUNT = 5;

const skeletonDotXml = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <rect x="6.35352" y="5.64648" width="12" height="12" rx="6" fill="white" fill-opacity="0.15"/>
</svg>`;

function DefaultSkeletonItem() {
  return (
    <View style={styles.skeletonItem}>
      <View style={styles.skeletonIconBox}>
        <SvgXml xml={skeletonDotXml} />
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
  renderSkeletonItem,
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
    const SkeletonItem = renderSkeletonItem || DefaultSkeletonItem;
    return (
      <View style={[styles.container, style]}>
        {Array.from({ length: loadingSkeletonCount }).map((_, index) => (
          <View key={index}>
            <SkeletonItem />
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
    display: 'flex',
    paddingVertical: 16,
    alignItems: 'center',
    gap: 12,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  skeletonIconBox: {
    display: 'flex',
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: palette.gray[900],
  },
  skeletonMiddle: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 12,
    flex: 1,
    flexDirection: 'column',
  },
  skeletonBar: {
    width: 128,
    height: 14,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  skeletonBarSmall: {
    width: 80,
    height: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  skeletonRight: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 4,
    flex: 1,
  },
  skeletonDateBar: {
    width: 68,
    height: 12,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  skeletonAmountBar: {
    width: 48,
    height: 14,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
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


