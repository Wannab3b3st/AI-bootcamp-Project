import React from 'react';
import './index.css';
import MarketPulse from './components/MarketPulse';
import PriceTrendChart from './components/PriceTrendChart';
import StructuralMetrics from './components/StructuralMetrics';

const App: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* 로고 및 상단 헤더 */}
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <h2 style={{ margin: 0, fontWeight: 900, letterSpacing: '-1px' }}>BloomBridge AI</h2>
          <span className="badge badge-active">INTELLIGENCE ACTIVE</span>
          <span className="badge badge-mode">ENSEMBLE MODE</span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>MARKET: AT화훼(양재) | CATEGORY: 절화</p>
        </div>
      </header>

      {/* 대시보드 내용 */}
      <MarketPulse />
      <PriceTrendChart />
      <StructuralMetrics />

      {/* 하단 푸터 알림 */}
      <div style={{ marginTop: '20px', padding: '12px', background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: '8px', color: '#1e40af', fontSize: '12px', textAlign: 'center' }}>
        ⚠️ <strong>STATUS: HYBRID FORECASTING ACTIVE</strong> - 현재 AI 모델이 실시간 시장 데이터를 분석 중입니다.
      </div>
    </div>
  );
};

export default App;
