import { getColorName, type ExtendedColor } from '@/types/Color';
import { ActivatedEffect } from './ActivatedEffect';
import type { BattleContext } from '@/types/BattleContext';

class ConversionStrength {
  readonly value: number = 0;
  readonly name: string = "";
  readonly cooldown: number = 1;

  static MINOR: ConversionStrength = { value: 3, name: 'minor-convert', cooldown: 3 };
  static NORMAL: ConversionStrength = { value: 6, name: 'convert', cooldown: 5 };
  static MAJOR: ConversionStrength = { value: 12, name: 'major-convert', cooldown: 8 };
}

class ConversionEffect extends ActivatedEffect {
  readonly strength: ConversionStrength;
  readonly color: ExtendedColor;

  constructor(color: ExtendedColor, strength: ConversionStrength) {
    super();
    this.id = `${strength.name}-${getColorName(color)}`;
    this.cooldown = strength.cooldown;
    this.strength = strength;
    this.color = color;
  }

  execute(context: BattleContext): boolean {
    return context.convertOrbs(this.strength.value, this.color);
  }
}

export const conversionEffects = {
  minorWhiteConversion: new ConversionEffect('W', ConversionStrength.MINOR),
  minorBlueConversion: new ConversionEffect('U', ConversionStrength.MINOR),
  minorBlackConversion: new ConversionEffect('B', ConversionStrength.MINOR),
  minorRedConversion: new ConversionEffect('R', ConversionStrength.MINOR),
  minorGreenConversion: new ConversionEffect('G', ConversionStrength.MINOR),
  minorColorlessConversion: new ConversionEffect('C', ConversionStrength.MINOR),
  whiteConversion: new ConversionEffect('W', ConversionStrength.NORMAL),
  blueConversion: new ConversionEffect('U', ConversionStrength.NORMAL),
  blackConversion: new ConversionEffect('B', ConversionStrength.NORMAL),
  redConversion: new ConversionEffect('R', ConversionStrength.NORMAL),
  greenConversion: new ConversionEffect('G', ConversionStrength.NORMAL),
  colorlessConversion: new ConversionEffect('C', ConversionStrength.NORMAL),
  majorWhiteConversion: new ConversionEffect('W', ConversionStrength.MAJOR),
  majorBlueConversion: new ConversionEffect('U', ConversionStrength.MAJOR),
  majorBlackConversion: new ConversionEffect('B', ConversionStrength.MAJOR),
  majorRedConversion: new ConversionEffect('R', ConversionStrength.MAJOR),
  majorGreenConversion: new ConversionEffect('G', ConversionStrength.MAJOR),
  majorColorlessConversion: new ConversionEffect('C', ConversionStrength.MAJOR),
}
