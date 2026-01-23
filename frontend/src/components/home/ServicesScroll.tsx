import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, FileCheck, Search, Calculator, BookOpen, ShieldCheck } from "lucide-react";
import LivingComplianceSystem from "./LivingComplianceSystem";

// Service Data with styling for new design
const services = [
    {
        id: "compliance",
        icon: FileCheck,
        title: "Compliance Management",
        subtitle: "Complete Statutory Compliance",
        description: "End-to-end statutory compliance with zero risk.",
        details: [
            "Digital Record Keeping & Repository",
            "Automated Monthly Return Filing",
            "Real-time Compliance Dashboard"
        ],
        bgTone: "bg-orange-50/50", // Light Peach
        accentColor: "text-orange-500",
        fillColor: "fill-orange-500",
        visualBg: "bg-gradient-to-br from-orange-100/50 to-white",
    },
    {
        id: "audits",
        icon: Search,
        title: "Audits & Inspections",
        subtitle: "Inspection-Ready Systems",
        description: "Comprehensive audit solutions to keep you inspection-ready.",
        details: [
            "Vendor Compliance Audits",
            "Mock Inspections & Gap Analysis",
            "Notice Management & Resolution"
        ],
        bgTone: "bg-blue-50/50", // Light Blue
        accentColor: "text-blue-500",
        fillColor: "fill-blue-500",
        visualBg: "bg-gradient-to-br from-blue-100/50 to-white",
    },
    {
        id: "payroll",
        icon: Calculator,
        title: "Payroll & Social Security",
        subtitle: "Automated & Accurate",
        description: "Accurate, automated payroll and social security administration.",
        details: [
            "Automated PF & ESIC Calculations",
            "UAN & IP Generation",
            "Direct Challan Generation"
        ],
        bgTone: "bg-teal-50/50", // Light Mint
        accentColor: "text-teal-500",
        fillColor: "fill-teal-500",
        visualBg: "bg-gradient-to-br from-teal-100/50 to-white",
    },
    {
        id: "consulting",
        icon: BookOpen,
        title: "Consulting & Training",
        subtitle: "Expert Advisory",
        description: "Expert advisory and training for your HR and compliance teams.",
        details: [
            "Labour Law Updates & Advisory",
            "POSH Compliance & Training",
            "Risk Assessment Workshops"
        ],
        bgTone: "bg-gray-50/50", // Light Gray
        accentColor: "text-gray-500",
        fillColor: "fill-gray-500",
        visualBg: "bg-gradient-to-br from-gray-100/50 to-white",
    },
];

const ServicesScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeindex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    // Function to handle clicking on a nav dot
    const scrollToService = (index: number) => {
        if (!containerRef.current) return;
        const viewportHeight = window.innerHeight;
        // Calculate the target scroll position: Offset top + (index * viewportHeight)
        // This assumes roughly 1 viewport height per service in the total scrollable area
        const { top } = containerRef.current.getBoundingClientRect();
        const absoluteTop = window.scrollY + top; // Position of container top relative to document

        // We want to scroll such that the container is fixed and we are at the 'index' slice.
        // Total height is roughly 400vh.
        // Index 0 = 0% progress. Index 3 = 100% progress.
        // 0 = 0vh into the sticky scroll
        // 1 = 100vh into the sticky scroll ... 

        // A simplified approach for "jumping" is scrolling the window.
        window.scrollTo({
            top: absoluteTop + (index * (viewportHeight * 0.8)), // 0.8 factor for a smoother jump experience within the container
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const { top, height } = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const scrollDist = -top;
            const totalScrollableDist = height - viewportHeight;

            let normProgress = scrollDist / totalScrollableDist;
            normProgress = Math.max(0, Math.min(1, normProgress));

            setProgress(normProgress);

            const index = Math.min(
                services.length - 1,
                Math.floor(normProgress * services.length + 0.1) // Slight offset for earlier triggering
            );

            setActiveIndex(index);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative hidden lg:block h-[350vh]"
        >
            <div className="sticky top-0 h-screen w-full flex flex-col bg-background">

                {/* Persistent Section Header */}
                <div className="absolute top-0 left-0 w-full z-20 px-12 py-8 flex justify-between items-end pointer-events-none">
                    <div>
                        <div className="inline-flex items-center gap-2 mb-2">
                            <span className="h-[2px] w-8 bg-primary rounded-full animate-draw" />
                            <span className="text-sm font-semibold uppercase tracking-widest text-primary animate-fade-in">Our Services</span>
                        </div>
                        <h2 className="text-4xl font-display font-bold text-foreground">
                            Glide through our <span className="text-primary italic">compliance solutions</span>
                        </h2>
                    </div>
                </div>

                {/* Content Body */}
                <div className="flex-1 flex w-full relative">

                    {/* LEFT: Visual Area */}
                    <div className="w-1/2 h-full relative flex items-center justify-center p-20 bg-background/50">
                        <LivingComplianceSystem
                            activeServiceId={services[activeindex].id}
                        />
                    </div>

                    {/* RIGHT: Content Area */}
                    <div className="w-1/2 h-full bg-background flex flex-col justify-center px-24 relative">

                        {/* Content Fade Transition */}
                        <div className="relative h-[400px]">
                            {services.map((service, index) => (
                                <div
                                    key={service.id}
                                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out
                      ${activeindex === index ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8 pointer-events-none"}
                    `}
                                >
                                    <div className={`w-16 h-16 rounded-2xl ${service.bgTone} flex items-center justify-center mb-8`}>
                                        <service.icon className={`w-8 h-8 ${service.accentColor}`} />
                                    </div>

                                    <h3 className="text-4xl font-display font-bold text-foreground mb-2">
                                        {service.title}
                                    </h3>
                                    <p className="text-xl text-primary font-medium mb-6">{service.subtitle}</p>

                                    <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-md">
                                        {service.description}
                                    </p>

                                    <ul className="space-y-4">
                                        {service.details.map((detail, i) => (
                                            <li key={i} className="flex items-center gap-3 text-foreground/80 font-medium" style={{ transitionDelay: `${i * 100}ms` }}>
                                                <div className={`w-2 h-2 rounded-full ${service.accentColor.replace('text-', 'bg-')}`} />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Indicator Bar */}
                <div className="absolute bottom-12 left-0 w-full flex justify-center z-30">
                    <div className="bg-white/80 backdrop-blur-md border border-border shadow-soft rounded-full px-6 py-3 flex items-center gap-8">
                        {services.map((service, index) => (
                            <button
                                key={service.id}
                                onClick={() => scrollToService(index)}
                                className={`group flex items-center gap-2 focus:outline-none transition-all duration-300 ${activeindex === index ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-80'}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeindex === index ? service.bgTone : 'bg-transparent'}`}>
                                    <service.icon className={`w-5 h-5 ${activeindex === index ? service.accentColor : 'text-foreground'}`} />
                                </div>
                                {activeindex === index && (
                                    <span className="text-xs font-bold text-foreground animate-fade-in hidden md:inline-block whitespace-nowrap">
                                        {service.title.split(' ')[0]}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

// IMPROVED Mobile Version (Compact, Fast, Clean)
const ServicesMobile = () => {
    return (
        <section className="lg:hidden bg-background py-16 px-4">
            <div className="text-center mb-10">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">Our Services</span>
                <h2 className="text-3xl font-display font-bold mt-2">Solutions for You</h2>
            </div>

            {/* Note: Removed the top big visual. Now using inline visuals. */}

            <div className="space-y-6">
                {services.map((service, index) => (
                    <div
                        key={service.id}
                        className={`group rounded-2xl bg-card border border-border p-5 shadow-sm active:scale-[0.98] transition-all duration-200 overflow-hidden relative`}
                    >
                        <div className={`absolute top-0 left-0 w-1 h-full ${service.accentColor.replace('text-', 'bg-')}`} />

                        {/* Inline Doodle Visual */}
                        <div className="w-full h-32 mb-4 bg-muted/20 rounded-xl flex items-center justify-center overflow-hidden">
                            <LivingComplianceSystem
                                isMobile={true}
                                singleServiceId={service.id}
                            />
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-foreground mb-1">{service.title}</h3>
                                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                                    {service.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {service.details.slice(0, 2).map((detail, i) => ( // Show only 2 details on mobile for compactness
                                        <span key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-muted/50 text-[10px] font-medium text-foreground/70">
                                            <div className={`w-1 h-1 rounded-full ${service.accentColor.replace('text-', 'bg-')}`} />
                                            {detail}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="pt-6 text-center">
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                    >
                        View Complete Services
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

const ServicesSection = () => {
    return (
        <>
            <ServicesScroll />
            <ServicesMobile />
        </>
    );
};

export default ServicesSection;
