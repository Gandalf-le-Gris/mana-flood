<template>
  <div class="ma-auto">
    <div
      class="frame"
      :class="{ 'has-halo': ready }"
      @click.right="showDetail = true"
    >
      <v-img
        v-if="spell"
        :width
        :height
        :src="`/spells/${spell.name}.jpg`"
        :alt="$t(`spells.name.${spell.name}`)"
        cover
        class="masked"
      />
      <div
        v-else
        class="masked background"
      ></div>
    </div>
    <spell-detail-dialog
      v-if="spell"
      v-model="showDetail"
      :spell
    />
  </div>
</template>

<script setup lang="ts">
import type { Spell } from '@/types/spells/Spell';
import { computed, ref, type Ref } from 'vue';
import SpellDetailDialog from './SpellDetailDialog.vue';

const props = withDefaults(defineProps<{
  spell: Spell | null,
  size?: number,
  isReady?: boolean,
}>(), {
  size: 110,
  isReady: false,
});

const showDetail: Ref<boolean> = ref(false);

const width = computed(() => `${props.size ?? 120}px`);
const height = computed(() => `${props.size ?? 120}px`);
const frameColor = computed(() => {
  if (!props.spell) {
    return 'rgb(var(--v-theme-C))';
  }
  switch (props.spell.colors.length) {
    case 0:
      return 'rgb(var(--v-theme-C))';
    case 1:
      return `rgb(var(--v-theme-${props.spell?.colors[0]}))`;
    case 2:
      return `linear-gradient(90deg, rgb(var(--v-theme-${props.spell?.colors[0]})) 0%, rgb(var(--v-theme-${props.spell?.colors[0]})) 35%, rgb(var(--v-theme-${props.spell?.colors[1]})) 65%, rgb(var(--v-theme-${props.spell?.colors[1]})) 100%)`;
    default:
      return 'rgb(var(--v-theme-WUBRG))';
  }
});

const haloColor1 = computed(() => {
  if (!props.spell) {
    return 'rgb(var(--v-theme-C))';
  }
  switch (props.spell.colors.length) {
    case 0:
      return 'rgb(var(--v-theme-C))';
    case 1:
    case 2:
      return `rgb(var(--v-theme-${props.spell.colors[0]}))`;
    default:
      return 'rgb(var(--v-theme-WUBRG))';
  }
});

const haloColor2 = computed(() => {
  if (!props.spell) {
    return 'rgb(var(--v-theme-C))';
  }
  switch (props.spell.colors.length) {
    case 0:
      return 'rgb(var(--v-theme-C))';
    case 1:
      return `rgb(var(--v-theme-${props.spell.colors[0]}))`;
    case 2:
      return `rgb(var(--v-theme-${props.spell.colors[1]}))`;
    default:
      return 'rgb(var(--v-theme-WUBRG))';
  }
});

const ready = computed(() => props.isReady === true);
</script>

<style lang="scss" scoped>
.frame {
  position: relative;
  width: v-bind('width');
  height: v-bind('height');

  &.has-halo {
    animation: halo-pulse 4.4s infinite ease-in-out;
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: v-bind('frameColor');
    -webkit-mask-image: url('/ui/character-frame.png');
    mask-image: url('/ui/character-frame.png');
    mask-size: cover;
    mask-repeat: no-repeat;
    filter: brightness(.9);
    z-index: 2;
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

@keyframes halo-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 4px v-bind('haloColor1')) drop-shadow(0 0 6px v-bind('haloColor1'));
  }
  25% {
    filter: drop-shadow(0 0 6px v-bind('haloColor1')) drop-shadow(0 0 12px rgba(255, 255, 255, 0.8));
  }
  50% {
    filter: drop-shadow(0 0 4px v-bind('haloColor2')) drop-shadow(0 0 6px v-bind('haloColor2'));
  }
  75% {
    filter: drop-shadow(0 0 6px v-bind('haloColor2')) drop-shadow(0 0 12px rgba(255, 255, 255, 0.8));
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
