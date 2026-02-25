import { Building2, Sparkles } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";

// Import logos
import eucareLogo from "@/assets/eucare-1.png";
import yuluLogo from "@/assets/yulu-2.png";
import yumaLogo from "@/assets/yuma-3.png";
import apolloLogo from "@/assets/apollo-4.png";
import kothariLogo from "@/assets/kotharai-5.png";
import sanofiLogo from "@/assets/sanofi-6.png";
import fischerLogo from "@/assets/fischer-7.png";
import sankarLogo from "@/assets/sanker-8.png";

const clients = [
  { name: "EUCARE", logo: eucareLogo },
  { name: "YULU", logo: yuluLogo },
  { name: "YUMA", logo: yumaLogo },
  { name: "Apollo Hospitals", logo: apolloLogo },
  { name: "KICL", logo: kothariLogo },
  { name: "Sanofi", logo: sanofiLogo },
  { name: "Fischer", logo: fischerLogo },
  { name: "Sankar", logo: sankarLogo },
];

const ClientLogos = () => {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-slate-900">
      {/* --- PREMIUM REFINED BACKGROUND SYSTEM (Login Style) --- */}

      {/* 1. Deep Base Layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* 2. Layered Volumetric & Organic Motion System */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary Volumetric Sphere (Top Left - Amber/Orange) */}
        <div
          className="absolute -top-[15%] -left-[10%] w-[1000px] h-[1000px] rounded-full opacity-50 blur-[120px] mix-blend-screen animate-float-organic"
          style={{
            background: "radial-gradient(circle at 30% 30%, #ffc079ff, #f97316, #953109ff, transparent 70%)",
            animationDuration: '32s'
          }}
        />

        {/* Secondary Volumetric Sphere (Bottom Right - Deep Navy/Blue) */}
        <div
          className="absolute -bottom-[20%] -right-[10%] w-[1100px] h-[1100px] rounded-full opacity-40 blur-[120px] mix-blend-screen animate-float-organic"
          style={{
            background: "radial-gradient(circle at 70% 70%, #041731ff, #0c192dff, #030f21ff, transparent 70%)",
            animationDuration: '35s',
            animationDelay: '-8s'
          }}
        />

        {/* --- Phase 2: Refinement Layers (Very Subtle Organic Patterns) --- */}

        {/* Abstract Smudge 2 (Deep Blue Wave) */}
        <div
          className="absolute bottom-[20%] left-[5%] w-[800px] h-[300px] rounded-full opacity-[0.05] blur-[100px] bg-blue-400 animate-float-organic"
          style={{ animationDuration: '30s', animationDelay: '-12s' }}
        />

        {/* --- Phase 3: NEW Tech-Grid Layer (Reference Match) --- */}
        <div
          className="absolute inset-0 opacity-[0.6] animate-grid-drift pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff2e 0px, transparent 1px),
              linear-gradient(to bottom, #ffffff2e 0px, transparent 1px)
            `,
            backgroundSize: '5rem 5rem',
            animationDuration: '60s'
          }}
        />

        {/* subtle glass layer */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
      </div>

      <div className="section-container relative">
        {/* Header (Updated for Dark Mode Readability) */}
        <AnimatedSection className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <Building2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-slate-100">Our Partners</span>
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-6">
            Trusted by{" "}
            <span className="text-primary drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]">Leading Organizations</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Join 100+ enterprises that rely on our expertise for compliance excellence
          </p>
        </AnimatedSection>

        {/* --- Logo Carousel Section (CLEAN TRANSITION) --- */}
        <div className="relative mb-20 px-4">
          <div
            className="overflow-hidden"
            style={{
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
              maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
            }}
          >
            <div className="flex animate-marquee py-4">
              {/* First set */}
              {clients.map((client, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 mx-6"
                >
                  <div className="group relative px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] cursor-pointer flex items-center justify-center min-w-[200px] h-32">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="relative max-w-[160px] max-h-[80px] object-contain transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {clients.map((client, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 mx-6"
                >
                  <div className="group relative px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] cursor-pointer flex items-center justify-center min-w-[200px] h-32">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="relative max-w-[160px] max-h-[80px] object-contain transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row (Enhanced for Premium Look) */}
        <AnimatedSection delay={200} className="pt-8 border-t border-white/10">
          <div className="flex flex-wrap justify-center gap-12 lg:gap-24">
            {[
              { value: "100+", label: "Enterprise Clients" },
              { value: "15+", label: "Industries Served" },
              { value: "98%", label: "Retention Rate" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl lg:text-5xl font-display font-bold text-primary group-hover:scale-110 transition-transform drop-shadow-[0_0_10px_rgba(249,115,22,0.2)]">
                  {stat.value}
                </div>
                <div className="text-base text-slate-400 font-medium mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ClientLogos;

