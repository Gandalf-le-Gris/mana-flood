import type { Color } from "../Color";
import { destructionEffects } from '../effects/activated/DestructionEffects';
import { destructionConversionEffect } from '../effects/team/DestructionConversionEffect';
import { turnEndDestructionEffects } from '../effects/shared/TurnEndDestructionEffects';
import { Creature, Rarity } from "./Creature";

export class PerennialBehemoth extends Creature {
  name = 'perennial-behemoth';
  colors = ['G'] as Color[];

  hpModifier = .8;
  damageModifier = .5;
  speed = 3;

  colorAffinity = {
    W: 0,
    U: 0,
    B: 0,
    R: 0,
    G: 6,
    C: 10,
  };

  pool = {
    'dominaria': Rarity.UNCOMMON,
  };
  
  enemyEffects = [turnEndDestructionEffects.majorGreenDestruction];
  teamEffects = [destructionConversionEffect];
  activatedAbility = destructionEffects.greenDestruction;
}
