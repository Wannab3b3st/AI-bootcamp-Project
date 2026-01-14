import React from 'react';
import './index.css';

function App() {
  return (
    <div className="portfolio-wrapper">
      {/* 메인 타이틀 (상단에서 내려온 위치) */}
      <h1 className="main-title">
        화훼 경매 금액 예측<br />
        AI 서비스
      </h1>

      {/* 포인트 라인 */}
      <div className="accent-line"></div>

      {/* 심플한 서비스 소개 */}
      <p className="sub-text">
        데이터 기반의 정교한 분석으로<br />
        꽃 시장의 다음 걸음을 예측합니다.
      </p>

      {/* 나중에 이 아래 공간에 예측 데이터 카드들이 들어올 예정입니다. */}
    </div>
  );
}

export default App;
