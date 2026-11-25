import type { BattleContext } from '@/types/BattleContext';
import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectTrigger';
import { choiceWithPredicate } from '@/utils/ArrayUtils';

class BattleEndRandomCreatureRechargeEffect extends Effect {
  trigger = EffectTrigger.BATTLE_END;

  id = 'team.battle-end-random-creature-recharge';

  effect = async (context: BattleContext) => {
    const [_, index] = choiceWithPredicate(context.game.cooldowns, c => !!c);
    if (index >= 0) {
      await context.rechargeCreature(index, 1);
    }
  }
}

class BattleEndRandomArtifactRechargeEffect extends Effect {
  trigger = EffectTrigger.BATTLE_END;

  id = 'team.battle-end-random-artifact-recharge';

  effect = async (context: BattleContext) => {
    const [_, index] = choiceWithPredicate(context.game.artifactCooldowns, c => !!c);
    if (index >= 0) {
      await context.rechargeArtifact(index, 1);
    }
  }
}

class BattleEndCreatureRechargeEffect extends Effect {
  trigger = EffectTrigger.BATTLE_END;

  id = 'team.battle-end-creature-recharge';

  effect = async (context: BattleContext, params?: { sourceIndex: number }) => {
    if (params?.sourceIndex != undefined && params.sourceIndex >= 0)
    await context.rechargeCreature(params.sourceIndex, 1);
  }
}

class BattleEndArtifactRechargeEffect extends Effect {
  trigger = EffectTrigger.BATTLE_END;

  id = 'team.battle-end-artifact-recharge';

  effect = async (context: BattleContext, params?: { sourceIndex: number }) => {
    if (params?.sourceIndex != undefined && params.sourceIndex >= 0)
    await context.rechargeArtifact(params.sourceIndex, 1);
  }
}

export const battleEndRechargeEffects = {
  randomCreatureRecharge: new BattleEndRandomCreatureRechargeEffect(),
  randomArtifactRecharge: new BattleEndRandomArtifactRechargeEffect(),
  creatureRecharge: new BattleEndCreatureRechargeEffect(),
  artifactRecharge: new BattleEndArtifactRechargeEffect(),
}
