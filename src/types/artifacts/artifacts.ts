import { AdaptiveOmnitool } from "./AdaptiveOmnitool";
import type { Artifact } from "./Artifact";
import { CharcoalDiamond } from './CharcoalDiamond';
import { FireDiamond } from './FireDiamond';
import { GildedLotus } from './GildedLotus';
import { GoblinFirebomb } from './GoblinFirebomb';
import { MarbleDiamond } from './MarbleDiamond';
import { MossDiamond } from './MossDiamond';
import { PowerstoneShard } from './PowerstoneShard';
import { SkyDiamond } from './SkyDiamond';
import { SolRing } from './SolRing';
import { Spellbook } from './Spellbook';
import { TheMightstoneAndWeakstone } from './TheMightstoneAndWeakstone';
import { ThranDynamo } from './ThranDynamo';
import { UrzasSylex } from './UrzasSylex';
import { WornPowerstone } from './WornPowerstone';

export const artifacts: typeof Artifact[] = [
  Spellbook,
  AdaptiveOmnitool,
  PowerstoneShard,
  MarbleDiamond,
  SkyDiamond,
  CharcoalDiamond,
  FireDiamond,
  MossDiamond,
  SolRing,
  ThranDynamo,
  WornPowerstone,
  GildedLotus,
  UrzasSylex,
  TheMightstoneAndWeakstone,
  GoblinFirebomb,
];

export function buildArtifact(artifact: string | Artifact): Artifact {
  if (typeof artifact !== 'string') {
    artifact = artifact.name;
  }
  for (const builder of artifacts) {
    const a: Artifact = new builder();
    if (a.name === artifact) {
      return a;
    }
  }
  throw `Artifact not found: ${artifact}`
}
