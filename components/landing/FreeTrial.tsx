'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function FreeTrialSection() {
  const supabase = createClient();

  // 폼 상태 관리 (희망 시간 preferred_time 제거)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    content: '', // 문의 내용
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // 연락처 숫자만 입력 로직
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    setFormData({ ...formData, phone: onlyNums });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 🌟 알려주신 칼럼에 맞춰 데이터 삽입
      const { error } = await supabase
        .from('inquiries')
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
            content: formData.content,
            purpose: '무료체험 신청',
            status: '대기',
            // 아래 칼럼들은 비워두거나 기본값 처리
            preferred_time: null, 
            gender: null,
            experience: null,
            memo: null
            // 🌟 created_at은 DB 설정에 의해 자동으로 현재 시간이 찍힙니다.
          }
        ]);

      if (error) throw error;

      alert('무료체험 신청이 완료되었습니다! 확인 후 빠르게 연락드리겠습니다.');
      
      // 폼 초기화
      setFormData({ name: '', phone: '', content: '' });

    } catch (error) {
      console.error('DB 저장 에러:', error);
      alert('신청 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="free-trial" className="py-24 bg-[#0F172A] text-white px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* 브랜드 메시지 영역 */}
          <div className="flex-1 text-left">
            <div className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest mb-6">
              LIMITED TIME OFFER
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
              필라테스, <br/>
              <span className="text-indigo-400">직접 경험</span>해보세요.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10 break-keep">
              복잡한 절차 없이 성함과 연락처만 남겨주세요. <br className="hidden md:block" />
              원장님이 직접 상담 내용을 확인하고 연락드립니다.
            </p>
          </div>

          {/* 신청 폼 카드 */}
          <div className="w-full lg:w-[460px] bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl text-gray-900">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">무료체험 예약</h3>
              <p className="text-gray-400 text-sm">문의 시간을 확인하여 순차적으로 연락드립니다.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 성함 */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">성함</label>
                <input 
                  type="text" 
                  value={formData.name}
                  required
                  placeholder="성함을 입력해주세요"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-indigo-500 outline-none transition-all"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              {/* 연락처 */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">연락처</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  required
                  maxLength={11}
                  placeholder="숫자만 입력 (01012345678)"
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-indigo-500 outline-none transition-all"
                  onChange={handlePhoneChange}
                />
              </div>

              {/* 문의 내용 */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider ml-1">기타 문의사항</label>
                <textarea 
                  rows={4}
                  value={formData.content}
                  placeholder="궁금하신 점이나 상담 희망 시간을 자유롭게 적어주세요."
                  className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:border-indigo-500 outline-none transition-all resize-none"
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 text-white font-extrabold rounded-2xl shadow-xl transition-all ${
                  isSubmitting ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
                }`}
              >
                {isSubmitting ? '신청 처리 중...' : '무료체험 신청하기'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}