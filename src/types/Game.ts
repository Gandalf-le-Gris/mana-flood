export interface ShopContent {
  creature?: string,
  artifact?: string,
}

export class Game {
  uuid: string = crypto.randomUUID();
  lastUpdated: number = Date.now();
  current: boolean = true;

  floor: number = 0;
  plane: string = 'dominaria';
  team: (string | null)[] = ['llanowar-elves', 'llanowar-elves', 'llanowar-elves', 'skirk-prospector', 'skirk-prospector'];
  artifacts: (string | null)[] = [null, null, null, null, null];
  currentEnemies: string[] = [];
  shopContent: ShopContent = {};

  hp = 0;
}
