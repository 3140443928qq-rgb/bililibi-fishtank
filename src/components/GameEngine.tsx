import React, { useEffect, useRef, useState, useCallback } from 'react';
import { WORLD_W, WORLD_H, FISH_CONFIG, SPECIAL_FISH, DECO_CONFIG } from '../constants';
import { FishData, DecoData, Particle, GameState } from '../types';

interface GameEngineProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  fishes: FishData[];
  setFishes: React.Dispatch<React.SetStateAction<FishData[]>>;
  decos: DecoData[];
  setDecos: React.Dispatch<React.SetStateAction<DecoData[]>>;
  cameraX: number;
  setCameraX: React.Dispatch<React.SetStateAction<number>>;
  onSelectItem: (item: { type: 'fish' | 'deco'; obj: any } | null) => void;
  showToast: (msg: string) => void;
}

const GameEngine: React.FC<GameEngineProps> = ({
  gameState,
  setGameState,
  fishes,
  setFishes,
  decos,
  setDecos,
  cameraX,
  setCameraX,
  onSelectItem,
  showToast,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  
  // Refs for game objects to avoid re-renders during loop
  const fishesRef = useRef<FishData[]>(fishes);
  const decosRef = useRef<DecoData[]>(decos);
  const foodParticlesRef = useRef<Particle[]>([]);
  const bloodParticlesRef = useRef<Particle[]>([]);
  const assetsRef = useRef<Record<string, HTMLImageElement>>({});
  const bgImgRef = useRef<HTMLImageElement | null>(null);

  // Sync refs with state
  useEffect(() => { fishesRef.current = fishes; }, [fishes]);
  useEffect(() => { decosRef.current = decos; }, [decos]);

  const loadAssets = useCallback(() => {
    const allConfigs = { ...FISH_CONFIG, ...SPECIAL_FISH, ...DECO_CONFIG };
    for (const name in allConfigs) {
      if (!assetsRef.current[name]) {
        const img = new Image();
        img.src = allConfigs[name].src;
        assetsRef.current[name] = img;
      }
    }
    if (!bgImgRef.current) {
      const bg = new Image();
      bg.src = 'https://picsum.photos/seed/aquarium/1920/1080';
      bgImgRef.current = bg;
    }
  }, []);

  const createBlood = (x: number, y: number) => {
    for (let i = 0; i < 8; i++) {
      bloodParticlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
        life: 1.8,
        size: Math.random() * 4 + 2
      });
    }
  };

  const updateFish = (f: FishData, now: number) => {
    if (f.isEgg) return;

    if (f.hp <= 0) {
      if (!f.isDeadState) {
        for (let i = 0; i < 40; i++) {
          bloodParticlesRef.current.push({
            x: f.x,
            y: f.y,
            vx: (Math.random() - 0.5) * 20,
            vy: (Math.random() - 0.5) * 20,
            life: 2.5,
            size: Math.random() * 8 + 4
          });
        }
        f.isDeadState = true;
        f.deathTimer = 60;
        const s = SPECIAL_FISH[f.type] || FISH_CONFIG[f.type];
        if (s.mPrice) showToast(f.type + " 陨落了！");
      }

      if (f.deathTimer && f.deathTimer % 5 === 0) {
        createBlood(f.x, f.y);
      }

      f.opacity = (f.deathTimer || 0) / 60;
      f.deathTimer = (f.deathTimer || 0) - 1;
      f.y -= 0.8;
      f.hitFlash = 1.0;

      if (f.deathTimer <= 0) {
        fishesRef.current = fishesRef.current.filter(item => item !== f);
        setFishes([...fishesRef.current]);
      }
      return;
    }

    const s = SPECIAL_FISH[f.type] || FISH_CONFIG[f.type];
    f.maxHP = (10 + Math.floor(((s.price || 50) - 10) / 20) * 5) + Math.floor(f.growthValue / 5);
    if (f.hp > f.maxHP) f.hp = f.maxHP;

    f.vx *= 0.97;
    f.vy *= 0.97;

    const margin = 80;
    if (f.y > WORLD_H - 50) {
      f.y = WORLD_H - 50;
      f.vy *= -0.8;
    }
    if (f.x < margin) f.vx += 0.2;
    if (f.x > WORLD_W - margin) f.vx -= 0.2;
    if (f.y < margin) f.vy += 0.2;

    // Hunting and feeding logic
    let foodTarget: Particle | null = null;
    // Simplified hunting for hunter fish
    if (s.mPrice && f.hunger === 0) {
        const prey = fishesRef.current.find(p => !p.isEgg && !SPECIAL_FISH[p.type] && p.variant === 0 && Math.hypot(p.x - f.x, p.y - f.y) < 600);
        if (prey) {
            const angle = Math.atan2(prey.y - f.y, prey.x - f.x);
            f.vx += Math.cos(angle) * 0.4; f.vy += Math.sin(angle) * 0.3;
            if (Math.hypot(prey.x - f.x, prey.y - f.y) < 40 && now - (f.lastSkillTime || 0) > 3000) {
                prey.hp -= 15;
                prey.hitFlash = 1.0;
                createBlood(prey.x, prey.y);
                if (prey.hp <= 0) {
                    f.kills++;
                    f.growthValue = Math.min(f.maxGrowth, f.growthValue + 25);
                    f.hunger = Math.min(10, f.hunger + 7);
                    setGameState(prev => ({ ...prev, coins: prev.coins + (FISH_CONFIG[prey.type]?.price || 0) }));
                }
                f.lastSkillTime = now;
            }
        }
    } else if (f.hunger < 10) {
      let minDist = 800;
      foodParticlesRef.current.forEach(p => {
        if (!p.eaten) {
          let d = Math.hypot(p.x - f.x, p.y - f.y);
          if (d < minDist) {
            minDist = d;
            foodTarget = p;
          }
        }
      });
      if (foodTarget) {
        const angle = Math.atan2(foodTarget.y - f.y, foodTarget.x - f.x);
        f.vx += Math.cos(angle) * 0.15;
        f.vy += Math.sin(angle) * 0.12;
        if (Math.hypot(foodTarget.x - f.x, foodTarget.y - f.y) < 30) {
          foodTarget.eaten = true;
          f.hunger = Math.min(10, f.hunger + 1);
          f.hp = Math.min(f.maxHP, f.hp + 2);
        }
      }
    }

    if (!foodTarget) {
      f.vx += (Math.random() - 0.5) * 0.15;
      f.vy += (Math.random() - 0.5) * 0.1;
    }

    f.x += f.vx;
    f.y += f.vy;
    if (f.hitFlash && f.hitFlash > 0) f.hitFlash -= 0.05;
  };

  const draw = (ctx: CanvasRenderingContext2D, now: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    if (bgImgRef.current?.complete) {
      ctx.drawImage(bgImgRef.current, -cameraX, 0, WORLD_W, WORLD_H);
    }

    // Day/Night Filter
    const hour = gameState.timeOfDay;
    let brightness = 1;
    if (hour < 6 || hour > 18) brightness = 0.4; // Night
    else if (hour < 8) brightness = 0.4 + (hour - 6) * 0.3; // Sunrise
    else if (hour > 16) brightness = 1 - (hour - 16) * 0.3; // Sunset
    
    ctx.fillStyle = `rgba(0, 0, 50, ${1 - brightness})`;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw Decos
    decosRef.current.forEach(d => {
      const img = assetsRef.current[d.type];
      if (img?.complete) {
        const s = DECO_CONFIG[d.type];
        ctx.drawImage(img, d.x - cameraX - s.w / 2, d.y - s.h, s.w, s.h);
        
        // Auto-Feeder Logic
        if (d.type === '自动喂食器') {
          const now = Date.now();
          if (now - (gameState.lastAutoFeedTime || 0) > 10000) { // Every 10 seconds
            setGameState(prev => ({ ...prev, lastAutoFeedTime: now }));
            for (let i = 0; i < 3; i++) {
              foodParticlesRef.current.push({
                x: d.x + (Math.random() - 0.5) * 40,
                y: d.y - 100,
                vx: 0, vy: 0, life: 1, size: 4, eaten: false
              });
            }
          }
        }
      }
    });

    // Draw Food
    ctx.fillStyle = "#FFEE88";
    foodParticlesRef.current.forEach((p, i) => {
      if (p.eaten) {
        foodParticlesRef.current.splice(i, 1);
        return;
      }
      p.y < WORLD_H - 30 ? p.y += 1.5 : p.y = WORLD_H - 30;
      ctx.beginPath();
      ctx.arc(p.x - cameraX, p.y, 4, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Bubbles
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1;
    bloodParticlesRef.current.forEach((p, i) => {
      if (p.type === 'bubble') {
        p.y -= 2;
        p.x += Math.sin(now / 500) * 0.5;
        p.life -= 0.01;
        if (p.life <= 0 || p.y < 0) {
          bloodParticlesRef.current.splice(i, 1);
          return;
        }
        ctx.beginPath();
        ctx.arc(p.x - cameraX, p.y, p.size, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // Draw Blood
    bloodParticlesRef.current.forEach((b, i) => {
      if (b.type === 'bubble') return;
      b.x += b.vx;
      b.y += b.vy;
      b.vy += 0.1;
      b.life -= 0.02;
      if (b.life <= 0) {
        bloodParticlesRef.current.splice(i, 1);
        return;
      }
      ctx.fillStyle = `rgba(255,0,0,${b.life})`;
      ctx.beginPath();
      ctx.arc(b.x - cameraX, b.y, b.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw Fish
    fishesRef.current.forEach(f => {
      updateFish(f, now);
      
      // Random Bubbles
      if (Math.random() < 0.01 && !f.isEgg && f.hp > 0) {
        bloodParticlesRef.current.push({
          x: f.x, y: f.y, vx: 0, vy: 0, life: 1, size: Math.random() * 5 + 2, type: 'bubble'
        });
      }

      ctx.save();
      if (f.isEgg) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.beginPath();
        ctx.arc(f.x - cameraX, f.y, 15, 0, Math.PI * 2);
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.fill();
      } else {
        ctx.translate(f.x - cameraX, f.y);
        if (f.hitFlash && f.hitFlash > 0) {
          ctx.translate((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 12);
          ctx.filter = `brightness(2) sepia(1) hue-rotate(-50deg) saturate(5)`;
        } else {
          if (f.variant === 1) ctx.filter = 'hue-rotate(90deg)';
          else if (f.variant === 2) ctx.filter = 'hue-rotate(250deg)';
          else if (f.variant === 3) {
            ctx.filter = 'grayscale(1.3) brightness(2.6) contrast(1.8) sepia(1.2) saturate(6) hue-rotate(-10deg)';
            ctx.shadowColor = "#FFD700";
            ctx.shadowBlur = 80;
          } else if (f.variant === 4) {
            const rawBlink = (Math.sin(now / 600) + 1) / 2;
            const blink = Math.pow(rawBlink, 5);
            const hue = (now / 15) % 360;
            const br = 0.05 + blink * 2.5;
            const ct = 4 + blink * 6;
            ctx.filter = `brightness(${br}) contrast(${ct}) sepia(1) saturate(8) hue-rotate(${hue}deg)`;
            ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
            ctx.shadowBlur = 10 + blink * 100;
          } else if (f.variant >= 5) {
            const hue = (now / 15) % 360;
            ctx.filter = `hue-rotate(${hue}deg) brightness(2) saturate(4) contrast(2)`;
            ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
            ctx.shadowBlur = 40;
          }
        }

        let growthPercent = f.growthValue / f.maxGrowth;
        let sizeScale = 0.6;
        if (growthPercent >= 0.9) sizeScale = 1.1;
        else if (growthPercent >= 0.6) sizeScale = 0.9;
        else if (growthPercent >= 0.3) sizeScale = 0.6;

        ctx.scale(sizeScale, sizeScale);
        if (f.vx < 0) ctx.scale(-1, 1);

        const s = SPECIAL_FISH[f.type] || FISH_CONFIG[f.type];
        const img = assetsRef.current[f.type];
        if (img?.complete) {
          const fw = s.w / s.cols;
          const fh = s.h / s.rows;
          const renderH = 55 * (s.scale || 1);
          const renderW = renderH * (fw / fh);
          const idx = Math.floor(now / 250) % (s.cols * s.rows);
          ctx.drawImage(img, (idx % s.cols) * fw, Math.floor(idx / s.cols) * fh, fw, fh, -renderW / 2, -renderH / 2, renderW, renderH);
        }
      }
      ctx.restore();
    });
  };

  const animate = (time: number) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      draw(ctx, Date.now());
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    loadAssets();
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [loadAssets]);

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const mx = clientX - rect.left;
    const my = clientY - rect.top;
    const rx = mx + cameraX;
    const ry = my;

    let fish = fishesRef.current.find(f => Math.hypot(rx - f.x, ry - f.y) < 50);
    let deco = decosRef.current.find(d => {
      const s = DECO_CONFIG[d.type];
      return rx > d.x - s.w / 2 && rx < d.x + s.w / 2 && ry > d.y - s.h && ry < d.y;
    });

    if (fish) {
      onSelectItem({ type: 'fish', obj: fish });
    } else if (deco) {
      onSelectItem({ type: 'deco', obj: deco });
    } else if (gameState.coins >= gameState.feedCount) {
      setGameState(prev => ({ ...prev, coins: prev.coins - prev.feedCount }));
      for (let i = 0; i < gameState.feedCount; i++) {
        foodParticlesRef.current.push({
          x: rx + (Math.random() - 0.5) * 40,
          y: ry + (Math.random() - 0.5) * 40,
          vx: 0, vy: 0, life: 1, size: 4, eaten: false
        });
      }
    }
  };

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [totalMoved, setTotalMoved] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setTotalMoved(0);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    let dx = e.clientX - dragStartX;
    setTotalMoved(prev => prev + Math.abs(dx));
    setCameraX(prev => Math.max(0, Math.min(prev - dx, WORLD_W - window.innerWidth)));
    setDragStartX(e.clientX);
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (isDragging && totalMoved < 5) handleInteraction(e);
    setIsDragging(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="block cursor-grab active:cursor-grabbing"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchStart={handleInteraction}
    />
  );
};

export default GameEngine;
