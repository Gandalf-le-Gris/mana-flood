import type { ExtendedColor } from "@/types/Color";
import { Creature } from "@/types/creatures/Creature";
import { creatures } from "@/types/creatures/creatures";
import { shuffle } from "./ArrayUtils";

export class CreatureUtils {
  static getRandomCreature(plane: string): string {
    return shuffle(
      creatures
      .map(c => new c())
      .map(c => Array.from({ length: c.pool[plane] ?? 0 }, () => structuredClone(c)))
      .flat()
    )[0].name ?? 'llanowar-elves';
  }

  static getHp(creature: Creature) {
    return creature.hpModifier * Creature.baseHp;
  }

  static getDamage(creature: Creature, color: ExtendedColor, size: number) {
    return Math.round(creature.damageModifier * (creature.colorAffinity[color] ?? 0) * size);
  }

  static visualDamage(damage: number, color: ExtendedColor, el: HTMLElement) {
    const floatingDiv = document.createElement('div');
    Object.assign(floatingDiv.style, {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
      zIndex: '9999',
      color: `rgb(var(--v-theme-${color}))`,
      fontWeight: 'bold',
      fontSize: '2.5rem',
      whiteSpace: 'nowrap',
      userSelect: 'none',
      textShadow: 'white 0 0 2px, white 0 0 2px, white 0 0 2px, white 0 0 2px, white 0 0 2px, white 0 0 2px, white 0 0 2px, white 0 0 2px'
    });
    floatingDiv.innerText = damage.toString();
    el.appendChild(floatingDiv);

    const startX = 50 + (Math.random() * 30 - 15);
    const startY = 50 + (Math.random() * 30 - 15);

    const angle = Math.random() * Math.PI * 2;
    const distance = 20 + Math.random() * 10;
    const targetX = startX + Math.cos(angle) * distance;
    const targetY = startY + Math.sin(angle) * distance;

    const animation = floatingDiv.animate([
      {
        top: `${startY}%`,
        left: `${startX}%`,
        transform: 'translate(-50%, -50%) scale(0.5)',
        opacity: 0
      },
      {
        top: `${(startY * .8 + targetY * .2)}%`,
        left: `${(startX * .8 + targetX * .2)}%`,
        transform: 'translate(-50%, -50%) scale(1.2)',
        opacity: 1,
        offset: 0.2
      },
      {
        top: `${targetY}%`,
        left: `${targetX}%`,
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: 0
      }
    ], {
      duration: 3000,
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });

    animation.onfinish = () => floatingDiv.remove();
  }
}