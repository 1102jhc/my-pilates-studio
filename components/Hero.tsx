'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 배경 이미지 & 어두운 오버레이 (글씨가 잘 보이게 함) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" /> 
        <img 
          src="https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=2000&auto=format&fit=crop" 
          alt="Pilates Studio Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 텍스트 콘텐츠 */}
      <div className="relative z-20 text-center text-white px-6 max-w-4xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-4 rounded-full border border-white/30 text-xs tracking-[0.2em] uppercase mb-6 backdrop-blur-sm">
            Premium Pilates Studio
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight mb-6"
        >
          내 몸이 경험하는 <br className="hidden md:block" />
          <span className="font-semibold">가장 아름다운 변화</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-white/80 mb-10 font-light"
        >
          전문 강사진의 섬세한 티칭으로 당신의 숨겨진 바디라인을 찾아드립니다.
        </motion.p>

        {/* 버튼 영역 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="w-full sm:w-auto px-8 py-4 bg-[#A8D1C7] text-slate-900 rounded-full font-bold hover:bg-[#8eb8ae] transition-all shadow-lg hover:scale-105">
            1:1 무료 체험 신청
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-medium hover:bg-white/20 transition-all">
            프로그램 안내
          </button>
        </motion.div>
      </div>
    </section>
  );
}