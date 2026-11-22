<template>
  <div class="background">
    <div class="filters">
      <icon-button
        icon="mdi-arrow-left"
        :size="60"
        @click="emits('move-to-screen', 'TitleScreen', ScreenTransition.FadeToBlack)"
      />
      <v-spacer />
      <icon-button
        v-for="category in categories"
        :key="category"
        :icon="`mtg:${category[0].toUpperCase()}${category.substring(1)}`"
        :size="60"
        :disabled="currentCategory === category"
        class="mx-2"
        @click="currentCategory = category"
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
        v-if="currentCategory === 'creature'"
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
      <template v-if="currentCategory === 'creature'">
        <character-portrait
          v-for="creature in cardList"
          :key="creature.name"
          :character="(creature as Creature)"
          :size="160"
          :cost="creature.cost"
          :class="{ grayscale: !creature.unlocked }"
        />
      </template>
      <template v-else-if="currentCategory === 'artifact'">
        <artifact-portrait
          v-for="artifact in cardList"
          :key="artifact.name"
          :artifact="(artifact as Artifact)"
          :size="160"
          :class="{ grayscale: !artifact.unlocked }"
        />
      </template>
      <template v-else-if="currentCategory === 'enchantment'">
        <enchantment-portrait
          v-for="enchantment in cardList"
          :key="enchantment.name"
          :enchantment="(enchantment as Enchantment)"
          :size="180"
          :class="{ grayscale: !enchantment.unlocked }"
        />
      </template>
      <template v-else-if="currentCategory === 'spell'">
        <spell-portrait
          v-for="spell in cardList"
          :key="spell.name"
          :spell="(spell as Spell)"
          :size="160"
          :class="{ grayscale: !spell.unlocked }"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArtifactPortrait from '@/components/ArtifactPortrait.vue';
import CharacterPortrait from '@/components/CharacterPortrait.vue';
import EnchantmentPortrait from '@/components/EnchantmentPortrait.vue';
import IconButton from '@/components/IconButton.vue';
import SpellPortrait from '@/components/SpellPortrait.vue';
import { useUnlockStore } from '@/stores/unlocksStore';
import type { Artifact } from '@/types/artifacts/Artifact';
import { artifacts } from '@/types/artifacts/artifacts';
import { colors } from '@/types/Color';
import { Creature, Rarity } from '@/types/creatures/Creature';
import { creatures } from '@/types/creatures/creatures';
import type { Enchantment } from '@/types/enchantments/Enchantment';
import { enchantments } from '@/types/enchantments/enchantments';
import type { Spell } from '@/types/spells/Spell';
import { spells } from '@/types/spells/spells';
import { CreatureUtils } from '@/utils/CreatureUtils';
import { ScreenTransition } from '@/utils/ScreenTransition';
import { computed, ref, watch, type ComputedRef, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const emits = defineEmits(['move-to-screen']);

const unlocks = useUnlockStore().get;

const categories = ['creature', 'artifact', 'enchantment', 'spell'];
type Category = typeof categories[number];
const currentCategory: Ref<Category> = ref('creature');

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
];

const filters: Ref<Filters> = ref({});
const sort: Ref<Sort> = ref({
  field: 'name',
  ascending: true,
});

const allCards: ComputedRef<((Creature | Artifact | Enchantment | Spell) & { displayName: string, cost: number, unlocked: boolean })[]> = computed(() => {
  switch (currentCategory.value) {
    case 'creature':
      return creatures.map(b => {
        const c = new b() as Creature & { displayName: string, cost: number, unlocked: boolean };
        c.displayName = t(`creatures.name.${c.name}`);
        c.cost = getCost(CreatureUtils.getRarity(c));
        c.unlocked = unlocks.creatures.includes(c.name);
        return c;
      });
    case 'artifact':
      return artifacts.map(b => {
        const c = new b() as Artifact & { displayName: string, cost: number, unlocked: boolean };
        c.displayName = t(`artifacts.name.${c.name}`);
        c.unlocked = unlocks.artifacts.includes(c.name);
        return c;
      });
    case 'enchantment':
      return enchantments.map(b => {
        const c = new b() as Enchantment & { displayName: string, cost: number, unlocked: boolean };
        c.displayName = t(`enchantments.name.${c.name}`);
        c.unlocked = unlocks.enchantments.includes(c.name);
        return c;
      });
    case 'spell':
      return spells.map(b => {
        const c = new b() as Spell & { displayName: string, cost: number, unlocked: boolean };
        c.displayName = t(`spells.name.${c.name}`);
        c.unlocked = unlocks.spells.includes(c.name);
        return c;
      });
    default:
      return [];
  }
}
);

const cardList: ComputedRef<((Creature | Artifact | Enchantment | Spell) & { displayName: string, cost: number, unlocked: boolean })[]> = computed(() => {
  const displayName: string = filters.value.displayName?.toLowerCase() ?? '';
  return allCards.value
    .filter(c =>
      !(c as Creature).token
      && matchesDisplayName(displayName, c)
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

  function matchesDisplayName(displayName: string, card: (Creature | Artifact | Enchantment | Spell)): boolean {
    if (!displayName) {
      return true;
    }
    switch (currentCategory.value) {
      case 'creature':
        return t(`creatures.name.${card.name}`).toLowerCase().includes(displayName);
      case 'artifact':
        return t(`artifacts.name.${card.name}`).toLowerCase().includes(displayName);
      case 'enchantment':
        return t(`enchantments.name.${card.name}`).toLowerCase().includes(displayName);
      case 'spell':
        return t(`spells.name.${card.name}`).toLowerCase().includes(displayName);
      default:
        return true;
    }
  }

  function matchesColors(card: (Creature | Artifact | Enchantment | Spell)): boolean {
    if (!filters.value.colors?.length) {
      return true;
    }
    if (filters.value.colors.includes(5)) {
      return !card.colors.length;
    }
    return filters.value.colors.reduce((acc, c) => {
      switch (c) {
        case 0: return acc && card.colors.includes('W');
        case 1: return acc && card.colors.includes('U');
        case 2: return acc && card.colors.includes('B');
        case 3: return acc && card.colors.includes('R');
        case 4: return acc && card.colors.includes('G');
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

watch(() => currentCategory.value, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    filters.value = {};
    sort.value.field === 'name';
  }
})
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
