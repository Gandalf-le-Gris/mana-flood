import { Effect } from "../Effect";

export const delayEffects = {
  minorDelay: new Effect().withId('shared.minor-delay'),
  delay: new Effect().withId('shared.delay'),
  majorDelay: new Effect().withId('shared.major-delay'),
};
