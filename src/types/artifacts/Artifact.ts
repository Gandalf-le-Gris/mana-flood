import type { Color } from "../Color";

export class Rarity {
  static COMMON: number = 20;
  static UNCOMMON: number = 10;
  static RARE: number = 4;
  static BOSS: number = 0;
}

export class Artifact {
  name: string = 'undefined';
  colors: Color[] = [];

  pool: Record<string, number> = {};
}
