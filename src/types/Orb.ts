import type { ExtendedColor } from "./Color";

export class Orb {
  uuid: string = crypto.randomUUID();
  color: ExtendedColor;
  r: number;
  c: number;

  public constructor(color: ExtendedColor, r: number, c: number) {
    this.color = color;
    this.r = r;
    this.c = c;
  }
}