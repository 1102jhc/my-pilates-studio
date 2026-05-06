'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function Sidebar() {
  const pathname = usePathname();
  const supabase = createClient();
  // 📱 모바일 메뉴 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  const menus = [
    { label: '대시보드 홈', href: '/dashboard', count: 0 },
    { label: '상담 신청 내역', href: '/inquiry', count: 3 },
    { label: '강사 프로필 관리', href: '/instructors', count: 0 },
    { label: '프로그램 설정', href: '/programs', count: 0 },
    { label: '사이트 통계', href: '/stats', count: 0 },
  ];

  return (
    <>
      {/* 1. 모바일용 플로팅 토글 버튼 (PC에서는 숨김) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-6 right-6 z-50 p-3 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-200 active:scale-95 transition-transform"
        >
          <span className="text-xl">☰</span>
        </button>
      )}

      {/* 2. 사이드바 본체 */}
      <aside className={`
        /* 공통: 너비 고정 및 수축 방지 */
        w-[320px] min-w-[320px] flex-shrink-0 bg-white border-l border-gray-100 flex flex-col h-screen
        
        /* 📱 모바일: 오른쪽 화면 밖으로 밀어두기 (fixed) */
        fixed top-0 right-0 z-[60] transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        
        /* 💻 PC: 화면에 붙여두고 항상 노출 (sticky) */
        md:sticky md:translate-x-0
      `}>
        <div className="p-10 flex flex-col h-full items-start">
          
          {/* 모바일용 닫기 버튼 */}
          <button 
            onClick={() => setIsOpen(false)}
            className="md:hidden self-end mb-4 p-2 text-gray-400 hover:text-gray-600"
          >
            ✕ 닫기
          </button>

          {/* 프로필 섹션 */}
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl mb-8 shadow-xl shadow-indigo-100 flex items-center justify-center text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          
          {/* 프로필 섹션: 클릭 시 메인 페이지('/')로 이동 */}
          <div className="mb-12 text-left">
            <Link href="/" className="group block">
              <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-2 group-hover:text-indigo-400 transition-colors">
                Administrator
              </p>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors break-keep">
                딤섬 필라테스<br/>
                <span className="relative">
                  원장님
                  {/* 호버 시 나타나는 밑줄 효과 (선택 사항) */}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
                </span>
              </h2>
            </Link>
          </div>

          {/* 메뉴 네비게이션 */}
          <nav className="w-full space-y-2 flex-1">
            {menus.map((menu) => (
              <Link key={menu.href} href={menu.href} onClick={() => setIsOpen(false)}>
                <div className={`
                  flex items-center justify-between px-6 py-4 rounded-2xl transition-all cursor-pointer mb-1
                  ${pathname === menu.href 
                    ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm' 
                    : 'text-gray-500 hover:bg-gray-50'}
                `}>
                  <span className="text-[15px]">{menu.label}</span>
                  {menu.count > 0 && (
                    <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                      {menu.count}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </nav>

          {/* 하단 로그아웃 */}
          <div className="mt-auto w-full pt-8 border-t border-gray-50">
            <button 
              onClick={handleLogout}
              className="w-full text-left px-6 py-2 text-sm text-gray-400 hover:text-red-500 transition-colors font-medium"
            >
              로그아웃
            </button>
          </div>
        </div>
      </aside>

      {/* 3. 모바일용 배경 오버레이 (열려있을 때만) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[55] md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}