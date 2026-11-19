import { artifacts } from "@/types/artifacts/artifacts";
import { shuffle } from "./ArrayUtils";

export class ArtifactUtils {
  static getRandomArtifact(plane: string): string {
    return shuffle(
      artifacts
      .map(c => new c())
      .map(c => Array.from({ length: Number(c.pool[plane] ?? c.pool['any'] ?? 0) }, () => c))
      .flat()
    )[0]?.name ?? 'adaptive-omnitool';
  }
}
