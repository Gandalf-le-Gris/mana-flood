import { getColorName, type ExtendedColor } from '../Color';
import { Effect } from './Effect';

class Affinity {
  readonly value: number = 0;
  readonly name: string = "";

  static AFFINITY: Affinity = { value: .2, name: "affinity" };
  static GREATER_AFFINITY: Affinity = { value: .3, name: "greater-affinity" };
  static HATRED: Affinity = { value: -.2, name: "hatred" };
}

class AffinityEffect extends Effect {
  constructor(color: ExtendedColor, affinity: Affinity) {
    super();
    this.orbRateModifier = Object.fromEntries([[color, affinity.value]]);
    this.id = `${getColorName(color)}-${affinity.name}`;
  }
}

export const affinityEffects = {
  whiteAffinity: new AffinityEffect('W', Affinity.AFFINITY),
  blueAffinity: new AffinityEffect('U', Affinity.AFFINITY),
  blackAffinity: new AffinityEffect('B', Affinity.AFFINITY),
  redAffinity: new AffinityEffect('R', Affinity.AFFINITY),
  greenAffinity: new AffinityEffect('G', Affinity.AFFINITY),
  colorlessAffinity: new AffinityEffect('C', Affinity.AFFINITY),
  whiteGreaterAffinity: new AffinityEffect('W', Affinity.GREATER_AFFINITY),
  blueGreaterAffinity: new AffinityEffect('U', Affinity.GREATER_AFFINITY),
  blackGreaterAffinity: new AffinityEffect('B', Affinity.GREATER_AFFINITY),
  redGreaterAffinity: new AffinityEffect('R', Affinity.GREATER_AFFINITY),
  greenGreaterAffinity: new AffinityEffect('G', Affinity.GREATER_AFFINITY),
  colorlessGreaterAffinity: new AffinityEffect('C', Affinity.GREATER_AFFINITY),
  whiteHatred: new AffinityEffect('W', Affinity.HATRED),
  blueHatred: new AffinityEffect('U', Affinity.HATRED),
  blackHatred: new AffinityEffect('B', Affinity.HATRED),
  redHatred: new AffinityEffect('R', Affinity.HATRED),
  greenHatred: new AffinityEffect('G', Affinity.HATRED),
  colorlessHatred: new AffinityEffect('C', Affinity.HATRED),
};
