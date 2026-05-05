import React from 'react';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F9F9F9] font-sans">
      {/* 1. 좌측 메인 콘텐츠 영역 (나머지 공간 전체) */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Overview</h2>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">관리 센터</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold border border-green-200">
              실시간 운영 중
            </span>
          </div>
        </header>

        {/* 실제 대시보드 내용이 들어갈 자리 */}
        {children}
      </main>

      {/* 2. 우측 사이드바 메뉴 (컴포넌트로 분리) */}
      <Sidebar />
    </div>
  );
}