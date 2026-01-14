import React from 'react';

const StructuralMetrics: React.FC = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '20px' }}>
      <div className="card">
        <h4>ML Feature Analysis <span className="badge badge-mode" style={{ background: '#e0e7ff', color: '#4338ca' }}>LIGHTGBM CORE</span></h4>
        <p style={{ fontSize: '11px', color: '#94a3b8' }}>설명 가능한 AI(XAI) 기반 피처 중요도 분석</p>
        
        <div style={{ marginTop: '20px' }}>
          {/* 피처 1 */}
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
              <span><strong>Spread (Max - Min)</strong> <small style={{ color: '#94a3b8' }}>WEIGHT: 38%</small></span>
              <span style={{ fontWeight: 700, color: '#4338ca' }}>3,945원</span>
            </div>
            <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px' }}>
              <div style={{ width: '38%', height: '100%', background: 'linear-gradient(to right, #818cf8, #4338ca)', borderRadius: '3px' }}></div>
            </div>
          </div>
          {/* 피처 2 */}
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '5px' }}>
              <span><strong>Premium Ratio (Max / Mean)</strong> <small style={{ color: '#94a3b8' }}>WEIGHT: 35%</small></span>
              <span style={{ fontWeight: 700, color: '#ef4444' }}>2.179배</span>
            </div>
            <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px' }}>
              <div style={{ width: '35%', height: '100%', background: 'linear-gradient(to right, #f87171, #ef4444)', borderRadius: '3px' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h4 style={{ fontSize: '13px' }}>모델 신뢰도 리포트</h4>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <p style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '5px' }}>LSTM PREDICTION SCORE</p>
          <div style={{ fontSize: '42px', fontWeight: 800, color: '#1e293b' }}>92.4%</div>
          <div style={{ height: '4px', background: '#f1f5f9', margin: '15px 0' }}>
            <div style={{ width: '92.4%', height: '100%', background: '#3b82f6' }}></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', alignItems: 'center' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>LIGHTGBM EXPLAINABILITY</span>
            <span style={{ fontWeight: 800, color: '#10b981' }}>HIGH</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructuralMetrics;
