
import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_PREDICTIONS, FLOWER_OPTIONS } from './constants';
import { PredictionData, MarketInsight } from './types';
import { getMarketInsight } from './services/geminiService';
import PriceChart from './components/PriceChart';

const App: React.FC = () => {
  const [selectedFlower, setSelectedFlower] = useState<string>('프리지아');
  const [selectedVariety, setSelectedVariety] = useState<string>('(쏠레이)');
  const [prediction, setPrediction] = useState<PredictionData | null>(MOCK_PREDICTIONS['프리지아']);
  const [insight, setInsight] = useState<MarketInsight | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'code'>('dashboard');
  
  // 실제 현재 날짜 정보
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDate = today.getDate();
  const todayQuarter = Math.ceil(todayMonth / 3) + 'Q';
  const todayDateStr = `${todayYear}.${String(todayMonth).padStart(2, '0')}.${String(todayDate).padStart(2, '0')}`;

  // 년도는 2026년으로 고정 (데이터셋 기준), 분기 상태 관리
  const selectedYear = '2026';
  const [selectedQuarter, setSelectedQuarter] = useState<string>('1Q');

  const availableFlowers = ['프리지아', '국화'];
  const upcomingFlowers = ['장미', '튤립'];
  const availableVarieties = ['(쏠레이)', '(포드)'];
  
  // 분기별 시작 날짜 매핑
  const quarterStartInfo = useMemo(() => ({
    '1Q': { month: '01', day: '01' },
    '2Q': { month: '04', day: '01' },
    '3Q': { month: '07', day: '01' },
    '4Q': { month: '10', day: '01' }
  }), []);

  // 표시용 기준 날짜 설정
  const displayDateStr = useMemo(() => {
    if (selectedQuarter === todayQuarter) {
      return todayDateStr;
    }
    const info = quarterStartInfo[selectedQuarter as keyof typeof quarterStartInfo];
    return `${selectedYear}.${info.month}.${info.day}`;
  }, [selectedQuarter, selectedYear, todayQuarter, todayDateStr, quarterStartInfo]);

  // 다음 경매 날짜 계산
  const nextAuctionDateStr = useMemo(() => {
    let date: Date;
    if (selectedQuarter === todayQuarter) {
      date = new Date(today);
    } else {
      const info = quarterStartInfo[selectedQuarter as keyof typeof quarterStartInfo];
      date = new Date(parseInt(selectedYear), parseInt(info.month) - 1, parseInt(info.day));
    }
    date.setDate(date.getDate() + 1);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}.${m}.${d}`;
  }, [selectedQuarter, selectedYear, todayQuarter, today, quarterStartInfo]);

  // 시즌 체크 로직
  const isSeasonMatch = useMemo(() => {
    if (selectedFlower === '프리지아') return ['1Q', '2Q'].includes(selectedQuarter);
    if (selectedFlower === '국화') return ['3Q', '4Q'].includes(selectedQuarter);
    if (upcomingFlowers.includes(selectedFlower)) return true; // 준비중인 품목은 시즌체크 무시
    return false;
  }, [selectedFlower, selectedQuarter]);

  const isAvailable = availableFlowers.includes(selectedFlower) && 
                      availableVarieties.includes(selectedVariety) && 
                      isSeasonMatch;

  const getFlowerEmoji = (name: string) => {
    if (name.includes('프리지아')) return '🌼';
    if (name.includes('국화')) return '💮';
    if (name.includes('장미')) return '🌹';
    if (name.includes('튤립')) return '🌷';
    return '🌸';
  };

  // 히스토리 데이터 생성
  const filteredHistory = useMemo(() => {
    if (!prediction || !isSeasonMatch) return [];
    
    const info = quarterStartInfo[selectedQuarter as keyof typeof quarterStartInfo];
    const startDate = (selectedQuarter === todayQuarter) ? todayDate : parseInt(info.day);

    return prediction.history.map((item, index) => ({
      ...item,
      date: `${selectedYear}.${info.month}.${String(startDate + index).padStart(2, '0')}`
    }));
  }, [prediction, selectedQuarter, selectedYear, isSeasonMatch, quarterStartInfo, todayQuarter, todayDate]);

  const pythonCode = `import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor

class FlowerPricePredictor:
    """
    프리지아 및 국화 경매가 예측 모델 (2026 Target)
    Seasonality: Freesia(Q1-Q2), Chrysanthemum(Q3-Q4)
    """
    def __init__(self):
        self.model = RandomForestRegressor(n_estimators=200, random_state=42)

    def train(self, data):
        # 시즌별 데이터 필터링 포함
        X = data[['volume', 'prev_avg_price', 'season_index']]
        y = data['price']
        self.model.fit(X, y)

    def predict(self, current_features):
        base_price = self.model.predict(current_features)
        return {
            "max_prediction": np.round(base_price * 1.2, -2),
            "avg_prediction": np.round(base_price, -2),
            "min_prediction": np.round(base_price * 0.8, -2)
        }`;

  useEffect(() => {
    if (isAvailable) {
      const data = MOCK_PREDICTIONS[selectedFlower];
      setPrediction(data);
      fetchInsight(data);
    } else {
      setPrediction(null);
      setInsight(null);
    }
  }, [selectedFlower, selectedVariety, isAvailable]);

  const handleFlowerChange = (flower: string) => {
    setSelectedFlower(flower);
    if (flower === '프리지아') {
      setSelectedVariety('(쏠레이)');
      if (!['1Q', '2Q'].includes(selectedQuarter)) setSelectedQuarter('1Q');
    } else if (flower === '국화') {
      setSelectedVariety('(포드)');
      if (!['3Q', '4Q'].includes(selectedQuarter)) setSelectedQuarter('3Q');
    } else {
      setSelectedVariety('');
    }
  };

  const fetchInsight = async (data: PredictionData) => {
    setLoading(true);
    const result = await getMarketInsight(data);
    setInsight(result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-slate-900 font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
                <i className="fas fa-microchip text-white text-base"></i>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                  FLORA<span className="text-emerald-500">ML</span>
                </span>
                <span className="text-[10px] font-bold text-slate-400 tracking-tight mt-0.5 uppercase">2026 Season Analysis</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3 px-4 py-1.5 bg-slate-50 rounded-full border border-slate-100">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-slate-500 font-mono tracking-wider">System Operational: {todayDateStr}</span>
            </div>
            
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'dashboard' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                대시보드
              </button>
              <button 
                onClick={() => setActiveTab('code')}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'code' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Python 모델
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-emerald-50 border-b border-emerald-100 py-3 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex gap-3 justify-center items-center">
          {FLOWER_OPTIONS.map((flower) => {
            const isUpcoming = upcomingFlowers.includes(flower);
            return (
              <button
                key={flower}
                onClick={() => handleFlowerChange(flower)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border flex items-center gap-2 whitespace-nowrap ${
                  selectedFlower === flower 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-105' 
                    : isUpcoming
                      ? 'bg-white text-slate-400 border-slate-100 opacity-60 grayscale hover:grayscale-0 hover:opacity-100'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-300'
                }`}
              >
                <span className="text-base">{getFlowerEmoji(flower)}</span>
                {flower}
                {isUpcoming && (
                  <span className="text-[9px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded uppercase font-black ml-1">Ready</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' ? (
          <div className="animate-in fade-in duration-500">
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-8">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-4">
                    <h2 className="text-5xl font-black text-slate-900 tracking-tight">{selectedFlower}</h2>
                    {availableFlowers.includes(selectedFlower) && (
                      <div className="relative group">
                        <select 
                          value={selectedVariety}
                          onChange={(e) => setSelectedVariety(e.target.value)}
                          className="appearance-none bg-emerald-50 text-emerald-700 font-bold px-5 py-2.5 pr-12 rounded-2xl border border-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-all hover:bg-emerald-100 shadow-sm text-xl"
                        >
                          {selectedFlower === '프리지아' ? (
                            <option value="(쏠레이)">(쏠레이)</option>
                          ) : selectedFlower === '국화' ? (
                            <option value="(포드)">(포드)</option>
                          ) : null}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600">
                          <i className="fas fa-chevron-down text-sm"></i>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-bold text-slate-400 mt-2 flex items-center gap-2 bg-white w-fit px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
                    <i className="fas fa-history text-emerald-500"></i> {displayDateStr} 기준 분석 리포트
                  </span>
                </div>

                {/* Timeslip Style Market Period Control */}
                <div className="relative group">
                   <div className="absolute -inset-0.5 bg-emerald-400 rounded-[2rem] blur-md opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                   <div className="relative bg-white rounded-[2rem] p-5 border border-emerald-100 flex items-center gap-6 shadow-xl shadow-emerald-50/50">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">Time Slip Mode</span>
                        <div className="flex items-center gap-2">
                           <div className="flex flex-col items-center justify-center bg-emerald-50 rounded-lg px-3 py-1 border border-emerald-100/50">
                              <span className="text-[10px] text-emerald-700/60 font-bold uppercase leading-none">Target</span>
                              <span className="text-lg font-black text-emerald-900 font-mono leading-tight">2026</span>
                           </div>
                           <div className="w-4 h-px bg-emerald-200"></div>
                           <div className="relative">
                             <select 
                                value={selectedQuarter} 
                                onChange={(e) => setSelectedQuarter(e.target.value)}
                                className="appearance-none bg-emerald-50 border border-emerald-200 rounded-xl text-sm font-black text-emerald-700 px-6 py-2.5 pr-10 focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer hover:bg-emerald-100 transition-all font-mono"
                              >
                                <option value="1Q">1분기: 1월~3월</option>
                                <option value="2Q">2분기: 4월~6월</option>
                                <option value="3Q">3분기: 7월~9월</option>
                                <option value="4Q">4분기: 10월~12월</option>
                              </select>
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-600/60">
                                <i className="fas fa-chevron-down text-xs"></i>
                              </div>
                           </div>
                        </div>
                      </div>
                      
                      {isAvailable && (
                        <div className="flex flex-col items-end border-l border-emerald-100 pl-6">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Precision</span>
                            <div className="flex items-baseline gap-1">
                               <span className="text-3xl font-black text-emerald-600 font-mono tracking-tighter">{(prediction?.confidence ? prediction.confidence * 100 : 0).toFixed(0)}</span>
                               <span className="text-xs font-bold text-emerald-400 font-mono">%</span>
                            </div>
                        </div>
                      )}
                   </div>
                </div>
              </div>
            </div>

            {isAvailable && prediction ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-black text-slate-900 mb-1">다음 경매 예측</h2>
                          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase font-mono">{nextAuctionDateStr}</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center bg-slate-50/50 p-3 rounded-xl border border-slate-50">
                            <span className="text-sm font-bold text-slate-500">최고가:</span>
                            <span className="text-xl font-black text-rose-500">₩{prediction.maxPrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center bg-slate-50/50 p-3 rounded-xl border border-slate-50">
                            <span className="text-sm font-bold text-slate-500">평균:</span>
                            <span className="text-xl font-black text-emerald-600">₩{prediction.avgPrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center bg-slate-50/50 p-3 rounded-xl border border-slate-50">
                            <span className="text-sm font-bold text-slate-500">최저가:</span>
                            <span className="text-xl font-black text-blue-500">₩{prediction.minPrice.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="pt-6 border-t border-slate-100">
                          <h3 className="text-sm font-black text-slate-900 mb-4 flex items-center gap-2">
                            <i className="fas fa-chart-line text-emerald-600"></i>
                            등락 예측
                          </h3>
                          <div className="flex items-center gap-3">
                            {prediction.trend === 'up' ? (
                              <>
                                <span className="text-5xl font-black text-rose-500 tracking-tighter">상승</span>
                                <i className="fas fa-caret-up text-5xl text-rose-500 animate-bounce"></i>
                              </>
                            ) : (
                              <>
                                <span className="text-5xl font-black text-blue-500 tracking-tighter">하락</span>
                                <i className="fas fa-caret-down text-5xl text-blue-500 animate-bounce"></i>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="md:col-span-2 min-h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">이전 5회 경매 상세 동향</h3>
                          <div className="flex gap-4">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">최고가</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">평균가</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">최저가</span>
                            </div>
                          </div>
                        </div>
                        <PriceChart data={filteredHistory} hideTitle />
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10"><i className="fas fa-brain text-8xl"></i></div>
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <span className="w-2 h-6 bg-emerald-500 rounded-full"></span>
                      데이터 분석 엔진 리포트 (2026 Core)
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
                          <p className="text-slate-400 text-xs font-bold uppercase mb-2">특성 중요도 (Feature Importance)</p>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm"><span className="text-slate-300">계절성 지수</span><span className="text-emerald-400">42%</span></div>
                            <div className="w-full bg-slate-700 h-1 rounded-full"><div className="bg-emerald-500 h-1 w-[42%] rounded-full"></div></div>
                            <div className="flex justify-between text-sm"><span className="text-slate-300">전일 거래량</span><span className="text-blue-400">28%</span></div>
                            <div className="w-full bg-slate-700 h-1 rounded-full"><div className="bg-blue-500 h-1 w-[28%] rounded-full"></div></div>
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed italic flex items-center">
                        "{prediction.flowerName} {selectedVariety} 품목의 2026년 {selectedQuarter} 예측 데이터입니다. 해당 분기는 {prediction.flowerName}의 주 출하 시기이며, 파이썬 RandomForest 모델은 안정적인 시세 형성을 예측하고 있습니다."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden sticky top-24">
                    <div className="bg-slate-50 px-6 py-5 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        <h3 className="font-bold text-slate-800 uppercase tracking-tight">AI 시장 인사이트</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      {loading ? (
                        <div className="py-20 flex flex-col items-center">
                          <div className="w-12 h-12 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
                          <p className="text-slate-400 font-medium text-sm">분석 중...</p>
                        </div>
                      ) : insight ? (
                        <div className="space-y-6">
                          <p className="text-slate-700 text-sm leading-relaxed font-medium">{insight.summary}</p>
                          <div className="space-y-3">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">핵심 변동 요인</h4>
                            {insight.factors.map((f, i) => (
                              <div key={i} className="flex gap-3 text-sm text-slate-600 items-start">
                                <i className="fas fa-circle-dot text-emerald-500 mt-1 text-[8px]"></i>
                                <span>{f}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-8 pt-6 border-t border-slate-50">
                            <div className="bg-emerald-600 p-5 rounded-2xl text-white shadow-lg">
                              <p className="text-[10px] font-bold text-emerald-200 uppercase mb-1 tracking-widest">권장 전략</p>
                              <p className="font-bold text-sm leading-snug">{insight.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm animate-in zoom-in duration-300">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 text-4xl shadow-inner">
                  {upcomingFlowers.includes(selectedFlower) ? (
                    <i className="fas fa-tools text-emerald-300"></i>
                  ) : !isSeasonMatch ? (
                    <i className="fas fa-calendar-times text-rose-300"></i>
                  ) : (
                    <i className="fas fa-clock text-slate-300"></i>
                  )}
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">
                  {upcomingFlowers.includes(selectedFlower) 
                    ? `${selectedFlower} 서비스 준비 중` 
                    : !isSeasonMatch 
                      ? "시즌 외 품목 안내" 
                      : `${selectedFlower} 분석 대기`}
                </h2>
                <div className="max-w-md text-center px-10">
                  <p className="text-slate-500 font-medium leading-relaxed">
                    {upcomingFlowers.includes(selectedFlower) ? (
                      <>
                        <span className="font-bold text-emerald-600">{selectedFlower}</span> 품목의 고도화된 예측 모델을 구축하고 있습니다.<br/>
                        <span className="text-sm mt-3 inline-block bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 font-bold">
                          <i className="fas fa-rocket mr-1"></i> 곧 정식 서비스로 찾아뵙겠습니다.
                        </span>
                      </>
                    ) : !isSeasonMatch ? (
                      <>
                        <span className="font-bold text-emerald-600">{selectedFlower}</span>는 현재 선택하신 <span className="font-bold text-slate-800">{selectedQuarter}</span>에 서비스되지 않습니다.<br/>
                        <span className="text-sm mt-3 inline-block bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                          <i className="fas fa-info-circle mr-1"></i> 서비스 기간: 
                          {selectedFlower === '프리지아' ? ' 1분기 ~ 2분기' : ' 3분기 ~ 4분기'}
                        </span>
                      </>
                    ) : (
                      "해당 품종의 실시간 데이터 분석 서비스가 준비 중입니다. 다른 품종이나 분기를 선택해주세요."
                    )}
                  </p>
                </div>
                {!isSeasonMatch && !upcomingFlowers.includes(selectedFlower) && (
                  <button 
                    onClick={() => setSelectedQuarter(selectedFlower === '프리지아' ? '1Q' : '3Q')}
                    className="mt-10 px-8 py-3 bg-emerald-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                  >
                    <i className="fas fa-magic"></i>
                    출하 시즌으로 이동하기
                  </button>
                )}
                {upcomingFlowers.includes(selectedFlower) && (
                   <button 
                   onClick={() => handleFlowerChange('프리지아')}
                   className="mt-10 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl shadow-slate-100 hover:bg-black transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2"
                 >
                   <i className="fas fa-arrow-left"></i>
                   분석 가능한 품목 보기
                 </button>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#1e1e1e] rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
              <div className="bg-[#252526] px-6 py-3 flex items-center justify-between border-b border-[#333]">
                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <span className="text-[#858585] text-xs font-mono tracking-wider">price_predictor.py</span>
                </div>
                <button onClick={() => navigator.clipboard.writeText(pythonCode)} className="text-[#858585] hover:text-white transition-colors text-xs flex items-center gap-2">
                  <i className="fas fa-copy"></i> Copy Code
                </button>
              </div>
              <div className="p-8 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed text-[#d4d4d4]"><code>{pythonCode}</code></pre>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-100 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-xs font-medium">© 2026 FlorisPredict ML Lab. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors"><i className="fab fa-github text-lg"></i></a>
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors"><i className="fab fa-python text-lg"></i></a>
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors"><i className="fas fa-envelope text-lg"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
