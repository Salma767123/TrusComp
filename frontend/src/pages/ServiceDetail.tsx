import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ServiceDoodle } from "@/components/services/ServiceDoodles";
import { CheckCircle2, ArrowRight, ShieldCheck, TrendingUp, Users, RefreshCw, HelpCircle } from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

import { useSEO } from "@/hooks/useSEO";

const ServiceDetail = () => {
    const { id } = useParams<{ id: string }>(); // This 'id' is actually the slug
    useSEO("service", id);
    const [service, setService] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchService = async () => {
            try {
                const apiBase = import.meta.env.VITE_API_BASE_URL || "";
                const response = await fetch(`${apiBase}/services/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setService(data);
                } else {
                    setError(true);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchService();
    }, [id]);

    if (loading) {
        return (
            <Layout>
                <div className="min-h-screen flex items-center justify-center bg-slate-950">
                    <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                </div>
            </Layout>
        );
    }

    if (error || !service) return <Navigate to="/services" replace />;

    return (
        <Layout>
            <div className="bg-background text-foreground min-h-screen">
                {/* 1. Compact Hero */}
                <ServiceHero service={service} />

                <div className="section-container py-16 md:py-24">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content Column */}
                        <div className="lg:col-span-2 space-y-16">
                            <OverviewSection service={service} />
                            {service.problems?.length > 0 && <ProblemsSection problems={service.problems} />}
                            {service.features?.length > 0 && <FeaturesGrid features={service.features} />}
                            {service.benefits?.length > 0 && <BenefitsList benefits={service.benefits} />}
                            {service.faqs?.length > 0 && <FAQSection faqs={service.faqs} />}
                        </div>

                        {/* Sidebar / Sticky Action Column */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-8">
                                <ActionCard doodleType={service.doodle_type || "shield"} />
                                {service.whyTrusComp?.length > 0 && <TrustCard points={service.whyTrusComp} />}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative py-24 overflow-hidden">
                    {/* Dark Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#4a5568] via-[#3d4654] to-[#2d3748]" />

                    <div className="section-container text-center relative z-10 text-white">
                        <h2 className="text-3xl font-bold mb-8">Ready to get started?</h2>
                        <Link
                            to="/contact"
                            className="btn-primary inline-flex items-center gap-3 px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                            Book a Consultation <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

const ServiceHero = ({ service }: any) => {
    return (
        <section className="relative bg-slate-950 pt-32 pb-20 border-b border-border overflow-hidden">
            {/* Dark Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 animate-pulse-float"></div>

            <div className="absolute right-0 top-0 w-1/3 h-full opacity-80 pointer-events-none">
                <ServiceDoodle type={service.doodle_type || "shield"} />
            </div>
            <div className="section-container relative z-10">
                <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-white/50 mb-6 uppercase tracking-wider">
                    <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
                    <span>/</span>
                    <span className="text-primary">{service.category}</span>
                    {service.state && (
                        <>
                            <span className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-white/40">{service.state}</span>
                        </>
                    )}
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight max-w-4xl">
                    {service.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl font-light">
                    {service.short_overview || service.overview}
                </p>
            </div>
        </section>
    );
};

const OverviewSection = ({ service }: any) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-primary" /> Service Overview
            </h2>
            <div
                className="prose prose-slate max-w-none text-foreground/80 leading-relaxed p-6 bg-card rounded-xl border border-border shadow-sm"
                dangerouslySetInnerHTML={{ __html: service.long_overview || `<p>We ensure complete compliance for ${service.title} through our automated TrusComp platform. Our system streamlines all regulatory requirements, reducing risk and operational overhead for your organization.</p>` }}
            />
        </div>
    )
}

const ProblemsSection = ({ problems }: any) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Common Challenges</h2>
            <div className="space-y-4">
                {problems.map((problem: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                        <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-destructive" />
                        <p className="text-foreground/90 font-medium">{problem}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

const FeaturesGrid = ({ features }: any) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-8">What We Deliver</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature: any, i: number) => (
                    <div key={i} className="bg-card p-6 rounded-xl border border-border hover:border-primary/40 transition-colors shadow-sm">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {feature.hint}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

const BenefitsList = ({ benefits }: any) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" /> Key Benefits
            </h2>
            <div className="bg-gradient-to-br from-card to-secondary/30 rounded-2xl p-8 border border-border">
                <ul className="space-y-6">
                    {benefits.map((benefit: any, i: number) => (
                        <li key={i} className="flex items-start gap-4">
                            <div className="mt-1 p-1 bg-primary rounded-full">
                                <CheckCircle2 className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <span className="block font-bold text-foreground">{benefit.keyword}</span>
                                <span className="text-muted-foreground">{benefit.text}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const ActionCard = ({ doodleType }: any) => {
    return (
        <div className="bg-card rounded-2xl p-6 border border-border shadow-lg relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 opacity-10 pointer-events-none">
                <ServiceDoodle type={doodleType} />
            </div>
            <h3 className="text-xl font-bold mb-2">Need Help?</h3>
            <p className="text-muted-foreground text-sm mb-6">
                Get expert guidance on compliance management tailored to your needs.
            </p>
            <Link to="/contact" className="w-full btn-primary py-3 rounded-lg flex items-center justify-center gap-2 font-bold shadow-md hover:shadow-lg transition-all">
                Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
                        <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                        <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white" />
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">100+ Clients Trust Us</span>
                </div>
            </div>
        </div>
    )
}

const TrustCard = ({ points }: any) => {
    return (
        <div className="bg-secondary/30 rounded-xl p-6 border border-border">
            <h4 className="font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> Why TrusComp
            </h4>
            <ul className="space-y-3">
                {points.map((point: string, i: number) => (
                    <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                        <span className="text-primary mt-1">•</span> {point}
                    </li>
                ))}
            </ul>
        </div>
    )
}

const FAQSection = ({ faqs }: any) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-primary" /> Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq: any, i: number) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-xl px-6 bg-card data-[state=open]:border-primary/50 transition-all">
                        <AccordionTrigger className="text-lg font-bold hover:no-underline py-6 text-left">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                            <div className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default ServiceDetail;
