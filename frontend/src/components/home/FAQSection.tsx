import { useState, useRef } from "react";
import { HelpCircle, Sparkles, ArrowRight, MessageSquare, ChevronRight, Minimize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    id: 1,
    question: "What compliances do you handle?",
    answer: "We handle a comprehensive range of compliance needs including PF, ESIC, Professional Tax, Labor Welfare Fund, and all major Central and State labor laws across India.",
    icon: Sparkles,
  },
  {
    id: 2,
    question: "How often are filings done?",
    answer: "Most statutory filings are done monthly. Our system tracks every deadline and automates the preparation process to ensure zero late fees and complete accuracy.",
    icon: HelpCircle,
  },
  {
    id: 3,
    question: "Is this applicable PAN-India?",
    answer: "Absolutely. Our solutions are designed to scale across all states in India, handling varied state-specific regulations and local municipal compliances seamlessly.",
    icon: MessageSquare,
  },
  {
    id: 4,
    question: "What happens during inspections?",
    answer: "We provide full support during government inspections. Our digital records are audit-ready, and our team of experts provides on-ground representation to resolve queries.",
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
      x: -y * 5, // Reduced rotation for subtle effect
      y: x * 5
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
      className="relative py-20 lg:py-28 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white to-slate-50"
    >
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="section-container relative z-10 w-full px-4">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-[11px] font-bold uppercase tracking-widest border border-primary/10">
            <Sparkles className="w-3 h-3" />
            Holographic FAQ
          </div>
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-slate-900 tracking-tight">
            Discovery <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Deck</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed font-normal">
            Explore core compliance insights through our interactive knowledge base.
          </p>
        </div>

        {/* The Deck Area */}
        <div className="relative min-h-[500px] flex items-center justify-center perspective-1000">

          {/* Card Stack */}
          <motion.div
            className="relative w-full max-w-5xl flex flex-wrap justify-center gap-6 preserve-3d"
            animate={{
              rotateX: activeIdx === null ? rotation.x : 0,
              rotateY: activeIdx === null ? rotation.y : 0,
              opacity: activeIdx === null ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            style={{ pointerEvents: activeIdx === null ? 'auto' : 'none' }}
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.id}
                layoutId={`card-${faq.id}`}
                onClick={() => setActiveIdx(index)}
                className={cn(
                  "group relative w-full md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] h-[280px] rounded-3xl cursor-pointer transition-all duration-300",
                  "bg-white/40 backdrop-blur-md border border-white/40 shadow-xl hover:shadow-2xl hover:bg-white/60",
                  "flex flex-col justify-between p-6 overflow-hidden"
                )}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                {/* Gradient Gloss */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50" />

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-2xl bg-white/50 border border-white/60 flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <faq.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mb-2">
                    0{faq.id}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 group-hover:text-primary transition-colors leading-snug">
                    {faq.question}
                  </h3>
                </div>

                <div className="relative z-10 flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                  Read <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Active Expanded View */}
          <AnimatePresence>
            {activeIdx !== null && (
              <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveIdx(null)}
                  className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm"
                />

                {/* Expanded Card */}
                <motion.div
                  layoutId={`card-${faqs[activeIdx].id}`}
                  className="w-full max-w-2xl bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-[40px] overflow-hidden relative"
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); setActiveIdx(null); }}
                    className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors z-20"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="p-8 lg:p-12">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/20">
                        <faqs[activeIdx].icon className="w-3 h-3" />
                        Insight Unlocked
                      </div>

                      <h3 className="text-2xl lg:text-4xl font-display font-semibold text-slate-900 mb-6 leading-tight">
                        {faqs[activeIdx].question}
                      </h3>

                      <p className="text-lg text-slate-600 font-normal leading-relaxed mb-8">
                        {faqs[activeIdx].answer}
                      </p>

                      <div className="flex items-center gap-6 pt-6 border-t border-slate-100/50">
                        <Link
                          to="/contact"
                          className="inline-flex items-center gap-2 text-primary font-semibold group"
                        >
                          <span className="border-b border-primary/30 group-hover:border-primary transition-colors pb-0.5">Talk to an expert</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  </div>

                  {/* Decorative Gradients */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-orange-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />
                </motion.div>
              </div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;

