
import React from 'react';
import { MarketMetrics } from '../types';

interface Props {
  metrics: MarketMetrics;
}

const MetricBar: React.FC<{ label: string; value: number; max: number; color: string; description: string; unit?: string; importance: number; calculation?: string }> = ({ label, value, max, color, description, unit = "%", importance, calculation }) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className="mb-6 last:mb-0">
      <div className="flex justify-between items-end mb-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-800">{label}</span>
            <span className="px-1.5 py-0.5 bg-slate-100 text-[9px] font-black text-slate-500 rounded border border-slate-200 uppercase tracking-tighter">
              Weight: {importance}%
            </span>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5">{description}</span>
          {calculation && (
            <span className="text-[9px] text-indigo-400 font-medium mt-1 font-mono bg-indigo-50/50 px-1.5 py-0.5 rounded w-fit">
              Logic: {calculation}
            </span>
          )}
        </div>
        <div className="text-right">
          <span className={`text-sm font-black ${color}`}>{unit === "%" ? value.toFixed(2) : (typeof value === 'number' ? value.toLocaleString() : value)}{unit}</span>
        </div>
      </div>
      <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden relative border border-slate-50">
        <div 
          className={`h-full transition-all duration-1000 ease-out ${color.replace('text', 'bg')}`} 
          style={{ width: `${percentage}%` }}
        />
        <div className="absolute top-0 right-0 h-full w-1 bg-slate-300/30"></div>
      </div>
    </div>
  );
};

const StructuralMetrics: React.FC<Props> = ({ metrics }) => {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 group hover:border-indigo-200 transition-all duration-500">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-black text-slate-900 text-lg">
              ML Feature Analysis
            </h3>
            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-[9px] font-bold rounded-full border border-indigo-100 uppercase tracking-widest">
              LightGBM Core
            </span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">설명 가능한 AI(XAI) 기반 피처 중요도 분석</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Gain-based Importance</p>
          <p className="text-[10px] font-bold text-slate-500">Analysis Mode: Structural</p>
        </div>
      </div>
      
      <div className="space-y-10">
        <MetricBar 
          label="Spread (Max - Min)" 
          description="시장의 가격 변동성 및 등급 간 가격 편차"
          calculation="max_price - min_price"
          value={metrics.spread} 
          max={6000}
          unit="원"
          importance={38}
          color="text-indigo-500" 
        />
        
        <MetricBar 
          label="Premium Ratio (Max / Mean)" 
          description="상위 품질 상품에 대한 시장의 가치 부여 수준"
          calculation="max_price / mean"
          value={metrics.premium_ratio} 
          max={4}
          unit="배"
          importance={35}
          color="text-rose-500" 
        />
        
        <MetricBar 
          label="Low Pressure (Mean - Min)" 
          description="하위 물량의 가격 하락 압력 및 덤핑 위험도"
          calculation="mean - min_price"
          value={metrics.low_pressure} 
          max={3000}
          unit="원"
          importance={27}
          color="text-amber-500" 
        />
      </div>

      <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
           <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
             AI Decision Logic
           </h4>
           <p className="text-[11px] text-slate-500 leading-relaxed">
             상기 피처들은 <strong className="text-slate-700">LightGBM 모델</strong>이 각 시장 단계에서의 가격 결정 요인을 수치화한 것입니다. 피처의 가중치가 높을수록 해당 변동이 예측값에 미치는 영향이 큽니다.
           </p>
        </div>
        <div className="p-5 bg-indigo-50/30 rounded-2xl border border-indigo-100/50">
           <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2">
             <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
             Model Complementarity
           </h4>
           <p className="text-[11px] text-indigo-600/70 leading-relaxed italic">
             전체 가격 흐름은 <strong className="text-indigo-600">LSTM</strong>이 담당하며, 상세 구조 분석은 본 섹션의 <strong className="text-indigo-600">ML 피처</strong>를 통해 보완됩니다.
           </p>
        </div>
      </div>
    </div>
  );
};

export default StructuralMetrics;
