'use client'

import React from 'react'
import Link from 'next/link'
import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import { motion, AnimatePresence } from 'framer-motion'

export type ViewType = 'home' | 'inquiry' | 'instructors' | 'programs';

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

// 🌟 Props 타입에 isOpen과 onClose 추가 (any 없음)
interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const fetcher = async (): Promise<Inquiry[]> => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('inquiries')
    .select('id, created_at, name, phone, content, status')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return (data || []) as Inquiry[]
}

export default function Sidebar({ currentView, setCurrentView, isOpen, onClose }: SidebarProps) {
  const { data: inquiries } = useSWR<Inquiry[]>('admin/inquiries-list', fetcher)
  const pendingCount: number = inquiries?.filter(item => item.status === '대기').length || 0

  const handleLogout = async () => {
    const supabase = createClient()
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
    <>
      {/* 🌟 1. 모바일용 어두운 배경 (Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
          />
        )}
      </AnimatePresence>

      {/* 🌟 2. 사이드바 본체 (모바일: 오른쪽 슬라이드 / PC: 오른쪽 고정) */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '100%' }} // 모바일 슬라이드 핵심 로직
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed lg:sticky top-0 right-0 h-screen w-[280px] md:w-[320px] bg-white border-l border-gray-100 flex flex-col p-10 shadow-2xl lg:shadow-sm z-[70] lg:translate-x-0`}
      >
        <div className="flex flex-col h-full items-start w-full relative">
          
          {/* 모바일용 닫기 버튼 */}
          <button 
            onClick={onClose} 
            className="lg:hidden absolute -top-4 -right-4 p-4 text-gray-400 font-bold"
          >
            닫기
          </button>

          <button onClick={() => { setCurrentView('home'); onClose(); }} className="w-12 h-12 bg-indigo-600 rounded-2xl mb-8 flex items-center justify-center text-white font-bold text-xl hover:scale-105 transition-transform">P</button>
          
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
                  onClick={() => {
                    setCurrentView(menu.id)
                    onClose() // 메뉴 선택 시 모바일에서는 닫아줌
                  }}
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
      </motion.aside>
    </>
  )
}