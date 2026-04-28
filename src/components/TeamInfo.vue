<template>
  <div>
    <div class="d-flex flex-column justify-center">
      <health-bar
        class="health-bar position-relative"
        ref="healthBar"
      />
      <div class="team">
        <div
          v-for="(creature, index) in team"
          :key="index"
        >
          <character-portrait :character="creature" />
        </div>
      </div>
      <div class="team artifacts">
        <div
          v-for="(artifact, index) in artifacts"
          :key="index"
        >
          <artifact-portrait :artifact="artifact" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArtifactPortrait from './ArtifactPortrait.vue';
import CharacterPortrait from './CharacterPortrait.vue';
import HealthBar from './HealthBar.vue';
import { useGameStore } from '@/stores/gameStore';
import type { Creature } from '@/types/creatures/Creature';
import { buildCreature } from '@/types/creatures/creatures';
import type { Game } from '@/types/Game';
import { computed, ref } from 'vue';
import type { Artifact } from '@/types/artifacts/Artifact';
import { buildArtifact } from '@/types/artifacts/artifacts';
import { CreatureUtils } from '@/utils/CreatureUtils';

const game: Game = useGameStore().current!;

const healthBar = ref<InstanceType<typeof HealthBar> | null>(null);

const team = computed<(Creature | null)[]>(() => game.team.map(c => c ? buildCreature(c) : null));
const artifacts = computed<(Artifact | null)[]>(() => game.artifacts.map(c => c ? buildArtifact(c) : null));

function takeDamage(damage: number) {
  game.hp -= damage;
  CreatureUtils.visualDamage(damage, 'C', healthBar.value?.$el);
}

defineExpose({ takeDamage });
</script>

<style lang="scss" scoped>
.health-bar {
  width: -webkit-fit-content;
  margin: 0 auto 32px;
}

.team {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}

.team {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  &.artifacts > * {
    margin: 8px 20px 0;
  }
}
</style>
