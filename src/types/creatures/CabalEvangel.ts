import type { Color } from "../Color";
import { sacrificeEffects } from '../effects/activated/SacrificeEffects';
import { affinityEffects } from '../effects/shared/AffinityEffects';
import { Creature, Rarity } from "./Creature";

export class CabalEvangel extends Creature {
  name = 'cabal-evangel';
  colors = ['B'] as Color[];

  hpModifier = .4;
  damageModifier = .6;
  speed = 2;

  colorAffinity = {
    W: 0,
    U: 0,
    B: 10,
    R: 0,
    G: 0,
    C: 2,
  };

  pool = {
    'dominaria': Rarity.COMMON,
  };
  
  enemyEffects = [affinityEffects.blackAffinity];
  activatedAbility = sacrificeEffects.minorSacrifice;
}
