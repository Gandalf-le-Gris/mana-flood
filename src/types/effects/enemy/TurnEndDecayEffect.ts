import type { BattleContext } from '@/types/BattleContext';
import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectTrigger';

class TurnEndDecayEffect extends Effect {
  trigger = EffectTrigger.TURN_END;
  id = 'enemy.turn-end-decay';
  effect = async (context: BattleContext) => {
    await context.damageTeam(Math.floor(context.game.hp / 10));
  }
}

export const turnEndDecayEffect = new TurnEndDecayEffect();
