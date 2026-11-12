<template>
  <button
    type="button"
    class="arrow-button"
    :disabled
    :class="{ disabled }"
  >
    <v-img
      :width
      :height
      src="/ui/arrow.png"
      alt="arrow"
      class="arrow-icon"
    />
  </button>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';

export type ArrowDirection = 'up' | 'down' | 'left' | 'right' | 'top' | 'bottom';

const props = withDefaults(defineProps<{
  direction: ArrowDirection,
  size?: number | string,
  disabled?: boolean,
}>(), {
  size: '24px',
  disabled: false,
});

const width: ComputedRef<string> = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`;
  }
  return /^\d+$/.test(props.size) ? `${props.size}px` : props.size;
});
const height: ComputedRef<string> = computed(() => width.value);

const arrowTransform: ComputedRef<string> = computed(() => {
  switch (props.direction?.toLowerCase()) {
    case 'left':
      return 'scaleX(-1)';
    case 'up':
    case 'top':
      return 'rotate(-90deg)';
    case 'down':
    case 'bottom':
      return 'scaleY(-1) rotate(-90deg)';
    case 'right':
    default:
      return 'none';
  }
});
</script>

<style lang="scss" scoped>
.arrow-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: v-bind('width');
  height: v-bind('height');
  cursor: pointer;
  transition: transform .2s ease, filter .2s ease, opacity .2s ease;
  user-select: none;

  &:hover {
    transform: scale(1.15);
    filter: brightness(1.25) drop-shadow(0 0 4px rgba(255, 255, 255, 0.4));
  }

  &:active {
    transform: scale(0.95);
    filter: brightness(0.9);
  }

  &:disabled,
  &.disabled {
    opacity: 0.4;
    filter: grayscale(1);
    cursor: not-allowed;
    pointer-events: none;
    transform: none;
  }
}

.arrow-icon {
  width: v-bind('width');
  height: v-bind('height');
  transform: v-bind('arrowTransform');
  transition: transform .2s ease;
  pointer-events: none;
}
</style>
