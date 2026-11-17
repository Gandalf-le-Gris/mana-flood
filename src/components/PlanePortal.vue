<template>
  <div
    class="portal-wrapper hover-scale d-flex flex-column"
    @click="emits('select')"
  >
    <v-img
      :width
      :height
      :max-width="width"
      :max-height="height"
      :src="`/planes/${plane.name}.jpg`"
      :alt="$t(`planes.name.${plane.name}`)"
      cover
      class="masked"
    />
    <h1
      class="mx-auto beleren-small-caps text-shadow d-flex"
      style="font-size: 2.5em; pointer-events: none"
    >
      <div
        v-if="plane.colors.length < 5"
        class="mr-1"
      >
        <v-icon
          v-for="color in plane.colors"
          :key="color"
          :icon="`mtg:${color}`"
          size="32"
          class="mt-n3 mr-1"
        />
      </div>
      {{ $t(`planes.name.${plane.name}`) }}
    </h1>
  </div>
</template>

<script setup lang="ts">
import type { Plane } from '@/types/planes/Plane';
import { computed } from 'vue';

const props = defineProps<{
  plane: Plane;
}>();

const emits = defineEmits(['select']);

const width = computed(() => '350px');
const height = computed(() => '350px');
</script>

<style lang="scss" scoped>
.portal-wrapper {
  position: relative;
  width: fit-content;
  margin: auto;

  &::after {
    position: absolute;
    top: -16px;
    left: -16px;
    height: calc(v-bind('height') + 32px);
    width: calc(v-bind('width') + 32px);
    content: '';
    background-image: url(/ui/portal.png);
    background-size: cover;
    background-repeat: no-repeat;
    -webkit-mask-image: radial-gradient(circle closest-side, transparent 60%, #0004 75%, black 100%);
    mask-image: radial-gradient(circle closest-side, transparent 60%, #0004 75%, black 100%);
    animation: spin 18s infinite linear;
    pointer-events: none;
  }
}

@keyframes spin {
  100% {
    transform: rotateZ(360deg);
  }
}

.masked {
  -webkit-mask-image: radial-gradient(circle closest-side, black 80%, transparent 100%);
  mask-image: radial-gradient(circle closest-side, black 80%, transparent 100%);

  
}
</style>
