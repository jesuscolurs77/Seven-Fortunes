import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import type { View } from 'react-native';

export async function captureAndShare(
  viewRef: React.RefObject<View>,
  options?: { title?: string; fileName?: string }
) {
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      console.warn('Sharing is not available on this device');
      return;
    }

    const uri = await captureRef(viewRef, {
      format: 'png',
      quality: 1,
      fileName: options?.fileName ?? 'receipt',
    });

    await Sharing.shareAsync(uri, {
      mimeType: 'image/png',
      dialogTitle: options?.title ?? 'Share Receipt',
    });
  } catch (error) {
    console.error('Failed to capture or share:', error);
  }
}
