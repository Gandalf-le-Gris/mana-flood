<template>
  <div>
    <div class="board-container">
      <div class="board" :style="boardStyle">
        <transition-group name="orb-fade">
          <mana-orb
            v-for="orb in orbs"
            :key="orb.uuid"
            :color="orb.color"
            :size="orbSize"
            :active="activeOrb?.uuid === orb.uuid"
            :style="{
              '--x': `${orb.c * orbSize}px`,
              '--y': `${orb.r * orbSize}px`,
              ...getOrbStyle(orb)
            }"
            class="orb-element"
            :class="{ isDragging }"
            @mousedown="onMouseDown($event, orb)"
          />
        </transition-group>
      </div>
      <div
        v-if="timer"
        class="timer"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ManaOrb from './ManaOrb.vue';
import { Orb } from '@/types/Orb';
import { extendedColors, type ExtendedColor } from '@/types/Color';
import { choice } from '@/utils/ArrayUtils';
import { useGameStore } from '@/stores/gameStore';
import { GameUtils } from '@/utils/GameUtils';
import { Game } from '@/types/Game';
import type { Effect } from '@/types/effects/Effect.ts';
import { buildCreature } from '@/types/creatures/creatures.ts';

const emit = defineEmits(['match', 'turn-end']);

const props = withDefaults(defineProps<{
  disabled?: boolean;
}>(), {
  disabled: false,
});

const rows = ref(5);
const cols = ref(6);
const orbSize = ref(150);
const isProcessing = ref(false);
const isDragging = ref(false);
const activeOrb = ref<Orb | null>(null);
const boardRect = ref<DOMRect | null>(null);
const grabOffset = { x: 0, y: 0 };
const mousePos = ref({ x: 0, y: 0 });
const boardScale = ref({ x: 1, y: 1 });
const timer = ref(0);

const orbs = ref<Orb[]>([]);

const game = computed<Game>(() => useGameStore().current!);

const boardStyle = computed(() => ({
  width: `${cols.value * orbSize.value}px`,
  height: `${rows.value * orbSize.value}px`
}));

const getOrbStyle = (orb: Orb) => {
  const isHeld = activeOrb.value?.uuid === orb.uuid;
  return {
    zIndex: isHeld ? 1000 : orb.r + 10,
    pointerEvents: isHeld ? 'none' : 'auto',
    cursor: isProcessing.value || props.disabled ? 'not-allowed' : 'grab'
  };
};

const getOrbAt = (r: number, c: number) => orbs.value.find(o => o.r === r && o.c === c);

function initOrbs() {
  const newOrbs: Orb[] = [];
  for (let r = 0; r < rows.value; r++) {
    for (let c = 0; c < cols.value; c++) {
      newOrbs.push(new Orb(choice(extendedColors), r, c));
    }
  }
  orbs.value = newOrbs;
  if (findMatches().length) {
    initOrbs();
  }
}

async function processMatches() {
  isProcessing.value = true;
  const matches = findMatches();
  if (!matches.length) {
    isProcessing.value = false;
    emit('turn-end');
    return;
  }

  const coordsToRemove = new Set(
    matches.flatMap(g => g.coords.map(c => `${c.r},${c.c}`))
  );
  orbs.value = orbs.value.filter(o => !coordsToRemove.has(`${o.r},${o.c}`));

  await delay(400);

  emit('match', matches);
  collapseColumns();
  refillBoard();
  await delay(500);

  await processMatches();
}

function collapseColumns() {
  for (let c = 0; c < cols.value; c++) {
    let emptyRow = rows.value - 1;
    for (let r = rows.value - 1; r >= 0; r--) {
      const orb = getOrbAt(r, c);
      if (orb) {
        if (r !== emptyRow) {
          orb.r = emptyRow;
        }
        emptyRow--;
      }
    }
  }
}

function refillBoard() {
  const activeEffects: Effect[] = game.value.currentEnemies.flatMap(e => buildCreature(e).enemyEffects)
    .concat(game.value.team.flatMap(c => c ? buildCreature(c).teamEffects : []));
  const weights: Record<ExtendedColor, number> = {
    W: 1,
    U: 1,
    B: 1,
    R: 1,
    G: 1,
    C: 1,
  };
  for (const effect of activeEffects) {
    if (effect.orbRateModifier) {
      Object.entries(effect.orbRateModifier).forEach(([c, v]) => {
        const color = c as ExtendedColor;
        if (weights[color] !== undefined) {
          weights[color] = Math.max(0, weights[color] + v);
        }
      });
    }
  }
  const weightedArray: [ExtendedColor, number][] = Object.entries(weights) as [ExtendedColor, number][];
  const totalWeight: number = weightedArray.reduce((acc, [_, x]) => acc + x, 0);

  const newOrbs = [...orbs.value];
  for (let c = 0; c < cols.value; c++) {
    for (let r = 0; r < rows.value; r++) {
      const idx = r * cols.value + c;
      if (!newOrbs.find(o => o.c === c && o.r === r)) {
        const orb = new Orb(getNextColor(weightedArray, totalWeight), r, c);
        newOrbs.splice(idx, 0, orb);
      }
    }
  }
  orbs.value = newOrbs;
}

