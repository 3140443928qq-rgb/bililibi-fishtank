export interface FishConfig {
  price: number;
  convert: number;
  src: string;
  cols: number;
  rows: number;
  w: number;
  h: number;
  scale: number;
  mPrice?: number;
}

export interface DecoConfig {
  price: number;
  src: string;
  w: number;
  h: number;
}

export interface DecoEffect {
  desc: string;
  type: string;
  base: number;
}

export type TabType = 'fish' | 'deco' | 'special';

export interface Achievement {
  id: string;
  title: string;
  desc: string;
  target: number;
  reward: number;
  type: 'coins' | 'fishes' | 'mutant' | 'water';
}

export interface GameState {
  coins: number;
  nurture: number;
  mutantPoints: number;
  maxFishes: number;
  feedCount: number;
  upgradeFeedCost: number;
  capUpgradeCost: number;
  maxDecos: number;
  decoUpgradeCost: number;
  treasure: number;
  lastManualBreedTime: number;
  waterQuality: number; // 0-100
  timeOfDay: number; // 0-24
  discoveredSpecies: string[];
  achievements: string[]; // IDs of completed achievements
  autoFeederLevel: number;
  lastAutoFeedTime: number;
}

export interface FishData {
  type: string;
  variant: number;
  generation: number;
  kills: number;
  lastSkillTime: number;
  maxGrowth: number;
  growthValue: number;
  hp: number;
  maxHP: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isEgg: boolean;
  spawnTime: number;
  hunger: number;
  hasBred?: boolean;
  isDeadState?: boolean;
  deathTimer?: number;
  opacity?: number;
  hitFlash?: number;
  isSpecial?: boolean;
}

export interface DecoData {
  type: string;
  x: number;
  y: number;
  level: number;
  nurtureEaten: number;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  eaten?: boolean;
  type?: 'food' | 'blood' | 'bubble';
}
