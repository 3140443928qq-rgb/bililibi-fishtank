import React, { useEffect } from 'react';

export default function App() {
    const closeAll = () => {
        const panels = ['panel', 'shopPanel', 'extractionPanel', 'maintenancePanel'];
        panels.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    };
    (window as any).closeAll = closeAll;

    useEffect(() => {
    // --- 以下是用户原始脚本逻辑 ---
    const AFFIX_STYLES: any = {
        '烈焰': { color: '#ff4d4d', border: '#ff4d4d' },
        '幽冥': { color: '#8a2be2', border: '#8a2be2' },
        '雷霆': { color: '#00d2ff', border: '#00d2ff' },
        '森罗': { color: '#2ecc71', border: '#2ecc71' },
        '寒冰': { color: '#a1c4fd', border: '#a1c4fd' },
        '狂暴': { color: '#e74c3c', border: '#e74c3c' },
        '潜行': { color: '#7f8c8d', border: '#7f8c8d' },
        '神圣': { color: '#f1c40f', border: '#f1c40f' },
        '幸运': { color: '#f1c40f', border: '#f1c40f' },
        '不幸': { color: '#95a5a6', border: '#95a5a6' },
        '战士': { color: '#e67e22', border: '#e67e22' },
        '狂战士': { color: '#c0392b', border: '#c0392b' },
        '牧师': { color: '#ecf0f1', border: '#ecf0f1' },
        '工程师': { color: '#f39c12', border: '#f39c12' },
        '法师': { color: '#9b59b6', border: '#9b59b6' },
        '萨满': { color: '#1abc9c', border: '#1abc9c' },
        '忍者': { color: '#2c3e50', border: '#34495e' },
    };

    const FISH_QUOTES = [
        "水质真棒！", "我要进化了！", "好饿啊...", "看我的厉害！", "这片鱼缸是我的！",
        "美味！", "咕噜咕噜...", "今天天气不错", "我是最美的鱼", "别碰我的装饰品",
        "感觉充满了力量！", "这里的环境真舒服", "有人在看我吗？", "我想去外面的世界看看",
        "这颗水草长得真快", "金币！我看到金币了！", "小心，有敌袭！", "我的鳞片在发光",
        "变异的感觉真奇妙", "我是这缸里的霸主！"
    ];

    const MAO_QUOTES = [
        "知识越多越反动。", "要扫除一切害人虫，全无敌。", "与天奋斗，其乐无穷；与地奋斗，其乐无穷；与人奋斗，其乐无穷。",
        "江青，你以后怎么办？", "大办公共食堂，吃饭不要钱。", "三年自然灾害，那是天灾人祸。",
        "打倒刘少奇！", "文革是一场触及人们灵魂的大革命。", "冷笑话：听说有人饿得吃观音土？呵呵。",
        "我看你是不想干了。", "权力斗争，其乐无穷。", "大跃进，万岁！",
        "人有多大胆，地有多大产。", "造反有理！", "炮打司令部——我的一张大字报。",
        "不破不立，破字当头，立在其中。", "阶级斗争要天天讲，月月讲，年年讲。"
    ];

    const WORLD_W = 2266, WORLD_H = 1442;
    const FEED_LIMIT = 5, CAPACITY_LIMIT = 30, DECO_LIMIT = 7;

    let FISH_CONFIG: any = {
        '黄岩鱼': { price: 10,  convert: 20, src: 'fish_guppy.png', cols: 2, rows: 2, w: 128, h: 64,  scale: 0.7 },
        '黑斑河豚': { price: 30,  convert: 18, src: 'fish_zebra.png', cols: 2, rows: 2, w: 128, h: 64,  scale: 0.7 },
        '天使鱼': { price: 50,  convert: 16, src: 'fish1.png',      cols: 2, rows: 2, w: 128, h: 128, scale: 1.5 },
        '蓝斑鱼':   { price: 60,  convert: 15, src: 'fish2.png',      cols: 2, rows: 2, w: 128, h: 128, scale: 1.5 },
        '蓝鹦哥': { price: 100, convert: 13, src: 'fish3.png',      cols: 2, rows: 2, w: 128, h: 128, scale: 1.2 },
        '红海马': { price: 125, convert: 11, src: 'fish5.png',      cols: 4, rows: 1, w: 128, h: 64,  scale: 1.5 },
        '辉海马': { price: 150, convert: 10, src: 'fish6.png',      cols: 4, rows: 1, w: 128, h: 64,  scale: 1.5 },
        '斑点鲀': { price: 175, convert: 9,  src: 'fish22.png',      cols: 2, rows: 2, w: 384, h: 184,  scale: 1.3 },
        '红纹鲀': { price: 200, convert: 8,  src: 'fish8.png',      cols: 2, rows: 2, w: 128, h: 64,  scale: 1.1 },
        '大河豚': { price: 250, convert: 7,  src: 'fish9.png',      cols: 2, rows: 2, w: 128, h: 128, scale: 1.5 },
        '火焰天使': { price: 300, convert: 8,  src: '13.png',      cols: 2, rows: 2, w: 256, h: 240,  scale: 2.0 },
        '毛毛虫': { price: 80,  convert: 20, src: '16.png',       cols: 1, rows: 1, w: 355, h: 226, scale: 3.12 },
        '牆蝈蛙蛤蛤': { price: 350,  convert: 20, src: 'fish27.png',       cols: 1, rows: 1, w: 384, h: 384, scale: 2.3 },
        '徐驰': { price: 15,  convert: 20, src: '30.png',       cols: 1, rows: 1, w: 128, h: 62, scale: 1.4 },
        '黄金螺': { price: 40, convert: 5, src: 'snail_sprite.png', cols: 4, rows: 1, w: 512, h: 128, scale: 0.8, moveMode: 'crawl' },
        '樱花虾': { price: 80, convert: 8, src: 'shrimp_sprite.png', cols: 4, rows: 1, w: 512, h: 128, scale: 1.0, moveMode: 'crawl' },
        '斜纹炮弹': { price: 450, convert: 7, sprite: '🚀', cols: 1, rows: 1, w: 128, h: 128, scale: 1.3 },
        '海星': { price: 120, convert: 12, sprite: '⭐', cols: 1, rows: 1, w: 128, h: 128, scale: 1.8, moveMode: 'crawl', speed: 0.15 },
        '清道夫': { price: 180, convert: 10, src: 'fish9.png', cols: 2, rows: 2, w: 128, h: 128, scale: 1.0, scavenger: true },
    };

    let SPECIAL_FISH: any = {
        '猎手鱼': { mPrice: 25, price: 0, src: 'fish16.png',  cols: 2, rows: 2, w: 126, h: 103, scale: 1.8 },
        '嗜血鲨': { mPrice: 100, price: 0, src: 'fish20.png', cols: 2, rows: 2, w: 324, h: 156, scale: 2.5 },
        '地狱魔鬼鱼': { mPrice: 100, price: 0, src: 'fish20.png', cols: 2, rows: 2, w: 324, h: 156, scale: 2.5, tint: 'red' }
    };

    let DECO_CONFIG: any = {
        '花岗岩': { price: 50, src: 'deco4.png', w: 200, h: 200, desc: "坚硬的花岗岩，可以为鱼类提供基础庇护。" },
        '大理石': { price: 60, src: 'deco5.png', w: 200, h: 200, desc: "优雅的大理石，提供宽敞的躲避空间。" },
        '海草':   { price: 150,  src: 'deco6.png', w: 260, h: 340, desc: "茂盛的海草，每周期为所有鱼类恢复健康值。" },
        '熔岩石':   { price: 800, src: 'deco7.png', w: 215, h: 320, desc: "蕴含能量的熔岩石，发射熔岩球自动攻击入侵者。" },
        '熔岩矿':   { price: 80,  src: 'deco8.png', w: 177,  h: 220, desc: "稀有的熔岩矿石，提供极佳的庇护效果。" },
        '佛像':   { price: 500, src: 'deco9.png', w: 300, h: 310, desc: "佛光普照，每周期产生额外金币。" },
        '腊肉': { price: 666, src: 'deco10.png', w: 216, h: 343, desc: "散发咸味，每周期降低鱼类饥饿度但会抑制成长。" },
        '李老师':   { price: 1800, src: 'deco11.png', w: 260, h: 260, desc: "良师益友，大幅提升鱼类的成长效率，并提供顶级庇护。" }
    };

    let gameState: any = {
     coins: 200, nurture: 0, mutantPoints: 0, fishes: [], decos: [], foodParticles: [], bloodParticles: [],
     maxFishes: 5, feedCount: 1, upgradeFeedCost: 10, capUpgradeCost: 20,
     maxDecos: 2,           
     decoUpgradeCost: 30,  
     treasure: 0, cameraX: 0, cameraY: 0, selectedItem: null, currentTab: 'fish',
     lastIncomeTime: Date.now(), lastSpawnTime: Date.now(), lastGrowthTime: Date.now(),
     lastManualBreedTime: 0, 
     waste: 0, waterQuality: '良好', waterQualityValue: 100, 
     events: [], // 支持多个事件叠加
     missiles: [], parasites: [], zombies: [], devilFishes: [], worms: [], hooks: [], lavaBalls: [],
     portals: [], blackHoles: [], fireballs: [], lightningChains: [], eggs: [],
     bubbles: [], bullets: [], miniBlackHoles: [], healEffects: [],
     hellTideProgress: 0,
     deathCount: 0,
     lastHellTideDecayTime: 0,
     lastEventTime: Date.now(),
     lastWaterRecoverTime: Date.now(),
     lastBubbleTime: 0,
    };

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    const bgImg = new Image(); bgImg.src = '/background13.jpg';
    const assets: any = {};

    function loadAssets() {
        for(let n in FISH_CONFIG) { assets[n] = new Image(); assets[n].src = '/' + FISH_CONFIG[n].src; }
        for(let n in SPECIAL_FISH) { assets[n] = new Image(); assets[n].src = '/' + SPECIAL_FISH[n].src; }
        for(let n in DECO_CONFIG) { assets[n] = new Image(); assets[n].src = '/' + DECO_CONFIG[n].src; }
    }
    
    class Fish {
        type: string; isSpecial: boolean; variant: number; generation: number; kills: number;
        lastSkillTime: number; maxGrowth: number; growthValue: number; baseMaxHP: number;
        maxHP: number; hp: number; x: number; y: number; vx: number; vy: number;
        isEgg: boolean; spawnTime: number; hunger: number; facingRight: boolean;
        fw: number; fh: number; renderH: number; renderW: number; target: any; targetType: string | null = null; targetLockTimer: number = 0;
        wanderAngle: number = Math.random() * Math.PI * 2;
        isHunting: boolean; lastAttackTime: number; hitFlash: number; isDeadState: boolean = false;
        deathTimer: number = 0; opacity: number = 1; hasBred: boolean = false;
        moveMode: string = 'swim';
        crawlTargetX: number = 0; crawlTargetY: number = 0; crawlWait: number = 0;
        atk: number = 0; isHiding: boolean = false; shelterId: string | null = null;
        lastPoopTime: number = Date.now();
        level: number = 1; xp: number = 0; affixes: string[] = [];
        speech: string = ''; speechTimer: number = 0; lastSpeechTime: number = Date.now();
        lastHealTime: number = 0; lastRepairTime: number = 0; lastFireballTime: number = 0;
        lastLightningTime: number = 0; lastBerserkTime: number = 0; isBerserk: boolean = false;
        lastBulletTime: number = 0; lastBlackHoleTime: number = 0;
        lastHungerTime: number = Date.now();
        breedingHeartTimer: number = 0;
        holyEffect: { size: number, alpha: number } | null = null;
        ninjaState: { active: boolean, cloneX: number, cloneY: number, timer: number, rasenganSize: number, rasenganActive: boolean } = { active: false, cloneX: 0, cloneY: 0, timer: 0, rasenganSize: 0, rasenganActive: false };

        constructor(c: any) {
            this.type = c.type;
            const s = SPECIAL_FISH[this.type] || FISH_CONFIG[this.type];
            this.isSpecial = !!SPECIAL_FISH[this.type];
            this.variant = c.variant || 0;
            this.generation = c.generation || 1; 
            this.kills = c.kills || 0;
            this.lastSkillTime = c.lastSkillTime || 0;
            this.maxGrowth = c.maxGrowth || (120 + (this.variant * 25) + (this.generation * 25));
            this.growthValue = c.growthValue || 0;
            const baseP = s.price || 50; 
            this.baseMaxHP = 10 + Math.floor((baseP - 10) / 20) * 5;
            this.level = c.level || 1;
            this.xp = c.xp || 0;
            this.affixes = c.affixes || [];
            
            this.maxHP = this.baseMaxHP + Math.floor(this.growthValue / 5) + (this.level - 1) * 2;
            if (this.affixes.includes('巨化')) this.maxHP *= 1.5;
            
            // 变异等级加成
            if (this.variant === 2) this.maxHP *= 1.1;
            if (this.variant === 3) this.maxHP *= 1.2;
            if (this.variant === 5) this.maxHP *= 1.15;

            this.hp = c.hp !== undefined ? c.hp : this.maxHP;
            
            // 随机攻击力逻辑：更大幅度的随机波动，体现“欧皇”与“非酋”
            const priceFactor = Math.min(20, (baseP / 50));
            const luck = Math.random();
            if (luck > 0.95) {
                // 欧皇鱼：基础攻击力极高
                this.atk = c.atk || Math.floor(Math.random() * 10 + 15 + priceFactor);
                if (!this.affixes.includes('幸运')) this.affixes.push('幸运');
            } else if (luck < 0.2) {
                // 非酋鱼：基础攻击力较低
                this.atk = c.atk || Math.floor(Math.random() * 3 + 1 + priceFactor);
                if (!this.affixes.includes('不幸')) this.affixes.push('不幸');
            } else {
                // 普通鱼
                this.atk = c.atk || Math.floor(Math.random() * 7 + 4 + priceFactor);
            }
            
            if (this.affixes.includes('战士')) this.atk += 5;
            if (this.affixes.includes('狂战士')) this.atk += 10;
            
            // 变异等级攻击加成
            if (this.variant === 2) this.atk *= 1.1;
            if (this.variant === 4) this.atk *= 1.2;
            if (this.variant === 5) this.atk *= 1.15;
            if (this.variant >= 6) this.atk *= 1.25;

            this.atk = Math.max(1, Math.min(200, this.atk));

            this.x = c.x || Math.random() * (WORLD_W - 200) + 100;
            this.y = c.y || Math.random() * (WORLD_H - 200) + 100;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 1;
            this.isEgg = !!c.isEgg;
            this.spawnTime = c.spawnTime || Date.now();
            this.hunger = c.hunger || 0;
            this.facingRight = this.vx > 0;
            this.fw = s.w/s.cols; this.fh = s.h/s.rows;
            this.renderH = 55 * (s.scale || 1);
            this.renderW = this.renderH * (this.fw/this.fh);
            this.target = null; this.targetType = null; this.targetLockTimer = 0; this.isHunting = false; this.lastAttackTime = 0; this.hitFlash = 0;
            this.lastHungerTime = Date.now();
            this.holyEffect = null;
        }

        getSellPrice() {
            if (this.isSpecial) return 300 + Math.floor(this.growthValue * 2);
            const base = FISH_CONFIG[this.type] ? FISH_CONFIG[this.type].price : 10;
            let p = this.growthValue <= 100 
                ? (base * 0.5 + (base * (this.growthValue / 100))) 
                : (base * 1.5 + (this.growthValue - 100));
            return Math.floor(p * (1 + this.variant * 0.20) * (1 + (this.generation - 1) * 0.10));
        }

        update() {
            if (this.isEgg) {
                if (Date.now() - this.spawnTime > 10000) {
                    this.isEgg = false;
                    this.speech = "我出生啦！"; this.speechTimer = 60;
                }
                return;
            }

            if (this.hp <= 0) {
                if (!this.isDeadState) {
                    for(let i=0; i<40; i++) {
                        gameState.bloodParticles.push({ 
                            x: this.x, y: this.y, 
                            vx: (Math.random()-0.5)*20, 
                            vy: (Math.random()-0.5)*20, 
                            life: 2.5, size: Math.random()*8+4 
                        });
                    }
                    this.isDeadState = true; 
                    this.deathTimer = 60;
                    if (this.isSpecial) showToast(this.type + " 陨落了！");
                    gameState.deathCount = (gameState.deathCount || 0) + 1;
                    if (gameState.deathCount >= 50 && gameState.events.every((e: any) => e.name !== '地狱狂潮')) {
                        triggerEvent('地狱狂潮');
                    }
                }
                if (this.deathTimer % 5 === 0) createBlood(this.x, this.y);
                this.opacity = this.deathTimer / 60; 
                this.deathTimer--;
                this.y -= 0.8;
                this.hitFlash = 1.0; 
                if (this.deathTimer <= 0) {
                    gameState.fishes = gameState.fishes.filter((f: any) => f !== this);
                    if (gameState.selectedItem && gameState.selectedItem.obj === this) closeAll();
                }
                return; 
            }

            // 变异等级属性加成
            if (this.variant === 2) { this.maxHP = 110; this.atk = 11; }
            if (this.variant === 3) { this.maxHP = 120; }
            if (this.variant === 4) { this.atk = 12; }
            if (this.variant === 5) { this.maxHP = 115; this.atk = 11.5; }
            if (this.variant === 6) { this.atk = 12.5; }

            // 饥饿与成长
            const nowTime = Date.now();
            if (nowTime - this.lastHungerTime > 15000) {
                this.hunger = Math.max(0, this.hunger - 1);
                this.lastHungerTime = nowTime;
                if (this.hunger <= 0) {
                    this.hp -= 2;
                    if (this.hp <= 0) {
                        gameState.fishes = gameState.fishes.filter((f: any) => f !== this);
                        return;
                    }
                }
            }

            // 随机对话逻辑
            const activeSpeakers = gameState.fishes.filter((f: any) => f.speechTimer > 0).length;
            const maxSpeakers = Math.max(2, Math.floor(gameState.fishes.length / 5)); // 每5条鱼最多1个说话，至少2个

            if (nowTime - this.lastSpeechTime > 15000 + Math.random() * 20000) {
                let canSpeak = activeSpeakers < maxSpeakers;
                let speakChance = 0.3;
                
                if (this.type === '毛毛虫') {
                    // 毛毛虫说话频率更高
                    if (nowTime - this.lastSpeechTime > 15000) {
                        canSpeak = true;
                        speakChance = 1.0;
                    }
                }

                if (canSpeak && Math.random() < speakChance) {
                    if (this.type === '毛毛虫') {
                        this.speech = MAO_QUOTES[Math.floor(Math.random() * MAO_QUOTES.length)];
                        this.speechTimer = 180;
                        this.lastSpeechTime = nowTime;
                    } else {
                        // 降低“美味”出现频率
                        let quote = FISH_QUOTES[Math.floor(Math.random() * FISH_QUOTES.length)];
                        if (quote === "美味！" && Math.random() > 0.2) {
                            quote = FISH_QUOTES.find(q => q !== "美味！") || "水质真棒！";
                        }
                        // 牧师不再喊治疗术，改为视觉特效
                        if (quote !== "治疗术！") {
                            this.speech = quote;
                            this.speechTimer = 180;
                            this.lastSpeechTime = nowTime;
                        }
                    }
                }
            }

            // --- 目标选择逻辑 ---
            if (this.targetLockTimer > 0) this.targetLockTimer--;

            if (this.isHiding && this.shelterId) {
                const shelter = gameState.decos.find((d: any) => d.id === this.shelterId);
                if (shelter && shelter.hp > 0 && gameState.events.length > 0) {
                    this.x = shelter.x + (Math.random() - 0.5) * 5;
                    this.y = shelter.y - 10;
                    this.vx *= 0.9; this.vy *= 0.9; // 缓慢停下
                    if (this.speechTimer <= 0) {
                        this.speech = "我好害怕啊...";
                        this.speechTimer = 60;
                    }
                    return;
                } else {
                    this.isHiding = false;
                    this.shelterId = null;
                }
            }

            // 寻找新目标 (如果当前目标无效或锁定结束)
            if (!this.target || this.targetLockTimer <= 0 || (this.target.hp !== undefined && this.target.hp <= 0) || (this.target.eaten)) {
                this.target = null;
                this.targetType = null;

                // 1. 优先攻击入侵者
                const invaders = [...gameState.parasites, ...gameState.zombies].filter(e => e.hp > 0);
                const invader = invaders.find((e: any) => Math.hypot(e.x - this.x, e.y - this.y) < 300);
                if (invader) {
                    this.target = invader;
                    this.targetType = 'invader';
                    this.targetLockTimer = 60;
                } 
                // 2. 饥饿时寻找食物
                else if (this.hunger < 8) {
                    // 优先虫子 (更美味)
                    const worm = gameState.worms.find((w: any) => w.hp > 0 && Math.hypot(w.x - this.x, w.y - this.y) < 500);
                    if (worm && (this.hunger < 4 || Math.random() < 0.2)) {
                        this.target = worm;
                        this.targetType = 'worm';
                        this.targetLockTimer = 100;
                    } else {
                        // 寻找鱼粮
                        const food = gameState.foodParticles.find((f: any) => !f.eaten && Math.hypot(f.x - this.x, f.y - this.y) < 400);
                        if (food) {
                            this.target = food;
                            this.targetType = 'food';
                            this.targetLockTimer = 150;
                        }
                    }
                }
                // 3. 特殊鱼猎食
                else if (this.isSpecial && this.hunger < 6) {
                    const prey = gameState.fishes.find((p: any) => !p.isEgg && !p.isSpecial && p.variant === 0 && Math.hypot(p.x - this.x, p.y - this.y) < 600);
                    if (prey) {
                        this.target = prey;
                        this.targetType = 'prey';
                        this.targetLockTimer = 200;
                    }
                }
            }

            // --- 力计算 (Steering Behaviors) ---
            let ax = 0, ay = 0;

            // 1. 目标引力与捕食逻辑优化
            if (this.target) {
                const dx = this.target.x - this.x;
                const dy = this.target.y - this.y;
                const dist = Math.hypot(dx, dy);
                const angle = Math.atan2(dy, dx);
                
                let strength = 0.08;
                if (this.targetType === 'invader') strength = 0.2;
                if (this.targetType === 'prey') strength = 0.15;
                
                // 抢食竞争：如果周围有其他鱼也在靠近同一个目标，大幅加速
                const competitors = gameState.fishes.filter((f: any) => f !== this && f.target === this.target && Math.hypot(f.x - this.x, f.y - this.y) < 150).length;
                if (competitors > 0) strength *= (1 + competitors * 0.5);

                // 冲刺逻辑：快到目标时猛冲
                if (dist < 80) strength *= 2.5;

                ax += Math.cos(angle) * strength;
                ay += Math.sin(angle) * strength;

                // 到达目标逻辑
                if (dist < 25) {
                    if (this.targetType === 'food') {
                        this.target.eaten = true;
                        this.hunger = Math.min(10, this.hunger + 2);
                        this.addXP(10);
                        this.target = null;
                        this.vx *= 0.5; this.vy *= 0.5; // 吃完减速
                    } else if (this.targetType === 'worm') {
                        this.target.hp = 0;
                        this.hunger = Math.min(10, this.hunger + 4);
                        this.addXP(30);
                        this.speech = "美味！"; this.speechTimer = 40;
                        this.target = null;
                        this.vx *= 0.3; this.vy *= 0.3;
                    } else if (this.targetType === 'invader' || this.targetType === 'prey') {
                        if (Date.now() - this.lastAttackTime > 800) {
                            this.attack(this.target);
                            this.lastAttackTime = Date.now();
                            // 攻击后的小反弹
                            this.vx -= Math.cos(angle) * 2;
                            this.vy -= Math.sin(angle) * 2;
                        }
                    }
                }
            } else {
                // 更加自然的闲逛逻辑 (Wander Behavior)
                this.wanderAngle += (Math.random() - 0.5) * 0.3;
                ax += Math.cos(this.wanderAngle) * 0.05;
                ay += Math.sin(this.wanderAngle) * 0.05;
            }

            // 2. 分离力 (Avoid Clumping) - 优化：力的大小与距离平方成反比，更灵敏
            gameState.fishes.forEach((other: any) => {
                if (other === this) return;
                const dx = this.x - other.x;
                const dy = this.y - other.y;
                const distSq = dx * dx + dy * dy;
                const radius = 80;
                if (distSq < radius * radius && distSq > 0) {
                    const dist = Math.sqrt(distSq);
                    const force = (radius - dist) / radius;
                    const angle = Math.atan2(dy, dx);
                    ax += Math.cos(angle) * force * 0.25;
                    ay += Math.sin(angle) * force * 0.25;
                }
            });

            // 3. 边界斥力 - 优化：更平滑的转向
            const margin = 150;
            if (this.x < margin) ax += (margin - this.x) / margin * 0.2;
            if (this.x > WORLD_W - margin) ax -= (this.x - (WORLD_W - margin)) / margin * 0.2;
            if (this.y < margin) ay += (margin - this.y) / margin * 0.2;
            if (this.y > WORLD_H - margin) ay -= (this.y - (WORLD_H - margin)) / margin * 0.2;

            // --- 物理更新 ---
            const s = SPECIAL_FISH[this.type] || FISH_CONFIG[this.type];
            const maxSpeed = this.isBerserk ? 4 : (this.target ? 3 : 1.5);
            
            this.vx += ax;
            this.vy += ay;

            // 限制速度
            const speed = Math.hypot(this.vx, this.vy);
            if (speed > maxSpeed) {
                this.vx = (this.vx / speed) * maxSpeed;
                this.vy = (this.vy / speed) * maxSpeed;
            }

            // 摩擦力
            this.vx *= 0.97;
            this.vy *= 0.97;

            // 爬行模式特殊处理
            if (s.moveMode === 'crawl') {
                if (this.crawlWait > 0) {
                    this.crawlWait--;
                    this.vx *= 0.5; this.vy *= 0.5;
                } else {
                    const distToTarget = Math.hypot(this.x - this.crawlTargetX, this.y - this.crawlTargetY);
                    if (distToTarget < 10 || (this.crawlTargetX === 0)) {
                        if (this.type === '海星') {
                            // 海星在整个鱼缸爬动 (模拟玻璃)
                            this.crawlTargetX = Math.max(50, Math.min(WORLD_W - 50, this.x + (Math.random() - 0.5) * 600));
                            this.crawlTargetY = Math.max(50, Math.min(WORLD_H - 50, this.y + (Math.random() - 0.5) * 600));
                        } else {
                            // 其他爬行生物在底部活动范围扩大 2.5 倍
                            this.crawlTargetX = Math.max(50, Math.min(WORLD_W - 50, this.x + (Math.random() - 0.5) * 1000));
                            this.crawlTargetY = Math.max(WORLD_H - 200, Math.min(WORLD_H - 30, this.y + (Math.random() - 0.5) * 150));
                        }
                        this.crawlWait = 60 + Math.random() * 120;
                    } else {
                        const angle = Math.atan2(this.crawlTargetY - this.y, this.crawlTargetX - this.x);
                        const crawlSpeed = s.speed || 0.3;
                        this.vx = Math.cos(angle) * crawlSpeed;
                        this.vy = Math.sin(angle) * crawlSpeed;
                    }
                }
            }

            this.x += this.vx;
            this.y += this.vy;

            // 强制边界限制
            this.x = Math.max(30, Math.min(WORLD_W - 30, this.x));
            this.y = Math.max(30, Math.min(WORLD_H - 30, this.y));

            if (Math.abs(this.vx) > 0.1) this.facingRight = this.vx > 0;
            if (this.hitFlash > 0) this.hitFlash -= 0.05;

            // 词缀与特殊逻辑
            this.handleAffixes();
            if (FISH_CONFIG[this.type]?.scavenger && gameState.waste > 0) {
                gameState.waste = Math.max(0, gameState.waste - 0.5);
                if (Math.random() < 0.01) this.addXP(1);
            }

            // 寻找庇护所逻辑 (仅在有危险事件时)
            if (!this.isHiding && gameState.events.some((e: any) => ['寄生虫入侵', '潜水导弹轰炸', '钓鱼事件', '僵尸鱼入侵', '地狱狂潮'].includes(e.name))) {
                const shelters = gameState.decos.filter((d: any) => d.isShelter && d.hp > 0);
                for (let sl of shelters) {
                    const hidingCount = gameState.fishes.filter((f: any) => f.shelterId === sl.id).length;
                    const capacity = 1 + sl.level; 
                    if (hidingCount < capacity && Math.hypot(this.x - sl.x, this.y - sl.y) < 200) {
                        this.isHiding = true;
                        this.shelterId = sl.id;
                        break;
                    }
                }
            }
        }

        addXP(val: number) {
            this.xp += val;
            const nextLevelXP = this.level * 50;
            if (this.xp >= nextLevelXP) {
                this.xp -= nextLevelXP;
                this.level++;
                this.atk += 1; // 升级固定增加1点攻击
                showToast(`${this.type} 升级至 Lv.${this.level}！`);
                
                if (this.level % 3 === 0 && this.affixes.length < 5) {
                    const pool = ['烈焰', '幽冥', '雷霆', '森罗', '寒冰', '狂暴', '潜行', '神圣', '战士', '牧师', '工程师', '忍者'];
                    
                    const newAffix = pool[Math.floor(Math.random() * pool.length)];
                    if (!this.affixes.includes(newAffix)) {
                        this.affixes.push(newAffix);
                        showToast(`${this.type} 获得了词缀：${newAffix}！`);
                        if (newAffix === '战士') this.atk += 5;
                        if (newAffix === '狂暴') this.atk += 10;
                    }
                }
            }
            this.growthValue += val * 0.5;
            if (this.growthValue >= this.maxGrowth) {
                this.growthValue = this.maxGrowth;
            }
        }

        handleAffixes() {
            const now = Date.now();
            // 变异4级：远程攻击
            if (this.variant === 4 && now - this.lastBulletTime > 2000) {
                const invaders = [...(gameState.parasites || []), ...(gameState.zombies || []), ...(gameState.devilFishes || [])];
                const enemy = invaders.find((e: any) => Math.hypot(e.x - this.x, e.y - this.y) < 600);
                if (enemy) {
                    gameState.bullets.push({ x: this.x, y: this.y, target: enemy, speed: 10, damage: this.atk * 0.5, owner: this, color: 'gold' });
                    this.lastBulletTime = now;
                }
            }
            // 变异5级：小型黑洞
            if (this.variant === 5 && now - this.lastBlackHoleTime > 15000) {
                const invaders = [...(gameState.parasites || []), ...(gameState.zombies || []), ...(gameState.devilFishes || [])];
                const enemy = invaders.find((e: any) => Math.hypot(e.x - this.x, e.y - this.y) < 400);
                if (enemy) {
                    gameState.miniBlackHoles.push({ x: enemy.x, y: enemy.y, life: 600, radius: 50, owner: this });
                    this.lastBlackHoleTime = now;
                }
            }
            // 变异6级：旋转法球伤害 (已在draw中实现逻辑)
            
            // 牧师：治疗
            if (this.affixes.includes('牧师') && now - this.lastHealTime > 5000) {
                const injured = gameState.fishes.find((f: any) => f !== this && f.hp < f.maxHP && Math.hypot(f.x - this.x, f.y - this.y) < 300);
                if (injured) {
                    injured.hp = Math.min(injured.maxHP, injured.hp + 10);
                    this.speech = "治疗术！"; this.speechTimer = 60;
                    this.lastHealTime = now;
                }
            }
            // 工程师：修理
            if (this.affixes.includes('工程师') && now - this.lastRepairTime > 5000) {
                const broken = gameState.decos.find((d: any) => d.hp < d.maxHP && Math.hypot(d.x - this.x, d.y - this.y) < 300);
                if (broken) {
                    broken.hp = Math.min(broken.maxHP, broken.hp + 5);
                    this.speech = "修理中..."; this.speechTimer = 60;
                    this.lastRepairTime = now;
                }
            }
            // 法师：火球
            if (this.affixes.includes('法师') && now - this.lastFireballTime > 4000) {
                const enemy = [...gameState.parasites, ...gameState.zombies].find((e: any) => Math.hypot(e.x - this.x, e.y - this.y) < 500);
                if (enemy) {
                    gameState.fireballs.push({ x: this.x, y: this.y, target: enemy, speed: 8 });
                    this.lastFireballTime = now;
                }
            }
            // 萨满：闪电
            if (this.affixes.includes('萨满') && now - this.lastLightningTime > 6000) {
                const enemies = [...gameState.parasites, ...gameState.zombies].filter((e: any) => Math.hypot(e.x - this.x, e.y - this.y) < 400);
                if (enemies.length > 0) {
                    gameState.lightningChains.push({ x: this.x, y: this.y, targets: enemies.slice(0, 3) });
                    enemies.slice(0, 3).forEach((e: any) => e.hp -= 10);
                    this.lastLightningTime = now;
                }
            }
            // 狂战士：偶尔发疯
            if (this.affixes.includes('狂战士') && now - this.lastBerserkTime > 30000) { // 降低频率
                if (Math.random() < 0.05) { // 降低概率
                    this.isBerserk = true;
                    this.lastBerserkTime = now;
                    // 偶尔攻击队友一下
                    const teammate = gameState.fishes.find((f: any) => f !== this && Math.hypot(f.x - this.x, f.y - this.y) < 100);
                    if (teammate) {
                        this.attack(teammate);
                        this.speech = "杀！！！"; this.speechTimer = 60;
                    }
                    setTimeout(() => this.isBerserk = false, 2000); // 缩短持续时间
                }
            }
        }

        attack(target: any) {
            let damage = this.atk;
            
            // 潜行：背刺或破隐一击
            if (this.affixes.includes('潜行')) {
                if (Math.random() < 0.4) {
                    damage *= 2.5;
                    showToast("破隐一击！");
                }
            }
            
            // 变异1级：护盾减伤
            if (target instanceof Fish && target.variant === 1) {
                damage *= 0.8;
            }

            // 属性伤害逻辑与视觉特效
            if (this.affixes.includes('烈焰')) { 
                damage += 5; 
                createBlood(target.x, target.y, '#FF4500');
                // 溅射火花
                for(let i=0; i<3; i++) {
                    gameState.fireballs.push({ 
                        x: target.x, y: target.y, 
                        target: {x: target.x + (Math.random()-0.5)*200, y: target.y + (Math.random()-0.5)*200}, 
                        speed: 3, damage: 3 
                    });
                }
            }
            if (this.affixes.includes('幽冥')) { 
                if(Math.random() < 0.25) damage *= 2.2; 
                createBlood(target.x, target.y, '#4B0082');
                gameState.miniBlackHoles.push({ x: target.x, y: target.y, radius: 50, life: 40 });
            }
            if (this.affixes.includes('雷霆')) { 
                if(Math.random() < 0.35) {
                    damage += 10;
                    gameState.lightningChains.push({ x: this.x, y: this.y, targets: [target] });
                    // 连锁闪电：增加范围和目标数
                    const nearby = [...gameState.parasites, ...gameState.zombies, ...gameState.fishes].filter(e => e !== target && e !== this && Math.hypot(e.x - target.x, e.y - target.y) < 200);
                    if (nearby.length > 0) {
                        const chainTargets = nearby.sort(() => Math.random() - 0.5).slice(0, 3);
                        gameState.lightningChains.push({ x: target.x, y: target.y, targets: chainTargets });
                        chainTargets.forEach(ct => ct.hp -= damage * 0.5);
                    }
                }
            }
            if (this.affixes.includes('森罗')) { 
                const heal = 3 + (this.level * 0.5);
                this.hp = Math.min(this.maxHP, this.hp + heal); 
                createBlood(this.x, this.y, '#32CD32');
                gameState.bubbles.push({ x: this.x, y: this.y, vx: (Math.random()-0.5)*2, vy: -3, size: 10, life: 40 });
            }
            if (this.affixes.includes('寒冰')) {
                damage += 3;
                createBlood(target.x, target.y, '#ADD8E6');
                if (Math.random() < 0.3) {
                    target.vx *= 0.2; target.vy *= 0.2; // 减速
                    showToast("目标被冻结！");
                }
            }
            if (this.affixes.includes('神圣')) {
                if (target.isHell || target.type === '僵尸鱼') damage *= 2;
                damage += 5;
                createBlood(target.x, target.y, '#FFD700');
                // 治疗周围友军
                gameState.fishes.forEach(f => {
                    if (f !== this && Math.hypot(f.x - this.x, f.y - this.y) < 200) {
                        f.hp = Math.min(f.maxHP, f.hp + 5);
                    }
                });
            }
            if (this.affixes.includes('狂暴')) { 
                damage *= 1.6; 
                this.hp -= 2; 
                this.hitFlash = 0.6;
            }

            // 忍者：影分身螺旋丸
            if (this.affixes.includes('忍者') && !this.ninjaState.active) {
                this.ninjaState.active = true;
                this.ninjaState.timer = 120;
                this.ninjaState.cloneX = this.x + (this.facingRight ? -50 : 50);
                this.ninjaState.cloneY = this.y;
                this.ninjaState.rasenganActive = true;
                this.ninjaState.rasenganSize = 0;
                this.speech = "影分身之术！"; this.speechTimer = 60;
                // 烟雾特效
                for(let i=0; i<10; i++) {
                    gameState.bubbles.push({ x: this.ninjaState.cloneX, y: this.ninjaState.cloneY, vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4, size: 15, life: 30, color: 'rgba(200,200,200,0.5)' });
                }
            }
            
            if (this.ninjaState.active && this.ninjaState.timer > 0) {
                // 忍者冲刺
                this.vx *= 1.5; this.vy *= 1.5;
            }

            target.hp -= damage;
            createBlood(target.x, target.y);
            if (target.hp <= 0) {
                this.addXP(25);
                if (this.affixes.includes('幸运')) gameState.coins += 5;
                if (target.isHell) gameState.hellTideProgress = Math.max(0, gameState.hellTideProgress - 2);
                gameState.hellTideProgress = Math.min(100, (gameState.hellTideProgress || 0) + 1.5);
            }
        }

        breed() {
            const now = Date.now();
            const cooldown = 60000; // 降低全局冷却至 1 分钟
            if (now - gameState.lastManualBreedTime < cooldown) {
                const secondsLeft = Math.ceil((cooldown - (now - gameState.lastManualBreedTime)) / 1000);
                return { can: false, msg: `繁殖中心冷却中，还需 ${secondsLeft} 秒` };
            }
            const currentGrowthPercent = this.growthValue / this.maxGrowth;
            if (currentGrowthPercent < 0.5) return { can: false, msg: "成长值未达 50%" };
            if (this.hasBred) return { can: false, msg: "该鱼已繁殖过" };
            if (gameState.fishes.length >= gameState.maxFishes) return { can: false, msg: "鱼缸已满" };
            const cost = Math.floor(this.getSellPrice() * 0.6);
            if (gameState.coins < cost) return { can: false, msg: `金币不足 (需${cost}金)` };
            gameState.coins -= cost;
            this.hasBred = true; 
            gameState.lastManualBreedTime = now;
            let chance = 0.15 - (this.variant * 0.030); 
            let newV = Math.random() < chance ? Math.min(5, this.variant + 1) : this.variant;
            gameState.fishes.push(new Fish({
                type: this.type, x: this.x + 20, y: this.y + 20, isEgg: true,
                variant: newV, generation: this.generation + 1, spawnTime: Date.now()
            }));
            this.breedingHeartTimer = 120; // 弹出大爱心
            saveGame();
            return { can: true, msg: "产卵成功！" };
        }

        draw() {
            ctx.save();
            if (this.isEgg) {
                ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
                ctx.beginPath(); ctx.arc(this.x - gameState.cameraX, this.y - gameState.cameraY, 15, 0, Math.PI*2);
                ctx.shadowBlur = 10; ctx.shadowColor = "white"; ctx.fill();
            } else {
                ctx.translate(this.x - gameState.cameraX, this.y - gameState.cameraY);
                
                // 变异1级：蓝色护盾
                if (this.variant === 1) {
                    ctx.strokeStyle = "rgba(0, 191, 255, 0.5)";
                    ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI*2); ctx.stroke();
                }
                // 变异3级：两个白点环绕
                if (this.variant === 3) {
                    const time = Date.now() * 0.005;
                    ctx.fillStyle = "white";
                    ctx.beginPath(); ctx.arc(Math.cos(time)*45, Math.sin(time)*45, 4, 0, Math.PI*2); ctx.fill();
                    ctx.beginPath(); ctx.arc(Math.cos(time+Math.PI)*45, Math.sin(time+Math.PI)*45, 4, 0, Math.PI*2); ctx.fill();
                }
                // 变异6级：三色球环绕
                if (this.variant === 6) {
                    const time = Date.now() * 0.004;
                    const colors = ["red", "cyan", "yellow"];
                    for(let i=0; i<3; i++) {
                        ctx.fillStyle = colors[i];
                        const angle = time + (i * Math.PI * 2 / 3);
                        ctx.beginPath(); ctx.arc(Math.cos(angle)*55, Math.sin(angle)*55, 6, 0, Math.PI*2); ctx.fill();
                        // 伤害敌人
                        [...(gameState.parasites || []), ...(gameState.zombies || []), ...(gameState.devilFishes || [])].forEach((e: any) => {
                            if (Math.hypot(this.x + Math.cos(angle)*55 - e.x, this.y + Math.sin(angle)*55 - e.y) < 30) {
                                e.hp -= 0.5;
                            }
                        });
                    }
                }

                // 绘制爱心
                if (this.breedingHeartTimer > 0) {
                    ctx.save();
                    ctx.font = "40px Arial";
                    ctx.textAlign = "center";
                    ctx.fillStyle = "pink";
                    ctx.shadowColor = "red";
                    ctx.shadowBlur = 10;
                    ctx.fillText("❤️", 0, -50 - (120 - this.breedingHeartTimer));
                    ctx.restore();
                    this.breedingHeartTimer--;
                }

                // 绘制对话
                if (this.speechTimer > 0) {
                    ctx.save();
                    ctx.font = "14px Arial";
                    ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
                    ctx.textAlign = "center";
                    
                    // 自动换行逻辑
                    const maxWidth = 150;
                    const words = this.speech.split('');
                    let line = '';
                    let lines = [];
                    for(let n = 0; n < words.length; n++) {
                        let testLine = line + words[n];
                        let metrics = ctx.measureText(testLine);
                        if (metrics.width > maxWidth && n > 0) {
                            lines.push(line);
                            line = words[n];
                        } else {
                            line = testLine;
                        }
                    }
                    lines.push(line);
                    
                    const lineHeight = 18;
                    const totalHeight = lines.length * lineHeight;
                    
                    // 不再绘制气泡背景，直接在鱼头顶显示文字
                    ctx.fillStyle = "white";
                    ctx.shadowColor = "black";
                    ctx.shadowBlur = 4;
                    lines.forEach((l, i) => {
                        ctx.fillText(l, 0, -this.renderH/2 - totalHeight - 10 + (i * lineHeight));
                    });
                    ctx.restore();
                }

                // 绘制词缀图标 (仅职业词缀，且只显示第一个)
                const jobAffixes = ['战士', '牧师', '工程师', '忍者', '萨满', '狂战士'];
                const firstJobAffix = this.affixes.find(a => jobAffixes.includes(a));
                
                if (firstJobAffix) {
                    ctx.save();
                    ctx.globalAlpha = 0.15; // 稍微再透明一点
                    ctx.font = "8px Arial"; 
                    ctx.fillStyle = "white";
                    ctx.textAlign = "center";
                    let icon = "❓";
                    if (firstJobAffix === '战士') icon = "⚔️";
                    else if (firstJobAffix === '牧师') icon = "✨";
                    else if (firstJobAffix === '工程师') icon = "🛠️";
                    else if (firstJobAffix === '忍者') icon = "🥷";
                    else if (firstJobAffix === '萨满') icon = "⚡";
                    else if (firstJobAffix === '狂战士') icon = "🔥";
                    ctx.fillText(icon, 0, -this.renderH/2 - 8);
                    ctx.restore();
                }

                // 常驻特效逻辑
                if (this.affixes.includes('幽冥')) {
                    // 幽冥：黑紫色十字星闪烁
                    if (Math.random() < 0.05) {
                        const angle = Math.random() * Math.PI * 2;
                        const dist = Math.random() * 30 + 20;
                        const px = Math.cos(angle) * dist;
                        const py = Math.sin(angle) * dist;
                        ctx.save();
                        ctx.translate(px, py);
                        ctx.strokeStyle = "#4b0082";
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(-4, 0); ctx.lineTo(4, 0);
                        ctx.moveTo(0, -4); ctx.lineTo(0, 4);
                        ctx.stroke();
                        ctx.restore();
                    }
                }
                if (this.affixes.includes('神圣')) {
                    // 神圣：金色倒三角扩散
                    if (Math.random() < 0.02 && !this.holyEffect) {
                        this.holyEffect = { size: 10, alpha: 0.6 };
                    }
                    if (this.holyEffect) {
                        ctx.save();
                        ctx.globalAlpha = this.holyEffect.alpha;
                        ctx.strokeStyle = "#FFD700";
                        ctx.lineWidth = 1.5;
                        ctx.beginPath();
                        const s = this.holyEffect.size;
                        // 倒三角
                        ctx.moveTo(-s, -s);
                        ctx.lineTo(s, -s);
                        ctx.lineTo(0, s);
                        ctx.closePath();
                        ctx.stroke();
                        this.holyEffect.size += 0.8; // 扩散速度减慢
                        this.holyEffect.alpha -= 0.01; // 消失速度减慢
                        if (this.holyEffect.alpha <= 0) this.holyEffect = null;
                        ctx.restore();
                    }
                }
                if (this.affixes.includes('光明')) {
                    // 光明：背景淡出十字星 (不跟随缩放)
                    const alpha = (Math.sin(Date.now() / 500) + 1) / 4; // 0 ~ 0.5
                    ctx.save();
                    ctx.setTransform(1, 0, 0, 1, this.x - gameState.cameraX, this.y - gameState.cameraY);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(-15, 0); ctx.lineTo(15, 0);
                    ctx.moveTo(0, -15); ctx.lineTo(0, 15);
                    ctx.stroke();
                    ctx.restore();
                }
                if (this.affixes.includes('毒药')) {
                    // 毒药：绿色小菱形
                    const t = Date.now() / 300;
                    ctx.save();
                    ctx.fillStyle = "rgba(0, 255, 0, 0.6)";
                    for(let i=0; i<3; i++) {
                        const ox = Math.cos(t + i * 2) * 25;
                        const oy = Math.sin(t + i * 2) * 25;
                        ctx.beginPath();
                        ctx.moveTo(ox, oy - 4);
                        ctx.lineTo(ox + 3, oy);
                        ctx.lineTo(ox, oy + 4);
                        ctx.lineTo(ox - 3, oy);
                        ctx.closePath();
                        ctx.fill();
                    }
                    ctx.restore();
                }
                if (this.affixes.includes('森罗')) {
                    // 森罗：绿色小叶子
                    if (Math.random() < 0.03) {
                        const angle = Math.random() * Math.PI * 2;
                        const dist = Math.random() * 40;
                        ctx.save();
                        ctx.translate(Math.cos(angle) * dist, Math.sin(angle) * dist);
                        ctx.fillStyle = "#2ecc71";
                        ctx.beginPath();
                        ctx.ellipse(0, 0, 4, 2, Math.random() * Math.PI, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();
                    }
                }
                if (this.affixes.includes('狂暴')) {
                    // 狂暴：红色光环
                    ctx.save();
                    ctx.strokeStyle = "rgba(231, 76, 60, 0.4)";
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.arc(0, 0, 35 + Math.sin(Date.now() / 100) * 5, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }
                if (this.affixes.includes('幸运')) {
                    // 幸运：金色闪光
                    if (Math.random() < 0.1) {
                        ctx.save();
                        ctx.fillStyle = "#f1c40f";
                        ctx.beginPath();
                        ctx.arc((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 60, 1.5, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();
                    }
                }
                if (this.affixes.includes('不幸')) {
                    // 不幸：黑色烟雾
                    if (Math.random() < 0.1) {
                        ctx.save();
                        ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
                        ctx.beginPath();
                        ctx.arc((Math.random() - 0.5) * 50, (Math.random() - 0.5) * 50, 3, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.restore();
                    }
                }

                // 忍者特效逻辑
                if (this.ninjaState.active) {
                    this.ninjaState.timer--;
                    if (this.ninjaState.timer <= 0) {
                        this.ninjaState.active = false;
                        this.ninjaState.rasenganActive = false;
                        // 消失烟雾
                        for(let i=0; i<10; i++) {
                            gameState.bubbles.push({ x: this.ninjaState.cloneX, y: this.ninjaState.cloneY, vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4, size: 15, life: 30, color: 'rgba(200,200,200,0.5)' });
                        }
                    } else {
                        // 绘制影分身
                        ctx.save();
                        ctx.globalAlpha = 0.5;
                        ctx.translate(this.ninjaState.cloneX - this.x, this.ninjaState.cloneY - this.y);
                        // 绘制分身 (简化版)
                        ctx.scale(0.8, 0.8);
                        if (!this.facingRight) ctx.scale(-1, 1);
                        const s = this.isSpecial ? SPECIAL_FISH[this.type] : FISH_CONFIG[this.type];
                        const img = assets[this.type];
                        if (img && img.complete) {
                            const idx = Math.floor(Date.now() / 250) % (s.cols * s.rows);
                            ctx.drawImage(img, (idx % s.cols) * this.fw, Math.floor(idx / s.cols) * this.fh, this.fw, this.fh, -this.renderW/2, -this.renderH/2, this.renderW, this.renderH);
                        }
                        ctx.restore();

                        // 绘制螺旋丸
                        if (this.ninjaState.rasenganActive) {
                            this.ninjaState.rasenganSize = Math.min(30, this.ninjaState.rasenganSize + 1);
                            const rX = (this.x + this.ninjaState.cloneX) / 2 - this.x;
                            const rY = (this.y + this.ninjaState.cloneY) / 2 - this.y;
                            
                            ctx.save();
                            ctx.translate(rX, rY);
                            const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.ninjaState.rasenganSize);
                            grad.addColorStop(0, "white");
                            grad.addColorStop(0.3, "rgba(0, 191, 255, 0.9)");
                            grad.addColorStop(0.7, "rgba(30, 144, 255, 0.6)");
                            grad.addColorStop(1, "rgba(0, 0, 255, 0)");
                            ctx.fillStyle = grad;
                            ctx.beginPath(); ctx.arc(0, 0, this.ninjaState.rasenganSize, 0, Math.PI*2); ctx.fill();
                            
                            // 螺旋纹理 (更细致)
                            ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
                            ctx.lineWidth = 1.5;
                            const rot = Date.now() * 0.01;
                            for(let i=0; i<6; i++) {
                                ctx.beginPath();
                                const startAngle = rot + (i * Math.PI * 2 / 6);
                                for(let r=0; r<this.ninjaState.rasenganSize; r+=2) {
                                    const a = startAngle + (r * 0.2);
                                    const x = Math.cos(a) * r;
                                    const y = Math.sin(a) * r;
                                    if(r===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
                                }
                                ctx.stroke();
                            }
                            ctx.restore();

                            if (this.ninjaState.rasenganSize >= 30 && this.ninjaState.timer === 60) {
                                this.speech = "螺旋丸！"; this.speechTimer = 60;
                                // 冲向敌人逻辑简化为直接爆炸
                                if (this.target) {
                                    this.target.hp -= 50;
                                    createBlood(this.target.x, this.target.y, 'cyan');
                                }
                            }
                        }
                    }
                }

                // 变异特效
                if (this.variant === 1) {
                    // 蓝点护盾
                    ctx.save();
                    ctx.strokeStyle = "rgba(0, 191, 255, 0.6)";
                    ctx.lineWidth = 3;
                    ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI*2); ctx.stroke();
                    ctx.restore();
                } else if (this.variant === 3) {
                    // 两个白点绕转
                    const angle = Date.now() / 500;
                    ctx.fillStyle = "white";
                    ctx.beginPath(); ctx.arc(Math.cos(angle)*50, Math.sin(angle)*50, 4, 0, Math.PI*2); ctx.fill();
                    ctx.beginPath(); ctx.arc(Math.cos(angle+Math.PI)*50, Math.sin(angle+Math.PI)*50, 4, 0, Math.PI*2); ctx.fill();
                } else if (this.variant >= 6) {
                    // 三个不同颜色的发球
                    const angle = Date.now() / 400;
                    const colors = ["#ff0000", "#00ff00", "#0000ff"];
                    for(let i=0; i<3; i++) {
                        ctx.fillStyle = colors[i];
                        const a = angle + (i * Math.PI * 2 / 3);
                        ctx.beginPath(); ctx.arc(Math.cos(a)*60, Math.sin(a)*60, 6, 0, Math.PI*2); ctx.fill();
                    }
                }

                if (this.hitFlash > 0) {
                    ctx.translate((Math.random()-0.5)*12, (Math.random()-0.5)*12);
                    ctx.filter = `brightness(2) sepia(1) hue-rotate(-50deg) saturate(5)`;
                } else {
                    if (this.isBerserk) {
                        ctx.filter = 'brightness(1.5) saturate(2) hue-rotate(-30deg)';
                    } else if (this.affixes.includes('潜行')) {
                        ctx.globalAlpha = 0.4;
                    }
                    if (this.variant === 1) ctx.filter = 'hue-rotate(90deg)';
                    else if (this.variant === 2) ctx.filter = 'hue-rotate(250deg)';
                    else if (this.variant === 3) {
                        ctx.filter = 'grayscale(1.3) brightness(2.6) contrast(1.8) sepia(1.2) saturate(6) hue-rotate(-10deg)';
                        ctx.shadowColor = "#FFD700"; ctx.shadowBlur = 40; // 减小模糊半径优化性能 (原80)
                    } else if (this.variant === 4) {
                        const rawBlink = (Math.sin(Date.now() / 1000) + 1) / 2; // 减慢闪烁频率
                        const blink = Math.pow(rawBlink, 3); // 降低计算复杂度
                        const hue = (Date.now() / 30) % 360; // 减慢颜色变换
                        const br = 0.5 + blink * 1.5; 
                        const ct = 2 + blink * 3;
                        ctx.filter = `brightness(${br}) contrast(${ct}) saturate(4) hue-rotate(${hue}deg)`;
                        ctx.shadowColor = `hsl(${hue}, 100%, 50%)`; ctx.shadowBlur = 5 + blink * 30;
                    } else if (this.variant >= 5) {
                        const hue = (Date.now() / 30) % 360;
                        ctx.filter = `hue-rotate(${hue}deg) brightness(1.5) saturate(2)`;
                        ctx.shadowColor = `hsl(${hue}, 100%, 50%)`; ctx.shadowBlur = 20;
                    }
                }
                let growthPercent = this.growthValue / this.maxGrowth;
                let sizeScale = 0.6;
                if (this.affixes.includes('巨化')) sizeScale *= 1.5;
                if (this.isBerserk) sizeScale *= 1.3;
                if (growthPercent >= 0.9) sizeScale *= 1.8;
                else if (growthPercent >= 0.6) sizeScale *= 1.5;
                else if (growthPercent >= 0.3) sizeScale *= 1.0;
                ctx.scale(sizeScale, sizeScale);
                // 僵尸鱼和地狱魔鬼鱼的贴图方向可能相反，这里做特殊处理
                const isReversed = this.type === '僵尸鱼' || this.type === '地狱魔鬼鱼';
                if (isReversed) {
                    if (this.facingRight) ctx.scale(-1, 1);
                } else {
                    if (!this.facingRight) ctx.scale(-1, 1);
                }
                const s = this.isSpecial ? SPECIAL_FISH[this.type] : FISH_CONFIG[this.type];
                const img = assets[this.type];
                if (this.type === '斜纹炮弹') {
                    ctx.font = "30px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("🚀", 0, 0);
                } else if (this.type === '海星') {
                    ctx.font = "24px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("⭐", 0, 0);
                } else if (this.type === '樱花虾') {
                    ctx.font = "24px Arial";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("🦐", 0, 0);
                } else if (img && img.complete && img.naturalWidth > 0) {
                    const idx = Math.floor(Date.now() / 250) % (s.cols * s.rows);
                    ctx.drawImage(img, (idx % s.cols) * this.fw, Math.floor(idx / s.cols) * this.fh, this.fw, this.fh, -this.renderW/2, -this.renderH/2, this.renderW, this.renderH);
                } else {
                    ctx.fillStyle = this.isSpecial ? '#9b59b6' : '#FFD700';
                    ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI*2); ctx.fill();
                }

                // 萨满闪电特效
                if (this.affixes.includes('萨满')) {
                    ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(0, 0, 40, 0, Math.PI*2);
                    ctx.stroke();
                }
            }
            ctx.restore();
        }
    }

    class Deco {
        type: string; x: number; y: number; w: number; h: number; level: number; nurtureEaten: number;
        hp: number; maxHP: number; isShelter: boolean; isDefense: boolean; id: string;
        constructor(c: any) {
            this.id = c.id || Math.random().toString(36).substr(2, 9);
            this.type = c.type; this.x = c.x; this.y = c.y;
            const s = DECO_CONFIG[this.type];
            this.w = s.w; this.h = s.h;
            this.level = c.level || 1; 
            this.nurtureEaten = c.nurtureEaten || 0; 
            this.maxHP = 100 + (this.level * 50);
            this.hp = c.hp !== undefined ? c.hp : this.maxHP;
            this.isShelter = (['花岗岩', '大理石', '熔岩矿', '李老师'].includes(this.type));
            this.isDefense = (this.type === '熔岩石');
        }
        repair() {
            const basePrice = DECO_CONFIG[this.type].price;
            const hpLoss = this.maxHP - this.hp;
            // 大幅度降低修复价格：原比例的 10%
            const cost = Math.floor((hpLoss / this.maxHP) * basePrice * 0.1);
            if (gameState.coins >= cost) {
                gameState.coins -= cost;
                this.hp = this.maxHP;
                showToast(`${this.type} 已修复！`);
                saveGame();
                return true;
            } else {
                showToast(`金币不足 (需${cost}金)`);
                return false;
            }
        }
        draw() {
          const img = assets[this.type];
          if(img && img.complete && img.naturalWidth > 0) { 
            ctx.save();
            if (this.hp < this.maxHP) {
                // 绘制血条
                ctx.fillStyle = 'red';
                ctx.fillRect(this.x - gameState.cameraX - 30, this.y - gameState.cameraY - this.h - 10, 60, 5);
                ctx.fillStyle = 'green';
                ctx.fillRect(this.x - gameState.cameraX - 30, this.y - gameState.cameraY - this.h - 10, 60 * (this.hp / this.maxHP), 5);
            }
            if (this.isShelter) {
                const hidingCount = gameState.fishes.filter((f: any) => f.shelterId === this.id).length;
                let capacity = 1 + this.level;
                if (this.type === '李老师') capacity = 4 + this.level; // 起始 5 个
                ctx.fillStyle = "white";
                ctx.font = "12px Arial";
                ctx.textAlign = "center";
                ctx.fillText(`庇护: ${hidingCount}/${capacity}`, this.x - gameState.cameraX, this.y - gameState.cameraY - this.h - 20);
            }
            ctx.drawImage(img, this.x - gameState.cameraX - this.w/2, this.y - gameState.cameraY - this.h, this.w, this.h); 
            ctx.restore();
          } else {
            // 摆件图像加载失败时的占位符
            ctx.save();
            ctx.fillStyle = 'rgba(255,255,255,0.3)';
            ctx.fillRect(this.x - gameState.cameraX - 20, this.y - gameState.cameraY - 40, 40, 40);
            ctx.restore();
          }
        }
    }

    function createBlood(x: number, y: number, color?: string) {
        for(let i=0; i<10; i++) {
            gameState.bloodParticles.push({ 
                x, y, 
                vx: (Math.random()-0.5)*10, 
                vy: (Math.random()-0.5)*10, 
                life: 1.5, size: Math.random()*5+2, color 
            });
        }
    }

    function createExplosion(x: number, y: number) {
        for(let i=0; i<30; i++) {
            gameState.bloodParticles.push({ 
                x, y, 
                vx: (Math.random()-0.5)*20, 
                vy: (Math.random()-0.5)*20, 
                life: 2, size: Math.random()*10+5, color: '#FF4500' 
            });
        }
    }

    class Worm {
        x: number; y: number; vx: number; vy: number; hp: number; maxHP: number;
        targetX: number; targetY: number; wait: number = 0;
        constructor(c: any) {
            this.x = c.x; this.y = c.y;
            this.vx = c.vx || 0; this.vy = c.vy || 0;
            this.hp = c.hp !== undefined ? c.hp : 30;
            this.maxHP = c.maxHP || 30;
            this.targetX = c.targetX || c.x;
            this.targetY = c.targetY || c.y;
            this.wait = c.wait || 0;
        }
        update() {
            if (this.hp <= 0) return;
            // 检查是否被鱼攻击
            gameState.fishes.forEach((f: any) => {
                if (!f.isEgg && !f.isDeadState && Math.hypot(f.x - this.x, f.y - this.y) < 50) {
                    // 鱼会主动吃涡虫，逻辑移至 Fish.update
                }
            });
            if (this.hp <= 0) return;

            // 涡虫吃鱼粮
            let foodTarget = null;
            let minDist = 300;
            gameState.foodParticles.forEach((f: any) => {
                if (!f.eaten) {
                    let d = Math.hypot(f.x - this.x, f.y - this.y);
                    if (d < minDist) { minDist = d; foodTarget = f; }
                }
            });
            if (foodTarget) {
                const angle = Math.atan2(foodTarget.y - this.y, foodTarget.x - this.x);
                this.vx = Math.cos(angle) * 0.2; this.vy = Math.sin(angle) * 0.2;
                this.x += this.vx; this.y += this.vy;
                if (minDist < 10) foodTarget.eaten = true;
            } else if (this.wait > 0) {
                this.wait--;
                this.vx = 0; this.vy = 0;
                // 在底部上下缓慢移动
                this.y = WORLD_H - 20 + Math.sin(Date.now() / 1000) * 10;
            } else {
                const dist = Math.hypot(this.x - this.targetX, this.y - this.targetY);
                if (dist < 5) {
                    this.targetX = Math.max(100, Math.min(WORLD_W - 100, this.x + (Math.random() - 0.5) * 200));
                    this.targetY = WORLD_H - 20;
                    this.wait = Math.floor(Math.random() * 100) + 50;
                } else {
                    const angle = Math.atan2(this.targetY - this.y, this.targetX - this.x);
                    this.vx = Math.cos(angle) * 0.3;
                    this.vy = Math.sin(angle) * 0.3;
                    this.x += this.vx; 
                    this.y = WORLD_H - 20 + Math.sin(Date.now() / 1000) * 10;
                }
            }
        }
        draw() {
            ctx.save();
            ctx.fillStyle = '#8B4513';
            ctx.translate(this.x - gameState.cameraX, this.y - gameState.cameraY);
            
            // 伸缩爬行效果：通过横向缩放模拟
            const stretch = 1 + Math.sin(Date.now() / 200) * 0.3;
            ctx.scale(stretch, 0.8); // 稍微扁平一点，不那么圆
            
            ctx.beginPath();
            ctx.ellipse(0, 0, 18, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    if (!gameState.worms) gameState.worms = [];

    function showToast(msg: string) {
        const t = document.getElementById('game-toast')!;
        t.textContent = msg; t.style.display = 'block';
        setTimeout(() => t.style.display = 'none', 2000);
    }

    function triggerEvent(forcedName?: string) {
        const events = ['寄生虫入侵', '僵尸鱼入侵', '潜水导弹轰炸', '珍珠撒下', '钓鱼事件', '黑洞事件', '繁殖事件', '涡虫爆发'];
        let eventName = forcedName || events[Math.floor(Math.random() * events.length)];
        
        // 黑洞事件概率判断
        if (eventName === '黑洞事件') {
            let chance = 0.05;
            if (gameState.waterQuality === '浑浊') chance = 0.2;
            if (gameState.waterQuality === '恶劣') chance = 0.5;
            if (Math.random() > chance) eventName = '寄生虫入侵'; // 降级
        }

        const eventObj = { name: eventName, timer: 30000 };
        gameState.events.push(eventObj);
        gameState.lastEventTime = Date.now();
        
        if (eventName === '寄生虫入侵') {
            eventObj.timer = 30000;
            for(let i=0; i<25; i++) {
                gameState.parasites.push({
                    x: Math.random() * WORLD_W, y: -50,
                    vx: (Math.random()-0.5)*3, vy: Math.random()*3+2,
                    hp: 30, maxHP: 30
                });
            }
            showToast("警报：寄生虫大规模入侵！");
        } else if (eventName === '僵尸鱼入侵') {
            eventObj.timer = 45000;
            for(let i=0; i<6; i++) {
                gameState.zombies.push({
                    x: WORLD_W + 100, y: Math.random() * WORLD_H,
                    vx: -3, vy: (Math.random()-0.5)*2,
                    hp: 250, maxHP: 250, type: '僵尸鱼',
                    facingRight: false
                });
            }
            showToast("警告：僵尸鱼群正在靠近！");
        } else if (eventName === '涡虫爆发') {
            eventObj.timer = 20000;
            for(let i=0; i<20; i++) {
                gameState.worms.push(new Worm({
                    x: Math.random() * WORLD_W, y: WORLD_H + 50,
                    targetX: Math.random() * WORLD_W, targetY: WORLD_H - 20,
                    hp: 40, maxHP: 40
                }));
            }
            showToast("注意：底部发现大量涡虫！");
        } else if (eventName === '潜水导弹轰炸') {
            eventObj.timer = 15000;
            // 每 5 秒丢 2 颗鱼雷，持续 15 秒
            const dropTorpedoes = () => {
                for(let i=0; i<2; i++) {
                    const tx = Math.random() * WORLD_W;
                    const ty = Math.random() * WORLD_H;
                    gameState.missiles.push({
                        x: tx, y: -100,
                        targetX: tx, targetY: ty,
                        speed: 4 + Math.random() * 2,
                        isTorpedo: true
                    });
                }
            };
            dropTorpedoes(); // 立即执行一次
            const interval = setInterval(() => {
                if (!gameState.events.some((e: any) => e.name === '潜水导弹轰炸')) { 
                    clearInterval(interval); 
                    return; 
                }
                dropTorpedoes();
            }, 5000);
        } else if (eventName === '珍珠撒下') {
            eventObj.timer = 20000;
            gameState.fishes.forEach((f: any) => {
                f.hp = f.maxHP;
                f.growthValue = Math.min(f.maxGrowth, f.growthValue + 20);
            });
            const interval = setInterval(() => {
                if (!gameState.events.some((e: any) => e.name === '珍珠撒下')) { clearInterval(interval); return; }
                for(let i=0; i<3; i++) {
                    gameState.bloodParticles.push({ 
                        x: Math.random() * WORLD_W, y: -20, 
                        vx: (Math.random()-0.5)*1, 
                        vy: 0.1 + Math.random() * 0.2, // 极慢掉落
                        life: 15, size: Math.random()*8+4, isPearl: true 
                    });
                }
            }, 1000);
            showToast("珍珠降临：全员恢复并成长！");
        } else if (eventName === '钓鱼事件') {
            eventObj.timer = 600000; 
            gameState.hooks.push({
                x: Math.random() * (WORLD_W - 400) + 200,
                y: -100, // 调低一点
                targetY: 400 + Math.random() * 400,
                caughtFish: null,
                size: 1.5 // 变大一点
            });
        } else if (eventName === '黑洞事件') {
            eventObj.timer = 10000;
            gameState.blackHoles.push({
                x: WORLD_W / 2, y: WORLD_H / 2,
                radius: 0, maxRadius: 300,
                timer: 600
            });
        } else if (eventName === '繁殖事件') {
            eventObj.timer = 5000;
            if (gameState.fishes.length >= 2) {
                const f1 = gameState.fishes[Math.floor(Math.random() * gameState.fishes.length)];
                const f2 = gameState.fishes.find((f: any) => f !== f1);
                if (f1 && f2) {
                    f1.target = f2; f1.isHunting = true; // 借用追逐逻辑
                    setTimeout(() => {
                        if (gameState.fishes.includes(f1) && gameState.fishes.includes(f2)) {
                            gameState.eggs.push({ x: (f1.x + f2.x)/2, y: (f1.y + f2.y)/2, spawnTime: Date.now(), type: f1.type });
                            showToast("它们相爱了，产下了鱼卵！");
                        }
                    }, 3000);
                }
            }
        } else if (eventName === '地狱狂潮') {
            eventObj.timer = 120000; // 延长到2分钟
            gameState.hellTideProgress = 100;
            gameState.hellTideActive = true;
            gameState.deathCount = 0;
            for(let i=0; i<3; i++) {
                gameState.portals.push({
                    x: 200 + Math.random() * (WORLD_W - 400),
                    y: 200 + Math.random() * (WORLD_H - 400),
                    hp: 500, maxHP: 500, lastSpawn: 0,
                    life: 120000 // 延长寿命
                });
            }
            showToast("地狱狂潮爆发！血红传送门开启！");
        }
    }

    function loop() {
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
        if (bgImg.complete && bgImg.naturalWidth > 0) {
            ctx.drawImage(bgImg, -gameState.cameraX, -gameState.cameraY, WORLD_W, WORLD_H);
        } else {
            ctx.fillStyle = '#001a33';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        const now = Date.now();
        if (now - gameState.lastIncomeTime > 60000) { if (gameState.treasure < 500) gameState.treasure += 50; gameState.lastIncomeTime = now; }
        
        // 气泡逻辑
        if (now - gameState.lastBubbleTime > 2000) {
            gameState.bubbles.push({
                x: Math.random() * WORLD_W,
                y: WORLD_H + 50,
                vx: (Math.random() - 0.5) * 1,
                vy: -1 - Math.random() * 2,
                size: 5 + Math.random() * 10,
                life: 1000
            });
            gameState.lastBubbleTime = now;
        }
        gameState.bubbles.forEach((b: any, i: number) => {
            b.x += b.vx; b.y += b.vy; b.life--;
            if (b.y < -50 || b.life <= 0) { gameState.bubbles.splice(i, 1); return; }
            ctx.save();
            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(b.x - gameState.cameraX, b.y - gameState.cameraY, b.size, 0, Math.PI*2); ctx.stroke();
            ctx.restore();
        });

        // 子弹逻辑
        gameState.bullets.forEach((b: any, i: number) => {
            const angle = Math.atan2(b.target.y - b.y, b.target.x - b.x);
            b.x += Math.cos(angle) * b.speed; b.y += Math.sin(angle) * b.speed;
            if (Math.hypot(b.x - b.target.x, b.y - b.target.y) < 20) {
                b.target.hp -= b.damage; createBlood(b.target.x, b.target.y);
                gameState.bullets.splice(i, 1);
            } else if (b.target.hp <= 0) {
                gameState.bullets.splice(i, 1);
            }
            ctx.save();
            ctx.fillStyle = "gold";
            ctx.shadowBlur = 10; ctx.shadowColor = "yellow";
            ctx.beginPath(); ctx.arc(b.x - gameState.cameraX, b.y - gameState.cameraY, 5, 0, Math.PI*2); ctx.fill();
            ctx.restore();
        });

        // 小型黑洞逻辑
        gameState.miniBlackHoles.forEach((bh: any, i: number) => {
            bh.life--;
            const enemies = [...gameState.parasites, ...gameState.zombies, ...gameState.worms];
            enemies.forEach((e: any) => {
                if (Math.hypot(e.x - bh.x, e.y - bh.y) < bh.radius) {
                    e.hp -= 0.5; // 持续伤害
                }
            });
            if (bh.life <= 0) { gameState.miniBlackHoles.splice(i, 1); return; }
            ctx.save();
            ctx.translate(bh.x - gameState.cameraX, bh.y - gameState.cameraY);
            ctx.rotate(now / 100);
            ctx.fillStyle = "black";
            ctx.beginPath(); ctx.arc(0, 0, bh.radius, 0, Math.PI*2); ctx.fill();
            ctx.strokeStyle = "purple"; ctx.lineWidth = 2; ctx.stroke();
            ctx.restore();
        });

        // 地狱狂潮进度衰减 (独立于成长周期)
        if (now - gameState.lastGrowthTime > 60000) { // 缩短周期到1分钟方便测试
           const getDecoLv = (type: string) => {
            if (gameState.nurture < 50) return 0; 
            return gameState.decos.filter((d: any) => d.type === type).reduce((sum: number, d: any) => sum + d.level, 0);
           };

            // 水质计算 (数值化)
            const pollution = (gameState.waste || 0) + gameState.foodParticles.length * 10;
            gameState.waterQualityValue = Math.max(0, 100 - pollution / 20);
            
            const factors = [];
            if (gameState.waste > 0) factors.push(`鱼屎(${Math.floor(gameState.waste)})`);
            if (gameState.foodParticles.length > 0) factors.push(`余粮(${gameState.foodParticles.length})`);
            gameState.waterFactors = factors.join(', ') || '无';

            if (gameState.waterQualityValue > 80) gameState.waterQuality = '良好';
            else if (gameState.waterQualityValue > 50) gameState.waterQuality = '普通';
            else if (gameState.waterQualityValue > 20) gameState.waterQuality = '浑浊';
            else gameState.waterQuality = '恶劣';

            // 水质自动恢复
            if (pollution === 0 && now - gameState.lastWaterRecoverTime > 5000) {
                gameState.waterQualityValue = Math.min(100, gameState.waterQualityValue + 1);
                gameState.lastWaterRecoverTime = now;
            }

           gameState.decos.forEach((d: any) => {
             const consume = 20 + (d.level - 1) * 5;
             if (gameState.nurture >= consume) {
                gameState.nurture -= consume;
                if (d.level < 5) {
                    d.nurtureEaten += consume;
                    if (d.nurtureEaten >= d.level * 200) { d.nurtureEaten -= d.level * 200; d.level++; showToast(`${d.type} 提升至 Lv.${d.level}`); }
                }
                if (d.type === '佛像' && gameState.nurture >= 50) { gameState.coins += d.level * 20; }
             }
             if (d.hp < d.maxHP) d.hp = Math.min(d.maxHP, d.hp + 1);
           });

           gameState.fishes.forEach((f: any) => {
                let hpRec = 10 + getDecoLv('海草');
                let growInc = f.isSpecial ? 5 : (FISH_CONFIG[f.type] ? FISH_CONFIG[f.type].convert : 15);
                
                if (gameState.waterQuality === '普通') { hpRec *= 0.8; growInc *= 0.9; }
                else if (gameState.waterQuality === '浑浊') { hpRec *= 0.5; growInc *= 0.7; }
                else if (gameState.waterQuality === '恶劣') { hpRec *= 0.2; growInc *= 0.4; }

                f.hp = Math.min(f.maxHP, f.hp + hpRec);
                const basePrice = (FISH_CONFIG[f.type] ? FISH_CONFIG[f.type].price : 100);
                let nurtureOut = Math.max(1, Math.floor(6 - (basePrice / 100)));
                if (f.variant >= 3) nurtureOut = Math.max(1, Math.floor(nurtureOut * 0.3));
                gameState.nurture = (gameState.nurture || 0) + nurtureOut;
                if (f.isSpecial) {
                    nurtureOut = Math.max(1, Math.floor(nurtureOut * 0.1));
                    const sPrice = (FISH_CONFIG[f.type] ? FISH_CONFIG[f.type].price : 200);
                    const coinYield = Math.floor(sPrice * 0.05); 
                    gameState.coins += coinYield;
                }
                const famine = getDecoLv('腊肉');
                if (famine > 0) { f.hunger = Math.max(0, f.hunger - famine); f.growthValue = Math.max(0, f.growthValue - (famine * 5)); }
                if (f.growthValue < f.maxGrowth) {
                    f.hunger--; 
                    f.growthValue = Math.min(f.maxGrowth, f.growthValue + growInc + getDecoLv('李老师'));
                } else f.hunger--;
           });
           gameState.lastGrowthTime = now; saveGame();
        }

        // 地狱狂潮进度衰减
        if (gameState.hellTideActive && now - (gameState.lastHellTideDecayTime || 0) > 5000) {
            gameState.hellTideProgress = Math.max(0, (gameState.hellTideProgress || 0) - 5);
            gameState.lastHellTideDecayTime = now;
            if (gameState.hellTideProgress <= 0) {
                gameState.zombies.filter((z: any) => z.isHell).forEach((df: any) => {
                    createExplosion(df.x, df.y);
                });
                gameState.zombies = gameState.zombies.filter((z: any) => !z.isHell);
                gameState.hellTideActive = false;
                gameState.events = gameState.events.filter((e: any) => e.name !== '地狱狂潮');
                gameState.portals = [];
                showToast("地狱狂潮已平息，魔鬼鱼全部爆炸！");
            }
        }
        
        // 地狱狂潮进度条更新
        const hellTideEl = document.getElementById('helltide-bar');
        const hellTideContainer = document.getElementById('helltide-container');
        if (hellTideEl && hellTideContainer) {
            if (gameState.hellTideActive) {
                hellTideContainer.style.display = 'block';
                hellTideEl.style.width = gameState.hellTideProgress + '%';
                hellTideEl.style.backgroundColor = '#e74c3c';
            } else {
                const progress = (gameState.deathCount / 50) * 100;
                hellTideContainer.style.display = progress > 0 ? 'block' : 'none';
                hellTideEl.style.width = progress + '%';
                hellTideEl.style.backgroundColor = '#7f8c8d';
            }
        }
        gameState.events.forEach((e: any, i: number) => {
            e.timer -= 16;
            if (e.timer <= 0) {
                gameState.events.splice(i, 1);
                if (e.name === '钓鱼事件') gameState.hooks = [];
            }
        });
        gameState.eventMessage = (gameState.events || []).map((e: any) => e.name).join('\n');

        // 随机事件触发 (大幅提高频率)
        if (now - gameState.lastEventTime > 10000) {
            if (Math.random() < 0.05) triggerEvent();
            gameState.lastEventTime = now;
        }

        // 传送门逻辑
        gameState.portals.forEach((p: any, i: number) => {
            p.life -= 16;
            if (p.life <= 0) { gameState.portals.splice(i, 1); return; }
            if (now - p.lastSpawn > 5000 && gameState.zombies.filter((z: any) => z.isHell).length < 10 && gameState.hellTideProgress > 0) { // 限制魔鬼鲨鱼数量在10条内
                gameState.zombies.push({
                    x: p.x, y: p.y,
                    vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4,
                    hp: 200, maxHP: 200, type: '地狱魔鬼鱼', isHell: true
                });
                p.lastSpawn = now;
            }
            ctx.save();
            ctx.translate(p.x - gameState.cameraX, p.y - gameState.cameraY);
            ctx.rotate(now / 500);
            ctx.fillStyle = 'rgba(255, 0, 0, 0.8)'; // 实心
            ctx.beginPath(); ctx.ellipse(0, 0, 50, 80, 0, 0, Math.PI*2); ctx.fill();
            ctx.strokeStyle = 'darkred'; ctx.lineWidth = 5; ctx.stroke();
            ctx.restore();

            gameState.fishes.forEach((f: any) => {
                if (!f.isEgg && !f.isDeadState && Math.hypot(f.x - p.x, f.y - p.y) < 200) {
                    p.hp -= f.atk * 0.05;
                    if (Math.random() < 0.01) f.addXP(1);
                }
            });
            if (p.hp <= 0) { 
                gameState.portals.splice(i, 1); 
                showToast("传送门被摧毁了！"); 
            }
        });

        // 黑洞逻辑
        gameState.blackHoles.forEach((bh: any, i: number) => {
            bh.radius = Math.min(bh.maxRadius, bh.radius + 2);
            bh.timer--;
            [...gameState.fishes, ...gameState.foodParticles, ...gameState.parasites, ...gameState.zombies, ...gameState.worms].forEach((obj: any) => {
                const dist = Math.hypot(obj.x - bh.x, obj.y - bh.y);
                if (dist < bh.radius * 2) { // 吸引力范围更大
                    const angle = Math.atan2(bh.y - obj.y, bh.x - obj.x);
                    obj.x += Math.cos(angle) * 3; obj.y += Math.sin(angle) * 3;
                    if (dist < 20) {
                        if (obj instanceof Fish) {
                            if (Math.random() < 0.01) {
                                gameState.fishes = gameState.fishes.filter((f: any) => f !== obj);
                                showToast("一条鱼被黑洞吞噬了！");
                            }
                        } else { obj.eaten = true; if(obj.hp) obj.hp = 0; }
                    }
                }
            });
            if (gameState.waste > 0) gameState.waste = Math.max(0, gameState.waste - 5);
            gameState.waterQualityValue = Math.min(100, gameState.waterQualityValue + 0.5);

            ctx.save();
            ctx.translate(bh.x - gameState.cameraX, bh.y - gameState.cameraY);
            ctx.rotate(-now / 200);
            // 收缩特效
            const s = 1 + Math.sin(now / 100) * 0.1;
            ctx.scale(s, s);
            ctx.fillStyle = 'black'; ctx.beginPath(); ctx.arc(0, 0, bh.radius, 0, Math.PI*2); ctx.fill();
            ctx.strokeStyle = 'purple'; ctx.lineWidth = 10; ctx.stroke();
            ctx.restore();
            if (bh.timer <= 0) gameState.blackHoles.splice(i, 1);
        });

        // 火球与闪电
        gameState.fireballs.forEach((fb: any, i: number) => {
            const angle = Math.atan2(fb.target.y - fb.y, fb.target.x - fb.x);
            fb.x += Math.cos(angle) * fb.speed; fb.y += Math.sin(angle) * fb.speed;
            if (Math.hypot(fb.x - fb.target.x, fb.y - fb.target.y) < 20) {
                fb.target.hp -= 30; createBlood(fb.target.x, fb.target.y);
                gameState.fireballs.splice(i, 1);
            }
            ctx.fillStyle = 'orange'; ctx.beginPath(); ctx.arc(fb.x - gameState.cameraX, fb.y - gameState.cameraY, 10, 0, Math.PI*2); ctx.fill();
        });
        gameState.lightningChains.forEach((lc: any, i: number) => {
            ctx.strokeStyle = 'cyan'; ctx.lineWidth = 3; ctx.beginPath();
            ctx.moveTo(lc.x - gameState.cameraX, lc.y - gameState.cameraY);
            lc.targets.forEach((t: any) => { ctx.lineTo(t.x - gameState.cameraX, t.y - gameState.cameraY); createBlood(t.x, t.y); });
            ctx.stroke(); gameState.lightningChains.splice(i, 1);
        });

        // 鱼卵
        gameState.eggs.forEach((e: any, i: number) => {
            if (now - e.spawnTime > 60000) {
                gameState.fishes.push(new Fish({ type: e.type, x: e.x, y: e.y }));
                gameState.eggs.splice(i, 1); showToast("小鱼孵化了！");
            }
            ctx.fillStyle = 'rgba(255, 255, 200, 0.8)';
            ctx.beginPath(); ctx.arc(e.x - gameState.cameraX, e.y - gameState.cameraY, 10, 0, Math.PI*2); ctx.fill();
        });

        // 导弹逻辑
        gameState.missiles.forEach((m: any, i: number) => {
            m.y += m.speed;
            if (m.y >= m.targetY) {
                if (m.isTorpedo) {
                    // 鱼雷爆炸伤害鱼和摆件
                    gameState.fishes.forEach((f: any) => {
                        if (Math.hypot(f.x - m.x, f.y - m.y) < 150) {
                            f.hp -= 20; f.hitFlash = 1.0;
                        }
                    });
                    gameState.decos.forEach((d: any) => {
                        if (Math.hypot(d.x - m.x, d.y - m.y) < 150) {
                            d.hp -= 30; createBlood(d.x, d.y);
                        }
                    });
                    showToast("鱼雷爆炸了！");
                } else {
                    // 导弹轰炸摆件 (增加判定范围)
                    const deco = gameState.decos.find((d: any) => Math.hypot(d.x - m.x, d.y - m.y) < 80);
                    if (deco) { deco.hp -= 50; createBlood(deco.x, deco.y); showToast(`${deco.type} 遭到轰炸！`); }
                }
                gameState.missiles.splice(i, 1);
            }
            ctx.fillStyle = m.isTorpedo ? 'darkgray' : 'gray';
            // 导弹大小增加 3 倍
            const mw = 30, mh = 60;
            ctx.fillRect(m.x - gameState.cameraX - mw/2, m.y - gameState.cameraY - mh, mw, mh);
        });

        // 治疗特效逻辑
        gameState.healEffects.forEach((he: any, i: number) => {
            he.timer--;
            const alpha = he.timer / he.maxTimer;
            const yOffset = (he.maxTimer - he.timer) * 1.5;
            ctx.save();
            ctx.translate(he.x - gameState.cameraX, he.y - gameState.cameraY - yOffset);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(0, 0, 20 + (he.maxTimer - he.timer), 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();
            if (he.timer <= 0) gameState.healEffects.splice(i, 1);
        });

        // 寄生虫逻辑
        gameState.parasites.forEach((p: any, i: number) => {
            p.x += p.vx; p.y += p.vy;
            if (p.y > WORLD_H) { gameState.parasites.splice(i, 1); return; }
            let targetFish = null; let minDist = 300;
            gameState.fishes.forEach((f: any) => {
                if (!f.isEgg && !f.isDeadState && !f.isHiding && !f.affixes.includes('潜行者')) {
                    const d = Math.hypot(f.x - p.x, f.y - p.y);
                    if (d < minDist) { minDist = d; targetFish = f; }
                }
            });
            if (targetFish) {
                const angle = Math.atan2(targetFish.y - p.y, targetFish.x - p.x);
                p.vx += Math.cos(angle) * 0.1; p.vy += Math.sin(angle) * 0.1;
                if (minDist < 20) { targetFish.hp -= 0.5; targetFish.hitFlash = 0.5; p.hp -= targetFish.atk * 0.1; }
            }
            if (p.hp <= 0) { 
                gameState.parasites.splice(i, 1); 
                // 寄生虫入侵事件死亡计作总共 2 个进度 (每个 2/15)
                gameState.deathCount = (gameState.deathCount || 0) + (2 / 15);
                if (gameState.deathCount >= 50 && gameState.events.every((e: any) => e.name !== '地狱狂潮')) {
                    triggerEvent('地狱狂潮');
                }
                return; 
            }
            ctx.fillStyle = 'white'; ctx.beginPath(); ctx.ellipse(p.x - gameState.cameraX, p.y - gameState.cameraY, 6, 4, Math.atan2(p.vy, p.vx), 0, Math.PI*2); ctx.fill();
        });

        // 僵尸鱼逻辑
        gameState.zombies.forEach((z: any, i: number) => {
            z.x += z.vx; z.y += z.vy;
            if (z.x < -200 || z.x > WORLD_W + 200) { gameState.zombies.splice(i, 1); return; }
            let targetFish = null; let minDist = 500;
            gameState.fishes.forEach((f: any) => {
                if (!f.isEgg && !f.isDeadState && !f.isHiding && !f.affixes.includes('潜行者')) {
                    const d = Math.hypot(f.x - z.x, f.y - z.y);
                    if (d < minDist) { minDist = d; targetFish = f; }
                }
            });
            if (targetFish) {
                const angle = Math.atan2(targetFish.y - z.y, targetFish.x - z.x);
                z.vx = Math.cos(angle) * 2.5; z.vy = Math.sin(angle) * 2.5;
                if (minDist < 30) { 
                    // 降低魔鬼鱼伤害：从 0.5 降低到 0.1 (每帧)
                    targetFish.hp -= z.isHell ? 0.1 : 2; 
                    targetFish.hitFlash = 1.0; 
                    z.hp -= targetFish.atk; 
                    createBlood(z.x, z.y); 
                }
            }
            if (z.hp <= 0) { 
                gameState.zombies.splice(i, 1); 
                if (!z.isHell) {
                    gameState.deathCount = (gameState.deathCount || 0) + 1;
                    if (gameState.deathCount >= 50 && gameState.events.every((e: any) => e.name !== '地狱狂潮')) {
                        triggerEvent('地狱狂潮');
                    }
                }
                gameState.fishes.forEach((f: any) => { if (Math.hypot(f.x - z.x, f.y - z.y) < 200) f.addXP(10); });
                return; 
            }
            const s = z.isHell ? SPECIAL_FISH['地狱魔鬼鱼'] : SPECIAL_FISH['猎手鱼'];
            const img = assets[z.isHell ? '地狱魔鬼鱼' : '猎手鱼'];
            if (img) {
                ctx.save(); ctx.translate(z.x - gameState.cameraX, z.y - gameState.cameraY);
                if (!z.isHell) ctx.filter = 'grayscale(1) brightness(0.5)';
                else ctx.filter = 'sepia(1) hue-rotate(-50deg) saturate(5) brightness(0.8)';
                if (z.vx < 0) ctx.scale(-1, 1); // 修正游动方向 (原vx > 0)
                const fw = s.w/s.cols, fh = s.h/s.rows;
                const idx = Math.floor(now / 200) % (s.cols * s.rows);
                ctx.drawImage(img, (idx % s.cols) * fw, Math.floor(idx / s.cols) * fh, fw, fh, -fw/2, -fh/2, fw, fh);
                ctx.restore();
            }
        });

        // 鱼钩逻辑
        gameState.hooks.forEach((h: any, i: number) => {
            if (h.y < h.targetY) h.y += 2;
            else if (h.caughtFish) {
                h.y -= 1; h.caughtFish.x = h.x; h.caughtFish.y = h.y;
                if (h.y < -50) { gameState.fishes = gameState.fishes.filter((f: any) => f !== h.caughtFish); gameState.hooks.splice(i, 1); showToast("鱼被钓走了！"); return; }
            } else {
                gameState.fishes.forEach((f: any) => {
                    if (!f.isEgg && !f.isDeadState && !f.isHiding && Math.hypot(f.x - h.x, f.y - h.y) < 30) { h.caughtFish = f; showToast("鱼上钩了！快剪断鱼线！"); }
                });
            }
            ctx.strokeStyle = 'white'; ctx.beginPath(); ctx.moveTo(h.x - gameState.cameraX, -100); ctx.lineTo(h.x - gameState.cameraX, h.y - gameState.cameraY); ctx.stroke();
            ctx.fillStyle = 'silver'; ctx.beginPath(); ctx.arc(h.x - gameState.cameraX, h.y - gameState.cameraY, 15, 0, Math.PI*2); ctx.fill();
        });

        // 突变鱼主动出击
        gameState.fishes.forEach((f: any) => {
            if (f.isSpecial && !f.isEgg && !f.isDeadState) {
                let target = null; let minDist = 1000;
                [...gameState.parasites, ...gameState.zombies].forEach((invader: any) => {
                    const d = Math.hypot(f.x - invader.x, f.y - invader.y);
                    if (d < minDist) { minDist = d; target = invader; }
                });
                if (target) {
                    const angle = Math.atan2(target.y - f.y, target.x - f.x);
                    f.vx += Math.cos(angle) * 0.5; f.vy += Math.sin(angle) * 0.5;
                    if (minDist < 50) { f.attack(target); }
                }
            }
        });

        // 防御建筑逻辑
        gameState.decos.forEach((d: any) => {
            if (d.isDefense && d.hp > 0) {
                let target = null; let minDist = 800;
                [...gameState.parasites, ...gameState.zombies].forEach((invader: any) => {
                    const dDist = Math.hypot(d.x - invader.x, d.y - invader.y);
                    if (dDist < minDist) { minDist = dDist; target = invader; }
                });
                if (target && Date.now() % 1000 < 20) {
                    gameState.lavaBalls.push({ x: d.x, y: d.y - 50, targetX: target.x, targetY: target.y, vx: (target.x - d.x) / 50, vy: (target.y - (d.y - 50)) / 50, life: 60 });
                }
            }
        });

        // 熔岩球逻辑
        gameState.lavaBalls.forEach((lb: any, i: number) => {
            lb.x += lb.vx; lb.y += lb.vy; lb.life--;
            [...gameState.parasites, ...gameState.zombies].forEach((invader: any) => {
                if (Math.hypot(lb.x - invader.x, lb.y - invader.y) < 30) { invader.hp -= 20; createBlood(invader.x, invader.y); lb.life = 0; }
            });
            if (lb.life <= 0) { gameState.lavaBalls.splice(i, 1); return; }
            ctx.fillStyle = 'orange'; ctx.beginPath(); ctx.arc(lb.x - gameState.cameraX, lb.y - gameState.cameraY, 8, 0, Math.PI*2); ctx.fill();
        });

        gameState.fishes.forEach((f: any) => { f.update(); f.draw(); });
        gameState.worms.forEach((w: any, i: number) => {
            w.update();
            if (w.hp <= 0) {
                gameState.worms.splice(i, 1);
                return;
            }
            w.draw();
        });
        
        // 随机生成涡虫
        if (Math.random() < 0.005 && gameState.worms.length < 10) {
            gameState.worms.push(new Worm({ x: Math.random() * WORLD_W, y: WORLD_H - 20 }));
        }

        gameState.decos.forEach((d: any) => d.draw());
        gameState.foodParticles.forEach((p: any, i: number) => {
            if (p.eaten) { gameState.foodParticles.splice(i, 1); return; }
            p.y < WORLD_H - 30 ? p.y += 1.5 : p.y = WORLD_H - 30;
            ctx.fillStyle = "#FFEE88"; ctx.beginPath(); ctx.arc(p.x - gameState.cameraX, p.y - gameState.cameraY, 4, 0, Math.PI*2); ctx.fill();
        });
        gameState.bloodParticles.forEach((b: any, i: number) => {
            b.x += b.vx; b.y += b.vy; 
            if (b.isPearl) {
                b.vy += 0.005; // 珍珠极低重力
            } else {
                b.vy += 0.05; 
            }
            b.life -= 0.015;
            if(b.life <= 0) { gameState.bloodParticles.splice(i,1); return; }
            if (b.isPearl) {
                ctx.fillStyle = `rgba(255, 255, 255, ${b.life})`;
                ctx.shadowBlur = 5; ctx.shadowColor = "white";
            } else {
                ctx.fillStyle = b.color || `rgba(255,0,0,${b.life})`;
                ctx.shadowBlur = 0;
            }
            ctx.beginPath(); ctx.arc(b.x - gameState.cameraX, b.y - gameState.cameraY, b.size || 3, 0, Math.PI*2); ctx.fill();
        });

        document.getElementById('coins')!.textContent = Math.floor(gameState.coins).toString();
        document.getElementById('mPoints')!.textContent = Math.floor(gameState.mutantPoints).toString();
        const nurtureEl = document.getElementById('nurture');
        if (nurtureEl) nurtureEl.textContent = Math.floor(gameState.nurture || 0).toString();
        document.getElementById('capacity')!.textContent = gameState.fishes.length.toString();
        document.getElementById('maxCapacity')!.textContent = gameState.maxFishes.toString();
        document.getElementById('treasure')!.textContent = gameState.treasure.toString();
        
        // 计算水质
        const wasteFactor = Math.min(100, (gameState.nurture / 200) * 100); // 降低分母，让污染更明显
        const foodFactor = Math.min(100, (gameState.foodParticles.length / 50) * 100);
        const totalPollution = Math.min(100, (wasteFactor + foodFactor) / 2);
        gameState.waterQualityValue = 100 - totalPollution;
        
        if (gameState.waterQualityValue < 30) gameState.waterQuality = "恶劣";
        else if (gameState.waterQualityValue < 60) gameState.waterQuality = "一般";
        else if (gameState.waterQualityValue < 85) gameState.waterQuality = "良好";
        else gameState.waterQuality = "清澈";

        const waterEl = document.getElementById('water-quality');
        const waterValEl = document.getElementById('water-val');
        const waterFactorsEl = document.getElementById('water-factors');
        if (waterEl) {
            waterEl.textContent = gameState.waterQuality;
            waterEl.style.color = gameState.waterQuality === '清澈' ? '#00d2ff' : gameState.waterQuality === '良好' ? '#2ecc71' : gameState.waterQuality === '一般' ? '#f1c40f' : '#e74c3c';
        }
        if (waterValEl) waterValEl.textContent = Math.floor(gameState.waterQualityValue).toString();
        if (waterFactorsEl) {
            waterFactorsEl.textContent = `因素: 鱼屎:${Math.floor(gameState.nurture)} (${Math.floor(wasteFactor)}%) 残饵:${gameState.foodParticles.length} (${Math.floor(foodFactor)}%)`;
        }
        const eventEl = document.getElementById('event-msg');
        if (eventEl) {
            const msg = (gameState.events || []).map((e: any) => e.name).join('\n');
            eventEl.innerText = msg;
            eventEl.style.display = msg ? 'block' : 'none';
        }
        const cutHookBtn = document.getElementById('btn-cut-hook');
        if (cutHookBtn) {
            cutHookBtn.style.display = gameState.hooks.length > 0 ? 'block' : 'none';
        }

        requestAnimationFrame(loop);
    }

    (window as any).showShop = () => { document.getElementById('shopPanel')!.style.display='block'; (window as any).switchTab('fish'); };
    (window as any).switchTab = (tab: string) => {
        gameState.currentTab = tab;
        document.getElementById('tab-fish')!.className = tab === 'fish' ? 'tab-btn active' : 'tab-btn';
        document.getElementById('tab-deco')!.className = tab === 'deco' ? 'tab-btn active' : 'tab-btn';
        document.getElementById('tab-upgrade')!.className = tab === 'upgrade' ? 'tab-btn active' : 'tab-btn';
        renderShop();
    };

    function renderShop() {
        const grid = document.getElementById('shopGrid')!; grid.innerHTML = '';
        if (gameState.currentTab === 'upgrade') {
            const upgrades = [
                { name: '鱼缸扩容', price: gameState.capUpgradeCost, action: () => {
                    if (gameState.coins >= gameState.capUpgradeCost && gameState.maxFishes < 20) {
                        gameState.coins -= gameState.capUpgradeCost; gameState.maxFishes++; gameState.capUpgradeCost += 20; saveGame(); renderShop();
                    } else showToast("金币不足或已达上限");
                }},
                { name: '饲料上限', price: gameState.upgradeFeedCost, action: () => {
                    if (gameState.coins >= gameState.upgradeFeedCost && gameState.feedCount < 5) {
                        gameState.coins -= gameState.upgradeFeedCost; gameState.feedCount++; gameState.upgradeFeedCost += 10; saveGame(); renderShop();
                    } else showToast("金币不足或已达上限");
                }},
                { name: '摆件位扩容', price: gameState.decoUpgradeCost, action: () => {
                    if (gameState.coins >= gameState.decoUpgradeCost && gameState.maxDecos < 7) {
                        gameState.coins -= gameState.decoUpgradeCost; gameState.maxDecos++; gameState.decoUpgradeCost += 20; saveGame(); renderShop();
                    } else showToast("金币不足或已达上限");
                }}
            ];
            upgrades.forEach(u => {
                const btn = document.createElement('button');
                btn.textContent = `${u.name} (${u.price}金)`;
                btn.onclick = u.action;
                grid.appendChild(btn);
            });
            return;
        }

        let cfg = gameState.currentTab === 'fish' ? FISH_CONFIG : DECO_CONFIG;
        for (let name in cfg) {
            const btn = document.createElement('button');
            const price = cfg[name].price;
            
            btn.className = 'shop-btn';
            btn.style.fontSize = '12px';
            btn.style.fontWeight = 'normal';
            btn.style.whiteSpace = 'nowrap';
            btn.style.overflow = 'hidden';
            btn.style.textOverflow = 'ellipsis';
            btn.style.height = '40px';
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.padding = '0 8px';
            
            let icon = "🐟";
            if (gameState.currentTab === 'fish') {
                if (name === '毛毛虫') icon = "🐛";
                else if (name === '徐驰') icon = "🐕";
                else if (name === '斜纹炮弹') icon = "🚀";
                else if (name === '海马' || name.includes('海马')) icon = "🐎";
                else if (name === '海星') icon = "⭐";
                else if (name === '樱花虾' || name.includes('虾')) icon = "🦐";
                else if (name.includes('斑点鲀')) icon = "🐡";
                else if (name.includes('螺')) icon = "🐌";
                else if (name.includes('河豚')) icon = "🐡";
                else icon = "🐟";
            } else {
                if (name.includes('石') || name.includes('岩')) icon = "🪨";
                else if (name.includes('草')) icon = "🌿";
                else if (name.includes('佛')) icon = "🧘";
                else if (name.includes('肉')) icon = "🥓";
                else icon = "🏺";
            }

            btn.innerHTML = `<span style="margin-right:5px; flex-shrink:0;">${icon}</span> <span style="overflow:hidden; text-overflow:ellipsis;">${name} (${price}金)</span>`;
            btn.onclick = () => {
                if (gameState.coins >= price) {
                    if (gameState.currentTab === 'fish' && gameState.fishes.length < gameState.maxFishes) {
                        gameState.coins -= price; gameState.fishes.push(new Fish({type: name}));
                    } else if (gameState.currentTab === 'deco') {
                        if (gameState.decos.length >= gameState.maxDecos) { showToast(`摆件位已满 (${gameState.maxDecos})`); return; }
                        gameState.coins -= price;
                        const spawnX = gameState.cameraX + (window.innerWidth / 2);
                        gameState.decos.push(new Deco({type: name, x: spawnX, y: WORLD_H - 20}));
                    }
                    saveGame();
                } else showToast("金币不足");
            };
            grid.appendChild(btn);
        }
    }

    (window as any).toggleExtraction = () => {
        const panel = document.getElementById('extractionPanel')!;
        if(panel.style.display === 'block') { panel.style.display = 'none'; return; }
        
        // Render Extraction List
        const list = document.getElementById('extractionList')!; list.innerHTML = '';
        gameState.fishes.forEach((f: any, idx: number) => {
            if (f.variant > 0 && !f.isEgg) {
                const points = Math.floor(f.growthValue / 10 * (1 + f.variant * 0.2));
                const cost = f.growthValue * 5;
                const item = document.createElement('div');
                item.className = 'extract-item';
                let icon = f.type.includes('虾') ? "🦐" : (f.type.includes('螺') ? "🐌" : "🐟");
                item.innerHTML = `<div><b>${icon} ${f.type} (V${f.variant})</b><br>可得: ${points}点 | 需: ${cost}金</div>
                                  <button onclick="doExtract(${idx})" style="background:#9b59b6">榨取</button>`;
                list.appendChild(item);
            }
        });

        // Render Mutant Shop
        const mShop = document.getElementById('mutantShopGrid')!; mShop.innerHTML = '';
        for (let name in SPECIAL_FISH) {
            const btn = document.createElement('button');
            const price = SPECIAL_FISH[name].mPrice;
            let icon = "🧬";
            if (name === '毛毛虫') icon = "🐛";
            else if (name === '蓝点马鲛') icon = "🐟";
            else if (name === '深海恶魔') icon = "👹";
            
            btn.innerHTML = `<span style="margin-right:5px;">${icon}</span> ${name} (${price}点)`;
            btn.onclick = () => {
                if (gameState.mutantPoints >= price && gameState.fishes.length < gameState.maxFishes) {
                    gameState.mutantPoints -= price; gameState.fishes.push(new Fish({type: name})); saveGame(); (window as any).toggleExtraction();
                } else if(gameState.mutantPoints < price) showToast("突变点不足");
                else showToast("鱼缸已满");
            };
            mShop.appendChild(btn);
        }

        panel.style.display = 'block';
    };

    (window as any).doExtract = (idx: number) => {
        const f = gameState.fishes[idx];
        const points = Math.floor(f.growthValue / 10 * (1 + f.variant * 0.2));
        const cost = f.growthValue * 5;
        if (gameState.coins >= cost) {
            gameState.coins -= cost; gameState.mutantPoints += points; f.growthValue = 0;
            (window as any).toggleExtraction(); saveGame();
        } else showToast("金币不足");
    };

    (window as any).manualHunt = () => {
        const f = gameState.selectedItem.obj;
        if(Date.now() - f.lastSkillTime < 300000) return showToast("冷却中");
        const prey = gameState.fishes.find((p: any) => (p.type === '黄岩鱼' || p.type === '黑斑河豚') && !p.isEgg);
        if (prey) { f.isHunting = true; f.target = prey; f.lastSkillTime = Date.now(); closeAll(); }
        else showToast("没可捕食的小鱼");
    };

    (window as any).cutHook = () => {
        if (gameState.hooks.length > 0) {
            gameState.hooks = [];
            showToast("你剪断了鱼线！");
            gameState.events = gameState.events.filter((e: any) => e.name !== '钓鱼事件');
        }
    };

    let isDragging = false, dragStartX = 0, dragStartY = 0, totalMoved = 0;
    canvas.onmousedown = (e) => { isDragging = true; dragStartX = e.clientX; dragStartY = e.clientY; totalMoved = 0; };
    window.onmousemove = (e) => {
        if (!isDragging) return;
        let dx = e.clientX - dragStartX;
        let dy = e.clientY - dragStartY;
        totalMoved += Math.abs(dx) + Math.abs(dy);
        gameState.cameraX = Math.max(0, Math.min(gameState.cameraX - dx, WORLD_W - window.innerWidth));
        gameState.cameraY = Math.max(0, Math.min(gameState.cameraY - dy, WORLD_H - window.innerHeight));
        dragStartX = e.clientX;
        dragStartY = e.clientY;
    };
    window.onmouseup = (e) => { if (isDragging && totalMoved < 10) handleInteraction(e.clientX, e.clientY); isDragging = false; };

    function handleInteraction(mx: number, my: number) {
        const rx = mx + gameState.cameraX, ry = my + gameState.cameraY;
        let fish = gameState.fishes.find((f: any) => Math.hypot(rx - f.x, ry - f.y) < 50);
        let deco = gameState.decos.find((d: any) => rx > d.x-d.w/2 && rx < d.x+d.w/2 && ry > d.y-d.h && ry < d.y);
        let portal = gameState.portals.find((p: any) => Math.hypot(rx - p.x, ry - p.y) < 80);
        
        if (portal) {
            portal.hp -= 100;
            createBlood(portal.x, portal.y);
            showToast("你攻击了传送门！");
            return;
        }

        if (fish) { gameState.selectedItem = { type: 'fish', obj: fish }; openInfoPanel(); }
        else if (deco) { gameState.selectedItem = { type: 'deco', obj: deco }; openInfoPanel(); }
        else if (gameState.coins >= gameState.feedCount) {
            gameState.coins -= gameState.feedCount;
            for(let i=0; i<gameState.feedCount; i++) gameState.foodParticles.push({x: rx+(Math.random()-0.5)*40, y: ry+(Math.random()-0.5)*40, eaten: false});
        }
    }

    (window as any).moveDeco = (dir: string) => {
        const item = gameState.selectedItem;
        if (!item || item.type !== 'deco') return;
        const d = item.obj;
        const step = 20;
        if (dir === 'up') d.y -= step;
        if (dir === 'down') d.y += step;
        if (dir === 'left') d.x -= step;
        if (dir === 'right') d.x += step;
        d.x = Math.max(0, Math.min(WORLD_W, d.x));
        d.y = Math.max(0, Math.min(WORLD_H, d.y));
        saveGame();
        openInfoPanel();
    };

    function openInfoPanel() {
        const item = gameState.selectedItem;
        const panel = document.getElementById('panel')!;
        if (!item) return;

        if (item.type === 'fish') {
            const f = item.obj;
            const vNames = ["普通", "变异1级", "变异2级", "变异3级土豪金", "变异4级暗金", "变异5级幻彩"];
            const fishName = `${vNames[f.variant] || '高级变异'} ${f.type}`;
            
            const affixesHtml = f.affixes.map((a: string) => {
                const style = AFFIX_STYLES[a] || { color: '#fff', border: '#3498db' };
                return `<span style="display:inline-block; padding:3px 10px; margin:3px; border-radius:6px; font-size:12px; color:${style.color}; background:transparent; border:2px solid ${style.border}; font-weight:bold; box-shadow:${style.shadow || 'none'}; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">${a}</span>`;
            }).join('');

            const nextLevelXP = (f.level || 1) * 50;
            const xpPercent = Math.min(100, (f.xp / nextLevelXP * 100));
            
            const bPrice = (SPECIAL_FISH[f.type] || FISH_CONFIG[f.type] || { price: 100 }).price || 100;
            let nYield = Math.max(1, Math.floor(6 - (bPrice / 100)));
            if (f.variant >= 3) nYield = Math.max(1, Math.floor(nYield * 0.5));
            if (f.isSpecial) nYield = Math.max(1, Math.floor(nYield * 0.1));

            panel.innerHTML = `
                <div class="close-x" style="font-size:32px; right:15px; top:10px; cursor:pointer; position:absolute; color:#fff;" onclick="closeAll()">&times;</div>
                <div style="text-align:center; margin-bottom:10px;">
                    <h2 style="margin:0; font-size:24px; color:#fff; text-shadow: 0 0 10px rgba(255,255,255,0.3);">${fishName}</h2>
                    <div style="margin-top:5px; display:flex; justify-content:center; flex-wrap:wrap;">${affixesHtml || '<span style="color:#888; font-size:12px;">无词缀</span>'}</div>
                </div>
                
                <div style="background:rgba(0,0,0,0.4); padding:15px; border-radius:12px; margin-bottom:12px; border:1px solid rgba(255,255,255,0.15); box-shadow: inset 0 0 20px rgba(0,0,0,0.5);">
                    <!-- 等级与经验条合并 -->
                    <div style="display:flex; align-items:center; margin-bottom:12px;">
                        <span style="font-weight:900; color:#f1c40f; font-size:18px; min-width:60px;">LV.${f.level}</span>
                        <div style="flex:1; height:12px; background:#111; border-radius:6px; margin:0 10px; overflow:hidden; border:1px solid #555; position:relative;">
                            <div style="width:${xpPercent}%; height:100%; background:linear-gradient(90deg, #f1c40f, #f39c12); transition:width 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);"></div>
                            <span style="position:absolute; width:100%; text-align:center; font-size:9px; color:#fff; top:-1px; font-weight:bold; text-shadow:1px 1px 1px #000;">${f.xp} / ${nextLevelXP}</span>
                        </div>
                    </div>
                    
                    <!-- 攻击与饥饿 -->
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px; margin-bottom:12px;">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span style="color:#aaa; font-size:13px;">攻击:</span>
                            <b style="color:#e74c3c; font-size:18px; font-family:monospace;">${Math.floor(f.atk)}</b>
                        </div>
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span style="color:#aaa; font-size:13px;">饥饿:</span>
                            <b style="color:#e67e22; font-size:18px; font-family:monospace;">${Math.floor(f.hunger)}/10</b>
                        </div>
                    </div>

                    <!-- 健康与成长 并排 -->
                    <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                        <div>
                            <div style="display:flex; justify-content:space-between; font-size:11px; color:#bbb; margin-bottom:4px;">
                                <span>健康值</span>
                                <span>${Math.floor(f.hp)}/${Math.floor(f.maxHP)}</span>
                            </div>
                            <div style="height:8px; background:#111; border-radius:4px; overflow:hidden; border:1px solid #444;">
                                <div style="width:${(f.hp/f.maxHP*100)}%; height:100%; background:linear-gradient(90deg, #ff4444, #ff6b6b); box-shadow: 0 0 5px #ff4444;"></div>
                            </div>
                        </div>
                        <div>
                            <div style="display:flex; justify-content:space-between; font-size:11px; color:#bbb; margin-bottom:4px;">
                                <span>成长值</span>
                                <span>${Math.floor(f.growthValue)}/${Math.floor(f.maxGrowth)}</span>
                            </div>
                            <div style="height:8px; background:#111; border-radius:4px; overflow:hidden; border:1px solid #444;">
                                <div style="width:${Math.min(100, (f.growthValue/f.maxGrowth*100))}%; height:100%; background:linear-gradient(90deg, #2ecc71, #27ae60); box-shadow: 0 0 5px #2ecc71;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="display:flex; flex-direction:column; gap:6px; font-size:13px; color:#ccc; margin-bottom:15px; background:rgba(255,255,255,0.05); padding:10px; border-radius:8px; border:1px solid rgba(255,255,255,0.1);">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span>生态贡献: <b style="color:#2ecc71">${nYield}养料/周期</b></span>
                        <span style="color:#FFD700">售价: <b style="font-size:15px;">${f.getSellPrice()}</b> <small>金</small></span>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:11px; color:#888; border-top:1px solid rgba(255,255,255,0.1); pt:5px; margin-top:5px;">
                        <span>第 ${f.generation} 代传承</span>
                        <span>累计击杀: ${f.kills}</span>
                    </div>
                </div>

                <div style="display:flex; gap:10px; justify-content:center;">
                    <button style="background:linear-gradient(to bottom, #e74c3c, #c0392b); flex:1; padding:10px; border-radius:8px; font-weight:bold; color:#fff; border:none; cursor:pointer; box-shadow: 0 4px 0 #96281b;" onclick="sellItem()">出售</button>
                    <button id="btn-breed-manual" style="background:linear-gradient(to bottom, #3498db, #2980b9); flex:1; padding:10px; border-radius:8px; font-weight:bold; color:#fff; border:none; cursor:pointer; box-shadow: 0 4px 0 #1c5980;" onclick="manualBreed()">繁殖</button>
                </div>
            `;
            
            const mBreedBtn = document.getElementById('btn-breed-manual') as HTMLButtonElement;
            if (f.isSpecial || f.isEgg) { mBreedBtn.style.display = 'none'; } else {
                const cost = Math.floor(f.getSellPrice() * 0.6);
                const isGrowthReady = (f.growthValue / f.maxGrowth) >= 0.5;
                if (f.hasBred) { mBreedBtn.textContent = "已繁殖过"; mBreedBtn.disabled = true; mBreedBtn.style.background = "#444"; mBreedBtn.style.boxShadow = "none"; }
                else if (!isGrowthReady) { mBreedBtn.textContent = "成长不足50%"; mBreedBtn.disabled = true; mBreedBtn.style.background = "#444"; mBreedBtn.style.boxShadow = "none"; }
                else { mBreedBtn.textContent = `繁殖(${cost}金)`; }
            }

        } else if (item.type === 'deco') {
            const d = item.obj;
            const currentConsume = 20 + (d.level - 1) * 5;
            const isWorking = gameState.nurture >= 50;
            const statusStyle = isWorking ? "color:#2ecc71" : "color:#ff4444; font-weight:bold;";
            const statusText = isWorking ? "● 生机勃勃" : "● 养料贫瘠 (增益失效)";
            
            const cfg = DECO_CONFIG[d.type] || {};
            let effectDesc = cfg.desc || "精美的装饰品，美化鱼缸环境。";

            if (d.isShelter) effectDesc += " <br/><span style='color:#f1c40f;'>[特质] 庇护所：可在入侵事件中给鱼提供庇护。</span>";

            const isMax = d.level >= 5;
            const progressPercent = isMax ? 100 : (d.nurtureEaten / (d.level * 200) * 100);

            panel.innerHTML = `
                <div class="close-x" style="font-size:32px; right:15px; top:10px; cursor:pointer;" onclick="closeAll()">&times;</div>
                <h2 style="margin:0 0 5px 0; font-size:22px; color:#fff;">${d.type} <span style="font-size:14px; color:#aaa; font-weight:normal;">装饰摆件</span></h2>
                
                <div style="background:rgba(255,255,255,0.05); padding:12px; border-radius:10px; margin-bottom:12px; border:1px solid rgba(255,255,255,0.1);">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                        <span style="${statusStyle}; font-size:13px;">${statusText}</span>
                        <span style="color:#aaa; font-size:12px;">消耗: <b style="color:#e67e22">${currentConsume}</b> 养料/周期</span>
                    </div>

                    <div style="margin-bottom:15px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                            <span style="font-weight:bold; color:#3498db; font-size:16px;">Lv.${d.level} ${isMax ? '<span style="color:#f1c40f">(max)</span>' : ''}</span>
                            <span style="font-size:11px; color:#888;">${isMax ? '已达最高等级' : `进度: ${d.nurtureEaten}/${d.level * 200}`}</span>
                        </div>
                        <div style="height:8px; background:#222; border-radius:4px; overflow:hidden; border:1px solid #444;">
                            <div style="width:${progressPercent}%; height:100%; background:linear-gradient(90deg, #3498db, #2980b9); transition:width 0.3s;"></div>
                        </div>
                    </div>

                    <div style="font-size:13px; color:#ddd; line-height:1.5; background:rgba(0,0,0,0.3); padding:10px; border-radius:6px; border-left:4px solid #3498db;">
                        ${effectDesc}
                    </div>
                </div>

                <div id="move-controls" style="display:grid; grid-template-columns: repeat(3, 1fr); gap:5px; margin-bottom:15px; max-width:150px; margin-left:auto; margin-right:auto;">
                    <div></div><button class="move-btn" onclick="moveDeco('up')">▲</button><div></div>
                    <button class="move-btn" onclick="moveDeco('left')">◀</button>
                    <button class="move-btn" onclick="moveDeco('down')">▼</button>
                    <button class="move-btn" onclick="moveDeco('right')">▶</button>
                </div>

                <div style="display:flex; gap:10px; justify-content:center;">
                    <button id="btn-repair-manual" style="background:#2ecc71; flex:1.5; padding:8px; border-radius:6px; font-weight:bold;" onclick="repairDeco()">手动修复</button>
                    <button style="background:#e74c3c; flex:1; padding:8px; border-radius:6px; font-weight:bold;" onclick="sellItem()">出售</button>
                </div>
            `;
            
            const mRepairBtn = document.getElementById('btn-repair-manual') as HTMLButtonElement;
            const hpLoss = d.maxHP - d.hp;
            const repairCost = Math.floor(hpLoss * 0.1);
            mRepairBtn.textContent = `修复(${repairCost}金)`;
            mRepairBtn.disabled = hpLoss <= 0;
            if (hpLoss <= 0) mRepairBtn.style.background = "#444";
        }
        
        panel.style.display = 'block';
    }

    (window as any).sellItem = () => {
        const item = gameState.selectedItem; if (!item) return;
        if (item.type === 'fish') {
            gameState.coins += item.obj.getSellPrice();
            gameState.fishes = gameState.fishes.filter((f: any) => f !== item.obj);
        } else {
            gameState.coins += Math.floor(DECO_CONFIG[item.obj.type].price * 0.95);
            gameState.decos = gameState.decos.filter((d: any) => d !== item.obj);
        }
        gameState.selectedItem = null; closeAll(); saveGame();
    };
    
    (window as any).manualBreed = () => {
        const item = gameState.selectedItem; if (!item || item.type !== 'fish') return;
        const res = item.obj.breed(); showToast(res.msg); if (res.can) closeAll();
    };

    (window as any).repairDeco = () => {
        const item = gameState.selectedItem; if (!item || item.type !== 'deco') return;
        if (item.obj.repair()) openInfoPanel();
    };

    function saveGame() {
        const data = {...gameState, fishes: gameState.fishes.map((f: any) => ({...f, target:null})), bloodParticles: []};
        localStorage.setItem('fish_mega_v4_stable', JSON.stringify(data));
    }

    function loadGame() {
        const saved = localStorage.getItem('fish_mega_v4_stable');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                Object.assign(gameState, data);
                gameState.lastManualBreedTime = data.lastManualBreedTime || 0;
                gameState.nurture = data.nurture || 0;
                gameState.events = data.events || [];
                gameState.fishes = (data.fishes || []).map((f: any) => new Fish(f));
                gameState.decos = (data.decos || []).map((d: any) => new Deco(d));
                gameState.worms = (data.worms || []).map((w: any) => new Worm(w));
                gameState.devilFishes = data.devilFishes || [];
                gameState.selectedItem = null; // 清除选中项，避免旧存档对象引用问题
            } catch (e) { console.error("存档解析失败:", e); gameState.fishes = []; gameState.decos = []; }
        }
        loadAssets();
    }

    (window as any).upgradeFeed = () => { 
        if (gameState.coins >= gameState.upgradeFeedCost && gameState.feedCount < FEED_LIMIT) { 
            gameState.coins -= gameState.upgradeFeedCost; gameState.feedCount++; gameState.upgradeFeedCost += 50; saveGame(); (window as any).openMaintenance();
        } else if(gameState.coins < gameState.upgradeFeedCost) showToast("金币不足");
    };

    (window as any).upgradeCapacity = () => { 
        if (gameState.coins >= gameState.capUpgradeCost && gameState.maxFishes < CAPACITY_LIMIT) { 
            gameState.coins -= gameState.capUpgradeCost; gameState.maxFishes++; gameState.capUpgradeCost += 50; saveGame(); (window as any).openMaintenance();
        } else if(gameState.coins < gameState.capUpgradeCost) showToast("金币不足");
    };

    (window as any).upgradeDecoSpace = () => {
        if(!gameState.maxDecos) gameState.maxDecos = 2;
        if(!gameState.decoUpgradeCost) gameState.decoUpgradeCost = 150;
        if (gameState.maxDecos >= DECO_LIMIT) { showToast(`摆件位已达上限 (${DECO_LIMIT})`); return; }
        if (gameState.coins >= gameState.decoUpgradeCost) {
            gameState.coins -= gameState.decoUpgradeCost; gameState.maxDecos++; gameState.decoUpgradeCost += 50; showToast("摆件空间已扩展！"); saveGame(); (window as any).openMaintenance();
        } else showToast("金币不足");
    };

    (window as any).openMaintenance = () => {
        closeAll();
        document.getElementById('maintenancePanel')!.style.display = 'block';
        document.getElementById('ui-feed-lv')!.textContent = gameState.feedCount;
        document.getElementById('ui-cap-lv')!.textContent = gameState.maxFishes;
        document.getElementById('ui-deco-lv')!.textContent = gameState.maxDecos || 2;
        document.getElementById('btn-up-feed')!.textContent = `${gameState.upgradeFeedCost}金`;
        document.getElementById('btn-up-cap')!.textContent = `${gameState.capUpgradeCost}金`;
        document.getElementById('btn-up-deco')!.textContent = `${gameState.decoUpgradeCost || 300}金`;
    };

    (window as any).openTreasure = () => { gameState.coins += gameState.treasure; gameState.treasure = 0; saveGame(); };

    loadGame(); loop();
  }, []);

  return (
    <div className="game-wrapper">
      <div id="game-toast"></div>
      <canvas id="canvas"></canvas>

      {/* 地狱狂潮进度条 */}
      <div id="helltide-container" className="absolute top-4 left-1/2 -translate-x-1/2 w-64 h-4 bg-gray-800 rounded-full border border-red-500 overflow-hidden z-50">
          <div id="helltide-bar" className="h-full bg-red-600 transition-all duration-500" style={{width: '0%'}}></div>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold uppercase tracking-widest">地狱狂潮进度</div>
      </div>

      <div id="ui-container" style={{position:'absolute', top:'10px', left:'10px', zIndex:30, pointerEvents:'none'}}>
          <div id="ui-info" style={{background:'rgba(0,0,0,0.7)', padding:'6px 10px', borderRadius:'8px', pointerEvents:'auto', border:'1px solid rgba(255,255,255,0.1)', minWidth:'140px', display:'flex', flexDirection:'column', gap:'2px'}}>
               <div className="info-row" style={{color:'#00d2ff', fontWeight:'bold', fontSize:'13px', lineHeight:'1.2'}}>
                   水质: <span id="water-quality">清澈</span> (<span id="water-val">100</span>)
               </div>
               <div id="water-factors" style={{fontSize:'10px', color:'#ff4444', fontWeight:'normal', marginTop:'-1px', marginBottom:'3px', opacity:0.9}}>因素: 鱼屎:0 (0%) 残饵:0 (0%)</div>
               
               <div className="info-row" style={{color:'#FFD700', fontSize:'13px', lineHeight:'1.2'}}>金币: <span id="coins">0</span></div>
               
               <div className="info-row" onClick={() => (window as any).showShop()} style={{color:'#fff', cursor:'pointer', background:'rgba(255,255,255,0.1)', padding:'3px 6px', borderRadius:'4px', border:'1px solid rgba(255,255,255,0.2)', textAlign:'left', marginTop:'3px', display:'flex', alignItems:'center', gap:'4px', fontSize:'12px'}}>
                   🛒 鱼数: <span id="capacity">0</span> / <span id="maxCapacity">0</span>
               </div>
          </div>
      </div>

      <div id="mPoint-display" onClick={() => (window as any).toggleExtraction()} style={{position:'absolute', top:'10px', left:'165px', cursor:'pointer', background:'rgba(0,0,0,0.3)', padding:'4px 8px', borderRadius:'6px', border:'1px solid rgba(155, 89, 182, 0.5)', zIndex:30, color:'#9b59b6', display:'flex', alignItems:'center', gap:'5px'}}>
          <span style={{fontSize:'14px'}}>🧬</span>
          <div style={{textAlign:'left', lineHeight:'1.1'}}>
              <div style={{fontWeight:'bold', fontSize:'12px'}}>突变点: <span id="mPoints">0</span></div>
              <div style={{fontSize:'9px', opacity:0.7}}>点击榨取</div>
          </div>
      </div>
      <div id="treasure-box" onClick={() => (window as any).openTreasure()} style={{bottom: '20px', right: '20px', transform: 'scale(0.6)', opacity: 0.7, background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', borderRadius: '10px', color: 'white', cursor: 'pointer', zIndex: 100}}>大撒币: <span id="treasure">0</span>/500</div>

      <button id="btn-cut-hook" onClick={() => (window as any).cutHook()} style={{display: 'none', position: 'absolute', bottom: '100px', left: '50%', transform: 'translateX(-50%)', background: '#e74c3c', color: 'white', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', zIndex: 100}}>剪断鱼线！</button>

      {/* 事件提示 */}
      <div id="event-msg" className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-600/80 text-white px-6 py-2 rounded-lg font-bold text-xl border-2 border-white animate-pulse z-50 pointer-events-none whitespace-pre-line text-center" style={{display: 'none'}}>
          事件进行中
      </div>

      <div id="shopPanel">
          <div className="close-x" onClick={() => closeAll()}>&times;</div>
          <div className="tab-header">
              <button id="tab-fish" className="tab-btn active" onClick={() => (window as any).switchTab('fish')}>普通鱼类</button>
              <button id="tab-deco" className="tab-btn" onClick={() => (window as any).switchTab('deco')}>装饰摆件</button>
              <button id="tab-upgrade" className="tab-btn" onClick={() => (window as any).switchTab('upgrade')} style={{color:'#3498db'}}>鱼缸升级</button>
          </div>
          <div id="shopGrid" className="shop-grid"></div>
          <br/><button onClick={() => closeAll()} style={{background:'#777', width: '100%'}}>关闭</button>
      </div>

      <div id="panel">
          <div className="close-x" onClick={() => closeAll()}>&times;</div>
          <h3 id="itemName">详细信息</h3>
          <div id="itemGen" style={{color:'#FF9900', fontWeight:'bold', marginBottom:'10px'}}></div>
          <div id="fishOnlyStats">
              <div id="kill-count-box" className="stat-line" style={{color:'#ff4444', display:'none'}}>击杀数: <span id="val-kills">0</span></div>
              <div className="stat-line">经验值: <span id="val-xp">0</span> / <span id="val-xpMax">0</span><div className="bar-bg" style={{height:'4px'}}><div id="bar-xp" className="bar-fill" style={{background:'#3498db'}}></div></div></div>
              <div className="stat-line">饥饿度: <span id="val-hunger">0</span>/10<div className="bar-bg" style={{height:'4px'}}><div id="bar-hunger" className="bar-fill" style={{background:'#e67e22'}}></div></div></div>
              <div className="stat-line">健康值: <span id="val-hp">0</span> / <span id="val-hpMax">0</span><div className="bar-bg" style={{height:'4px'}}><div id="bar-hp" className="bar-fill" style={{background:'#ff4444'}}></div></div></div>
              <div className="stat-line">成长值: <span id="val-growth">0</span> / <span id="val-growthMax">0</span><div className="bar-bg" style={{height:'4px'}}><div id="bar-growth" className="bar-fill" style={{background:'#2ecc71'}}></div></div></div>
              <div id="fish-extra-info" style={{fontSize: '12px', color: '#aaa', marginTop: '5px', borderTop: '1px solid #444', paddingTop: '5px'}}></div>
          </div>
          <div id="move-controls" style={{display:'none', marginTop:'10px', textAlign:'center'}}>
              <p style={{fontSize:'12px', color:'#aaa', marginBottom:'5px'}}>调整位置:</p>
              <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'5px', width:'120px', margin:'0 auto'}}>
                  <div></div><button onClick={() => (window as any).moveDeco('up')} style={{padding:'5px', background:'#3498db'}}>↑</button><div></div>
                  <button onClick={() => (window as any).moveDeco('left')} style={{padding:'5px', background:'#3498db'}}>←</button>
                  <button onClick={() => (window as any).moveDeco('down')} style={{padding:'5px', background:'#3498db'}}>↓</button>
                  <button onClick={() => (window as any).moveDeco('right')} style={{padding:'5px', background:'#3498db'}}>→</button>
              </div>
          </div>
          <div className="stat-line" style={{color:'#FFD700', fontSize: '18px', marginTop: '15px', textAlign:'center'}}>当前售价: <span id="val-price">0</span> 金币</div>
          <div id="skill-box" style={{marginBottom:'15px', display:'none'}}>
              <button id="btn-skill" onClick={() => (window as any).manualHunt()} style={{background:'#9b59b6', width:'100%'}}>发动捕食技能 (5min CD)</button>
          </div>
          <div style={{marginTop:'20px', display:'flex', gap:'10px', justifyContent: 'center'}}>
              <button id="btn-sell" style={{background:'#e74c3c'}} onClick={() => (window as any).sellItem()}>出售</button>
              <button id="btn-breed" style={{background:'#3498db'}} onClick={() => (window as any).manualBreed()}>繁殖</button>
              <button id="btn-repair" style={{background:'#2ecc71', display:'none'}} onClick={() => (window as any).repairDeco()}>修复</button>
              <button onClick={() => (document.querySelectorAll('#panel, #shopPanel, #extractionPanel, #maintenancePanel') as any).forEach((p: any) => p.style.display='none')} style={{background:'#777'}}>返回</button>
          </div>
      </div>

      <div id="extractionPanel" style={{width:'600px'}}>
          <div className="close-x" onClick={() => closeAll()}>&times;</div>
          <div style={{display:'flex', gap:'20px'}}>
              <div style={{flex:1}}>
                  <h3 style={{color:'#9b59b6', margin:'0 0 10px 0'}}>突变榨取</h3>
                  <p style={{fontSize:'12px', color:'#aaa', marginBottom:'15px'}}>比例: 10成长值=1突变点 | 消耗: 1成长值=5金币</p>
                  <div id="extractionList" style={{maxHeight:'400px', overflowY:'auto'}}></div>
              </div>
              <div style={{width:'1px', background:'rgba(255,255,255,0.1)'}}></div>
              <div style={{flex:1}}>
                  <h3 style={{color:'#3498db', margin:'0 0 10px 0'}}>突变商店</h3>
                  <div id="mutantShopGrid" className="shop-grid" style={{maxHeight:'400px', overflowY:'auto'}}></div>
              </div>
          </div>
          <br/><button onClick={() => closeAll()} style={{background:'#777', width: '100%'}}>关闭</button>
      </div>
    </div>
  );
}
