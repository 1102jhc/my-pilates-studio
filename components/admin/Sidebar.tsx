'use client'

import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

export type ViewType = 'home' | 'inquiry' | 'instructors' | 'programs';

// ✅ 설계도는 완벽하게 (11개 칼럼 전체 타입)
export interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  gender: string | null;
  experience: string | null;
  purpose: string | null;
  preferred_time: string | null;
  content: string | null;
  status: string | null;
  memo: string | null;
}

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

const fetcher = async (): Promise<Inquiry[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('inquiries')
    .select('id, created_at, name, phone, content, status') // 컬럼 개수를 100% 일치시켜야 함
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Inquiry[]
}

export default function Sidebar({ currentView, setCurrentView }: SidebarProps) {
  const supabase = createClient()
  const { data: inquiries } = useSWR<Inquiry[]>('admin/inquiries-list', fetcher)
  const pendingCount = inquiries?.filter(item => item.status === '대기').length || 0

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login'
  }

  const menus: { id: ViewType; label: string }[] = [
    { id: 'home', label: '대시보드 홈' },
    { id: 'inquiry', label: '상담 신청 내역' },
    { id: 'instructors', label: '강사 프로필 관리' },
    { id: 'programs', label: '프로그램 설정' },
  ]

  return (
    <aside className="w-[320px] min-w-[320px] bg-white border-l border-gray-100 flex flex-col h-screen sticky top-0 right-0 z-50 shadow-sm">
      <div className="p-10 flex flex-col h-full items-start">
        <button onClick={() => setCurrentView('home')} className="w-12 h-12 bg-indigo-600 rounded-2xl mb-8 flex items-center justify-center text-white font-bold text-xl hover:scale-105 transition-transform">P</button>
        
        <Link href="/" className="mb-12 text-left group outline-none block">
          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em] mb-2 group-hover:text-indigo-400 transition-colors">Administrator</p>
          <h2 className="text-2xl font-bold text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
            딤섬 필라테스<br/><span className="text-indigo-600 underline decoration-indigo-100 underline-offset-4">원장님</span>
          </h2>
        </Link>

        <nav className="w-full space-y-2 flex-1">
          {menus.map((menu) => {
            const isActive = currentView === menu.id
            return (
              <button
                key={menu.id}
                onClick={() => setCurrentView(menu.id)}
                className={`w-full relative flex items-center justify-between px-6 py-4 rounded-2xl transition-all outline-none ${isActive ? 'text-indigo-700 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {isActive && <motion.div layoutId="active-pill" className="absolute inset-0 bg-indigo-50 rounded-2xl -z-10 border border-indigo-100/50" />}
                <span className="text-[15px] z-10">{menu.label}</span>
                {menu.id === 'inquiry' && pendingCount > 0 && (
                  <span className="z-10 ml-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-black rounded-full min-w-[1.5rem] flex items-center justify-center shadow-sm shadow-red-200">
                    {pendingCount}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="mt-auto w-full pt-8 border-t border-gray-50">
          <button onClick={handleLogout} className="w-full text-left px-6 py-2 text-sm text-gray-400 hover:text-red-500 font-medium">로그아웃</button>
        </div>
      </div>
    </aside>
  )
}