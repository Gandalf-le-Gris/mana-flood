import { getColorName, type ExtendedColor } from '@/types/Color';
import { ActivatedEffect } from './ActivatedEffect';
import type { BattleContext } from '@/types/BattleContext';

class DestructionStrength {
  readonly value: number = 0;
  readonly name: string = "";
  readonly cooldown: number = 1;

  static MINOR: DestructionStrength = { value: 5, name: 'minor-destruction', cooldown: 3 };
  static NORMAL: DestructionStrength = { value: 10, name: 'destruction', cooldown: 5 };
  static MAJOR: DestructionStrength = { value: 15, name: 'major-destruction', cooldown: 7 };
}

class DestructionEffect extends ActivatedEffect {
  readonly strength: DestructionStrength;
  readonly color: ExtendedColor;

  constructor(color: ExtendedColor, strength: DestructionStrength) {
    super();
    this.id = `${strength.name}-${getColorName(color)}`;
    this.cooldown = strength.cooldown;
    this.strength = strength;
    this.color = color;
  }

  execute(context: BattleContext): boolean {
    return context.destroyOrbs(this.strength.value, this.color);
  }
}

export const destructionEffects = {
  minorWhiteDestruction: new DestructionEffect('W', DestructionStrength.MINOR),
  minorBlueDestruction: new DestructionEffect('U', DestructionStrength.MINOR),
  minorBlackDestruction: new DestructionEffect('B', DestructionStrength.MINOR),
  minorRedDestruction: new DestructionEffect('R', DestructionStrength.MINOR),
  minorGreenDestruction: new DestructionEffect('G', DestructionStrength.MINOR),
  minorColorlessDestruction: new DestructionEffect('C', DestructionStrength.MINOR),
  whiteDestruction: new DestructionEffect('W', DestructionStrength.NORMAL),
  blueDestruction: new DestructionEffect('U', DestructionStrength.NORMAL),
  blackDestruction: new DestructionEffect('B', DestructionStrength.NORMAL),
  redDestruction: new DestructionEffect('R', DestructionStrength.NORMAL),
  greenDestruction: new DestructionEffect('G', DestructionStrength.NORMAL),
  colorlessDestruction: new DestructionEffect('C', DestructionStrength.NORMAL),
  majorWhiteDestruction: new DestructionEffect('W', DestructionStrength.MAJOR),
  majorBlueDestruction: new DestructionEffect('U', DestructionStrength.MAJOR),
  majorBlackDestruction: new DestructionEffect('B', DestructionStrength.MAJOR),
  majorRedDestruction: new DestructionEffect('R', DestructionStrength.MAJOR),
  majorGreenDestruction: new DestructionEffect('G', DestructionStrength.MAJOR),
  majorColorlessDestruction: new DestructionEffect('C', DestructionStrength.MAJOR),
}
