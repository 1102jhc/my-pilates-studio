'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Sidebar, { ViewType } from '@/components/admin/Sidebar'
import HomeView from '@/components/admin/views/HomeView'
import InquiryView from '@/components/admin/views/InquiryView'
import { motion, AnimatePresence } from 'framer-motion'

export default function DashboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // URL에서 view 값을 가져오고, 없으면 기본값 'home'
  const currentView = (searchParams.get('view') as ViewType) || 'home'

  // 메뉴 변경 시 URL을 업데이트하여 상태를 보존합니다.
  const setCurrentView = (view: ViewType) => {
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
        <header className="p-6 md:p-10 pb-0">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-[11px] font-bold text-indigo-400 uppercase tracking-[0.2em]">
                {viewInfo[currentView].sub}
              </h2>
              <h1 className="text-3xl font-extrabold text-gray-900 mt-2 tracking-tight">
                {viewInfo[currentView].title}
              </h1>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 md:px-10 pb-10">
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

      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
    </div>
  )
}