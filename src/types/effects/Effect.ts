import type { ExtendedColor } from '../Color';
import type { Game } from '../Game';
import { EffectTrigger } from './EffectCondition';

export class Effect {
  id: string = "";
  trigger: EffectTrigger = EffectTrigger.NONE;
  activeCondition?: (game: Game) => boolean;

  orbRateModifier?: Partial<Record<ExtendedColor, number>>;

  withId(id: string): Effect {
    this.id = id;
    return this;
  }
}
