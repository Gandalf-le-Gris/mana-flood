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
  plane: string = 'dominaria';
  team: (string | null)[] = ['llanowar-elves', 'llanowar-elves', 'llanowar-elves', 'skirk-prospector', 'skirk-prospector'];
  cooldowns: number[] = [0, 0, 0, 0, 0];
  artifactCooldowns: number[] = [0, 0, 0, 0, 0];
  artifacts: (string | null)[] = ['adaptive-omnitool', null, null, null, null];
  enchantments: (string | null)[] = ['mirari-s-wake', null, null, null, null];
  currentEnemies: string[] = [];
  shopContent: ShopContent = {};

  hp = 0;
}
