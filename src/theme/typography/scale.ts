export const fontSize = {
  display: 48,
  h1: 36,
  h2: 24,
  h3: 20,
  title: 17,
  button: 18,
  input: 16,
  body: 15,
  bodySmall: 13,
  caption: 12,
  label: 11,
  mono: 13,
} as const;

export const lineHeight = {
  display: 54,
  h1: 42,
  h2: 30,
  h3: 26,
  title: 22,
  button: 22,
  input: 22,
  body: 20,
  bodySmall: 18,
  caption: 16,
  label: 14,
  mono: 18,
} as const;

export const letterSpacing = {
  display: -1,
  h1: -0.5,
  h2: -0.3,
  h3: -0.2,
  title: 0,
  button: 0,
  input: 0,
  body: 0,
  bodySmall: 0,
  caption: 0.2,
  label: 0.5,
  mono: 0,
} as const;

export type TextVariant = keyof typeof fontSize;
