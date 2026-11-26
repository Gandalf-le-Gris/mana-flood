import type { Color } from "../Color";
import { craftingEffects } from '../effects/activated/CraftingEffects';
import { battleStartArtifactDelayEffect } from '../effects/enemy/ArtifactDelayEffect';
import { destructionRechargeEffects } from '../effects/team/DestructionRechargeEffects';
import { Creature, Rarity } from "./Creature";

export class Loran extends Creature {
  name = 'loran';
  colors = ['W'] as Color[];

  hpModifier = .8;
  damageModifier = .8;
  speed = 2;

  colorAffinity = {
    W: 10,
    U: 2,
    B: 0,
    R: 0,
    G: 0,
    C: 4,
  };

  pool = {
    'dominaria': Rarity.RARE,
  };
  
  enemyEffects = [battleStartArtifactDelayEffect];
  teamEffects = [destructionRechargeEffects.destructionArtifactRecharge];
  activatedAbility = craftingEffects.majorArtifactCrafting;
}
