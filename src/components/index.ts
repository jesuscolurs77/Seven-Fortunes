// Common
export {
  GlassViewComponent,
  GlassContainerComponent,
  useIsGlassAvailable,
  isGlassModuleLoaded,
} from './common';
export { PressableScale, type PressableScaleProps } from './common/PressableScale';

// Typography
export { Text, type TextColorVariant, type TextComponentProps } from './typography';
export type { TextVariant } from '@/theme';

// Buttons
export { Button, type ButtonVariant, type ButtonSize, type ButtonProps } from './buttons';
export { IconButton, type IconButtonVariant, type IconButtonProps } from './buttons';
export { GlassButton, type GlassButtonProps, GlassContainer } from './buttons';

// Inputs
export { Input, type InputProps } from './inputs';
export { PasswordInput, type PasswordInputProps } from './inputs';
export { CurrencyInput, type CurrencyInputProps } from './inputs';
export { Switch, type SwitchProps } from './inputs';

// Selects
export {
  Select,
  type SelectOption,
  type SelectProps,
} from './selects';
export {
  SelectTrigger,
  type SelectTriggerProps,
} from './selects';
export {
  SelectOptionItem,
  type SelectOptionItemProps,
} from './selects';
export {
  BankSelect,
  DEFAULT_BANKS,
  type BankOption,
  type BankSelectProps,
} from './selects';

// Cards
export {
  Card,
  type CardVariant,
  type CardProps,
  type CardHeaderProps,
  type CardContentProps,
  type CardFooterProps,
} from './cards';
export { GlassCard, type GlassCardProps } from './cards';

// Modals
export { GlassModal, type GlassModalProps } from './modals';

// Navigation
export { GlassNavbar, type GlassNavbarProps } from './navigation';
export {
  GlassBottomBar,
  type GlassBottomBarProps,
  type GlassBottomTabItem,
} from './navigation';
export {
  GlassTabItem,
  type GlassTabItemProps,
  TAB_ITEM_HEIGHT,
  TAB_ITEM_MIN_WIDTH,
  TAB_ICON_SIZE,
} from './navigation';
export {
  LiquidGlassTabBar,
  type LiquidGlassTabItem,
  type LiquidGlassTabBarProps,
  CAPSULE_HEIGHT,
  TAB_BAR_HEIGHT,
  TAB_BAR_PADDING_HORIZONTAL,
} from './navigation';
export {
  FloatingGlassCapsule,
  type FloatingGlassCapsuleProps,
} from './navigation';
export {
  useLiquidTabAnimation,
  type LiquidTabConfig,
  type LiquidSpringConfig,
  type UseLiquidTabAnimationReturn,
} from './navigation';

// Layout
export { Screen, type ScreenProps } from './layout';
export { 
  GlassBackground, 
  type GlassBackgroundProps,
  ImageBackgroundWrapper,
  type ImageBackgroundWrapperProps,
} from './layout';

// Loaders
export {
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  type SkeletonProps,
} from './loaders';

// Lists
export {
  InfiniteScrollList,
  type InfiniteScrollListProps,
} from './lists';
export {
  HorizontalScroll,
  type HorizontalScrollItem,
  type HorizontalScrollProps,
} from './lists';

// Media
export {
  LottieAnimation,
  type LottieAnimationProps,
  type LottieAnimationSource,
} from './media';

// Feedback
export {
  ToastContent,
  type ToastContentProps,
  type ToastType,
} from './feedback';
export {
  HUD,
  type HUDRef,
} from './feedback';
export {
  SnackbarContent,
  type SnackbarContentProps,
} from './feedback';
export {
  InlineFeedback,
  type InlineFeedbackProps,
} from './feedback';
export {
  FeedbackProvider,
  useFeedbackContext,
} from './feedback';
export {
  FallbackCornerBorders,
  FallbackGlassBackground,
  FallbackSubtleInnerGlow,
  type FallbackCornerBordersProps,
  type FallbackGlassStyleProps,
} from './feedback';
