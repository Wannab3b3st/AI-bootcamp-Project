
import React from 'react';
import { ForecastData } from '../types';

interface Props {
  forecast: ForecastData;
}

const PriceForecastTable: React.FC<Props> = ({ forecast }) => {
  // 사용자의 요청에 따라 '다음 경매(T+1)' 데이터만 추출하여 표시
  const nextAuction = {
    label: 'T+1 Prediction',
    time: '다음 경매 (Next Auction)',
    data: forecast.t1
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div>
           <h3 className="font-black text-slate-900 text-lg">AI 다음 경매 예측 매트릭스</h3>
           <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Target Horizon: T+1 Next Market Day</p>
        </div>
        <div className="flex gap-2">
           <span className="px-3 py-1 bg-rose-600 text-[10px] font-black text-white rounded-full animate-pulse uppercase tracking-widest">Live Inference</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50/30 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
            <tr>
              <th className="px-8 py-4">대상 시점 (Target)</th>
              <th className="px-8 py-4 text-rose-600">최고가 예측 (Upper Band)</th>
              <th className="px-8 py-4 text-slate-900">평균가 예측 (Market Mean)</th>
              <th className="px-8 py-4 text-slate-500">최저가 예측 (Lower Band)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="px-8 py-10">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-tighter mb-1">{nextAuction.label}</span>
                  <span className="text-xl font-black text-slate-900 tracking-tight">{nextAuction.time}</span>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Confidence: 94.2%</span>
                  </div>
                </div>
              </td>
              <td className="px-8 py-10">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-rose-600 tracking-tighter">
                    {nextAuction.data.max_price.toLocaleString()}
                    <span className="text-sm font-bold ml-1">원</span>
                  </span>
                  <span className="text-[10px] text-rose-400 font-bold mt-1 uppercase tracking-widest">Premium Target</span>
                </div>
              </td>
              <td className="px-8 py-10">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-slate-900 tracking-tighter">
                    {nextAuction.data.mean_price.toLocaleString()}
                    <span className="text-sm font-bold ml-1">원</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Equilibrium Price</span>
                </div>
              </td>
              <td className="px-8 py-10">
                <div className="flex flex-col opacity-60">
                  <span className="text-2xl font-bold text-slate-500 tracking-tighter">
                    {nextAuction.data.min_price.toLocaleString()}
                    <span className="text-sm font-medium ml-1">원</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">Support Line</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-slate-900 px-8 py-4 text-white/50 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <p className="text-[11px] font-medium">
            <span className="text-rose-500 font-bold mr-2">NOTICE</span>
            단기 변동성(Short-term Volatility)이 반영된 최적화 결과값입니다.
          </p>
        </div>
        <span className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">BloomBridge AI Core v2.5</span>
      </div>
    </div>
  );
};

export default PriceForecastTable;
