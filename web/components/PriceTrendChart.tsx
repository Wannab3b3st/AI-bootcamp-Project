import React from 'react';

const PriceTrendChart: React.FC = () => {
  return (
    <div className="card" style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h4 style={{ margin: 0 }}>AI 다음 경매 예측 메트릭스</h4>
          <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>TARGET HORIZON: T+1 NEXT MARKET DAY</p>
        </div>
        <span className="badge badge-active" style={{ background: '#fee2e2', color: '#ef4444', border: 'none' }}>LIVE INFERENCE</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px 0', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: '#94a3b8' }}>T+1 PREDICTION</p>
          <p style={{ fontWeight: 800, margin: 0 }}>다음 경매 (Next Auction)</p>
          <p style={{ fontSize: '11px', color: '#10b981' }}>● CONFIDENCE: 94.2%</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: '#ef4444' }}>최고가 예측 (UPPER BAND)</p>
          <p style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>5,400 <small style={{ fontSize: '12px' }}>원</small></p>
          <p style={{ fontSize: '10px', color: '#ef4444', fontWeight: 700 }}>PREMIUM TARGET</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: '#1e293b' }}>평균가 예측 (MARKET MEAN)</p>
          <p style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>3,050 <small style={{ fontSize: '12px' }}>원</small></p>
          <p style={{ fontSize: '10px', color: '#475569', fontWeight: 700 }}>EQUILIBRIUM PRICE</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '11px', color: '#94a3b8' }}>최저가 예측 (LOWER BAND)</p>
          <p style={{ fontSize: '24px', fontWeight: 800, margin: 0 }}>1,600 <small style={{ fontSize: '12px' }}>원</small></p>
          <p style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 700 }}>SUPPORT LINE</p>
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <p style={{ fontSize: '14px', fontWeight: 700 }}>가격 추세 및 예측 밴드</p>
        <div style={{ height: '200px', width: '100%', background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>
          {/* 실제 차트 라이브러리 대신 임시 시각화 */}
          <svg width="100%" height="150" viewBox="0 0 800 150">
            <path d="M0,100 C200,80 600,120 800,90" fill="none" stroke="#ef4444" strokeWidth="3" />
            <path d="M0,120 C200,110 600,140 800,115" fill="none" stroke="#3b82f6" strokeWidth="3" />
            <path d="M0,140 C200,135 600,160 800,145" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PriceTrendChart;
