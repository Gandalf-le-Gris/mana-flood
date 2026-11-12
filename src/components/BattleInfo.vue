<template>
  <div>
    <div class="wrapper">
      <v-row density="compact">
        <v-col
          v-for="(enemy, index) in enemies"
          :key="index"
          ref="enemiesRefs"
          class="d-flex justify-center position-relative"
        >
          <enemy-frame
            :enemy
            :priority="priorities.indexOf(index)"
            @click="targetEnemy(index)"
          />
        </v-col>
      </v-row>
      <div class="my-12 py-4"></div>
      <team-info ref="teamInfo" />
    </div>
  </div>
</template>

<script setup lang="ts">
import EnemyFrame from './EnemyFrame.vue';
import TeamInfo from './TeamInfo.vue';
import { useGameStore } from '@/stores/gameStore';
import type { ExtendedColor } from '@/types/Color';
import { Creature } from '@/types/creatures/Creature';
import { buildCreature } from '@/types/creatures/creatures';
import type { Game } from '@/types/Game';
import { CreatureUtils } from '@/utils/CreatureUtils';
import { GameUtils } from '@/utils/GameUtils';
import { onMounted, ref, watch } from 'vue';

const game: Game = useGameStore().current!;

const emit = defineEmits(['battle-end', 'check-victory']);

const enemies = ref<Creature[]>([]);
const enemiesRefs = ref<InstanceType<typeof EnemyFrame>[]>([]);
const teamInfo = ref<InstanceType<typeof TeamInfo> | null>(null);

const priorities = ref<number[]>([]);

function targetEnemy(index: number) {
  const i = priorities.value.indexOf(index);
  if (i === -1) {
    priorities.value.push(index);
  } else {
    priorities.value.splice(i, 1);
  }
}

function areAllEnemiesDead(): boolean {
  return enemies.value.length > 0 && !enemies.value.some(e => e.hp > 0);
}

function hasAliveEnemies(): boolean {
  return enemies.value.some(e => e.hp > 0);
}

function checkEnemiesStatus() {
  if (areAllEnemiesDead()) {
    emit('check-victory');
  }
}

function dealDamageToEnemy(damage: number, color: ExtendedColor, targetIndex?: number) {
  if (damage > 0) {
    const target: number = targetIndex !== undefined
      ? targetIndex
      : (priorities.value.length ? priorities.value[0] : enemies.value.findIndex(c => c.hp > 0));
    if (target !== -1 && enemies.value[target] && enemies.value[target].hp > 0) {
      CreatureUtils.visualDamage(damage, color, enemiesRefs.value[target]?.$el);
      enemies.value[target].hp = Math.max(0, enemies.value[target].hp - damage);
      if (enemies.value[target].hp <= 0) {
        const i = priorities.value.indexOf(target);
        if (i !== -1) {
          priorities.value.splice(i, 1);
        }
        game.currentEnemies.splice(game.currentEnemies.indexOf(enemies.value[target].name), 1);
        checkEnemiesStatus();
      }
    }
  }
}

function dealDamageToAllEnemies(damage: number, color: ExtendedColor) {
  for (let i = 0; i < enemies.value.length; i++) {
    if (enemies.value[i].hp > 0) {
      dealDamageToEnemy(damage, color, i);
    }
  }
}

function healTeam(amount: number) {
  teamInfo.value?.heal(amount);
}

function damageTeam(amount: number) {
  teamInfo.value?.takeDamage(amount);
}

function enemyTurn() {
  teamInfo.value?.onTurnEnd();
  for (const enemy of enemies.value) {
    if (enemy.hp > 0) {
      enemy.timer--;
      if (!enemy.timer) {
        enemy.timer = enemy.speed;
        teamInfo.value?.takeDamage(GameUtils.computeEnemyDamage(game, enemy, enemies.value.filter(e => e.hp > 0)));
      }
    }
  }
}

defineExpose({
  dealDamageToEnemy,
  dealDamageToAllEnemies,
  healTeam,
  damageTeam,
  enemyTurn,
  teamInfo,
  areAllEnemiesDead,
  hasAliveEnemies,
});

function rebuildEnemies() {
  enemies.value = game.currentEnemies.map(e => buildCreature(e));
  enemies.value.forEach(e => {
    e.hp = CreatureUtils.getHp(e);
    e.timer = e.speed;
  });
}

onMounted(() => {
  rebuildEnemies();
});

watch(() => game.floor, rebuildEnemies);
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  width: 800px;
}
</style>
