'use client';

// 카카오톡 특유의 말풍선 모양 아이콘을 위한 SVG 직접 삽입
export default function KakaoFAB() {
  return (
    <a
      href="#contact" // 나중에 실제 카카오톡 오픈채팅방 링크(http://pf.kakao.com/...)로 바꾸시면 됩니다!
      className="fixed bottom-8 right-8 z-50 bg-[#FEE500] p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center cursor-pointer group"
      aria-label="카카오톡 상담하기"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="28" 
        height="28" 
        viewBox="0 0 24 24" 
        fill="#371D1E"
      >
        <path d="M12 3c-5.523 0-10 3.582-10 8 0 2.864 1.803 5.378 4.545 6.837-.428 1.558-1.42 5.16-1.464 5.334-.055.22.064.332.227.248.127-.066 3.615-2.455 5.116-3.528.513.064 1.04.109 1.576.109 5.523 0 10-3.582 10-8s-4.477-8-10-8z"/>
      </svg>
      {/* 마우스 올리면 나오는 글씨 */}
      <span className="absolute right-full mr-4 bg-gray-800 text-white text-sm px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        카톡 상담하기
      </span>
    </a>
  );
}