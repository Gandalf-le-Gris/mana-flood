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
import { GameUtils } from '@/utils/GameUtils.ts';
import { EffectTrigger } from '@/types/effects/EffectTrigger.ts';

const game: Game = useGameStore().current!;
const battleContext = inject<BattleContext | null>('battleContext', null);

const spells = computed<(Spell | null)[]>(() => game.spells.map(c => c ? buildSpell(c) : null));

function canActivate(index: number): boolean {
  if (!battleContext || !battleContext.canAct()) return false;
  const spell = spells.value[index];
  if (!spell?.activatedAbility) return false;
  if (GameUtils.countEffectActive(game, 'enemy.spell-lock')) return false;
  return spell?.activatedAbility.condition(game, { sourceIndex: index });
}

async function activateSpell(index: number) {
  if (!canActivate(index) || !battleContext) return;
  const spell = spells.value[index];
  if (!spell?.activatedAbility) return;

  battleContext.setBusy(true);
  try {
    game.spells[index] = null;
    await spell.activatedAbility.execute(battleContext, { sourceIndex: index, sourceType: 'spell' });
    await GameUtils.broadcastEvent(battleContext, EffectTrigger.SPELL, {});
  } finally {
    battleContext.setBusy(false);
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
