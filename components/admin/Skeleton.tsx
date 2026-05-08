'use client'

import React from 'react'

// 테이블 행 모양의 스켈레톤입니다.
export const TableSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {/* 5개의 가짜 줄을 만듭니다 */}
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
          <div className="flex flex-col gap-2 w-1/4">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            <div className="h-3 bg-gray-100 rounded w-1/2"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-8 bg-gray-200 rounded-xl w-20"></div>
        </div>
      ))}
    </div>
  )
}

// 대시보드 지표 카드용 스켈레톤 (나중에 홈에서 쓰세요!)
export const CardSkeleton = () => {
  return (
    <div className="animate-pulse p-6 bg-white rounded-3xl border border-gray-100 shadow-sm h-32 w-full">
      <div className="h-4 bg-gray-100 rounded w-1/4 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-1/2"></div>
    </div>
  )
}