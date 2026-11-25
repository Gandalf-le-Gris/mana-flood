import type { ExtendedColor } from './Color';
import type { Game } from './Game';

export interface BattleContext {
  readonly game: Game;

  healTeam(amount: number): Promise<void>;
  damageTeam(amount: number): Promise<void>;

  damageEnemy(damage: number, color?: ExtendedColor, targetIndex?: number): Promise<void>;
  damageAllEnemies(damage: number, color?: ExtendedColor): Promise<void>;

  convertOrbs(count: number, toColor: ExtendedColor, fromColor?: ExtendedColor): Promise<boolean>;
  destroyOrbs(count: number, avoidColor?: ExtendedColor): Promise<boolean>;
  shuffleBoard(): Promise<boolean>;

  rechargeCreature(index: number, turns: number): Promise<void>;
  rechargeArtifact(index: number, turns: number): Promise<void>;

  canAct(): boolean;
  setBusy(busy: boolean): void;
}
