import type { BattleContext } from '@/types/BattleContext';
import type { EventParams } from '@/utils/GameUtils';
import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectTrigger';

class DestructionDamageEffect extends Effect {
  trigger = EffectTrigger.DESTRUCTION;
  id = 'team.destruction-damage'

  effect = async (context: BattleContext, params: EventParams) => {
    await context.damageAllEnemies(params.amount ?? 0);
  }
}

export const destructionDamageEffect = new DestructionDamageEffect();