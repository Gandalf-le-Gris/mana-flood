import type { Color } from "../Color";
import { conversionEffects } from '../effects/activated/ConversionEffects';
import { affinityAnthemEffects } from '../effects/shared/AffinityAnthemEffects';
import { affinityEffects } from '../effects/shared/AffinityEffects';
import { destructionConversionEffect } from '../effects/team/DestructionConversionEffect';
import { Creature, Rarity } from "./Creature";

export class Titania extends Creature {
  name = 'titania';
  colors = ['G'] as Color[];

  hpModifier = .7;
  damageModifier = .9;
  speed = 3;

  colorAffinity = {
    W: 0,
    U: 0,
    B: 0,
    R: 0,
    G: 12,
    C: 0,
  };

  pool = {
    'dominaria': Rarity.RARE,
  };
  
  enemyEffects = [affinityEffects.greenGreaterAffinity];
  teamEffects = [destructionConversionEffect, affinityAnthemEffects.minorAffinityAnthemNeighborsGreen];
  activatedAbility = conversionEffects.greenConversion;
}
