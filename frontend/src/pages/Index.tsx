import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import LivingComplianceSystem from "@/components/home/LivingComplianceSystem";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ClientLogos from "@/components/home/ClientLogos";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO("home");
  return (
    <Layout>
      <HeroSection />
      <LivingComplianceSystem />
      <WhyChooseUs />
      <ClientLogos />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
