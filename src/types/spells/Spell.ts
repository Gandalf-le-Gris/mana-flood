import type { Color } from "../Color";
import { Rarity } from "../creatures/Creature";
import type { ActivatedEffect } from "../effects/activated/ActivatedEffect";
import { conversionEffects } from "../effects/activated/ConversionEffects";

export class Spell {
  name: string = 'undefined';
  colors: Color[] = [];

  pool: Record<string, Rarity> = {};

  activatedAbility: ActivatedEffect = conversionEffects.colorlessConversion;
}
