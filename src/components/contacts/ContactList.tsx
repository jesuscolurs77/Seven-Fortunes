import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text as RNText,
  TextInput,
  View,
  type ListRenderItem,
} from "react-native";

import { Skeleton, SkeletonCircle } from "@/components/loaders";
import { Icon } from "@/icons";
import { fontFamily, fontWeight, palette, spacing } from "@/theme";

export interface Contact {
  id: string;
  name: string;
}

export interface ContactListProps {
  contacts: Contact[];
  loading?: boolean;
  loadingMore?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  onSelectContact?: (contact: Contact) => void;
  onInvitePress?: () => void;
  inviteLabel?: string;
  loadingSkeletonCount?: number;
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

const DEFAULT_SKELETON_COUNT = 8;

function ContactRow({
  contact,
  isLast,
  onPress,
}: {
  contact: Contact;
  isLast: boolean;
  onPress: () => void;
}) {
  const initial = contact.name.charAt(0).toUpperCase();

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={[
            styles.row,
            pressed && styles.rowPressed,
            !isLast && styles.rowDivider,
          ]}
        >
          <View style={styles.avatar}>
            <RNText style={styles.avatarText}>{initial}</RNText>
          </View>
          <RNText style={styles.name} numberOfLines={1}>
            {contact.name}
          </RNText>
        </View>
      )}
    </Pressable>
  );
}

function InviteRow({
  label,
  hasItemsBelow,
  onPress,
}: {
  label: string;
  hasItemsBelow: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={[
            styles.row,
            pressed && styles.rowPressed,
            hasItemsBelow && styles.rowDivider,
          ]}
        >
          <View style={styles.inviteIcon}>
            <Icon
              name="user-add"
              width={20}
              height={20}
              color={palette.gray[950]}
            />
          </View>
          <RNText style={styles.name} numberOfLines={1}>
            {label}
          </RNText>
        </View>
      )}
    </Pressable>
  );
}

function ContactRowSkeleton({ isLast }: { isLast: boolean }) {
  return (
    <View style={[styles.row, !isLast && styles.rowDivider]}>
      <SkeletonCircle size={36} />
      <Skeleton width={140} height={16} borderRadius={4} />
    </View>
  );
}

function LoadingMoreIndicator() {
  return (
    <View style={styles.loadingMore}>
      <ActivityIndicator size="small" color={palette.blue[500]} />
    </View>
  );
}

function SearchBox({
  value,
  onChange,
  placeholder,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
}) {
  return (
    <View style={styles.searchBox}>
      <Icon name="search" width={24} height={24} color={palette.white} />
      <TextInput
        style={styles.searchInput}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="rgba(255, 255, 255, 0.50)"
        keyboardAppearance="dark"
        returnKeyType="search"
        editable={!disabled}
      />
    </View>
  );
}

export function ContactList({
  contacts,
  loading = false,
  loadingMore = false,
  hasMore = false,
  onLoadMore,
  onSelectContact,
  onInvitePress,
  inviteLabel = "Invite new contact",
  loadingSkeletonCount = DEFAULT_SKELETON_COUNT,
  showSearch = true,
  searchPlaceholder = "Search...",
  searchQuery: controlledQuery,
  onSearchChange,
}: ContactListProps) {
  const [internalQuery, setInternalQuery] = useState("");
  const query = controlledQuery !== undefined ? controlledQuery : internalQuery;

  const handleQueryChange = useCallback(
    (value: string) => {
      if (controlledQuery === undefined) {
        setInternalQuery(value);
      }
      onSearchChange?.(value);
    },
    [controlledQuery, onSearchChange],
  );

  const filteredContacts = useMemo(() => {
    if (!query.trim()) return contacts;
    const q = query.toLowerCase();
    return contacts.filter((c) => c.name.toLowerCase().includes(q));
  }, [query, contacts]);

  const hasActiveQuery = query.trim().length > 0;

  const handleEndReached = useCallback(() => {
    if (hasActiveQuery) return;
    if (hasMore && !loadingMore && onLoadMore) {
      onLoadMore();
    }
  }, [hasActiveQuery, hasMore, loadingMore, onLoadMore]);

  const renderContact: ListRenderItem<Contact> = useCallback(
    ({ item, index }) => (
      <ContactRow
        contact={item}
        isLast={index === filteredContacts.length - 1 && !loadingMore}
        onPress={() => onSelectContact?.(item)}
      />
    ),
    [filteredContacts.length, loadingMore, onSelectContact],
  );

  return (
    <View style={styles.container}>
      {showSearch && (
        <SearchBox
          value={query}
          onChange={handleQueryChange}
          placeholder={searchPlaceholder}
          disabled={loading}
        />
      )}

      {loading ? (
        <View style={styles.skeletonList}>
          {Array.from({ length: loadingSkeletonCount }).map((_, idx) => (
            <ContactRowSkeleton
              key={idx}
              isLast={idx === loadingSkeletonCount - 1}
            />
          ))}
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          renderItem={renderContact}
          keyExtractor={(item) => item.id}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          ListHeaderComponent={
            <InviteRow
              label={inviteLabel}
              hasItemsBelow={filteredContacts.length > 0}
              onPress={() => onInvitePress?.()}
            />
          }
          ListFooterComponent={loadingMore ? <LoadingMoreIndicator /> : null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    flex: 1,
    gap: spacing[4],
  },
  skeletonList: {
    alignSelf: "stretch",
    flex: 1,
  },
  flatList: {
    alignSelf: "stretch",
    flex: 1,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    gap: spacing[2],
    height: 44,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[2],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    backgroundColor: palette.gray[900],
  },
  searchInput: {
    flex: 1,
    color: palette.white,
    fontFamily: fontFamily.displayMedium,
    fontSize: 16,
    fontWeight: "500",
    padding: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    gap: spacing[3],
    paddingVertical: spacing[3],
  },
  rowPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  rowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: palette.gray[800],
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: palette.blue[100],
    backgroundColor: palette.blue[200],
    alignItems: "center",
    justifyContent: "center",
  },
  inviteIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: palette.white,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: palette.blue[700],
    fontFamily: fontFamily.display,
    fontSize: 16,
    fontWeight: fontWeight.h2,
    includeFontPadding: false,
  },
  name: {
    flex: 1,
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: 16,
    fontWeight: "500",
    includeFontPadding: false,
  },
  loadingMore: {
    paddingVertical: spacing[4],
    alignItems: "center",
  },
});
