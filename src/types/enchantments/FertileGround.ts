import type { Color } from "../Color";
import { Rarity } from "../creatures/Creature";
import { turnEndConversionEffects } from '../effects/shared/TurnEndConversionEffects';
import { Enchantment } from "./Enchantment";

export class FertileGround extends Enchantment {
  name = 'fertile-ground';
  colors = ['G'] as Color[];

  pool = {
    'dominaria': Rarity.COMMON,
  }

  teamEffects = [turnEndConversionEffects.majorAnyConversion];
}
