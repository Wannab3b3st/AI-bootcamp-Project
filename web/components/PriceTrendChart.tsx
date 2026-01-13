
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ForecastData } from '../types';

interface Props {
  forecast: ForecastData;
}

const PriceTrendChart: React.FC<Props> = ({ forecast }) => {
  // 사용자의 요청에 따라 X축을 딱 3개의 핵심 시점으로 매핑
  const data = [
    { 
      name: '지난 시장', 
      min: 1300, 
      mean: 2600, 
      max: 4700,
      description: '직전 경매 낙찰가 기반'
    },
    { 
      name: '현재 시장', 
      min: 1100, 
      mean: 2450, 
      max: 4200,
      description: '실시간 시장 인덱스'
    },
    { 
      name: '다음 시장', 
      min: forecast.t1.min_price, 
      mean: forecast.t1.mean_price, 
      max: forecast.t1.max_price,
      description: 'T+1 AI 예측 결과'
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-slate-800">가격 추세 및 예측 밴드</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight mt-0.5">3-Point Market Lifecycle Analysis</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Past</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Live</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Forecast</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#E11D48" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#E11D48" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorMean" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 11, fill: '#64748B', fontWeight: 700}} 
            dy={15}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fontSize: 12, fill: '#94A3B8'}}
            tickFormatter={(value) => `${value.toLocaleString()}`}
          />
          <Tooltip 
            cursor={{ stroke: '#F1F5F9', strokeWidth: 2 }}
            contentStyle={{ 
              borderRadius: '16px', 
              border: 'none', 
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', 
              fontSize: '12px',
              padding: '12px'
            }}
          />
          <Legend 
            verticalAlign="top" 
            align="right" 
            iconType="circle" 
            wrapperStyle={{ paddingBottom: '20px', fontSize: '11px', fontWeight: 600 }} 
          />
          <Area 
            type="monotone" 
            dataKey="max" 
            name="최고가 (Premium)" 
            stroke="#E11D48" 
            fillOpacity={1} 
            fill="url(#colorMax)" 
            strokeWidth={3}
            animationDuration={1000}
          />
          <Area 
            type="monotone" 
            dataKey="mean" 
            name="평균가 (Baseline)" 
            stroke="#3B82F6" 
            fillOpacity={1} 
            fill="url(#colorMean)" 
            strokeWidth={3}
            animationDuration={1200}
          />
          <Area 
            type="monotone" 
            dataKey="min" 
            name="최저가 (Dumping)" 
            stroke="#94A3B8" 
            fill="transparent" 
            strokeWidth={2} 
            strokeDasharray="4 4" 
            animationDuration={1400}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceTrendChart;
