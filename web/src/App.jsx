import React from 'react';
import './index.css';

function App() {
  return (
    <div className="app-wrapper">
      {/* 상단 헤더: 타이틀만 좌측 배치 */}
      <header className="nav-container">
        <div className="nav-title">
          화훼 경매 금액 예측 AI 서비스
        </div>
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main style={{ padding: '40px' }}>
        {/* 여기에 대시보드 내용을 채워나갈 예정입니다. */}
      </main>
    </div>
  );
}

export default App;
