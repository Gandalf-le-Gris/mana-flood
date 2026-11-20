import { Rarity } from '@/types/creatures/Creature';
import { shuffle } from './ArrayUtils';

export interface PoolableItem {
  name: string;
  pool: Record<string, Rarity | number>;
}

export class PoolUtils {
  static getRandomItem<T extends PoolableItem>(
    items: ((new () => T) | T)[],
    plane: string,
    rarity?: Rarity | number,
    fallback: string = ''
  ): string {
    const instances: T[] = items.map(item =>
      typeof item === 'function' ? new (item as new () => T)() : item
    );

    if (rarity !== undefined) {
      const targetRarity = Number(rarity);
      const matchingItems = instances.filter(item => {
        const itemRarity = item.pool[plane] ?? item.pool['any'];
        return itemRarity !== undefined && Number(itemRarity) === targetRarity;
      });

      if (matchingItems.length > 0) {
        return shuffle(matchingItems)[0]?.name ?? fallback;
      }
    }

    const rarityMap = new Map<number, T[]>();
    for (const item of instances) {
      const itemRarity = item.pool[plane] ?? item.pool['any'];
      if (itemRarity !== undefined && Number(itemRarity) > 0) {
        const r = Number(itemRarity);
        if (!rarityMap.has(r)) {
          rarityMap.set(r, []);
        }
        rarityMap.get(r)!.push(item);
      }
    }

    if (rarityMap.size === 0) {
      return fallback;
    }

    const totalWeight = Array.from(rarityMap.keys()).reduce((sum, w) => sum + w, 0);
    let randomVal = Math.random() * totalWeight;
    let selectedRarity: number | undefined;

    for (const [r] of rarityMap.entries()) {
      if (randomVal < r) {
        selectedRarity = r;
        break;
      }
      randomVal -= r;
    }

    if (selectedRarity === undefined) {
      selectedRarity = Array.from(rarityMap.keys())[rarityMap.size - 1];
    }

    const itemsOfRarity = rarityMap.get(selectedRarity) ?? [];
    return shuffle(itemsOfRarity)[0]?.name ?? fallback;
  }
}
