import type { BattleContext } from '@/types/BattleContext';
import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectTrigger';
import { buildArtifact } from '@/types/artifacts/artifacts';

class BattleStartArtifactDelayEffect extends Effect {
  trigger = EffectTrigger.BATTLE_START;
  id = 'enemy.battle-start-artifact-delay';
  effect = async (context: BattleContext) => {
    for (let i = 0; i < context.game.artifacts.length; i++) {
      if (context.game.artifacts[i] && buildArtifact(context.game.artifacts[i]!).activatedAbility) {
        context.rechargeArtifact(i, -3);
      }
    }
  }
}

export const battleStartArtifactDelayEffect = new BattleStartArtifactDelayEffect();
