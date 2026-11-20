import type { Color } from "../Color";
import { sacrificeDamageEffects } from '../effects/activated/SacrificeDamageEffects';
import { affinityEffects } from '../effects/shared/AffinityEffects';
import { Creature, Rarity } from "./Creature";

export class CabalPaladin extends Creature {
  name = 'cabal-paladin';
  colors = ['B'] as Color[];

  hpModifier = .3;
  damageModifier = .7;
  speed = 1;

  colorAffinity = {
    W: 2,
    U: 0,
    B: 10,
    R: 0,
    G: 0,
    C: 0,
  };

  pool = {
    'dominaria': Rarity.COMMON,
  };

  enemyEffects = [affinityEffects.blackAffinity];
  activatedAbility = sacrificeDamageEffects.minorSacrificeDamage;
}
