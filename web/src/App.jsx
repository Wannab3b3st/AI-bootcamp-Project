import React from 'react';
import './index.css';

function App() {
  return (
    <div className="portfolio-wrapper">
      <div className="header-row">
        {/* 좌측: 타이틀 및 정보 */}
        <div className="title-section">
          <h1 className="main-title">
            화훼 경매 금액 예측 AI 서비스
          </h1>
          <div className="info-container">
            <div className="info-item">
              <span className="info-label">MARKET:</span>
              <span className="info-value">aT화훼(양재)</span>
            </div>
            <div className="info-item">
              <span className="info-label">CATEGORY:</span>
              <span className="info-value">절화</span>
            </div>
          </div>
        </div>

        {/* 💡 우측: 노란색/하늘색 동그라미 위치로 이동된 섹션 */}
        <div className="right-section">
          {/* 노란색 동그라미 위치: 로그인/회원가입 */}
          <div className="auth-container">
            <div className="auth-item">
              <span className="auth-icon">📥</span> 
              <span>로그인</span>
            </div>
            <div className="auth-item">
              <span className="auth-icon">👤+</span> 
              <span>회원가입</span>
            </div>
          </div>

          {/* 하늘색 동그라미 위치: 검색창 */}
          <div className="search-box">
            <input type="text" className="search-input" placeholder="검색" />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
