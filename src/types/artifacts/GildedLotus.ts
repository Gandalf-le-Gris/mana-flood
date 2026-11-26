import type { Color } from '../Color';
import { Rarity } from "../creatures/Creature";
import { affinityAnthemEffects } from '../effects/shared/AffinityAnthemEffects';
import { Artifact } from "./Artifact";

export class GildedLotus extends Artifact {
  name = 'gilded-lotus';
  colors = ['W', 'U', 'B', 'R', 'G'] as Color[];

  pool = {
    'dominaria': Rarity.RARE,
  }

  teamEffects = [affinityAnthemEffects.affinityAnthemTeamAll];
}
