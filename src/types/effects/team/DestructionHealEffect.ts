import type { BattleContext } from '@/types/BattleContext';
import type { EventParams } from '@/utils/GameUtils';
import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectTrigger';

class DestructionHealEffect extends Effect {
  trigger = EffectTrigger.DESTRUCTION;
  id = 'team.destruction-heal'

  effect = async (context: BattleContext, params: EventParams) => {
    await context.healTeam(params.amount ?? 0);
  }
}

export const destructionHealEffect = new DestructionHealEffect();