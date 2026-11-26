import type { BattleContext } from '@/types/BattleContext';
import { Effect } from "../Effect";
import { EffectTrigger } from '../EffectTrigger';
import type { EventParams } from '@/utils/GameUtils';

class ArtifactCyclingEffect extends Effect {
  trigger = EffectTrigger.BATTLE_END;

  id = 'team.artifact-cycling';

  effect = async (context: BattleContext, { sourceIndex }: EventParams) => {
    if (sourceIndex != undefined && Math.random() < .5) {
      context.game.artifacts[sourceIndex] = null;
      context.game.artifactCooldowns[sourceIndex] = 0;
      await context.rechargeCreature(sourceIndex, 9999);
    }
  }
}

export const artifactCyclingEffect = new ArtifactCyclingEffect();
