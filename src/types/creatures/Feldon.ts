import type { Color } from "../Color";
import { craftingEffects } from "../effects/activated/CraftingEffects";
import { battleStartArtifactDelayEffect } from "../effects/enemy/ArtifactDelayEffect";
import { artifactCyclingEffect } from "../effects/team/ArtifactCyclingEffect";
import { Creature, Rarity } from "./Creature";

export class Feldon extends Creature {
  name = 'feldon';
  colors = ['R'] as Color[];

  hpModifier = .8;
  damageModifier = .8;
  speed = 1;

  colorAffinity = {
    W: 0,
    U: 2,
    B: 0,
    R: 10,
    G: 0,
    C: 4,
  };

  pool = {
    'dominaria': Rarity.RARE,
  };
  
  enemyEffects = [battleStartArtifactDelayEffect];
  teamEffects = [artifactCyclingEffect];
  activatedAbility = craftingEffects.majorArtifactCrafting;
}
