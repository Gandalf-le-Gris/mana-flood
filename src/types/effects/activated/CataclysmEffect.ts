import type { BattleContext } from "@/types/BattleContext";
import { ActivatedEffect } from "./ActivatedEffect";
import type { EventParams } from '@/utils/GameUtils';

class CataclysmEffect extends ActivatedEffect {
  cooldown = 1;
  id = 'cataclysm';

  async execute(context: BattleContext, { sourceIndex }: EventParams): Promise<boolean> {
      if (sourceIndex == undefined) return false;
      context.game.artifacts[sourceIndex] = null;
      context.game.artifactCooldowns[sourceIndex] = 0;
      await context.destroyOrbs(30);
      await context.damageAllEnemies(1000);
      return true;
    }
}

export const cataclysmEffect = new CataclysmEffect();
