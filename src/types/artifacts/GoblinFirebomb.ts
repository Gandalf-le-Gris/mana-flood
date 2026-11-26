import { Rarity } from "../creatures/Creature";
import { detonateEffect } from '../effects/activated/DetonateEffect';
import { Artifact } from "./Artifact";

export class GoblinFirebomb extends Artifact {
  name = 'goblin-firebomb';

  pool = {
    'dominaria': Rarity.COMMON,
  }

  activatedAbility = detonateEffect;
}
