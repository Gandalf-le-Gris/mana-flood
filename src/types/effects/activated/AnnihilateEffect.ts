import type { BattleContext } from "@/types/BattleContext";
import { ActivatedEffect } from "./ActivatedEffect";

class AnnihilateEffect extends ActivatedEffect {
  cooldown = 10;
  id = 'annihilate';

  async execute(context: BattleContext): Promise<boolean> {
    return await context.destroyOrbs(30);
  }
}

export const annihilateEffect = new AnnihilateEffect();
