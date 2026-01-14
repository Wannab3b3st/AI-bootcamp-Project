import React from 'react';

const MarketPulse: React.FC = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', width: '100%', marginBottom: '20px' }}>
      {/* 카드 1: 시장 가격 대역 */}
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>MARKET PRICE RANGE</p>
          <span className="badge badge-active" style={{ fontSize: '10px' }}>안정세 (STABLE)</span>
        </div>
        <h4 style={{ margin: '10px 0', fontSize: '16px' }}>현재 시장 가격 대역</h4>
        <div style={{ margin: '15px 0', borderTop: '1px solid #f1f5f9', paddingTop: '15px' }}>
          <div style={{ color: '#ef4444', fontSize: '11px', fontWeight: 700 }}>최고가 (MAX) <span style={{ float: 'right', fontSize: '18px' }}>5,806 <small>KRW</small></span></div>
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>시장 평균 단가 (MEAN)</p>
            <div style={{ fontSize: '36px', fontWeight: 800 }}>2,866 <small style={{ fontSize: '16px', color: '#94a3b8' }}>KRW</small></div>
          </div>
          <div style={{ color: '#3b82f6', fontSize: '11px', fontWeight: 700 }}>최저가 (MIN) <span style={{ float: 'right', fontSize: '18px' }}>1,861 <small>KRW</small></span></div>
        </div>
        <div style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>▼ NaN% <span style={{ color: '#64748b', fontWeight: 400 }}>SUPPLY CHANGE</span> <span style={{ float: 'right', color: '#8b5cf6' }}>SPREAD: 3,945</span></div>
      </div>

      {/* 카드 2: 출하 최적화 지수 */}
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>FARMER STRATEGIC SCORE</p>
          <span style={{ fontSize: '10px', color: '#ef4444', background: '#fee2e2', padding: '2px 8px', borderRadius: '4px' }}>Based on Premium & Pressure</span>
        </div>
        <h4 style={{ margin: '10px 0', fontSize: '16px' }}>출하 최적화 지수</h4>
        <div style={{ padding: '30px 0', position: 'relative' }}>
          <div style={{ fontSize: '48px', fontWeight: 800, color: '#1e293b' }}>61</div>
          <p style={{ color: '#ef4444', fontWeight: 700, margin: '10px 0' }}>물량 조절 필요</p>
          <p style={{ fontSize: '11px', color: '#64748b' }}>• PREMIUM RATIO: 2.18X<br/>• LOW PRESSURE: 1,005</p>
        </div>
      </div>

      {/* 카드 3: 매입 효율화 점수 */}
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>BUYER STOCK EFFICIENCY</p>
          <span style={{ fontSize: '10px', color: '#3b82f6', background: '#dbeafe', padding: '2px 8px', borderRadius: '4px' }}>Based on Spread & Dumping</span>
        </div>
        <h4 style={{ margin: '10px 0', fontSize: '16px' }}>매입 효율화 점수</h4>
        <div style={{ padding: '30px 0' }}>
          <div style={{ fontSize: '48px', fontWeight: 800, color: '#1e293b' }}>41</div>
          <p style={{ color: '#3b82f6', fontWeight: 700, margin: '10px 0' }}>최소량 유지</p>
          <p style={{ fontSize: '11px', color: '#64748b' }}>• LOW PRESSURE: 1,005<br/>• SPREAD: 3,945</p>
        </div>
      </div>
    </div>
  );
};

export default MarketPulse;
