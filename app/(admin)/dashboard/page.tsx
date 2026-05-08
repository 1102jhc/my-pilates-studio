'use client'

import React, { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Sidebar, { ViewType } from '@/components/admin/Sidebar'
import HomeView from '@/components/admin/views/HomeView'
import InquiryView from '@/components/admin/views/InquiryView'
import { motion, AnimatePresence } from 'framer-motion'

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-10 text-gray-400 font-bold">페이지 로드 중...</div>}>
      <DashboardContent />
    </Suspense>
  )
}

function DashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false) // 🌟 사이드바 상태
  
  const currentView = (searchParams.get('view') as ViewType) || 'home'

  const setCurrentView = (view: ViewType): void => {
    router.push(`/dashboard?view=${view}`)
  }

  const viewInfo: Record<ViewType, { title: string; sub: string }> = {
    home: { title: '관리 센터', sub: 'Overview' },
    inquiry: { title: '상담 신청 내역', sub: 'Inquiry Management' },
    instructors: { title: '강사 관리', sub: 'Instructors' },
    programs: { title: '프로그램 설정', sub: 'Programs' },
  }

  return (
    <div className="flex min-h-screen bg-[#F9F9F9] font-sans overflow-hidden">
      
      <main className="flex-1 min-w-0 flex flex-col h-screen">
        <header className="p-6 md:p-10 pb-0 flex justify-between items-start">
          <div>
            <h2 className="text-[11px] font-bold text-indigo-400 uppercase tracking-[0.2em]">
              {viewInfo[currentView]?.sub || 'Overview'}
            </h2>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-2 tracking-tight">
              {viewInfo[currentView]?.title || '대시보드'}
            </h1>
          </div>

          {/* 🌟 모바일 전용 햄버거 메뉴 버튼 */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-3 bg-white border border-gray-100 rounded-xl shadow-sm text-indigo-600 font-bold text-xs"
          >
            MENU
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 md:px-10 pb-10 mt-6 lg:mt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentView === 'home' && <HomeView setCurrentView={setCurrentView} />}
              {currentView === 'inquiry' && <InquiryView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* 🌟 사이드바 (상태 전달) */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
    </div>
  )
}