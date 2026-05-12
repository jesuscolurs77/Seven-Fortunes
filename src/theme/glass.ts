import { Platform } from 'react-native';

import { palette } from './colors';

export type GlassEffectStyle = 'regular' | 'clear' | 'none';

export type GlassThemeVariant = 'card' | 'bar' | 'modal' | 'button';

export const glassFallbacks = {
  card: {
    backgroundColor: `rgba(255, 255, 255, 0.18)`,
    borderWidth: 1,
    borderColor: `rgba(255, 255, 255, 0.25)`,
  },
  bar: {
    backgroundColor: `rgba(255, 255, 255, 0.10)`,
    borderWidth: 1,
    borderColor: `rgba(255, 255, 255, 0.20)`,
  },
  modal: {
    backgroundColor: `rgba(255, 255, 255, 0.15)`,
    borderWidth: 1,
    borderColor: `rgba(255, 255, 255, 0.30)`,
  },
  button: {
    default: {
      backgroundColor: `rgba(255, 255, 255, 0.15)`,
    },
    pressed: {
      backgroundColor: `rgba(255, 255, 255, 0.30)`,
    },
    disabled: {
      backgroundColor: `rgba(255, 255, 255, 0.05)`,
    },
  },
};

export const glassTheme = {
  tintColors: {
    light: palette.white,
    dark: '#000000',
  },
  variants: {
    card: {
      effectStyle: 'regular' as GlassEffectStyle,
      tintColor: `rgba(255, 255, 255, 0.05)`,
    },
    bar: {
      effectStyle: 'regular' as GlassEffectStyle,
      tintColor: `rgba(255, 255, 255, 0.03)`,
    },
    modal: {
      effectStyle: 'regular' as GlassEffectStyle,
      tintColor: `rgba(255, 255, 255, 0.08)`,
    },
    button: {
      default: {
        effectStyle: 'regular' as GlassEffectStyle,
      },
      pressed: {
        effectStyle: 'clear' as GlassEffectStyle,
      },
    },
  },
};

export type GlassThemeVariantConfig = typeof glassTheme.variants.card;
