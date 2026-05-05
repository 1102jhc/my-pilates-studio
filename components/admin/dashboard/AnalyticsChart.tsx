// components/admin/dashboard/SalesChart.tsx
import React from 'react';

export default function SalesChart() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 h-[400px] flex flex-col items-center justify-center text-center shadow-sm">
      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl text-indigo-600">📈</span>
      </div>
      <h3 className="text-lg font-bold text-gray-900">매출 및 방문 트렌드</h3>
      <p className="text-gray-500 mt-2">데이터가 쌓이면 여기에 차트가 표시됩니다.</p>
    </div>
  );
}