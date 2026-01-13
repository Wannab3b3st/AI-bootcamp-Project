import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 여기서 A가 대문자인지 꼭 확인하세요!
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
