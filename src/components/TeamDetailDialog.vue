<template>
  <v-dialog
    v-model="show"
    width="auto"
  >
    <div class="wrapper">
      <div class="d-flex position-relative">
        <h1 class="my-2 text-center w-100">{{ $t('team.title') }}</h1>
        <icon-button
          icon="mdi-close"
          size="48"
          class="close-btn"
          @click="show = false"
        />
      </div>
      <div
        class="main-section mt-4"
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
              <character-portrait :character="c" :size="180" />
            </div>
          </div>
          <div class="team artifacts">
            <div
              v-for="(a, index) in artifacts"
              :key="index"
              @click="insertArtifact(index)"
              :class="{ 'hover-scale': artifact }"
            >
              <artifact-portrait :artifact="a" :size="130" />
            </div>
          </div>
          <div class="team mb-4">
            <div
              v-for="(c, index) in team"
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
                <artifact-portrait :artifact="artifact" :size="200" />
                <h2 class="text-center mb-0 mt-3">{{ $t(`artifacts.name.${artifact.name}`) }}</h2>
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
import { useGameStore } from '@/stores/gameStore';
import type { Artifact } from '@/types/artifacts/Artifact';
import { buildArtifact } from '@/types/artifacts/artifacts';
import type { Creature } from '@/types/creatures/Creature';
import { buildCreature } from '@/types/creatures/creatures';
import type { Game } from '@/types/Game';
import { computed, ref, type ComputedRef, type Ref } from 'vue';
import ArrowButton from './ArrowButton.vue';
import { swap } from '@/utils/ArrayUtils.ts';
import IconButton from './IconButton.vue';

const show = defineModel({ type: Boolean, required: true });

const props = defineProps<{
  creature?: Creature,
  artifact?: Artifact,
}>();

const emits = defineEmits(['edited']);

const editing: ComputedRef<boolean> = computed(() =>
  !!props.artifact || !!props.creature
);

const baseWidth: Ref<number> = ref(1100);
const extraWidth: Ref<number> = ref(350);

const game: Game = useGameStore().current!;
const team = computed<(Creature | null)[]>(() => game.team.map(c => c ? buildCreature(c) : null));
const artifacts = computed<(Artifact | null)[]>(() => game.artifacts.map(c => c ? buildArtifact(c) : null));

function insertCreature(index: number) {
  if (props.creature) {
    game.team.splice(index, 1, props.creature.name);
    emits('edited');
  }
}

function insertArtifact(index: number) {
  if (props.artifact) {
    game.artifacts.splice(index, 1, props.artifact.name);
    emits('edited');
  }
}

function swapTeam(i: number, j: number) {
  swap(game.team, i, j);
  swap(game.artifacts, i, j);
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
    z-index: -1;
  }

  &:after {
    position: absolute;
    top: -32px;
    left: -32px;
    right: -32px;
    bottom: -32px;
    content: '';
    border-image: url(/ui/metal-frame.png) 128 / 128px round;
    pointer-events: none;
  }
}
</style>