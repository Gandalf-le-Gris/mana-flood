import { Game } from "@/types/Game";
import { GameUtils } from "@/utils/GameUtils";
import { defineStore } from "pinia";

const NAME: string = 'MANA_FLOOD_GAMES';

export interface SaveData {
  games: Game[],
}

export interface NewGameOptions {
  team?: (string | null)[];
  plane?: string;
  floor?: number;
}

const DEFAULT_STATE: SaveData = {
  games: [],
};

export const useGameStore = defineStore(NAME, {
  state: (): SaveData => {
    const saved = localStorage.getItem(NAME);
    if (!saved) {
      return { ...DEFAULT_STATE };
    }
    return { ...DEFAULT_STATE, ...JSON.parse(saved) };
  },

  getters: {
    allGames(state): Game[] {
      return state.games;
    },
    current(state): Game | undefined {
      return state.games.find((e: Game) => e.current);
    }
  },

  actions: {
    persist() {
      localStorage.setItem(NAME, JSON.stringify(this.$state));
    },
    saveGame() {
      if (this.current) {
        this.current.lastUpdated = Date.now();
      }
      this.persist();
    },
    newGame(options?: NewGameOptions) {
      this.games = this.games.map((e: Game) => ({
        ...e,
        current: false,
      }));
      const newGame: Game = new Game();
      if (options?.team) {
        newGame.team = options.team;
      }
      if (options?.plane) {
        newGame.plane = options.plane;
      }
      if (options?.floor !== undefined) {
        newGame.floor = options.floor;
      } else {
        newGame.floor = 1;
      }
      GameUtils.initGame(newGame);
      this.games.push(newGame);
      this.saveGame();
    },
    remove(uuid: string) {
      const current: number | undefined = this.games.findIndex((e: Game) => e.uuid === uuid);
      if (current !== -1) {
        this.games.splice(current, 1);
        this.persist();
      }
    },
    load(id: string) {
      this.games.forEach((g) => {
        g.current = g.uuid === id;
      });
      this.saveGame();
    },
    clear() {
      this.$patch({ ...DEFAULT_STATE });
      this.persist();
    },
  }
});
