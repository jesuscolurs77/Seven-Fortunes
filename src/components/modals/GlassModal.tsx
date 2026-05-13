import React from 'react';
import {
  View,
  StyleSheet,
  type ViewStyle,
  Modal,
  TouchableWithoutFeedback,
  Text as RNText,
} from 'react-native';

import {
  glassFallbacks,
  radius,
  spacing,
  palette,
  opacity,
} from '@/theme';
import { PressableScale } from '@/components/common/PressableScale';

export interface GlassModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
  showCloseButton?: boolean;
}

export function GlassModal({
  visible,
  onClose,
  title,
  children,
  style,
  showCloseButton = true,
}: GlassModalProps) {
  const containerStyle: ViewStyle[] = [
    styles.modalContainer,
    ...(style ? [style] : []),
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.wrapper}>
        <View style={containerStyle}>
          <View style={[StyleSheet.absoluteFill, glassFallbacks.modal]} />
          <View style={styles.content}>
            {title && (
              <View style={styles.header}>
                <RNText style={styles.title}>{title}</RNText>
                {showCloseButton && (
                  <PressableScale
                    style={styles.closeButton}
                    onPress={onClose}
                    activeScale={0.9}
                  >
                    <RNText style={styles.closeIcon}>×</RNText>
                  </PressableScale>
                )}
              </View>
            )}
            <View style={styles.body}>
              {children}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing[6],
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  content: {
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing[5],
    paddingTop: spacing[5],
    paddingBottom: spacing[3],
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: palette.white,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: `rgba(255, 255, 255, ${opacity[10]})`,
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: '400',
    color: palette.white,
    lineHeight: 28,
  },
  body: {
    padding: spacing[5],
    paddingTop: spacing[2],
  },
});
