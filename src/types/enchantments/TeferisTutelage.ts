import type { Color } from "../Color";
import { Rarity } from "../creatures/Creature";
import { battleEndRechargeEffects } from '../effects/shared/BattleEndRechargeEffects';
import { Enchantment } from "./Enchantment";

export class TeferisTutelage extends Enchantment {
  name = 'teferi-s-tutelage';
  colors = ['U'] as Color[];

  pool = {
    'dominaria': Rarity.COMMON,
  }

  teamEffects = [battleEndRechargeEffects.randomCreatureRecharge, battleEndRechargeEffects.randomArtifactRecharge];
}
