<template>
  <div>
    <button
      type="button"
      class="icon-button"
      :disabled
      :class="{ disabled }"
    >
      <v-img
        :width
        :height
        :src="buttonSrc"
        alt="button"
        class="button-bg"
      />
      <v-icon
        :icon
        :size="iconSize"
        color="white"
        class="button-icon"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';

export type IconButtonVariant = 'hexa';

const props = withDefaults(defineProps<{
  icon: string,
  variant?: IconButtonVariant,
  size?: number | string,
  disabled?: boolean,
}>(), {
  size: '40px',
  disabled: false,
});

const width: ComputedRef<string> = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`;
  }
  return /^\d+$/.test(props.size) ? `${props.size}px` : props.size;
});
const height: ComputedRef<string> = computed(() => width.value);

const iconSize: ComputedRef<string> = computed(() => {
  if (typeof props.size === 'number') {
    return `${Math.round(props.size * 0.55)}px`;
  }
  const match = props.size.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (match) {
    const val = parseFloat(match[1]);
    const unit = match[2] || 'px';
    const computedVal = unit === 'px' ? Math.round(val * 0.55) : Number((val * 0.55).toFixed(2));
    return `${computedVal}${unit}`;
  }
  return `calc(${props.size} * 0.55)`;
});

const buttonSrc: ComputedRef<string> = computed(() => {
  if (props.variant === 'hexa') {
    return '/ui/button-hexa.png';
  }
  return '/ui/button-round.png';
});
</script>

<style lang="scss" scoped>
.icon-button {
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

.button-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.button-icon {
  position: relative;
  z-index: 1;
  color: #fff;
  pointer-events: none;
}
</style>
