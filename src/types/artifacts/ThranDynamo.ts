import { Rarity } from "../creatures/Creature";
import { conversionEffects } from '../effects/activated/ConversionEffects';
import { affinityAnthemEffects } from '../effects/shared/AffinityAnthemEffects';
import { Artifact } from "./Artifact";

export class ThranDynamo extends Artifact {
  name = 'thran-dynamo';

  pool = {
    'dominaria': Rarity.RARE,
  }

  teamEffects = [affinityAnthemEffects.minorAffinityAnthemTeamColorless];
  activatedAbility = conversionEffects.majorColorlessConversion;
}
