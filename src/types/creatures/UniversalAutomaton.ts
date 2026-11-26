import type { Color } from "../Color";
import { conversionEffects } from '../effects/activated/ConversionEffects';
import { affinityAnthemEffects } from '../effects/shared/AffinityAnthemEffects';
import { Creature, Rarity } from "./Creature";

export class UniversalAutomaton extends Creature {
  name = 'universal-automaton';
  colors = [] as Color[];

  hpModifier = .7;
  damageModifier = .6;
  speed = 2;

  colorAffinity = {
    W: 2,
    U: 2,
    B: 2,
    R: 2,
    G: 2,
    C: 6,
  };

  pool = {
    'dominaria': Rarity.UNCOMMON,
  };
  
  enemyEffects = [affinityAnthemEffects.dislikeAffinityAnthemTeamAll];
  teamEffects = [affinityAnthemEffects.minorAffinityAnthemTeamAll];
  activatedAbility = conversionEffects.colorlessConversion;
}
