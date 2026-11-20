import type { Color } from "../Color";
import { Creature, Rarity } from "./Creature";

export class GrizzlyBears extends Creature {
  name = 'grizzly-bears';
  colors = ['G'] as Color[];

  hpModifier = .7;
  damageModifier = .6;
  speed = 2;

  colorAffinity = {
    W: 0,
    U: 0,
    B: 2,
    R: 0,
    G: 10,
    C: 0,
  };

  pool = {
    'dominaria': Rarity.COMMON,
  };
}
