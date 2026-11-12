import { buildCreature } from "@/types/creatures/creatures";
import type { Game } from "@/types/Game";
import { CreatureUtils } from "./CreatureUtils";
import type { ExtendedColor } from "@/types/Color";
import { Creature } from "@/types/creatures/Creature";
import { ShopUtils } from './ShopUtils';

interface MatchGroup {
  color: ExtendedColor;
  size: number;
}

export class GameUtils {
  static initGame(game: Game) {
    game.hp = GameUtils.getTotalHp(game);
    GameUtils.nextFloor(game);
  }

  static nextFloor(game: Game) {
    game.floor++;
    game.currentEnemies = Array.from(
      { length: 1 + Number(game.floor % 10 > 3) + Number(game.floor % 10 > 6) },
      () => CreatureUtils.getRandomCreature(game.plane),
    );
    game.shopContent = ShopUtils.getShop(game);
    game.hp = Math.min(game.hp, GameUtils.getTotalHp(game));
  }

  static getTotalHp(game: Game) {
    return game.team
      .filter(c => c)
      .map(c => buildCreature(c!))
      .reduce((acc, x) => CreatureUtils.getHp(x) + acc, 0);
  }

  static getTotalTimer(game: Game): number {
    return 5;
  }

  static computeMatchDamage(game: Game, match: MatchGroup): number {
    return game.team
      .filter(c => c)
      .map(c => buildCreature(c!))
      .reduce((acc, x) => CreatureUtils.getDamage(x, match.color, match.size) + acc, 0);
  }

  static computeEnemyDamage(game: Game, attacker: Creature, enemies: Creature[]) {
    return attacker.damageModifier * Creature.baseDamage;
  }
}
