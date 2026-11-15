import type { Game, ShopContent } from "@/types/Game";
import { choice } from "./ArrayUtils";
import { ArtifactUtils } from "./ArtifactUtils";
import { EnchantmentUtils } from "./EnchantmentsUtils";

export class ShopUtils {
  static getShop(game: Game): ShopContent {
    const shopContent: ShopContent = {};
    shopContent.creature = choice(game.currentEnemies);
    shopContent.artifact = ArtifactUtils.getRandomArtifact(game.plane);
    shopContent.enchantment = EnchantmentUtils.getRandomEnchantment(game.plane);
    return shopContent;
  }
}
