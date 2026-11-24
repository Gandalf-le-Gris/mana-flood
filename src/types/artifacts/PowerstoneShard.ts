import { Rarity } from "../creatures/Creature";
import { affinityAnthemEffects } from '../effects/shared/AffinityAnthemEffects';
import { Artifact } from "./Artifact";

export class PowerstoneShard extends Artifact {
  name = 'powerstone-shard';

  pool = {
    'any': Rarity.COMMON,
  }

  teamEffects = [affinityAnthemEffects.minorAffinityAnthemSelfColorless];
}
