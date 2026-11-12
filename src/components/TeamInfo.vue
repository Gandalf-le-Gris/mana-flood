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
          class="creature-slot d-flex justify-center"
        >
          <div
            class="portrait-wrapper"
            :class="{ 'can-activate': canActivate(index) }"
            @click="triggerAbility(index)"
          >
            <character-portrait
              :character="creature"
              :cooldown="game.cooldowns?.[index]"
              :is-ready="canActivate(index)"
            />
          </div>
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
import { computed, inject, ref } from 'vue';
import type { Artifact } from '@/types/artifacts/Artifact';
import { buildArtifact } from '@/types/artifacts/artifacts';
import { CreatureUtils } from '@/utils/CreatureUtils';
import type { BattleContext } from '@/types/BattleContext';

const game: Game = useGameStore().current!;
const battleContext = inject<BattleContext | null>('battleContext', null);

if (!game.cooldowns) {
  game.cooldowns = [0, 0, 0, 0, 0];
}

const healthBar = ref<InstanceType<typeof HealthBar> | null>(null);

const team = computed<(Creature | null)[]>(() => game.team.map(c => c ? buildCreature(c) : null));
const artifacts = computed<(Artifact | null)[]>(() => game.artifacts.map(c => c ? buildArtifact(c) : null));

function onTurnEnd() {
  if (!game.cooldowns) return;
  for (let i = 0; i < game.cooldowns.length; i++) {
    if (game.cooldowns[i] > 0) {
      game.cooldowns[i]--;
    }
  }
  useGameStore().saveGame();
}

function canActivate(index: number): boolean {
  if (!battleContext || !battleContext.canAct()) return false;
  const creature = team.value[index];
  if (!creature?.activatedAbility) return false;
  return (game.cooldowns?.[index] ?? 0) <= 0;
}

function triggerAbility(index: number) {
  if (!canActivate(index) || !battleContext) return;
  const creature = team.value[index];
  if (!creature?.activatedAbility) return;

  const ability = creature.activatedAbility;
  const success = ability.execute(battleContext);
  if (success) {
    game.cooldowns[index] = ability.cooldown;
    useGameStore().saveGame();
  }
}

function takeDamage(damage: number) {
  game.hp -= damage;
  CreatureUtils.visualDamage(damage, 'C', healthBar.value?.$el);
}

function heal(amount: number) {
  if (amount > 0) {
    game.hp += amount;
    CreatureUtils.visualDamage(amount, 'G', healthBar.value?.$el);
  }
}

defineExpose({ takeDamage, heal, onTurnEnd });
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

  &.artifacts > * {
    margin: 8px 20px 0;
  }
}

.portrait-wrapper {
  position: relative;
  transition: transform 0.2s ease;

  &.can-activate {
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }
  }
}
</style>
