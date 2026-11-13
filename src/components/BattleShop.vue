<template>
  <div>
    <div class="wrapper">
      <h1 class="text-center beleren-small-caps">
        {{ $t('shop.title') }}
      </h1>
      <v-row class="ma-6 shop-content">
        <template v-if="game.shopContent.creature">
          <v-col
            class="d-flex flex-column ma-auto hover-scale"
            @click="addCreature(buildCreature(game.shopContent.creature))"
          >
            <character-portrait :character="buildCreature(game.shopContent.creature)" :size="200" />
            <h2 class="mt-3 mb-0 text-center">{{ $t(`creatures.name.${buildCreature(game.shopContent.creature).name}`) }}</h2>
            <h3 class="my-0 text-center">{{ $t('creatures.one') }}</h3>
          </v-col>
          <v-col cols="auto">
            <v-divider
              vertical
              opacity=".7"
              thickness="3"
              gradient
              class="h-100"
            />
          </v-col>
        </template>
        <template v-if="game.shopContent.artifact">
          <v-col
            class="d-flex flex-column ma-auto hover-scale"
            @click="addArtifact(buildArtifact(game.shopContent.artifact))"
          >
            <artifact-portrait :artifact="buildArtifact(game.shopContent.artifact)" :size="200" />
            <h2 class="mt-3 mb-0 text-center">{{ $t(`artifacts.name.${buildArtifact(game.shopContent.artifact).name}`) }}</h2>
            <h3 class="my-0 text-center">{{ $t('artifacts.one') }}</h3>
          </v-col>
          <v-col cols="auto">
            <v-divider
              vertical
              opacity=".7"
              thickness="3"
              gradient
              class="h-100"
            />
          </v-col>
        </template>
        <v-col
          class="d-flex flex-column ma-auto hover-scale"
          @click="healTeam"
        >
          <ui-card src="ui/heal.jpg" :size="200" />
          <h2 class="mt-3 mb-0 text-center">{{ $t('shop.heal.title') }}</h2>
          <h3 class="my-0 text-center">{{ $t('shop.heal.amount', [10]) }}</h3>
        </v-col>
      </v-row>
    </div>
  
    <team-detail-dialog
      v-model="showTeamDetail"
      :creature="creatureToAdd"
      :artifact="artifactToAdd"
      @edited="commitTeamEdit"
    />
  </div>
</template>

<script setup lang="ts">
import { buildCreature } from '@/types/creatures/creatures';
import ArtifactPortrait from './ArtifactPortrait.vue';
import CharacterPortrait from './CharacterPortrait.vue';
import UiCard from './UiCard.vue';
import { useGameStore } from '@/stores/gameStore';
import type { Game } from '@/types/Game';
import { buildArtifact } from '@/types/artifacts/artifacts';
import { GameUtils } from '@/utils/GameUtils.ts';
import { ref, type Ref } from 'vue';
import type { Creature } from '@/types/creatures/Creature.ts';
import type { Artifact } from '@/types/artifacts/Artifact.ts';
import TeamDetailDialog from './TeamDetailDialog.vue';

const game: Game = useGameStore().current!;

const emits = defineEmits(['close']);

const showTeamDetail: Ref<boolean> = ref(false);
const creatureToAdd: Ref<Creature | undefined> = ref();
const artifactToAdd: Ref<Artifact | undefined> = ref();

function addCreature(creature: Creature) {
  creatureToAdd.value = creature;
  artifactToAdd.value = undefined;
  showTeamDetail.value = true;
}

function addArtifact(artifact: Artifact) {
  creatureToAdd.value = undefined;
  artifactToAdd.value = artifact;
  showTeamDetail.value = true;
}

function healTeam() {
  const maxHp: number = GameUtils.getTotalHp(game);
  game.hp = Math.min(maxHp, game.hp + .1 * maxHp);
  emits('close');
}

function commitTeamEdit() {
  showTeamDetail.value = false;
  emits('close');
}
</script>

<style lang="scss" scoped>
.wrapper {
  user-select: none;
  touch-action: none;
  position: relative;
  padding: 20px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: #000a;
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

.shop-content .v-col:not(.v-col--cols-auto) {
  width: 300px;
}
</style>