function getNextColor(weightedArray: [ExtendedColor, number][], totalWeight: number): ExtendedColor {
  if (totalWeight <= 0) {
    return choice(extendedColors);
  }
  let target = Math.random() * totalWeight;
  for (const [color, weight] of weightedArray) {
    if (weight <= 0) continue;
    if (target < weight) {
      return color;
    }
    target -= weight;
  }
  return weightedArray[weightedArray.length - 1]?.[0] ?? 'C';
}

interface Coord { r: number; c: number }
interface MatchGroup {
  coords: Coord[];
  color: ExtendedColor;
  size: number;
}

function findMatches(): MatchGroup[] {
  const matchedCoords = new Set<string>();

  for (let r = 0; r < rows.value; r++) {
    for (let c = 0; c < cols.value; c++) {
      const currentOrb = getOrbAt(r, c);
      if (!currentOrb) continue;

      const color = currentOrb.color;

      if (c <= cols.value - 3) {
        const o2 = getOrbAt(r, c + 1);
        const o3 = getOrbAt(r, c + 2);
        if (o2?.color === color && o3?.color === color) {
          matchedCoords.add(`${r},${c}`);
          matchedCoords.add(`${r},${c + 1}`);
          matchedCoords.add(`${r},${c + 2}`);
        }
      }

      if (r <= rows.value - 3) {
        const o2 = getOrbAt(r + 1, c);
        const o3 = getOrbAt(r + 2, c);
        if (o2?.color === color && o3?.color === color) {
          matchedCoords.add(`${r},${c}`);
          matchedCoords.add(`${r + 1},${c}`);
          matchedCoords.add(`${r + 2},${c}`);
        }
      }
    }
  }

  const finalGroups: MatchGroup[] = [];
  const visited = new Set<string>();

  for (const coordStr of matchedCoords) {
    if (visited.has(coordStr)) continue;

    const [startR, startC] = coordStr.split(',').map(Number);
    const groupColor = getOrbAt(startR, startC)?.color;
    if (!groupColor) continue;

    const currentGroupCoords: Coord[] = [];
    const queue: string[] = [coordStr];
    visited.add(coordStr);

    while (queue.length > 0) {
      const curr = queue.shift()!;
      const [r, c] = curr.split(',').map(Number);
      currentGroupCoords.push({ r, c });

      const neighbors = [
        { r: r + 1, c },
        { r: r - 1, c },
        { r, c: c + 1 },
        { r, c: c - 1 }
      ];

      for (const nb of neighbors) {
        const nbKey = `${nb.r},${nb.c}`;
        if (matchedCoords.has(nbKey) && !visited.has(nbKey)) {
          const nbOrb = getOrbAt(nb.r, nb.c);
          if (nbOrb?.color === groupColor) {
            visited.add(nbKey);
            queue.push(nbKey);
          }
        }
      }
    }

    finalGroups.push({
      coords: currentGroupCoords,
      color: groupColor,
      size: currentGroupCoords.length
    });
  }

  return finalGroups;
}

function shuffleOrbs() {
  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    attempts++;

    for (let i = orbs.value.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [orbs.value[i], orbs.value[j]] = [orbs.value[j], orbs.value[i]];
    }

    orbs.value.forEach((orb, index) => {
      orb.r = Math.floor(index / cols.value);
      orb.c = index % cols.value;
    });

    if (findMatches().length === 0) {
      break;
    }
  }

  if (attempts >= maxAttempts) {
    initOrbs();
  }
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function onMouseDown(e: MouseEvent, orb: Orb) {
  if (isProcessing.value || props.disabled) return;

  const boardElement = (e.currentTarget as HTMLElement).closest('.board') as HTMLElement;
  if (!boardElement) return;

  const rect = boardElement.getBoundingClientRect();
  boardRect.value = rect;

  boardScale.value = {
    x: rect.width / (cols.value * orbSize.value),
    y: rect.height / (rows.value * orbSize.value)
  };

  isDragging.value = true;
  activeOrb.value = orb;

  const localX = (e.clientX - rect.left) / boardScale.value.x;
  const localY = (e.clientY - rect.top) / boardScale.value.y;

  grabOffset.x = localX - (orb.c * orbSize.value);
  grabOffset.y = localY - (orb.r * orbSize.value);

  mousePos.value = { x: localX, y: localY };

  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
}

