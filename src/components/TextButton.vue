<template>
  <div
    class="text-button-container"
    :class="{ disabled }"
  >
    <button
      type="button"
      class="text-button"
      :disabled
      :class="{ disabled }"
    >
      <div
        class="button-bg"
        aria-hidden="true"
      />
      <span class="button-text beleren-small-caps">
        <slot>{{ text }}</slot>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';

const props = withDefaults(defineProps<{
  text?: string,
  size?: number | string,
  height?: number | string,
  width?: number | string,
  fontSize?: number | string,
  disabled?: boolean,
}>(), {
  text: '',
  size: '40px',
  disabled: false,
});

const height: ComputedRef<string> = computed(() => {
  const val = props.height ?? props.size;
  if (typeof val === 'number') {
    return `${val}px`;
  }
  return /^\d+$/.test(val) ? `${val}px` : val;
});

const width: ComputedRef<string> = computed(() => {
  if (!props.width || props.width === 'auto') {
    return 'auto';
  }
  if (typeof props.width === 'number') {
    return `${props.width}px`;
  }
  return /^\d+$/.test(props.width) ? `${props.width}px` : props.width;
});

const capWidth: ComputedRef<string> = computed(() => {
  const h = height.value;
  const match = h.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (match) {
    const val = parseFloat(match[1]);
    const unit = match[2] || 'px';
    const computedVal = Number((val * (150 / 505)).toFixed(2));
    return `${computedVal}${unit}`;
  }
  return `calc(${h} * (150 / 505))`;
});

const paddingX: ComputedRef<string> = computed(() => {
  const h = height.value;
  const match = h.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (match) {
    const val = parseFloat(match[1]);
    const unit = match[2] || 'px';
    const computedVal = unit === 'px'
      ? Math.round(val * (150 / 505) + Math.max(12, val * 0.25))
      : Number((val * (150 / 505) + 14).toFixed(2));
    return `${computedVal}${unit}`;
  }
  return `calc(${capWidth.value} + 14px)`;
});

const minWidth: ComputedRef<string> = computed(() => {
  return `calc(${capWidth.value} * 2 + 16px)`;
});

const fontSize: ComputedRef<string> = computed(() => {
  if (props.fontSize !== undefined) {
    if (typeof props.fontSize === 'number') {
      return `${props.fontSize}px`;
    }
    return /^\d+$/.test(props.fontSize) ? `${props.fontSize}px` : props.fontSize;
  }
  const match = height.value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (match) {
    const val = parseFloat(match[1]);
    const unit = match[2] || 'px';
    const computedVal = unit === 'px' ? Math.round(val * 0.5) : Number((val * 0.5).toFixed(2));
    return `${computedVal}${unit}`;
  }
  return `calc(${height.value} * 0.5)`;
});
</script>

<style lang="scss" scoped>
.text-button-container {
  display: inline-flex;
  vertical-align: middle;

  &.disabled {
    pointer-events: none;
  }
}

.text-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: v-bind('width');
  min-width: v-bind('minWidth');
  height: v-bind('height');
  padding: 0 v-bind('paddingX');
  cursor: pointer;
  transition: transform .2s ease, filter .2s ease, opacity .2s ease;
  user-select: none;
  box-sizing: border-box;

  &:hover {
    transform: scale(1.08);
    filter: brightness(1.25) drop-shadow(0 0 4px rgba(255, 255, 255, 0.4));
  }

  &:active {
    transform: scale(0.96);
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
  box-sizing: border-box;
  pointer-events: none;
  border-style: solid;
  border-width: 0 v-bind('capWidth');
  border-image-source: url('/ui/button-long.png');
  border-image-slice: 0 150 0 150 fill;
  border-image-repeat: stretch;
}

.button-text {
  position: relative;
  z-index: 1;
  color: #fff;
  pointer-events: none;
  font-size: v-bind('fontSize');
  line-height: 1;
  letter-spacing: 0.5px;
  white-space: nowrap;
  text-shadow: 0 0 4px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.9);
  transform: translateY(1px);
}
</style>
