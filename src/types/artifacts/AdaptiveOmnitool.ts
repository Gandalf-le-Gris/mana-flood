import type { Color } from '../Color';
import { Rarity } from "../creatures/Creature";
import { affinityAnthemEffects } from '../effects/shared/AffinityAnthemEffects';
import { Artifact } from "./Artifact";

export class AdaptiveOmnitool extends Artifact {
  name = 'adaptive-omnitool';
  colors = ['W', 'U', 'B', 'R', 'G'] as Color[];

  pool = {
    'avishkar': Rarity.COMMON,
  }

  teamEffects = [affinityAnthemEffects.minorAffinityAnthemSelfAll];
}
