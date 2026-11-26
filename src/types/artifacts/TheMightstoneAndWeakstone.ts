import { Rarity } from "../creatures/Creature";
import { destructionEffects } from '../effects/activated/DestructionEffects';
import { affinityAnthemEffects } from '../effects/shared/AffinityAnthemEffects';
import { Artifact } from "./Artifact";

export class TheMightstoneAndWeakstone extends Artifact {
  name = 'the-mightstone-and-weakstone';

  pool = {
    'dominaria': Rarity.RARE,
  }

  teamEffects = [affinityAnthemEffects.majorAffinityAnthemTeamColorless, affinityAnthemEffects.hatredAffinityAnthemTeamAll];
  activatedAbility = destructionEffects.colorlessDestruction;
}
