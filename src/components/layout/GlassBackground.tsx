import React from 'react';
import { View, StyleSheet, ImageBackground, ImageSourcePropType } from 'react-native';

import { palette, semantic } from '@/theme';

export interface ImageBackgroundWrapperProps {
  children: React.ReactNode;
  source?: ImageSourcePropType;
}

const DEFAULT_BACKGROUND = require('../../img/Background_home.png');

export function ImageBackgroundWrapper({ 
  children, 
  source = DEFAULT_BACKGROUND 
}: ImageBackgroundWrapperProps) {
  return (
    <ImageBackground
      source={source}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.content}>{children}</View>
    </ImageBackground>
  );
}

export interface GlassBackgroundProps {
  children: React.ReactNode;
  variant?: 'finance' | 'gradient' | 'pattern';
}

export function GlassBackground({ children, variant = 'finance' }: GlassBackgroundProps) {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundBase} />
      <View style={[styles.accentCircle, styles.accentBlue]} />
      <View style={[styles.accentCircle, styles.accentPurple]} />
      <View style={[styles.accentCircle, styles.accentGreen]} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: semantic.background.primary,
    position: 'relative',
    overflow: 'hidden',
  },
  backgroundBase: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: palette.gray[950],
  },
  accentCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.3,
  },
  accentBlue: {
    top: -150,
    left: -150,
    backgroundColor: palette.blue[500],
  },
  accentPurple: {
    top: 50,
    right: -200,
    backgroundColor: '#8B5CF6',
  },
  accentGreen: {
    bottom: -300,
    left: '20%',
    backgroundColor: '#10B981',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
