import type { Color } from "../Color";
import { destructionEffects } from '../effects/activated/DestructionEffects';
import { destructionDamageEffect } from '../effects/team/DestructionDamageEffect';
import { turnEndDestructionEffects } from '../effects/shared/TurnEndDestructionEffects';
import { Creature, Rarity } from "./Creature";

export class ForgefireAutomaton extends Creature {
  name = 'forgefire-automaton';
  colors = ['B'] as Color[];

  hpModifier = .5;
  damageModifier = .8;
  speed = 1;

  colorAffinity = {
    W: 0,
    U: 0,
    B: 6,
    R: 3,
    G: 0,
    C: 7,
  };

  pool = {
    'dominaria': Rarity.UNCOMMON,
  };
  
  enemyEffects = [turnEndDestructionEffects.majorBlackDestruction];
  teamEffects = [destructionDamageEffect];
  activatedAbility = destructionEffects.blackDestruction;
}
