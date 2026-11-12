import type { Color } from "../Color";
import { conversionEffects } from '../effects/activated/ConversionEffects';
import { affinityEffects } from '../effects/AffinityEffects';
import { Creature, Rarity } from "./Creature";

export class LlanowarElves extends Creature {
  name = 'llanowar-elves';
  colors = ['G'] as Color[];

  hpModifier = .5;
  damageModifier = .5;
  speed = 2;

  colorAffinity = {
    W: 0,
    U: 0,
    B: 0,
    R: 0,
    G: 10,
    C: 2,
  };

  pool = {
    'dominaria': Rarity.COMMON,
  };

  enemyEffects = [affinityEffects.greenAffinity];
  activatedAbility = conversionEffects.minorGreenConversion;
}
