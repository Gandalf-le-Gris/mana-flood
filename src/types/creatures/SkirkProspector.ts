import type { Color } from "../Color";
import { destructionEffects } from '../effects/activated/DestructionEffects';
import { affinityEffects } from '../effects/shared/AffinityEffects';
import { Creature, Rarity } from "./Creature";

export class SkirkProspector extends Creature {
  name = 'skirk-prospector';
  colors = ['R'] as Color[];

  hpModifier = .4;
  damageModifier = .6;
  speed = 2;

  colorAffinity = {
    W: 0,
    U: 0,
    B: 0,
    R: 10,
    G: 0,
    C: 2,
  };

  pool = {
    'dominaria': Rarity.COMMON,
  };
  
  enemyEffects = [affinityEffects.redAffinity];
  activatedAbility = destructionEffects.minorRedDestruction;
}
