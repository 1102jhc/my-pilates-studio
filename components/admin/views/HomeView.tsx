'use client';

import React from 'react';
import StatsGrid from '@/components/admin/dashboard/StatsGrid';
import SalesChart from '@/components/admin/dashboard/AnalyticsChart';
import RecentInquiries from '@/components/admin/dashboard/RecentInquiries';
import ScheduleList from '@/components/admin/dashboard/ScheduleList';
import { ViewType } from '@/components/admin/Sidebar';

// ✅ 1. 프롭스 타입 선언 (잘 만드셨어요!)
interface HomeViewProps {
  setCurrentView: (view: ViewType) => void;
}

// ✅ 2. 여기서 { setCurrentView } 를 꼭 받아줘야 합니다!
export default function HomeView({ setCurrentView }: HomeViewProps) {
  return (
    <div className="space-y-8">
      {/* 🌟 이제 여기서 setCurrentView를 마음껏 쓸 수 있습니다. */}
      <StatsGrid setCurrentView={setCurrentView} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <SalesChart />
          <RecentInquiries />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <ScheduleList />
          </div>
        </div>
      </div>
    </div>
  );
}