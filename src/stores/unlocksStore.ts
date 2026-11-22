import { defineStore } from "pinia";

const NAME: string = 'MANA_FLOOD_UNLOCKS';

export interface Unlocks {
  creatures: string[],
  artifacts: string[],
  enchantments: string[],
  spells: string[],
  planes: string[],
  lastTeam: (string | null)[],
}

export const baseCreatures = ['knight-of-new-benalia', 'academy-journeymage', 'cabal-evangel', 'skirk-prospector', 'llanowar-elves'];
export const basePlanes = ['dominaria'];

const DEFAULT_STATE: Unlocks = {
  creatures: baseCreatures,
  artifacts: [],
  enchantments: [],
  spells: [],
  planes: basePlanes,
  lastTeam: [null, null, null, null, null],
};

export const useUnlockStore = defineStore(NAME, {
  state: (): Unlocks => {
    const saved = localStorage.getItem(NAME);
    if (!saved) {
      return { ...DEFAULT_STATE };
    }
    return { ...DEFAULT_STATE, ...JSON.parse(saved) };
  },

  getters: {
    get(state): Unlocks {
      return state;
    },
  },

  actions: {
    persist() {
      localStorage.setItem(NAME, JSON.stringify(this.$state));
    },
    clear() {
      this.$patch({ ...DEFAULT_STATE });
      this.persist();
    },
  }
});
