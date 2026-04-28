import { Artifact, Rarity } from "./Artifact";

export class AdaptiveOmnitool extends Artifact {
  name = 'adaptive-omnitool';

  pool = {
    'any': Rarity.RARE,
    'avishkar': Rarity.COMMON,
  }
}
