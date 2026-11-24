import type { Color } from '../Color';
import { Rarity } from "../creatures/Creature";
import { affinityAnthemEffects } from '../effects/shared/AffinityAnthemEffects';
import { Artifact } from "./Artifact";

export class MossDiamond extends Artifact {
  name = 'moss-diamond';
  colors = ['G'] as Color[];

  pool = {
    'any': Rarity.COMMON,
  }

  teamEffects = [affinityAnthemEffects.minorAffinityAnthemSelfGreen];
}
