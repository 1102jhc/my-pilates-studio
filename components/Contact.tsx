'use client';

import { motion } from 'framer-motion';
// 💡 이제 말썽 피우던 Instagram 아이콘은 라이브러리에서 부르지 않습니다!
import { MapPin, Phone, Clock } from 'lucide-react'; 

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#FDFBF9]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-slate-900"
          >
            Location & Contact
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500"
          >
            편안한 방문을 위해 위치와 운영시간을 안내해 드립니다
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 연락처 및 정보 영역 */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-[#A8D1C7] mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 mb-1">스튜디오 위치</h4>
                <p className="text-slate-600">서울특별시 강남구 테헤란로 123, 필라테스타워 4층</p>
                <p className="text-sm text-slate-500 mt-1">강남역 1번 출구 도보 3분 거리 (주차 가능)</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-[#A8D1C7] mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 mb-1">상담 문의</h4>
                <p className="text-slate-600">02-1234-5678</p>
                <p className="text-sm text-slate-500 mt-1">레슨 중에는 통화가 어려울 수 있습니다.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-[#A8D1C7] mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 mb-1">운영 시간</h4>
                <p className="text-slate-600">평일 09:00 - 22:00</p>
                <p className="text-slate-600">토요일 10:00 - 15:00</p>
                <p className="text-sm text-slate-500 mt-1">일요일 및 공휴일 휴무</p>
              </div>
            </div>

            {/* ✨ 진짜 인스타그램 로고 적용 ✨ */}
            <div className="flex items-start gap-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-6 h-6 text-[#A8D1C7] mt-1 shrink-0"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">인스타그램</h4>
                <p className="text-slate-600">@pilates_studio</p>
                <p className="text-sm text-slate-500 mt-1">다양한 운동 영상과 이벤트 소식을 확인하세요!</p>
              </div>
            </div>
          </motion.div>

          {/* 지도 영역 (구글맵 연동) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full h-80 md:h-full min-h-[300px] bg-slate-200 rounded-3xl overflow-hidden border border-slate-200 shadow-inner"
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3165.313010724896!2d127.02536831566736!3d37.49794623565538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca1598c4f4b4b%3A0x6ce83606f9bd4904!2z6rCV64Ko7Jet!5e0!3m2!1sko!2skr!4v1620000000000!5m2!1sko!2skr" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}