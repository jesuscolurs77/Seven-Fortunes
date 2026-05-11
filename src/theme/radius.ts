export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

export const radiusUsage = {
  chip: radius.sm,
  card: radius.md,
  input: radius.md,
  button: radius.sm,
  modal: radius['2xl'],
  sheet: radius.xl,
  avatar: radius.full,
  icon: radius.sm,
} as const;

export type RadiusKey = keyof typeof radius;
