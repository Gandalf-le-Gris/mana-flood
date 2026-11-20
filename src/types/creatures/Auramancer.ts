import type { Color } from "../Color";
import { craftingEffects } from '../effects/activated/CraftingEffects';
import { affinityEffects } from '../effects/shared/AffinityEffects';
import { Creature, Rarity } from "./Creature";

export class Auramancer extends Creature {
  name = 'auramancer';
  colors = ['W'] as Color[];

  hpModifier = .7;
  damageModifier = .3;
  speed = 3;

  colorAffinity = {
    W: 8,
    U: 2,
    B: 0,
    R: 0,
    G: 0,
    C: 0,
  };

  pool = {
    'dominaria': Rarity.COMMON,
  };
  
  enemyEffects = [affinityEffects.whiteAffinity];
  activatedAbility = craftingEffects.minorEnchantmentCrafting;
}
