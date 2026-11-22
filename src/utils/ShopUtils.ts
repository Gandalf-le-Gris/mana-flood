import type { Game, ShopContent } from "@/types/Game";
import { choice, shuffle } from "./ArrayUtils";
import { ArtifactUtils } from "./ArtifactUtils";
import { EnchantmentUtils } from "./EnchantmentsUtils";
import { buildCreature } from '@/types/creatures/creatures';
import { SpellUtils } from './SpellUtils';

export class ShopUtils {
  static getShop(game: Game): ShopContent {
    const shopContent: ShopContent = {};
    const options = shuffle(['creature', 'artifact', 'enchantment', 'spell'])
      .slice(0, 1 + Number(Math.random() < .75) + Number(Math.random() < .25));
    if (options.includes('creature'))
      shopContent.creature = choice(game.currentEnemies.filter(e => !buildCreature(e).token));
    if (options.includes('artifact'))
      shopContent.artifact = ArtifactUtils.getRandomArtifact(game.plane);
    if (options.includes('enchantment'))
      shopContent.enchantment = EnchantmentUtils.getRandomEnchantment(game.plane);
    if (options.includes('spell'))
      shopContent.spell = SpellUtils.getRandomSpell(game.plane);
    return shopContent;
  }
}
