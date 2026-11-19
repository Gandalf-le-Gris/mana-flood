import { buildCreature } from "@/types/creatures/creatures";
import type { Game } from "@/types/Game";
import { CreatureUtils } from "./CreatureUtils";
import type { ExtendedColor } from "@/types/Color";
import { Creature } from "@/types/creatures/Creature";
import { ShopUtils } from './ShopUtils';
import { sleep } from './TsUtils';
import { buildArtifact } from "@/types/artifacts/artifacts";
import { buildEnchantment } from "@/types/enchantments/enchantments";

interface MatchGroup {
  color: ExtendedColor;
  size: number;
}

export class GameUtils {
  static FINAL_FLOOR: number = 100;

  static initGame(game: Game) {
    game.hp = GameUtils.getTotalHp(game);
    game.cooldowns = [0, 0, 0, 0, 0];
    game.artifactCooldowns = [0, 0, 0, 0, 0];

    if (game.floor === 0) {
      game.currentEnemies = [];
      game.shopContent = {};
    } else {
      game.floor = 0;
      GameUtils.populateFloor(game);
    }
  }

  static populateFloor(game: Game) {
    if (game.floor % 10 !== 9) {
      game.currentEnemies = Array.from(
        { length: 1 + Number(game.floor % 10 > 2) + Number(game.floor % 10 > 5) },
        () => CreatureUtils.getRandomCreature(game.plane),
      );
    } else {
      const boss = CreatureUtils.getRandomBoss(game.plane);
      const enemies = buildCreature(boss).summons;
      enemies.splice(Math.floor(enemies.length / 2), 0, boss);
      game.currentEnemies = enemies;
    }
    game.shopContent = ShopUtils.getShop(game);
    game.hp = Math.min(game.hp, GameUtils.getTotalHp(game));
    game.floor++;
  }

  static async nextFloor(game: Game) {
    await sleep(500);
    GameUtils.populateFloor(game);
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
    return CreatureUtils.getEnemyDamage(attacker, game);
  }

  static getActiveEffects(game: Game) {
    return game.currentEnemies.flatMap(e => buildCreature(e).enemyEffects)
      .concat(game.team.flatMap(c => c ? buildCreature(c).teamEffects : []))
      .concat(game.artifacts.flatMap(a => a ? buildArtifact(a).teamEffects : []))
      .concat(game.enchantments.flatMap(a => a ? buildEnchantment(a).teamEffects : []))
      .filter(e => !e.activeCondition || e.activeCondition(game));
  }

  static isEffectActive(game: Game, effectId: string) {
    return this.getActiveEffects(game)
      .find(e => e.id === effectId);
  }
}
