import { enchantments } from "@/types/enchantments/enchantments";
import type { Rarity } from "@/types/creatures/Creature";
import { PoolUtils } from "./PoolUtils";

export class EnchantmentUtils {
  static getRandomEnchantment(plane: string, rarity?: Rarity | number): string {
    return PoolUtils.getRandomItem(enchantments, plane, rarity, 'mirari-s-wake');
  }
}
