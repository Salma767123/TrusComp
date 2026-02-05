import { useState, useRef } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: 1,
    question: "What compliances do you handle?",
    answer: "We handle a comprehensive range of compliance needs including PF, ESIC, Professional Tax, Labor Welfare Fund, and all major Central and State labor laws across India.",
  },
  {
    id: 2,
    question: "How often are filings done?",
    answer: "Most statutory filings are done monthly. Our system tracks every deadline and automates the preparation process to ensure zero late fees and complete accuracy.",
  },
  {
    id: 3,
    question: "Is this applicable PAN-India?",
    answer: "Absolutely. Our solutions are designed to scale across all states in India, handling varied state-specific regulations and local municipal compliances seamlessly.",
  },
  {
    id: 4,
    question: "What happens during inspections?",
    answer: "We provide full support during government inspections. Our digital records are audit-ready, and our team of experts provides on-ground representation to resolve queries.",
  },
];

const FAQSection = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-32 flex flex-col items-center justify-center overflow-hidden bg-slate-50"
    >
      {/* 7. Background Enhancement: Subtle Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.03),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(249,115,22,0.03),transparent_60%)]" />

        {/* Abstract Floating Orbs */}
        <motion.div
          animate={{ y: [0, -50, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[80px]"
        />
        <motion.div
          animate={{ y: [0, 50, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-[80px]"
        />
      </div>

      <div className="section-container relative z-10 w-full px-4 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest shadow-sm backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-orange-500" />
            Knowledge Base
          </div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Discovery <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900">Deck</span>
          </h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto leading-relaxed font-normal">
            Essential insights into our compliance ecosystem.
          </p>
        </div>

        {/* 1. Layout: Unique List Style */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isActive = activeId === faq.id;

            return (
              <motion.div
                key={faq.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveId(isActive ? null : faq.id)}
                className={cn(
                  "group relative w-full overflow-hidden cursor-pointer",
                  "bg-white/60 backdrop-blur-md border border-white/60",
                  "rounded-2xl transition-all duration-500 ease-out",
                  isActive ? "shadow-md bg-white/80 border-primary/10" : "hover:bg-white/80 hover:border-white hover:shadow-sm"
                )}
              >
                {/* 3. Animations: Hover Glow Line (Desktop) */}
                <div className={cn(
                  "absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-orange-500 transition-all duration-300",
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100" // Opacity only, slightly distinct on hover
                )} />

                <div className="px-6 py-5 lg:px-8 lg:py-6 relative z-10">
                  <div className="flex items-center justify-between gap-4">
                    {/* 4. Typography: Question */}
                    <div className="flex items-center gap-4">
                      {/* Minimal Accent Dot */}
                      <div className={cn(
                        "w-1.5 h-1.5 rounded-full transition-colors duration-300 shrink-0",
                        isActive ? "bg-primary" : "bg-slate-300 group-hover:bg-primary/50"
                      )} />
                      <h3 className={cn(
                        "text-base lg:text-lg font-medium text-slate-800 transition-colors duration-300",
                        isActive && "text-primary"
                      )}>
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  {/* 2. Interaction: Answer Reveal (Fade + Slide) */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -4 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -4 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {/* 4. Typography: Answer */}
                        <div className="pt-4 pl-[22px] lg:pl-[22px] pr-4">
                          <p className="text-sm lg:text-base text-slate-500 font-normal leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
