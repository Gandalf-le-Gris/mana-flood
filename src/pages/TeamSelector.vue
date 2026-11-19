<template>
  <div class="background">
    <div class="filters">
      <icon-button
        icon="mdi-arrow-left"
        :size="60"
        @click="emits('move-to-screen', 'TitleScreen', ScreenTransition.FadeToBlack)"
      />
      <v-spacer />
      <v-btn-toggle
        v-model="filters.colors"
        multiple
        class="mr-6 my-auto"
        tile
        selected-class="selected-icon"
      >
        <template
          v-for="color in colors"
          :key="color"
        >
          <v-btn
            v-if="Number.isNaN(Number(color))"
            icon
            variant="plain"
            density="compact"
            size="x-large"
            @click="removeColorless"
          >
            <v-icon :icon="`mtg:${color}`" size="x-large" />
          </v-btn>
        </template>
        <v-btn
          icon
          variant="plain"
          density="compact"
          size="x-large"
        >
          <v-icon icon="mtg:C" size="x-large" />
        </v-btn>
      </v-btn-toggle>
      <v-text-field
        v-model="filters.displayName"
        :label="$t('team-selector.name')"
        variant="outlined"
        hide-details
        max-width="500"
        clearable
        class="mr-6 large-input"
      />
      <v-select
        v-model="sort.field"
        :label="$t('team-selector.sort.title')"
        :items="sortItems"
        item-value="value"
        item-title="text"
        variant="outlined"
        hide-details
        max-width="120"
        class="mr-2 large-input"
      />
      <icon-button
        :icon="sort.ascending ? 'mdi-sort-ascending' : 'mdi-sort-descending'"
        :size="48"
        class="my-auto"
        @click="sort.ascending = !sort.ascending"
      />
    </div>
    <div class="list">
      <character-portrait
        v-for="creature in creatureList"
        :key="creature.name"
        :character="creature"
        :size="160"
        :cost="creature.cost"
        class="hover-scale"
        :class="{ grayscale: !creature.unlocked, selected: team.find(c => c?.name === creature.name) }"
        @click="toggleInTeam(creature)"
      />
    </div>
    <div class="team">
      <div class="d-flex ga-6 mx-auto">
        <div
          v-for="(creature, key) in team"
          :key
        >
          <character-portrait
            :character="creature"
            :size="180"
            :cost="creature ? getCost(CreatureUtils.getRarity(creature)) : undefined"
            class="hover-scale"
            @click="creature ? toggleInTeam(creature) : () => {}"
          />
        </div>
      </div>
      <h1
        class="team-cost"
        :class="totalCost > 10 ? 'text-red-lighten-2' : 'text-green-lighten-2'"
      >
        <v-icon
          icon="mdi-lightning-bolt"
          size="48px"
          class="mt-n2 mr-n2"
        />
        {{ totalCost }} / 10
      </h1>
      <icon-button
        icon="mdi-play"
        :size="120"
        variant="hexa"
        class="play-button"
        :class="{ disabled: !team.find(x => x) || totalCost > 10 }"
        :disabled="!team.find(x => x) || totalCost > 10"
        @click="startGame"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CharacterPortrait from '@/components/CharacterPortrait.vue';
import IconButton from '@/components/IconButton.vue';
import { useGameStore } from '@/stores/gameStore';
import { basePlanes, useUnlockStore } from '@/stores/unlocksStore';
import { colors } from '@/types/Color';
import { Creature, Rarity } from '@/types/creatures/Creature';
import { buildCreature, creatures } from '@/types/creatures/creatures';
import type { Game } from '@/types/Game';
import { CreatureUtils } from '@/utils/CreatureUtils';
import { ScreenTransition } from '@/utils/ScreenTransition';
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const emits = defineEmits(['move-to-screen']);

const unlocks = useUnlockStore().get;

interface Filters {
  displayName?: string,
  colors?: number[],
}

interface Sort {
  field: 'name' | 'cost',
  ascending: boolean,
}

const sortItems = [
  { value: 'name', text: t('team-selector.sort.name') },
  { value: 'cost', text: t('team-selector.sort.cost') },
]

const filters: Ref<Filters> = ref({});
const sort: Ref<Sort> = ref({
  field: 'name',
  ascending: true,
});
const team: Ref<(Creature | null)[]> = ref(
  unlocks.lastTeam.map(c => c ? buildCreature(c) : null)
);

const allCreatures: Ref<(Creature & { displayName: string, cost: number, unlocked: boolean })[]> = ref(
  creatures.map(b => {
    const c = new b() as Creature & { displayName: string, cost: number, unlocked: boolean };
    c.displayName = t(`creatures.name.${c.name}`);
    c.cost = getCost(CreatureUtils.getRarity(c));
    c.unlocked = unlocks.creatures.includes(c.name);
    return c;
  })
);

