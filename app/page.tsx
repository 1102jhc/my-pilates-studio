import Navbar from '@/components/common/Navbar';
import Hero from '@/components/landing/Hero';
import Programs from '@/components/landing/Programs';
import Instructors from '@/components/landing/Instructors';
import Facilities from '@/components/landing/Facilities';
import Testimonials from '@/components/landing/Testimonials';
import FreeTrialSection from '@/components/landing/FreeTrial'; 
import FAQ from '@/components/landing/FAQ';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/common/Footer';
import KakaoFAB from '@/components/common/ContactFAB';

export default function LandingPage() {
  return (
    <div className="relative w-full overflow-x-hidden bg-white">
      {/* 1. 글로벌 네비게이션 */}
      <Navbar />

      <main>
        {/* 2. 히어로 섹션 */}
        <Hero />

        {/* 3. 프로그램 */}
        <Programs />

        {/* 4. 강사진 */}
        <Instructors />

        {/* 5. 시설 안내 */}
        <Facilities />

        {/* 6. 후기 */}
        <Testimonials />

        {/* 7. 자주 묻는 질문 */}
        <FAQ />

        {/* 8. 무료체험 신청 섹션 */}
        <FreeTrialSection />

        {/* 9. 오시는 길 및 컨택 */}
        <Contact />
      </main>

      {/* 10. 푸터 및 플로팅 버튼 */}
      <Footer />
      <KakaoFAB />
    </div>
  );
}