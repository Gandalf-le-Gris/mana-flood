import type { Color, ExtendedColor } from "../Color";
import type { Effect } from '../effects/Effect';
import type { ActivatedEffect } from '../effects/activated/ActivatedEffect';

export class Rarity {
  static COMMON: number = 20;
  static UNCOMMON: number = 10;
  static RARE: number = 4;
  static BOSS: number = 0;
}

export class Creature {
  static baseHp = 200;
  static baseDamage = 100;

  name: string = 'undefined';
  colors: Color[] = [];

  hpModifier: number = 1;
  damageModifier: number = 1;
  speed: number = 1;
  timer: number = 1;

  hp: number = 0;
  colorAffinity: Record<ExtendedColor, number> = {
    W: 0,
    U: 0,
    B: 0,
    R: 0,
    G: 0,
    C: 0,
  }

  pool: Record<string, number> = {};

  enemyEffects: Effect[] = [];
  teamEffects: Effect[] = [];
  activatedAbility?: ActivatedEffect;
}
