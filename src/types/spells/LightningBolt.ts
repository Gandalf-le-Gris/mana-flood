import type { Color } from '../Color';
import { Rarity } from '../creatures/Creature';
import { damageEffects } from '../effects/activated/DamageEffects';
import { Spell } from './Spell';

export class LightningBolt extends Spell {
  name = 'lightning-bolt';
  colors = ['R'] as Color[];
  pool = {
    any: Rarity.COMMON,
  };
  activatedAbility = damageEffects.damage;
}
