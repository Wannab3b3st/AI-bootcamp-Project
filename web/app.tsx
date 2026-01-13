
import React, { useState, useEffect, useRef } from 'react';
import { MarketState, MarketStatus, MarketMetrics } from './types';
import MarketPulse from './components/MarketPulse';
import PriceForecastTable from './components/PriceForecastTable';
import PriceTrendChart from './components/PriceTrendChart';
import StructuralMetrics from './components/StructuralMetrics';
import { Icons } from './constants';

const MARKETS = [
  "aT화훼(양재)",
  "부산화훼(엄궁)",
  "부경화훼(강동)",
  "광주원예(풍암)",
  "한국화훼(음성)",
  "한국화훼(고양)",
  "영남화훼(김해)"
];

const CATEGORIES = [
  "절화",
  "관엽",
  "난",
  "춘란",
  "기타"
];

const INITIAL_STATE: MarketState = {
  selectedMarket: MARKETS[0],
  selectedCategory: CATEGORIES[0],
  currentStatus: MarketStatus.BULL,
  currentMetrics: {
    premium_ratio: 1.92,
    spread: 3200,
    low_pressure: 1450,
    unit_price: 2750,
    ma_amount: 45000,
    total_quantity: 42000
  },
  forecast: {
    t1: { max_price: 5400, mean_price: 3050, min_price: 1600 },
    t3: { max_price: 6200, mean_price: 3500, min_price: 1850 },
    t5: { max_price: 6950, mean_price: 4100, min_price: 2100 },
  },
  farmerScore: 94,
  buyerScore: 22,
  timestamp: new Date().toISOString(),
  modelMetrics: {
    mae: 142.30,
    rmse: 210.15
  }
};

