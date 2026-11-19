import type { MatchGroup } from '@/pages/BattleScreen.vue';
import type { BattleContext } from '@/types/BattleContext';
import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectTrigger';

class ArtifactRechargeEffect extends Effect {
  id = 'team.artifact-recharge';
  trigger = EffectTrigger.MATCH;
  matchEffect = (context: BattleContext, match: MatchGroup) => {
    if (match.color === 'C' && match.size >= 5) {
      const i = context.game.artifactCooldowns.findIndex(c => c > 0);
      if (i >= 0) {
        context.rechargeArtifact(i, 1);
      }
    }
  };
}

export const artifactRechargeEffect = new ArtifactRechargeEffect();
