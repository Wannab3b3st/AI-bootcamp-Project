import React from 'react';
import './index.css';

const ScoreCircle = ({ score, color }) => (
  <svg viewBox="0 0 36 36" className="circular-chart">
    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
    <path className="circle" stroke={color} strokeDasharray={`${score}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
    <text x="18" y="20.35" className="percentage">{score}</text>
  </svg>
);

function App() {
  return (
    <div className="portfolio-wrapper">
      <div className="title-section">
        <h1 style={{fontSize: '20px', fontWeight: 800, color: '#004d40', margin: '0 0 10px 0'}}>화훼 경매 금액 예측 AI 서비스</h1>
        <div style={{display: 'flex', gap: '25px'}}>
          <div style={{fontSize: '12px', fontWeight: 800}}><span style={{color: '#94a3b8'}}>MARKET:</span> <span style={{borderBottom: '2px solid #cbd5e1'}}>aT화훼(양재)</span></div>
          <div style={{fontSize: '12px', fontWeight: 800}}><span style={{color: '#94a3b8'}}>CATEGORY:</span> <span style={{borderBottom: '2px solid #cbd5e1'}}>절화</span></div>
        </div>
      </div>

      <div className="main-content">
        <div className="top-row">
          <div className="card">
            <div className="card-title">MARKET PRICE RANGE</div>
            <div className="price-max">최고가 5,806 원</div>
            <div className="price-mean">2,866 원</div>
            <div className="price-min">최저가 1,861 원</div>
          </div>
          <div className="card">
            <div className="card-title">출하 최적화 지수</div>
            <div className="score-container">
              <ScoreCircle score={61} color="#ef4444" />
              <div>
                <div style={{fontSize: '14px', fontWeight: 800, color: '#ef4444'}}>물량 조절 필요</div>
                <div style={{fontSize: '10px', color: '#94a3b8'}}>PREMIUM RATIO: 2.18X</div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-title">매입 효율화 점수</div>
            <div className="score-container">
              <ScoreCircle score={41} color="#3b82f6" />
              <div>
                <div style={{fontSize: '14px', fontWeight: 800, color: '#3b82f6'}}>최소량 유지</div>
                <div style={{fontSize: '10px', color: '#94a3b8'}}>SPREAD: 3,945원</div>
              </div>
            </div>
          </div>
        </div>

        <div className="analysis-card">
          <div style={{fontSize: '14px', fontWeight: 800, marginBottom: '15px'}}>ML Feature Analysis</div>
          <div className="analysis-item">
            <div className="analysis-label"><span>Spread (Max - Min)</span><span>3,945원</span></div>
            <div className="analysis-desc">시장의 가격 변동성 및 등급 간 가격 편차</div>
            <div className="bar-bg"><div className="bar-fill" style={{width: '78%', background: '#6366f1'}}></div></div>
          </div>
          <div className="analysis-item">
            <div className="analysis-label"><span>Premium Ratio</span><span>2.18배</span></div>
            <div className="analysis-desc">상위 품질 상품에 대한 시장의 가치 부여 수준</div>
            <div className="bar-bg"><div className="bar-fill" style={{width: '62%', background: '#f43f5e'}}></div></div>
          </div>
          <div className="analysis-item">
            <div className="analysis-label"><span>Low Pressure</span><span>1,005원</span></div>
            <div className="analysis-desc">하위 물량의 가격 하락 압력 및 덤핑 위험도</div>
            <div className="bar-bg"><div className="bar-fill" style={{width: '45%', background: '#f59e0b'}}></div></div>
          </div>
        </div>
      </div>

      <div className="auth-container">
        <div className="auth-item">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A7.5 7.5 0 014.501 20.118z"/></svg>
          로그인
        </div>
        <div className="auth-item">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 014 19.235z"/></svg>
          회원가입
        </div>
      </div>

      <div className="search-box">
        <input type="text" className="search-input" placeholder="검색" />
        <div style={{position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#3b82f6', display: 'flex'}}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
        </div>
      </div>
    </div>
  );
}

export default App;
