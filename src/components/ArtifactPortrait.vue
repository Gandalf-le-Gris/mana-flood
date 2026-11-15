<template>
  <div class="ma-auto">
    <div
      class="frame"
      :class="{ 'has-halo': ready, 'on-cooldown': isOnCooldown }"
      @click.right="showDetail = true"
    >
      <v-img
        v-if="artifact"
        :width
        :height
        :src="`/artifacts/${artifact.name}.jpg`"
        :alt="$t(`artifacts.name.${artifact.name}`)"
        cover
        class="masked"
      />
      <div
        v-else
        class="masked background"
      ></div>
      <div
        v-if="isOnCooldown"
        class="cooldown-corner-badge"
      >
        <v-icon
          icon="mdi-timer-sand"
          :size="badgeIconSize"
          class="mr-1"
        />
        <span>{{ cooldown }}</span>
      </div>
    </div>
    <artifact-detail-dialog
      v-if="artifact"
      v-model="showDetail"
      :artifact
    />
  </div>
</template>

<script setup lang="ts">
import type { Artifact } from '@/types/artifacts/Artifact';
import { computed, ref, type Ref } from 'vue';
import ArtifactDetailDialog from './ArtifactDetailDialog.vue';

const props = withDefaults(defineProps<{
  artifact: Artifact | null,
  size?: number,
  cooldown?: number,
  isReady?: boolean,
}>(), {
  size: 110,
  cooldown: undefined,
  isReady: false,
});

const showDetail: Ref<boolean> = ref(false);

const width = computed(() => `${props.size ?? 110}px`);
const height = computed(() => `${props.size ?? 110}px`);
const frameColor = computed(() => {
  if (!props.artifact) {
    return 'rgb(var(--v-theme-C))';
  }
  switch (props.artifact.colors.length) {
    case 0:
      return 'rgb(var(--v-theme-C))';
    case 1:
      return `rgb(var(--v-theme-${props.artifact?.colors[0]}))`;
    case 2:
      return `linear-gradient(90deg, rgb(var(--v-theme-${props.artifact?.colors[0]})) 0%, rgb(var(--v-theme-${props.artifact?.colors[0]})) 35%, rgb(var(--v-theme-${props.artifact?.colors[1]})) 65%, rgb(var(--v-theme-${props.artifact?.colors[1]})) 100%)`;
    default:
      return 'rgb(var(--v-theme-WUBRG))';
  }
});

const isOnCooldown = computed(() => (props.cooldown ?? 0) > 0);

const ready = computed(() => props.isReady === true);

const badgeIconSize = computed(() => Math.max(16, Math.round(props.size * 0.13)));
const badgeFontSize = computed(() => `${Math.max(16, Math.round(props.size * 0.14))}px`);
const badgePadding = computed(() => `${Math.round(props.size * 0.03)}px ${Math.round(props.size * 0.07)}px`);
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

.cooldown-corner-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 12, 18, 0.9);
  color: #fff;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
  border-radius: 9999px;
  padding: v-bind('badgePadding');
  font-size: v-bind('badgeFontSize');
  font-weight: 700;
  line-height: 1;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.75);
  pointer-events: none;
  user-select: none;
}

@keyframes halo-pulse {
  0%, 100% {
    filter: drop-shadow(0 0 4px v-bind('frameColor')) drop-shadow(0 0 8px v-bind('frameColor'));
  }
  50% {
    filter: drop-shadow(0 0 8px v-bind('frameColor')) drop-shadow(0 0 16px rgba(255, 255, 255, 0.8));
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
