import type { ExtendedColor } from "@/types/Color";
import { Creature, Rarity } from "@/types/creatures/Creature";
import { buildCreature, creatures } from "@/types/creatures/creatures";
import { shuffle } from "./ArrayUtils";
import type { Game } from '@/types/Game';

export class CreatureUtils {
  static getRandomCreature(plane: string): string {
    return shuffle(
      creatures
      .map(c => new c())
      .map(c => Array.from({ length: Number(c.pool[plane] ?? c.pool['any'] ?? 0) }, () => structuredClone(c)))
      .flat()
    )[0]?.name ?? 'llanowar-elves';
  }

  static getRandomBoss(plane: string): string {
    const bosses = creatures
      .map(c => new c())
      .filter(c => (c.pool[plane] ?? c.pool['any']) === Rarity.BOSS);
    return shuffle(bosses)[0]?.name ?? 'urza';
  }

  static getHp(creature: Creature) {
    return creature.hpModifier * Creature.baseHp;
  }

  static getDamage(creature: Creature, color: ExtendedColor, size: number) {
    return Math.round(creature.damageModifier * (creature.colorAffinity[color] ?? 0) * size);
  }

  static getEnemyHp(creature: Creature, game?: Game) {
    return Math.round(creature.hpModifier
      * Creature.baseHp
      * 1.02 ** ((game?.floor ?? 1) - 1)
      * (1 + 2 * Number(this.isBoss(creature, game?.plane)))
      * (1 - .3 * Number(creature.token))
      * (1 - .2 * (game?.currentEnemies.map(buildCreature).filter(c => c.token).length ?? 0) * Number(this.isBoss(creature, game?.plane))));
  }

  static getEnemyDamage(attacker: Creature, game?: Game) {
    return Math.round(attacker.damageModifier
      * Creature.baseDamage
      * (attacker.speed - .2) / 2
      * 1.02 ** ((game?.floor ?? 1) - 1)
      * (1 + .3 * Number(this.isBoss(attacker, game?.plane)))
      * (1 - .2 * Number(attacker.token))
      * (1 - .1 * (game?.currentEnemies.map(buildCreature).filter(c => c.token).length ?? 0) * Number(this.isBoss(attacker, game?.plane))));
  }

  static isBoss(creature: Creature, plane?: string) {
    if (plane) {
      return creature.pool[plane] === Rarity.BOSS;
    }
    return Object.values(creature.pool).includes(Rarity.BOSS);
  }

  static getRarity(creature: Creature): Rarity {
    return Object.values(creature.pool).reduce((acc, x) => x > acc ? x : acc, Rarity.BOSS);
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