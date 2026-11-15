import { Rarity } from "../creatures/Creature";
import type { ActivatedEffect } from "../effects/activated/ActivatedEffect";
import { conversionEffects } from "../effects/activated/ConversionEffects";
import { Artifact } from "./Artifact";

export class AdaptiveOmnitool extends Artifact {
  name = 'adaptive-omnitool';

  pool = {
    'any': Rarity.RARE,
    'avishkar': Rarity.COMMON,
  }

  activatedAbility?: ActivatedEffect | undefined = conversionEffects.majorColorlessConversion;
}
