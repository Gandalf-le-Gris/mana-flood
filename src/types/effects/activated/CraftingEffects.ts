import type { BattleContext } from '@/types/BattleContext';
import { ActivatedEffect } from './ActivatedEffect';
import { ArtifactUtils } from '@/utils/ArtifactUtils';
import { Rarity } from '@/types/creatures/Creature';
import { EnchantmentUtils } from '@/utils/EnchantmentsUtils';
import { CreatureUtils } from '@/utils/CreatureUtils';
import { GameUtils } from '@/utils/GameUtils';
import type { Game } from '@/types/Game';
import { SpellUtils } from '@/utils/SpellUtils';

class CraftingStrength {
  readonly name: string = "";
  readonly cooldown: number = 1;

  static MINOR: CraftingStrength = { name: 'minor-crafting', cooldown: 10 };
  static NORMAL: CraftingStrength = { name: 'crafting', cooldown: 15 };
  static MAJOR: CraftingStrength = { name: 'major-crafting', cooldown: 20 };
}

class CreatureCraftingEffect extends ActivatedEffect {
  readonly strength: CraftingStrength;
  
  constructor(strength: CraftingStrength) {
    super();
    this.id = `${strength.name}-creature`;
    this.cooldown = strength.cooldown;
    this.strength = strength;
  }

  async execute(context: BattleContext, { sourceIndex }: { sourceIndex: number } ): Promise<boolean> {
    context.game.team[sourceIndex] = CreatureUtils.getRandomCreature(
      context.game.plane,
      this.strength === CraftingStrength.MINOR
        ? Rarity.COMMON
        : this.strength === CraftingStrength.MAJOR
        ? Rarity.BOSS
          : Math.random() < .7
          ? Rarity.UNCOMMON
          : Rarity.RARE
    );
    context.game.cooldowns[sourceIndex] = 0;
    context.game.hp = Math.min(GameUtils.getTotalHp(context.game), context.game.hp);
    return true;
  }
}

class ArtifactCraftingEffect extends ActivatedEffect {
  readonly strength: CraftingStrength;
  
  constructor(strength: CraftingStrength) {
    super();
    this.id = `${strength.name}-artifact`;
    this.cooldown = strength.cooldown;
    this.strength = strength;
  }

  async execute(context: BattleContext, { sourceIndex }: { sourceIndex: number } ): Promise<boolean> {
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

  async execute(context: BattleContext, { sourceIndex }: { sourceIndex: number } ): Promise<boolean> {
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

class SpellCraftingEffect extends ActivatedEffect {
  readonly strength: CraftingStrength;
  
  constructor(strength: CraftingStrength) {
    super();
    this.id = `${strength.name}-spell`;
    this.cooldown = strength.cooldown;
    this.strength = strength;
  }

  async execute(context: BattleContext ): Promise<boolean> {
    const index = context.game.spells.findIndex(s => !s);
    if (index < 0) return false;

    context.game.spells[index] = SpellUtils.getRandomSpell(
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

  condition(game: Game): boolean {
    return game.spells.findIndex(s => !s) >= 0;
  }
}

export const craftingEffects = {
  minorCreatureCrafting: new CreatureCraftingEffect(CraftingStrength.MINOR),
  creatureCrafting: new CreatureCraftingEffect(CraftingStrength.NORMAL),
  majorCreatureCrafting: new CreatureCraftingEffect(CraftingStrength.MAJOR),
  minorArtifactCrafting: new ArtifactCraftingEffect(CraftingStrength.MINOR),
  artifactCrafting: new ArtifactCraftingEffect(CraftingStrength.NORMAL),
  majorArtifactCrafting: new ArtifactCraftingEffect(CraftingStrength.MAJOR),
  minorEnchantmentCrafting: new EnchantmentCraftingEffect(CraftingStrength.MINOR),
  enchantmentCrafting: new EnchantmentCraftingEffect(CraftingStrength.NORMAL),
  majorEnchantmentCrafting: new EnchantmentCraftingEffect(CraftingStrength.MAJOR),
  minorSpellCrafting: new SpellCraftingEffect(CraftingStrength.MINOR),
  spellCrafting: new SpellCraftingEffect(CraftingStrength.NORMAL),
  majorSpellCrafting: new SpellCraftingEffect(CraftingStrength.MAJOR),
}
