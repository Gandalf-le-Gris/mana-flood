import type { Creature } from "./Creature";
import { LlanowarElves } from "./LlanowarElves";
import { SkirkProspector } from "./SkirkProspector";

export const creatures: typeof Creature[] = [
  LlanowarElves,
  SkirkProspector
];

export function buildCreature(creature: string | Creature): Creature {
  if (typeof creature !== 'string') {
    creature = creature.name;
  }
  for (const builder of creatures) {
    const c: Creature = new builder();
    if (c.name === creature) {
      return c;
    }
  }
  throw `Creature not found: ${creature}`
}
