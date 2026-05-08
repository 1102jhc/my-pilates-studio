'use client'

import React from 'react'
import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Inquiry } from '@/components/admin/Sidebar'

// ✅ 유틸리티: 엄격한 타입 정의
const formatDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return '-'
  return `${date.getFullYear()}. ${String(date.getMonth() + 1).padStart(2, '0')}. ${String(date.getDate()).padStart(2, '0')}.`
}

const formatPhone = (phone: string | null | undefined): string => {
  if (!phone) return '-'
  const nums = phone.replace(/[^0-9]/g, '')
  if (nums.length === 11) return nums.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  return nums
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

export default function InquiryView() {
  const { data: inquiries, error } = useSWR<Inquiry[]>('admin/inquiries-list', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    keepPreviousData: true,
  })

  return (
    <div className="w-full max-w-4xl mx-auto pb-20 lg:pb-10">
      {/* 🌟 헤더 (모바일/PC 공통) */}
      <div className="flex justify-between items-end px-4 lg:px-0 mb-6 lg:mb-8">
        <div>
          <h3 className="text-2xl lg:text-3xl font-black text-gray-900 tracking-tight">상담 현황</h3>
          <p className="text-xs lg:text-sm font-bold text-indigo-500 mt-1 uppercase tracking-widest">Dimsum Pilates Admin</p>
        </div>
        <div className="bg-white border border-gray-100 px-4 py-2 rounded-2xl shadow-sm">
          <span className="text-[10px] font-black text-gray-400 uppercase mr-2">Total</span>
          <span className="text-lg font-black text-indigo-600">{inquiries?.length || 0}</span>
        </div>
      </div>

      {/* 🖥️ PC 버전: 기존 테이블 (생략 없이 로직 유지) */}
      <div className="hidden lg:block bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] uppercase tracking-wider text-gray-400 border-b border-gray-50 font-bold">
              <th className="py-6 px-10">신청 일시</th>
              <th className="py-6 px-10">이름</th>
              <th className="py-6 px-10">연락처</th>
              <th className="py-6 px-10">상담 내용</th>
              <th className="py-6 px-10 text-center">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {inquiries?.map((item: Inquiry) => (
              <tr key={item.id} className="hover:bg-indigo-50/5 transition-colors group">
                <td className="py-7 px-10 text-sm text-gray-400 font-medium" suppressHydrationWarning>{formatDate(item.created_at)}</td>
                <td className="py-7 px-10 font-bold text-gray-900 text-base">{item.name}</td>
                <td className="py-7 px-10 text-sm font-bold text-indigo-600/80 tracking-tight">{formatPhone(item.phone)}</td>
                <td className="py-7 px-10 text-sm text-gray-500 leading-relaxed max-w-[250px] truncate">{item.content || '-'}</td>
                <td className="py-7 px-10 text-center">
                  <span className={`px-4 py-2 rounded-full text-[10px] font-black tracking-widest ${item.status === '대기' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'}`}>
                    {item.status || '대기'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 📱 모바일 버전: "조잡함"을 뺀 미니멀 카드 */}
      <div className="lg:hidden space-y-3 px-4">
        {inquiries && inquiries.length > 0 ? (
          inquiries.map((item: Inquiry) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[24px] border border-gray-50 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] active:scale-[0.98] transition-transform"
            >
              {/* 1. 상단: 상태 배지와 날짜 */}
              <div className="flex justify-between items-center mb-5">
                <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg tracking-wider uppercase ${item.status === '대기' ? 'bg-orange-100/50 text-orange-600' : 'bg-green-100/50 text-green-600'}`}>
                  {item.status || '대기'}
                </span>
                <span className="text-[10px] font-bold text-gray-300" suppressHydrationWarning>
                  {formatDate(item.created_at)}
                </span>
              </div>

              {/* 2. 중단: 이름 (크게) + 번호 (작게) */}
              <div className="mb-5">
                <h4 className="text-2xl font-black text-gray-900 tracking-tighter mb-1">{item.name}</h4>
                <p className="text-sm font-bold text-indigo-500/80 tracking-tight">{formatPhone(item.phone)}</p>
              </div>

              {/* 3. 하단: 문의 내용 (정갈한 텍스트) */}
              <div className="relative">
                {/* 왼쪽 바 장식으로 내용 강조 */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-indigo-50 rounded-full" />
                <p className="pl-4 text-sm text-gray-500 leading-relaxed font-medium">
                  {item.content || '작성된 문의 내용이 없습니다.'}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="py-20 text-center text-gray-300 text-sm font-bold tracking-widest uppercase">No Inquiry Data</div>
        )}
      </div>
    </div>
  )
}