<template>
  <v-dialog
    v-model="show"
    width="auto"
  >
    <div class="wrapper">
      <div class="d-flex position-relative">
        <h1 class="my-2 text-center w-100 beleren-small-caps">{{ $t('team.title') }}</h1>
        <icon-button
          icon="mdi-close"
          size="48"
          class="close-btn"
          @click="show = false"
        />
      </div>
      <div
        class="main-section mt-6"
        :style="{
          '--base-width': `${baseWidth}px`,
          '--extra-width': `${extraWidth}px`,
        }"
      >
        <div class="d-flex flex-column ga-3">
          <div class="team">
            <div
              v-for="(c, index) in team"
              :key="index"
              @click="insertCreature(index)"
              :class="{ 'hover-scale': creature }"
            >
              <character-portrait
                :character="c"
                :size="180"
                :cooldown="game.cooldowns?.[index]"
              />
            </div>
          </div>
          <div class="team artifacts">
            <div
              v-for="(a, index) in artifacts"
              :key="index"
              @click="insertArtifact(index)"
              :class="{ 'hover-scale': artifact }"
            >
              <artifact-portrait
                :artifact="a"
                :size="130"
                :cooldown="game.artifactCooldowns?.[index]"
              />
            </div>
          </div>
          <div class="team mb-4">
            <div
              v-for="(_, index) in team"
              :key="index"
              class="d-flex justify-space-around ga-10"
            >
              <arrow-button
                direction="left"
                size="36"
                :disabled="index === 0"
                @click="swapTeam(index, index - 1)"
              />
              <arrow-button
                direction="right"
                size="36"
                :disabled="index === team.length - 1"
                @click="swapTeam(index, index + 1)"
              />
            </div>
          </div>
          <div class="team mt-6 mb-4">
            <div
              v-for="(e, index) in enchantments"
              :key="index"
              @click="insertEnchantment(index)"
              :class="{ 'hover-scale': enchantment }"
            >
              <enchantment-portrait
                :enchantment="e"
                :size="160"
              />
            </div>
          </div>
        </div>
        <div
          v-if="editing"
          class="d-flex"
        >
          <v-divider
            vertical
            opacity=".7"
            thickness="3"
            gradient
            class="h-100"
          />
          <div class="d-flex w-100">
            <div class="d-flex flex-column ma-auto">
              <h1 class="text-center mt-0">{{ $t('team.new') }}</h1>
              <template v-if="creature">
                <character-portrait :character="creature" :size="200" />
                <h2 class="text-center mb-0 mt-3">{{ $t(`creatures.name.${creature.name}`) }}</h2>
              </template>
              <template v-else-if="artifact">
                <artifact-portrait :artifact :size="200" />
                <h2 class="text-center mb-0 mt-3">{{ $t(`artifacts.name.${artifact.name}`) }}</h2>
              </template>
              <template v-else-if="enchantment">
                <enchantment-portrait :enchantment :size="220" />
                <h2 class="text-center mb-0 mt-3">{{ $t(`enchantments.name.${enchantment.name}`) }}</h2>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import ArtifactPortrait from './ArtifactPortrait.vue';
import CharacterPortrait from './CharacterPortrait.vue';
import EnchantmentPortrait from './EnchantmentPortrait.vue';
import { useGameStore } from '@/stores/gameStore';
import type { Artifact } from '@/types/artifacts/Artifact';
import { buildArtifact } from '@/types/artifacts/artifacts';
import type { Creature } from '@/types/creatures/Creature';
import { buildCreature } from '@/types/creatures/creatures';
import type { Game } from '@/types/Game';
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import ArrowButton from './ArrowButton.vue';
import { insertUnique, swap } from '@/utils/ArrayUtils.ts';
import IconButton from './IconButton.vue';
import type { Enchantment } from '@/types/enchantments/Enchantment.ts';
import { buildEnchantment } from '@/types/enchantments/enchantments.ts';
import { useUnlockStore, type Unlocks } from '@/stores/unlocksStore.ts';

const show = defineModel({ type: Boolean, required: true });

const props = defineProps<{
  creature?: Creature,
  artifact?: Artifact,
  enchantment?: Enchantment,
}>();

const emits = defineEmits(['edited']);

const editing: ComputedRef<boolean> = computed(() =>
  !!props.artifact || !!props.creature
);

const baseWidth: Ref<number> = ref(1100);
const extraWidth: Ref<number> = ref(350);

const game: Game = useGameStore().current!;
const unlocks: Unlocks = useUnlockStore().get;
const team = computed<(Creature | null)[]>(() => game.team.map(c => c ? buildCreature(c) : null));
const artifacts = computed<(Artifact | null)[]>(() => game.artifacts.map(c => c ? buildArtifact(c) : null));
const enchantments = computed<(Enchantment | null)[]>(() => game.enchantments.map(c => c ? buildEnchantment(c) : null));

function insertCreature(index: number) {
  if (props.creature) {
    game.team.splice(index, 1, props.creature.name);
    insertUnique(unlocks.creatures, props.creature.name);
    if (game.cooldowns) {
      game.cooldowns[index] = 0;
    }
    emits('edited');
  }
}

function insertArtifact(index: number) {
  if (props.artifact) {
    game.artifacts.splice(index, 1, props.artifact.name);
    insertUnique(unlocks.artifacts, props.artifact.name);
    if (game.artifactCooldowns) {
      game.artifactCooldowns[index] = 0;
    }
    emits('edited');
  }
}

function insertEnchantment(index: number) {
  if (props.enchantment) {
    game.enchantments.splice(index, 1, props.enchantment.name);
    insertUnique(unlocks.enchantments, props.enchantment.name);
    emits('edited');
  }
}

function swapTeam(i: number, j: number) {
  swap(game.team, i, j);
  swap(game.artifacts, i, j);
  if (game.cooldowns) {
    swap(game.cooldowns, i, j);
  }
  if (game.artifactCooldowns) {
    swap(game.artifactCooldowns, i, j);
  }
}
</script>

<style lang="scss" scoped>
.close-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.main-section {
  display: flex;

  > *:nth-child(1) {
    width: var(--base-width);
  }

  > *:nth-child(2) {
    width: var(--extra-width);
  }
}

.team {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  &.artifacts > * {
    margin: 8px auto;
  }

  & > * {
    margin: auto;
  }
}

.wrapper {
  user-select: none;
  touch-action: none;
  position: relative;
  padding: 32px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: #000;
    border-radius: 40px;
    z-index: -1;
  }

  &:after {
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    content: '';
    border-image: url(/ui/metal-frame.png) 100 / 80px round;
    pointer-events: none;
  }
}
</style>