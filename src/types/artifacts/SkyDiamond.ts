import type { Color } from '../Color';
import { Rarity } from "../creatures/Creature";
import { affinityAnthemEffects } from '../effects/shared/AffinityAnthemEffects';
import { Artifact } from "./Artifact";

export class SkyDiamond extends Artifact {
  name = 'sky-diamond';
  colors = ['U'] as Color[];

  pool = {
    'any': Rarity.COMMON,
  }

  teamEffects = [affinityAnthemEffects.minorAffinityAnthemSelfBlue];
}
