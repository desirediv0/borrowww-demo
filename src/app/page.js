import Calculator from '@/components/Calculator';
import FAQSection from '@/components/FAQSection';
import HeroSection from '@/components/HeroSection';
import LogoSlider from '@/components/LogoSlider';
import ValuesSection from '@/components/ValuesSection';
import HomeLoanSections from '@/components/home-loan-sections';

// Note: This implementation was requested by client despite being non-compliant with DPDP Act.

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <LogoSlider />

      <HomeLoanSections />
      <ValuesSection />
      <Calculator />
      <FAQSection />
    </main>
  );
}
