import type { Color } from "../Color";
import type { ActivatedEffect } from "../effects/activated/ActivatedEffect";
import type { Effect } from "../effects/Effect";

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

  teamEffects: Effect[] = [];
  activatedAbility?: ActivatedEffect;
}
