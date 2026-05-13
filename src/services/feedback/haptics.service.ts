import * as Haptics from 'expo-haptics';

import { type FeedbackType } from './feedback.types';

export function triggerSuccess(): void {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch {}
}

export function triggerError(): void {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  } catch {}
}

export function triggerWarning(): void {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  } catch {}
}

export function triggerLight(): void {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch {}
}

export function triggerMedium(): void {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch {}
}

export function triggerHeavy(): void {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  } catch {}
}

export function triggerSelection(): void {
  try {
    Haptics.selectionAsync();
  } catch {}
}

export function triggerForType(type: FeedbackType): void {
  switch (type) {
    case 'success':
      triggerSuccess();
      break;
    case 'error':
      triggerError();
      break;
    case 'warning':
      triggerWarning();
      break;
    case 'info':
      triggerLight();
      break;
    case 'loading':
      break;
  }
}

export function triggerForCopy(): void {
  triggerLight();
}

export type HapticTrigger = typeof triggerSuccess;
