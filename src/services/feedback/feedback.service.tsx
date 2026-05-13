import React from 'react';
import { toast } from 'sonner-native';

import { ToastContent } from '@/components/feedback/toast/ToastContent';
import * as haptics from './haptics.service';
import type {
  FeedbackOptions,
  FeedbackType,
  HUDConfig,
  PromiseFeedbackOptions,
  ToastId,
} from './feedback.types';

type HUDHandler = (config: HUDConfig) => void;

let hudHandler: HUDHandler | null = null;

export function registerHUD(handler: HUDHandler): void {
  hudHandler = handler;
}

class FeedbackService {
  private readonly DEFAULT_DURATION = 2500;
  private readonly ERROR_DURATION = 3500;
  private readonly HUD_DURATION = 1500;

  private renderToast(title: string, type: FeedbackType, description?: string, icon?: string, action?: FeedbackOptions['action']) {
    return (
      <ToastContent
        title={title}
        description={description}
        type={type}
        icon={icon}
        action={action}
      />
    );
  }

  private handleHUD(title: string, type: FeedbackType, duration?: number, icon?: string) {
    if (hudHandler) {
      hudHandler({ title, type, duration: duration ?? this.HUD_DURATION, icon });
    }
    return 'hud' as const;
  }

  private toastOptions(variant?: FeedbackOptions['variant'], duration?: number) {
    return {
      position: variant === 'snackbar' ? 'bottom-center' as const : 'top-center' as const,
      duration: duration ?? this.DEFAULT_DURATION,
    };
  }

  success(options: Omit<FeedbackOptions, 'type'> & { type?: 'success' }): ToastId {
    const { title, description, variant, haptic: shouldHaptic, duration, icon, action } = options;
    if (shouldHaptic) haptics.triggerSuccess();
    if (variant === 'hud') return this.handleHUD(title, 'success', duration, icon);

    return toast.custom(
      this.renderToast(title, 'success', description, icon, action),
      this.toastOptions(variant, duration),
    );
  }

  error(options: Omit<FeedbackOptions, 'type'> & { type?: 'error' }): ToastId {
    const { title, description, variant, haptic: shouldHaptic, duration, icon, action } = options;
    if (shouldHaptic) haptics.triggerError();
    if (variant === 'hud') return this.handleHUD(title, 'error', duration, icon);

    return toast.custom(
      this.renderToast(title, 'error', description, icon, action),
      { position: variant === 'snackbar' ? 'bottom-center' : 'top-center', duration: duration ?? this.ERROR_DURATION },
    );
  }

  info(options: Omit<FeedbackOptions, 'type'> & { type?: 'info' }): ToastId {
    const { title, description, variant, haptic: shouldHaptic, duration, icon, action } = options;
    if (shouldHaptic) haptics.triggerLight();
    if (variant === 'hud') return this.handleHUD(title, 'info', duration, icon);

    return toast.custom(
      this.renderToast(title, 'info', description, icon, action),
      this.toastOptions(variant, duration),
    );
  }

  warning(options: Omit<FeedbackOptions, 'type'> & { type?: 'warning' }): ToastId {
    const { title, description, variant, haptic: shouldHaptic, duration, icon, action } = options;
    if (shouldHaptic) haptics.triggerWarning();
    if (variant === 'hud') return this.handleHUD(title, 'warning', duration, icon);

    return toast.custom(
      this.renderToast(title, 'warning', description, icon, action),
      this.toastOptions(variant, duration),
    );
  }

  loading(options: { title: string; description?: string; duration?: number }): ToastId {
    return toast.custom(
      this.renderToast(options.title, 'loading', options.description),
      { position: 'top-center', duration: options.duration ?? Infinity },
    );
  }

  dismiss(id: ToastId): void {
    toast.dismiss(id);
  }

  dismissAll(): void {
    toast.dismiss();
  }

  promise<T>(options: PromiseFeedbackOptions<T>): void {
    const { promise: asyncPromise, loading, success, error, haptic: shouldHaptic } = options;

    const id = toast.custom(
      this.renderToast(loading, 'loading'),
      { position: 'top-center', duration: Infinity },
    );

    asyncPromise
      .then((data) => {
        toast.dismiss(id);
        const message = typeof success === 'function' ? success(data) : success;
        if (shouldHaptic) haptics.triggerSuccess();
        toast.custom(
          this.renderToast(message, 'success'),
          { position: 'top-center', duration: this.DEFAULT_DURATION },
        );
      })
      .catch((err: Error) => {
        toast.dismiss(id);
        const message = typeof error === 'function' ? error(err) : error;
        if (shouldHaptic) haptics.triggerError();
        toast.custom(
          this.renderToast(message, 'error'),
          { position: 'top-center', duration: this.ERROR_DURATION },
        );
      });
  }

  copy(title?: string): void {
    haptics.triggerForCopy();
    if (hudHandler) {
      hudHandler({
        title: title ?? 'Copied',
        type: 'success',
        duration: this.HUD_DURATION,
        icon: 'check',
      });
    }
  }
}

export const feedback = new FeedbackService();
