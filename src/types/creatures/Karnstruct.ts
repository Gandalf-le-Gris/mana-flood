import type { Color } from "../Color";
import { affinityEffects } from '../effects/shared/AffinityEffects';
import { Creature } from "./Creature";

export class Karnstruct extends Creature {
  name = 'karnstruct';
  colors = [] as Color[];

  hpModifier = .5;
  damageModifier = .5;
  speed = 2;

  colorAffinity = {
    W: 0,
    U: 0,
    B: 0,
    R: 0,
    G: 0,
    C: 15,
  };
  
  enemyEffects = [affinityEffects.colorlessGreaterAffinity];

  token = true;
}
