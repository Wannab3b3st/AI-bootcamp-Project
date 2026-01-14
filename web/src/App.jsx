import React from 'react';
import './index.css';

function App() {
  return (
    <div className="portfolio-wrapper">
      {/* 헤더 섹션 */}
      <div className="title-section">
        <h1 style={{fontSize: '22px', fontWeight: 800, color: '#004d40', margin: '0 0 12px 0'}}>화훼 경매 금액 예측 AI 서비스</h1>
        <div style={{display: 'flex', gap: '25px'}}>
          <div style={{fontSize: '13px', fontWeight: 800}}><span style={{color: '#94a3b8'}}>MARKET:</span> <span style={{borderBottom: '2px solid #cbd5e1'}}>aT화훼(양재)</span></div>
          <div style={{fontSize: '13px', fontWeight: 800}}><span style={{color: '#94a3b8'}}>CATEGORY:</span> <span style={{borderBottom: '2px solid #cbd5e1'}}>절화</span></div>
        </div>
      </div>

      {/* 🔴 빨간색 + 🟡 노란색 영역 통합 배치 */}
      <div className="main-content">
        {/* 왼쪽 섹션 (빨간색 영역) */}
        <div className="metrics-row">
          <div className="card">
            <div className="card-title">MARKET PRICE RANGE</div>
            <div className="price-max">최고가(MAX) 5,806 <small>KRW</small></div>
            <div className="price-mean">2,866 <small style={{fontSize: '16px'}}>KRW</small></div>
            <div className="price-min">최저가(MIN) 1,861 <small>KRW</small></div>
          </div>
          
          <div className="card">
            <div className="card-title">FARMER STRATEGIC SCORE</div>
            <div style={{fontSize: '32px', fontWeight: 900, color: '#ef4444'}}>61</div>
            <div style={{fontSize: '14px', fontWeight: 700, marginTop: '10px'}}>물량 조절 필요</div>
          </div>
        </div>

        {/* 오른쪽 섹션 (노란색 영역) */}
        <div className="analysis-section">
          <div style={{fontSize: '16px', fontWeight: 800, marginBottom: '20px'}}>ML Feature Analysis</div>
          <div className="analysis-item">
            <div className="analysis-label"><span>Spread (Max - Min)</span><span>78%</span></div>
            <div className="bar-bg"><div className="bar-fill" style={{width: '78%', background: '#3b82f6'}}></div></div>
          </div>
          <div className="analysis-item">
            <div className="analysis-label"><span>Premium Ratio</span><span>62%</span></div>
            <div className="bar-bg"><div className="bar-fill" style={{width: '62%', background: '#ef4444'}}></div></div>
          </div>
          <div className="analysis-item">
            <div className="analysis-label"><span>Low Pressure</span><span>45%</span></div>
            <div className="bar-bg"><div className="bar-fill" style={{width: '45%', background: '#f59e0b'}}></div></div>
          </div>
        </div>
      </div>

      {/* 로그인/회원가입 및 검색창 (직접 위치 조절 가능) */}
      <div className="auth-container">
        <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="auth-icon-svg"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A7.5 7.5 0 014.501 20.118z" /></svg>
          <span>로그인</span>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700}}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="auth-icon-svg"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 014 19.235z" /></svg>
          <span>회원가입</span>
        </div>
      </div>

      <div className="search-box">
        <div style={{position: 'relative', display: 'flex', alignItems: 'center'}}>
          <input type="text" style={{width: '140px', height: '34px', padding: '0 35px 0 15px', border: '1.5px solid #cbd5e1', borderRadius: '20px', fontSize: '12px', outline: 'none'}} placeholder="검색" />
          <div style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', display: 'flex'}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="search-icon-svg"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
