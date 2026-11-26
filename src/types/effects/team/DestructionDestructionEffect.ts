import type { BattleContext } from '@/types/BattleContext';
import type { EventParams } from '@/utils/GameUtils';
import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectTrigger';

class DestructionDestructionEffect extends Effect {
  trigger = EffectTrigger.DESTRUCTION;
  id = 'team.destruction-destruction'

  effect = async (context: BattleContext, params: EventParams) => {
    if ((params.amount ?? 0) >= 10) {
      await context.destroyOrbs(4, params.color);
    }
  }
}

export const destructiondestructionEffect = new DestructionDestructionEffect();
