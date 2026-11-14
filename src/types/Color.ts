export const colors = ['W', 'U', 'B', 'R', 'G'] as const;

export type Color = typeof colors[number];

export const extendedColors = [...colors, 'C'] as const;

export type ExtendedColor = typeof extendedColors[number];

export function getColorName(color: ExtendedColor): string {
  return {
    W: "white",
    U: "blue",
    B: "black",
    R: "red",
    G: "green",
    C: "colorless",
  }[color];
}
