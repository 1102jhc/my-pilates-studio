'use client';

import { motion } from 'framer-motion';
import { User, Users, Sparkles } from 'lucide-react';

const programData = [
  {
    title: '1:1 프라이빗 레슨',
    description: '오직 회원님 한 분만을 위한 체계적인 맞춤형 체형 교정 및 통증 케어',
    icon: <User className="w-10 h-10 mb-6 text-[#A8D1C7]" />,
    features: ['정밀 체형 분석', '재활 및 통증 완화', '산전/산후 집중 케어'],
  },
  {
    title: '2:1 듀엣 레슨',
    description: '가족, 연인, 친구와 함께 합리적인 비용으로 즐기는 프라이빗 레슨',
    icon: <Users className="w-10 h-10 mb-6 text-[#A8D1C7]" />,
    features: ['동기 부여 업그레이드', '맞춤형 난이도 조절', '프라이빗 룸 사용'],
  },
  {
    title: '4:1 소규모 그룹 레슨',
    description: '소수 정예로 진행되어 강사의 섬세한 티칭을 놓치지 않는 그룹 운동',
    icon: <Sparkles className="w-10 h-10 mb-6 text-[#A8D1C7]" />,
    features: ['다양한 기구 사용', '코어 강화 및 다이어트', '합리적인 수강료'],
  },
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* 섹션 제목 영역 */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-slate-900"
          >
            Our Programs
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500"
          >
            당신의 목적과 컨디션에 맞는 최적의 클래스를 선택하세요
          </motion.p>
        </div>

        {/* 프로그램 카드 그리드 */}
        <div className="grid md:grid-cols-3 gap-8">
          {programData.map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} // 스크롤 시 한 번만 애니메이션 실행
              transition={{ delay: index * 0.2 }} // 카드가 순차적으로 나타나도록 딜레이
              className="p-8 rounded-3xl bg-[#FDFBF9] border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              {program.icon}
              <h3 className="text-xl font-bold mb-3 text-slate-900">{program.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {program.description}
              </p>
              
              {/* 세부 특징 리스트 */}
              <ul className="space-y-3">
                {program.features.map((feature, i) => (
                  <li key={i} className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A8D1C7]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}