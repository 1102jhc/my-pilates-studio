'use client';

import React, { useState } from 'react';

export default function FreeTrialSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: lib/supabase/client.ts를 활용해 DB에 저장하는 로직을 추가하세요.
    console.log('신청 데이터:', formData);
    alert('무료체험 신청이 완료되었습니다! 원장님이 확인 후 연락드릴 예정입니다.');
  };

  return (
    <section id="free-trial" className="py-24 bg-[#0F172A] text-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* 1. 브랜드 메시지 영역 */}
          <div className="flex-1 text-left">
            <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest mb-6">
              LIMITED TIME OFFER
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
              필라테스, <br/>
              <span className="text-indigo-400">백문이 불여일견</span><br/>
              직접 경험해보세요.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 break-keep">
              내 몸의 정렬을 전문가와 함께 체크하고, <br className="hidden md:block" />
              나에게 꼭 맞는 운동인지 무료로 확인해보세요. 
              원장님이 직접 상담 내용을 검토합니다.
            </p>
            
            {/* 체크리스트 */}
            <ul className="space-y-4">
              {[
                '전문 강사의 1:1 체형 분석',
                '개인별 맞춤 시퀀스 제안',
                '신규 체험 회원 특별 할인권 증정'
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center">
                    <svg className="w-3 h-3 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. 신청 폼 카드 영역 */}
          <div className="w-full lg:w-[460px] bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl">
            <div className="mb-8">
              <h3 className="text-gray-900 text-2xl font-bold mb-2">무료체험 예약</h3>
              <p className="text-gray-400 text-sm">빠르게 예약 확정 문자를 보내드립니다.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">성함</label>
                <input 
                  type="text" 
                  placeholder="성함을 입력해주세요"
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">연락처</label>
                <input 
                  type="tel" 
                  placeholder="010-0000-0000"
                  required
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">문의 및 희망 시간</label>
                <textarea 
                  rows={3}
                  placeholder="원하시는 시간대나 궁금한 점을 적어주세요."
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all placeholder:text-gray-300 resize-none"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-indigo-600 text-white font-extrabold rounded-2xl shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all"
              >
                신청하기
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}