import { artifacts } from "@/types/artifacts/artifacts";
import type { Rarity } from "@/types/creatures/Creature";
import { PoolUtils } from "./PoolUtils";

export class ArtifactUtils {
  static getRandomArtifact(plane: string, rarity?: Rarity | number): string {
    return PoolUtils.getRandomItem(artifacts, plane, rarity, 'adaptive-omnitool');
  }
}
