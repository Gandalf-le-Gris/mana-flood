import { AcademyJourneymage } from './AcademyJourneymage';
import { Auramancer } from './Auramancer';
import { CabalEvangel } from './CabalEvangel';
import { CabalPaladin } from './CabalPaladin';
import { CityscapeLeveler } from './CityscapeLeveler';
import { CombatThresher } from './CombatThresher';
import type { Creature } from "./Creature";
import { ForgefireAutomaton } from './ForgefireAutomaton';
import { GrizzlyBears } from './GrizzlyBears';
import { HeavyweightDemolisher } from './HeavyweightDemolisher';
import { Juggernaut } from './Juggernaut';
import { Karnstruct } from './Karnstruct';
import { KnightOfNewBenalia } from './KnightOfNewBenalia';
import { LlanowarElves } from "./LlanowarElves";
import { Loran } from './Loran';
import { PerennialBehemoth } from './PerennialBehemoth';
import { ProdigalSorcerer } from './ProdigalSorcerer';
import { SkirkProspector } from "./SkirkProspector";
import { SpotterThopter } from './SpotterThopter';
import { UniversalAutomaton } from './UniversalAutomaton';
import { Urza } from './Urza';
import { Venser } from './Venser';
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
  CombatThresher,
  SpotterThopter,
  ForgefireAutomaton,
  HeavyweightDemolisher,
  PerennialBehemoth,
  UniversalAutomaton,
  Loran,
  Venser,
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
