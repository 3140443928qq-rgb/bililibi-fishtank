import React, { useEffect } from 'react';

export default function App() {
    const closeAll = () => {
        const panels = ['panel', 'shopPanel', 'extractionPanel', 'maintenancePanel'];
        panels.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    };

    useEffect(() => {
    // --- 以下是用户原始脚本逻辑 ---
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
        '毛毛虫': { price: 80,  convert: 20, src: '16.png',       cols: 1, rows: 1, w: 355, h: 226, scale: 3.9 },
        '牆蝈蛙蛤蛤': { price: 350,  convert: 20, src: 'fish27.png',       cols: 1, rows: 1, w: 384, h: 384, scale: 2.3 },
        '徐驰': { price: 15,  convert: 20, src: '30.png',       cols: 1, rows: 1, w: 128, h: 62, scale: 1.4 },
        '黄金螺': { price: 40, convert: 5, src: 'snail_sprite.png', cols: 4, rows: 1, w: 512, h: 128, scale: 0.8, moveMode: 'crawl' },
        '樱花虾': { price: 80, convert: 8, src: 'shrimp_sprite.png', cols: 4, rows: 1, w: 512, h: 128, scale: 1.0, moveMode: 'crawl' },
        '斜纹炮弹': { price: 450, convert: 7, src: 'triggerfish1sheet.png', cols: 4, rows: 1, w: 512, h: 128, scale: 1.3 },
        '海星': { price: 120, convert: 12, src: 'snail_sprite.png', cols: 4, rows: 1, w: 512, h: 128, scale: 0.9, moveMode: 'crawl', speed: 0.05 },
        '清道夫': { price: 180, convert: 10, src: 'fish9.png', cols: 2, rows: 2, w: 128, h: 128, scale: 1.0, scavenger: true },
    };

    let SPECIAL_FISH: any = {
        '猎手鱼': { mPrice: 25, price: 0, src: 'fish16.png',  cols: 2, rows: 2, w: 126, h: 103, scale: 1.8 },
        '嗜血鲨': { mPrice: 100, price: 0, src: 'fish20.png', cols: 2, rows: 2, w: 324, h: 156, scale: 2.5 },
        '地狱魔鬼鱼': { mPrice: 100, price: 0, src: 'fish20.png', cols: 2, rows: 2, w: 324, h: 156, scale: 2.5, tint: 'red' }
    };

    let DECO_CONFIG: any = {
        '花岗岩': { price: 50, src: 'deco4.png', w: 200, h: 200 },
        '大理石': { price: 60, src: 'deco5.png', w: 200, h: 200 },
        '海草':   { price: 150,  src: 'deco6.png', w: 260, h: 340 },
        '熔岩石':   { price: 800, src: 'deco7.png', w: 215, h: 320 },
        '熔岩矿':   { price: 80,  src: 'deco8.png', w: 177,  h: 220 },
        '佛像':   { price: 500, src: 'deco9.png', w: 300, h: 310 },
        '腊肉': { price: 666, src: 'deco10.png', w: 216, h: 343 },
        '李老师':   { price: 1800, src: 'deco11.png', w: 260, h: 260 }
    };

    let gameState: any = {
     coins: 200, nurture: 0, mutantPoints: 0, fishes: [], decos: [], foodParticles: [], bloodParticles: [],
     maxFishes: 5, feedCount: 1, upgradeFeedCost: 50, capUpgradeCost: 200,
     maxDecos: 2,           
     decoUpgradeCost: 300,  
     treasure: 0, cameraX: 0, cameraY: 0, selectedItem: null, currentTab: 'fish',
     lastIncomeTime: Date.now(), lastSpawnTime: Date.now(), lastGrowthTime: Date.now(),
     lastManualBreedTime: 0, 
     waste: 0, waterQuality: '良好', waterQualityValue: 100, 
     events: [], // 支持多个事件叠加
     missiles: [], parasites: [], zombies: [], hooks: [], lavaBalls: [],
     portals: [], blackHoles: [], fireballs: [], lightningChains: [], eggs: [],
     hellTideProgress: 0,
     deathCount: 0,
     lastHellTideDecayTime: 0,
     lastEventTime: Date.now(),
     lastWaterRecoverTime: Date.now(),
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
        fw: number; fh: number; renderH: number; renderW: number; target: any;
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
            this.hp = c.hp !== undefined ? c.hp : this.maxHP;
            
            const priceFactor = Math.min(10, (baseP / 100));
            const growthFactor = (this.growthValue / this.maxGrowth) * 10;
            this.atk = Math.floor(Math.random() * 5 + 1 + priceFactor + growthFactor);
            this.atk += Math.floor((this.level - 1) / 5);
            if (this.affixes.includes('战士')) this.atk += 5;
            this.atk = Math.max(1, Math.min(100, this.atk));

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
            this.target = null; this.isHunting = false; this.lastAttackTime = 0; this.hitFlash = 0;
        }

        getSellPrice() {
            if (this.isSpecial) return 300 + Math.floor(this.growthValue * 2);
            const base = FISH_CONFIG[this.type] ? FISH_CONFIG[this.type].price : 10;
            let p = this.growthValue <= 100 
                ? (base * 0.5 + (base * (this.growthValue / 100))) 
                : (base * 1.5 + (this.growthValue - 100));
            let finalPrice = p * (1 + this.variant * 0.20) * (1 + (this.generation - 1) * 0.10);
            if (this.variant >= 3) finalPrice *= 2;
            return Math.floor(finalPrice);
        }

        update() {
            if (this.isEgg) return;
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

            // 经验值随时间增长
            if (Math.random() < 0.001) this.addXP(1);

            // 说话逻辑
            const speechCooldown = 20000 + Math.random() * 40000; // 降低频率
            if (Date.now() - this.lastSpeechTime > speechCooldown) {
                let lines = ["今天天气不错", "好饿啊...", "咕噜咕噜", "我是最帅的鱼", "水里真舒服"];
                
                if (this.affixes.includes('键政')) {
                    lines = [
                        "多伦多方脸的七步民主论非常有意思...",
                        "威权联盟的本质其实是利益交换。",
                        "习近平的经济政策对未来影响深远...",
                        "民主化进程需要社会契约的重建。",
                        "威权主义在现代互联网面前面临巨大挑战。",
                        "七步民主：第一步是公民意识的觉醒...",
                        "我们要警惕威权主义的全球扩张。"
                    ];
                }

                if (this.type === '毛毛虫') {
                    lines = [
                        "文化大吃饱，真是个伟大的时代...",
                        "三年打饥荒，那是自然的考验。",
                        "我们要继续斗争！",
                        "大跃进，亩产万斤不是梦。",
                        "革命不是请客吃饭。"
                    ];
                }

                this.speech = lines[Math.floor(Math.random() * lines.length)];
                this.speechTimer = 360; // 延长2倍发言持续时间 (原180)
                this.lastSpeechTime = Date.now();
            }
            if (this.speechTimer > 0) this.speechTimer--;

            // 鱼屎逻辑
            if (Date.now() - this.lastPoopTime > 15000 + Math.random() * 15000) {
                let amount = 10;
                if (this.affixes.includes('巨化')) amount *= 3;
                gameState.waste += amount;
                this.lastPoopTime = Date.now();
            }

            // 清道夫逻辑
            if (FISH_CONFIG[this.type]?.scavenger && gameState.waste > 0) {
                gameState.waste = Math.max(0, gameState.waste - 0.5);
                if (Math.random() < 0.01) this.addXP(1);
            }

            // 躲避逻辑
            if (this.isHiding && this.shelterId) {
                const shelter = gameState.decos.find((d: any) => d.id === this.shelterId);
                if (shelter && shelter.hp > 0 && gameState.events.length > 0) {
                    this.x = shelter.x + (Math.random() - 0.5) * 20;
                    this.y = shelter.y - 10;
                    this.vx = 0; this.vy = 0;
                    if (this.speechTimer <= 0) {
                        this.speech = "我好害怕啊...";
                        this.speechTimer = 60;
                    }
                    return;
                } else {
                    this.isHiding = false;
                    this.shelterId = null;
                }
            } else if (gameState.events.some((e: any) => ['寄生虫入侵', '潜水导弹轰炸', '钓鱼事件', '僵尸鱼入侵', '地狱狂潮'].includes(e.name))) {
                // 尝试寻找庇护所
                const shelters = gameState.decos.filter((d: any) => d.isShelter && d.hp > 0);
                for (let s of shelters) {
                    const hidingCount = gameState.fishes.filter((f: any) => f.shelterId === s.id).length;
                    const capacity = 1 + s.level; 
                    if (hidingCount < capacity) {
                        const dist = Math.hypot(this.x - s.x, this.y - s.y);
                        if (dist < 200) {
                            this.isHiding = true;
                            this.shelterId = s.id;
                            break;
                        }
                    }
                }
            }

            // 词缀特殊逻辑
            this.handleAffixes();

            const s = SPECIAL_FISH[this.type] || FISH_CONFIG[this.type];
            this.moveMode = s.moveMode || 'swim';
            this.maxHP = this.baseMaxHP + Math.floor(this.growthValue / 5) + (this.level - 1) * 2;
            if (this.affixes.includes('巨化')) this.maxHP *= 1.5;
            if(this.hp > this.maxHP) this.hp = this.maxHP;

            // --- 爬行模式逻辑 (稳重、有支点感) ---
            if (this.moveMode === 'crawl') {
                if (this.crawlWait > 0) {
                    this.crawlWait--;
                    this.vx = 0; this.vy = 0;
                } else {
                    // 如果没有目标或到达目标，寻找新目标
                    const distToTarget = Math.hypot(this.x - this.crawlTargetX, this.y - this.crawlTargetY);
                    if (distToTarget < 5 || (this.crawlTargetX === 0 && this.crawlTargetY === 0)) {
                        this.crawlTargetX = Math.max(100, Math.min(WORLD_W - 100, this.x + (Math.random() - 0.5) * 300));
                        this.crawlTargetY = Math.max(WORLD_H - 100, Math.min(WORLD_H - 30, this.y + (Math.random() - 0.5) * 50));
                        this.crawlWait = Math.floor(Math.random() * 100) + 50; // 走完停一下
                    } else {
                        // 向目标平稳移动
                        const angle = Math.atan2(this.crawlTargetY - this.y, this.crawlTargetX - this.x);
                        const speed = s.speed || (this.type === '黄金螺' ? 0.1 : 0.2); 
                        this.vx = Math.cos(angle) * speed;
                        this.vy = Math.sin(angle) * speed;
                        this.facingRight = this.vx > 0;
                    }
                }
                this.x += this.vx;
                this.y += this.vy;
            } else {
                this.vx *= 0.97; this.vy *= 0.97;
                const margin = 80;
                if (this.y > WORLD_H - 50) { this.y = WORLD_H - 50; this.vy *= -0.8; }
                if (this.x < margin) this.vx += 0.2;
                if (this.x > WORLD_W - margin) this.vx -= 0.2;
                if (this.y < margin) this.vy += 0.2;
                this.x += this.vx;
                this.y += this.vy;
            }

            let foodTarget = null;
            if (this.isSpecial && this.hunger === 0 && !this.isHunting) {
                const prey = gameState.fishes.find((p: any) => !p.isEgg && !p.isSpecial && p.variant === 0 && Math.hypot(p.x - this.x, p.y - this.y) < 600);
                if (prey) { this.isHunting = true; this.target = prey; }
            }

            if (this.isHunting && this.target) {
                const dist = Math.hypot(this.target.x - this.x, this.target.y - this.y);
                const isInvader = this.target.type === '僵尸鱼' || this.target.type === '地狱魔鬼鱼' || this.target.hp !== undefined; 
                const isMate = this.target.type === this.type && !this.target.isSpecial && !this.isSpecial; // 繁殖目标

                if ((!gameState.fishes.includes(this.target) && !gameState.zombies.includes(this.target) && !gameState.parasites.includes(this.target)) || this.target.hp <= 0) {
                    this.isHunting = false; this.target = null;
                } else {
                    const angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
                    let speedBoost = isInvader ? 0.6 : 0.3; // 降低游动速度
                    if (isMate) speedBoost = 0.2; // 繁殖时更慢

                    if (dist > 40) {
                        this.vx += Math.cos(angle) * speedBoost; this.vy += Math.sin(angle) * (speedBoost * 0.75);
                    } else if (Date.now() - this.lastAttackTime > (isInvader ? 1000 : 3000)) {
                        if (!isMate) {
                            this.attack(this.target); 
                        }
                        this.lastAttackTime = Date.now();
                    }
                }
            } else if (this.hunger < 10 || (['海星', '樱花虾', '黄金螺', '清道夫'].includes(this.type))) {
                let minDist = 800;
                // 优先吃涡虫
                let wormTarget = null;
                gameState.worms.forEach((w: any) => {
                    let d = Math.hypot(w.x - this.x, w.y - this.y);
                    if (d < minDist) { minDist = d; wormTarget = w; }
                });

                if (wormTarget && this.hunger < 10) {
                    const angle = Math.atan2(wormTarget.y - this.y, wormTarget.x - this.x);
                    this.vx += Math.cos(angle) * 0.1; this.vy += Math.sin(angle) * 0.08;
                    if (minDist < 30) {
                        wormTarget.hp = 0; // 吃掉
                        this.hunger = Math.min(10, this.hunger + 2);
                        this.hp = Math.min(this.maxHP, this.hp + 5);
                    }
                } else {
                    gameState.foodParticles.forEach((f: any) => {
                        if (!f.eaten) {
                            let d = Math.hypot(f.x - this.x, f.y - this.y);
                            if (d < minDist) { minDist = d; foodTarget = f; }
                        }
                    });
                    if (foodTarget) {
                        const angle = Math.atan2(foodTarget.y - this.y, foodTarget.x - this.x);
                        this.vx += Math.cos(angle) * 0.12; this.vy += Math.sin(angle) * 0.1; // 降低抢食速度
                        if (Math.hypot(foodTarget.x - this.x, foodTarget.y - this.y) < 30) {
                            foodTarget.eaten = true; 
                            if (this.hunger < 10) this.hunger = Math.min(10, this.hunger + 1);
                            this.hp = Math.min(this.maxHP, this.hp + 2);
                        }
                    }
                }
            }

            if (!this.isHunting && !foodTarget) {
                this.vx += (Math.random() - 0.5) * 0.1; this.vy += (Math.random() - 0.5) * 0.08; // 降低游动速度
                if(Math.hypot(this.vx, this.vy) < 0.4) { this.vx *= 1.1; this.vy *= 1.1; }
            }
            this.x += this.vx; this.y += this.vy;
            if (Math.abs(this.vx) > 0.4) this.facingRight = this.vx > 0;
            if (this.hitFlash > 0) this.hitFlash -= 0.05;
        }

        addXP(val: number) {
            this.xp += val;
            const nextLevelXP = this.level * 50;
            if (this.xp >= nextLevelXP) {
                this.xp -= nextLevelXP;
                this.level++;
                showToast(`${this.type} 升级至 Lv.${this.level}！`);
                if (this.level % 5 === 0) {
                    const allAffixes = ['巨化', '萨满', '法师', '战士', '牧师', '潜行者', '狂战士', '工程师'];
                    const newAffix = allAffixes[Math.floor(Math.random() * allAffixes.length)];
                    if (!this.affixes.includes(newAffix)) {
                        this.affixes.push(newAffix);
                        showToast(`${this.type} 获得了词缀：${newAffix}！`);
                    }
                }
            }
        }

        handleAffixes() {
            const now = Date.now();
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
            if (this.affixes.includes('狂战士') && now - this.lastBerserkTime > 20000) {
                if (Math.random() < 0.1) {
                    this.isBerserk = true;
                    this.lastBerserkTime = now;
                    setTimeout(() => this.isBerserk = false, 5000);
                }
            }
        }

        attack(target: any) {
            let damage = this.atk;
            if (this.affixes.includes('潜行者')) {
                // 潜行者背刺：如果目标没发现（简单模拟：随机触发）
                if (Math.random() < 0.3) damage *= 3;
            }
            target.hp -= damage;
            createBlood(target.x, target.y);
            if (target.hp <= 0) {
                this.addXP(20);
                if (target.isHell) gameState.hellTideProgress = Math.max(0, gameState.hellTideProgress - 1);
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

                // 绘制词缀图标
                if (this.affixes.length > 0) {
                    ctx.save();
                    ctx.font = "12px Arial";
                    ctx.fillStyle = "cyan";
                    ctx.textAlign = "center";
                    let affixStr = "";
                    if (this.affixes.includes('战士')) affixStr += "🛡️⚔️";
                    if (this.affixes.includes('狂战士')) affixStr += "🩸";
                    ctx.fillText(affixStr, 0, -this.renderH/2 - 5);
                    ctx.restore();
                }

                if (this.hitFlash > 0) {
                    ctx.translate((Math.random()-0.5)*12, (Math.random()-0.5)*12);
                    ctx.filter = `brightness(2) sepia(1) hue-rotate(-50deg) saturate(5)`;
                } else {
                    if (this.isBerserk) {
                        ctx.filter = 'brightness(1.5) saturate(2) hue-rotate(-30deg)';
                    } else if (this.affixes.includes('潜行者')) {
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
                if (img && img.complete && img.naturalWidth > 0) {
                    const idx = Math.floor(Date.now() / 250) % (s.cols * s.rows);
                    ctx.drawImage(img, (idx % s.cols) * this.fw, Math.floor(idx / s.cols) * this.fh, this.fw, this.fh, -this.renderW/2, -this.renderH/2, this.renderW, this.renderH);
                } else {
                    ctx.fillStyle = this.isSpecial ? '#9b59b6' : '#FFD700';
                    ctx.beginPath(); ctx.arc(0, 0, 10, 0, Math.PI*2); ctx.fill();
                }

                // 萨满闪电特效
                if (this.affixes.includes('萨满')) {
                    ctx.strokeStyle = "cyan";
                    ctx.lineWidth = 2;
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

    function createBlood(x: number, y: number) {
        for(let i=0; i<8; i++) {
            gameState.bloodParticles.push({ x, y, vx: (Math.random()-0.5)*5, vy: (Math.random()-0.5)*5, life: 1.8, size: Math.random()*4+2 });
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
            ctx.beginPath();
            ctx.ellipse(this.x - gameState.cameraX, this.y - gameState.cameraY, 15, 4, Math.atan2(this.vy, this.vx), 0, Math.PI * 2);
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
        const events = ['寄生虫入侵', '僵尸鱼入侵', '潜水导弹轰炸', '珍珠撒下', '钓鱼事件', '黑洞事件', '繁殖事件'];
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
            for(let i=0; i<15; i++) {
                gameState.parasites.push({
                    x: Math.random() * WORLD_W, y: -50,
                    vx: (Math.random()-0.5)*2, vy: Math.random()*2+1,
                    hp: 20
                });
            }
        } else if (eventName === '僵尸鱼入侵') {
            eventObj.timer = 45000;
            for(let i=0; i<3; i++) {
                gameState.zombies.push({
                    x: WORLD_W + 100, y: Math.random() * WORLD_H,
                    vx: -2, vy: (Math.random()-0.5)*1,
                    hp: 150, maxHP: 150, type: '僵尸鱼',
                    facingRight: false
                });
            }
        } else if (eventName === '潜水导弹轰炸') {
            eventObj.timer = 10000;
            const targetDeco = gameState.decos[Math.floor(Math.random() * gameState.decos.length)];
            if (targetDeco) {
                gameState.missiles.push({
                    x: targetDeco.x, y: -100,
                    targetX: targetDeco.x, targetY: targetDeco.y,
                    speed: 5
                });
            }
        } else if (eventName === '珍珠撒下') {
            eventObj.timer = 8000;
            gameState.fishes.forEach((f: any) => {
                f.hp = f.maxHP;
                f.growthValue = Math.min(f.maxGrowth, f.growthValue + 20);
            });
            // 珍珠视觉特效
            for(let i=0; i<15; i++) {
                gameState.bloodParticles.push({
                    x: Math.random() * WORLD_W, y: -50,
                    vx: 0, vy: 0.1 + Math.random() * 0.2, // 进一步减慢珍珠掉落速度
                    life: 25, size: 6, color: 'white'
                });
            }
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
            eventObj.timer = 60000;
            gameState.hellTideProgress = 100;
            for(let i=0; i<3; i++) {
                gameState.portals.push({
                    x: 200 + Math.random() * (WORLD_W - 400),
                    y: 200 + Math.random() * (WORLD_H - 400),
                    hp: 500, maxHP: 500, lastSpawn: 0,
                    life: 60000 // 1分钟寿命
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
        
        // 地狱狂潮进度衰减 (独立于成长周期)
        if (gameState.hellTideProgress > 0) {
            if (!gameState.lastHellTideDecayTime) gameState.lastHellTideDecayTime = now;
            if (now - gameState.lastHellTideDecayTime > 8000) {
                gameState.hellTideProgress = Math.max(0, gameState.hellTideProgress - 10);
                gameState.lastHellTideDecayTime = now;
                if (gameState.hellTideProgress <= 0) {
                    gameState.deathCount = 0;
                    gameState.zombies.forEach((z: any) => {
                        if (z.isHell) {
                            z.hp = 0;
                            for(let i=0; i<20; i++) {
                                gameState.bloodParticles.push({ x: z.x, y: z.y, vx: (Math.random()-0.5)*15, vy: (Math.random()-0.5)*15, life: 1.5, size: Math.random()*10+5, color: 'red' });
                            }
                        }
                    });
                    showToast("地狱狂潮已平息，魔鬼鱼全部爆炸！");
                }
            }
        }
        
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

        // 事件触发
        if (now - gameState.lastEventTime > 300000) { triggerEvent(); }
        gameState.events.forEach((e: any, i: number) => {
            e.timer -= 16;
            if (e.timer <= 0) {
                gameState.events.splice(i, 1);
                if (e.name === '钓鱼事件') gameState.hooks = [];
            }
        });
        gameState.eventMessage = (gameState.events || []).map((e: any) => e.name).join('\n');

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
            ctx.strokeStyle = 'red'; ctx.lineWidth = 5;
            ctx.beginPath(); ctx.ellipse(0, 0, 50, 80, 0, 0, Math.PI*2); ctx.stroke();
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
            [...gameState.fishes, ...gameState.foodParticles].forEach((obj: any) => {
                const dist = Math.hypot(obj.x - bh.x, obj.y - bh.y);
                if (dist < bh.radius) {
                    const angle = Math.atan2(bh.y - obj.y, bh.x - obj.x);
                    obj.x += Math.cos(angle) * 5; obj.y += Math.sin(angle) * 5;
                    if (dist < 20) {
                        if (obj instanceof Fish) {
                            if (Math.random() < 0.01) {
                                gameState.fishes = gameState.fishes.filter((f: any) => f !== obj);
                                showToast("一条鱼被黑洞吞噬了！");
                            }
                        } else { obj.eaten = true; }
                    }
                }
            });
            if (gameState.waste > 0) gameState.waste = Math.max(0, gameState.waste - 5);
            gameState.waterQualityValue = Math.min(100, gameState.waterQualityValue + 0.5);

            ctx.save();
            ctx.translate(bh.x - gameState.cameraX, bh.y - gameState.cameraY);
            ctx.rotate(-now / 200);
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
                const deco = gameState.decos.find((d: any) => d.x === m.targetX && d.y === m.targetY);
                if (deco) { deco.hp -= 50; createBlood(deco.x, deco.y); showToast(`${deco.type} 遭到轰炸！`); }
                gameState.missiles.splice(i, 1);
            }
            ctx.fillStyle = 'gray'; ctx.fillRect(m.x - gameState.cameraX - 5, m.y - gameState.cameraY - 20, 10, 20);
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
            b.x += b.vx; b.y += b.vy; b.vy += 0.1; b.life -= 0.02;
            if(b.life <= 0) { gameState.bloodParticles.splice(i,1); return; }
            ctx.fillStyle = b.color || `rgba(255,0,0,${b.life})`; ctx.beginPath(); ctx.arc(b.x - gameState.cameraX, b.y - gameState.cameraY, b.size || 3, 0, Math.PI*2); ctx.fill();
        });

        document.getElementById('coins')!.textContent = Math.floor(gameState.coins).toString();
        document.getElementById('mPoints')!.textContent = Math.floor(gameState.mutantPoints).toString();
        const nurtureEl = document.getElementById('nurture');
        if (nurtureEl) nurtureEl.textContent = Math.floor(gameState.nurture || 0).toString();
        document.getElementById('capacity')!.textContent = gameState.fishes.length.toString();
        document.getElementById('maxCapacity')!.textContent = gameState.maxFishes.toString();
        document.getElementById('treasure')!.textContent = gameState.treasure.toString();
        
        // 计算水质
        const wasteFactor = (gameState.nurture / 2000) * 100;
        // 降低没吃完鱼粮对水质的影响一大半 (原 100 降为 250)
        const foodFactor = (gameState.foodParticles.length / 250) * 100;
        const totalPollution = Math.min(100, wasteFactor + foodFactor);
        gameState.waterQualityValue = 100 - totalPollution;
        if (gameState.waterQualityValue < 30) gameState.waterQuality = "恶劣";
        else if (gameState.waterQualityValue < 60) gameState.waterQuality = "一般";
        else if (gameState.waterQualityValue < 85) gameState.waterQuality = "良好";
        else gameState.waterQuality = "清澈";
        gameState.waterFactors = `鱼便:${Math.floor(wasteFactor)}% 残饵:${Math.floor(foodFactor)}%`;

        const waterEl = document.getElementById('water-quality');
        if (waterEl) {
            waterEl.innerHTML = `${gameState.waterQuality} (${Math.floor(gameState.waterQualityValue)})<br/><span style="font-size:10px; opacity:0.8">影响因素: ${gameState.waterFactors || '无'}</span>`;
            waterEl.className = 'font-bold ' + (gameState.waterQuality === '良好' ? 'text-green-400' : gameState.waterQuality === '普通' ? 'text-yellow-400' : gameState.waterQuality === '浑浊' ? 'text-orange-400' : 'text-red-500');
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
        const hellTideEl = document.getElementById('helltide-bar');
        if (hellTideEl) {
            const progress = Math.min(100, (gameState.hellTideProgress / 10) * 100);
            hellTideEl.style.width = progress + '%';
        }

        if (gameState.selectedItem && gameState.selectedItem.type === 'fish') {
            const f = gameState.selectedItem.obj;
            document.getElementById('val-hp')!.textContent = Math.floor(f.hp).toString();
            document.getElementById('val-hpMax')!.textContent = Math.floor(f.maxHP).toString();
            (document.getElementById('bar-hp') as HTMLElement).style.width = (f.hp / f.maxHP * 100) + '%';
            document.getElementById('val-growth')!.textContent = Math.floor(f.growthValue).toString();
            (document.getElementById('bar-growth') as HTMLElement).style.width = Math.min(100, (f.growthValue/f.maxGrowth*100)) + '%';
            
            const nextLevelXP = (f.level || 1) * 50;
            (document.getElementById('bar-xp') as HTMLElement).style.width = Math.min(100, (f.xp / nextLevelXP * 100)) + '%';
            document.getElementById('val-xp')!.textContent = f.xp.toString();
            document.getElementById('val-xpMax')!.textContent = nextLevelXP.toString();

            const infoEl = document.getElementById('fish-extra-info');
            if (infoEl) {
                const affixes = f.affixes || [];
                infoEl.innerHTML = `词缀: ${affixes.join(', ') || '无'}`;
            }
        }
        requestAnimationFrame(loop);
    }

    (window as any).showShop = () => { document.getElementById('shopPanel')!.style.display='block'; (window as any).switchTab('fish'); };
    (window as any).switchTab = (tab: string) => {
        gameState.currentTab = tab;
        document.getElementById('tab-fish')!.className = tab === 'fish' ? 'tab-btn active' : 'tab-btn';
        document.getElementById('tab-deco')!.className = tab === 'deco' ? 'tab-btn active' : 'tab-btn';
        document.getElementById('tab-special')!.className = tab === 'special' ? 'tab-btn active' : 'tab-btn';
        renderShop();
    };

    function renderShop() {
        const grid = document.getElementById('shopGrid')!; grid.innerHTML = '';
        let cfg = gameState.currentTab === 'fish' ? FISH_CONFIG : (gameState.currentTab === 'deco' ? DECO_CONFIG : SPECIAL_FISH);
        for (let name in cfg) {
            const btn = document.createElement('button');
            const price = cfg[name].mPrice !== undefined ? cfg[name].mPrice : cfg[name].price;
            const isM = cfg[name].mPrice !== undefined;
            btn.textContent = `${name} (${price}${isM?'点':'金'})`;
            btn.onclick = () => {
                if (isM) {
                    if (gameState.mutantPoints >= price && gameState.fishes.length < gameState.maxFishes) {
                        gameState.mutantPoints -= price; gameState.fishes.push(new Fish({type: name})); saveGame();
                    } else if(gameState.mutantPoints < price) showToast("突变点不足");
                } else if (gameState.coins >= price) {
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
        const list = document.getElementById('extractionList')!; list.innerHTML = '';
        gameState.fishes.forEach((f: any, idx: number) => {
            if (f.variant > 0 && !f.isEgg) {
                const points = Math.floor(f.growthValue / 10 * (1 + f.variant * 0.2));
                const cost = f.growthValue * 5;
                const item = document.createElement('div');
                item.className = 'extract-item';
                item.innerHTML = `<div><b>${f.type} (V${f.variant})</b><br>可得: ${points}点 | 需: ${cost}金</div>
                                  <button onclick="doExtract(${idx})" style="background:#9b59b6">榨取</button>`;
                list.appendChild(item);
            }
        });
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

    function openInfoPanel() {
        const breedBtn = document.getElementById('btn-breed') as HTMLButtonElement;
        const repairBtn = document.getElementById('btn-repair') as HTMLButtonElement;
        const item = gameState.selectedItem;
        const fishUI = document.getElementById('fishOnlyStats')!;
        if (item.type === 'fish') {
            const f = item.obj;
            const vNames = ["普通", "变异1级", "变异2级", "变异3级土豪金", "变异4级暗金", "变异5级幻彩"];
            document.getElementById('itemName')!.textContent = `${vNames[f.variant] || '高级变异'} ${f.type}`;
            const bPrice = (FISH_CONFIG[f.type] ? FISH_CONFIG[f.type].price : 100);
            let nYield = Math.max(1, Math.floor(6 - (bPrice / 100)));
            if (f.variant >= 3) nYield = Math.max(1, Math.floor(nYield * 0.5));
            let coinInfo = "";
            if (f.isSpecial) {
                nYield = Math.max(1, Math.floor(nYield * 0.1));
                const cYield = Math.floor(bPrice * 0.05);
                coinInfo = `<br><span style="color:#FFD700; font-weight:bold;">金币收益: +${cYield} / 周期</span>`;
            }
            document.getElementById('itemGen')!.innerHTML = `
                <div style="font-size: 24px; font-weight: bold; color: #FF9900; margin-bottom: 5px;">Lv.${f.level}</div>
                <div style="font-size: 12px; color: #888;">生态贡献: ${nYield} 养料/周期 ${coinInfo}</div>
                <div style="font-size: 12px; color: #aaa;">第 ${f.generation} 代</div>
            `;
            fishUI.style.display = 'block';
            document.getElementById('val-hunger')!.textContent = f.hunger.toString();
            (document.getElementById('bar-hunger') as HTMLElement).style.width = (f.hunger * 10) + '%';
            document.getElementById('val-growthMax')!.textContent = Math.floor(f.maxGrowth).toString();
            document.getElementById('val-price')!.textContent = f.getSellPrice().toString();
            document.getElementById('kill-count-box')!.style.display = f.isSpecial ? 'block' : 'none';
            document.getElementById('val-kills')!.textContent = f.kills.toString();
            document.getElementById('skill-box')!.style.display = f.isSpecial ? 'block' : 'none';
            document.getElementById('btn-sell')!.style.display = 'inline-block';
            repairBtn.style.display = 'none';
            if (f.isSpecial || f.isEgg) { breedBtn.style.display = 'none'; } else {
                breedBtn.style.display = 'inline-block';
                const cost = Math.floor(f.getSellPrice() * 0.6);
                const isGrowthReady = (f.growthValue / f.maxGrowth) >= 0.5;
                if (f.hasBred) { breedBtn.textContent = "已繁殖过"; breedBtn.disabled = true; breedBtn.style.background = "#777"; }
                else if (!isGrowthReady) { breedBtn.textContent = "成长不足50%"; breedBtn.disabled = true; breedBtn.style.background = "#777"; }
                else { breedBtn.textContent = `繁殖 (${cost}金)`; breedBtn.disabled = false; breedBtn.style.background = "#3498db"; }
            }
        } else {
            const d = item.obj;
            const currentConsume = 20 + (d.level - 1) * 5;
            const isWorking = gameState.nurture >= 50;
            const statusStyle = isWorking ? "color:#2ecc71" : "color:#ff4444; font-weight:bold;";
            const statusText = isWorking ? "● 生机勃勃" : "● 养料贫瘠 (增益失效)";
            document.getElementById('itemName')!.textContent = `Lv.${d.level} ${d.type}`;
            let effectText = "装饰摆件";
            if (d.type === '海草') effectText = `<span style="color:#2ecc71">每周期健康恢复 +${d.level}</span>`;
            else if (d.type === '腊肉') effectText = `<span style="color:#e74c3c">饥荒：每个周期饥饿度-${d.level}, 成长-${d.level*5}</span>`;
            else if (d.type === '佛像') effectText = `<span style="color:#f1c40f">撒金币 +${d.level * 20} / 周期</span>`;
            else if (d.type === '李老师') effectText = `<span style="color:#3498db">饥饿度转化的成长值 +${d.level}</span>`;
            const progressDisplay = d.level >= 5 ? `<span style="color:#f1c40f;">等级已封顶</span>` : `养料经验: ${d.nurtureEaten} / ${d.level * 200}`;
            document.getElementById('itemGen')!.innerHTML = `<div style="${statusStyle}; font-size:13px; margin-bottom:4px;">${statusText}</div>${effectText}<br><span style="color:#666; font-size:12px;">每周期消耗: ${currentConsume} 养料</span><br><span style="color:#aaa; font-size:12px;">${progressDisplay}</span>`;
            fishUI.style.display = 'none'; document.getElementById('skill-box')!.style.display = 'none';
            const basePrice = DECO_CONFIG[d.type].price;
            const finalPrice = Math.floor((basePrice + (d.level - 1) * 20) * 0.95);
            document.getElementById('val-price')!.textContent = finalPrice.toString();
            document.getElementById('btn-sell')!.style.display = 'inline-block';
            
            breedBtn.style.display = 'none';
            repairBtn.style.display = 'inline-block';
            const hpLoss = d.maxHP - d.hp;
            const repairCost = Math.floor((hpLoss / d.maxHP) * basePrice);
            repairBtn.textContent = `手动修复 (${repairCost}金)`;
            repairBtn.disabled = hpLoss <= 0;
            repairBtn.style.background = hpLoss > 0 ? "#2ecc71" : "#777";
        }
        if (item.type === 'fish' && item.obj.isEgg) {
            document.getElementById('itemName')!.textContent = `受精的鱼卵 (${item.obj.type})`;
            document.getElementById('itemGen')!.textContent = `孵化中...`;
            fishUI.style.display = 'none'; document.getElementById('btn-sell')!.style.display = 'none';
        }
        document.getElementById('panel')!.style.display = 'block';
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
            gameState.coins -= gameState.capUpgradeCost; gameState.maxFishes++; gameState.capUpgradeCost += 100; saveGame(); (window as any).openMaintenance();
        } else if(gameState.coins < gameState.capUpgradeCost) showToast("金币不足");
    };

    (window as any).upgradeDecoSpace = () => {
        if(!gameState.maxDecos) gameState.maxDecos = 2;
        if(!gameState.decoUpgradeCost) gameState.decoUpgradeCost = 300;
        if (gameState.maxDecos >= DECO_LIMIT) { showToast(`摆件位已达上限 (${DECO_LIMIT})`); return; }
        if (gameState.coins >= gameState.decoUpgradeCost) {
            gameState.coins -= gameState.decoUpgradeCost; gameState.maxDecos++; gameState.decoUpgradeCost += 100; showToast("摆件空间已扩展！"); saveGame(); (window as any).openMaintenance();
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

      <div id="ui-container">
          <div id="ui-info">
               <div className="info-row">水质: <span id="water-quality" className="text-green-400 font-bold">良好</span> <span id="water-quality-detail" style={{fontSize:'10px', color:'#aaa', marginLeft:'5px'}}></span></div>
               <div className="info-row">金币: <span id="coins">0</span></div>
               <div className="info-row">鱼数: <span id="capacity">0</span>/<span id="maxCapacity">0</span></div>
          </div>
           <div id="ui-buttons">
           <button onClick={() => (window as any).showShop()}>商店</button>
           <button onClick={() => (window as any).openMaintenance()} style={{background:'#3498db'}}>鱼缸升级</button>
           </div>
      </div>

      <div id="mPoint-display" onClick={() => (window as any).toggleExtraction()} style={{cursor:'pointer'}}>
          突变点: <span id="mPoints">0</span>
          <span style={{fontSize:'10px', marginLeft:'5px', color:'#9b59b6'}}>(点击榨取)</span>
      </div>
      <div id="nurture-display">
          鱼屎: <span id="nurture">0</span>
      </div>
      <div id="treasure-box" onClick={() => (window as any).openTreasure()}>大撒币: <span id="treasure">0</span>/500</div>

      <button id="btn-cut-hook" onClick={() => (window as any).cutHook()} style={{display: 'none', position: 'absolute', bottom: '100px', left: '50%', transform: 'translateX(-50%)', background: '#e74c3c', color: 'white', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', zIndex: 100}}>剪断鱼线！</button>

      {/* 事件提示 */}
      <div id="event-msg" className="absolute top-20 left-1/2 -translate-x-1/2 bg-red-600/80 text-white px-6 py-2 rounded-lg font-bold text-xl border-2 border-white animate-pulse z-50 pointer-events-none whitespace-pre-line text-center" style={{display: 'none'}}>
          事件进行中
      </div>

      <div id="shopPanel">
          <div className="close-x" onClick={() => closeAll()}>&times;</div>
          <div className="tab-header">
              <button id="tab-fish" className="tab-btn active" onClick={() => (window as any).switchTab('fish')}>购买鱼类</button>
              <button id="tab-deco" className="tab-btn" onClick={() => (window as any).switchTab('deco')}>购买摆件</button>
              <button id="tab-special" className="tab-btn" onClick={() => (window as any).switchTab('special')} style={{color:'#9b59b6'}}>突变商店</button>
          </div>
          <div id="shopGrid" className="shop-grid"></div>
          <br/><button onClick={() => (document.querySelectorAll('#panel, #shopPanel, #extractionPanel, #maintenancePanel') as any).forEach((p: any) => p.style.display='none')} style={{background:'#777', width: '100%'}}>关闭</button>
      </div>

      <div id="maintenancePanel">
          <div className="close-x" onClick={() => closeAll()}>&times;</div>
          <h3 style={{color:'#3498db', marginTop:0, borderBottom: '1px solid #3498db', paddingBottom: '10px'}}>鱼缸强化中心</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px', margin: '20px 0'}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(255,255,255,0.1)', padding:'10px', borderRadius:'8px'}}>
                  <div style={{textAlign:'left'}}>
                      <div style={{fontSize:'14px', color:'#aaa'}}>鱼粮升级</div>
                      <div style={{fontWeight:'bold'}}>Lv.<span id="ui-feed-lv">1</span></div>
                  </div>
                  <button id="btn-up-feed" onClick={() => (window as any).upgradeFeed()} style={{padding:'8px 12px', background:'#2ecc71'}}>升级</button>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(255,255,255,0.1)', padding:'10px', borderRadius:'8px'}}>
                  <div style={{textAlign:'left'}}>
                      <div style={{fontSize:'14px', color:'#aaa'}}>鱼缸容量</div>
                      <div style={{fontWeight:'bold'}}><span id="ui-cap-lv">3</span> 条</div>
                  </div>
                  <button id="btn-up-cap" onClick={() => (window as any).upgradeCapacity()} style={{padding:'8px 12px', background:'#e67e22'}}>升级</button>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(255,255,255,0.1)', padding:'10px', borderRadius:'8px'}}>
                  <div style={{textAlign:'left'}}>
                      <div style={{fontSize:'14px', color:'#aaa'}}>摆件空间</div>
                      <div style={{fontWeight:'bold'}}><span id="ui-deco-lv">2</span> 位</div>
                  </div>
                  <button id="btn-up-deco" onClick={() => (window as any).upgradeDecoSpace()} style={{padding:'8px 12px', background:'#9b59b6'}}>扩展</button>
              </div>
          </div>
          <button onClick={() => (document.querySelectorAll('#panel, #shopPanel, #extractionPanel, #maintenancePanel') as any).forEach((p: any) => p.style.display='none')} style={{background:'#777', width: '100%', padding:'10px', borderRadius:'5px'}}>返回鱼缸</button>
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

      <div id="extractionPanel">
          <div className="close-x" onClick={() => closeAll()}>&times;</div>
          <h3 style={{color:'#9b59b6'}}>变异鱼突变点榨取</h3>
          <p style={{fontSize:'12px', color:'#aaa'}}>比例: 10成长值=1突变点 | 消耗: 1成长值=5金币</p>
          <div id="extractionList" style={{textAlign:'left'}}></div>
          <br/><button onClick={() => (document.querySelectorAll('#panel, #shopPanel, #extractionPanel, #maintenancePanel') as any).forEach((p: any) => p.style.display='none')} style={{background:'#777', width: '100%'}}>关闭</button>
      </div>
    </div>
  );
}
