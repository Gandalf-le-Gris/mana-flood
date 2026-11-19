import { baseCreatures, basePlanes } from '@/stores/unlocksStore';

export interface ShopContent {
  creature?: string,
  artifact?: string,
  enchantment?: string,
}

export class Game {
  uuid: string = crypto.randomUUID();
  lastUpdated: number = Date.now();
  current: boolean = true;

  floor: number = 0;
  plane: string = basePlanes[0];
  team: (string | null)[] = baseCreatures;
  cooldowns: number[] = [0, 0, 0, 0, 0];
  artifactCooldowns: number[] = [0, 0, 0, 0, 0];
  artifacts: (string | null)[] = [null, null, null, null, null];
  enchantments: (string | null)[] = [null, null, null, null, null];
  currentEnemies: string[] = [];
  shopContent: ShopContent = {};

  hp = 0;
}
