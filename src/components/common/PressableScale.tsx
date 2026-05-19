import React from 'react';
import { Pressable, type PressableProps, type ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { spring } from '@/theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface PressableScaleProps extends PressableProps {
  scale?: number;
  activeScale?: number;
  activeOpacity?: number;
  children: React.ReactNode;
}

export function PressableScale({
  style,
  scale = 0.95,
  activeScale = scale,
  activeOpacity = 1,
  children,
  ...props
}: PressableScaleProps) {
  const pressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(pressed.value ? activeScale : 1, spring.snappy),
        },
      ],
      opacity: withSpring(pressed.value ? activeOpacity : 1, spring.snappy),
    };
  }, [pressed, activeScale, activeOpacity]);

  return (
    <AnimatedPressable
      style={[animatedStyle, style as ViewStyle]}
      onPressIn={() => (pressed.value = true)}
      onPressOut={() => (pressed.value = false)}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
}
