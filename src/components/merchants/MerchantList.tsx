import React, { useCallback, useMemo, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  SectionList,
  StyleSheet,
  Text as RNText,
  TextInput,
  View,
  type ImageSourcePropType,
  type SectionListRenderItem,
} from "react-native";

import { Skeleton, SkeletonCircle } from "@/components/loaders";
import { Icon } from "@/icons";
import { fontFamily, palette, spacing } from "@/theme";

export interface Merchant {
  id: string;
  name: string;
  image?: ImageSourcePropType;
}

export interface MerchantSection {
  title: string;
  data: Merchant[];
}

export interface MerchantListProps {
  sections: MerchantSection[];
  loading?: boolean;
  loadingSkeletonCount?: number;
  onSelectMerchant?: (merchant: Merchant) => void;
  searchPlaceholder?: string;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  filterModalTitle?: string;
}

const DEFAULT_SKELETON_COUNT = 6;

function MerchantRow({
  merchant,
  isLast,
  onPress,
}: {
  merchant: Merchant;
  isLast: boolean;
  onPress: () => void;
}) {
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
            {merchant.image ? (
              <Image source={merchant.image} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder} />
            )}
          </View>
          <RNText style={styles.name} numberOfLines={1}>
            {merchant.name}
          </RNText>
          <Icon
            name="chevron-right"
            width={24}
            height={24}
            color={palette.white}
            opacity={0.5}
          />
        </View>
      )}
    </Pressable>
  );
}

function MerchantRowSkeleton({ isLast }: { isLast: boolean }) {
  return (
    <View style={[styles.row, !isLast && styles.rowDivider]}>
      <SkeletonCircle size={36} />
      <View style={{ flex: 1 }}>
        <Skeleton width={140} height={16} borderRadius={4} />
      </View>
    </View>
  );
}

function SearchBox({
  value,
  onChange,
  placeholder,
  disabled,
  onFilterPress,
  filterActive,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled: boolean;
  onFilterPress: () => void;
  filterActive: boolean;
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
      <Pressable onPress={onFilterPress} hitSlop={8} style={styles.filterButton}>
        <Icon
          name="filter"
          width={24}
          height={24}
          color={filterActive ? palette.blue[400] : palette.white}
        />
        {filterActive && <View style={styles.filterBadge} />}
      </Pressable>
    </View>
  );
}

