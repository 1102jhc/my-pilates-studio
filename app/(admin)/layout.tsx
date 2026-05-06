import React from 'react';
import Sidebar from '@/components/admin/Sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    /* 
       1. overflow-x-hidden: 모바일에서 사이드바가 화면 밖에 있을 때 가로 스크롤 방지 
       2. flex-row-reverse: 오른쪽 사이드바 디자인일 경우 구조적으로 더 깔끔할 수 있지만, 
          기존처럼 main -> Sidebar 순서를 유지하면서 flex로 배치합니다.
    */
    <div className="flex min-h-screen bg-[#F9F9F9] font-sans overflow-x-hidden">
      
      {/* 
         좌측 메인 콘텐츠 영역 
         - flex-1: 남은 공간을 다 차지함
         - min-w-0: ★핵심★ PC에서 창을 줄여도 본문이 사이드바를 밀어내지 않고 스스로 줄어듦
      */}
      <main className="flex-1 min-w-0 p-6 md:p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">Overview</h2>
            <h1 className="text-3xl font-extrabold text-gray-900 mt-2 tracking-tight">관리 센터</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px] bg-green-50 text-green-600 px-3 py-1.5 rounded-full font-bold border border-green-100 shadow-sm">
              ● 실시간 운영 중
            </span>
          </div>
        </header>

        {/* 실제 대시보드 내용 */}
        <div className="relative">
          {children}
        </div>
      </main>

      {/* 
         우측 사이드바 메뉴 
         - 이 컴포넌트 내부에서 md:sticky와 fixed 로직이 작동합니다.
      */}
      <Sidebar />
      
    </div>
  );
}