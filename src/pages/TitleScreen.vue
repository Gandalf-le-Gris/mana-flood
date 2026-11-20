<template>
  <div class="background">
    <div class="title beleren-small-caps">
      Mana Flood
    </div>
    <div class="options">
      <text-button
        :text="$t('title.options.achievements')"
        :size="80"
        disabled
      />
      <text-button
        :text="$t('title.options.codex')"
        :size="80"
        @click="emit('move-to-screen', 'CodexScreen', ScreenTransition.FadeToBlack)"
      />
      <text-button
        :text="$t('title.options.play')"
        :size="150"
        @click="newGame"
      />
      <text-button
        :text="$t('title.options.load')"
        :size="80"
        :disabled="!gameStore.current"
        @click="emit('move-to-screen', 'BattleScreen', ScreenTransition.FadeToBlack)"
      />
      <text-button
        :text="$t('title.options.settings')"
        :size="80"
        disabled
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TextButton from '@/components/TextButton.vue';
import { useGameStore } from '@/stores/gameStore';
import { useUnlockStore } from '@/stores/unlocksStore';
import { ScreenTransition } from '@/utils/ScreenTransition';

const gameStore = useGameStore();
const emit = defineEmits(['move-to-screen']);

function newGame() {
  if (useUnlockStore().get.creatures.length > 5) {
    emit('move-to-screen', 'TeamSelector', ScreenTransition.FadeToBlack);
  } else {
    gameStore.newGame();
    emit('move-to-screen', 'BattleScreen', ScreenTransition.FadeToBlack);
  }
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
  grid-template-columns: 300px 300px 500px 300px 300px;
  gap: 48px;

  > * {
    margin: auto auto 20px auto;
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
