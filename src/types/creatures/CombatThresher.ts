import type { Color } from "../Color";
import { destructionEffects } from '../effects/activated/DestructionEffects';
import { destructionHealEffect } from '../effects/team/DestructionHealEffect';
import { turnEndDestructionEffects } from '../effects/shared/TurnEndDestructionEffects';
import { Creature, Rarity } from "./Creature";

export class CombatThresher extends Creature {
  name = 'combat-thresher';
  colors = ['W'] as Color[];

  hpModifier = .6;
  damageModifier = .7;
  speed = 3;

  colorAffinity = {
    W: 6,
    U: 0,
    B: 0,
    R: 0,
    G: 0,
    C: 10,
  };

  pool = {
    'dominaria': Rarity.UNCOMMON,
  };
  
  enemyEffects = [turnEndDestructionEffects.majorWhiteDestruction];
  teamEffects = [destructionHealEffect];
  activatedAbility = destructionEffects.whiteDestruction;
}
