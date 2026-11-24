import { Rarity } from "../creatures/Creature";
import { craftingEffects } from '../effects/activated/CraftingEffects';
import { Artifact } from "./Artifact";

export class Spellbook extends Artifact {
  name = 'spellbook';

  pool = {
    'any': Rarity.COMMON,
  }

  activatedAbility = craftingEffects.minorSpellCrafting;
}
