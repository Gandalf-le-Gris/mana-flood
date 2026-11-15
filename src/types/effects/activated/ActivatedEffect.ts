import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectCondition';
import type { BattleContext } from '../../BattleContext';

export abstract class ActivatedEffect extends Effect {
  override trigger = EffectTrigger.TRIGGER;
  cooldown: number = 0;
  abstract execute(context: BattleContext): boolean;
}
