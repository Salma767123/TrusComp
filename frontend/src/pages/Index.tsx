import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import LivingComplianceSystem from "@/components/home/LivingComplianceSystem";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ClientLogos from "@/components/home/ClientLogos";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";
import NotificationTicker from "@/components/home/NotificationTicker";

import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO("home");
  return (
    <Layout>
      <HeroSection />
      <NotificationTicker />
      <LivingComplianceSystem />
      <WhyChooseUs />
      <ClientLogos />
      <FAQSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
