import React from 'react';
import { View, type ViewProps, type ViewStyle, StyleSheet } from 'react-native';

import { semantic, radiusUsage, elevation, spacing } from '@/theme';
import { cn } from '@/utils/cn';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
}

const cardStyles = StyleSheet.create({
  base: {
    borderRadius: radiusUsage.card,
  },
  elevated: {
    backgroundColor: semantic.surface.primary,
    ...elevation[1],
  },
  outlined: {
    backgroundColor: semantic.background.primary,
    borderWidth: 1,
    borderColor: semantic.border.subtle,
  },
  filled: {
    backgroundColor: semantic.surface.secondary,
  },
});

export function Card({
  children,
  variant = 'elevated',
  className,
  style,
  ...props
}: CardProps) {
  return (
    <View
      className={className}
      style={[cardStyles.base, cardStyles[variant], style as ViewStyle]}
      {...props}
    >
      {children}
    </View>
  );
}

export interface CardHeaderProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

Card.Header = function CardHeader({ children, className, style, ...props }: CardHeaderProps) {
  return (
    <View
      className={cn('pb-0', className)}
      style={[{ padding: spacing[5], paddingBottom: 0 }, style as ViewStyle]}
      {...props}
    >
      {children}
    </View>
  );
};

export interface CardContentProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

Card.Content = function CardContent({ children, className, style, ...props }: CardContentProps) {
  return (
    <View
      className={className}
      style={[{ padding: spacing[5] }, style as ViewStyle]}
      {...props}
    >
      {children}
    </View>
  );
};

export interface CardFooterProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

Card.Footer = function CardFooter({ children, className, style, ...props }: CardFooterProps) {
  return (
    <View
      className={cn('pt-0', className)}
      style={[{ padding: spacing[5], paddingTop: 0 }, style as ViewStyle]}
      {...props}
    >
      {children}
    </View>
  );
};
