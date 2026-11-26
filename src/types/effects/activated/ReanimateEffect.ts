import type { BattleContext } from "@/types/BattleContext";
import { ActivatedEffect } from "./ActivatedEffect";
import type { Game } from "@/types/Game";
import { buildCreature } from "@/types/creatures/creatures";
import { GameUtils } from "@/utils/GameUtils";

class ReanimateEffect extends ActivatedEffect {
  cooldown = 25;
  id = 'reanimate';

  async execute(context: BattleContext): Promise<boolean> {
    const creature = this.findReanimationTarget(context.game);
    if (!creature) return false;
    context.game.team[0] = creature;
    context.game.cooldowns[0] = 0;
    context.game.hp = Math.min(GameUtils.getTotalHp(context.game), context.game.hp);
    return true;
  }

  condition = (game: Game) => {
    console.log(game.killedEnemies, this.findReanimationTarget(game))
    return !!this.findReanimationTarget(game);
  }

  findReanimationTarget(game: Game): string | null {
    for (let i = game.killedEnemies.length - 1; i >= 0; i--) {
      console.log(buildCreature(game.killedEnemies[i]))
      if (buildCreature(game.killedEnemies[i]).activatedAbility?.id !== this.id) {
        return game.killedEnemies[i];
      }
    }
    return null;
  }
}

export const reanimateEffect = new ReanimateEffect();
