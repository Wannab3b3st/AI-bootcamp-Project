import React from 'react';
import './index.css';

function App() {
  return (
    <div className="portfolio-wrapper">
      <div className="header-row">
        <div className="title-section">
          <h1 className="main-title">
            화훼 경매 금액 예측 AI 서비스
          </h1>
          <div className="info-container">
            <div className="info-item">
              <span className="info-label">MARKET:</span>
              <span className="info-value">AT화훼(양재)</span>
            </div>
            <div className="info-item">
              <span className="info-label">CATEGORY:</span>
              <span className="info-value">절화</span>
            </div>
          </div>
        </div>
        
        <div className="search-section">
          <div className="search-box">
            <input 
              type="text" 
              className="search-input" 
              placeholder="검색" 
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
