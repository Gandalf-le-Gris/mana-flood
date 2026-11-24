import type { Color } from '../Color';
import { Rarity } from "../creatures/Creature";
import { affinityAnthemEffects } from '../effects/shared/AffinityAnthemEffects';
import { Artifact } from "./Artifact";

export class FireDiamond extends Artifact {
  name = 'fire-diamond';
  colors = ['R'] as Color[];

  pool = {
    'any': Rarity.COMMON,
  }

  teamEffects = [affinityAnthemEffects.minorAffinityAnthemSelfRed];
}
