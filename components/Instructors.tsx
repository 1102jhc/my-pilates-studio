'use client';

import { motion } from 'framer-motion';

const instructors = [
  {
    name: '김지연 원장',
    role: 'Head Instructor',
    description: '재활 필라테스 전문, 체형 교정 마스터',
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: '이수아 강사',
    role: 'Senior Instructor',
    description: '산전/산후 케어, 다이어트 및 코어 강화',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop',
  },
  {
    name: '박민지 강사',
    role: 'Instructor',
    description: '바른 자세 교정, 비기너 전문 맞춤 티칭',
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop',
  },
];

export default function Instructors() {
  return (
    <section id="instructors" className="py-24 bg-[#FDFBF9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-slate-900"
          >
            Our Instructors
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500"
          >
            전문 자격을 갖춘 최고의 강사진이 함께합니다
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {instructors.map((instructor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6">
                <img 
                  src={instructor.image} 
                  alt={instructor.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{instructor.name}</h3>
                <p className="text-[#A8D1C7] font-semibold text-sm mb-3">{instructor.role}</p>
                <p className="text-slate-600 text-sm">{instructor.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}