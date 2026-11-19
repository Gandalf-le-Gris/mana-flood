import { Dominaria } from "./Dominaria";
import { Llanowar } from './Llanowar';
import { MeditationRealm } from './MeditationRealm';
import type { Plane } from "./Plane";
import { Ravnica } from './Ravnica';
import { Zendikar } from './Zendikar';

export const planes: typeof Plane[] = [
  MeditationRealm,

  Dominaria,
  Llanowar,

  Ravnica,

  Zendikar,
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
