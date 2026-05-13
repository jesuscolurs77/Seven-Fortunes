export type FeedbackType = 'success' | 'error' | 'info' | 'warning' | 'loading';

export type FeedbackVariant = 'toast' | 'hud' | 'snackbar' | 'inline';

export type FeedbackPriority = 'low' | 'normal' | 'high';

export interface FeedbackOptions {
  title: string;
  description?: string;
  type?: FeedbackType;
  variant?: FeedbackVariant;
  priority?: FeedbackPriority;
  haptic?: boolean;
  duration?: number;
  icon?: string;
  action?: {
    label: string;
    onPress: () => void;
  };
}

export interface PromiseFeedbackOptions<T = unknown> {
  loading: string;
  success: string | ((data: T) => string);
  error: string | ((error: Error) => string);
  promise: Promise<T>;
  haptic?: boolean;
}

export interface HUDConfig {
  title: string;
  icon?: string;
  type?: FeedbackType;
  duration?: number;
  haptic?: boolean;
}

export type ToastId = string | number;
