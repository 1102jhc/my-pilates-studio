'use client';

import React from 'react';
import StatsGrid from '@/components/admin/dashboard/StatsGrid';
import SalesChart from '@/components/admin/dashboard/AnalyticsChart';
import RecentInquiries from '@/components/admin/dashboard/RecentInquiries';
import ScheduleList from '@/components/admin/dashboard/ScheduleList';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* 1. 요약 지표 섹션 (StatCard 모음) */}
      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* 2. 메인 통계 그래프 */}
          <SalesChart />
          
          {/* 3. 실시간 상담 알림 요약 */}
          <RecentInquiries />
        </div>

        {/* 4. 오늘의 일정 (Sticky 적용으로 고정) */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <ScheduleList />
          </div>
        </div>
      </div>
    </div>
  );
}