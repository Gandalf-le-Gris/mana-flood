import type { BattleContext } from '@/types/BattleContext';
import { choiceWithPredicate } from '@/utils/ArrayUtils';
import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectTrigger';

class SpellCreatureRechargeEffect extends Effect {
  trigger = EffectTrigger.SPELL;
  id = 'team.spell-creature-recharge'

  effect = async (context: BattleContext) => {
    const [_, index] = choiceWithPredicate(context.game.cooldowns, c => !!c);
    if (index >= 0) {
      await context.rechargeCreature(index, 3);
    }
  }
}

class SpellArtifactRechargeEffect extends Effect {
  trigger = EffectTrigger.SPELL;
  id = 'team.spell-artifact-recharge'

  effect = async (context: BattleContext) => {
    const [_, index] = choiceWithPredicate(context.game.artifactCooldowns, c => !!c);
    if (index >= 0) {
      await context.rechargeArtifact(index, 3);
    }
  }
}

export const spellRechargeEffects = {
  spellCreatureRecharge: new SpellCreatureRechargeEffect(),
  spellArtifactRecharge: new SpellArtifactRechargeEffect(),
};
