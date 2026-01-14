import React from 'react';
import './index.css';

function App() {
  return (
    <div className="portfolio-wrapper">
      {/* 메인 타이틀 */}
      <h1 className="main-title">
        화훼 경매 금액 예측 AI 서비스
      </h1>

      {/* 💡 타이틀 하단 상세 정보 (image_ab402c.png 스타일) */}
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
  );
}

export default App;
