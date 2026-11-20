import type { BattleContext } from '@/types/BattleContext';
import { ActivatedEffect } from './ActivatedEffect';
import type { Game } from '@/types/Game';

class SacrificeStrength {
  readonly value: number = 0;
  readonly cost: number = 0;
  readonly name: string = "";
  readonly cooldown: number = 1;

  static MINOR: SacrificeStrength = { value: 100, cost: 50, name: 'minor-sacrifice-damage', cooldown: 3 };
  static NORMAL: SacrificeStrength = { value: 200, cost: 75, name: 'sacrifice-damage', cooldown: 4 };
  static MAJOR: SacrificeStrength = { value: 300, cost: 100, name: 'major-sacrifice-damage', cooldown: 5 };
}

class SacrificeDamageEffect extends ActivatedEffect {
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
    context.damageEnemy(this.strength.value);
    return true;
  }
}

export const sacrificeDamageEffects = {
  minorSacrificeDamage: new SacrificeDamageEffect(SacrificeStrength.MINOR),
  sacrificeDamage: new SacrificeDamageEffect(SacrificeStrength.NORMAL),
  majorSacrificeDamage: new SacrificeDamageEffect(SacrificeStrength.MAJOR),
}
