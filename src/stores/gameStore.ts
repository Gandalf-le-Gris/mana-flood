import { Game } from "@/types/Game";
import { GameUtils } from "@/utils/GameUtils";
import { defineStore } from "pinia";

const NAME: string = 'MANA_FLOOD_GAMES';

export interface SaveData {
  games: Game[],
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
    newGame() {
      this.games = this.games.map((e: Game) => ({
        ...e,
        current: false,
      }));
      const newGame: Game = new Game();
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
