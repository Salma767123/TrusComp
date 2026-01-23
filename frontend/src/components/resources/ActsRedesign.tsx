
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
    Shield,
    FileText,
    Scale,
    Briefcase,
    ArrowRight,
    ChevronRight,
    AlertCircle,
    CheckCircle2,
    Users,
    Clock,
    Wallet,
    Building2,
    Users2,
    Zap,
    MapPin,
    Anchor
} from "lucide-react";
import { actsData } from "@/data/resourcesData";
import { cn } from "@/lib/utils";

// --- CUSTOM DOODLES FOR ACTS ---
const FormulaDoodle = ({ type }: { type: string }) => {
    if (type === "formula-death") {
        return (
            <div className="flex flex-col items-center justify-center p-6 bg-orange-50 rounded-2xl border border-orange-100 font-mono text-sm">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <span className="text-orange-600 font-bold">50%</span>
                    <span className="mx-2">×</span>
                    <span>Monthly Wage</span>
                    <span className="mx-2">×</span>
                    <span className="text-orange-600">Age Factor</span>
                </motion.div>
            </div>
        );
    }
    if (type === "formula-disability") {
        return (
            <div className="flex flex-col items-center justify-center p-6 bg-orange-50 rounded-2xl border border-orange-100 font-mono text-sm">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <span className="text-orange-600 font-bold">60%</span>
                    <span className="mx-2">×</span>
                    <span>Monthly Wage</span>
                    <span className="mx-2">×</span>
                    <span className="text-orange-600">Age Factor</span>
                </motion.div>
            </div>
        );
    }
    return null;
};

const FlowDoodle = () => (
    <div className="flex items-center justify-around w-full py-8">
        {["Conciliation", "Arbitration", "Adjudication"].map((step, i) => (
            <React.Fragment key={step}>
                <motion.div
                    className="flex flex-col items-center gap-2"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.2 }}
                >
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 border border-orange-200 shadow-sm">
                        <span className="text-xs font-bold">{i + 1}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">{step}</span>
                </motion.div>
                {i < 2 && (
                    <motion.div
                        className="h-[2px] w-12 bg-orange-100"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: i * 0.2 + 0.1 }}
                    />
                )}
            </React.Fragment>
        ))}
    </div>
);

const BalanceDoodle = () => (
    <div className="flex flex-col items-center justify-center py-8">
        <div className="relative w-48 h-32 flex items-center justify-center">
            <motion.div
                className="absolute w-full h-[2px] bg-orange-200"
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <div className="absolute -left-2 -top-12 w-12 h-12 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600">
                    <Users2 className="w-6 h-6" />
                </div>
                <div className="absolute -right-2 -top-12 w-12 h-12 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600">
                    <Users2 className="w-6 h-6" />
                </div>
            </motion.div>
            <div className="absolute bottom-0 w-8 h-12 bg-orange-100 rounded-t-lg border-x border-t border-orange-200" />
        </div>
        <span className="mt-4 text-xs font-bold uppercase tracking-widest text-orange-500">Gender Neutral Pay</span>
    </div>
);

