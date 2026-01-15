import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

// 2페이지는 선택 화면을 위해 비워둡니다.
const SelectPage = () => (
  <div style={{padding: '100px', textAlign: 'center'}}>
    <h2 style={{fontWeight: 800}}>어느 꽃 시장을 방문하시나요?</h2>
    <p style={{color: '#64748b', marginBottom: '30px'}}>시장 및 품목 선택 화면 준비 중...</p>
    <a href="/dashboard" style={{
      padding: '12px 25px', backgroundColor: '#1e293b', color: 'white', 
      borderRadius: '8px', fontWeight: 700
    }}>대시보드로 바로가기 →</a>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* 접속 시 가장 먼저 보이는 첫 화면 */}
        <Route path="/" element={<LandingPage />} />
        {/* 이동 경로 설정 */}
        <Route path="/select" element={<SelectPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
