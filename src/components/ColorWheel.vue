<template>
  <div class="d-flex align-center justify-center" style="height: 550px; width: 550px;">
    <div class="orbit-container">
      <div 
        v-for="(icon, index) in colors" 
        :key="index"
        class="orbit-item"
        :style="{ '--index': index }"
      >
        <v-icon
          :icon="`mtg:${icon}`"
          size="150"
          class="icon-flat"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { colors } from '@/types/Color';

</script>

<style scoped>
.orbit-container {
  position: relative;
  width: 400px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotate-orbit 40s linear infinite;
}

.orbit-item {
  position: absolute;
  transform: rotate(calc(var(--index) * 72deg)) translateY(-200px);
}

.icon-flat {
  transform: rotate(calc(var(--index) * -72deg));
  animation: counter-rotate 40s linear infinite;
}

@keyframes rotate-orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes counter-rotate {
  from { transform: rotate(calc(var(--index) * -72deg)); }
  to { transform: rotate(calc(var(--index) * -72deg - 360deg)); }
}
</style>
