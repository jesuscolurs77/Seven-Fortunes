import LottieView from 'lottie-react-native';
import type { LottieViewProps } from 'lottie-react-native';
import type { ViewStyle } from 'react-native';

export type LottieAnimationSource = LottieViewProps['source'];

export interface LottieAnimationProps {
  source: LottieAnimationSource;
  width?: number;
  height?: number;
  autoPlay?: boolean;
  loop?: boolean;
  speed?: number;
  progress?: number;
  resizeMode?: 'cover' | 'contain' | 'center';
  colorFilters?: Array<{ keypath: string; color: string }>;
  onAnimationFinish?: (isCancelled: boolean) => void;
  onAnimationFailure?: (error: string) => void;
  onAnimationLoaded?: () => void;
  style?: ViewStyle;
}

export function LottieAnimation({
  source,
  width = 120,
  height = 120,
  autoPlay = true,
  loop = true,
  speed = 1,
  progress,
  resizeMode = 'contain',
  colorFilters,
  onAnimationFinish,
  onAnimationFailure,
  onAnimationLoaded,
  style,
}: LottieAnimationProps) {
  return (
    <LottieView
      source={source}
      autoPlay={autoPlay}
      loop={loop}
      speed={speed}
      progress={progress}
      resizeMode={resizeMode}
      colorFilters={colorFilters}
      onAnimationFinish={onAnimationFinish}
      onAnimationFailure={onAnimationFailure}
      onAnimationLoaded={onAnimationLoaded}
      style={[{ width, height }, style]}
    />
  );
}
