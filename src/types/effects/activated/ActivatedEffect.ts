import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectTrigger';
import type { BattleContext } from '../../BattleContext';
import type { Game } from '@/types/Game';
import type { Artifact } from '@/types/artifacts/Artifact';
import type { Creature } from '@/types/creatures/Creature';

export abstract class ActivatedEffect extends Effect {
  override trigger = EffectTrigger.TRIGGER;
  cooldown: number = 0;
  condition(game: Game): boolean {
    return true;
  };
  abstract execute(context: BattleContext, params: {
    sourceIndex: number,
    sourceType: 'creature' | 'artifact' | 'spell',
  }): boolean;
}
