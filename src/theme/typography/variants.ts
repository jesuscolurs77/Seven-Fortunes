import { TextStyle } from 'react-native';
import { fontFamily } from './family';
import { fontSize, lineHeight, letterSpacing, type TextVariant } from './scale';
import { fontWeight } from './weight';

export type TypographyStyle = TextStyle & {
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  fontWeight: string;
};

export const typography: Record<TextVariant, TypographyStyle> = {
  display: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.display,
    lineHeight: lineHeight.display,
    letterSpacing: letterSpacing.display,
    fontWeight: fontWeight.display,
  },
  h1: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.h1,
    lineHeight: lineHeight.h1,
    letterSpacing: letterSpacing.h1,
    fontWeight: fontWeight.h1,
  },
  h2: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.h2,
    lineHeight: lineHeight.h2,
    letterSpacing: letterSpacing.h2,
    fontWeight: fontWeight.h2,
  },
  h3: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.h3,
    lineHeight: lineHeight.h3,
    letterSpacing: letterSpacing.h3,
    fontWeight: fontWeight.h3,
  },
  title: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.title,
    lineHeight: lineHeight.title,
    letterSpacing: letterSpacing.title,
    fontWeight: fontWeight.title,
  },
  button: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.button,
    lineHeight: lineHeight.button,
    letterSpacing: letterSpacing.button,
    fontWeight: fontWeight.button,
  },
  input: {
    fontFamily: fontFamily.display,
    fontSize: fontSize.input,
    lineHeight: lineHeight.input,
    letterSpacing: letterSpacing.input,
    fontWeight: fontWeight.input,
  },
  body: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    letterSpacing: letterSpacing.body,
    fontWeight: fontWeight.body,
  },
  bodySmall: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.bodySmall,
    lineHeight: lineHeight.bodySmall,
    letterSpacing: letterSpacing.bodySmall,
    fontWeight: fontWeight.bodySmall,
  },
  caption: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption,
    lineHeight: lineHeight.caption,
    letterSpacing: letterSpacing.caption,
    fontWeight: fontWeight.caption,
  },
  label: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.label,
    lineHeight: lineHeight.label,
    letterSpacing: letterSpacing.label,
    fontWeight: fontWeight.label,
  },
  mono: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.mono,
    lineHeight: lineHeight.mono,
    letterSpacing: letterSpacing.mono,
    fontWeight: fontWeight.mono,
  },
};
