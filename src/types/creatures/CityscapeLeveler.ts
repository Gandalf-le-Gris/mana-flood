import type { Color } from "../Color";
import { destructionEffects } from '../effects/activated/DestructionEffects';
import { turnEndDestructionEffects } from '../effects/shared/TurnEndDestructionEffects';
import { Creature, Rarity } from "./Creature";

export class CityscapeLeveler extends Creature {
  name = 'cityscape-leveler';
  colors = [] as Color[];

  hpModifier = .7;
  damageModifier = .9;
  speed = 4;

  colorAffinity = {
    W: 0,
    U: 0,
    B: 0,
    R: 0,
    G: 0,
    C: 20,
  };

  pool = {
    'dominaria': Rarity.RARE,
  };

  enemyEffects = [turnEndDestructionEffects.majorColorlessDestruction];
  teamEffects = [turnEndDestructionEffects.majorColorlessDestruction];
  activatedAbility = destructionEffects.majorColorlessDestruction;
}
