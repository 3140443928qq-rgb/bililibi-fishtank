import { FishConfig, DecoConfig, DecoEffect } from './types';

export const WORLD_W = 2266;
export const WORLD_H = 720;
export const FEED_LIMIT = 5;
export const CAPACITY_LIMIT = 20;
export const DECO_LIMIT = 7;

export const FISH_CONFIG: Record<string, FishConfig> = {
  '黄岩鱼': { price: 10, convert: 20, src: 'fish_guppy.png', cols: 2, rows: 2, w: 128, h: 64, scale: 0.7 },
  '黑斑河豚': { price: 30, convert: 18, src: 'fish_zebra.png', cols: 2, rows: 2, w: 128, h: 64, scale: 0.7 },
  '天使鱼': { price: 50, convert: 16, src: 'fish1.png', cols: 2, rows: 2, w: 128, h: 128, scale: 1.5 },
  '蓝斑鱼': { price: 60, convert: 15, src: 'fish2.png', cols: 2, rows: 2, w: 128, h: 128, scale: 1.5 },
  '蓝鹦哥': { price: 100, convert: 13, src: 'fish3.png', cols: 2, rows: 2, w: 128, h: 128, scale: 1.2 },
  '红海马': { price: 125, convert: 11, src: 'fish5.png', cols: 4, rows: 1, w: 128, h: 64, scale: 1.5 },
  '辉海马': { price: 150, convert: 10, src: 'fish6.png', cols: 4, rows: 1, w: 128, h: 64, scale: 1.5 },
  '斑点鲀': { price: 175, convert: 9, src: 'fish22.png', cols: 2, rows: 2, w: 384, h: 184, scale: 1.3 },
  '红纹鲀': { price: 200, convert: 8, src: 'fish8.png', cols: 2, rows: 2, w: 128, h: 64, scale: 1.1 },
  '大河豚': { price: 250, convert: 7, src: 'fish9.png', cols: 2, rows: 2, w: 128, h: 128, scale: 1.5 },
  '火焰天使': { price: 300, convert: 8, src: '13.png', cols: 2, rows: 2, w: 256, h: 240, scale: 2.0 },
  '毛毛虫': { price: 80, convert: 20, src: '16.png', cols: 1, rows: 1, w: 355, h: 226, scale: 3.9 },
  '牆蝈蛙蛤蛤': { price: 350, convert: 20, src: 'fish27.png', cols: 1, rows: 1, w: 384, h: 384, scale: 2.3 },
  '徐驰': { price: 15, convert: 20, src: '30.png', cols: 1, rows: 1, w: 128, h: 62, scale: 1.4 },
  '黄金螺': { price: 40, convert: 5, src: 'snail_sprite.png', cols: 4, rows: 1, w: 512, h: 128, scale: 0.8, moveMode: 'crawl' },
  '樱花虾': { price: 80, convert: 8, src: 'shrimp_sprite.png', cols: 4, rows: 1, w: 512, h: 128, scale: 1.0, moveMode: 'crawl' },
  '斜纹炮弹': { price: 450, convert: 7, src: 'triggerfish1sheet.png', cols: 4, rows: 1, w: 512, h: 128, scale: 1.3 },
  '海星': { price: 120, convert: 12, src: 'snail_sprite.png', cols: 4, rows: 1, w: 512, h: 128, scale: 0.9, moveMode: 'crawl' },
  '清道夫': { price: 180, convert: 10, src: 'fish9.png', cols: 2, rows: 2, w: 128, h: 128, scale: 1.0 },
};

export const SPECIAL_FISH: Record<string, FishConfig> = {
  '猎手鱼': { mPrice: 25, price: 0, convert: 5, src: 'fish16.png', cols: 2, rows: 2, w: 126, h: 103, scale: 1.8 },
  '嗜血鲨': { mPrice: 100, price: 0, convert: 3, src: 'fish20.png', cols: 2, rows: 2, w: 324, h: 156, scale: 2.5 },
  '地狱魔鬼鱼': { mPrice: 100, price: 0, convert: 3, src: 'fish20.png', cols: 2, rows: 2, w: 324, h: 156, scale: 2.5 }
};

export const DECO_CONFIG: Record<string, DecoConfig> = {
  '花岗岩': { price: 50, src: 'deco4.png', w: 200, h: 200 },
  '大理石': { price: 60, src: 'deco5.png', w: 200, h: 200 },
  '海草': { price: 150, src: 'deco6.png', w: 260, h: 340 },
  '自动喂食器': { price: 1000, src: 'deco11.png', w: 150, h: 150 },
  '熔岩石': { price: 800, src: 'deco7.png', w: 215, h: 320 },
  '熔岩矿': { price: 80, src: 'deco8.png', w: 177, h: 220 },
  '佛像': { price: 500, src: 'deco9.png', w: 300, h: 310 },
  '腊肉': { price: 666, src: 'deco10.png', w: 216, h: 343 },
  '李老师': { price: 1800, src: 'deco11.png', w: 260, h: 260 }
};

export const ACHIEVEMENTS: Record<string, { title: string; desc: string; target: number; reward: number; type: 'coins' | 'fishes' | 'mutant' | 'water' }> = {
  'rich_1': { title: '初露锋芒', desc: '拥有 1000 金币', target: 1000, reward: 200, type: 'coins' },
  'rich_2': { title: '腰缠万贯', desc: '拥有 5000 金币', target: 5000, reward: 1000, type: 'coins' },
  'fish_collector_1': { title: '鱼类爱好者', desc: '拥有 5 条鱼', target: 5, reward: 100, type: 'fishes' },
  'fish_collector_2': { title: '水族馆长', desc: '拥有 10 条鱼', target: 10, reward: 500, type: 'fishes' },
  'mutant_hunter': { title: '突变猎人', desc: '拥有 100 突变点', target: 100, reward: 50, type: 'mutant' },
  'clean_tank': { title: '环保卫士', desc: '水质保持在 100', target: 100, reward: 50, type: 'water' },
};

export const DECO_EFFECTS: Record<string, DecoEffect> = {
  '海草': { desc: '提升健康恢复', type: 'hp_regen', base: 1 },
  '自动喂食器': { desc: '全自动投喂：每10秒自动投放鱼粮', type: 'auto_feed', base: 1 },
  '腊肉': { desc: '饥荒：饥饿加速且成长倒退', type: 'famine', base: 1 },
  '佛像': { desc: '功德：定期转化金币', type: 'gold_gen', base: 10 },
  '李老师': { desc: '成长转化提升', type: 'growth_buff', base: 1 }
};
