import type { Color } from "../Color";
import { damageEffects } from '../effects/activated/DamageEffects';
import { affinityEffects } from '../effects/shared/AffinityEffects';
import { Creature, Rarity } from "./Creature";

export class ProdigalSorcerer extends Creature {
  name = 'prodigal-sorcerer';
  colors = ['U'] as Color[];

  hpModifier = .4;
  damageModifier = .6;
  speed = 2;

  colorAffinity = {
    W: 0,
    U: 10,
    B: 0,
    R: 3,
    G: 0,
    C: 0,
  };

  pool = {
    'dominaria': Rarity.COMMON,
  };

  enemyEffects = [affinityEffects.blueAffinity];
  activatedAbility = damageEffects.minorDamage;
}
