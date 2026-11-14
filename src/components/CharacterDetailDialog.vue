<template>
  <v-dialog
    v-model="show"
    width="auto"
  >
    <div class="wrapper">
      <div class="d-flex position-relative">
        <h1 class="my-2 text-center w-100 beleren-small-caps">{{ $t(`creatures.name.${character.name}`) }}</h1>
        <icon-button
          icon="mdi-close"
          size="48"
          class="close-btn"
          @click="show = false"
        />
      </div>
      <div class="main-section mt-4">
        <div class="d-flex flex-column ga-3 w-100 justify-center">
          <character-portrait
            :character
            :size="280"
            style="pointer-events: none"
          />
          <div class="d-flex px-16 mt-4 mb-n4 justify-space-around">
            <h1 class="d-flex my-0">
              {{ enemy ? damage : character.damageModifier * 100 }}
              <v-icon
                icon="mdi-sword"
                size="xs"
                class="mt-1 ml-1"
                color="orange-lighten-1"
              />
            </h1>
            <h1 class="d-flex my-0">
              {{ enemy ? character.hp : character.hpModifier * 100 }}
              <v-icon
                icon="mdi-heart"
                size="xs"
                class="mt-1 ml-1"
                color="pink-lighten-1"
              />
            </h1>
          </div>
          <div v-if="!enemy">
            <v-divider
              thickness="3"
              gradient
              opacity=".7"
              class="my-4"
            />
            <div class="d-flex justify-space-around mt-6 mb-n2">
              <h1
                v-for="color in extendedColors"
                :key="color"
                class="d-flex my-0"
                :class="{ 'opacity-40': !character.colorAffinity[color] }"
              >
                {{ character.colorAffinity[color] }}
                <v-icon
                  :icon="`mtg:${color}`"
                  size="xs"
                  class="mt-1 ml-1"
                />
              </h1>
            </div>
          </div>
          <div>
            <v-divider
              thickness="3"
              gradient
              opacity=".7"
              class="my-4"
            />
            <h2 class="mb-0">
              {{ $t('effects.title') }}
            </h2>
            <h3
              v-for="(effect, key) in enemy ? character.enemyEffects : character.teamEffects"
              :key
              class="my-0"
            >
              {{ $t(`effects.${effect.id}`) }}
            </h3>
            <h3
              v-if="!(enemy ? character.enemyEffects : character.teamEffects).length"
              class="my-0 font-weight-normal"
            >
              {{ $t('effects.none') }}
            </h3>
          </div>
          <div v-if="!enemy && character.activatedAbility">
            <v-divider
              thickness="3"
              gradient
              opacity=".7"
              class="mb-4 mt-2"
            />
            <h2 class="mb-0 position-relative">
              {{ $t(`abilities.name.${character.activatedAbility.id}`) }}
              <div class="cooldown">
                <v-icon
                  icon="mdi-timer-sand"
                  size="xs"
                  class="mt-n1 mr-n1"
                />
                {{ character.activatedAbility.cooldown }}
              </div>
            </h2>
            <h3 class="my-0">
              {{ $t(`abilities.description.${character.activatedAbility.id}`) }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Creature } from '@/types/creatures/Creature';
import CharacterPortrait from './CharacterPortrait.vue';
import IconButton from './IconButton.vue';
import { extendedColors } from '@/types/Color.ts';

const props = withDefaults(defineProps<{
  character: Creature,
  enemy?: boolean,
  damage?: number,
}>(), {
  enemy: false,
});

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
    z-index: -1;
  }

  &:after {
    position: absolute;
    top: -32px;
    left: -32px;
    right: -32px;
    bottom: -32px;
    content: '';
    border-image: url(/ui/metal-frame.png) 128 / 128px round;
    pointer-events: none;
  }
}

.cooldown {
  position: absolute;
  top: 0;
  right: 0;
}
</style>