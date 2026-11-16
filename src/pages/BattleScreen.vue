<template>
  <div class="background">
    <div class="general-info beleren-small-caps">
      {{ $t(`planes.name.${buildPlane(game.plane).name}`) }} - {{ game.floor }}
    </div>
    <battle-info
      ref="battleInfo"
      class="battle-info"
      :class="{hidden: shopOpen}"
      @check-victory="checkBattleEnd"
      @battle-end="openShop"
    />
    <mana-board
      ref="manaBoard"
      class="mana-board"
      :class="{hidden: shopOpen}"
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
    <team-detail-dialog v-model="teamOpen" />
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
import { computed, provide, ref } from 'vue';
import TeamDetailDialog from '@/components/TeamDetailDialog.vue';
import IconButton from '@/components/IconButton.vue';
import type { BattleContext } from '@/types/BattleContext';
import { sleep } from '@/utils/TsUtils';
import type { Effect } from '@/types/effects/Effect';

const game = useGameStore().current!;
const shopOpen = ref<boolean>(false);
const teamOpen = ref<boolean>(false);

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
    openShop();
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

function commitFloor() {
  shopOpen.value = false;
  isBattleEnding.value = false;
  GameUtils.nextFloor(game);
  useGameStore().saveGame();
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

.team-button {
  position: absolute;
  bottom: 20px;
  left: 20px;
  transition: bottom 1s ease-in-out;

  &.hidden {
    bottom: -10%;
  }
}
</style>
