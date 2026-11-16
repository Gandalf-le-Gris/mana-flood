import type { BattleContext } from '@/types/BattleContext';
import { ActivatedEffect } from './ActivatedEffect';

class ShuffleEffect extends ActivatedEffect {
  id = 'shuffle';
  cooldown = 2;
  execute(context: BattleContext) {
    return context.shuffleBoard();
  }
}

export const shuffleEffect = new ShuffleEffect();
