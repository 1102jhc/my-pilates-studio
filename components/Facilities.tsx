'use client';

import { motion } from 'framer-motion';

// 가장 안정적인 이미지 링크들로 구성했습니다.
const facilities = [
  {
    title: '1:1 프라이빗 룸',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000',
  },
  {
    title: '소규모 그룹 레슨 룸',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=1000',
  },
  {
    title: '휴식 라운지 & 탈의실',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000',
  },
];

export default function Facilities() {
  return (
    <section id="facilities" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-slate-900"
          >
            Studio Facilities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500"
          >
            오롯이 운동에만 집중할 수 있는 프리미엄 공간
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              // 이미지가 늦게 뜰 때를 대비해 연한 회색 배경(bg-slate-100)을 미리 깔아둡니다.
              className="relative group overflow-hidden rounded-3xl aspect-square bg-slate-100"
            >
              <img 
                src={facility.image} 
                alt={facility.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                // 🔥 만약 외부 이미지가 막혀서 에러가 나면, 자동으로 이 글씨가 적힌 대체 이미지를 보여줍니다!
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/1000x1000.png?text=Image+Load+Failed";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-white text-xl font-bold">{facility.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}