import React from 'react';

const MarketPulse: React.FC = () => {
  return (
    <>
      <div className="card">
        <p style={{ fontSize: '12px', color: '#64748b' }}>MARKET PRICE RANGE</p>
        <h4 style={{ margin: '5px 0' }}>현재 시장 가격 대역</h4>
        <div style={{ margin: '20px 0' }}>
          <div style={{ color: '#ef4444', fontSize: '12px' }}>최고가(MAX) <span style={{ float: 'right', fontSize: '20px', fontWeight: 700 }}>5,806<span className="unit">KRW</span></span></div>
          <div className="price-value" style={{ textAlign: 'center', borderY: '1px solid #f1f5f9', padding: '15px 0' }}>2,866<span className="unit">KRW</span></div>
          <div style={{ color: '#3b82f6', fontSize: '12px' }}>최저가(MIN) <span style={{ float: 'right', fontSize: '20px', fontWeight: 700 }}>1,861<span className="unit">KRW</span></span></div>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#64748b' }}>FARMER STRATEGIC SCORE</p>
        <h4>출하 최적화 지수</h4>
        <div style={{ position: 'relative', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ fontSize: '40px', fontWeight: 800 }}>61</div>
           <p style={{ position: 'absolute', bottom: 10, color: '#ef4444', fontWeight: 700 }}>물량 조절 필요</p>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#64748b' }}>BUYER STOCK EFFICIENCY</p>
        <h4>매입 효율화 점수</h4>
        <div style={{ position: 'relative', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <div style={{ fontSize: '40px', fontWeight: 800 }}>41</div>
           <p style={{ position: 'absolute', bottom: 10, color: '#3b82f6', fontWeight: 700 }}>최소량 유지</p>
        </div>
      </div>
    </>
  );
};

export default MarketPulse;
