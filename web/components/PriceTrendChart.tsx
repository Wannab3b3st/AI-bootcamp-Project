import React from 'react';

const PriceTrendChart: React.FC = () => {
  // 이 부분 실제 데이터로 교체
  const data = {
    upper: 5400,
    mean: 3050,
    lower: 1600,
    confidence: "94.2%"
  };

  return (
    <div className="chart-container">
      <div style={{ display: 'flex', justify-content: 'space-around', textAlign: 'center', marginBottom: '30px' }}>
        <div>
          <p style={{ fontSize: '11px', color: '#ef4444' }}>최고가 예측 (UPPER BAND)</p>
          <p style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{data.upper.toLocaleString()}<span className="unit">원</span></p>
        </div>
        <div style={{ borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0', padding: '0 40px' }}>
          <p style={{ fontSize: '11px', color: '#1e293b' }}>평균가 예측 (MARKET MEAN)</p>
          <p style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{data.mean.toLocaleString()}<span className="unit">원</span></p>
        </div>
        <div>
          <p style={{ fontSize: '11px', color: '#94a3b8' }}>최저가 예측 (LOWER BAND)</p>
          <p style={{ fontSize: '24px', fontWeight: 700, margin: 0 }}>{data.lower.toLocaleString()}<span className="unit">원</span></p>
        </div>
      </div>

      {/* SVG 차트 영역 */}
      <svg width="100%" height="200" viewBox="0 0 800 200" style={{ overflow: 'visible' }}>
        {/* 예측 밴드 배경 */}
        <path d="M 0 100 Q 400 120 800 80 L 800 160 Q 400 180 0 170 Z" fill="#f1f5f9" opacity="0.5" />
        {/* 평균가 선 */}
        <path d="M 0 135 Q 400 150 800 120" fill="none" stroke="#3b82f6" strokeWidth="3" />
        {/* 최고가 선 */}
        <path d="M 0 100 Q 400 120 800 80" fill="none" stroke="#ef4444" strokeWidth="2" />
        {/* 최저가 선 (점선) */}
        <path d="M 0 170 Q 400 180 800 160" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
      </svg>
      
      <div style={{ display: 'flex', justify-content: 'space-between', marginTop: '10px', fontSize: '12px', color: '#94a3b8' }}>
        <span>지난 경매</span>
        <span>현재 시장</span>
        <span>다음 경매</span>
      </div>
    </div>
  );
};

export default PriceTrendChart;
