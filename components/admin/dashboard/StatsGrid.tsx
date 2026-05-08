'use client'

import React from 'react'
import useSWR from 'swr'
import { createClient } from '@/lib/supabase/client'
import StatCard from '../StatCard'
import { ViewType } from '@/components/admin/Sidebar' // 타입 임포트

// ✅ 1. 프롭스 타입 선언
interface StatsGridProps {
  setCurrentView: (view: ViewType) => void;
}

// ✅ 2. DB 데이터 타입 선언
interface InquirySummary {
  id: string;
  status: string | null;
}

const fetcher = async (): Promise<InquirySummary[]> => {
  const supabase = createClient()
  const { data, error } = await supabase.from('inquiries').select('id, status')
  if (error) throw error
  return data as InquirySummary[]
}

export default function StatsGrid({ setCurrentView }: StatsGridProps) {
  const { data: inquiries } = useSWR<InquirySummary[]>('inquiries-list', fetcher)

  const pendingCount = inquiries?.filter(item => item.status === '대기').length || 0

  // ✅ 3. 통계 데이터 구성 (미확인 문의에만 onClick 추가)
  const stats = [
    { 
      title: "미확인 문의", 
      value: pendingCount.toString(), 
      unit: "건", 
      color: pendingCount > 0 ? "text-red-500" : "text-gray-400",
      targetView: 'inquiry' as ViewType // 클릭 시 이동할 목적지
    },
    { title: "오늘 남은 수업", value: "8", unit: "타임", color: "text-indigo-600" },
    { title: "이번 주 신규 등록", value: "12", unit: "명" },
    { title: "이번 달 예상 매출", value: "1,250", unit: "만원" },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div 
          key={idx} 
          onClick={() => stat.targetView && setCurrentView(stat.targetView)}
          className={stat.targetView ? "cursor-pointer active:scale-[0.98] transition-transform" : ""}
        >
          <StatCard {...stat} />
        </div>
      ))}
    </section>
  );
}