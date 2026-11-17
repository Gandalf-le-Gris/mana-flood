<template>
  <div>
    <div
      class="frame"
      :class="{dead: enemy.hp <= 0, boss: isBoss }"
      @click.right="showDetail = true"
    >
      <v-img
        :width
        :height
        :src="`/creatures/${enemy.name}.jpg`"
        :alt="$t(`creatures.name.${enemy.name}`)"
        cover
        class="masked"
      />
      <h1 class="timer">
        {{ enemy.timer }}
      </h1>
      <div class="text">
        <h2 class="beleren-small-caps text-center">{{ $t(`creatures.name.${enemy.name}`) }}</h2>
        <div class="d-flex justify-space-between mx-5 mt-n7">
          <h2 class="d-flex">
            {{ CreatureUtils.getEnemyDamage(enemy, game) }}
            <v-icon
              icon="mdi-sword"
              size="xs"
              class="mt-1 ml-1"
              color="orange-lighten-1"
            />
          </h2>
          <h2 class="d-flex">
            {{ enemy.hp }}
            <v-icon
              icon="mdi-heart"
              size="xs"
              class="mt-1 ml-1"
              color="pink-lighten-1"
            />
          </h2>
        </div>
      </div>
      <div
        v-if="priority !== -1"
        class="priority"
      >
        <v-icon
          icon="mdi-target"
          color="red"
          size="48"
        />
        <span class="beleren">{{ priority + 1 }}</span>
      </div>
      <div
        v-if="isBoss"
        class="boss-icon"
      >
        <v-icon
          icon="mtg:boss"
          :color="skullColor"
          size="40"
        />
      </div>
    </div>
    <character-detail-dialog
      v-model="showDetail"
      :character="enemy"
      :damage="CreatureUtils.getEnemyDamage(enemy, game)"
      enemy
    />
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore.ts';
import { Creature } from '@/types/creatures/Creature';
import type { Game } from '@/types/Game.ts';
import { CreatureUtils } from '@/utils/CreatureUtils.ts';
import { computed, ref, type Ref } from 'vue';
import CharacterDetailDialog from './CharacterDetailDialog.vue';

const props = defineProps<{
  enemy: Creature,
  priority: number,
}>();

const showDetail: Ref<boolean> = ref(false);

const game: Game = useGameStore().current!;

const isBoss = computed(() => CreatureUtils.isBoss(props.enemy));
const width = computed(() => '250px');
const height = computed(() => '370px');
const frameColor = computed(() => {
  switch (props.enemy.colors.length) {
    case 0:
      return 'rgb(var(--v-theme-C))';
    case 1:
      return `rgb(var(--v-theme-${props.enemy?.colors[0]}))`;
    case 2:
      return `linear-gradient(90deg, rgb(var(--v-theme-${props.enemy?.colors[0]})) 0%, rgb(var(--v-theme-${props.enemy?.colors[0]})) 35%, rgb(var(--v-theme-${props.enemy?.colors[1]})) 65%, rgb(var(--v-theme-${props.enemy?.colors[1]})) 100%)`;
    default:
      return 'rgb(var(--v-theme-WUBRG))';
  }
});
const skullColor = computed(() => {
  switch (props.enemy.colors.length) {
    case 0:
      return 'rgb(var(--v-theme-C-light))';
    case 1:
      return `rgb(var(--v-theme-${props.enemy?.colors[0]}-light))`;
    default:
      return 'rgb(var(--v-theme-WUBRG-light))'
  }
})
</script>

<style lang="scss" scoped>
.frame {
  position: relative;
  width: v-bind('width');
  height: v-bind('height');
  cursor: pointer;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: v-bind('frameColor');
    -webkit-mask-image: url('/ui/enemy-frame.png');
    mask-image: url('/ui/enemy-frame.png');
    mask-size: cover;
    mask-repeat: no-repeat;
    filter: brightness(.9) drop-shadow(0 0 10px #000a);
    z-index: 2;
  }

  &::after {
    position: absolute;
    top: 1px; 
    left: 2px;
    right: -2px;
    bottom: -1px;
    content: '';
    background-color: black;
    -webkit-mask-image: url('/ui/enemy-frame.png');
    mask-image: url('/ui/enemy-frame.png');
    mask-size: cover;
    filter: blur(4px);
    z-index: 1;
    opacity: 0.5;
  }

  &.dead {
    pointer-events: none;
    filter: grayscale(1) brightness(.5);
  }

  &.boss {
    transform: scale(1.1);
    margin: 0 16px;
  }
}

.masked {
  z-index: -1;
  -webkit-mask-image: url('/ui/enemy-mask.png');
  mask-image: url('/ui/enemy-mask.png');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-position: center;
  mask-position: center;
}

.timer {
  position: absolute;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  text-shadow: black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px;
}

.text {
  position: absolute;
  bottom: -8px;
  width: 100%;
  z-index: 2;
  text-shadow: black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px;
}

.priority {
  position: absolute;
  top: -48px;
  left: 50%;
  transform: translateX(calc(-50% + 1px));
  
  & > span {
    position: absolute;
    top: 53%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 1.7rem;
    font-weight: bold;
    text-shadow: red 0 0 2px, red 0 0 2px, red 0 0 2px, red 0 0 2px, red 0 0 2px, red 0 0 2px, red 0 0 2px, red 0 0 2px;
  }
}

.boss-icon {
  position: absolute;
  bottom: -16px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
}
</style>