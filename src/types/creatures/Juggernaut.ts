import type { Color } from "../Color";
import { turnEndDestructionEffects } from '../effects/shared/TurnEndDestructionEffects';
import { Creature, Rarity } from "./Creature";

export class Juggernaut extends Creature {
  name = 'juggernaut';
  colors = [] as Color[];

  hpModifier = .3;
  damageModifier = .7;
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
  
  enemyEffects = [turnEndDestructionEffects.colorlessDestruction];
  teamEffects = [turnEndDestructionEffects.colorlessDestruction];
}
