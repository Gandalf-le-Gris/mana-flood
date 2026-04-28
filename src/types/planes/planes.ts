import { Dominaria } from "./Dominaria";
import type { Plane } from "./Plane";

export const planes: typeof Plane[] = [
  Dominaria
];

export function buildPlane(plane: string | Plane): Plane {
  if (typeof plane !== 'string') {
    plane = plane.name;
  }
  for (const builder of planes) {
    const p: Plane = new builder();
    if (p.name === plane) {
      return p;
    }
  }
  throw `Plane not found: ${plane}`
}
