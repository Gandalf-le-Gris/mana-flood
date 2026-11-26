import type { BattleContext } from '@/types/BattleContext';
import type { EventParams } from '@/utils/GameUtils';
import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectTrigger';

class DestructionConversionEffect extends Effect {
  trigger = EffectTrigger.DESTRUCTION;
  id = 'team.destruction-conversion'

  effect = async (context: BattleContext, params: EventParams) => {
    if ((params.amount ?? 0) >= 10 && params.color) {
      await context.convertOrbs(3, params.color);
    }
  }
}

export const destructionConversionEffect = new DestructionConversionEffect();
