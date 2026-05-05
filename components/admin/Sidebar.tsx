'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function Sidebar() {
  const pathname = usePathname();
  const supabase = createClient();

  // 🚪 즉시 로그아웃 함수
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // 세션 삭제를 미들웨어에 즉각 알리기 위해 새로고침하며 이동
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
    <aside className="w-80 bg-white border-l border-gray-100 shadow-sm flex flex-col h-screen sticky top-0">
      <div className="p-8">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl mb-6 shadow-lg shadow-indigo-200"></div>
        <div className="mb-8">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">Administrator</p>
          <p className="text-lg font-bold text-gray-900">OO 필라테스 원장님</p>
        </div>

        <nav className="space-y-2">
          {menus.map((menu) => (
            <Link key={menu.href} href={menu.href}>
              <div className={`
                flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all mb-1
                ${pathname === menu.href 
                  ? 'bg-indigo-50 text-indigo-700 font-bold' 
                  : 'text-gray-500 hover:bg-gray-50'}
              `}>
                <span className="text-sm">{menu.label}</span>
                {menu.count > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                    {menu.count}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 border-t border-gray-50">
        <button 
          onClick={handleLogout}
          className="w-full text-left text-sm text-gray-400 hover:text-red-500 transition-colors font-medium"
        >
          로그아웃
        </button>
      </div>
    </aside>
  );
}