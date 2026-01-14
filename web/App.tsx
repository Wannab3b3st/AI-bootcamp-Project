import React from 'react';
import './index.css';
import MarketPulse from './components/MarketPulse';
import PriceTrendChart from './components/PriceTrendChart';
import StructuralMetrics from './components/StructuralMetrics';

const App: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* 상단 헤더 영역 */}
      <header className="header">
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>
            BloomBridge AI <span className="badge badge-active">INTELLIGENCE ACTIVE</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: '13px', marginTop: '5px' }}>
            MARKET: AT화훼(양재) | CATEGORY: 절화
          </p>
        </div>
        <div className="status-badges">
          <span className="badge badge-mode">ENSEMBLE MODE</span>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '10px', color: '#94a3b8', margin: 0 }}>MODEL TRAINING CYCLE</p>
            <p style={{ fontSize: '12px', fontWeight: 700, margin: 0 }}>Quarterly (v2.5.Q4)</p>
          </div>
        </div>
      </header>

      {/* 메인 대시보드 상단 3개 카드 */}
      <div className="top-grid">
        <MarketPulse />
      </div>

      {/* 중앙 예측 대역 및 차트 영역 */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>AI 다음 경매 예측 메트릭스</h3>
        <PriceTrendChart />
      </div>

      {/* 하단 분석 데이터 영역 */}
      <div style={{ display: 'grid', gridTemplate-columns: '2fr 1fr', gap: '20px' }}>
        <div className="card">
          <h3 style={{ fontSize: '16px' }}>ML Feature Analysis <span className="badge badge-mode">LIGHTGBM CORE</span></h3>
          <StructuralMetrics />
        </div>
        <div className="card" style={{ background: 'linear-gradient(to bottom, #ffffff, #f8fafc)' }}>
          <h3 style={{ fontSize: '16px' }}>모델 신뢰도 리포트</h3>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <h2 style={{ fontSize: '48px', color: '#3b82f6', margin: 0 }}>92.4%</h2>
            <p style={{ color: '#64748b' }}>LSTM PREDICTION SCORE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
