import type { Game, ShopContent } from "@/types/Game";
import { choice } from "./ArrayUtils";
import { ArtifactUtils } from "./ArtifactUtils";
import { EnchantmentUtils } from "./EnchantmentsUtils";
import { buildCreature } from '@/types/creatures/creatures';

export class ShopUtils {
  static getShop(game: Game): ShopContent {
    const shopContent: ShopContent = {};
    shopContent.creature = choice(game.currentEnemies.filter(e => !buildCreature(e).token));
    shopContent.artifact = ArtifactUtils.getRandomArtifact(game.plane);
    shopContent.enchantment = EnchantmentUtils.getRandomEnchantment(game.plane);
    return shopContent;
  }
}
