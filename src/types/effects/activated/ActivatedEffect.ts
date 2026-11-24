import type { Game } from '@/types/Game';
import type { BattleContext } from '../../BattleContext';
import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectTrigger';

export abstract class ActivatedEffect extends Effect {
  override trigger = EffectTrigger.TRIGGER;
  cooldown: number = 0;
  condition(game: Game, params?: { sourceIndex: number }): boolean {
    return true;
  };
  abstract execute(context: BattleContext, params: {
    sourceIndex: number,
    sourceType: 'creature' | 'artifact' | 'spell',
  }): boolean;
}
