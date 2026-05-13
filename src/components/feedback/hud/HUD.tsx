import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  ZoomInEasyDown,
  ZoomOutEasyUp,
} from 'react-native-reanimated';

import { palette, radius, semantic, spacing, spring as springConfig } from '@/theme';
import type { FeedbackType, HUDConfig } from '@/services/feedback/feedback.types';

export interface HUDRef {
  show: (config: HUDConfig) => void;
  hide: () => void;
}

const typeIcons: Record<FeedbackType, string> = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
  warning: '⚠',
  loading: '⋯',
};

export const HUD = React.forwardRef<HUDRef>((_props, ref) => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<HUDConfig>({ title: '' });
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useImperativeHandle(ref, () => ({
    show: (cfg: HUDConfig) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setConfig(cfg);
      setVisible(true);
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
      }, cfg.duration ?? 1500);
    },
    hide: () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setVisible(false);
    },
  }));

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!visible) return null;

  const icon = config.icon ?? typeIcons[config.type ?? 'success'];
  const color = config.type === 'error'
    ? semantic.error.default
    : config.type === 'warning'
      ? semantic.warning.default
      : config.type === 'info'
        ? semantic.info.default
        : semantic.success.default;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <Animated.View
        entering={FadeIn.duration(150).springify().damping(springConfig.default.damping)}
        exiting={FadeOut.duration(100)}
        style={styles.backdrop}
      />
      <Animated.View
        entering={ZoomInEasyDown.duration(200).springify().damping(20).stiffness(300)}
        exiting={ZoomOutEasyUp.duration(150)}
        style={styles.hud}
      >
        <View style={[styles.iconBox, { backgroundColor: `${color}20` }]}>
          <Animated.Text style={[styles.icon, { color }]}>
            {icon}
          </Animated.Text>
        </View>
        <Animated.Text style={styles.title}>
          {config.title}
        </Animated.Text>
      </Animated.View>
    </View>
  );
});

HUD.displayName = 'HUD';

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
    elevation: 99999,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  hud: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[5],
    borderRadius: radius.xl,
    backgroundColor: 'rgba(35, 37, 48, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 12,
  },
  iconBox: {
    width: 28,
    height: 28,
    borderRadius: radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 15,
    fontWeight: '600',
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: palette.white,
    letterSpacing: -0.2,
  },
});
