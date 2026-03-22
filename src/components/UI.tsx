import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coins, Fish, Settings, ShoppingBag, Zap, TrendingUp, X, Info, Trophy, Droplets, Clock } from 'lucide-react';
import { GameState, TabType, FishData, DecoData, FishConfig, DecoConfig } from '../types';
import { FISH_CONFIG, DECO_CONFIG, SPECIAL_FISH, ACHIEVEMENTS } from '../constants';

interface UIProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  fishes: FishData[];
  setFishes: React.Dispatch<React.SetStateAction<FishData[]>>;
  decos: DecoData[];
  setDecos: React.Dispatch<React.SetStateAction<DecoData[]>>;
  showShop: boolean;
  setShowShop: (show: boolean) => void;
  showMaintenance: boolean;
  setShowMaintenance: (show: boolean) => void;
  showExtraction: boolean;
  setShowExtraction: (show: boolean) => void;
  selectedItem: { type: 'fish' | 'deco'; obj: any } | null;
  setSelectedItem: (item: { type: 'fish' | 'deco'; obj: any } | null) => void;
  showToast: (msg: string) => void;
  cutHook: () => void;
}

const UI: React.FC<UIProps> = ({
  gameState,
  setGameState,
  fishes,
  setFishes,
  decos,
  setDecos,
  showShop,
  setShowShop,
  showMaintenance,
  setShowMaintenance,
  showExtraction,
  setShowExtraction,
  selectedItem,
  setSelectedItem,
  showToast,
  cutHook,
}) => {
  const [currentTab, setCurrentTab] = React.useState<TabType>('fish');

  const upgradeFeed = () => {
    if (gameState.coins >= gameState.upgradeFeedCost && gameState.feedCount < 5) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - prev.upgradeFeedCost,
        feedCount: prev.feedCount + 1,
        upgradeFeedCost: prev.upgradeFeedCost + 10
      }));
    } else showToast("金币不足或已达上限");
  };

  const upgradeCapacity = () => {
    if (gameState.coins >= gameState.capUpgradeCost && gameState.maxFishes < 20) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - prev.capUpgradeCost,
        maxFishes: prev.maxFishes + 1,
        capUpgradeCost: prev.capUpgradeCost + 20
      }));
    } else showToast("金币不足或已达上限");
  };

  const upgradeDecoSpace = () => {
    if (gameState.coins >= gameState.decoUpgradeCost && gameState.maxDecos < 7) {
      setGameState(prev => ({
        ...prev,
        coins: prev.coins - prev.decoUpgradeCost,
        maxDecos: prev.maxDecos + 1,
        decoUpgradeCost: prev.decoUpgradeCost + 20
      }));
    } else showToast("金币不足或已达上限");
  };

  const buyItem = (name: string, config: any) => {
    const price = config.mPrice !== undefined ? config.mPrice : config.price;
    const isM = config.mPrice !== undefined;

    if (isM) {
      if (gameState.mutantPoints >= price && fishes.length < gameState.maxFishes) {
        setGameState(prev => ({ 
          ...prev, 
          mutantPoints: prev.mutantPoints - price,
          discoveredSpecies: prev.discoveredSpecies.includes(name) ? prev.discoveredSpecies : [...prev.discoveredSpecies, name]
        }));
        setFishes(prev => [...prev, {
          type: name,
          variant: 0,
          generation: 1,
          kills: 0,
          lastSkillTime: 0,
          maxGrowth: 120,
          growthValue: 0,
          hp: 10,
          maxHP: 10,
          x: Math.random() * 1000 + 100,
          y: Math.random() * 500 + 100,
          vx: 1, vy: 1,
          isEgg: false,
          spawnTime: Date.now(),
          hunger: 10
        }]);
      } else showToast("点数不足或鱼缸已满");
    } else if (gameState.coins >= price) {
      if (currentTab === 'fish' && fishes.length < gameState.maxFishes) {
        setGameState(prev => ({ 
          ...prev, 
          coins: prev.coins - price,
          discoveredSpecies: prev.discoveredSpecies.includes(name) ? prev.discoveredSpecies : [...prev.discoveredSpecies, name]
        }));
        setFishes(prev => [...prev, {
          type: name,
          variant: 0,
          generation: 1,
          kills: 0,
          lastSkillTime: 0,
          maxGrowth: 120,
          growthValue: 0,
          hp: 10,
          maxHP: 10,
          x: Math.random() * 1000 + 100,
          y: Math.random() * 500 + 100,
          vx: 1, vy: 1,
          isEgg: false,
          spawnTime: Date.now(),
          hunger: 10
        }]);
      } else if (currentTab === 'deco' && decos.length < gameState.maxDecos) {
        setGameState(prev => ({ ...prev, coins: prev.coins - price }));
        setDecos(prev => [...prev, {
          type: name,
          x: Math.random() * 1000 + 100,
          y: 700,
          level: 1,
          nurtureEaten: 0,
          hp: 100 + (1 * 50),
          maxHP: 100 + (1 * 50)
        }]);
      } else showToast("金币不足或空间已满");
    } else showToast("金币不足");
  };

  const doExtract = (idx: number) => {
    const f = fishes[idx];
    const points = Math.floor(f.growthValue / 10 * (1 + f.variant * 0.2));
    const cost = f.growthValue * 5;
    if (gameState.coins >= cost) {
      setGameState(prev => ({ ...prev, coins: prev.coins - cost, mutantPoints: prev.mutantPoints + points }));
      setFishes(prev => {
        const newFishes = [...prev];
        newFishes[idx] = { ...newFishes[idx], growthValue: 0 };
        return newFishes;
      });
      showToast("榨取成功！");
    } else showToast("金币不足");
  };

  const manualBreed = () => {
    if (!selectedItem || selectedItem.type !== 'fish') return;
    const f = selectedItem.obj as FishData;
    const now = Date.now();
    const cooldown = 600000; 
    if (now - gameState.lastManualBreedTime < cooldown) {
      const minutesLeft = Math.ceil((cooldown - (now - gameState.lastManualBreedTime)) / 60000);
      showToast(`繁殖中心冷却中，还需 ${minutesLeft} 分钟`);
      return;
    }

    const currentGrowthPercent = f.growthValue / f.maxGrowth;
    if (currentGrowthPercent < 0.5) { showToast("成长值未达 50%"); return; }
    if (f.hasBred) { showToast("该鱼已繁殖过"); return; }
    if (fishes.length >= gameState.maxFishes) { showToast("鱼缸已满"); return; }

    const base = FISH_CONFIG[f.type]?.price || 10;
    let p = f.growthValue <= 100 ? (base * 0.5 + (base * (f.growthValue / 100))) : (base * 1.5 + (f.growthValue - 100));
    let sellPrice = Math.floor(p * (1 + f.variant * 0.20) * (1 + (f.generation - 1) * 0.10));
    const cost = Math.floor(sellPrice * 0.6);
    
    if (gameState.coins < cost) { showToast(`金币不足 (需${cost}金)`); return; }

    setGameState(prev => ({ ...prev, coins: prev.coins - cost, lastManualBreedTime: now }));
    setFishes(prev => prev.map(item => item === f ? { ...item, hasBred: true } : item));

    let chance = 0.15 - (f.variant * 0.030); 
    let newV = Math.random() < chance ? Math.min(5, f.variant + 1) : f.variant;

    setFishes(prev => [...prev, {
      type: f.type,
      variant: newV,
      generation: f.generation + 1,
      kills: 0,
      lastSkillTime: 0,
      maxGrowth: 120 + (newV * 25) + ((f.generation + 1) * 25),
      growthValue: 0,
      hp: 10,
      maxHP: 10,
      x: f.x + 20,
      y: f.y + 20,
      vx: 1, vy: 1,
      isEgg: true,
      spawnTime: Date.now(),
      hunger: 10
    }]);

    showToast("产卵成功！");
    setSelectedItem(null);
  };

  const repairDeco = () => {
    if (!selectedItem || selectedItem.type !== 'deco') return;
    const d = selectedItem.obj as DecoData;
    const basePrice = DECO_CONFIG[d.type].price;
    const hpLoss = d.maxHP - d.hp;
    const cost = Math.floor((hpLoss / d.maxHP) * basePrice * 0.1);
    
    if (gameState.coins >= cost) {
      setGameState(prev => ({ ...prev, coins: prev.coins - cost }));
      setDecos(prev => prev.map(item => item === d ? { ...item, hp: item.maxHP } : item));
      showToast(`${d.type} 已修复！`);
      setSelectedItem(null);
    } else showToast(`金币不足 (需${cost}金)`);
  };

  const [showEncyclopedia, setShowEncyclopedia] = React.useState(false);
  const [showAchievements, setShowAchievements] = React.useState(false);

  const getSellPrice = (f: FishData) => {
    if (f.isSpecial) return 300 + Math.floor(f.growthValue * 2);
    const base = FISH_CONFIG[f.type]?.price || 10;
    let p = f.growthValue <= 100 ? (base * 0.5 + (base * (f.growthValue / 100))) : (base * 1.5 + (f.growthValue - 100));
    return Math.floor(p * (1 + f.variant * 0.20) * (1 + (f.generation - 1) * 0.10));
  };

  const sellItem = () => {
    if (!selectedItem) return;
    if (selectedItem.type === 'fish') {
      const f = selectedItem.obj as FishData;
      const price = getSellPrice(f);
      setGameState(prev => ({ ...prev, coins: prev.coins + price }));
      setFishes(prev => prev.filter(item => item !== f));
      showToast(`卖出成功！获得 ${price} 金币`);
    } else {
      const d = selectedItem.obj as DecoData;
      const price = Math.floor((DECO_CONFIG[d.type]?.price || 0) * 0.5);
      setGameState(prev => ({ ...prev, coins: prev.coins + price }));
      setDecos(prev => prev.filter(item => item !== d));
      showToast(`卖出成功！获得 ${price} 金币`);
    }
    setSelectedItem(null);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Helltide Progress */}
      {gameState.hellTideProgress > 0 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-64 h-4 bg-gray-900 rounded-full border border-red-500 overflow-hidden z-50">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${gameState.hellTideProgress}%` }}
            className="h-full bg-red-600 shadow-[0_0_10px_#ff0000]"
          />
          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-white font-bold uppercase tracking-widest">地狱狂潮进度</div>
        </div>
      )}

      {/* Event Message */}
      <AnimatePresence>
        {gameState.events.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-1/2 -translate-x-1/2 bg-red-600/80 text-white px-6 py-2 rounded-lg font-bold text-xl border-2 border-white animate-pulse z-50 pointer-events-none whitespace-pre-line text-center"
          >
            {gameState.events.map((e: any) => e.name).join('\n')}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Left Info */}
      <div className="absolute top-4 left-4 pointer-events-auto flex flex-col gap-2">
        <div className="bg-black/60 backdrop-blur-md p-4 rounded-3xl border border-white/10 shadow-2xl flex items-center gap-4">
          <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1.5 rounded-full border border-yellow-500/30">
            <Coins className="text-yellow-500" size={18} />
            <span className="text-yellow-500 font-black font-mono">{gameState.coins}</span>
          </div>
          <button 
            onClick={() => setShowExtraction(true)}
            className="flex flex-col items-center bg-purple-500/20 px-4 py-1.5 rounded-2xl border border-purple-500/30 hover:bg-purple-500/30 transition-all"
          >
            <div className="flex items-center gap-2">
              <Zap className="text-purple-400" size={16} />
              <span className="text-purple-400 font-black font-mono">突变点: {gameState.mutantPoints}</span>
            </div>
            <span className="text-[9px] text-purple-300/70 font-bold uppercase tracking-tighter">点击榨取</span>
          </button>
          <button 
            onClick={() => setShowShop(true)}
            className="flex items-center gap-2 bg-blue-500/20 px-3 py-1.5 rounded-full border border-blue-500/30 hover:bg-blue-500/30 transition-all"
          >
            <ShoppingBag className="text-blue-400" size={18} />
            <Fish className="text-blue-400" size={18} />
            <span className="text-blue-400 font-black font-mono">{fishes.length}/{gameState.maxFishes}</span>
          </button>
        </div>
        
        <div className="flex flex-col gap-1">
          <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-3">
            <Droplets className={gameState.waterQualityValue < 30 ? "text-red-500 animate-pulse" : "text-blue-400"} size={16} />
            <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all" style={{ width: `${gameState.waterQualityValue}%` }} />
            </div>
            <button 
              onClick={() => setGameState(prev => ({ ...prev, waterQualityValue: 100, coins: Math.max(0, prev.coins - 10) }))}
              className="text-[10px] bg-blue-600 hover:bg-blue-500 text-white px-2 py-1 rounded-lg font-bold"
            >
              清洗 (10金)
            </button>
          </div>
          <div className="px-4 text-[10px] text-zinc-400 font-bold flex gap-3">
             <span>水质: {gameState.waterQuality}</span>
             <span>影响因素: 鱼屎:{Math.floor(gameState.waste)} ({Math.floor(gameState.waste/20)}%) 残饵:{gameState.foodParticles.length} ({Math.floor(gameState.foodParticles.length*10/20)}%)</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 pointer-events-auto flex flex-col gap-3">
        <button onClick={() => setShowAchievements(true)} className="p-4 bg-yellow-600 hover:bg-yellow-500 text-white rounded-2xl shadow-lg transition-all active:scale-95 flex items-center gap-2">
          <Trophy size={20} />
          <span className="font-bold">成就</span>
        </button>
        <button onClick={() => setShowEncyclopedia(true)} className="p-4 bg-zinc-700 hover:bg-zinc-600 text-white rounded-2xl shadow-lg transition-all active:scale-95 flex items-center gap-2">
          <Info size={20} />
          <span className="font-bold">图鉴</span>
        </button>
      </div>

      {/* Treasure Box */}
      <div 
        onClick={() => { setGameState(prev => ({ ...prev, coins: prev.coins + prev.treasure, treasure: 0 })); }}
        className="absolute bottom-8 right-8 pointer-events-auto bg-black/80 border-2 border-yellow-500 p-4 rounded-2xl text-yellow-500 cursor-pointer hover:scale-105 transition-all shadow-2xl flex flex-col items-center"
      >
        <div className="text-xs uppercase tracking-widest opacity-70 mb-1">大撒币</div>
        <div className="text-2xl font-black">{gameState.treasure} / 500</div>
      </div>

      {/* Cut Hook Button */}
      {gameState.hooks && gameState.hooks.length > 0 && (
        <button 
          onClick={cutHook}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-auto bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-xl font-black text-lg shadow-2xl border-2 border-white/20 animate-bounce"
        >
          剪断鱼线！
        </button>
      )}

      {/* Modals */}
      <AnimatePresence>
        {showShop && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/40 backdrop-blur-sm"
          >
            <div className="bg-zinc-900 border-2 border-yellow-500 p-8 rounded-3xl w-full max-w-2xl shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-yellow-500">水族商店</h2>
                <button onClick={() => setShowShop(false)} className="text-zinc-400 hover:text-white"><X /></button>
              </div>
              
              <div className="flex gap-2 mb-6">
                {(['fish', 'deco', 'upgrade'] as TabType[]).map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setCurrentTab(tab)}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${currentTab === tab ? 'bg-yellow-500 text-black' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}
                  >
                    {tab === 'fish' ? '普通鱼类' : tab === 'deco' ? '装饰摆件' : '鱼缸升级'}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {currentTab === 'upgrade' ? (
                  <>
                    <button onClick={upgradeCapacity} className="bg-zinc-800 p-4 rounded-2xl border border-white/5 hover:border-yellow-500/50 transition-all flex flex-col items-center gap-2">
                      <div className="text-center">
                        <div className="font-bold text-white">鱼缸扩容</div>
                        <div className="text-sm text-yellow-500 font-mono">{gameState.capUpgradeCost} 金</div>
                        <div className="text-[10px] text-zinc-500 mt-1">当前上限: {gameState.maxFishes}</div>
                      </div>
                    </button>
                    <button onClick={upgradeFeed} className="bg-zinc-800 p-4 rounded-2xl border border-white/5 hover:border-yellow-500/50 transition-all flex flex-col items-center gap-2">
                      <div className="text-center">
                        <div className="font-bold text-white">饲料上限</div>
                        <div className="text-sm text-yellow-500 font-mono">{gameState.upgradeFeedCost} 金</div>
                        <div className="text-[10px] text-zinc-500 mt-1">当前上限: {gameState.feedCount}</div>
                      </div>
                    </button>
                    <button onClick={upgradeDecoSpace} className="bg-zinc-800 p-4 rounded-2xl border border-white/5 hover:border-yellow-500/50 transition-all flex flex-col items-center gap-2">
                      <div className="text-center">
                        <div className="font-bold text-white">摆件位扩容</div>
                        <div className="text-sm text-yellow-500 font-mono">{gameState.decoUpgradeCost} 金</div>
                        <div className="text-[10px] text-zinc-500 mt-1">当前上限: {gameState.maxDecos}</div>
                      </div>
                    </button>
                  </>
                ) : (
                  Object.entries(currentTab === 'fish' ? FISH_CONFIG : DECO_CONFIG).map(([name, config]) => {
                    const decoConfig = config as DecoConfig;
                    const price = (currentTab === 'fish' ? (config as FishConfig).price : decoConfig.price);
                    
                    return (
                      <button 
                        key={name}
                        onClick={() => buyItem(name, config)}
                        className="bg-zinc-800 p-4 rounded-2xl border border-white/5 hover:border-yellow-500/50 transition-all flex flex-col items-center gap-2 group"
                      >
                        <img src={config.src} alt={name} className="h-16 object-contain group-hover:scale-110 transition-transform" />
                        <div className="text-center">
                          <div className="font-bold text-white">{name}</div>
                          <div className="text-sm text-yellow-500 font-mono">
                            {price} 金
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </motion.div>
        )}

        {showExtraction && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/40 backdrop-blur-sm"
          >
            <div className="bg-zinc-900 border-2 border-purple-500 p-8 rounded-3xl w-full max-w-4xl shadow-2xl flex gap-6">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-purple-500 flex items-center gap-2">
                    <Zap /> 突变榨取
                  </h2>
                </div>
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {fishes.filter(f => !f.isEgg).map((f, idx) => {
                    const points = Math.floor(f.growthValue / 10 * (1 + f.variant * 0.2));
                    const cost = f.growthValue * 5;
                    return (
                      <div key={idx} className="bg-zinc-800 p-4 rounded-2xl border border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={FISH_CONFIG[f.type]?.src || SPECIAL_FISH[f.type]?.src} alt={f.type} className="h-10 w-10 object-contain" />
                          <div>
                            <div className="font-bold text-white text-sm">{f.type}</div>
                            <div className="text-[10px] text-zinc-500 uppercase">成长: {f.growthValue}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-purple-400 font-bold">+{points} 点</div>
                            <div className="text-[10px] text-zinc-500">{cost} 金</div>
                          </div>
                          <button 
                            onClick={() => doExtract(fishes.indexOf(f))}
                            disabled={f.growthValue < 10}
                            className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-xl font-bold text-xs"
                          >
                            榨取
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="w-px bg-white/10" />

              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-black text-cyan-400 flex items-center gap-2">
                    <ShoppingBag /> 突变商店
                  </h2>
                  <button onClick={() => setShowExtraction(false)} className="text-zinc-400 hover:text-white"><X /></button>
                </div>
                <div className="grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                  {Object.entries(SPECIAL_FISH).map(([name, config]) => (
                    <button 
                      key={name}
                      onClick={() => buyItem(name, config)}
                      className="bg-zinc-800 p-4 rounded-2xl border border-white/5 hover:border-cyan-500/50 transition-all flex flex-col items-center gap-2 group"
                    >
                      <img src={config.src} alt={name} className="h-16 object-contain group-hover:scale-110 transition-transform" />
                      <div className="text-center">
                        <div className="font-bold text-white text-sm">{name}</div>
                        <div className="text-xs text-cyan-400 font-mono">{config.mPrice} 点</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {showEncyclopedia && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/40 backdrop-blur-sm"
          >
            <div className="bg-zinc-900 border-2 border-zinc-500 p-8 rounded-3xl w-full max-w-3xl shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <TrendingUp className="text-yellow-500" /> 鱼类图鉴
                </h2>
                <button onClick={() => setShowEncyclopedia(false)} className="text-zinc-400 hover:text-white"><X /></button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries({ ...FISH_CONFIG, ...SPECIAL_FISH }).map(([name, config]) => {
                  const isDiscovered = gameState.discoveredSpecies.includes(name);
                  return (
                    <div key={name} className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${isDiscovered ? 'bg-zinc-800 border-white/10' : 'bg-black/50 border-white/5 grayscale opacity-50'}`}>
                      <img src={config.src} alt={name} className="h-12 object-contain" />
                      <div className="text-center">
                        <div className={`font-bold ${isDiscovered ? 'text-white' : 'text-zinc-600'}`}>{isDiscovered ? name : '???'}</div>
                        {isDiscovered && <div className="text-[10px] text-zinc-500 uppercase">已发现</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {showAchievements && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto bg-black/40 backdrop-blur-sm"
          >
            <div className="bg-zinc-900 border-2 border-yellow-500 p-8 rounded-3xl w-full max-w-2xl shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-yellow-500 flex items-center gap-2">
                  <Trophy /> 荣誉成就
                </h2>
                <button onClick={() => setShowAchievements(false)} className="text-zinc-400 hover:text-white"><X /></button>
              </div>
              
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {Object.entries(ACHIEVEMENTS).map(([id, ach]) => {
                  const isDone = gameState.achievements.includes(id);
                  return (
                    <div key={id} className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${isDone ? 'bg-yellow-500/10 border-yellow-500/50' : 'bg-zinc-800/50 border-white/5 opacity-50'}`}>
                      <div className={`p-3 rounded-xl ${isDone ? 'bg-yellow-500 text-black' : 'bg-zinc-700 text-zinc-500'}`}>
                        <Trophy size={24} />
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold ${isDone ? 'text-yellow-500' : 'text-zinc-400'}`}>{ach.title}</div>
                        <div className="text-sm text-zinc-500">{ach.desc}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-zinc-500 uppercase">奖励</div>
                        <div className="font-bold text-white">+{ach.reward} {ach.type === 'coins' ? '金币' : '突变点'}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-auto w-80"
          >
            <div className="bg-zinc-900 border-2 border-zinc-700 p-6 rounded-3xl shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black text-white">
                    {selectedItem.obj.type}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500 text-sm font-bold">Lv.{selectedItem.obj.level}</span>
                    {selectedItem.type === 'fish' && <span className="text-zinc-500 text-xs">第 {selectedItem.obj.generation} 代</span>}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedItem.type === 'fish' && selectedItem.obj.affixes.map((a: string) => (
                      <span key={a} className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                        a === '幸运' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' :
                        a === '不幸' ? 'bg-zinc-500/20 border-zinc-500 text-zinc-500' :
                        a === '狂战士' ? 'bg-red-500/20 border-red-500 text-red-500' :
                        'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                      }`}>
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setSelectedItem(null)} className="text-zinc-500 hover:text-white"><X size={20} /></button>
              </div>

              {selectedItem.type === 'fish' ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-400 uppercase">健康值</div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 transition-all" style={{ width: `${(selectedItem.obj.hp / selectedItem.obj.maxHP) * 100}%` }} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-400 uppercase">成长值</div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 transition-all" style={{ width: `${(selectedItem.obj.growthValue / selectedItem.obj.maxGrowth) * 100}%` }} />
                    </div>
                  </div>
                  <div className="bg-zinc-800/50 p-3 rounded-xl text-center">
                    <div className="text-zinc-400 text-xs uppercase mb-1">当前售价</div>
                    <div className="text-2xl font-black text-yellow-500">{getSellPrice(selectedItem.obj)} 金</div>
                  </div>

                  {/* 底部：生态贡献与移动方式 */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-zinc-800/50 p-2 rounded-xl text-center">
                      <div className="text-zinc-500 text-[10px] uppercase">生态贡献</div>
                      <div className="text-white font-bold">{FISH_CONFIG[selectedItem.obj.type]?.convert || 15}</div>
                    </div>
                    <div className="bg-zinc-800/50 p-2 rounded-xl text-center">
                      <div className="text-zinc-500 text-[10px] uppercase">移动方式</div>
                      <div className="text-white font-bold">{FISH_CONFIG[selectedItem.obj.type]?.moveMode === 'crawl' ? '爬行' : '游动'}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-zinc-400 uppercase">耐久度</div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all" style={{ width: `${(selectedItem.obj.hp / selectedItem.obj.maxHP) * 100}%` }} />
                    </div>
                  </div>
                  <div className="bg-zinc-800/50 p-3 rounded-xl">
                    <div className="text-zinc-400 text-xs uppercase mb-1">等级</div>
                    <div className="text-xl font-black text-white">Lv.{selectedItem.obj.level}</div>
                  </div>
                  <div className="text-sm text-zinc-300 italic">
                    {DECO_CONFIG[selectedItem.obj.type].src ? '提供环境加成' : ''}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-2">
                {selectedItem.type === 'fish' && !selectedItem.obj.isEgg && !selectedItem.obj.isSpecial && (
                  <button onClick={manualBreed} className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all">繁殖</button>
                )}
                {selectedItem.type === 'deco' && selectedItem.obj.hp < selectedItem.obj.maxHP && (
                  <button onClick={repairDeco} className="w-full py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all">修复</button>
                )}
                <div className="flex gap-2">
                  <button onClick={sellItem} className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl transition-all">出售</button>
                  <button onClick={() => setSelectedItem(null)} className="flex-1 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded-xl transition-all">返回</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UI;
