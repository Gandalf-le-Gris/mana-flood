import type { MatchGroup } from '@/pages/BattleScreen.vue';
import type { BattleContext } from '../BattleContext';
import type { ExtendedColor } from '../Color';
import type { Game } from '../Game';
import { EffectTrigger } from './EffectTrigger';

export class Effect {
  id: string = "";
  trigger: EffectTrigger = EffectTrigger.NONE;
  activeCondition?: (game: Game) => boolean;

  orbRateModifier?: Partial<Record<ExtendedColor, number>>;
  affinityModifier?: Partial<Record<ExtendedColor, [number, number, number]>>;
  matchEffect?: (context: BattleContext, match: MatchGroup) => Promise<void> | void;
  effect?: (context: BattleContext, params?: { sourceIndex: number }) => Promise<void> | void;

  withId(id: string): Effect {
    this.id = id;
    return this;
  }
}
