import type { Rarity } from "@/types/creatures/Creature";
import { spells } from '@/types/spells/spells';
import { PoolUtils } from "./PoolUtils";

export class SpellUtils {
  static getRandomSpell(plane: string, rarity?: Rarity | number): string {
    return PoolUtils.getRandomItem(spells, plane, rarity, 'lightning-bolt');
  }
}
