<template>
  <div class="ma-auto">
    <div
      class="frame"
      @click.right="showDetail = true"
    >
      <v-img
        v-if="enchantment"
        :width
        :height
        :src="`/enchantments/${enchantment.name}.jpg`"
        :alt="$t(`enchantments.name.${enchantment.name}`)"
        cover
        class="masked"
      />
      <div
        v-else
        class="masked background"
      ></div>
    </div>
    <enchantment-detail-dialog
      v-if="enchantment"
      v-model="showDetail"
      :enchantment
    />
  </div>
</template>

<script setup lang="ts">
import type { Enchantment } from '@/types/enchantments/Enchantment';
import { computed, ref, type Ref } from 'vue';
import EnchantmentDetailDialog from './EnchantmentDetailDialog.vue';

const props = withDefaults(defineProps<{
  enchantment: Enchantment | null,
  size?: number,
}>(), {
  size: 130,
});

const showDetail: Ref<boolean> = ref(false);

const width = computed(() => `${props.size}px`);
const height = computed(() => `${props.size * .8}px`);
const frameColor = computed(() => {
  if (!props.enchantment) {
    return 'rgb(var(--v-theme-C))';
  }
  switch (props.enchantment.colors.length) {
    case 0:
      return 'rgb(var(--v-theme-C))';
    case 1:
      return `rgb(var(--v-theme-${props.enchantment?.colors[0]}))`;
    case 2:
      return `linear-gradient(90deg, rgb(var(--v-theme-${props.enchantment?.colors[0]})) 0%, rgb(var(--v-theme-${props.enchantment?.colors[0]})) 35%, rgb(var(--v-theme-${props.enchantment?.colors[1]})) 65%, rgb(var(--v-theme-${props.enchantment?.colors[1]})) 100%)`;
    default:
      return 'rgb(var(--v-theme-WUBRG))';
  }
});
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
    background: v-bind('frameColor');
    -webkit-mask-image: url('/ui/enchantment-frame.png');
    mask-image: url('/ui/enchantment-frame.png');
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
    -webkit-mask-image: url('/ui/enchantment-frame.png');
    mask-image: url('/ui/enchantment-frame.png');
    mask-size: cover;
    filter: blur(4px);
    z-index: 1;
    opacity: 0.5;
  }
}

.masked {
  z-index: -1;
  -webkit-mask-image: url('/ui/enchantment-mask.png');
  mask-image: url('/ui/enchantment-mask.png');
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
