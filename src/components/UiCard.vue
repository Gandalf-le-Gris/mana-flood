<template>
  <div class="ma-auto">
    <div class="frame">
      <v-img
        :width
        :height
        :src
        :alt="src"
        cover
        class="masked"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  src: string,
  size?: number,
}>();

const width = computed(() => `${props.size ?? 150}px`);
const height = computed(() => `${props.size ?? 150}px`);
const frameColor = computed(() => 'rgb(var(--v-theme-C-light))')
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
    -webkit-mask-image: url('/ui/character-frame.png');
    mask-image: url('/ui/character-frame.png');
    mask-size: cover;
    mask-repeat: no-repeat;
    z-index: 2;
    filter: brightness(.9);
  }

  &::after {
    position: absolute;
    top: 1px; 
    left: 1px;
    right: -1px;
    bottom: -1px;
    content: '';
    background-color: black;
    -webkit-mask-image: url('/ui/character-frame.png');
    mask-image: url('/ui/character-frame.png');
    mask-size: cover;
    filter: blur(4px);
    z-index: 1;
    opacity: 0.5;
  }
}

.masked {
  z-index: -1;
  -webkit-mask-image: url('/ui/character-mask.png');
  mask-image: url('/ui/character-mask.png');
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-position: center;
  mask-position: center;
}

.background {
  position: relative;
  height: 100%;
  width: 100%;
  background: #000a;
}
</style>
