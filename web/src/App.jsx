import React from 'react';
import './index.css';

function App() {
  return (
    <div className="portfolio-wrapper">
      <header className="title-container">
        {/* 메인 타이틀 그룹 */}
        <h1 className="main-title">
          화훼 경매 금액 예측<br />
          {/* 'AI 서비스' 부분을 강조 */}
          <span className="title-accent">AI 서비스 플랫폼</span>
        </h1>
        
        {/* PPT 느낌을 없애고 웹사이트 느낌을 주는 한 줄 요약 */}
        <p className="sub-tagline">
            빅데이터 기반 양재 꽃 시장 실시간 분석
        </p>
      </header>
    </div>
  );
}

export default App;
