<template>
  <div>
    <div class="spells">
      <div
        v-for="(spell, index) in spells"
        :key="index"
        class="d-flex justify-center"
      >
        <div
          class="portrait-wrapper"
          :class="{ 'can-activate': canActivate(index)}"
          @click="activateSpell(index)"
        >
          <spell-portrait :spell />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore';
import type { BattleContext } from '@/types/BattleContext';
import type { Game } from '@/types/Game';
import type { Spell } from '@/types/spells/Spell.ts';
import { buildSpell } from '@/types/spells/spells.ts';
import { computed, inject } from 'vue';
import SpellPortrait from './SpellPortrait.vue';

const game: Game = useGameStore().current!;
const battleContext = inject<BattleContext | null>('battleContext', null);

const spells = computed<(Spell | null)[]>(() => game.spells.map(c => c ? buildSpell(c) : null));

function canActivate(index: number): boolean {
  if (!battleContext || !battleContext.canAct()) return false;
  const spell = spells.value[index];
  if (!spell?.activatedAbility) return false;
  return spell?.activatedAbility.condition(game);
}

function activateSpell(index: number) {
  if (!canActivate(index) || !battleContext) return;
  const spell = spells.value[index];
  if (!spell?.activatedAbility) return;

  game.spells[index] = null;
  const success = spell.activatedAbility.execute(battleContext, { sourceIndex: index, sourceType: 'spell' });
  if (!success) {
    game.spells[index] = spell.name;
  }
}
</script>

<style lang="scss" scoped>
.spells {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
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
