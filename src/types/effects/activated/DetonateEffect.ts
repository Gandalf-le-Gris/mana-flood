import type { BattleContext } from "@/types/BattleContext";
import { ActivatedEffect } from "./ActivatedEffect";
import type { EventParams } from '@/utils/GameUtils';

class DetonateEffect extends ActivatedEffect {
  cooldown = 1;
  id = 'detonate';

  async execute(context: BattleContext, { sourceIndex }: EventParams): Promise<boolean> {
    if (sourceIndex == undefined) return false;
    context.game.artifacts[sourceIndex] = null;
    context.game.artifactCooldowns[sourceIndex] = 0;
    return await context.destroyOrbs(30);
  }
}

export const detonateEffect = new DetonateEffect();
