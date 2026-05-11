export const duration = {
  fast: 150,
  normal: 250,
  slow: 400,
} as const;

export const easing = {
  default: [0.25, 0.1, 0.25, 1] as const,
  enter: [0.05, 0.7, 0.1, 1] as const,
  exit: [0.25, 0.1, 0.25, 0] as const,
  emphasis: [0.16, 1, 0.3, 1] as const,
} as const;

export const spring = {
  default: { damping: 20, stiffness: 300, mass: 1 },
  gentle: { damping: 25, stiffness: 200, mass: 1 },
  snappy: { damping: 15, stiffness: 400, mass: 0.8 },
} as const;
