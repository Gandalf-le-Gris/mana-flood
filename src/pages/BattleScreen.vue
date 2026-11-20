<template>
  <div class="background">
    <transition name="bg-fade">
      <div
        :key="game.plane"
        class="bg-layer"
        :style="{ backgroundImage }"
      />
    </transition>
    <div class="general-info beleren-small-caps">
      {{ $t(`planes.name.${buildPlane(game.plane).name}`) }}<span v-if=game.floor> - {{ game.floor }}</span>
    </div>
    <battle-info
      ref="battleInfo"
      class="battle-info"
      :class="{hidden: shopOpen || planesOpen}"
      @check-victory="checkBattleEnd"
      @battle-end="openShop"
    />
    <mana-board
      ref="manaBoard"
      class="mana-board"
      :class="{hidden: shopOpen || planesOpen}"
      :disabled="isBattleEnding"
      @match="processMatch"
      @turn-end="onTurnEnd"
    />
    <battle-shop
      class="shop"
      :class="{hidden: !shopOpen}"
      @close="commitFloor"
    />
    <icon-button
      icon="mdi-account-multiple"
      size="80"
      variant="hexa"
      class="team-button"
      :class="{hidden: !shopOpen}"
      @click="teamOpen = true"
    />
    <plane-selector
      v-if="planesOpen"
      :fade-in="game.floor > 0"
      @select="moveToPlane"
    />
    <icon-button
      icon="mdi-location-exit"
      size="60"
      variant="hexa"
      class="exit-button"
      @click="emits('move-to-screen', 'TitleScreen', ScreenTransition.FadeToBlack)"
    />
    <icon-button
      icon="mdi-cog"
      size="60"
      variant="hexa"
      class="settings-button"
    />
    <team-detail-dialog v-model="teamOpen" />
    <result-dialog
      v-model="resultsOpen"
      :defeat
      @leave="emits('move-to-screen', 'TitleScreen', ScreenTransition.FadeToBlack)"
      @continue="openShop"
    />
  </div>
</template>

<script setup lang="ts">
import BattleInfo from '@/components/BattleInfo.vue';
import BattleShop from '@/components/BattleShop.vue';
import IconButton from '@/components/IconButton.vue';
import ManaBoard from '@/components/ManaBoard.vue';
import PlaneSelector from '@/components/PlaneSelector.vue';
import ResultDialog from '@/components/ResultDialog.vue';
import TeamDetailDialog from '@/components/TeamDetailDialog.vue';
import { useGameStore } from '@/stores/gameStore';
import { useUnlockStore } from '@/stores/unlocksStore';
import type { BattleContext } from '@/types/BattleContext';
import type { ExtendedColor } from '@/types/Color';
import type { Effect } from '@/types/effects/Effect';
import { Game } from '@/types/Game';
import { buildPlane } from '@/types/planes/planes';
import { insertUnique } from '@/utils/ArrayUtils';
import { GameUtils } from '@/utils/GameUtils';
import { ScreenTransition } from '@/utils/ScreenTransition';
import { sleep } from '@/utils/TsUtils';
import { computed, onMounted, provide, ref, watch } from 'vue';

const game: Game = useGameStore().current!;
const shopOpen = ref<boolean>(false);
const teamOpen = ref<boolean>(false);
const planesOpen = ref<boolean>(false);
const resultsOpen = ref<boolean>(false);
const defeat = ref<boolean>(false);

const emits = defineEmits(['move-to-screen']);

const battleInfo = ref<InstanceType<typeof BattleInfo> | null>(null);
const manaBoard = ref<InstanceType<typeof ManaBoard> | null>(null);
const isBattleEnding = ref<boolean>(false);

async function checkBattleEnd() {
  if (isBattleEnding.value) return;
  if (!battleInfo.value) return;

  const allEnemiesDead = battleInfo.value.areAllEnemiesDead();
  const boardBusy = manaBoard.value?.isBusy() ?? false;

  if (allEnemiesDead && !boardBusy) {
    isBattleEnding.value = true;
    await sleep(1000);
    if (game.floor === GameUtils.FINAL_FLOOR) {
      resultsOpen.value = true;
    } else {
      openShop();
    }
  }
}

