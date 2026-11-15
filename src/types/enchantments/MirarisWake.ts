import type { Color } from "../Color";
import { Rarity } from "../creatures/Creature";
import { enhancedConversionEffect } from "../effects/EnhancedConversionEffect";
import { Enchantment } from "./Enchantment";

export class MirarisWake extends Enchantment {
  name = 'mirari-s-wake';
  colors = ['G', 'W'] as Color[];

  pool = {
    'dominaria': Rarity.RARE,
  }

  teamEffects = [enhancedConversionEffect];
}
