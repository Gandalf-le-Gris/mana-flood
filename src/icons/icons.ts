import { h } from 'vue';
import type { IconSet, IconProps } from 'vuetify';
import B from './B.vue';
import G from './G.vue';
import R from './R.vue';
import U from './U.vue';
import W from './W.vue';
import C from './C.vue';
import Azorius from './Azorius.vue';
import Boros from './Boros.vue';
import Dimir from './Dimir.vue';
import Golgari from './Golgari.vue';
import Gruul from './Gruul.vue';
import Izzet from './Izzet.vue';
import Orzhov from './Orzhov.vue';
import Rakdos from './Rakdos.vue';
import Selesnya from './Selesnya.vue';
import Simic from './Simic.vue';
import Creature from './Creature.vue';
import Sorcery from './Sorcery.vue';
import Artifact from './Artifact.vue';
import _0 from './0.vue';
import _1 from './1.vue';
import _2 from './2.vue';
import _3 from './3.vue';
import _4 from './4.vue';
import _5 from './5.vue';
import _6 from './6.vue';
import _7 from './7.vue';
import _8 from './8.vue';
import _9 from './9.vue';
import _10 from './10.vue';
import X from './X.vue';
import BPlain from './b-plain.vue';
import GPlain from './g-plain.vue';
import RPlain from './r-plain.vue';
import UPlain from './u-plain.vue';
import WPlain from './w-plain.vue';
import CPlain from './c-plain.vue';
import Hero from './Hero.vue';
import Coin from './Coin.vue';
import KeywordEphemeral from './KeywordEphemeral.vue';
import KeywordFirstStrike from './KeywordFirstStrike.vue';
import KeywordHaste from './KeywordHaste.vue';
import KeywordDoubleStrike from './KeywordDoubleStrike.vue';
import KeywordVigilance from './KeywordVigilance.vue';
import KeywordReach from './KeywordReach.vue';
import KeywordFlying from './KeywordFlying.vue';
import KeywordLifelink from './KeywordLifelink.vue';
import KeywordMenace from './KeywordMenace.vue';
import KeywordDeathtouch from './KeywordDeathtouch.vue';
import KeywordTrample from './KeywordTrample.vue';
import KeywordDefender from './KeywordDefender.vue';
import KeywordIndestructible from './KeywordIndestructible.vue';
import KeywordHexproof from './KeywordHexproof.vue';
import KeywordAggressive from './KeywordAggressive.vue';
import KeywordElusive from './KeywordElusive.vue';
import KeywordExtort from './KeywordExtort.vue';
import KeywordEvolve from './KeywordEvolve.vue';
import Knowledge from './Knowledge.vue';

const customSvgNameToComponent: any = {
  B,
  G,
  R,
  U,
  W,
  C,
  Azorius,
  Boros,
  Dimir,
  Golgari,
  Gruul,
  Izzet,
  Orzhov,
  Rakdos,
  Selesnya,
  Simic,
  Creature,
  Sorcery,
  Artifact,
  Hero,
  '0': _0,
  '1': _1,
  '2': _2,
  '3': _3,
  '4': _4,
  '5': _5,
  '6': _6,
  '7': _7,
  '8': _8,
  '9': _9,
  '10': _10,
  X,
  'B-plain': BPlain,
  'G-plain': GPlain,
  'R-plain': RPlain,
  'U-plain': UPlain,
  'W-plain': WPlain,
  'C-plain': CPlain,
  coin: Coin,
  knowledge: Knowledge,
  'keyword-Aggressive': KeywordAggressive,
  'keyword-Deathtouch': KeywordDeathtouch,
  'keyword-Defender': KeywordDefender,
  'keyword-DoubleStrike': KeywordDoubleStrike,
  'keyword-Elusive': KeywordElusive,
  'keyword-Ephemeral': KeywordEphemeral,
  'keyword-Evolve': KeywordEvolve,
  'keyword-Extort': KeywordExtort,
  'keyword-FirstStrike': KeywordFirstStrike,
  'keyword-Flying': KeywordFlying,
  'keyword-Haste': KeywordHaste,
  'keyword-Hexproof': KeywordHexproof,
  'keyword-Indestructible': KeywordIndestructible,
  'keyword-Lifelink': KeywordLifelink,
  'keyword-Menace': KeywordMenace,
  'keyword-Reach': KeywordReach,
  'keyword-Trample': KeywordTrample,
  'keyword-Vigilance': KeywordVigilance,
};

export function iconExists(icon: string) {
  return Object.keys(customSvgNameToComponent).includes(icon.replace('mtg:', ''));
}

const mtg: IconSet = {
  component: (props: IconProps) => h(props.tag, [h(customSvgNameToComponent[props.icon as string], { class: 'v-icon__svg' })])
};

export { mtg };
