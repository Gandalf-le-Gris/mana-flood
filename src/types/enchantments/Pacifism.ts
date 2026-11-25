import type { Color } from "../Color";
import { Rarity } from "../creatures/Creature";
import { delayEffects } from '../effects/shared/DelayEffects';
import { Enchantment } from "./Enchantment";

export class Pacifism extends Enchantment {
  name = 'pacifism';
  colors = ['W'] as Color[];

  pool = {
    'dominaria': Rarity.COMMON,
  }

  teamEffects = [delayEffects.minorDelay];
}
