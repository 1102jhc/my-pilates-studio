'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 스크롤 위치에 따라 배경색 변경
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 메뉴 클릭 시 모바일 메뉴를 닫아주는 함수
  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: 'Programs', href: '#programs' },
    { name: 'Instructors', href: '#instructors' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Reviews', href: '#testimonials' }, // 추가됨! (Testimonials 섹션에 id="testimonials"가 필요합니다)
    { name: 'FAQ', href: '#faq' }, // 추가됨! (FAQ 섹션에 id="faq"가 필요합니다)
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* 로고 */}
        <a href="#" className="text-2xl font-bold tracking-tighter text-slate-900">
          PILATES<span className="text-[#A8D1C7]">.</span>
        </a>

        {/* 데스크탑 메뉴 */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-600 hover:text-[#A8D1C7] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#A8D1C7] transition-colors shadow-lg shadow-slate-200">
            상담 예약
          </a>
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button 
          className="md:hidden text-slate-900 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 py-6 px-6 flex flex-col gap-4 shadow-xl animate-in fade-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={closeMenu}
              className="text-lg font-medium text-slate-600 py-3 border-b border-slate-50 active:text-[#A8D1C7]"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={closeMenu}
            className="mt-2 bg-[#A8D1C7] text-white py-4 rounded-2xl text-center font-bold"
          >
            상담 예약하기
          </a>
        </div>
      )}
    </nav>
  );
}