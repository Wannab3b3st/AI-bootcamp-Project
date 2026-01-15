import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

// 2페이지는 아직 디자인 전이므로 임시 연결합니다.
const SelectPage = () => (
  <div style={{padding: '100px', textAlign: 'center'}}>
    <h2>시장 및 품목 선택 페이지 (준비 중)</h2>
    <a href="/dashboard" style={{color: '#ff4d6d', fontWeight: 800}}>대시보드로 바로가기 →</a>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* 첫 화면 설정 */}
        <Route path="/" element={<LandingPage />} />
        {/* 이동할 페이지들 */}
        <Route path="/select" element={<SelectPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
