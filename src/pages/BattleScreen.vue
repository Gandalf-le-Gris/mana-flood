<template>
  <div class="background">
    <div class="general-info beleren-small-caps">
      {{ $t(`planes.name.${buildPlane(game.plane).name}`) }} - {{ game.floor }}
      <v-btn @click="shopOpen = !shopOpen"></v-btn>
    </div>
    <battle-info
      ref="battleInfo"
      class="battle-info"
      :class="{hidden: shopOpen}"
      @battle-end="openShop"
    />
    <mana-board
      class="mana-board"
      :class="{hidden: shopOpen}"
      @match="processMatch"
      @turn-end="turnEnd"
    />
    <battle-shop
      class="shop"
      :class="{hidden: !shopOpen}"
    />
  </div>
</template>

<script setup lang="ts">
import BattleInfo from '@/components/BattleInfo.vue';
import ManaBoard from '@/components/ManaBoard.vue';
import BattleShop from '@/components/BattleShop.vue';
import { useGameStore } from '@/stores/gameStore';
import type { ExtendedColor } from '@/types/Color';
import { Game } from '@/types/Game';
import { buildPlane } from '@/types/planes/planes';
import { GameUtils } from '@/utils/GameUtils';
import { computed, ref } from 'vue';

const battleInfo = ref<InstanceType<typeof BattleInfo> | null>(null);

const game = computed<Game>(() => useGameStore().current!);
const shopOpen = ref<boolean>(true);

const backgroundImage = computed(() => `url(/planes/${buildPlane(game.value.plane).name}.jpg)`);

interface MatchGroup {
  color: ExtendedColor;
  size: number;
}

function processMatch(matches: MatchGroup[]) {
  for (const match of matches) {
    const damage = GameUtils.computeMatchDamage(game.value, match);
    battleInfo.value?.dealDamageToEnemy(damage, match.color);
  }
}

function turnEnd() {
  battleInfo.value?.enemyTurn();
}

function openShop() {
  shopOpen.value = true;
}
</script>

<style lang="scss" scoped>
.background {
  position: relative;

  &::before {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    content: '';
    position: absolute;
    background-image: v-bind('backgroundImage');
    background-size: cover;
    background-repeat: no-repeat;
  }
}

.general-info {
  position: absolute;
  top: 24px;
  left: 24px;
  font-size: 2rem;
  text-shadow: black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px;
}

.battle-info {
  position: absolute;
  top: 50%;
  left: 40px;
  transform: translateY(-50%);
  transition: left 1s ease-in-out;

  &.hidden {
    left: -100%;
  }
}

.mana-board {
  position: absolute;
  top: 50%;
  right: 64px;
  transform: translateY(-50%);
  transition: right 1s ease-in-out;

  &.hidden {
    right: -100%;
  }
}

.shop {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: top 1s ease-in-out;

  &.hidden {
    top: -100%;
  }
}
</style>
