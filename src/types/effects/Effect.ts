import type { ExtendedColor } from '../Color';
import { EffectCondition } from './EffectCondition';

export class Effect {
  id: string = "";
  condition: EffectCondition = EffectCondition.NONE;

  orbRateModifier?: Partial<Record<ExtendedColor, number>>;
}