import { extendedColors, getColorName, type ExtendedColor } from '@/types/Color';
import { Effect } from '../Effect';

class AnthemStrength {
  readonly value: number = 0;
  readonly name: string = "";

  static MINOR: AnthemStrength = { value: 4, name: 'shared.minor-affinity-anthem' };
  static NORMAL: AnthemStrength = { value: 7, name: 'shared.affinity-anthem' };
  static MAJOR: AnthemStrength = { value: 10, name: 'shared.major-affinity-anthem' };
  static DISLIKE: AnthemStrength = { value: -5, name: 'shared.dislike-affinity-anthem' };
  static HATRED: AnthemStrength = { value: -10, name: 'shared.hatred-affinity-anthem' };
}

export enum AnthemTargets {
  SELF,
  NEIGHBORS,
  TEAM,
}

class AffinityAnthemEffects extends Effect {
  readonly strength: AnthemStrength;
  readonly targets: AnthemTargets;
  readonly color: ExtendedColor;

  constructor(color: ExtendedColor, strength: AnthemStrength, targets: AnthemTargets) {
    super();
    this.id = `${strength.name}-${AnthemTargets[targets]}-${getColorName(color)}`;
    this.strength = strength;
    this.color = color;
    this.targets = targets;
    this.affinityModifier = Object.fromEntries([
      [
        color,
        [
          strength.value,
          targets >= AnthemTargets.NEIGHBORS ? strength.value : 0,
          targets >= AnthemTargets.TEAM ? strength.value : 0,
        ]
      ]
    ]);
  }
}

class AllAffinityAnthemEffects extends Effect {
  readonly strength: AnthemStrength;
  readonly targets: AnthemTargets;

  constructor(strength: AnthemStrength, targets: AnthemTargets) {
    super();
    this.id = `${strength.name}-${AnthemTargets[targets]}-all`;
    this.strength = strength;
    this.targets = targets;
    const value = Math.trunc(strength.value / 3);
    this.affinityModifier = Object.fromEntries(extendedColors.map(c => [
      c,
      [
        value,
        targets >= AnthemTargets.NEIGHBORS ? value : 0,
        targets >= AnthemTargets.TEAM ? value : 0,
      ]
    ]));
  }
}

