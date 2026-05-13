import { useCallback, useMemo } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export interface LiquidTabConfig {
  tabCount: number;
  tabWidths: number[];
  tabXOffsets: number[];
  containerWidth: number;
}

export interface LiquidSpringConfig {
  damping: number;
  stiffness: number;
  mass: number;
  velocity: number;
}

const IOS_26_LIQUID_CONFIG: LiquidSpringConfig = {
  damping: 24,
  stiffness: 160,
  mass: 1.0,
  velocity: 0,
};

const DRAG_SNAP_CONFIG: LiquidSpringConfig = {
  damping: 20,
  stiffness: 140,
  mass: 1.1,
  velocity: 0,
};

const LONG_PRESS_CONFIG: LiquidSpringConfig = {
  damping: 18,
  stiffness: 180,
  mass: 0.9,
  velocity: 0,
};

const TAB_ITEM_MIN_WIDTH = 64;

export function useLiquidTabAnimation(config: LiquidTabConfig) {
  const { tabCount, tabWidths, tabXOffsets, containerWidth } = config;

  const translateX = useSharedValue(tabXOffsets[0] || 0);
  const scaleX = useSharedValue(1);
  const capsuleWidth = useSharedValue(tabWidths[0] || 80);
  const capsuleRadius = useSharedValue(20);
  const progress = useSharedValue(0);
  const blurIntensity = useSharedValue(1);
  const highlightOpacity = useSharedValue(0.25);
  const isDragging = useSharedValue(false);
  const isPressed = useSharedValue(false);
  const activeIndex = useSharedValue(0);
  const startX = useSharedValue(0);
  const startWidth = useSharedValue(0);

  const getTargetX = useCallback(
    (index: number) => {
      'worklet';
      return tabXOffsets[index] || 0;
    },
    [tabXOffsets],
  );

  const getTargetWidth = useCallback(
    (index: number) => {
      'worklet';
      return tabWidths[index] || 80;
    },
    [tabWidths],
  );

  const findNearestIndex = useCallback(
    (x: number) => {
      'worklet';
      let nearestIndex = 0;
      let minDistance = Infinity;

      for (let i = 0; i < tabCount; i++) {
        const tabCenter = tabXOffsets[i] + tabWidths[i] / 2;
        const capsuleCenter = x + capsuleWidth.value / 2;
        const distance = Math.abs(capsuleCenter - tabCenter);

        if (distance < minDistance) {
          minDistance = distance;
          nearestIndex = i;
        }
      }

      return nearestIndex;
    },
    [tabCount, tabXOffsets, tabWidths, capsuleWidth],
  );

  const animateToIndex = useCallback(
    (index: number, customConfig?: Partial<LiquidSpringConfig>) => {
      'worklet';
      const targetX = getTargetX(index);
      const targetWidth = getTargetWidth(index);
      const springConfig = { ...IOS_26_LIQUID_CONFIG, ...customConfig };

      activeIndex.value = index;

      translateX.value = withSpring(targetX, springConfig);
      capsuleWidth.value = withSpring(targetWidth, springConfig);
      scaleX.value = withSpring(1, springConfig);
      capsuleRadius.value = withSpring(20, springConfig);
      blurIntensity.value = withSpring(1, springConfig);
      highlightOpacity.value = withSpring(0.25, springConfig);
    },
    [
      getTargetX,
      getTargetWidth,
      activeIndex,
      translateX,
      capsuleWidth,
      scaleX,
      capsuleRadius,
      blurIntensity,
      highlightOpacity,
    ],
  );

  const handlePressIn = useCallback(
    (index: number) => {
      'worklet';
      isPressed.value = true;

      scaleX.value = withSpring(1.05, { damping: 15, stiffness: 250 });
      highlightOpacity.value = withSpring(0.4, { damping: 15, stiffness: 250 });
      blurIntensity.value = withSpring(1.1, { damping: 15, stiffness: 250 });
      capsuleRadius.value = withSpring(18, { damping: 15, stiffness: 250 });
    },
    [isPressed, scaleX, highlightOpacity, blurIntensity, capsuleRadius],
  );

  const handlePressOut = useCallback(
    (index: number) => {
      'worklet';
      isPressed.value = false;
      animateToIndex(index);
    },
    [isPressed, animateToIndex],
  );

  const handleTap = useCallback(
    (index: number, onSelect?: (index: number) => void) => {
      'worklet';
      animateToIndex(index);
      if (onSelect) {
        runOnJS(onSelect)(index);
      }
    },
    [animateToIndex],
  );

  const findIndexAtX = useCallback(
    (x: number) => {
      'worklet';
      for (let i = 0; i < tabCount; i++) {
        const tabLeft = tabXOffsets[i] || 0;
        const tabRight = tabLeft + (tabWidths[i] || TAB_ITEM_MIN_WIDTH);
        if (x >= tabLeft && x <= tabRight) {
          return i;
        }
      }
      return -1;
    },
    [tabCount, tabXOffsets, tabWidths],
  );

  const createTapGesture = useCallback(
    (onSelect?: (index: number) => void) => {
      return Gesture.Tap()
        .maxDuration(1000)
        .onBegin((event) => {
          'worklet';
          const tappedIndex = findIndexAtX(event.x);
          if (tappedIndex >= 0) {
            isPressed.value = true;
            scaleX.value = withSpring(1.05, { damping: 15, stiffness: 250 });
            highlightOpacity.value = withSpring(0.4, { damping: 15, stiffness: 250 });
          }
        })
        .onEnd((event) => {
          'worklet';
          isPressed.value = false;

          const tappedIndex = findIndexAtX(event.x);
          if (tappedIndex >= 0 && tappedIndex !== activeIndex.value) {
            if (onSelect) {
              runOnJS(onSelect)(tappedIndex);
            }
            animateToIndex(tappedIndex);
          } else {
            scaleX.value = withSpring(1, { damping: 15, stiffness: 250 });
            highlightOpacity.value = withSpring(0.25, { damping: 15, stiffness: 250 });
          }
        });
    },
    [findIndexAtX, isPressed, scaleX, highlightOpacity, activeIndex, animateToIndex],
  );

  const createPanGesture = useCallback(
    (onSelect?: (index: number) => void) => {
      return Gesture.Pan()
        .minDistance(8)
        .onBegin((event) => {
          'worklet';
          isDragging.value = true;
          startX.value = translateX.value;
          startWidth.value = capsuleWidth.value;

          scaleX.value = withSpring(1.08, { damping: 14, stiffness: 180 });
          highlightOpacity.value = withSpring(0.45, {
            damping: 14,
            stiffness: 180,
          });
          blurIntensity.value = withSpring(1.2, {
            damping: 14,
            stiffness: 180,
          });
          capsuleRadius.value = withSpring(16, { damping: 14, stiffness: 180 });
        })
        .onUpdate((event) => {
          'worklet';
          const dragFactor = 0.85;
          const rawX = startX.value + event.translationX * dragFactor;

          const minX = tabXOffsets[0] || 0;
          const lastIndex = tabCount - 1;
          const maxX =
            (tabXOffsets[lastIndex] || 0) +
            (tabWidths[lastIndex] || 80) -
            capsuleWidth.value;

          const clampedX = Math.max(minX, Math.min(rawX, maxX));

          translateX.value = clampedX;

          const nearestIdx = findNearestIndex(clampedX);
          const targetW = tabWidths[nearestIdx] || startWidth.value;

          const distanceToTab = Math.abs(
            clampedX - (tabXOffsets[nearestIdx] || 0),
          );
          const maxDistance = containerWidth / tabCount;
          const widthProgress = 1 - Math.min(distanceToTab / maxDistance, 1);

          capsuleWidth.value =
            startWidth.value +
            (targetW - startWidth.value) * widthProgress * 0.5;

          const stretchAmount = interpolate(
            Math.abs(event.translationX),
            [0, 40, 100],
            [1, 1.05, 1.08],
            Extrapolate.CLAMP,
          );

          scaleX.value = stretchAmount;

          capsuleRadius.value = interpolate(
            stretchAmount,
            [1, 1.08],
            [20, 16],
            Extrapolate.CLAMP,
          );

          highlightOpacity.value = interpolate(
            stretchAmount,
            [1, 1.08],
            [0.25, 0.45],
            Extrapolate.CLAMP,
          );

          blurIntensity.value = interpolate(
            stretchAmount,
            [1, 1.08],
            [1, 1.2],
            Extrapolate.CLAMP,
          );

          progress.value = nearestIdx / Math.max(tabCount - 1, 1);
        })
        .onEnd((event) => {
          'worklet';
          isDragging.value = false;

          const nearestIdx = findNearestIndex(translateX.value);
          const previousIndex = activeIndex.value;

          if (onSelect && nearestIdx !== previousIndex) {
            runOnJS(onSelect)(nearestIdx);
          }

          animateToIndex(nearestIdx, DRAG_SNAP_CONFIG);
        });
    },
    [
      tabCount,
      tabXOffsets,
      tabWidths,
      containerWidth,
      isDragging,
      translateX,
      capsuleWidth,
      scaleX,
      capsuleRadius,
      highlightOpacity,
      blurIntensity,
      progress,
      activeIndex,
      startX,
      startWidth,
      animateToIndex,
      findNearestIndex,
    ],
  );

  const capsuleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { scaleX: scaleX.value }],
      width: capsuleWidth.value,
      borderRadius: capsuleRadius.value,
      opacity: interpolate(
        blurIntensity.value,
        [0, 1, 2],
        [0.6, 1, 1],
        Extrapolate.CLAMP,
      ),
    };
  }, [translateX, scaleX, capsuleWidth, capsuleRadius, blurIntensity]);

  const highlightAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: highlightOpacity.value,
      transform: [{ scaleX: scaleX.value }],
    };
  }, [highlightOpacity, scaleX]);

  const createTabBarGesture = useCallback(
    (onSelect?: (index: number) => void) => {
      const tap = createTapGesture(onSelect);
      const pan = createPanGesture(onSelect);
      return Gesture.Race(pan, tap);
    },
    [createTapGesture, createPanGesture],
  );

  return useMemo(
    () => ({
      translateX,
      scaleX,
      capsuleWidth,
      capsuleRadius,
      progress,
      blurIntensity,
      highlightOpacity,
      isDragging,
      isPressed,
      activeIndex,

      capsuleAnimatedStyle,
      highlightAnimatedStyle,

      animateToIndex,
      handlePressIn,
      handlePressOut,
      handleTap,
      createPanGesture,
      createTapGesture,
      createTabBarGesture,

      springConfigs: {
        ios26: IOS_26_LIQUID_CONFIG,
        drag: DRAG_SNAP_CONFIG,
        longPress: LONG_PRESS_CONFIG,
      },
    }),
    [
      translateX,
      scaleX,
      capsuleWidth,
      capsuleRadius,
      progress,
      blurIntensity,
      highlightOpacity,
      isDragging,
      isPressed,
      activeIndex,
      capsuleAnimatedStyle,
      highlightAnimatedStyle,
      animateToIndex,
      handlePressIn,
      handlePressOut,
      handleTap,
      createPanGesture,
      createTapGesture,
      createTabBarGesture,
    ],
  );
}

export type UseLiquidTabAnimationReturn = ReturnType<
  typeof useLiquidTabAnimation
>;
