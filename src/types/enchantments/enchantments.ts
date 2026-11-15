import type { Enchantment } from "./Enchantment";
import { MirarisWake } from "./MirarisWake";

export const enchantments: typeof Enchantment[] = [
  MirarisWake,
];

export function buildEnchantment(enchantment: string | Enchantment): Enchantment {
  if (typeof enchantment !== 'string') {
    enchantment = enchantment.name;
  }
  for (const builder of enchantments) {
    const e: Enchantment = new builder();
    if (e.name === enchantment) {
      return e;
    }
  }
  throw `Enchantment not found: ${enchantment}`
}
