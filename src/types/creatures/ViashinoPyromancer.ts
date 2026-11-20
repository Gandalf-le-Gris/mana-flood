import type { Color } from "../Color";
import { damageEffects } from '../effects/activated/DamageEffects';
import { affinityEffects } from '../effects/shared/AffinityEffects';
import { Creature, Rarity } from "./Creature";

export class ViashinoPyromancer extends Creature {
  name = 'viashino-pyromancer';
  colors = ['R'] as Color[];

  hpModifier = .4;
  damageModifier = .6;
  speed = 1;

  colorAffinity = {
    W: 0,
    U: 0,
    B: 0,
    R: 10,
    G: 2,
    C: 0,
  };

  pool = {
    'dominaria': Rarity.COMMON,
  };

  enemyEffects = [affinityEffects.redAffinity];
  activatedAbility = damageEffects.minorDamage;
}