function FilterModal({
  visible,
  title,
  categories,
  selectedCategories,
  onToggle,
  onClear,
  onClose,
}: {
  visible: boolean;
  title: string;
  categories: string[];
  selectedCategories: Set<string>;
  onToggle: (category: string) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  const hasSelection = selectedCategories.size > 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheetWrapper} pointerEvents="box-none">
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <View style={styles.sheetHeader}>
            <RNText style={styles.sheetTitle}>{title}</RNText>
            <Pressable
              onPress={onClear}
              hitSlop={8}
              disabled={!hasSelection}
            >
              <RNText
                style={[styles.sheetClear, !hasSelection && styles.sheetClearDisabled]}
              >
                Limpiar
              </RNText>
            </Pressable>
          </View>
          <View style={styles.categoryList}>
            {categories.map((cat) => {
              const checked = selectedCategories.has(cat);
              return (
                <Pressable key={cat} onPress={() => onToggle(cat)}>
                  {({ pressed }) => (
                    <View
                      style={[
                        styles.categoryRow,
                        pressed && styles.rowPressed,
                      ]}
                    >
                      <View
                        style={[
                          styles.checkbox,
                          checked && styles.checkboxChecked,
                        ]}
                      >
                        {checked && (
                          <Icon
                            name="check"
                            width={16}
                            height={16}
                            color={palette.white}
                          />
                        )}
                      </View>
                      <RNText style={styles.categoryLabel}>{cat}</RNText>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
          <Pressable style={styles.sheetDone} onPress={onClose}>
            <RNText style={styles.sheetDoneLabel}>Listo</RNText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

export function MerchantList({
  sections,
  loading = false,
  loadingSkeletonCount = DEFAULT_SKELETON_COUNT,
  onSelectMerchant,
  searchPlaceholder = "Buscar...",
  searchQuery: controlledQuery,
  onSearchChange,
  filterModalTitle = "Filtrar por categoría",
}: MerchantListProps) {
  const [internalQuery, setInternalQuery] = useState("");
  const query = controlledQuery !== undefined ? controlledQuery : internalQuery;

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(),
  );

  const allCategories = useMemo(
    () => sections.map((s) => s.title),
    [sections],
  );

  const handleQueryChange = useCallback(
    (value: string) => {
      if (controlledQuery === undefined) {
        setInternalQuery(value);
      }
      onSearchChange?.(value);
    },
    [controlledQuery, onSearchChange],
  );

  const toggleCategory = useCallback((title: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }, []);

  const clearCategories = useCallback(() => {
    setSelectedCategories(new Set());
  }, []);

  const filteredSections = useMemo(() => {
    let result = sections;

    if (selectedCategories.size > 0) {
      result = result.filter((s) => selectedCategories.has(s.title));
    }

    const q = query.trim().toLowerCase();
    if (q) {
      result = result
        .map((section) => ({
          ...section,
          data: section.data.filter((m) =>
            m.name.toLowerCase().includes(q),
          ),
        }))
        .filter((section) => section.data.length > 0);
    }

    return result;
  }, [query, sections, selectedCategories]);

  const renderItem: SectionListRenderItem<Merchant, MerchantSection> =
    useCallback(
      ({ item, index, section }) => (
        <MerchantRow
          merchant={item}
          isLast={index === section.data.length - 1}
          onPress={() => onSelectMerchant?.(item)}
        />
      ),
      [onSelectMerchant],
    );

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <SearchBox
          value={query}
          onChange={handleQueryChange}
          placeholder={searchPlaceholder}
          disabled={loading}
          onFilterPress={() => setFilterOpen(true)}
          filterActive={selectedCategories.size > 0}
        />
      </View>

      {loading ? (
        <View style={styles.skeletonList}>
          {Array.from({ length: loadingSkeletonCount }).map((_, idx) => (
            <MerchantRowSkeleton
              key={idx}
              isLast={idx === loadingSkeletonCount - 1}
            />
          ))}
        </View>
      ) : (
        <SectionList
          sections={filteredSections}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <View style={styles.sectionHeader}>
              <RNText style={styles.sectionTitle}>{section.title}</RNText>
            </View>
          )}
          renderSectionFooter={() => <View style={styles.sectionFooter} />}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      )}

      <FilterModal
        visible={filterOpen}
        title={filterModalTitle}
        categories={allCategories}
        selectedCategories={selectedCategories}
        onToggle={toggleCategory}
        onClear={clearCategories}
        onClose={() => setFilterOpen(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    flex: 1,
  },
  searchWrapper: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    paddingBottom: spacing[3],
  },
  skeletonList: {
    paddingHorizontal: spacing[4],
  },
  list: {
    alignSelf: "stretch",
    flex: 1,
  },
  listContent: {
    paddingBottom: spacing[8],
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
    padding: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  filterButton: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  filterBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: palette.blue[400],
    borderWidth: 1,
    borderColor: palette.gray[900],
  },
  sectionHeader: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[3],
  },
  sectionTitle: {
    color: "rgba(255, 255, 255, 0.5)",
    fontFamily: fontFamily.displayMedium,
    fontSize: 12,
    letterSpacing: 0.48,
    textTransform: "uppercase",
    includeFontPadding: false,
  },
  sectionFooter: {
    height: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    gap: spacing[3],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: palette.gray[800],
  },
  rowPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  rowDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: palette.gray[800],
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: palette.gray[800],
    backgroundColor: palette.gray[900],
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  avatarPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#D9D9D9",
  },
  name: {
    flex: 1,
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: 16,
    includeFontPadding: false,
  },
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.55)",
  },
  sheetWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: palette.gray[900],
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    paddingBottom: spacing[8],
    gap: spacing[3],
  },
  sheetHandle: {
    alignSelf: "center",
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginBottom: spacing[2],
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheetTitle: {
    color: palette.white,
    fontFamily: fontFamily.displayMedium,
    fontSize: 18,
    includeFontPadding: false,
  },
  sheetClear: {
    color: palette.blue[400],
    fontFamily: fontFamily.displayMedium,
    fontSize: 14,
    includeFontPadding: false,
  },
  sheetClearDisabled: {
    opacity: 0.3,
  },
  categoryList: {
    gap: spacing[1],
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[3],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[2],
    borderRadius: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: palette.blue[500],
    borderColor: palette.blue[500],
  },
  categoryLabel: {
    flex: 1,
    color: palette.white,
    fontFamily: fontFamily.display,
    fontSize: 16,
    includeFontPadding: false,
  },
  sheetDone: {
    marginTop: spacing[2],
    paddingVertical: spacing[3],
    borderRadius: 12,
    backgroundColor: palette.blue[500],
    alignItems: "center",
    justifyContent: "center",
  },
  sheetDoneLabel: {
    color: palette.white,
    fontFamily: fontFamily.displaySemiBold,
    fontSize: 16,
    includeFontPadding: false,
  },
});
