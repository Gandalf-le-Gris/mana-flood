import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectCondition';
import type { BattleContext } from '../../BattleContext';
import type { Game } from '@/types/Game';

export abstract class ActivatedEffect extends Effect {
  override trigger = EffectTrigger.TRIGGER;
  cooldown: number = 0;
  condition(game: Game): boolean {
    return true;
  };
  abstract execute(context: BattleContext): boolean;
}
