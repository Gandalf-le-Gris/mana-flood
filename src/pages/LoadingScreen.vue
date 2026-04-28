<template>
  <div
    class="h-100 w-100 bg-black d-flex"
    @click="toTitleScreen"
  >
    <color-wheel class="color-wheel" />
    <div class="loader">
      <v-progress-linear
        v-model="amountLoaded"
        :max="totalAssets"
        height="32"
        color="C"
        bg-color="white"
        bg-opacity=".2"
        striped
        rounded
      >
        <template #default="{ value }">
          <h2 class="mt-6">{{ Math.ceil(value) }}%</h2>
        </template>
      </v-progress-linear>
      <h1 class="text-center mt-6">
        {{ $t(amountLoaded === totalAssets ? 'loading.click': 'loading.loading') }}
      </h1>
      <v-icon
        v-if="amountLoaded < totalAssets"
        icon="mtg:C-plain"
        size="48"
        class="progress-icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ScreenTransition } from '@/utils/ScreenTransition';
import { computed, onMounted, ref, type ComputedRef, type Ref } from 'vue';
import ColorWheel from '@/components/ColorWheel.vue';

const emit = defineEmits(['move-to-screen']);

const imagesToLoad: string[] = [
  '/backgrounds/title-screen.jpg',
  '/backgrounds/mana-board.jpg',
];
const audioToLoad: string[] = [];
const totalAssets: ComputedRef<number> = computed(() => imagesToLoad.length + audioToLoad.length);
const amountLoaded: Ref<number> = ref(0);

const progressLeftStyle: ComputedRef<string> = computed(() =>
  `${amountLoaded.value / totalAssets.value * 100}%`
);

onMounted(() => {
  const promiseArray = [];

  imagesToLoad.forEach(i => {
    promiseArray.push(new Promise(resolve => {
      const img: HTMLImageElement = new Image();
      img.onload = () => {
        amountLoaded.value++;
        resolve(true);
      }
      img.src = i;
    }));
  });
  audioToLoad.forEach(i => {
    promiseArray.push(new Promise(resolve => {
      const audio: HTMLAudioElement = new Audio();
      audio.addEventListener('canplay', () => {
        amountLoaded.value++;
        resolve(true);
      });
      audio.src = i;
    }));
  });

  for (let i = 0; i < 10; i++) {
    const icon: HTMLElement | null = document.getElementById(`icon-${i}`);
    if (icon) {
      icon.style.setProperty('--delay', (i * 100) + 'ms');
      icon.classList.add('bounce');
    }
  }
});

function toTitleScreen() {
  if (amountLoaded.value === totalAssets.value) {
    emit('move-to-screen', 'TitleScreen', ScreenTransition.FadeToBlack);
  }
}
</script>

<style lang="scss" scoped>
.color-wheel {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loader {
  position: absolute;
  bottom: 64px;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;

  h2 {
    text-shadow: 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black, 0 0 2px black;
  }
}

.progress-icon {
  position: absolute;
  top: 16px;
  left: v-bind(progressLeftStyle);
  transform: translate(-50%, -50%);
  background: radial-gradient(ellipse at center, #000b 0%, transparent 70%);
  transition: all .25s;
}

.bounce {
  animation: bounceAnimation 2s infinite;
  animation-delay: var(--delay);
}

@keyframes bounceAnimation {
  10% {
    transform: translateY(-20px);
  }

  20% {
    transform: translateY(0);
  }
}
</style>
