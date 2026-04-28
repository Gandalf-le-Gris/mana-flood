<template>
  <div class="background">
    <div class="title beleren-small-caps">
      Mana Flood
    </div>
    <div class="options">
      <button class="beleren-small-caps">
       {{ $t('title.options.achievements') }}
      </button>
      <button class="beleren-small-caps">
       {{ $t('title.options.codex') }}
      </button>
      <button
        class="main beleren-small-caps"
        @click="newGame"
      >
       {{ $t('title.options.play') }}
      </button>
      <button
        class="beleren-small-caps"
        :class="{ disabled: !gameStore.current }"
      >
       {{ $t('title.options.load') }}
      </button>
      <button class="beleren-small-caps">
       {{ $t('title.options.settings') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore';
import { ScreenTransition } from '@/utils/ScreenTransition';

const gameStore = useGameStore();
const emit = defineEmits(['move-to-screen']);

function newGame() {
  gameStore.newGame();
  emit('move-to-screen', 'BattleScreen', ScreenTransition.FadeToBlack)
}
</script>

<style lang="scss" scoped>
.background {
  background-image: url('/backgrounds/title-screen.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

.title {
  position: absolute;
  top: 48px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10rem;
  text-shadow: black 0 0 150px, black 0 0 100px, black 0 0 75px, black 0 0 50px, black 0 0 50px;
  animation: float 5s ease-in-out infinite;
}

.options {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: 300px 300px 400px 300px 300px;
  gap: 48px;

  > button {
    font-size: 3rem;
    background: #000a;
    padding: 12px 24px;
    border-radius: 24px 24px 0px 0;
    height: fit-content;
    margin-top: auto;
    transition: all .2s;

    &.main {
      font-size: 5rem;
      padding: 20px 40px;
      border-radius: 40px 40px 0px 0;
    }

    &:hover {
      background: #000;
      transform: scale(1.1);
    }

    &.disabled {
      pointer-events: none;
      opacity: .5;
    }
  }
}

@keyframes float {
  0% {
    transform: translateX(-50%) translateY(10px);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
  100% {
    transform: translateX(-50%) translateY(10px);
  }
}
</style>
