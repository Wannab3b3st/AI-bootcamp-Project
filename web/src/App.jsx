import React from 'react';
import './index.css';

function App() {
  return (
    <div className="app-wrapper">
      {/* 상단 네비게이션 바 영역 */}
      <nav className="nav-container">
        {/* 사이트 타이틀 (좌측 배치) */}
        <div className="nav-logo">
          화훼 경매 금액 예측 AI 서비스
        </div>

        {/* 화훼유통정보 사이트 스타일의 메뉴 항목들 */}
        <div className="nav-menu">
          <span className="menu-item">경매정보</span>
          <span className="menu-item">열린광장</span>
          <span className="menu-item">공공데이터</span>
        </div>
      </nav>

      {/* 대시보드 메인 콘텐츠가 들어갈 자리 */}
      <main style={{ padding: '40px' }}>
        {/* 이후 여기에 이전에 만든 차트와 카드들을 배치할 예정입니다. */}
      </main>
    </div>
  );
}

export default App;
