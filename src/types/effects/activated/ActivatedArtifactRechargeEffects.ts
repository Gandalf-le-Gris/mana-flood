import type { BattleContext } from '@/types/BattleContext';
import { ActivatedEffect } from './ActivatedEffect';
import type { Game } from '@/types/Game';

class ArtifactRechargeStrength {
  readonly name: string = "";
  readonly cooldown: number = 1;

  static MINOR: ArtifactRechargeStrength = { name: 'minor-artifact-recharge', cooldown: 4 };
  static NORMAL: ArtifactRechargeStrength = { name: 'artifact-recharge', cooldown: 3 };
  static MAJOR: ArtifactRechargeStrength = { name: 'major-artifact-recharge', cooldown: 2 };
}

class ActivatedArtifactRechargeEffect extends ActivatedEffect {
  readonly strength: ArtifactRechargeStrength;
  
  constructor(strength: ArtifactRechargeStrength) {
    super();
    this.id = strength.name;
    this.cooldown = strength.cooldown;
    this.strength = strength;
  }

  async execute(context: BattleContext, { sourceIndex }: { sourceIndex: number } ): Promise<boolean> {
    await context.rechargeArtifact(sourceIndex, 1);
    return true;
  }

  condition(game: Game, { sourceIndex }: { sourceIndex: number } ): boolean {
    return !!game.artifactCooldowns[sourceIndex];
  }
}

export const activatedRechargeArtifactEffects = {
  minorRechargeArtifactEffect: new ActivatedArtifactRechargeEffect(ArtifactRechargeStrength.MINOR),
  rechargeArtifactEffect: new ActivatedArtifactRechargeEffect(ArtifactRechargeStrength.NORMAL),
  majorRechargeArtifactEffect: new ActivatedArtifactRechargeEffect(ArtifactRechargeStrength.MAJOR),
}