const creatureList: ComputedRef<(Creature & { displayName: string, cost: number, unlocked: boolean })[]> = computed(() => {
  const displayName: string = filters.value.displayName?.toLowerCase() ?? '';
  return allCreatures.value
    .filter(c =>
      !c.token
      && (!displayName || t(`creatures.name.${c.name}`).toLowerCase().includes(displayName))
      && (matchesColors(c))
    )
    .sort((a, b) => {
      if (a.unlocked !== b.unlocked) {
        return a.unlocked ? -1 : 1;
      }
      if (sort.value.field === 'cost' && a.cost !== b.cost) {
        return sort.value.ascending ? (a.cost as number) - (b.cost as number) : (b.cost as number) - (a.cost as number);
      }
      return sort.value.ascending ? a.displayName.localeCompare(b.displayName) : b.displayName.localeCompare(a.displayName);
    });

  function matchesColors(creature: Creature): boolean {
    if (!filters.value.colors?.length) {
      return true;
    }
    if (filters.value.colors.includes(5)) {
      return !creature.colors.length;
    }
    return filters.value.colors.reduce((acc, c) => {
      switch (c) {
        case 0: return acc && creature.colors.includes('W');
        case 1: return acc && creature.colors.includes('U');
        case 2: return acc && creature.colors.includes('B');
        case 3: return acc && creature.colors.includes('R');
        case 4: return acc && creature.colors.includes('G');
        default: return acc;
      }
    }, true);
  }
});

function getCost(rarity: Rarity): number {
  switch(rarity) {
    case Rarity.COMMON: return 1;
    case Rarity.UNCOMMON: return 3;
    case Rarity.RARE: return 5;
    case Rarity.BOSS: return 8;
    default: return 0;
  }
}

const totalCost: ComputedRef<number> = computed(() => 
  team.value.reduce((acc, x) => (x ? getCost(CreatureUtils.getRarity(x)) : 0) + acc, 0)
);

function toggleInTeam(creature: Creature) {
  const i = team.value.findIndex(c => c?.name === creature.name);
  if (i >= 0) {
    team.value[i] = null;
  } else {
    const k = team.value.indexOf(null);
    if (k >= 0) {
      team.value[k] = creature;
    }
  }
}

function removeColorless() {
  if (filters.value.colors?.includes(5)) {
    filters.value.colors.splice(filters.value.colors.indexOf(5), 1);
  }
}

watch(() => filters.value.colors, (newVal, oldVal) => {
  if (newVal?.includes(5) && !oldVal?.includes(5)) {
    filters.value.colors = [5];
  }
});

function startGame() {
  if (!team.value.find(x => x) || totalCost.value > 10) return;

  const chosenTeam = team.value.map(c => c?.name ?? null);
  unlocks.lastTeam = [...chosenTeam];
  useUnlockStore().persist();

  const hasPlanesChoice = unlocks.planes.filter(p => p !== 'meditation-realm').length >= 3;

  useGameStore().newGame({
    team: chosenTeam,
    plane: hasPlanesChoice ? 'meditation-realm' : basePlanes[0],
    floor: hasPlanesChoice ? 0 : 1,
  });

  emits('move-to-screen', 'BattleScreen', ScreenTransition.FadeToBlack);
}
</script>

<style lang="scss" scoped>
.background {
  position: relative;
  display: grid;
  grid-template-rows: max-content 1fr max-content;

  > * {
    z-index: 1;
  }

  &::before {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: '';
    background-image: url('/backgrounds/team.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    filter: brightness(.4);
  }
}

.filters {
  display: flex;
  padding: 20px;
  background: #0006;
}

.list {
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  display: grid;
  grid-template-columns: repeat(10, 160px);
  gap: 20px;
  overflow-y: auto;

  > * {
    margin-left: inherit;
    margin-right: inherit;
  }

  > .grayscale {
    filter: grayscale(1) brightness(.5);
    pointer-events: none;
  }

  > .selected {
    position: relative;

    > * {
      filter: brightness(.5);
    }

    &::after {
      position: absolute;
      top: 20px;
      bottom: 20px;
      left: 20px;
      right: 20px;
      content: '';
      background-image: url('/ui/checkmark.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
}

.team {
  position: relative;
  display: flex;
  padding: 20px;
  background: #0006;

  .team-cost {
    position: absolute;
    top: 50%;
    right: 200px;
    margin-top: 0;
    font-size: 2.5em;
    transform: translateY(-50%);
  }

  .play-button {
    position: absolute;
    top: 50%;
    right: 48px;
    transform: translateY(-50%);

    &:not(.disabled) {
      animation: halo-pulse 2.2s infinite ease-in-out;
    }
  }
}

@keyframes halo-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 8px white) drop-shadow(0 0 16px white);
  }
  50% {
    filter: drop-shadow(0 0 16px white) drop-shadow(0 0 32px rgba(255, 255, 255, 0.8));
  }
}

.selected-icon {
  position: relative;

  &::before {
    position: absolute;
    top: 2px;
    bottom: 2px;
    left: 0;
    right: 0;
    content: '';
    border-radius: 50%;
    background: radial-gradient(ellipse at center, #fff7 0%, #fff7 60%, transparent 80%);
  }
}
</style>
