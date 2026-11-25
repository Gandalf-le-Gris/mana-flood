import type { BattleContext } from '@/types/BattleContext';
import { ActivatedEffect } from './ActivatedEffect';

class DamageStrength {
  readonly value: number = 0;
  readonly name: string = "";
  readonly cooldown: number = 1;

  static MINOR: DamageStrength = { value: 50, name: 'minor-damage', cooldown: 3 };
  static NORMAL: DamageStrength = { value: 100, name: 'damage', cooldown: 4 };
  static MAJOR: DamageStrength = { value: 150, name: 'major-damage', cooldown: 5 };
}

class DamageEffect extends ActivatedEffect {
  readonly strength: DamageStrength;

  constructor(strength: DamageStrength) {
    super();
    this.id = strength.name;
    this.cooldown = strength.cooldown;
    this.strength = strength;
  }

  async execute(context: BattleContext): Promise<boolean> {
    await context.damageEnemy(this.strength.value);
    return true;
  }
}

export const damageEffects = {
  minorDamage: new DamageEffect(DamageStrength.MINOR),
  damage: new DamageEffect(DamageStrength.NORMAL),
  majorDamage: new DamageEffect(DamageStrength.MAJOR),
}
