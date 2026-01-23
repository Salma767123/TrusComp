import { useState, useEffect, useRef, useCallback } from "react";
import { HelpCircle, Sparkles, ArrowRight, MessageSquare, ChevronRight, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const faqs = [
  {
    id: 1,
    question: "What compliances do you handle?",
    answer: "We handle a comprehensive range of compliance needs including PF, ESIC, Professional Tax, Labor Welfare Fund, and all major Central and State labor laws across India.",
    keywords: ["PF", "ESIC", "Labor Laws"],
    icon: Sparkles,
  },
  {
    id: 2,
    question: "How often are filings done?",
    answer: "Most statutory filings are done monthly. Our system tracks every deadline and automates the preparation process to ensure zero late fees and complete accuracy.",
    keywords: ["Monthly", "Automated", "Zero late fees"],
    icon: HelpCircle,
  },
  {
    id: 3,
    question: "Is this applicable PAN-India?",
    answer: "Absolutely. Our solutions are designed to scale across all states in India, handling varied state-specific regulations and local municipal compliances seamlessly.",
    keywords: ["PAN-India", "State-specific", "Scalable"],
    icon: MessageSquare,
  },
  {
    id: 4,
    question: "What happens during inspections?",
    answer: "We provide full support during government inspections. Our digital records are audit-ready, and our team of experts provides on-ground representation to resolve queries.",
    keywords: ["Audit-ready", "Expert support", "On-ground"],
    icon: Sparkles,
  },
];

const FAQSection = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (activeIdx !== null) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setRotation({
      x: -y * 20,
      y: x * 20
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-16 lg:py-20 flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_70%)]" />
        <div className="scanline-overlay opacity-30" />

        {/* Ambient light blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse-delayed" />
      </div>

      <div className="section-container relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in-up">
            <Sparkles className="w-4 h-4" />
            Holographic FAQ
          </div>
          <h2 className="text-4xl lg:text-6xl font-display font-black text-foreground tracking-tighter leading-none mb-8">
            Discovery <span className="gradient-text italic">Deck</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Interact with our kinetic data cards to explore core compliance insights.
          </p>
        </div>

        {/* The Deck Area */}
        <div className="relative perspective-1000 min-h-[600px] flex items-center justify-center">

          {/* Card Stack */}
          <div
            className="relative w-full max-w-[1000px] preserve-3d transition-transform duration-500 ease-out"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              display: activeIdx !== null ? 'none' : 'block'
            }}
          >
            <div className="flex flex-wrap justify-center gap-8 px-6">
              {faqs.map((faq, index) => (
                <div
                  key={faq.id}
                  onClick={() => setActiveIdx(index)}
                  className={cn(
                    "group relative w-full md:w-[450px] h-[250px] rounded-3xl cursor-pointer preserve-3d transition-all duration-700 hover:-translate-z-10",
                    "glass-refraction animate-hologram"
                  )}
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  {/* Card Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="p-3 rounded-2xl bg-primary/20 border border-primary/30 group-hover:scale-110 transition-transform">
                        <faq.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-[10px] uppercase font-bold tracking-widest text-primary/60">
                        REF: TC-00{faq.id}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-2xl lg:text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                        {faq.question}
                      </h3>
                      <div className="flex items-center gap-2 text-primary font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                        Unlock Data <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Holographic light sweep */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 pointer-events-none overflow-hidden">
                    <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-primary/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Refractive Reveal */}
          {activeIdx !== null && (
            <div className="absolute inset-0 z-50 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-full max-w-5xl mx-auto h-full glass-refraction rounded-[40px] p-8 lg:p-16 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">

                {/* Close Button */}
                <button
                  onClick={() => setActiveIdx(null)}
                  className="absolute top-8 right-8 p-4 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors z-20"
                >
                  <Minimize2 className="w-6 h-6" />
                </button>

                {/* Refractive Data Stream Background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-accent mix-blend-overlay" />
                  <div className="scanline-overlay" />
                </div>

                <div className="flex-1 space-y-8 relative z-10">
                  <div className="inline-block px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest">
                    Question Unlocked
                  </div>
                  <h3 className="text-3xl lg:text-5xl font-display font-black text-foreground leading-[1.1]">
                    {faqs[activeIdx].question}
                  </h3>
                  <div className="h-1 w-32 bg-primary rounded-full" />
                </div>

                <div className="flex-1 space-y-8 relative z-10">
                  <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/30 pl-8">
                    "{faqs[activeIdx].answer}"
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {faqs[activeIdx].keywords.map((kw, i) => (
                      <span key={i} className="px-4 py-2 rounded-full border border-border bg-card/50 text-sm font-semibold hover:border-primary/50 transition-colors">
                        #{kw}
                      </span>
                    ))}
                  </div>

                  <div className="pt-8">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-3 text-primary font-black text-lg group"
                    >
                      Book Expert Deep-Dive
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
