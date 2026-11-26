import type { Color } from "../Color";
import { reanimateEffect } from "../effects/activated/ReanimateEffect";
import { turnEndDecayEffect } from "../effects/enemy/TurnEndDecayEffect";
import { affinityAnthemEffects } from "../effects/shared/AffinityAnthemEffects";
import { Creature, Rarity } from "./Creature";

export class Tormod extends Creature {
  name = 'tormod';
  colors = ['B'] as Color[];

  hpModifier = .6;
  damageModifier = .8;
  speed = 2;

  colorAffinity = {
    W: 0,
    U: 0,
    B: 8,
    R: 0,
    G: 0,
    C: 4,
  };

  pool = {
    'dominaria': Rarity.RARE,
  };
  
  enemyEffects = [turnEndDecayEffect];
  teamEffects = [affinityAnthemEffects.affinityAnthemNeighborsBlack];
  activatedAbility = reanimateEffect;
}
