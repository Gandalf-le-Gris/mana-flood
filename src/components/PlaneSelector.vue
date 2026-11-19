<template>
  <div
    class="wrapper d-flex flex-column ga-8"
    :class="{ 'fade-in': fadeIn }"
  >
    <h1
      class="text-center beleren-small-caps text-shadow"
      style="font-size: 3em;"
    >
      {{ $t('planes.next') }}
    </h1>
    <v-row>
      <v-col
        v-for="plane in options"
        :key="plane.name"
      >
        <plane-portal
          :plane
          @select="selectPlane(plane.name)"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore';
import type { Game } from '@/types/Game';
import type { Plane } from '@/types/planes/Plane';
import { buildPlane, planes } from '@/types/planes/planes';
import { choice, shuffleCopy } from '@/utils/ArrayUtils';
import { ref, type Ref } from 'vue';
import PlanePortal from './PlanePortal.vue';

const props = withDefaults(defineProps<{
  fadeIn?: boolean,
}>(), {
  fadeIn: true,
});

const game: Game = useGameStore().current!;

const emits = defineEmits(['select']);

const selecting: Ref<boolean> = ref(false);

const options: Ref<Plane[]> = ref(getOptions());

function getOptions(): Plane[] {
  const leadsTo: string[] = shuffleCopy(buildPlane(game.plane).leadsTo);
  const res = [getFromLeadsTo([], leadsTo)];
  if (Math.random() < .5) {
    res.push(getFromLeadsTo(res, leadsTo));
  } else {
    res.push(getFromOthers(res, leadsTo));
  }
  res.push(getFromOthers(res, leadsTo));
  return res;

  function getFromLeadsTo(res: Plane[], leadsTo: string[]): Plane {
    const p = leadsTo.find(p1 => !res.find(p2 => p2.name === p1));
    if (p) {
      return buildPlane(p);
    }
    return getFromOthers(res, leadsTo);
  }

  function getFromOthers(res: Plane[], leadsTo: string[]): Plane {
    let p: Plane;
    do {
      p = new (choice(planes))();
    } while (res.find(plane => plane.name === p.name) || leadsTo.includes(p.name) || game.plane === p.name || p.name === 'meditation-realm');
    return p;
  }
}

function selectPlane(plane: string) {
  if (selecting.value) return;
  selecting.value = true;
  emits('select', plane);
}
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 1500px;
  
  &.fade-in {
    opacity: 0;
    animation: fade-in-delayed 2s ease-out forwards;
  }
}

@keyframes fade-in-delayed {
  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
