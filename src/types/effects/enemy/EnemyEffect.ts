import type { ExtendedColor } from "@/types/Color";
import { EffectCondition } from "../EffectCondition";

export class EnemyEffect {
  id: string = "";
  condition: EffectCondition = EffectCondition.NONE;

  orbRateModifier?: Partial<Record<ExtendedColor, number>>;
}
