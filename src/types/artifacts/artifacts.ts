import { AdaptiveOmnitool } from "./AdaptiveOmnitool";
import type { Artifact } from "./Artifact";

export const artifacts: typeof Artifact[] = [
  AdaptiveOmnitool
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
