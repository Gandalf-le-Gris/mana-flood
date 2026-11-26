import { Rarity } from "../creatures/Creature";
import { affinityAnthemEffects } from '../effects/shared/AffinityAnthemEffects';
import { Artifact } from "./Artifact";

export class WornPowerstone extends Artifact {
  name = 'worn-powerstone';

  pool = {
    'dominaria': Rarity.UNCOMMON,
  }

  teamEffects = [affinityAnthemEffects.minorAffinityAnthemTeamColorless];
}
