import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Programs from '../components/Programs';
import Instructors from '../components/Instructors';
import Facilities from '../components/Facilities';
import Testimonials from '../components/Testimonials'; // 새 기능!
import FAQ from '../components/FAQ'; // 새 기능!
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import KakaoFAB from '../components/KakaoFAB'; // 새 기능!

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <Hero />
      <Programs />
      <Instructors />
      <Facilities />
      
      {/* 새로 추가된 블록들 */}
      <Testimonials />
      <FAQ />
      
      <Contact />
      <Footer />

      {/* 우측 하단 카카오톡 둥둥이 */}
      <KakaoFAB />
    </main>
  );
}