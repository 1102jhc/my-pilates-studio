'use client';

// 💡 여기서도 lucide-react에서 뭘 부르지 않고 깔끔하게 비웠습니다!

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* 로고 및 카피라이트 */}
        <div className="text-center md:text-left">
          <h2 className="text-white text-xl font-bold tracking-tighter mb-2">PILATES STUDIO</h2>
          <p className="text-sm">© 2026 Pilates Studio. All rights reserved.</p>
        </div>

        {/* 하단 링크 및 인스타그램 */}
        <div className="flex items-center gap-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">이용약관</a>
          <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
          
          {/* ✨ 진짜 인스타그램 로고 적용 ✨ */}
          <a href="#" className="hover:text-[#A8D1C7] transition-colors flex items-center gap-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-5 h-5"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
            </svg>
            <span>@pilates_studio</span>
          </a>
        </div>
        
      </div>
    </footer>
  );
}