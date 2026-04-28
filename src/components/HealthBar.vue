<template>
  <div>
    <div class="frame">
      <div class="health" >
        <div class="value">
          {{ game.hp }} / {{ totalHp }}
          <v-icon
                icon="mdi-heart"
                size="xs"
                color="pink-lighten-1"
                style="margin-top: -2px"
              />
        </div>
        <span class="bar bg-pink-darken-3 opacity-80"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore';
import type { Game } from '@/types/Game';
import { GameUtils } from '@/utils/GameUtils';
import { computed } from 'vue';

const width = computed<string>(() => '500px');
const height = computed<string>(() => '50px');
const frameColor = computed<string>(() => 'rgb(var(--v-theme-C))');

const game: Game = useGameStore().current!;
const totalHp = computed<number>(() => GameUtils.getTotalHp(game));
const barWidth = computed<string>(() => `${game.hp / totalHp.value * 100}%`);
</script>

<style lang="scss" scoped>
.frame {
  position: relative;
  width: v-bind('width');
  height: v-bind('height');

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background-color: v-bind('frameColor');
    -webkit-mask-image: url('/ui/health-bar.png');
    mask-image: url('/ui/health-bar.png');
    mask-size: cover;
    mask-repeat: no-repeat;
    filter: brightness(.9);
    z-index: 2;
  }

  &::after {
    position: absolute;
    top: 2px; 
    left: 2px;
    right: -2px;
    bottom: -2px;
    content: '';
    background-color: black;
    -webkit-mask-image: url('/ui/health-bar.png');
    mask-image: url('/ui/health-bar.png');
    mask-size: cover;
    filter: blur(4px);
    z-index: 1;
    opacity: 0.5;
  }
}

.health {
  position: relative;
  height: calc(100% - 2px);
  width: calc(100% - 2px);
  margin: 1px;

  &::before {
    position: absolute;
    top: 1px;
    bottom: 1px;
    left: 1px;
    right: 1px;
    content: '';
    background: #000a;
    border-radius: 4px;
  }

  & > .bar {
    position: absolute;
    top: 1px;
    border-radius: 4px;
    height: calc(100% - 2px);
    width: v-bind('barWidth');
    transition: width .3s ease-in-out;
  }

  & > .value {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.8rem;
    font-weight: bold;
    z-index: 1;
    text-shadow: black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px, black 0 0 2px;
  }
}
</style>