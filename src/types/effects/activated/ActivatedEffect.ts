import { Effect } from '../Effect';
import { EffectCondition } from '../EffectCondition';
import type { BattleContext } from '../../BattleContext';

export abstract class ActivatedEffect extends Effect {
  override condition = EffectCondition.TRIGGER;
  cooldown: number = 0;
  abstract execute(context: BattleContext): boolean;
}
