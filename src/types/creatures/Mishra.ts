import type { Color } from "../Color";
import { annihilateEffect } from '../effects/activated/AnnihilateEffect';
import { affinityAnthemEffects } from '../effects/shared/AffinityAnthemEffects';
import { destructionDamageEffect } from '../effects/team/DestructionDamageEffect';
import { destructiondestructionEffect } from '../effects/team/DestructionDestructionEffect';
import { Creature, Rarity } from "./Creature";

export class Mishra extends Creature {
  name = 'mishra';
  colors = ['B', 'R'] as Color[];

  hpModifier = .9;
  damageModifier = 1.1;
  speed = 3;

  colorAffinity = {
    W: 0,
    U: 2,
    B: 8,
    R: 10,
    G: 0,
    C: 5,
  };

  pool = {
    'dominaria': Rarity.BOSS,
  };
  
  enemyEffects = [affinityAnthemEffects.hatredAffinityAnthemTeamAll, affinityAnthemEffects.majorAffinityAnthemTeamColorless];
  teamEffects = [destructionDamageEffect, destructiondestructionEffect];
  activatedAbility = annihilateEffect;
}
