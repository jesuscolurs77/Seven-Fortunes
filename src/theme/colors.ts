export const palette = {
  white: '#FFFFFF',
  gray: {
    5: '#F8F8FA',
    50: '#F0F0F3',
    100: '#E4E5EB',
    200: '#C7C9D3',
    300: '#AEB0BE',
    400: '#9395A9',
    500: '#7B7D95',
    600: '#60647D',
    700: '#4D4F63',
    800: '#363848',
    900: '#232530',
    950: '#1A1B24',
  },
  blue: {
    5: '#F5F7FC',
    50: '#EBF0F9',
    100: '#D7E0F2',
    200: '#C3D1EC',
    300: '#9BB2DF',
    400: '#7493D3',
    500: '#3865C0',
    600: '#274786',
    700: '#1C3360',
    800: '#111E3A',
    900: '#0B1426',
    950: '#060A13',
  },
} as const;

export const semantic = {
  background: {
    primary: palette.gray[950],
    secondary: palette.gray[900],
    tertiary: palette.gray[800],
  },
  surface: {
    primary: palette.gray[900],
    secondary: palette.gray[800],
    tertiary: palette.gray[700],
    overlay: 'rgba(0,0,0,0.5)',
    pressed: 'rgba(255,255,255,0.10)',
  },
  text: {
    primary: palette.white,
    secondary: palette.gray[300],
    muted: palette.gray[500],
    disabled: palette.gray[700],
    inverse: palette.gray[950],
  },
  border: {
    subtle: 'rgba(255,255,255,0.1)',
    default: 'rgba(255,255,255,0.2)',
    input: 'rgba(255,255,255,0.15)',
    inputDefault: 'rgba(255,255,255,0.50)',
    switch: 'rgba(255,255,255,0.30)',
    focus: palette.blue[500],
    error: 'rgba(255,69,58,0.5)',
  },
  brand: {
    primary: palette.blue[500],
    pressed: palette.blue[600],
    muted: 'rgba(56,101,192,0.15)',
    light: palette.blue[400],
    dark: palette.blue[700],
  },
  success: {
    default: '#34C759',
    muted: 'rgba(52,199,89,0.15)',
    dark: '#248A3D',
  },
  warning: {
    default: '#FF9F0A',
    muted: 'rgba(255,159,10,0.15)',
    dark: '#B26A00',
  },
  error: {
    default: '#FF453A',
    muted: 'rgba(255,69,58,0.15)',
    dark: '#B31B1B',
  },
  info: {
    default: '#5AC8FA',
    muted: 'rgba(90,200,250,0.15)',
  },
} as const;

export type ColorTokens = typeof semantic;
