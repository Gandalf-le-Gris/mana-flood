export const colors = ['W', 'U', 'B', 'R', 'G'] as const;

export type Color = typeof colors[number];

export const extendedColors = [...colors, 'C'] as const;

export type ExtendedColor = typeof extendedColors[number];
