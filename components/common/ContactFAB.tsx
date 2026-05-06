'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react'; // 카톡용 아이콘은 유지

export default function ContactFAB() {
  const INSTAGRAM_DM_URL = "https://ig.me/m/1102jhc"; 
  const KAKAO_CHAT_URL = "https://open.kakao.com/o/sk79WGti";

  return (
    <div className="fixed bottom-8 right-8 z-[60] flex flex-col items-center group">
      {/* 1. 카카오톡 버튼 (Hover 시 등장) */}
      <button
        onClick={() => window.open(KAKAO_CHAT_URL, '_blank')}
        className="w-14 h-14 bg-[#FEE500] rounded-full shadow-xl flex items-center justify-center mb-3 
                   transition-all duration-300 translate-y-10 opacity-0 pointer-events-none
                   group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto
                   hover:scale-110 active:scale-95"
      >
        <MessageCircle size={26} className="text-[#3c1e1e] fill-[#3c1e1e]" />
      </button>

      {/* 2. 메인 DM 버튼 (SVG 직접 삽입) */}
      <div className="relative">
        <button
          onClick={() => window.open(INSTAGRAM_DM_URL, '_blank')}
          className="w-16 h-16 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white 
                     rounded-full shadow-2xl flex items-center justify-center transition-all 
                     hover:scale-110 active:scale-95"
        >
          {/* 직접 작성한 인스타그램 SVG 아이콘 */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="30" 
            height="30" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}