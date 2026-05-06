'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // URL 해시(#)를 남기지 않고 부드럽게 이동하는 함수
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Programs', href: '#programs' },
    { name: 'Instructors', href: '#instructors' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Reviews', href: '#testimonials' }, 
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4 text-slate-900' : 'bg-transparent py-6 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        
        {/* 로고: 클릭 시 최상단으로 */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="text-2xl font-bold tracking-tighter"
        >
          PILATES<span className="text-[#A8D1C7]">.</span>
        </button>

        {/* 데스크탑 메뉴 */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium transition-colors hover:text-[#A8D1C7] ${isScrolled ? 'text-slate-600' : 'text-white/80'}`}
            >
              {link.name}
            </a>
          ))}

          {/* #free-trial로 이동 */}
          <button 
            onClick={(e) => handleNavClick(e, '#free-trial')}
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg active:scale-95 ${
              isScrolled ? 'bg-slate-900 text-white hover:bg-[#A8D1C7]' : 'bg-white text-slate-900 hover:bg-[#A8D1C7] hover:text-white'
            }`}
          >
            상담 예약
          </button>
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} className={isScrolled ? "text-slate-900" : "text-white"} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white py-6 px-6 flex flex-col gap-4 shadow-xl border-t border-slate-50">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-lg font-medium text-slate-600 py-3 border-b border-slate-50"
            >
              {link.name}
            </a>
          ))}
          {/* 모바일에서도 동일하게 무료체험 섹션으로 연결 */}
          <button 
            onClick={(e) => handleNavClick(e, '#free-trial')}
            className="mt-2 bg-[#A8D1C7] text-white py-4 rounded-2xl text-center font-bold active:scale-[0.98]"
          >
            상담 예약하기
          </button>
        </div>
      )}
    </nav>
  );
}