import { Rarity } from "../creatures/Creature";
import { cataclysmEffect } from '../effects/activated/CataclysmEffect';
import { Artifact } from "./Artifact";

export class UrzasSylex extends Artifact {
  name = 'urza-s-sylex';

  pool = {
    'dominaria': Rarity.BOSS,
  }

  activatedAbility = cataclysmEffect;
}
