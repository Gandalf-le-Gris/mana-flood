import type { Color } from '../Color';
import { Rarity } from "../creatures/Creature";
import { affinityAnthemEffects } from '../effects/shared/AffinityAnthemEffects';
import { Artifact } from "./Artifact";

export class MarbleDiamond extends Artifact {
  name = 'marble-diamond';
  colors = ['W'] as Color[];

  pool = {
    'any': Rarity.COMMON,
  }

  teamEffects = [affinityAnthemEffects.minorAffinityAnthemSelfWhite];
}
