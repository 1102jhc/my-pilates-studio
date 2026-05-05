
'use client';

import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit: string;       color?: string;    
}

export default function StatCard({ title, value, unit, color = 'text-gray-900' }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm transition-hover hover:shadow-md">
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <div className="flex items-baseline gap-1">
        <span className={`text-2xl font-bold ${color}`}>{value}</span>
        <span className="text-sm text-gray-400 font-medium">{unit}</span>
      </div>
    </div>
  );
}