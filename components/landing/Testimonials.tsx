'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "이지은 님",
    text: "원장님 티칭이 정말 섬세해요! 한 달 만에 거북목이 많이 좋아졌고, 운동하는 시간이 너무 즐겁습니다.",
    rating: 5
  },
  {
    name: "박서연 님",
    text: "프라이빗 룸이 너무 예쁘고 깨끗해서 갈 때마다 힐링하는 기분이에요. 그룹 레슨도 소규모라 꼼꼼히 봐주십니다.",
    rating: 5
  },
  {
    name: "김민재 님",
    text: "남자라서 필라테스가 처음엔 부담스러웠는데, 체형 교정 목적으로 시작하길 정말 잘한 것 같아요. 대만족입니다!",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-[#A8D1C7]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-slate-900"
          >
            Member Reviews
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600"
          >
            스튜디오와 함께 변화를 경험한 수강생들의 리얼 후기
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FBBF24] text-[#FBBF24]" />
                ))}
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">{review.text}</p>
              <p className="font-bold text-slate-900">{review.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}