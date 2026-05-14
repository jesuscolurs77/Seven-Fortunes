import React from 'react';
import { View, Text as RNText, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { Select, type SelectProps } from '@/components/selects/Select';
import type { SelectOption } from '@/components/selects/SelectOptionItem';
import { Icon } from '@/icons';
import { palette, radius, spacing } from '@/theme';

export interface BankOption extends SelectOption {
  bankCode?: string;
}

export interface BankSelectProps extends Omit<SelectProps, 'options'> {
  banks: BankOption[];
}

const DEFAULT_BANKS: BankOption[] = [
  { value: 'caixa', label: 'Caixa Econômica', bankCode: 'CEF' },
  { value: 'banco-do-brasil', label: 'Banco do Brasil', bankCode: 'BB' },
  { value: 'itau', label: 'Itaú', bankCode: 'ITAU' },
  { value: 'bancolombia', label: 'Bancolombia', bankCode: 'BCOL' },
  { value: 'banorte', label: 'Banorte', bankCode: 'BNT' },
  { value: 'hsbc', label: 'HSBC', bankCode: 'HSBC' },
  { value: 'scotiabank', label: 'Scotiabank', bankCode: 'SCOT' },
  { value: 'citibanamex', label: 'Citibanamex', bankCode: 'CNX' },
  { value: 'santander', label: 'Santander', bankCode: 'SAN' },
  { value: 'bbva', label: 'BBVA', bankCode: 'BBVA' },
];

export function BankPreviewTrigger({
  selectedOption,
  placeholder = 'Seleccionar...',
  onPress,
}: {
  selectedOption?: SelectOption;
  placeholder?: string;
  onPress: () => void;
}) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.previewContainer}>
        <View style={styles.iconBox}>
          <Icon name="credit-card" width={20} height={20} color="#1C3360" />
        </View>
        <View style={styles.textContainer}>
          <RNText style={styles.label}>
            {selectedOption?.label ?? placeholder}
          </RNText>
          {selectedOption?.subtitle && (
            <RNText style={styles.subtitle}>{selectedOption.subtitle}</RNText>
          )}
        </View>
        <Icon name="chevron-right" width={24} height={24} color={palette.white} />
      </View>
    </TouchableWithoutFeedback>
  );
}

export function BankSelect({
  banks,
  placeholder = 'Seleccionar banco...',
  searchPlaceholder = 'Buscar banco...',
  ...props
}: BankSelectProps) {
  const mappedOptions: BankOption[] = banks.map((bank) => ({
    ...bank,
    subtitle: bank.subtitle || bank.bankCode || undefined,
  }));

  return (
    <Select
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      options={mappedOptions}
      renderTrigger={({ selectedOption, onPress, placeholder: ph }) => (
        <BankPreviewTrigger
          selectedOption={selectedOption}
          placeholder={ph}
          onPress={onPress}
        />
      )}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  previewContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    gap: 12,
    alignSelf: 'stretch',
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  iconBox: {
    width: 32,
    height: 32,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#C3D1EC',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2,
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: palette.white,
    includeFontPadding: false,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.5)',
    includeFontPadding: false,
  },
});

export { DEFAULT_BANKS };
