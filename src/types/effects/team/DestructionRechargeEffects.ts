import type { BattleContext } from '@/types/BattleContext';
import { choiceWithPredicate } from '@/utils/ArrayUtils';
import type { EventParams } from '@/utils/GameUtils';
import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectTrigger';

class DestructionCreatureRechargeEffect extends Effect {
  trigger = EffectTrigger.DESTRUCTION;
  id = 'team.destruction-creature-recharge'

  effect = async (context: BattleContext, params: EventParams) => {
    if ((params.amount ?? 0) >= 10) {
      const [_, index] = choiceWithPredicate(context.game.cooldowns, c => !!c);
      if (index >= 0) {
        await context.rechargeCreature(index, 1);
      }
    }
  }
}

class DestructionArtifactRechargeEffect extends Effect {
  trigger = EffectTrigger.DESTRUCTION;
  id = 'team.destruction-artifact-recharge'

  effect = async (context: BattleContext, params: EventParams) => {
    if ((params.amount ?? 0) >= 10) {
      const [_, index] = choiceWithPredicate(context.game.artifactCooldowns, c => !!c);
      if (index >= 0) {
        await context.rechargeArtifact(index, 1);
      }
    }
  }
}

export const destructionRechargeEffects = {
  destructionCreatureRecharge: new DestructionCreatureRechargeEffect(),
  destructionArtifactRecharge: new DestructionArtifactRechargeEffect(),
};
