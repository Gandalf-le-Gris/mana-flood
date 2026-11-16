import type { Color } from "../Color";
import { shuffleEffect } from '../effects/activated/ShuffleEffect';
import { affinityEffects } from '../effects/shared/AffinityEffects';
import { Creature, Rarity } from "./Creature";

export class AcademyJourneymage extends Creature {
  name = 'academy-journeymage';
  colors = ['U'] as Color[];

  hpModifier = .6;
  damageModifier = .4;
  speed = 2;

  colorAffinity = {
    W: 0,
    U: 10,
    B: 0,
    R: 0,
    G: 0,
    C: 2,
  };

  pool = {
    'dominaria': Rarity.COMMON,
  };
  
  enemyEffects = [affinityEffects.blueAffinity];
  activatedAbility = shuffleEffect;
}
