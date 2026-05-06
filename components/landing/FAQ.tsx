'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { question: "필라테스가 처음인데 괜찮을까요?", answer: "네, 물론입니다! 비기너를 위한 1:1 맞춤 프로그램이 준비되어 있으며, 호흡법부터 기초 동작까지 차근차근 알려드립니다." },
  { question: "운동복은 제공되나요?", answer: "개인 위생을 위해 운동복은 개별 지참을 권장하고 있습니다. 땀 수건과 샤워 시설, 기본 샤워 용품은 무료로 제공됩니다." },
  { question: "주차는 가능한가요?", answer: "건물 지하 주차장에 최대 2시간까지 무료 주차가 가능합니다. 레슨 후 데스크에 말씀해 주세요." }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-slate-900">FAQ</h2>
          <p className="text-slate-500">자주 묻는 질문들을 모았습니다</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
              >
                <span className="font-medium text-slate-900">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-slate-50 px-6 py-4 border-t border-slate-100"
                  >
                    <p className="text-slate-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}