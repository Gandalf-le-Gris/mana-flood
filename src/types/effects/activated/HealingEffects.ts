import type { BattleContext } from '@/types/BattleContext';
import { ActivatedEffect } from './ActivatedEffect';

class HealingStrength {
  readonly value: number = 0;
  readonly name: string = "";
  readonly cooldown: number = 1;

  static MINOR: HealingStrength = { value: 100, name: 'minor-healing', cooldown: 4 };
  static NORMAL: HealingStrength = { value: 200, name: 'healing', cooldown: 6 };
  static MAJOR: HealingStrength = { value: 300, name: 'major-healing', cooldown: 8 };
}

class HealingEffect extends ActivatedEffect {
  readonly strength: HealingStrength;

  constructor(strength: HealingStrength) {
    super();
    this.id = strength.name;
    this.cooldown = strength.cooldown;
    this.strength = strength;
  }

  async execute(context: BattleContext): Promise<boolean> {
    await context.healTeam(this.strength.value);
    return true;
  }
}

export const healingEffects = {
  minorHealing: new HealingEffect(HealingStrength.MINOR),
  healing: new HealingEffect(HealingStrength.NORMAL),
  majorHealing: new HealingEffect(HealingStrength.MAJOR),
}
