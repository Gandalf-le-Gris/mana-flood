import { getColorName, type ExtendedColor } from '@/types/Color';
import type { BattleContext } from '@/types/BattleContext';
import { Effect } from '../Effect';
import { EffectTrigger } from '../EffectTrigger';

class DestructionStrength {
  readonly value: number = 0;
  readonly name: string = "";

  static NORMAL: DestructionStrength = { value: 2, name: 'shared.turn-end-destruction' };
  static MAJOR: DestructionStrength = { value: 4, name: 'shared.turn-end-major-destruction' };
}

class TurnEndDestructionEffect extends Effect {
  trigger = EffectTrigger.TURN_START;

  readonly strength: DestructionStrength;
  readonly color: ExtendedColor;

  constructor(color: ExtendedColor, strength: DestructionStrength) {
    super();
    this.id = `${strength.name}-${getColorName(color)}`;
    this.strength = strength;
    this.color = color;
  }

  effect = (context: BattleContext) => {
    context.destroyOrbs(this.strength.value, this.color);
  }
}

export const turnEndDestructionEffects = {
  whiteDestruction: new TurnEndDestructionEffect('W', DestructionStrength.NORMAL),
  blueDestruction: new TurnEndDestructionEffect('U', DestructionStrength.NORMAL),
  blackDestruction: new TurnEndDestructionEffect('B', DestructionStrength.NORMAL),
  redDestruction: new TurnEndDestructionEffect('R', DestructionStrength.NORMAL),
  greenDestruction: new TurnEndDestructionEffect('G', DestructionStrength.NORMAL),
  colorlessDestruction: new TurnEndDestructionEffect('C', DestructionStrength.NORMAL),
  majorWhiteDestruction: new TurnEndDestructionEffect('W', DestructionStrength.MAJOR),
  majorBlueDestruction: new TurnEndDestructionEffect('U', DestructionStrength.MAJOR),
  majorBlackDestruction: new TurnEndDestructionEffect('B', DestructionStrength.MAJOR),
  majorRedDestruction: new TurnEndDestructionEffect('R', DestructionStrength.MAJOR),
  majorGreenDestruction: new TurnEndDestructionEffect('G', DestructionStrength.MAJOR),
  majorColorlessDestruction: new TurnEndDestructionEffect('C', DestructionStrength.MAJOR),
}
