import type { Color } from "../Color";
import { Rarity } from "../creatures/Creature";
import type { ActivatedEffect } from "../effects/activated/ActivatedEffect";
import type { Effect } from "../effects/Effect";

export class Artifact {
  name: string = 'undefined';
  colors: Color[] = [];

  pool: Record<string, Rarity> = {};

  teamEffects: Effect[] = [];
  activatedAbility?: ActivatedEffect;
}
