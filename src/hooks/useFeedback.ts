import { feedback } from '@/services/feedback/feedback.service';
import type {
  FeedbackOptions,
  PromiseFeedbackOptions,
  ToastId,
} from '@/services/feedback/feedback.types';

export function useFeedback() {
  return {
    success: (options: Omit<FeedbackOptions, 'type'>) => feedback.success(options),
    error: (options: Omit<FeedbackOptions, 'type'>) => feedback.error(options),
    info: (options: Omit<FeedbackOptions, 'type'>) => feedback.info(options),
    warning: (options: Omit<FeedbackOptions, 'type'>) => feedback.warning(options),
    loading: (options: { title: string; description?: string; duration?: number }) =>
      feedback.loading(options),
    dismiss: (id: ToastId) => feedback.dismiss(id),
    dismissAll: () => feedback.dismissAll(),
    promise: <T,>(options: PromiseFeedbackOptions<T>) => feedback.promise(options),
    copy: (title?: string) => feedback.copy(title),
  };
}

export type UseFeedbackReturn = ReturnType<typeof useFeedback>;
