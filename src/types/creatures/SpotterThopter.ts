import type { Color } from "../Color";
import { destructionEffects } from '../effects/activated/DestructionEffects';
import { destructionRechargeEffects } from '../effects/team/DestructionRechargeEffects';
import { turnEndDestructionEffects } from '../effects/shared/TurnEndDestructionEffects';
import { Creature, Rarity } from "./Creature";

export class SpotterThopter extends Creature {
  name = 'spotter-thopter';
  colors = ['U'] as Color[];

  hpModifier = .8;
  damageModifier = .5;
  speed = 3;

  colorAffinity = {
    W: 0,
    U: 6,
    B: 0,
    R: 0,
    G: 0,
    C: 10,
  };

  pool = {
    'dominaria': Rarity.UNCOMMON,
  };
  
  enemyEffects = [turnEndDestructionEffects.majorBlueDestruction];
  teamEffects = [destructionRechargeEffects.destructionCreatureRecharge];
  activatedAbility = destructionEffects.blueDestruction;
}
