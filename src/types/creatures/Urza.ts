import type { Color } from "../Color";
import { lordHighArtificerEffect } from '../effects/activated/LordHighArtificerEffect';
import { artifactLockEffect } from '../effects/enemy/ArtifactLockEffect';
import { artifactRechargeEffect } from '../effects/team/ArtifactRecharge';
import { Creature, Rarity } from "./Creature";

export class Urza extends Creature {
  name = 'urza';
  colors = ['U'] as Color[];

  hpModifier = 1.2;
  damageModifier = .8;
  speed = 3;

  colorAffinity = {
    W: 5,
    U: 10,
    B: 3,
    R: 2,
    G: 2,
    C: 10,
  };

  pool = {
    'dominaria': Rarity.BOSS,
  };
  
  teamEffects = [artifactRechargeEffect];
  enemyEffects = [artifactLockEffect];
  activatedAbility = lordHighArtificerEffect;
}
