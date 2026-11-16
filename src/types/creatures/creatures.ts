import { AcademyJourneymage } from './AcademyJourneymage';
import { CabalEvangel } from './CabalEvangel';
import type { Creature } from "./Creature";
import { KnightOfNewBenalia } from './KnightOfNewBenalia';
import { LlanowarElves } from "./LlanowarElves";
import { SkirkProspector } from "./SkirkProspector";
import { Urza } from './Urza';

export const creatures: typeof Creature[] = [
  LlanowarElves,
  SkirkProspector,
  KnightOfNewBenalia,
  AcademyJourneymage,
  CabalEvangel,
  Urza,
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
