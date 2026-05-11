import { Platform } from 'react-native';
import { spacing } from './spacing';

export const layout = {
  screenPadding: spacing[4],
  screenPaddingHorizontal: spacing[4],
  sectionGap: spacing[6],
  cardPadding: spacing[5],
  listItemGap: spacing[3],
  headerHeight: 56,
  tabBarHeight: 64,
  bottomSheetHandleHeight: 32,
  modalTopOffset: 24,
  maxContentWidth: 800,
  bottomTabInset: Platform.select({ ios: 50, android: 80 }) ?? 0,
} as const;