function onMouseMove(e: MouseEvent) {
  if (!activeOrb.value || !boardRect.value) {
    return;
  }

  const localX = (e.clientX - boardRect.value.left) / boardScale.value.x;
  const localY = (e.clientY - boardRect.value.top) / boardScale.value.y;
  
  mousePos.value = { x: localX, y: localY };

  const visualX = localX - grabOffset.x;
  const visualY = localY - grabOffset.y;

  const targetC = Math.floor((visualX + orbSize.value / 2) / orbSize.value);
  const targetR = Math.floor((visualY + orbSize.value / 2) / orbSize.value);

  if (targetR >= 0 && targetR < rows.value && targetC >= 0 && targetC < cols.value) {
    if (targetR !== activeOrb.value.r || targetC !== activeOrb.value.c) {
      if (timer.value <= 0) {
        startTimer();
      }

      const orbAtTarget = getOrbAt(targetR, targetC);
      if (orbAtTarget) {
        const oldR = activeOrb.value.r;
        const oldC = activeOrb.value.c;
        orbAtTarget.r = oldR;
        orbAtTarget.c = oldC;
        activeOrb.value.r = targetR;
        activeOrb.value.c = targetC;
      }
    }
  }
}

function onMouseUp() {
  stopTimer();

  isDragging.value = false;
  isProcessing.value = true;
  activeOrb.value = null;
  grabOffset.x + 0;
  grabOffset.y = 0;

  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);

  processMatches();
}

const totalTimer = computed<number>(() => GameUtils.getTotalTimer(game.value));
const timerWidth = computed<string>(() => `calc(${timer.value / totalTimer.value * 100}% - 200px)`);
const timerTimeout = ref<number>(-1);

function startTimer() {
  timer.value = totalTimer.value;
  timerTimeout.value = setInterval(decreaseTimer, 100);
}

function decreaseTimer() {
  timer.value -= .1;
  if (timer.value <= 0) {
    stopTimer();
    onMouseUp();
  }
}

function stopTimer() {
  timer.value = 0;
  clearInterval(timerTimeout.value);
}

function convertOrbs(count: number, toColor: ExtendedColor, fromColor?: ExtendedColor): boolean {
  if (isProcessing.value || isDragging.value || props.disabled) return false;

  const eligibleOrbs = orbs.value.filter(o => {
    if (fromColor) {
      return o.color === fromColor && o.color !== toColor;
    }
    return o.color !== toColor;
  });

  if (eligibleOrbs.length === 0) return false;

  const shuffled = [...eligibleOrbs].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  for (const orb of selected) {
    orb.color = toColor;
  }

  return true;
}

function shuffleBoard(): boolean {
  if (isProcessing.value || isDragging.value || props.disabled) return false;
  const colors = orbs.value.map(o => o.color).sort(() => Math.random() - 0.5);
  orbs.value.forEach((orb, i) => {
    orb.color = colors[i];
  });
  return true;
}

function isBusy(): boolean {
  return isProcessing.value || isDragging.value;
}

defineExpose({
  convertOrbs,
  shuffleBoard,
  isBusy,
});

onMounted(initOrbs);
</script>

<style lang="scss" scoped>
.board-container {
  user-select: none;
  touch-action: none;
  position: relative;
  padding: 20px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: '';
    background: #000a;
  }

  &:after {
    position: absolute;
    top: -32px;
    left: -32px;
    right: -32px;
    bottom: -32px;
    content: '';
    border-image: url(/ui/metal-frame.png) 128 / 128px round;
  }
}

.board {
  position: relative;
}

.orb-element {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(var(--x), var(--y));
  transition: transform 0.15s cubic-bezier(0.34, 1.36, 0.64, 1);
  will-change: transform;

  &:not(.isDragging) {
    transition: all 0.5s cubic-bezier(0.34, 1.36, 0.64, 1);
  }
}

.orb-fade-enter-from {
  opacity: 0;
  margin-top: -500px;
}

.orb-fade-enter-active {
  transition: all 0.5s cubic-bezier(0.34, 1.36, 0.64, 1);
}

.orb-fade-leave-to {
  opacity: 0;
}

.orb-fade-leave-active {
  transition: opacity 0.3s ease, scale 0.3s ease;
  position: absolute !important;
  z-index: 0 !important;
}

.timer {
  position: absolute;
  top: calc(100% + 40px);
  left: 50%;
  transform: translateX(-50%);
  width: v-bind('timerWidth');
  transition: width .1s linear;
  height: 20px;
  background-color: red;
}
</style>
