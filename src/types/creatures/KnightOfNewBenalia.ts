import type { Color } from "../Color";
import { healingEffects } from '../effects/activated/HealingEffects';
import { affinityEffects } from '../effects/shared/AffinityEffects';
import { Creature, Rarity } from "./Creature";

export class KnightOfNewBenalia extends Creature {
  name = 'knight-of-new-benalia';
  colors = ['W'] as Color[];

  hpModifier = .6;
  damageModifier = .4;
  speed = 2;

  colorAffinity = {
    W: 10,
    U: 0,
    B: 0,
    R: 0,
    G: 0,
    C: 2,
  };

  pool = {
    'dominaria': Rarity.COMMON,
  };
  
  enemyEffects = [affinityEffects.whiteAffinity];
  activatedAbility = healingEffects.minorHealing;
}
