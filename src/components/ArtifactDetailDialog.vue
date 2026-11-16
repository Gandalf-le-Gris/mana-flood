<template>
  <v-dialog
    v-model="show"
    width="auto"
  >
    <div class="wrapper">
      <div class="d-flex position-relative">
        <h1 class="title beleren-small-caps">{{ $t(`artifacts.name.${artifact.name}`) }}</h1>
        <icon-button
          icon="mdi-close"
          size="48"
          class="close-btn"
          @click="show = false"
        />
      </div>
      <div class="main-section mt-4">
        <div class="d-flex flex-column ga-3 w-100 justify-center">
          <artifact-portrait
            :artifact
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
            <h2 class="mb-0">
              {{ $t('effects.title') }}
            </h2>
            <h3
              v-for="(effect, key) in artifact.teamEffects"
              :key
              class="my-0"
            >
              {{ $t(`effects.${effect.id}`) }}
            </h3>
            <h3
              v-if="!artifact.teamEffects.length"
              class="my-0 font-weight-normal"
            >
              {{ $t('effects.none') }}
            </h3>
          </div>
          <div v-if="artifact.activatedAbility">
            <v-divider
              thickness="3"
              gradient
              opacity=".7"
              class="mb-4 mt-2"
            />
            <h2 class="mb-0 position-relative">
              {{ $t(`abilities.name.${artifact.activatedAbility.id}`) }}
              <div class="cooldown">
                <v-icon
                  icon="mdi-timer-sand"
                  size="xs"
                  class="mt-n1 mr-n1"
                />
                {{ artifact.activatedAbility.cooldown }}
              </div>
            </h2>
            <h3 class="my-0">
              {{ $t(`abilities.description.${artifact.activatedAbility.id}`) }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Artifact } from '@/types/artifacts/Artifact.ts';
import ArtifactPortrait from './ArtifactPortrait.vue';
import IconButton from './IconButton.vue';

const props = defineProps<{
  artifact: Artifact,
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

.cooldown {
  position: absolute;
  top: 0;
  right: 0;
}

.title {
  text-align: center;
  max-width: 78%;
  margin: 8px auto;
}
</style>