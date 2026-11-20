import type { BattleContext } from '@/types/BattleContext';
import { ActivatedEffect } from './ActivatedEffect';
import { ArtifactUtils } from '@/utils/ArtifactUtils';
import { Rarity } from '@/types/creatures/Creature';
import { EnchantmentUtils } from '@/utils/EnchantmentsUtils';

class CraftingStrength {
  readonly name: string = "";
  readonly cooldown: number = 1;

  static MINOR: CraftingStrength = { name: 'minor-crafting', cooldown: 10 };
  static NORMAL: CraftingStrength = { name: 'crafting', cooldown: 15 };
  static MAJOR: CraftingStrength = { name: 'major-crafting', cooldown: 20 };
}

class ArtifactCraftingEffect extends ActivatedEffect {
  readonly strength: CraftingStrength;
  
  constructor(strength: CraftingStrength) {
    super();
    this.id = `${strength.name}-artifact`;
    this.cooldown = strength.cooldown;
    this.strength = strength;
  }

  execute(context: BattleContext, { sourceIndex }: { sourceIndex: number } ): boolean {
    context.game.artifacts[sourceIndex] = ArtifactUtils.getRandomArtifact(
      context.game.plane,
      this.strength === CraftingStrength.MINOR
        ? Rarity.COMMON
        : this.strength === CraftingStrength.MAJOR
        ? Rarity.BOSS
          : Math.random() < .7
          ? Rarity.UNCOMMON
          : Rarity.RARE
    );
    context.game.artifactCooldowns[sourceIndex] = 0;
    return true;
  }
}

class EnchantmentCraftingEffect extends ActivatedEffect {
  readonly strength: CraftingStrength;
  
  constructor(strength: CraftingStrength) {
    super();
    this.id = `${strength.name}-enchantment`;
    this.cooldown = strength.cooldown;
    this.strength = strength;
  }

  execute(context: BattleContext, { sourceIndex }: { sourceIndex: number } ): boolean {
    context.game.enchantments[sourceIndex] = EnchantmentUtils.getRandomEnchantment(
      context.game.plane,
      this.strength === CraftingStrength.MINOR
        ? Rarity.COMMON
        : this.strength === CraftingStrength.MAJOR
        ? Rarity.BOSS
          : Math.random() < .7
          ? Rarity.UNCOMMON
          : Rarity.RARE
    );
    return true;
  }
}

export const craftingEffects = {
  minorArtifactCrafting: new ArtifactCraftingEffect(CraftingStrength.MINOR),
  artifactCrafting: new ArtifactCraftingEffect(CraftingStrength.NORMAL),
  majorArtifactCrafting: new ArtifactCraftingEffect(CraftingStrength.MAJOR),
  minorEnchantmentCrafting: new EnchantmentCraftingEffect(CraftingStrength.MINOR),
  enchantmentCrafting: new EnchantmentCraftingEffect(CraftingStrength.NORMAL),
  majorEnchantmentCrafting: new EnchantmentCraftingEffect(CraftingStrength.MAJOR),
}
