import type { BattleContext } from '@/types/BattleContext';
import { ActivatedEffect } from './ActivatedEffect';

class LordHighArtificerEffect extends ActivatedEffect {
  id = 'lord-high-artificer';
  cooldown = 10;
  async execute(context: BattleContext) {
    for (let i = 0; i < context.game.artifactCooldowns.length; i++) {
      if (context.game.artifactCooldowns[i]) {
        await context.rechargeArtifact(i, 9999);
      }
    }
    return true;
  }
}

export const lordHighArtificerEffect = new LordHighArtificerEffect();
