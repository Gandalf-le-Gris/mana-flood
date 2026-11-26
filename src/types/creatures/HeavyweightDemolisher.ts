import type { Color } from "../Color";
import { destructionEffects } from '../effects/activated/DestructionEffects';
import { destructiondestructionEffect } from '../effects/team/DestructionDestructionEffect';
import { turnEndDestructionEffects } from '../effects/shared/TurnEndDestructionEffects';
import { Creature, Rarity } from "./Creature";

export class HeavyweightDemolisher extends Creature {
  name = 'heavyweight-demolisher';
  colors = ['R'] as Color[];

  hpModifier = .6;
  damageModifier = .7;
  speed = 2;

  colorAffinity = {
    W: 0,
    U: 0,
    B: 0,
    R: 6,
    G: 0,
    C: 10,
  };

  pool = {
    'dominaria': Rarity.UNCOMMON,
  };
  
  enemyEffects = [turnEndDestructionEffects.majorRedDestruction];
  teamEffects = [destructiondestructionEffect];
  activatedAbility = destructionEffects.redDestruction;
}