const App: React.FC = () => {
  const [state, setState] = useState<MarketState>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isMarketOpen, setIsMarketOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  
  const marketRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleDataUpdate();
  }, [state.selectedMarket, state.selectedCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (marketRef.current && !marketRef.current.contains(event.target as Node)) setIsMarketOpen(false);
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) setIsCategoryOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const calculateScores = (metrics: MarketMetrics) => {
    const meanNorm = Math.min(metrics.unit_price / 6000, 1);
    const premiumNorm = Math.min(metrics.premium_ratio / 3, 1);
    const pressureNorm = Math.min(metrics.low_pressure / 3000, 1);
    
    const farmerScore = Math.floor(
      (meanNorm * 40) + (premiumNorm * 40) + ((1 - pressureNorm) * 20)
    );

    const spreadNorm = Math.min(metrics.spread / 6000, 1);
    
    const buyerScore = Math.floor(
      ((1 - meanNorm) * 40) + (pressureNorm * 40) + ((1 - spreadNorm) * 20)
    );

    return { 
      farmer: Math.min(Math.max(farmerScore, 10), 99), 
      buyer: Math.min(Math.max(buyerScore, 10), 99) 
    };
  };

  const handleDataUpdate = () => {
    setIsLoading(true);
    setTimeout(() => {
      const priceVariation = 1 + (Math.random() * 0.2 - 0.1);
      const newUnitPrice = Math.floor(state.currentMetrics.unit_price * priceVariation);
      const newSpread = Math.floor(3000 + (Math.random() * 2000));
      const newLowPressure = Math.floor(1000 + (Math.random() * 1500));
      const newPremiumRatio = 1.5 + (Math.random() * 1.5);
      const newMaAmount = Math.floor(40000 + (Math.random() * 20000));

      const nextMetrics: MarketMetrics = {
        ...state.currentMetrics,
        unit_price: newUnitPrice,
        spread: newSpread,
        low_pressure: newLowPressure,
        premium_ratio: newPremiumRatio,
        ma_amount: newMaAmount,
        total_quantity: Math.floor(newMaAmount * (0.8 + Math.random() * 0.4))
      };

      const scores = calculateScores(nextMetrics);

      setState(prev => ({
        ...prev,
        currentMetrics: nextMetrics,
        farmerScore: scores.farmer,
        buyerScore: scores.buyer,
        timestamp: new Date().toISOString(),
        currentStatus: nextMetrics.premium_ratio > 2.2 ? MarketStatus.BULL : (nextMetrics.low_pressure > 2000 ? MarketStatus.RISK : MarketStatus.STABLE)
      }));
      setIsLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-rose-100">
      <main className="min-h-screen pb-20">
        <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 md:px-10 py-5 flex flex-col md:flex-row justify-between items-center z-40 gap-4">
          <div className="flex items-center gap-10">
            <div>
              <div className="flex items-center gap-3">
                 <h1 className="text-2xl font-black text-slate-900 tracking-tight">BloomBridge AI</h1>
                 <div className="flex items-center gap-2">
                    <div className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded border border-emerald-100 flex items-center gap-1">
                      <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
                      INTELLIGENCE ACTIVE
                    </div>
                    <div className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded border border-slate-200 uppercase">
                      Ensemble Mode
                    </div>
                 </div>
              </div>
              
              <div className="flex items-center gap-6 mt-1.5">
                <div className="relative" ref={marketRef}>
                  <button onClick={() => setIsMarketOpen(!isMarketOpen)} className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest hover:text-rose-600 transition-colors">
                    Market: <span className="text-slate-900 border-b border-slate-300">{state.selectedMarket}</span>
                  </button>
                  {isMarketOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden z-50">
                      {MARKETS.map((m) => (
                        <button key={m} onClick={() => { setState(s => ({...s, selectedMarket: m})); setIsMarketOpen(false); }} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-50 transition-colors">{m}</button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="relative" ref={categoryRef}>
                  <button onClick={() => setIsCategoryOpen(!isCategoryOpen)} className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest hover:text-indigo-600 transition-colors">
                    Category: <span className="text-slate-900 border-b border-slate-300">{state.selectedCategory}</span>
                  </button>
                  {isCategoryOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-200 shadow-2xl rounded-xl overflow-hidden z-50">
                      {CATEGORIES.map((c) => (
                        <button key={c} onClick={() => { setState(s => ({...s, selectedCategory: c})); setIsCategoryOpen(false); }} className="w-full text-left px-4 py-2 text-xs font-bold hover:bg-slate-50 transition-colors">{c}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl border border-slate-100">
             <div className="text-right">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Model Training Cycle</p>
               <p className="text-xs font-bold text-slate-900">Quarterly (v2.5.Q4)</p>
             </div>
             <div className="w-px h-8 bg-slate-200"></div>
             <div className="text-left">
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Model Architecture</p>
               <p className="text-xs font-bold text-indigo-600">LSTM + LightGBM</p>
             </div>
          </div>
        </header>

        <div className={`p-6 md:p-10 max-w-[1400px] mx-auto space-y-10 transition-opacity duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
          <section className="relative">
            {isLoading && <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/10 backdrop-blur-[2px] rounded-3xl"></div>}
            <MarketPulse state={state} />
          </section>

          <section className="relative">
            {isLoading && <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/10 backdrop-blur-[2px] rounded-2xl"></div>}
            <PriceForecastTable forecast={state.forecast} />
          </section>

          <section className="relative">
            {isLoading && <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/10 backdrop-blur-[2px] rounded-2xl"></div>}
            <PriceTrendChart forecast={state.forecast} />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <StructuralMetrics metrics={state.currentMetrics} />
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">모델 신뢰도 리포트</h4>
               <div className="space-y-6">
                 <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-end mb-1">
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">LSTM Prediction Score</span>
                       <span className="text-2xl font-black text-slate-900">92.4%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500" style={{ width: '92.4%' }}></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium">시계열 추세 예측의 전반적인 정확도입니다.</p>
                 </div>

                 <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex justify-between items-end mb-1">
                       <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">LightGBM Explainability</span>
                       <span className="text-2xl font-black text-slate-900">HIGH</span>
                    </div>
                    <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                       <div className="h-full bg-emerald-500" style={{ width: '88%' }}></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium">피처 기여도 분석의 데이터 정합성 수준입니다.</p>
                 </div>

                 <div className="flex items-center gap-3 p-4 bg-indigo-50 text-indigo-700 rounded-xl border border-indigo-100">
                    <Icons.Alert className="w-4 h-4" />
                    <span className="text-[11px] font-black uppercase tracking-tight">Status: Hybrid Forecasting Active</span>
                 </div>
               </div>
            </div>
          </div>
        </div>

        <footer className="text-center py-10 border-t border-slate-200 px-6">
           <p className="text-xs text-slate-400 font-medium tracking-tight uppercase tracking-widest font-bold opacity-60">BloomBridge Intelligent Forecaster / LSTM-LightGBM Hybrid Engine</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
