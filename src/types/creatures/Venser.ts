import type { Color } from "../Color";
import { craftingEffects } from '../effects/activated/CraftingEffects';
import { spellLockEffect } from '../effects/enemy/SpellLockEffect';
import { spellRechargeEffects } from '../effects/team/SpellRechargeEffects';
import { Creature, Rarity } from "./Creature";

export class Venser extends Creature {
  name = 'venser';
  colors = ['U'] as Color[];

  hpModifier = .9;
  damageModifier = .7;
  speed = 2;

  colorAffinity = {
    W: 5,
    U: 8,
    B: 0,
    R: 0,
    G: 0,
    C: 3,
  };

  pool = {
    'dominaria': Rarity.RARE,
  };
  
  enemyEffects = [spellLockEffect];
  teamEffects = [spellRechargeEffects.spellCreatureRecharge];
  activatedAbility = craftingEffects.minorSpellCrafting;
}
