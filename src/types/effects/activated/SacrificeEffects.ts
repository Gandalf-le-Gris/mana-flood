import type { BattleContext } from '@/types/BattleContext';
import { ActivatedEffect } from './ActivatedEffect';
import type { Game } from '@/types/Game';

class SacrificeStrength {
  readonly value: number = 0;
  readonly cost: number = 0;
  readonly name: string = "";
  readonly cooldown: number = 1;

  static MINOR: SacrificeStrength = { value: 5, cost: 50, name: 'minor-sacrifice', cooldown: 4 };
  static NORMAL: SacrificeStrength = { value: 10, cost: 75, name: 'sacrifice', cooldown: 6 };
  static MAJOR: SacrificeStrength = { value: 15, cost: 100, name: 'major-sacrifice', cooldown: 8 };
}

class SacrificeEffect extends ActivatedEffect {
  readonly strength: SacrificeStrength;

  constructor(strength: SacrificeStrength) {
    super();
    this.id = strength.name;
    this.cooldown = strength.cooldown;
    this.strength = strength;
  }

  condition(game: Game): boolean {
    return game.hp > this.strength.cost;
  }

  execute(context: BattleContext): boolean {
    context.damageTeam(this.strength.cost);
    return context.convertOrbs(this.strength.value, 'B');
  }
}

export const sacrificeEffects = {
  minorSacrifice: new SacrificeEffect(SacrificeStrength.MINOR),
  sacrifice: new SacrificeEffect(SacrificeStrength.NORMAL),
  majorSacrifice: new SacrificeEffect(SacrificeStrength.MAJOR),
}
