import type { Enchantment } from "./Enchantment";
import { FertileGround } from './FertileGround';
import { MirarisWake } from "./MirarisWake";
import { Pacifism } from './Pacifism';
import { TeferisTutelage } from './TeferisTutelage';

export const enchantments: typeof Enchantment[] = [
  MirarisWake,
  Pacifism,
  TeferisTutelage,
  FertileGround,
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
