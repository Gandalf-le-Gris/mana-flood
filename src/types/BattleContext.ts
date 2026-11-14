import type { ExtendedColor } from './Color';

export interface BattleContext {
  healTeam(amount: number): void;
  damageTeam(amount: number): void;

  damageEnemy(damage: number, color?: ExtendedColor, targetIndex?: number): void;
  damageAllEnemies(damage: number, color?: ExtendedColor): void;

  convertOrbs(count: number, toColor: ExtendedColor, fromColor?: ExtendedColor): boolean;
  destroyOrbs(count: number, color?: ExtendedColor): boolean;
  shuffleBoard(): boolean;

  canAct(): boolean;
}
