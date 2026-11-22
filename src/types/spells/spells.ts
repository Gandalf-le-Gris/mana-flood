import { LightningBolt } from './LightningBolt';
import type { Spell } from './Spell';

export const spells: typeof Spell[] = [
  LightningBolt,
];

export function buildSpell(spell: string | Spell): Spell {
  if (typeof spell !== 'string') {
    spell = spell.name;
  }
  for (const builder of spells) {
    const c: Spell = new builder();
    if (c.name === spell) {
      return c;
    }
  }
  throw `Spell not found: ${spell}`
}