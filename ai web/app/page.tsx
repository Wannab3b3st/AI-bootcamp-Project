import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-[#FFF5F7] px-6 text-center font-sans">
      
      {/* 아이콘 */}
      <div className="mb-10 flex h-24 w-24 items-center justify-center rounded-full bg-[#FFF0F2]">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#FF4D6D]">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FF4D6D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>

      {/* 메인 타이틀 */}
      <h1 className="mb-6 text-4xl font-extrabold leading-tight text-[#1A1F27] md:text-5xl">
        어떤 꽃을 <br />
        <span className="relative z-10 inline-block">
          찾으시나요?
          <span className="absolute bottom-1 left-0 -z-10 h-3 w-full bg-[#FFBDC8] opacity-60"></span>
        </span>
      </h1>

      {/* 서브 문구 */}
      <p className="mb-12 text-gray-500 leading-relaxed">
        오늘 가장 아름다운 꽃이 있는 곳, <br />
        <span className="font-bold text-gray-700">BloomLink</span>가 전국 꽃 시장 정보를 안내해 드립니다.
      </p>

      {/* 버튼: 클릭 시 /select 경로로 이동 */}
      <Link href="/select">
        <button className="flex items-center gap-2 rounded-full bg-[#FF4D6D] px-10 py-4 text-xl font-bold text-white shadow-lg transition-all hover:bg-[#E63E5D] hover:scale-105 active:scale-95">
          꽃 찾아보기 
          <span className="ml-1">→</span>
        </button>
      </Link>
    </div>
  );
}
