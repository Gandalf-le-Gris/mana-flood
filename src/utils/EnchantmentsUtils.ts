import { enchantments } from "@/types/enchantments/enchantments";
import { shuffle } from "./ArrayUtils";

export class EnchantmentUtils {
  static getRandomEnchantment(plane: string): string {
    return shuffle(
      enchantments
      .map(c => new c())
      .map(c => Array.from({ length: c.pool[plane] ?? c.pool['any'] ?? 0 }, () => structuredClone(c)))
      .flat()
    )[0].name ?? 'mirari-s-wake';
  }
}