const battleContext: BattleContext = {
  game,
  healTeam(amount: number) {
    battleInfo.value?.healTeam(amount);
  },
  damageTeam(amount: number) {
    battleInfo.value?.damageTeam(amount);
  },
  damageEnemy(damage: number, color: ExtendedColor = 'C', targetIndex?: number) {
    battleInfo.value?.dealDamageToEnemy(damage, color, targetIndex);
  },
  damageAllEnemies(damage: number, color: ExtendedColor = 'C') {
    battleInfo.value?.dealDamageToAllEnemies(damage, color);
  },
  convertOrbs(count: number, toColor: ExtendedColor, fromColor?: ExtendedColor) {
    if (manaBoard.value?.isBusy() || isBattleEnding.value) return false;
    return manaBoard.value?.convertOrbs(count, toColor, fromColor) ?? false;
  },
  destroyOrbs(count: number, avoidColor?: ExtendedColor) {
    if (manaBoard.value?.isBusy() || isBattleEnding.value) return false;
    return manaBoard.value?.destroyOrbs(count, avoidColor) ?? false;
  },
  shuffleBoard() {
    if (manaBoard.value?.isBusy() || isBattleEnding.value) return false;
    return manaBoard.value?.shuffleBoard() ?? false;
  },
  rechargeCreature(index: number, turns: number) {
    battleInfo.value?.rechargeCreature(index, turns);
  },
  rechargeArtifact(index: number, turns: number) {
    battleInfo.value?.rechargeArtifact(index, turns);
  },
  canAct() {
    return !(manaBoard.value?.isBusy() || isBattleEnding.value);
  }
};

provide('battleContext', battleContext);

const backgroundImage = computed(() => `url(/planes/${buildPlane(game.plane).name}.jpg)`);

export interface MatchGroup {
  color: ExtendedColor;
  size: number;
}

function processMatch(matches: MatchGroup[]) {
  const activeEffects: Effect[] = GameUtils.getActiveEffects(game);
  for (const match of matches) {
    const damage = GameUtils.computeMatchDamage(game, match);
    battleInfo.value?.dealDamageToEnemy(damage, match.color);
    for (const effect of activeEffects) {
      if (effect.matchEffect) {
        effect.matchEffect(battleContext, match);
      }
    }
  }
}

function onTurnEnd() {
  battleInfo.value?.teamInfo?.onTurnEnd();
  if (battleInfo.value?.areAllEnemiesDead()) {
    checkBattleEnd();
    return;
  }
  battleInfo.value?.enemyTurn();
}

function openShop() {
  shopOpen.value = true;
}

async function commitFloor() {
  shopOpen.value = false;
  isBattleEnding.value = false;
  if (game.floor % 10 !== 0) {
    await GameUtils.nextFloor(game);
    useGameStore().saveGame();
    useUnlockStore().persist();
  } else {
    planesOpen.value = true;
  }
}

async function moveToPlane(plane: string) {
  game.plane = plane;
  insertUnique(useUnlockStore().get.planes, plane);
  await GameUtils.nextFloor(game);
  useGameStore().saveGame();
  useUnlockStore().persist();
  battleContext.healTeam(GameUtils.getTotalHp(game));
  planesOpen.value = false;
}

watch(() => game.hp, (hp) => {
  if (hp <= 0 && !isBattleEnding.value) {
    isBattleEnding.value = true;
    defeat.value = true;
    setTimeout(() => {
      resultsOpen.value = true;
    }, 1000);
  }
});

onMounted(() => {
  if (game.floor === 0) {
    planesOpen.value = true;
  }
});
</script>

<style lang="scss" scoped>
.background {
  position: relative;
  overflow: hidden;

  .bg-layer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-size: cover;
    background-repeat: no-repeat;
    pointer-events: none;
  }
}

.bg-fade-enter-active,
.bg-fade-leave-active {
  transition: opacity .75s ease-in-out;
}

.bg-fade-enter-from,
.bg-fade-leave-to {
  opacity: 0;
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

.team-button {
  position: absolute;
  bottom: 20px;
  left: 20px;
  transition: bottom 1s ease-in-out;

  &.hidden {
    bottom: -10%;
  }
}

.exit-button {
  position: absolute;
  top: 20px;
  right: 16px;
}

.settings-button {
  position: absolute;
  top: 20px;
  right: 90px;
}
</style>
