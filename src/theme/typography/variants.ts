import { TextStyle } from 'react-native';
import { fontFamily } from './family';
import { fontSize, lineHeight, letterSpacing, type TextVariant } from './scale';
import { fontWeight } from './weight';

export type TypographyStyle = TextStyle;

export const typography: Record<TextVariant, TypographyStyle> = {
  display: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: fontSize.display,
    lineHeight: lineHeight.display,
    letterSpacing: letterSpacing.display,
  },
  pageTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: fontSize.pageTitle,
    lineHeight: lineHeight.pageTitle,
    letterSpacing: letterSpacing.pageTitle,
  },
  h1: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: fontSize.h1,
    lineHeight: lineHeight.h1,
    letterSpacing: letterSpacing.h1,
  },
  sectionTitle: {
    fontFamily: fontFamily.displaySemiBold,
    fontSize: fontSize.sectionTitle,
    lineHeight: lineHeight.sectionTitle,
    letterSpacing: letterSpacing.sectionTitle,
  },
  h2: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.h2,
    lineHeight: lineHeight.h2,
    letterSpacing: letterSpacing.h2,
    fontWeight: fontWeight.h2,
  },
  subtitle: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.subtitle,
    lineHeight: lineHeight.subtitle,
    letterSpacing: letterSpacing.subtitle,
    fontWeight: fontWeight.subtitle,
  },
  subtitleLarge: {
    fontFamily: fontFamily.displayMedium,
    fontSize: fontSize.subtitleLarge,
    lineHeight: lineHeight.subtitleLarge,
    letterSpacing: letterSpacing.subtitleLarge,
  },
  h3: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.h3,
    lineHeight: lineHeight.h3,
    letterSpacing: letterSpacing.h3,
    fontWeight: fontWeight.h3,
  },
  h4: {
    fontFamily: fontFamily.heading,
    fontSize: fontSize.h4,
    lineHeight: lineHeight.h4,
    letterSpacing: letterSpacing.h4,
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
    fontFamily: fontFamily.displaySemiBold,
    fontSize: fontSize.button,
    lineHeight: lineHeight.button,
    letterSpacing: letterSpacing.button,
  },
  input: {
    fontFamily: fontFamily.displayMedium,
    fontSize: fontSize.input,
    lineHeight: lineHeight.input,
    letterSpacing: letterSpacing.input,
  },
  bodyLarge: {
    fontFamily: fontFamily.displayMedium,
    fontSize: fontSize.bodyLarge,
    lineHeight: lineHeight.bodyLarge,
    letterSpacing: letterSpacing.bodyLarge,
  },
  h5: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.h5,
    lineHeight: lineHeight.h5,
    letterSpacing: letterSpacing.h5,
    fontWeight: fontWeight.body,
  },
  body: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    letterSpacing: letterSpacing.body,
    fontWeight: fontWeight.body,
  },
  captionLarge: {
    fontFamily: fontFamily.displayMedium,
    fontSize: fontSize.captionLarge,
    lineHeight: lineHeight.captionLarge,
    letterSpacing: letterSpacing.captionLarge,
  },
  h6: {
    fontFamily: fontFamily.body,
    fontSize: fontSize.h6,
    lineHeight: lineHeight.h6,
    letterSpacing: letterSpacing.h6,
    fontWeight: fontWeight.bodySmall,
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
    fontFamily: fontFamily.displayMedium,
    fontSize: fontSize.label,
    lineHeight: lineHeight.label,
    letterSpacing: letterSpacing.label,
  },
  mono: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.mono,
    lineHeight: lineHeight.mono,
    letterSpacing: letterSpacing.mono,
    fontWeight: fontWeight.mono,
  },
};
