import React, { useCallback, useState, useMemo, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text as RNText,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { palette, radius, spacing, semantic } from '@/theme';
import {
  SelectTrigger,
} from '@/ui/SelectTrigger';
import {
  SelectOptionItem,
  type SelectOption,
} from '@/ui/SelectOptionItem';

export interface SelectProps {
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string, option: SelectOption) => void;
  disabled?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
  modalTitle?: string;
}

const SEARCH_HEIGHT = 48;
const BOTTOM_SHEET_MARGIN = 12;

const SearchIcon = () => (
  <RNText style={styles.searchIcon}>🔍</RNText>
);

export function Select({
  placeholder = 'Seleccionar...',
  options,
  value,
  onChange,
  disabled = false,
  onOpen,
  onClose,
  showSearch = true,
  searchPlaceholder = 'Buscar...',
  modalTitle,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [androidKeyboardHeight, setAndroidKeyboardHeight] = useState(0);

  const selectedOption = useMemo(() => {
    return options.find((opt) => opt.value === value);
  }, [options, value]);

  const filteredOptions = useMemo(() => {
    if (!searchQuery || !showSearch) {
      return options;
    }
    const query = searchQuery.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        (opt.subtitle && opt.subtitle.toLowerCase().includes(query))
    );
  }, [options, searchQuery, showSearch]);

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    const showSub = Keyboard.addListener('keyboardDidShow', (e) => {
      setAndroidKeyboardHeight(e.endCoordinates.height);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setAndroidKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleOpen = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
    setSearchQuery('');
    onOpen?.();
  }, [disabled, onOpen]);

  const handleClose = useCallback(() => {
    Keyboard.dismiss();
    setIsOpen(false);
    setSearchQuery('');
    onClose?.();
  }, [onClose]);

  const handleSelect = useCallback(
    (option: SelectOption) => {
      Keyboard.dismiss();
      onChange?.(option.value, option);
      handleClose();
    },
    [onChange, handleClose]
  );

  const handleBackdropPress = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const handleSheetPress = useCallback((_e: any) => {
  }, []);

  if (Platform.OS === 'ios') {
    return (
      <View style={styles.container}>
        <SelectTrigger
          placeholder={placeholder}
          selectedLabel={selectedOption?.label}
          selectedIcon={selectedOption?.icon}
          selectedImage={selectedOption?.image}
          disabled={disabled}
          isFocused={isOpen}
          onPress={handleOpen}
        />

        <Modal
          visible={isOpen}
          transparent
          animationType="slide"
          onRequestClose={handleClose}
          statusBarTranslucent
          hardwareAccelerated
        >
          <KeyboardAvoidingView
            style={styles.iosModalContainer}
            behavior="padding"
          >
            <TouchableWithoutFeedback onPress={handleBackdropPress}>
              <View style={styles.modalBackdrop}>
                <TouchableWithoutFeedback onPress={handleSheetPress}>
                  <View style={styles.bottomSheet}>
                    {modalTitle && (
                      <View style={styles.titleContainer}>
                        <RNText style={styles.titleText}>{modalTitle}</RNText>
                      </View>
                    )}

                    {showSearch && (
                      <View style={styles.searchContainer}>
                        <SearchIcon />
                        <TextInput
                          style={styles.searchInput}
                          placeholder={searchPlaceholder}
                          placeholderTextColor="rgba(255, 255, 255, 0.50)"
                          value={searchQuery}
                          onChangeText={setSearchQuery}
                          returnKeyType="search"
                          keyboardAppearance="dark"
                          blurOnSubmit={false}
                        />
                      </View>
                    )}

                    <ScrollView
                      style={styles.list}
                      contentContainerStyle={styles.listContent}
                      keyboardShouldPersistTaps="always"
                      showsVerticalScrollIndicator={false}
                      nestedScrollEnabled
                    >
                      {filteredOptions.length === 0 ? (
                        <View style={styles.emptyContainer}>
                          <RNText style={styles.emptyText}>No hay elementos que mostrar</RNText>
                        </View>
                      ) : (
                        filteredOptions.map((option) => (
                          <SelectOptionItem
                            key={option.value}
                            option={option}
                            selected={option.value === value}
                            onPress={() => handleSelect(option)}
                          />
                        ))
                      )}
                    </ScrollView>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SelectTrigger
        placeholder={placeholder}
        selectedLabel={selectedOption?.label}
        selectedIcon={selectedOption?.icon}
        selectedImage={selectedOption?.image}
        disabled={disabled}
        isFocused={isOpen}
        onPress={handleOpen}
      />

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
        statusBarTranslucent
        hardwareAccelerated
      >
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={handleBackdropPress}>
            <View style={[
              styles.modalBackdrop,
              androidKeyboardHeight > 0 && { paddingBottom: androidKeyboardHeight },
            ]}>
              <SafeAreaView style={styles.safeArea} edges={['bottom']}>
                <TouchableWithoutFeedback onPress={handleSheetPress}>
                  <View style={styles.bottomSheet}>
                    {modalTitle && (
                      <View style={styles.titleContainer}>
                        <RNText style={styles.titleText}>{modalTitle}</RNText>
                      </View>
                    )}

                    {showSearch && (
                      <View style={styles.searchContainer}>
                        <SearchIcon />
                        <TextInput
                          style={styles.searchInput}
                          placeholder={searchPlaceholder}
                          placeholderTextColor="rgba(255, 255, 255, 0.50)"
                          value={searchQuery}
                          onChangeText={setSearchQuery}
                          returnKeyType="search"
                          keyboardAppearance="dark"
                          blurOnSubmit={false}
                        />
                      </View>
                    )}

                    <ScrollView
                      style={styles.list}
                      contentContainerStyle={styles.listContent}
                      keyboardShouldPersistTaps="always"
                      showsVerticalScrollIndicator={false}
                      nestedScrollEnabled
                    >
                      {filteredOptions.length === 0 ? (
                        <View style={styles.emptyContainer}>
                          <RNText style={styles.emptyText}>No hay elementos que mostrar</RNText>
                        </View>
                      ) : (
                        filteredOptions.map((option) => (
                          <SelectOptionItem
                            key={option.value}
                            option={option}
                            selected={option.value === value}
                            onPress={() => handleSelect(option)}
                          />
                        ))
                      )}
                    </ScrollView>
                  </View>
                </TouchableWithoutFeedback>
              </SafeAreaView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  modalContainer: {
    flex: 1,
  },
  iosModalContainer: {
    flex: 1,
    width: '100%',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  safeArea: {
    width: '100%',
  },
   bottomSheet: {
     backgroundColor: palette.gray[950],
     borderTopLeftRadius: radius.lg,
     borderTopRightRadius: radius.lg,
     borderWidth: 1,
     borderColor: semantic.border.subtle,
     borderBottomWidth: 0,
     marginHorizontal: BOTTOM_SHEET_MARGIN,
     maxHeight: '70%',
     minHeight: 380,
     overflow: 'hidden',
   },
  titleContainer: {
    paddingHorizontal: spacing[4],
    paddingTop: spacing[4],
    paddingBottom: spacing[2],
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: palette.white,
    includeFontPadding: false,
    textAlign: 'left',
  },
  searchContainer: {
    height: SEARCH_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing[3],
    backgroundColor: semantic.surface.primary,
    marginHorizontal: spacing[3],
    marginTop: spacing[2],
    marginBottom: spacing[2],
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  searchIcon: {
    fontSize: 20,
    marginRight: spacing[2],
  },
  searchInput: {
    flex: 1,
    height: SEARCH_HEIGHT,
    fontSize: 16,
    fontWeight: '500',
    color: palette.white,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  listContent: {
    paddingHorizontal: spacing[3],
    paddingBottom: spacing[4],
  },
  emptyContainer: {
    padding: spacing[8],
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: semantic.text.muted,
    includeFontPadding: false,
  },
});

export type { SelectOption, SelectProps };
