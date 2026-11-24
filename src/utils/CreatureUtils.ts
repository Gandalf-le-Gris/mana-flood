import type { ExtendedColor } from "@/types/Color";
import { Creature, Rarity } from "@/types/creatures/Creature";
import { buildCreature, creatures } from "@/types/creatures/creatures";
import { shuffle } from "./ArrayUtils";
import { PoolUtils } from "./PoolUtils";
import type { Game } from '@/types/Game';
import { buildArtifact } from '@/types/artifacts/artifacts';
import { buildEnchantment } from '@/types/enchantments/enchantments';

export class CreatureUtils {
  static getRandomCreature(plane: string, rarity?: Rarity | number): string {
    return PoolUtils.getRandomItem(creatures, plane, rarity, 'llanowar-elves');
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

  static getDamage(creature: Creature, color: ExtendedColor, size: number, index: number, game: Game) {
    return Math.round(creature.damageModifier * (this.getEffectiveAffinities(creature, index, game)[color] ?? 0) * size);
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

  static getEffectiveAffinities(creature: Creature, index?: number, game?: Game): Record<ExtendedColor, number> {
      console.log(index, game)
    if (!game || index == undefined) {
      return creature.colorAffinity;
    }
    let res = creature.colorAffinity;
    for (const e of game.currentEnemies.map(e => buildCreature(e))) {
      for (const effect of e.enemyEffects) {
        if (effect.affinityModifier && (!effect.activeCondition || effect.activeCondition(game))) {
          res = mergeAffinities(res, getAffinityForDistance(effect.affinityModifier, 0));
        }
      }
    }
    for (let i = 0; i < game.team.length; i++) {
      if (game.team[i]) {
        for (const effect of buildCreature(game.team[i]!).teamEffects) {
          if (effect.affinityModifier && (!effect.activeCondition || effect.activeCondition(game))) {
            res = Math.abs(index - i) === 0
              ? mergeAffinities(res, getAffinityForDistance(effect.affinityModifier, 0))
              : Math.abs(index - i) === 1
                ? mergeAffinities(res, getAffinityForDistance(effect.affinityModifier, 1))
                : mergeAffinities(res, getAffinityForDistance(effect.affinityModifier, 2));
          }
        }
      }
    }
    for (let i = 0; i < game.artifacts.length; i++) {
      if (game.artifacts[i]) {
        for (const effect of buildArtifact(game.artifacts[i]!).teamEffects) {
          console.log(effect)
          if (effect.affinityModifier && (!effect.activeCondition || effect.activeCondition(game))) {
            console.log('yes')
            res = Math.abs(index - i) === 0
              ? mergeAffinities(res, getAffinityForDistance(effect.affinityModifier, 0))
              : Math.abs(index - i) === 1
                ? mergeAffinities(res, getAffinityForDistance(effect.affinityModifier, 1))
                : mergeAffinities(res, getAffinityForDistance(effect.affinityModifier, 2));
          }
        }
      }
    }
    for (let i = 0; i < game.enchantments.length; i++) {
      if (game.enchantments[i]) {
        for (const effect of buildEnchantment(game.enchantments[i]!).teamEffects) {
          if (effect.affinityModifier && (!effect.activeCondition || effect.activeCondition(game))) {
            res = Math.abs(index - i) === 0
              ? mergeAffinities(res, getAffinityForDistance(effect.affinityModifier, 0))
              : Math.abs(index - i) === 1
                ? mergeAffinities(res, getAffinityForDistance(effect.affinityModifier, 1))
                : mergeAffinities(res, getAffinityForDistance(effect.affinityModifier, 2));
          }
        }
      }
    }

    return {
      W: Math.max(0, res.W),
      U: Math.max(0, res.U),
      B: Math.max(0, res.B),
      R: Math.max(0, res.R),
      G: Math.max(0, res.G),
      C: Math.max(0, res.C),
    }

    function getAffinityForDistance(a: Partial<Record<ExtendedColor, [number, number, number]>>, dist: number): Record<ExtendedColor, number> {
      return {
        W: a.W?.[dist] ?? 0,
        U: a.U?.[dist] ?? 0,
        B: a.B?.[dist] ?? 0,
        R: a.R?.[dist] ?? 0,
        G: a.G?.[dist] ?? 0,
        C: a.C?.[dist] ?? 0,
      }
    }

    function mergeAffinities(a: Record<ExtendedColor, number>, b: Record<ExtendedColor, number>): Record<ExtendedColor, number> {
      return {
        W: a.W + b.W,
        U: a.U + b.U,
        B: a.B + b.B,
        R: a.R + b.R,
        G: a.G + b.G,
        C: a.C + b.C,
      }
    }
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