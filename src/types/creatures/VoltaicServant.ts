import type { Color } from "../Color";
import { activatedRechargeArtifactEffects } from '../effects/activated/ActivatedArtifactRechargeEffects';
import { affinityEffects } from '../effects/shared/AffinityEffects';
import { Creature, Rarity } from "./Creature";

export class VoltaicServant extends Creature {
  name = 'voltaic-servant';
  colors = [] as Color[];

  hpModifier = .7;
  damageModifier = .3;
  speed = 3;

  colorAffinity = {
    W: 0,
    U: 0,
    B: 0,
    R: 0,
    G: 0,
    C: 12,
  };

  pool = {
    'dominaria': Rarity.COMMON,
  };
  
  enemyEffects = [affinityEffects.colorlessAffinity];
  activatedAbility = activatedRechargeArtifactEffects.minorRechargeArtifactEffect;
}