// --- COMPONENT: ACTS REDESIGN ---
export const ActsRedesign = () => {
    const [activeActId, setActiveActId] = useState(actsData[0].id);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleActChange = (id: string) => {
        setActiveActId(id);
        setExpandedId(null);
        scrollToTop();
    };

    const activeAct = actsData.find(a => a.id === activeActId) || actsData[0];

    return (
        <div className="flex flex-col lg:flex-row gap-8 !bg-white min-h-screen !text-gray-900 p-4 lg:p-8 rounded-[40px] shadow-inner border border-gray-100">

            {/* --- LEFT SIDE: ACT NAVIGATOR (STICKY / SLIDER) --- */}
            <aside className="w-full lg:w-80 lg:sticky lg:top-8 h-fit space-y-8 z-20">
                <div className="pl-6 border-l-4 border-orange-500 hidden lg:block">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] !text-orange-600 mb-1">Labour Laws</p>
                    <h2 className="text-2xl font-display font-bold !text-gray-900 leading-tight">Act Navigator</h2>
                </div>

                {/* Desktop Vertical Nav / Mobile Horizontal Slider */}
                <nav className="relative overflow-x-auto lg:overflow-visible no-scrollbar -mx-4 px-4 lg:mx-0 lg:px-0">
                    {/* Vertical Rail Line (Desktop Only) */}
                    <div className="absolute left-[27px] top-6 bottom-6 w-[2px] bg-orange-100 hidden lg:block" />

                    <div className="flex lg:flex-col gap-4 min-w-max lg:min-w-0 pb-4 lg:pb-0">
                        {actsData.map((act) => (
                            <button
                                key={act.id}
                                onClick={() => handleActChange(act.id)}
                                className={cn(
                                    "group relative w-full flex items-center gap-4 lg:gap-6 p-3 lg:p-4 rounded-2xl lg:rounded-3xl transition-all duration-500",
                                    activeActId === act.id
                                        ? "bg-gray-50 shadow-md ring-1 ring-orange-100"
                                        : "hover:bg-gray-50/50"
                                )}
                            >
                                {/* Visual Node */}
                                <div className="relative z-10 w-10 h-10 lg:w-14 lg:h-14 flex-shrink-0 flex items-center justify-center">
                                    <AnimatePresence>
                                        {activeActId === act.id && (
                                            <motion.div
                                                layoutId="active-node-glow"
                                                className="absolute inset-0 bg-orange-500/10 rounded-2xl blur-lg"
                                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                            />
                                        )}
                                    </AnimatePresence>

                                    <div className={cn(
                                        "w-full h-full rounded-xl lg:rounded-2xl border-2 flex items-center justify-center transition-all duration-500",
                                        activeActId === act.id
                                            ? "bg-orange-500 border-orange-500 text-white shadow-orange-glow"
                                            : "bg-white border-orange-100 text-orange-500 group-hover:border-orange-300"
                                    )}>
                                        {act.id === "workmen-compensation" && <Shield className="w-4 h-4 lg:w-5 lg:h-5" />}
                                        {act.id === "shops-establishments" && <Briefcase className="w-4 h-4 lg:w-5 lg:h-5" />}
                                        {act.id === "industrial-disputes" && <Scale className="w-4 h-4 lg:w-5 lg:h-5" />}
                                        {act.id === "equal-remuneration" && <Users className="w-4 h-4 lg:w-5 lg:h-5" />}
                                    </div>
                                </div>

                                <div className="flex-1 text-left hidden lg:block">
                                    <span className={cn(
                                        "block text-sm font-bold leading-tight transition-colors duration-300",
                                        activeActId === act.id ? "!text-gray-900" : "!text-gray-400 group-hover:!text-gray-600"
                                    )}>
                                        {act.title}
                                    </span>
                                </div>

                                {/* Mobile label */}
                                <span className={cn(
                                    "lg:hidden text-xs font-bold whitespace-nowrap",
                                    activeActId === act.id ? "text-orange-500" : "text-gray-400"
                                )}>
                                    {act.title.split(' ').slice(0, 2).join(' ')}
                                </span>

                                {activeActId === act.id && (
                                    <motion.div
                                        layoutId="active-bar"
                                        className="absolute right-4 w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)] hidden lg:block"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </nav>
            </aside>

            {/* --- RIGHT SIDE: CONTENT STAGE --- */}
            <main className="flex-1 min-w-0 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeAct.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="space-y-8"
                    >
                        {/* LEGAL CAPSULE (Overview / Expandable Body) */}
                        <motion.div
                            className={cn(
                                "relative bg-white rounded-[40px] lg:rounded-[48px] p-6 lg:p-12 shadow-sm border border-black/5 transition-all duration-700",
                                expandedId === activeAct.id && !window.matchMedia("(max-width: 1024px)").matches
                                    ? "shadow-2xl ring-1 ring-orange-100"
                                    : "hover:shadow-md"
                            )}
                            layout
                        >
                            {/* Border Draw Animation */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                                <motion.rect
                                    width="100%"
                                    height="100%"
                                    rx="48"
                                    fill="none"
                                    stroke="#f97316"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 2, ease: "easeInOut" }}
                                />
                            </svg>

                            <div className="relative z-10">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                                    <div className="max-w-2xl">
                                        <motion.h3
                                            className="text-3xl lg:text-5xl font-display font-black text-gray-900 mb-4 tracking-tighter"
                                            layout
                                        >
                                            {activeAct.title}
                                        </motion.h3>
                                        <motion.p className="text-lg !text-gray-600 font-light leading-relaxed" layout>
                                            {activeAct.shortDesc}
                                        </motion.p>
                                    </div>

                                    <div className="flex flex-wrap gap-2 lg:flex-col lg:items-end">
                                        {activeAct.tags.map(tag => (
                                            <span key={tag} className="px-4 py-1.5 !bg-gray-100 !text-orange-800 text-[10px] font-black uppercase tracking-widest rounded-full border border-gray-200 shadow-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {!expandedId && (
                                    <motion.button
                                        onClick={() => setExpandedId(activeAct.id)}
                                        className="group inline-flex items-center gap-4 text-orange-600 font-black text-sm uppercase tracking-[0.2em] px-8 py-4 bg-orange-50 rounded-2xl hover:bg-orange-500 hover:text-white transition-all duration-300"
                                        layout
                                    >
                                        Read More
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                    </motion.button>
                                )}

                                {/* --- EXPANDED CONTENT (Inline on Desktop, Full-Screen on Mobile) --- */}
                                <AnimatePresence>
                                    {expandedId === activeAct.id && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className={cn(
                                                "overflow-y-auto lg:overflow-visible border-t lg:border-t-0 border-gray-100 mt-12 pt-12 lg:pt-0 lg:mt-12 space-y-16 lg:space-y-24",
                                                // Mobile Sheet Styles
                                                "fixed inset-0 z-[100] bg-white lg:relative lg:inset-auto lg:block lg:z-auto"
                                            )}
                                        >
                                            {/* Mobile Sticky Back Button */}
                                            <div className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b lg:hidden">
                                                <button
                                                    onClick={() => setExpandedId(null)}
                                                    className="p-2 rounded-full bg-orange-50 text-orange-600 shadow-sm"
                                                >
                                                    <ArrowRight className="w-5 h-5 rotate-180" />
                                                </button>
                                                <span className="text-sm font-black uppercase tracking-widest text-gray-900">{activeAct.title}</span>
                                                <div className="w-9" /> {/* Spacer */}
                                            </div>

                                            <div className="p-6 lg:p-0 space-y-16 lg:space-y-24 pb-20">
                                                {/* 1. HERO STRIP (Mobile Header) */}
                                                <section className="lg:hidden space-y-6 pt-8">
                                                    <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center text-white shadow-lg">
                                                        {activeAct.id === "workmen-compensation" && <Shield className="w-8 h-8" />}
                                                        {activeAct.id === "shops-establishments" && <Briefcase className="w-8 h-8" />}
                                                        {activeAct.id === "industrial-disputes" && <Scale className="w-8 h-8" />}
                                                        {activeAct.id === "equal-remuneration" && <Users className="w-8 h-8" />}
                                                    </div>
                                                    <h2 className="text-4xl font-display font-black text-gray-900 tracking-tighter leading-tight">{activeAct.title}</h2>
                                                    <p className="text-gray-500 font-light leading-relaxed">{activeAct.shortDesc}</p>
                                                </section>

                                                {/* 1. OBJECTIVES */}
                                                <section className="space-y-12">
                                                    <div className="text-center">
                                                        <motion.h4
                                                            className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400 mb-8"
                                                            initial={{ opacity: 0 }}
                                                            whileInView={{ opacity: 1 }}
                                                        >
                                                            Strategic Objectives
                                                        </motion.h4>
                                                        <div className="flex flex-wrap justify-center gap-4 lg:gap-6 relative">
                                                            {activeAct.objectives.map((obj, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    className="px-6 lg:px-8 py-4 lg:py-6 bg-orange-50 border border-orange-100 rounded-2xl lg:rounded-3xl max-w-sm text-xs lg:text-sm font-bold text-gray-700 shadow-sm"
                                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                                    whileInView={{ scale: 1, opacity: 1 }}
                                                                    transition={{ delay: i * 0.1 }}
                                                                >
                                                                    {obj}
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </section>

                                                {/* 2. KEY PROVISIONS */}
                                                <section className="space-y-12">
                                                    <h4 className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-orange-400">Key Provisions Flow</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {activeAct.provisions.map((prov, i) => (
                                                            <motion.div
                                                                key={prov.id}
                                                                className="group p-6 lg:p-8 bg-white border border-gray-100 rounded-[32px] hover:border-orange-200 hover:shadow-xl transition-all duration-500"
                                                                initial={{ opacity: 0, y: 30 }}
                                                                whileInView={{ opacity: 1, y: 0 }}
                                                                transition={{ delay: i * 0.1 }}
                                                            >
                                                                <div className="flex items-start justify-between mb-6">
                                                                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-xs font-mono">
                                                                        0{i + 1}
                                                                    </div>
                                                                    <Zap className="w-5 h-5 text-orange-200 group-hover:text-orange-500 transition-colors" />
                                                                </div>
                                                                <h5 className="text-lg lg:text-xl font-black text-gray-900 mb-3 tracking-tight">{prov.title}</h5>
                                                                <p className="text-sm text-gray-500 font-light leading-relaxed mb-6">{prov.detail}</p>

                                                                {/* Act Specific Visuals */}
                                                                {prov.visual === "formula-death" && <FormulaDoodle type="formula-death" />}
                                                                {prov.visual === "formula-disability" && <FormulaDoodle type="formula-disability" />}
                                                            </motion.div>
                                                        ))}
                                                    </div>

                                                    {activeAct.id === "industrial-disputes" && <FlowDoodle />}
                                                    {activeAct.id === "equal-remuneration" && <BalanceDoodle />}
                                                </section>

                                                {/* 3. APPLICABILITY */}
                                                <section className="p-8 lg:p-12 bg-gray-50 rounded-[40px] lg:rounded-[48px] border border-gray-100 flex flex-col items-center text-center space-y-12">
                                                    <div className="space-y-4">
                                                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400">Applicability Scope</h4>
                                                        <p className="text-xl lg:text-2xl font-bold text-gray-900 tracking-tight leading-tight">Who falls under this jurisdiction?</p>
                                                    </div>

                                                    <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
                                                        {activeAct.applicability.included.map(item => (
                                                            <div key={item} className="p-4 lg:p-6 bg-white rounded-2xl lg:rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center gap-3">
                                                                <Building2 className="w-6 h-6 lg:w-8 lg:h-8 text-orange-500/20" />
                                                                <span className="text-[10px] lg:text-xs font-bold text-gray-600 whitespace-nowrap">{item}</span>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row gap-6 lg:gap-12 font-bold text-[10px] lg:text-xs uppercase tracking-widest">
                                                        <div className="flex items-center gap-2 text-green-600">
                                                            <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5" /> All Employees
                                                        </div>
                                                        <div className="flex items-center gap-2 text-orange-400">
                                                            <AlertCircle className="w-4 h-4 lg:w-5 lg:h-5" /> Minimum Thresholds
                                                        </div>
                                                    </div>
                                                </section>

                                                {/* 4. OBLIGATIONS & BENEFITS */}
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                                                    <section className="space-y-8">
                                                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400 pl-4">Employer Obligations</h4>
                                                        <div className="space-y-4 relative">
                                                            <div className="absolute left-6 top-0 bottom-0 w-[px] bg-orange-100" />
                                                            {activeAct.obligations.map((obl, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    className="relative pl-14 group"
                                                                    initial={{ x: -20, opacity: 0 }}
                                                                    whileInView={{ x: 0, opacity: 1 }}
                                                                    transition={{ delay: i * 0.1 }}
                                                                >
                                                                    <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-white border-2 border-orange-500 z-10 group-hover:scale-125 transition-transform" />
                                                                    <div className="p-5 lg:p-6 bg-white border border-gray-100 rounded-2xl lg:rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                                                        <p className="text-xs lg:text-sm font-bold text-gray-800 leading-relaxed">{obl}</p>
                                                                    </div>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </section>

                                                    <section className="space-y-8">
                                                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-400 pl-4">Employee Benefits</h4>
                                                        <div className="grid grid-cols-1 gap-4">
                                                            {activeAct.benefits.map((benefit, i) => (
                                                                <motion.div
                                                                    key={i}
                                                                    className="flex items-center gap-4 lg:gap-6 p-5 lg:p-6 bg-orange-50/50 rounded-2xl lg:rounded-3xl border border-orange-100"
                                                                    initial={{ y: 20, opacity: 0 }}
                                                                    whileInView={{ y: 0, opacity: 1 }}
                                                                    transition={{ delay: i * 0.1 + 0.3 }}
                                                                >
                                                                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white border border-orange-100 flex items-center justify-center text-orange-600 shadow-sm flex-shrink-0">
                                                                        <Anchor className="w-5 h-5 lg:w-6 lg:h-6" />
                                                                    </div>
                                                                    <p className="text-xs lg:text-sm font-bold text-gray-800 leading-tight">{benefit}</p>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    </section>
                                                </div>

                                                {/* 5. NOTES / PENALTIES */}
                                                {(activeAct.penalties || activeAct.id === "shops-establishments") && (
                                                    <section className="p-8 bg-orange-50/30 rounded-[32px] lg:rounded-[40px] border border-orange-50 text-center">
                                                        <AlertCircle className="w-8 h-8 text-orange-400 mx-auto mb-4" />
                                                        <h4 className="text-lg font-bold text-gray-900 mb-2">Important Compliance Notes</h4>
                                                        {activeAct.id === "shops-establishments" ? (
                                                            <div className="space-y-4">
                                                                <p className="text-sm text-gray-500 font-light">Rules vary by state. Common variations include:</p>
                                                                <div className="flex flex-wrap justify-center gap-2">
                                                                    {activeAct.stateVariations?.map(s => (
                                                                        <span key={s} className="px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-bold text-gray-600 shadow-xs">{s}</span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <p className="text-sm text-gray-500 font-light leading-relaxed">{activeAct.penalties}</p>
                                                        )}
                                                    </section>
                                                )}

                                                {/* Close Button (Desktop Only) */}
                                                <div className="pt-12 hidden lg:flex justify-center">
                                                    <button
                                                        onClick={() => { setExpandedId(null); scrollToTop(); }}
                                                        className="flex items-center gap-2 text-gray-400 hover:text-orange-500 font-bold transition-colors uppercase tracking-widest text-[10px]"
                                                    >
                                                        <ChevronRight className="w-4 h-4 rotate-[-90deg]" /> Close Details
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
        .shadow-orange-glow {
          box-shadow: 0 0 20px rgba(249, 115, 22, 0.2);
        }
      `}} />
        </div>
    );
};
