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
  children: React.ReactNode;
}

export function PressableScale({
  style,
  scale = 0.95,
  activeScale = scale,
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
    };
  }, [pressed, activeScale]);

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