export const affinityAnthemEffects = {
  // Minor
  minorAffinityAnthemSelfWhite: new AffinityAnthemEffects('W', AnthemStrength.MINOR, AnthemTargets.SELF),
  minorAffinityAnthemSelfBlue: new AffinityAnthemEffects('U', AnthemStrength.MINOR, AnthemTargets.SELF),
  minorAffinityAnthemSelfBlack: new AffinityAnthemEffects('B', AnthemStrength.MINOR, AnthemTargets.SELF),
  minorAffinityAnthemSelfRed: new AffinityAnthemEffects('R', AnthemStrength.MINOR, AnthemTargets.SELF),
  minorAffinityAnthemSelfGreen: new AffinityAnthemEffects('G', AnthemStrength.MINOR, AnthemTargets.SELF),
  minorAffinityAnthemSelfColorless: new AffinityAnthemEffects('C', AnthemStrength.MINOR, AnthemTargets.SELF),
  minorAffinityAnthemSelfAll: new AllAffinityAnthemEffects(AnthemStrength.MINOR, AnthemTargets.SELF),

  minorAffinityAnthemNeighborsWhite: new AffinityAnthemEffects('W', AnthemStrength.MINOR, AnthemTargets.NEIGHBORS),
  minorAffinityAnthemNeighborsBlue: new AffinityAnthemEffects('U', AnthemStrength.MINOR, AnthemTargets.NEIGHBORS),
  minorAffinityAnthemNeighborsBlack: new AffinityAnthemEffects('B', AnthemStrength.MINOR, AnthemTargets.NEIGHBORS),
  minorAffinityAnthemNeighborsRed: new AffinityAnthemEffects('R', AnthemStrength.MINOR, AnthemTargets.NEIGHBORS),
  minorAffinityAnthemNeighborsGreen: new AffinityAnthemEffects('G', AnthemStrength.MINOR, AnthemTargets.NEIGHBORS),
  minorAffinityAnthemNeighborsColorless: new AffinityAnthemEffects('C', AnthemStrength.MINOR, AnthemTargets.NEIGHBORS),
  minorAffinityAnthemNeighborsAll: new AllAffinityAnthemEffects(AnthemStrength.MINOR, AnthemTargets.NEIGHBORS),

  minorAffinityAnthemTeamWhite: new AffinityAnthemEffects('W', AnthemStrength.MINOR, AnthemTargets.TEAM),
  minorAffinityAnthemTeamBlue: new AffinityAnthemEffects('U', AnthemStrength.MINOR, AnthemTargets.TEAM),
  minorAffinityAnthemTeamBlack: new AffinityAnthemEffects('B', AnthemStrength.MINOR, AnthemTargets.TEAM),
  minorAffinityAnthemTeamRed: new AffinityAnthemEffects('R', AnthemStrength.MINOR, AnthemTargets.TEAM),
  minorAffinityAnthemTeamGreen: new AffinityAnthemEffects('G', AnthemStrength.MINOR, AnthemTargets.TEAM),
  minorAffinityAnthemTeamColorless: new AffinityAnthemEffects('C', AnthemStrength.MINOR, AnthemTargets.TEAM),
  minorAffinityAnthemTeamAll: new AllAffinityAnthemEffects(AnthemStrength.MINOR, AnthemTargets.TEAM),

  // Normal
  affinityAnthemSelfWhite: new AffinityAnthemEffects('W', AnthemStrength.NORMAL, AnthemTargets.SELF),
  affinityAnthemSelfBlue: new AffinityAnthemEffects('U', AnthemStrength.NORMAL, AnthemTargets.SELF),
  affinityAnthemSelfBlack: new AffinityAnthemEffects('B', AnthemStrength.NORMAL, AnthemTargets.SELF),
  affinityAnthemSelfRed: new AffinityAnthemEffects('R', AnthemStrength.NORMAL, AnthemTargets.SELF),
  affinityAnthemSelfGreen: new AffinityAnthemEffects('G', AnthemStrength.NORMAL, AnthemTargets.SELF),
  affinityAnthemSelfColorless: new AffinityAnthemEffects('C', AnthemStrength.NORMAL, AnthemTargets.SELF),
  affinityAnthemSelfAll: new AllAffinityAnthemEffects(AnthemStrength.NORMAL, AnthemTargets.SELF),

  affinityAnthemNeighborsWhite: new AffinityAnthemEffects('W', AnthemStrength.NORMAL, AnthemTargets.NEIGHBORS),
  affinityAnthemNeighborsBlue: new AffinityAnthemEffects('U', AnthemStrength.NORMAL, AnthemTargets.NEIGHBORS),
  affinityAnthemNeighborsBlack: new AffinityAnthemEffects('B', AnthemStrength.NORMAL, AnthemTargets.NEIGHBORS),
  affinityAnthemNeighborsRed: new AffinityAnthemEffects('R', AnthemStrength.NORMAL, AnthemTargets.NEIGHBORS),
  affinityAnthemNeighborsGreen: new AffinityAnthemEffects('G', AnthemStrength.NORMAL, AnthemTargets.NEIGHBORS),
  affinityAnthemNeighborsColorless: new AffinityAnthemEffects('C', AnthemStrength.NORMAL, AnthemTargets.NEIGHBORS),
  affinityAnthemNeighborsAll: new AllAffinityAnthemEffects(AnthemStrength.NORMAL, AnthemTargets.NEIGHBORS),

  affinityAnthemTeamWhite: new AffinityAnthemEffects('W', AnthemStrength.NORMAL, AnthemTargets.TEAM),
  affinityAnthemTeamBlue: new AffinityAnthemEffects('U', AnthemStrength.NORMAL, AnthemTargets.TEAM),
  affinityAnthemTeamBlack: new AffinityAnthemEffects('B', AnthemStrength.NORMAL, AnthemTargets.TEAM),
  affinityAnthemTeamRed: new AffinityAnthemEffects('R', AnthemStrength.NORMAL, AnthemTargets.TEAM),
  affinityAnthemTeamGreen: new AffinityAnthemEffects('G', AnthemStrength.NORMAL, AnthemTargets.TEAM),
  affinityAnthemTeamColorless: new AffinityAnthemEffects('C', AnthemStrength.NORMAL, AnthemTargets.TEAM),
  affinityAnthemTeamAll: new AllAffinityAnthemEffects(AnthemStrength.NORMAL, AnthemTargets.TEAM),

  // Major
  majorAffinityAnthemSelfWhite: new AffinityAnthemEffects('W', AnthemStrength.MAJOR, AnthemTargets.SELF),
  majorAffinityAnthemSelfBlue: new AffinityAnthemEffects('U', AnthemStrength.MAJOR, AnthemTargets.SELF),
  majorAffinityAnthemSelfBlack: new AffinityAnthemEffects('B', AnthemStrength.MAJOR, AnthemTargets.SELF),
  majorAffinityAnthemSelfRed: new AffinityAnthemEffects('R', AnthemStrength.MAJOR, AnthemTargets.SELF),
  majorAffinityAnthemSelfGreen: new AffinityAnthemEffects('G', AnthemStrength.MAJOR, AnthemTargets.SELF),
  majorAffinityAnthemSelfColorless: new AffinityAnthemEffects('C', AnthemStrength.MAJOR, AnthemTargets.SELF),
  majorAffinityAnthemSelfAll: new AllAffinityAnthemEffects(AnthemStrength.MAJOR, AnthemTargets.SELF),

  majorAffinityAnthemNeighborsWhite: new AffinityAnthemEffects('W', AnthemStrength.MAJOR, AnthemTargets.NEIGHBORS),
  majorAffinityAnthemNeighborsBlue: new AffinityAnthemEffects('U', AnthemStrength.MAJOR, AnthemTargets.NEIGHBORS),
  majorAffinityAnthemNeighborsBlack: new AffinityAnthemEffects('B', AnthemStrength.MAJOR, AnthemTargets.NEIGHBORS),
  majorAffinityAnthemNeighborsRed: new AffinityAnthemEffects('R', AnthemStrength.MAJOR, AnthemTargets.NEIGHBORS),
  majorAffinityAnthemNeighborsGreen: new AffinityAnthemEffects('G', AnthemStrength.MAJOR, AnthemTargets.NEIGHBORS),
  majorAffinityAnthemNeighborsColorless: new AffinityAnthemEffects('C', AnthemStrength.MAJOR, AnthemTargets.NEIGHBORS),
  majorAffinityAnthemNeighborsAll: new AllAffinityAnthemEffects(AnthemStrength.MAJOR, AnthemTargets.NEIGHBORS),

  majorAffinityAnthemTeamWhite: new AffinityAnthemEffects('W', AnthemStrength.MAJOR, AnthemTargets.TEAM),
  majorAffinityAnthemTeamBlue: new AffinityAnthemEffects('U', AnthemStrength.MAJOR, AnthemTargets.TEAM),
  majorAffinityAnthemTeamBlack: new AffinityAnthemEffects('B', AnthemStrength.MAJOR, AnthemTargets.TEAM),
  majorAffinityAnthemTeamRed: new AffinityAnthemEffects('R', AnthemStrength.MAJOR, AnthemTargets.TEAM),
  majorAffinityAnthemTeamGreen: new AffinityAnthemEffects('G', AnthemStrength.MAJOR, AnthemTargets.TEAM),
  majorAffinityAnthemTeamColorless: new AffinityAnthemEffects('C', AnthemStrength.MAJOR, AnthemTargets.TEAM),
  majorAffinityAnthemTeamAll: new AllAffinityAnthemEffects(AnthemStrength.MAJOR, AnthemTargets.TEAM),

  // Dislike
  dislikeAffinityAnthemSelfWhite: new AffinityAnthemEffects('W', AnthemStrength.DISLIKE, AnthemTargets.SELF),
  dislikeAffinityAnthemSelfBlue: new AffinityAnthemEffects('U', AnthemStrength.DISLIKE, AnthemTargets.SELF),
  dislikeAffinityAnthemSelfBlack: new AffinityAnthemEffects('B', AnthemStrength.DISLIKE, AnthemTargets.SELF),
  dislikeAffinityAnthemSelfRed: new AffinityAnthemEffects('R', AnthemStrength.DISLIKE, AnthemTargets.SELF),
  dislikeAffinityAnthemSelfGreen: new AffinityAnthemEffects('G', AnthemStrength.DISLIKE, AnthemTargets.SELF),
  dislikeAffinityAnthemSelfColorless: new AffinityAnthemEffects('C', AnthemStrength.DISLIKE, AnthemTargets.SELF),
  dislikeAffinityAnthemSelfAll: new AllAffinityAnthemEffects(AnthemStrength.DISLIKE, AnthemTargets.SELF),

  dislikeAffinityAnthemNeighborsWhite: new AffinityAnthemEffects('W', AnthemStrength.DISLIKE, AnthemTargets.NEIGHBORS),
  dislikeAffinityAnthemNeighborsBlue: new AffinityAnthemEffects('U', AnthemStrength.DISLIKE, AnthemTargets.NEIGHBORS),
  dislikeAffinityAnthemNeighborsBlack: new AffinityAnthemEffects('B', AnthemStrength.DISLIKE, AnthemTargets.NEIGHBORS),
  dislikeAffinityAnthemNeighborsRed: new AffinityAnthemEffects('R', AnthemStrength.DISLIKE, AnthemTargets.NEIGHBORS),
  dislikeAffinityAnthemNeighborsGreen: new AffinityAnthemEffects('G', AnthemStrength.DISLIKE, AnthemTargets.NEIGHBORS),
  dislikeAffinityAnthemNeighborsColorless: new AffinityAnthemEffects('C', AnthemStrength.DISLIKE, AnthemTargets.NEIGHBORS),
  dislikeAffinityAnthemNeighborsAll: new AllAffinityAnthemEffects(AnthemStrength.DISLIKE, AnthemTargets.NEIGHBORS),

  dislikeAffinityAnthemTeamWhite: new AffinityAnthemEffects('W', AnthemStrength.DISLIKE, AnthemTargets.TEAM),
  dislikeAffinityAnthemTeamBlue: new AffinityAnthemEffects('U', AnthemStrength.DISLIKE, AnthemTargets.TEAM),
  dislikeAffinityAnthemTeamBlack: new AffinityAnthemEffects('B', AnthemStrength.DISLIKE, AnthemTargets.TEAM),
  dislikeAffinityAnthemTeamRed: new AffinityAnthemEffects('R', AnthemStrength.DISLIKE, AnthemTargets.TEAM),
  dislikeAffinityAnthemTeamGreen: new AffinityAnthemEffects('G', AnthemStrength.DISLIKE, AnthemTargets.TEAM),
  dislikeAffinityAnthemTeamColorless: new AffinityAnthemEffects('C', AnthemStrength.DISLIKE, AnthemTargets.TEAM),
  dislikeAffinityAnthemTeamAll: new AllAffinityAnthemEffects(AnthemStrength.DISLIKE, AnthemTargets.TEAM),

  // Hatred
  hatredAffinityAnthemSelfWhite: new AffinityAnthemEffects('W', AnthemStrength.HATRED, AnthemTargets.SELF),
  hatredAffinityAnthemSelfBlue: new AffinityAnthemEffects('U', AnthemStrength.HATRED, AnthemTargets.SELF),
  hatredAffinityAnthemSelfBlack: new AffinityAnthemEffects('B', AnthemStrength.HATRED, AnthemTargets.SELF),
  hatredAffinityAnthemSelfRed: new AffinityAnthemEffects('R', AnthemStrength.HATRED, AnthemTargets.SELF),
  hatredAffinityAnthemSelfGreen: new AffinityAnthemEffects('G', AnthemStrength.HATRED, AnthemTargets.SELF),
  hatredAffinityAnthemSelfColorless: new AffinityAnthemEffects('C', AnthemStrength.HATRED, AnthemTargets.SELF),
  hatredAffinityAnthemSelfAll: new AllAffinityAnthemEffects(AnthemStrength.HATRED, AnthemTargets.SELF),

  hatredAffinityAnthemNeighborsWhite: new AffinityAnthemEffects('W', AnthemStrength.HATRED, AnthemTargets.NEIGHBORS),
  hatredAffinityAnthemNeighborsBlue: new AffinityAnthemEffects('U', AnthemStrength.HATRED, AnthemTargets.NEIGHBORS),
  hatredAffinityAnthemNeighborsBlack: new AffinityAnthemEffects('B', AnthemStrength.HATRED, AnthemTargets.NEIGHBORS),
  hatredAffinityAnthemNeighborsRed: new AffinityAnthemEffects('R', AnthemStrength.HATRED, AnthemTargets.NEIGHBORS),
  hatredAffinityAnthemNeighborsGreen: new AffinityAnthemEffects('G', AnthemStrength.HATRED, AnthemTargets.NEIGHBORS),
  hatredAffinityAnthemNeighborsColorless: new AffinityAnthemEffects('C', AnthemStrength.HATRED, AnthemTargets.NEIGHBORS),
  hatredAffinityAnthemNeighborsAll: new AllAffinityAnthemEffects(AnthemStrength.HATRED, AnthemTargets.NEIGHBORS),

  hatredAffinityAnthemTeamWhite: new AffinityAnthemEffects('W', AnthemStrength.HATRED, AnthemTargets.TEAM),
  hatredAffinityAnthemTeamBlue: new AffinityAnthemEffects('U', AnthemStrength.HATRED, AnthemTargets.TEAM),
  hatredAffinityAnthemTeamBlack: new AffinityAnthemEffects('B', AnthemStrength.HATRED, AnthemTargets.TEAM),
  hatredAffinityAnthemTeamRed: new AffinityAnthemEffects('R', AnthemStrength.HATRED, AnthemTargets.TEAM),
  hatredAffinityAnthemTeamGreen: new AffinityAnthemEffects('G', AnthemStrength.HATRED, AnthemTargets.TEAM),
  hatredAffinityAnthemTeamColorless: new AffinityAnthemEffects('C', AnthemStrength.HATRED, AnthemTargets.TEAM),
  hatredAffinityAnthemTeamAll: new AllAffinityAnthemEffects(AnthemStrength.HATRED, AnthemTargets.TEAM),
};
