<template>
  <v-dialog
    v-model="show"
    width="auto"
  >
    <div class="wrapper">
      <div class="d-flex position-relative">
        <h1 class="title beleren-small-caps">{{ $t(`spells.name.${spell.name}`) }}</h1>
        <icon-button
          icon="mdi-close"
          size="48"
          class="close-btn"
          @click="show = false"
        />
      </div>
      <div class="main-section mt-4">
        <div class="d-flex flex-column ga-3 w-100 justify-center">
          <spell-portrait
            :spell
            :size="280"
            style="pointer-events: none"
          />
          <div>
            <v-divider
              thickness="3"
              gradient
              opacity=".7"
              class="my-4"
            />
            <h2 class="mb-0 position-relative">
              {{ $t('spells.one') }}
            </h2>
            <h3 class="my-0">
              {{ $t(`abilities.description.${spell.activatedAbility.id}`) }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Spell } from '@/types/spells/Spell.ts';
import SpellPortrait from './SpellPortrait.vue';
import IconButton from './IconButton.vue';

const props = defineProps<{
  spell: Spell,
}>();

const show = defineModel({ type: Boolean, required: true });
</script>

<style lang="scss" scoped>
.close-btn {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.main-section {
  display: flex;
  width: 500px;
  padding: 0 8px 8px 8px;
}

.wrapper {
  user-select: none;
  touch-action: none;
  position: relative;
  padding: 32px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: #000;
    border-radius: 40px;
    z-index: -1;
  }

  &:after {
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    content: '';
    border-image: url(/ui/metal-frame.png) 100 / 80px round;
    pointer-events: none;
  }
}

.title {
  text-align: center;
  max-width: 78%;
  margin: 8px auto;
}
</style>