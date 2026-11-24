import { AdaptiveOmnitool } from "./AdaptiveOmnitool";
import type { Artifact } from "./Artifact";
import { CharcoalDiamond } from './CharcoalDiamond';
import { FireDiamond } from './FireDiamond';
import { MarbleDiamond } from './MarbleDiamond';
import { MossDiamond } from './MossDiamond';
import { PowerstoneShard } from './PowerstoneShard';
import { SkyDiamond } from './SkyDiamond';
import { Spellbook } from './Spellbook';

export const artifacts: typeof Artifact[] = [
  Spellbook,
  AdaptiveOmnitool,
  PowerstoneShard,
  MarbleDiamond,
  SkyDiamond,
  CharcoalDiamond,
  FireDiamond,
  MossDiamond,
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
