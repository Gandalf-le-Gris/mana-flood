import type { Color } from "../Color";
import type { Rarity } from "../creatures/Creature";
import type { Effect } from "../effects/Effect";

export class Enchantment {
  name: string = 'undefined';
  colors: Color[] = [];

  pool: Record<string, Rarity> = {};

  teamEffects: Effect[] = [];
}
