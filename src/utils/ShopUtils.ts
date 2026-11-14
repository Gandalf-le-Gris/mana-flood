import type { Game, ShopContent } from "@/types/Game";
import { choice } from "./ArrayUtils";
import { ArtifactUtils } from "./ArtifactUtils";

export class ShopUtils {
  static getShop(game: Game): ShopContent {
    const shopContent: ShopContent = {};
    // if (Math.random() < .5) {
      shopContent.creature = choice(game.currentEnemies);
    // } else {
      shopContent.artifact = ArtifactUtils.getRandomArtifact(game.plane);
    // }
    return shopContent;
  }
}
