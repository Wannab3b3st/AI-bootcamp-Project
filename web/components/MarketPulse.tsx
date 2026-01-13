
import React from 'react';
import { MarketStatus, MarketState } from '../types';
import { Icons } from '../constants';

interface Props {
  state: MarketState;
}

const MarketPulse: React.FC<Props> = ({ state }) => {
  const statusConfig = {
    [MarketStatus.BULL]: { color: 'bg-emerald-500 text-white', label: '상승장 (Bullish)', icon: <Icons.TrendingUp className="w-5 h-5" /> },
    [MarketStatus.STABLE]: { color: 'bg-blue-500 text-white', label: '안정세 (Stable)', icon: <Icons.Package className="w-5 h-5" /> },
    [MarketStatus.RISK]: { color: 'bg-rose-500 text-white', label: '위험군 (Risk)', icon: <Icons.Alert className="w-5 h-5" /> },
  };

  const config = statusConfig[state.currentStatus];
  
  const meanPrice = state.currentMetrics.unit_price;
  const minPrice = meanPrice - state.currentMetrics.low_pressure;
  const maxPrice = minPrice + state.currentMetrics.spread;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
      {/* Current Price Index */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 group hover:border-indigo-300 transition-all duration-500">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Market Price Range</span>
            <h3 className="text-sm font-bold text-slate-700">현재 시장 가격 대역</h3>
          </div>
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter ${config.color} shadow-lg shadow-current/10`}>
            {config.icon}
            {config.label}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center px-4 py-2 bg-rose-50 rounded-xl border border-rose-100/50">
             <span className="text-[10px] font-black text-rose-400 uppercase tracking-tight">최고가 (MAX)</span>
             <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-rose-600 tracking-tighter">{maxPrice.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-rose-300 uppercase">KRW</span>
             </div>
          </div>

          <div className="flex flex-col items-center py-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">시장 평균 단가 (MEAN)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">{meanPrice.toLocaleString()}</span>
              <span className="text-lg font-bold text-slate-300 uppercase tracking-tighter">KRW</span>
            </div>
          </div>

          <div className="flex justify-between items-center px-4 py-2 bg-slate-50 rounded-xl border border-slate-100">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">최저가 (MIN)</span>
             <div className="flex items-baseline gap-1">
                <span className="text-xl font-black text-slate-600 tracking-tighter">{minPrice.toLocaleString()}</span>
                <span className="text-[10px] font-bold text-slate-300 uppercase">KRW</span>
             </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
           <div className="flex items-center gap-2">
              <span className={`text-xs font-black ${state.currentMetrics.qty_change_ratio < 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
                {state.currentMetrics.qty_change_ratio > 0 ? '▲' : '▼'} {Math.abs(state.currentMetrics.qty_change_ratio * 100).toFixed(1)}%
              </span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">Supply Change</span>
           </div>
           <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-tighter">Spread: {state.currentMetrics.spread.toLocaleString()}</span>
        </div>
      </div>

      {/* Farmer Optimal Shipping */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-indigo-300 transition-all duration-500">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Farmer Strategic Score</span>
            <h3 className="text-sm font-bold text-slate-700">출하 최적화 지수</h3>
          </div>
          <div className="px-2 py-1 bg-rose-50 rounded text-[9px] font-black text-rose-500 border border-rose-100">
            Based on Premium & Pressure
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative h-20 w-20">
            <svg className="h-20 w-20 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="4" />
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-rose-600" strokeWidth="4" strokeDasharray={`${state.farmerScore}, 100`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-2xl font-black text-slate-900 leading-none">{state.farmerScore}</span>
            </div>
          </div>
          <div>
            <p className="text-base font-black text-slate-900 leading-tight">
               {state.farmerScore >= 90 ? '지금 즉시 출하' : state.farmerScore >= 70 ? '선별 출하 권장' : '물량 조절 필요'}
            </p>
            <div className="mt-2 space-y-1">
               <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-tight">
                  <span className="w-1 h-1 bg-emerald-400 rounded-full"></span>
                  Premium Ratio: {state.currentMetrics.premium_ratio.toFixed(2)}x
               </div>
               <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-tight">
                  <span className="w-1 h-1 bg-indigo-400 rounded-full"></span>
                  Low Pressure: {state.currentMetrics.low_pressure.toLocaleString()}
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buyer Stock Timing */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:border-blue-300 transition-all duration-500">
        <div className="flex justify-between items-start mb-6">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Buyer Stock Efficiency</span>
            <h3 className="text-sm font-bold text-slate-700">매입 효율화 점수</h3>
          </div>
          <div className="px-2 py-1 bg-blue-50 rounded text-[9px] font-black text-blue-500 border border-blue-100">
            Based on Spread & Dumping
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="relative h-20 w-20">
            <svg className="h-20 w-20 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="4" />
              <circle cx="18" cy="18" r="16" fill="none" className="stroke-blue-600" strokeWidth="4" strokeDasharray={`${state.buyerScore}, 100`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
               <span className="text-2xl font-black text-slate-900 leading-none">{state.buyerScore}</span>
            </div>
          </div>
          <div>
            <p className="text-base font-black text-slate-900 leading-tight">
               {state.buyerScore >= 80 ? '적극적 매입 시점' : state.buyerScore >= 40 ? '최소량 유지' : '매입 일시 중단'}
            </p>
            <div className="mt-2 space-y-1">
               <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-tight">
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Low Pressure: {state.currentMetrics.low_pressure.toLocaleString()}
               </div>
               <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-bold uppercase tracking-tight">
                  <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                  Spread: {state.currentMetrics.spread.toLocaleString()}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPulse;
