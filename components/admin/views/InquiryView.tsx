'use client'

import React from 'react'
import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { Inquiry } from '@/components/admin/Sidebar'

const formatPhoneNumber = (phone: string | null | undefined) => {
  if (!phone) return ''
  const nums = phone.replace(/[^0-9]/g, '')
  if (nums.length === 11) return nums.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  if (nums.length === 10) return nums.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  return nums
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

export default function InquiryView() {
  const { data: inquiries, error } = useSWR<Inquiry[]>('admin/inquiries-list', fetcher, {
    revalidateOnMount: true,
    revalidateIfStale: false, // 🌟 이전 데이터가 있으면 로딩 없이 즉시 노출
    revalidateOnFocus: false, // 🌟 알트 탭 해서 돌아올 때 자동 새로고침 방지
    keepPreviousData: true,    // 🌟 새로운 데이터를 가져오는 동안에도 이전 데이터를 유지 
  })

  return (
    <div className="w-full">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
          <h3 className="text-sm font-bold text-gray-600">상담 신청 현황</h3>
          <span className="text-[11px] bg-indigo-600 text-white px-3 py-1 rounded-full font-bold">
            {inquiries ? `${inquiries.length}건` : '--건'}
          </span>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[11px] uppercase tracking-wider text-gray-400 border-b border-gray-50 font-bold">
                <th className="py-5 px-8">신청 일시</th>
                <th className="py-5 px-8">이름</th>
                <th className="py-5 px-8">연락처</th>
                <th className="py-5 px-8">상담 내용</th>
                <th className="py-5 px-8 text-center">상태</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {inquiries && inquiries.length > 0 ? (
                inquiries.map((item: Inquiry) => (
                  <motion.tr key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-indigo-50/10 transition-colors group">
                    <td className="py-6 px-8 text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString('ko-KR')}</td>
                    <td className="py-6 px-8 font-bold text-gray-800">{item.name}</td>
                    <td className="py-6 px-8 text-sm font-semibold text-indigo-600">{formatPhoneNumber(item.phone)}</td>
                    <td className="py-6 px-8 text-sm text-gray-600 leading-relaxed"><div className="line-clamp-2">{item.content || '-'}</div></td>
                    <td className="py-6 px-8 text-center">
                      <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase ${item.status === '대기' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'}`}>{item.status || '대기'}</span>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr><td colSpan={5} className="py-32 text-center text-gray-300 text-sm">{!inquiries && !error ? '로딩 중...' : '접수된 내역이 없습니다.'}</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}