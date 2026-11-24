import { AcademyJourneymage } from './AcademyJourneymage';
import { Auramancer } from './Auramancer';
import { CabalEvangel } from './CabalEvangel';
import { CabalPaladin } from './CabalPaladin';
import { CityscapeLeveler } from './CityscapeLeveler';
import type { Creature } from "./Creature";
import { GrizzlyBears } from './GrizzlyBears';
import { Juggernaut } from './Juggernaut';
import { Karnstruct } from './Karnstruct';
import { KnightOfNewBenalia } from './KnightOfNewBenalia';
import { LlanowarElves } from "./LlanowarElves";
import { ProdigalSorcerer } from './ProdigalSorcerer';
import { SkirkProspector } from "./SkirkProspector";
import { Urza } from './Urza';
import { ViashinoPyromancer } from './ViashinoPyromancer';
import { VoltaicServant } from './VoltaicServant';

export const creatures: typeof Creature[] = [
  LlanowarElves,
  SkirkProspector,
  KnightOfNewBenalia,
  AcademyJourneymage,
  CabalEvangel,
  Urza,
  Karnstruct,
  CityscapeLeveler,
  Auramancer,
  ProdigalSorcerer,
  CabalPaladin,
  ViashinoPyromancer,
  GrizzlyBears,
  VoltaicServant,
  Juggernaut,
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
