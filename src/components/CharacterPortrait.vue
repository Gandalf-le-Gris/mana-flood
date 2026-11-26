<template>
  <div class="ma-auto">
    <div
      class="frame"
      :class="{ 'has-halo': ready, 'on-cooldown': isOnCooldown }"
      @click.right="showDetail = true"
    >
      <v-img
        v-if="character"
        :width
        :height
        :src="`/creatures/${character.name}.jpg`"
        :alt="$t(`creatures.name.${character.name}`)"
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
      <div
        v-if="cost"
        class="cooldown-corner-badge"
      >
        <v-icon
          icon="mdi-lightning-bolt"
          :size="badgeIconSize"
          class="mr-1 ml-n1"
        />
        <span>{{ cost }}</span>
      </div>
      <div
        v-if="isRecharging"
        :key="rechargeKey"
        class="recharge-overlay"
      >
        <div class="recharge-halo">
          <v-icon
            icon="mtg:stopwatch"
            :size="rechargeIconSize"
            class="recharge-icon"
          />
        </div>
      </div>
    </div>
    <character-detail-dialog
      v-if="character"
      v-model="showDetail"
      :character
      :index
    />
  </div>
</template>

<script setup lang="ts">
import type { Creature } from '@/types/creatures/Creature';
import { computed, onBeforeUnmount, ref, type Ref } from 'vue';
import CharacterDetailDialog from './CharacterDetailDialog.vue';

const props = withDefaults(defineProps<{
  character: Creature | null,
  size?: number,
  cooldown?: number,
  isReady?: boolean,
  cost?: number,
  index?: number,
}>(), {
  size: 150,
  cooldown: undefined,
  isReady: false,
});

const showDetail: Ref<boolean> = ref(false);

const width = computed(() => `${props.size}px`);
const height = computed(() => `${props.size}px`);
const frameColor = computed(() => {
  if (!props.character) {
    return 'rgb(var(--v-theme-C))';
  }
  switch (props.character.colors.length) {
    case 0:
      return 'rgb(var(--v-theme-C))';
    case 1:
      return `rgb(var(--v-theme-${props.character?.colors[0]}))`;
    case 2:
      return `linear-gradient(90deg, rgb(var(--v-theme-${props.character?.colors[0]})) 0%, rgb(var(--v-theme-${props.character?.colors[0]})) 35%, rgb(var(--v-theme-${props.character?.colors[1]})) 65%, rgb(var(--v-theme-${props.character?.colors[1]})) 100%)`;
    default:
      return 'rgb(var(--v-theme-WUBRG))';
  }
});

const haloColor1 = computed(() => {
  if (!props.character) {
    return 'rgb(var(--v-theme-C))';
  }
  switch (props.character.colors.length) {
    case 0:
      return 'rgb(var(--v-theme-C))';
    case 1:
    case 2:
      return `rgb(var(--v-theme-${props.character.colors[0]}))`;
    default:
      return 'rgb(var(--v-theme-WUBRG))';
  }
});

const haloColor2 = computed(() => {
  if (!props.character) {
    return 'rgb(var(--v-theme-C))';
  }
  switch (props.character.colors.length) {
    case 0:
      return 'rgb(var(--v-theme-C))';
    case 1:
      return `rgb(var(--v-theme-${props.character.colors[0]}))`;
    case 2:
      return `rgb(var(--v-theme-${props.character.colors[1]}))`;
    default:
      return 'rgb(var(--v-theme-WUBRG))';
  }
});

const isOnCooldown = computed(() => (props.cooldown ?? 0) > 0);

const ready = computed(() => props.isReady === true);

const badgeIconSize = computed(() => Math.max(16, Math.round(props.size * 0.13)));
const badgeFontSize = computed(() => `${Math.max(16, Math.round(props.size * 0.14))}px`);
const badgePadding = computed(() => `${Math.round(props.size * 0.03)}px ${Math.round(props.size * 0.07)}px`);

const isRecharging = ref(false);
const rechargeKey = ref(0);
const rechargeIconSize = computed(() => Math.max(32, Math.round(props.size * 0.45)));
let rechargeTimer: ReturnType<typeof setTimeout> | null = null;

function triggerRecharge(): Promise<void> {
  if (rechargeTimer) {
    clearTimeout(rechargeTimer);
    rechargeTimer = null;
  }
  rechargeKey.value++;
  isRecharging.value = true;
  return new Promise(resolve => {
    rechargeTimer = setTimeout(() => {
      isRecharging.value = false;
      rechargeTimer = null;
      resolve();
    }, 750);
  });
}

onBeforeUnmount(() => {
  if (rechargeTimer) {
    clearTimeout(rechargeTimer);
    rechargeTimer = null;
  }
});

defineExpose({
  triggerRecharge,
});
</script>

<style lang="scss" scoped>
.frame {
  position: relative;
  width: v-bind('width');
  height: v-bind('height');
  transition: filter 0.3s ease, transform 0.2s ease;

  &.has-halo {
    animation: halo-pulse 4.4s infinite ease-in-out;
  }

  &.on-cooldown {
    filter: brightness(0.9);
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
    z-index: 2;
    filter: brightness(.9);
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
    filter: drop-shadow(0 0 4px v-bind('haloColor1')) drop-shadow(0 0 8px v-bind('haloColor1'));
  }
  25% {
    filter: drop-shadow(0 0 8px v-bind('haloColor1')) drop-shadow(0 0 16px rgba(255, 255, 255, 0.8));
  }
  50% {
    filter: drop-shadow(0 0 4px v-bind('haloColor2')) drop-shadow(0 0 8px v-bind('haloColor2'));
  }
  75% {
    filter: drop-shadow(0 0 8px v-bind('haloColor2')) drop-shadow(0 0 16px rgba(255, 255, 255, 0.8));
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

.recharge-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
  animation: recharge-animation 750ms ease-in-out forwards;
}

.recharge-halo {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(10, 15, 28, 0.7) 0%, rgba(10, 15, 28, 0.4) 45%, transparent 70%);
  padding: 10px;
}

.recharge-icon {
  color: #29b6f6;
  filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.95))
          drop-shadow(0 0 5px rgba(0, 0, 0, 0.85))
          drop-shadow(0 0 10px rgba(41, 182, 246, 0.9))
          drop-shadow(0 0 18px rgba(41, 182, 246, 0.6));
}

@keyframes recharge-animation {
  0% {
    opacity: 0;
    transform: scale(0.7);
  }
  25% {
    opacity: 1;
    transform: scale(1.05);
  }
  40% {
    opacity: 1;
    transform: scale(1);
  }
  75% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.85);
  }
}
</style>
