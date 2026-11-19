<template>
  <v-dialog
    v-model="show"
    width="auto"
    persistent
  >
    <div class="wrapper">
      <div class="d-flex position-relative">
        <h1
          class="my-2 text-center w-100 beleren-small-caps"
          :class="{ 'text-red-lighten-2': defeat }"
          style="font-size: 2.5em;"
        >
          {{ $t(defeat ? 'results.defeat' : 'results.victory') }}
        </h1>
        <icon-button
          icon="mdi-close"
          size="48"
          class="close-btn"
          @click="show = false"
        />
      </div>
      <div class="main-section mt-6">
        <h1
          class="text-center"
          v-if="defeat"
        >
          {{ $t('results.floor-reached', [game.floor]) }}
        </h1>
        <div class="d-flex ga-8 mx-auto mt-6">
          <text-button
            v-if="!defeat"
            :text="$t('results.continue')"
            :size="60"
            @click="continueInfinite"
          />
          <text-button
            :text="$t('results.leave')"
            :size="60"
            @click="leave"
          />
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore';
import type { Game } from '@/types/Game';
import TextButton from './TextButton.vue';

const props = withDefaults(defineProps<{
  defeat?: boolean,
}>(), {
  defeat: false,
});

const show = defineModel({ type: Boolean, required: true });

const emits = defineEmits(['continue', 'leave']);

const game: Game = useGameStore().current!;

function continueInfinite(): void {
  show.value = false;
  emits('continue');
}

function leave() {
  show.value = false;
  emits('leave');
}
</script>

<style lang="scss" scoped>
.close-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.main-section {
  display: flex;
  width: 800px;
  display: flex;
  flex-direction: column;

  > *:nth-child(1) {
    width: var(--base-width);
  }

  > *:nth-child(2) {
    width: var(--extra-width);
  }
}

.wrapper {
  user-select: none;
  touch-action: none;
  position: relative;
  padding: 32px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: #000;
    border-radius: 40px;
    z-index: -1;
  }

  &:after {
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    content: '';
    border-image: url(/ui/metal-frame.png) 100 / 80px round;
    pointer-events: none;
  }
}
</style>
