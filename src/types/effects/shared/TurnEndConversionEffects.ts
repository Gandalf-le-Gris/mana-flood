import { extendedColors, getColorName, type ExtendedColor } from '@/types/Color';
import type { BattleContext } from '@/types/BattleContext';
import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectTrigger';
import { choice } from '@/utils/ArrayUtils';

class ConversionStrength {
  readonly value: number = 0;
  readonly name: string = "";

  static NORMAL: ConversionStrength = { value: 2, name: 'shared.turn-end-conversion' };
  static MAJOR: ConversionStrength = { value: 3, name: 'shared.turn-end-major-conversion' };
}

class TurnEndConversionEffect extends Effect {
  trigger = EffectTrigger.TURN_END;

  readonly strength: ConversionStrength;
  readonly color: ExtendedColor | null;

  constructor(color: ExtendedColor | null, strength: ConversionStrength) {
    super();
    this.id = `${strength.name}-${color ? getColorName(color) : 'any'}`;
    this.strength = strength;
    this.color = color;
  }

  effect = async (context: BattleContext) => {
    await context.convertOrbs(this.strength.value, this.color ?? choice(extendedColors));
  }
}

export const turnEndConversionEffects = {
  whiteConversion: new TurnEndConversionEffect('W', ConversionStrength.NORMAL),
  blueConversion: new TurnEndConversionEffect('U', ConversionStrength.NORMAL),
  blackConversion: new TurnEndConversionEffect('B', ConversionStrength.NORMAL),
  redConversion: new TurnEndConversionEffect('R', ConversionStrength.NORMAL),
  greenConversion: new TurnEndConversionEffect('G', ConversionStrength.NORMAL),
  colorlessConversion: new TurnEndConversionEffect('C', ConversionStrength.NORMAL),
  anyConversion: new TurnEndConversionEffect(null, ConversionStrength.NORMAL),
  majorWhiteConversion: new TurnEndConversionEffect('W', ConversionStrength.MAJOR),
  majorBlueConversion: new TurnEndConversionEffect('U', ConversionStrength.MAJOR),
  majorBlackConversion: new TurnEndConversionEffect('B', ConversionStrength.MAJOR),
  majorRedConversion: new TurnEndConversionEffect('R', ConversionStrength.MAJOR),
  majorGreenConversion: new TurnEndConversionEffect('G', ConversionStrength.MAJOR),
  majorColorlessConversion: new TurnEndConversionEffect('C', ConversionStrength.MAJOR),
  majorAnyConversion: new TurnEndConversionEffect(null, ConversionStrength.MAJOR),
}
