import type { Color } from "../Color";
import { lordHighArtificerEffect } from '../effects/activated/LordHighArtificerEffect';
import { artifactLockEffect } from '../effects/enemy/ArtifactLockEffect';
import { artifactRechargeEffect } from '../effects/team/ArtifactRechargeEffect';
import { Creature, Rarity } from "./Creature";

export class Urza extends Creature {
  name = 'urza';
  colors = ['U'] as Color[];

  hpModifier = 1.2;
  damageModifier = .8;
  speed = 3;

  colorAffinity = {
    W: 4,
    U: 8,
    B: 3,
    R: 1,
    G: 1,
    C: 8,
  };

  pool = {
    'dominaria': Rarity.BOSS,
  };
  
  teamEffects = [artifactRechargeEffect];
  enemyEffects = [artifactLockEffect];
  activatedAbility = lordHighArtificerEffect;

  summons = ['karnstruct', 'karnstruct'];
}
