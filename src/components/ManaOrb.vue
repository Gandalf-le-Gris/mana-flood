<template>
  <div>
    <div
      class="wrapper"
      :style="`width: ${size}px; height: ${size}px;`"
    >
      <div
        class="orb"
        :class="{ active }"
        :style="`
          --speed: ${speed}s;
          --orb-color: rgb(var(--v-theme-${color}-light));
          --orb-dark: rgb(var(--v-theme-${color}));
          width: ${size}px;
          height: ${size}px;
        `"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter :id="`filter-${uuid}`" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" :seed>
                <animate attributeName="baseFrequency" :dur="`${speed}s`" values="0.015;0.022;0.015" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" scale="40" />
            </filter>
    
            <radialGradient :id="`orb-${uuid}`" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stop-color="white" stop-opacity="0.8" /> 
              
              <stop offset="30%" stop-color="var(--orb-color)" stop-opacity="0.4" />
              
              <stop offset="60%" stop-color="var(--orb-dark)" stop-opacity="0.5" />
              <stop offset="100%" stop-color="var(--orb-dark)" stop-opacity="0.95" />
            </radialGradient>
          </defs>
    
          <g :filter="`url(#filter-${uuid})`">
            <circle cx="100" cy="100" r="75" fill="var(--orb-color)" opacity="0.6" />
            <circle cx="100" cy="100" r="75" :fill="`url(#orb-${uuid})`" />
          </g>
        </svg>
      </div>
      <v-icon
        :icon="`mtg:${color}-plain`"
        :size="`${size / 2}`"
        :color
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ExtendedColor } from '@/types/Color';
import { ref } from 'vue';

const props = defineProps<{
  color: ExtendedColor,
  size: number,
  active: boolean,
}>();
const seed = ref<number>(Math.floor(Math.random() * 1000));
const speed = ref<number>(Math.random() * 10 + 15);
const uuid = ref<string>(crypto.randomUUID());
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;

  :deep(.v-icon) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    filter: brightness(.5);
  }
}

.orb {
  display: inline-block;
  animation: float var(--speed) ease-in-out infinite alternate;
  filter: blur(6px) brightness(1.2);

  &.active {
    background: radial-gradient(circle, white 0%, transparent 80%);
  }
}

@keyframes float {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(5deg) scale(1.02); }
  100% { transform: rotate(-5deg) scale(0.98); }
}
</style>