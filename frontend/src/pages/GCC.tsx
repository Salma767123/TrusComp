import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import {
    CheckCircle2,
    ArrowRight,
    Building2,
    Users2,
    TrendingUp,
    ShieldCheck,
    FileText,
    LayoutDashboard,
    Bell,
    Briefcase,
    Globe2,
    SearchCheck,
    Quote
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSEO } from "@/hooks/useSEO";

const GCC = () => {
    useSEO("service", "gcc");

    const stats = [
        { label: "GCCs in India", value: "1,800+" },
        { label: "Professionals Employed", value: "2 Million" },
        { label: "Growth Projected", value: "by 2030" },
        { label: "Compliance Focus", value: "End-to-End" }
    ];

    const setupToScaleFeatures = [
        {
            title: "GCC Compliance Advisory & Structuring",
            desc: "Strategic guidance on statutory registrations, labour applicability, and workforce classification under new Labour Codes.",
            icon: <Building2 className="w-6 h-6" />
        },
        {
            title: "Salary Restructuring & Wage Code Alignment",
            desc: "Ensuring compliance with wage definitions, PF/ESIC calculations, bonus, gratuity, and overtime provisions.",
            icon: <FileText className="w-6 h-6" />
        },
        {
            title: "Multi-State Statutory Compliance Management",
            desc: "PF, ESIC, CLRA, Shops & Establishments, POSH, and state-specific labour law compliance.",
            icon: <Globe2 className="w-6 h-6" />
        },
        {
            title: "Contract Labour & Workforce Advisory",
            desc: "Licensing, inter-state migrant worker applicability, gig/platform worker advisory, and risk mitigation.",
            icon: <Briefcase className="w-6 h-6" />
        },
        {
            title: "Exit & Audit Compliance Review",
            desc: "Final settlement verification and statutory timeline adherence.",
            icon: <SearchCheck className="w-6 h-6" />
        }
    ];

    const technologyFeatures = [
        {
            title: "Technology-backed Dashboards",
            desc: "Real-time visibility into compliance status across all locations.",
            icon: <LayoutDashboard className="w-8 h-8 text-primary" />
        },
        {
            title: "Monthly Labour Law Updates",
            desc: "Stay ahead of regulatory changes with our curated monthly intelligence.",
            icon: <Bell className="w-8 h-8 text-primary" />
        },
        {
            title: "Structured Reporting Systems",
            desc: "Comprehensive audit trails and governance reports for global stakeholders.",
            icon: <FileText className="w-8 h-8 text-primary" />
        }
    ];

    return (
        <Layout>
            <div className="bg-background overflow-hidden">
                {/* 1. Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-slate-950 border-b border-white/10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>

                    {/* Decorative elements */}
                    <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-float" />
                    <div className="absolute bottom-1/4 -left-20 w-72 h-72 bg-accent/20 rounded-full blur-[100px] animate-pulse-float-delayed" />

                    <div className="section-container relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-4xl"
                        >
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-6 tracking-wide uppercase">
                                Capability Center Solutions
                            </span>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-8 leading-[1.1]">
                                TrusComp Strengthens India’s <span className="text-primary">GCC Ecosystem</span> with Compliance-First Solutions
                            </h1>
                            <p className="text-xl md:text-2xl text-white/70 mb-10 leading-relaxed font-light">
                                Delivering end-to-end Labour Code, payroll, and statutory compliance frameworks for scalable Global Capability Centres in India.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    to="/contact"
                                    className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                                >
                                    Book GCC Consultation <ArrowRight className="w-5 h-5" />
                                </Link>
                                <a
                                    href="#about-gcc"
                                    className="px-8 py-4 rounded-full text-lg border border-white/20 text-white hover:bg-white/10 transition-all"
                                >
                                    Learn More
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 2. About GCC in India Section */}
                <section id="about-gcc" className="section-container py-24 border-b border-border">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
                                The Evolution of GCCs in India
                            </h2>
                            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                                <p>
                                    Global Capability Centres (GCCs) in India are rapidly evolving from cost-arbitrage support units into strategic hubs driving innovation, governance, and enterprise leadership.
                                </p>
                                <p>
                                    As multinational corporations expand their India footprint, compliance complexity across labour laws, multi-state operations, and workforce structuring has become a critical priority.
                                </p>
                                <p className="font-medium text-foreground italic">
                                    "This growth demands robust compliance architecture covering wage restructuring, PF/ESIC, gratuity, and multi-state statutory governance."
                                </p>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-4">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm text-center hover:border-primary/30 transition-all group"
                                >
                                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 3. “From Setup to Scale” Section */}
                <section className="bg-slate-50 dark:bg-slate-900/10 py-24">
                    <div className="section-container">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">From Setup to Scale</h2>
                            <p className="text-lg text-muted-foreground">
                                TrusComp supports GCCs across their operational lifecycle with a strong compliance and governance foundation.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {setupToScaleFeatures.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <Card className="h-full border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 group">
                                        <CardContent className="p-8">
                                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                                {feature.icon}
                                            </div>
                                            <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
                                                {feature.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {feature.desc}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. Technology & Governance Section */}
                <section className="py-24">
                    <div className="section-container">
                        <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
                            <div className="flex-1">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Technology & Governance</h2>
                                <p className="text-lg text-muted-foreground">
                                    Our platform enables GCCs to maintain visibility, control, and regulatory confidence across multiple locations with ease.
                                </p>
                            </div>
                            <div className="h-px bg-border flex-1 hidden md:block" />
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {technologyFeatures.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="flex flex-col items-start gap-6 p-8 rounded-2xl bg-card border border-border"
                                >
                                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-border">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Future-Ready GCC Section */}
                <section className="bg-slate-950 text-white py-24 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 skew-x-12 translate-x-1/2" />

                    <div className="section-container relative z-10">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                                    Future-Ready GCCs Require <span className="text-primary">Compliance-Ready</span> Foundations
                                </h2>
                                <p className="text-xl text-white/70 mb-10 leading-relaxed font-light">
                                    As GCCs expand into advanced analytics, engineering, fintech, and AI, workforce scale increases — and so does regulatory exposure.
                                </p>
                            </div>

                            <div className="space-y-6 bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 backdrop-blur-sm">
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <ShieldCheck className="w-8 h-8 text-primary" /> Key Outcomes
                                </h3>
                                {[
                                    "Reduce statutory risk and audit exposure",
                                    "Maintain wage and social security compliance under evolving Labour Codes",
                                    "Build scalable payroll and governance frameworks",
                                    "Operate seamlessly across multiple states"
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-primary" />
                                        </div>
                                        <p className="text-lg text-white/80">{item}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. Quote Section */}
                <section className="py-24 bg-primary/5">
                    <div className="section-container">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl mx-auto text-center relative"
                        >
                            <Quote className="w-20 h-20 text-primary/10 absolute -top-10 -left-10 rotate-12" />
                            <blockquote className="relative z-10">
                                <p className="text-2xl md:text-4xl font-display font-semibold italic text-slate-800 dark:text-slate-200 mb-8 leading-relaxed">
                                    “GCC growth without compliance architecture creates silent risk. Our role is to ensure that enterprises expanding in India build legally resilient and audit-ready workforce structures from day one.”
                                </p>
                                <footer className="mt-8 flex flex-col items-center">
                                    <div className="w-16 h-1 bg-primary mb-4 rounded-full" />
                                    <cite className="not-italic">
                                        <span className="block text-xl font-bold text-foreground">Mr. Anand Gopalan</span>
                                        <span className="text-primary font-medium">Knowledge Partner, TrusComp</span>
                                    </cite>
                                </footer>
                            </blockquote>
                        </motion.div>
                    </div>
                </section>

                {/* 7. Why Choose TrusComp Section */}
                <section className="py-24 border-t border-border">
                    <div className="section-container">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className="order-2 lg:order-1">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {[
                                        { title: "Labour Codes Expertise", icon: <FileText /> },
                                        { title: "Compliance Dashboards", icon: <LayoutDashboard /> },
                                        { title: "Multi-State Management", icon: <Globe2 /> },
                                        { title: "Wage-Aligned Structuring", icon: <TrendingUp /> },
                                        { title: "Large Support Capacity", icon: <Users2 /> }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:shadow-md transition-shadow">
                                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                                {item.icon}
                                            </div>
                                            <span className="font-semibold text-foreground">{item.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="order-1 lg:order-2">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Enterprises Choose TrusComp for GCC Compliance?</h2>
                                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                    TrusComp delivers specialized labour law and compliance advisory, reinforcing India’s GCC ecosystem by delivering structured, audit-ready solutions that enable global enterprises to scale confidently and operate risk-free.
                                </p>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center text-primary font-bold text-lg group"
                                >
                                    Get detailed roadmap <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. About TrusComp Section */}
                <section className="py-24 bg-slate-50 dark:bg-slate-900/10 border-t border-border">
                    <div className="section-container text-center max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold mb-6 uppercase tracking-[0.2em] text-primary">About TrusComp</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            TrusComp, a specialized labour law and compliance advisory firm, is reinforcing India’s GCC ecosystem by delivering structured, audit-ready, and Labour Code-aligned compliance solutions that enable global enterprises to scale confidently and operate risk-free. With deep expertise in Labour Code implementation and multi-state statutory management, we are the preferred partner for large multi-location operations.
                        </p>
                    </div>
                </section>

                {/* CTA Footer */}
                <section className="relative py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-orange-600 to-orange-700" />
                    <div className="section-container relative z-10 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to secure your GCC's compliance foundation?</h2>
                        <Link
                            to="/contact"
                            className="bg-white text-primary hover:bg-slate-100 px-10 py-5 rounded-full text-xl font-bold shadow-2xl transition-all hover:scale-105"
                        >
                            Talk to Our Experts
                        </Link>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default GCC;
