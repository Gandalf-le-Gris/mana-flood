import type { ExtendedColor } from './Color';
import type { Game } from './Game';

export interface BattleContext {
  readonly game: Game;

  healTeam(amount: number): void;
  damageTeam(amount: number): void;

  damageEnemy(damage: number, color?: ExtendedColor, targetIndex?: number): void;
  damageAllEnemies(damage: number, color?: ExtendedColor): void;

  convertOrbs(count: number, toColor: ExtendedColor, fromColor?: ExtendedColor): boolean;
  destroyOrbs(count: number, avoidColor?: ExtendedColor): boolean;
  shuffleBoard(): boolean;

  rechargeCreature(index: number, turns: number): void;
  rechargeArtifact(index: number, turns: number): void;

  canAct(): boolean;
}
