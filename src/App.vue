<template>
  <v-app>
    <component
      :is="currentScreen"
      class="h-100 w-100"
      @move-to-screen="moveToScreen"
      @screen-mounted="triggerScreenChange"
    />
    <div id="black-filter" />
  </v-app>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { ScreenTransition } from './utils/ScreenTransition';

const SCREEN_WIDTH: number = 1920;
const SCREEN_HEIGHT: number = 1080;

// const currentScreen: Ref<string> = ref('LoadingScreen');
const currentScreen: Ref<string> = ref('BattleScreen');
// const currentScreen: Ref<string> = ref('Test');

onMounted(() => {
  document.addEventListener('contextmenu', event => event.preventDefault());
  addEventListener('resize', applyScale);
  addEventListener('orientationchange', applyScale);
  if ((window as any).visualViewport) {
    (window as any).visualViewport.addEventListener('resize', applyScale);
    (window as any).visualViewport.addEventListener('scroll', applyScale);
  }
  addEventListener('pageshow', applyScale);
  applyScale();

  // useI18n().locale.value = useSettings().get.language;
  // const settings = useSettings().get;
  // animationService.animationSpeed = settings.animationSpeed;
  // audioService.masterVolume.value = settings.masterVolume;
  // audioService.baseMusicVolume.value = settings.musicVolume;
  // audioService.baseSfxVolume.value = settings.sfxVolume;
  // audioService.autoPayment.value = settings.autoPayment;
  // useGameStore().reset();
});

function getViewportSize() {
  const vv = (window as any).visualViewport;
  return {
    w: vv ? vv.width : window.innerWidth,
    h: vv ? vv.height : window.innerHeight,
  };
}

function applyScale() {
  const { w, h } = getViewportSize();
  const scale = Math.min(w / SCREEN_WIDTH, h / SCREEN_HEIGHT);

  const app = document.getElementById('app')!;
  app.style.transform = `scale(${scale})`;

  const wrapper = document.getElementById('app-wrapper')!;
  wrapper.style.width = `${SCREEN_WIDTH * scale}px`;
  wrapper.style.height = `${SCREEN_HEIGHT * scale}px`;

  document.documentElement.style.setProperty('--v-tooltip-scaling', String(scale));
}

async function moveToScreen(screen: string, type?: ScreenTransition) {
  if (type !== undefined) {
    document.body.style.pointerEvents = 'none';
    switch (type) {
      case ScreenTransition.FadeToBlack:
        const blackFilter = document.getElementById('black-filter');
        if (blackFilter) {
          blackFilter.style.display = 'block';
          blackFilter.classList.add('fade-to-black');
          await new Promise(r => setTimeout(r, 500));
          currentScreen.value = screen;
          await new Promise(r => { moveToScreenTrigger.value = r });
          blackFilter.classList.add('fade-from-black');
          await new Promise(r => setTimeout(r, 500));
          blackFilter.style.display = 'none';
          blackFilter.classList.remove('fade-from-black');
          blackFilter.classList.remove('fade-to-black');
        }
        break;
      default:
        currentScreen.value = screen;
    }
    document.body.style.removeProperty('pointer-events');
  } else {
    currentScreen.value = screen;
  }
}

const moveToScreenTrigger: Ref<Function | null> = ref(null);

function triggerScreenChange() {
  if (moveToScreenTrigger.value) {
    moveToScreenTrigger.value();
    moveToScreenTrigger.value = null;
  }
}
</script>

<style lang="scss" scoped>
.v-application {
  width:  var(--design-w, 1920px);
  height: var(--design-h, 1080px);
  overflow: hidden;
  transform-origin: top left;
}

#black-filter {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: black;
  display: none;
  z-index: 9999;
  transition: opacity .5s;
}

.fade-to-black {
  animation: fadeToBlack .5s forwards;
}

.fade-from-black {
  animation: fadeFromBlack .5s forwards;
}

@keyframes fadeToBlack {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fadeFromBlack {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
