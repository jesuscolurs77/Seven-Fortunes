import React from 'react';
import { Text as RNText } from 'react-native';

import { Select, type SelectOption, type SelectProps } from '@/ui/Select';

export interface BankOption extends SelectOption {
  bankCode?: string;
}

export interface BankSelectProps extends Omit<SelectProps, 'options'> {
  banks: BankOption[];
}

const DEFAULT_BANKS: BankOption[] = [
  { value: 'caixa', label: 'Caixa Econômica', bankCode: 'CEF', icon: <RNText style={{ fontSize: 20 }}>🏛️</RNText> },
  { value: 'banco-do-brasil', label: 'Banco do Brasil', bankCode: 'BB', icon: <RNText style={{ fontSize: 20 }}>🏦</RNText> },
  { value: 'itau', label: 'Itaú', bankCode: 'ITAU', icon: <RNText style={{ fontSize: 20 }}>💰</RNText> },
  { value: 'bancolombia', label: 'Bancolombia', bankCode: 'BCOL', icon: <RNText style={{ fontSize: 20 }}>🏦</RNText> },
  { value: 'banorte', label: 'Banorte', bankCode: 'BNT', icon: <RNText style={{ fontSize: 20 }}>🏛️</RNText> },
  { value: 'hsbc', label: 'HSBC', bankCode: 'HSBC', icon: <RNText style={{ fontSize: 20 }}>💵</RNText> },
  { value: 'scotiabank', label: 'Scotiabank', bankCode: 'SCOT', icon: <RNText style={{ fontSize: 20 }}>🏧</RNText> },
  { value: 'citibanamex', label: 'Citibanamex', bankCode: 'CNX', icon: <RNText style={{ fontSize: 20 }}>💳</RNText> },
  { value: 'santander', label: 'Santander', bankCode: 'SAN', icon: <RNText style={{ fontSize: 20 }}>💰</RNText> },
  { value: 'bbva', label: 'BBVA', bankCode: 'BBVA', icon: <RNText style={{ fontSize: 20 }}>🏦</RNText> },
];

export function BankSelect({
  banks,
  placeholder = 'Seleccionar banco...',
  searchPlaceholder = 'Buscar banco...',
  ...props
}: BankSelectProps) {
  return (
    <Select
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      options={banks}
      {...props}
    />
  );
}

export { DEFAULT_BANKS };
