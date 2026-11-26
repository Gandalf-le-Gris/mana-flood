import { Rarity } from "../creatures/Creature";
import { conversionEffects } from '../effects/activated/ConversionEffects';
import { Artifact } from "./Artifact";

export class SolRing extends Artifact {
  name = 'sol-ring';

  pool = {
    'dominaria': Rarity.UNCOMMON,
  }

  activatedAbility = conversionEffects.colorlessConversion;
}
