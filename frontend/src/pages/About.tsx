import Layout from "@/components/layout/Layout";
import AboutHero from "@/components/about/AboutHero";
import CoreValues from "@/components/about/CoreValues";
import VisionMission from "@/components/about/VisionMission";
import ImpactScale from "@/components/about/ImpactScale";
import FoundersLeadership from "@/components/about/FoundersLeadership";
import DeliveryFramework from "@/components/about/DeliveryFramework";
import ContinuousSupport from "@/components/about/ContinuousSupport";
import AboutCTA from "@/components/about/AboutCTA";

import { useSEO } from "@/hooks/useSEO";

const About = () => {
  useSEO("about");
  return (
    <Layout>
      <AboutHero />
      <CoreValues />
      <FoundersLeadership />
      <ImpactScale />
      <VisionMission />
      <DeliveryFramework />
      <ContinuousSupport />
      <AboutCTA />
    </Layout>
  );
};

export default About;
