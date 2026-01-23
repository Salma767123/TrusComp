import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// ----- SERVICE DATA -----
// ----- SERVICE DATA -----
const services = [
    {
        id: "labor-law-compliance",
        title: "Labor Law Compliance",
        descriptor: "Expert-led solutions tailored for businesses leveraging automation.",
        outcomes: ["Zero Risk", "Automated Workflows", "Audit Ready"],
        position: { desktop: { top: "12%", left: "50%", transform: "translateX(-50%)" }, angle: 270 }
    },
    {
        id: "records-registers",
        title: "Records & Registers",
        descriptor: "Automated solutions for generating and managing mandatory records.",
        outcomes: ["100% Adherence", "Cloud Storage", "Audit Ready"],
        position: { desktop: { top: "28%", right: "12%" }, angle: 330 }
    },
    {
        id: "licenses-registrations",
        title: "Licenses & Registrations",
        descriptor: "Simplifies licensing, renewals, and amendments seamlessly.",
        outcomes: ["Real-Time Tracking", "Expert Support", "No Disruptions"],
        position: { desktop: { bottom: "28%", right: "12%" }, angle: 30 }
    },
    {
        id: "vendor-audit",
        title: "Vendor Audit",
        descriptor: "Streamlines vendor audits for supply chain visibility.",
        outcomes: ["Safe Supply Chain", "Risk Categorization", "Liability Check"],
        position: { desktop: { bottom: "12%", left: "50%", transform: "translateX(-50%)" }, angle: 90 }
    },
    {
        id: "payroll-compliance",
        title: "Payroll Compliance",
        descriptor: "Advanced automation for error-free payroll processing and filings.",
        outcomes: ["Zero Errors", "Precise Deductions", "Real-Time Tracking"],
        position: { desktop: { bottom: "28%", left: "12%" }, angle: 150 }
    },
    {
        id: "remittances-returns",
        title: "Remittances & Returns",
        descriptor: "Automated processes for timely remittances and returns.",
        outcomes: ["Multi-State Adherence", "Clear Audit Trails", "Reduced Overhead"],
        position: { desktop: { top: "28%", left: "12%" }, angle: 210 }
    }
];

// ----- ANIMATED BACKGROUND -----
const AnimatedBackground = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* 1. Dark Base tone: dark bluish-grey / charcoal */}
        <div className="absolute inset-0 bg-[#0F172A]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#0F172A]" />

        {/* 2. Grid Pattern Overlay (Refined and premium) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* 3. Central Radial Glow (Warm orange brand accent) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />

        {/* 4. Ambient Drifting Orbs (Subtle depth) */}
        <div className="absolute top-[10%] left-[15%] w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float-organic" />
        <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-slate-400/5 rounded-full blur-3xl animate-float-organic" style={{ animationDelay: '-4s' }} />

        {/* 5. Cinematic Grain Texture */}
        <div
            className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
        />
    </div>
);

// ----- CENTRAL COMPLIANCE CORE -----
const ComplianceCore = ({ isVisible }: { isVisible: boolean }) => (
    <div
        className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        )}
    >
        {/* Outer Orbit Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow" style={{ animationDuration: '60s' }}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 6" className="text-slate-300" />
            </svg>
        </div>

        {/* Middle Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64">
            <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow" style={{ animationDuration: '45s', animationDirection: 'reverse' }}>
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 8" className="text-orange-300/50" />
            </svg>
        </div>

        {/* Inner Core */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
            {/* Breathing Glow */}
            <div className="absolute inset-0 rounded-full bg-orange-400/20 animate-pulse blur-xl" style={{ animationDuration: '3s' }} />

            {/* Core Circle */}
            <div className="absolute inset-2 rounded-full border-2 border-orange-400/40 bg-gradient-to-br from-white via-orange-50 to-white shadow-lg">
                {/* Node Cluster */}
                <svg viewBox="0 0 40 40" className="w-full h-full p-2">
                    <circle cx="20" cy="12" r="2" className="fill-orange-400" />
                    <circle cx="12" cy="24" r="2" className="fill-orange-400" />
                    <circle cx="28" cy="24" r="2" className="fill-orange-400" />
                    <line x1="20" y1="12" x2="12" y2="24" stroke="currentColor" strokeWidth="1" className="text-orange-300" />
                    <line x1="20" y1="12" x2="28" y2="24" stroke="currentColor" strokeWidth="1" className="text-orange-300" />
                    <line x1="12" y1="24" x2="28" y2="24" stroke="currentColor" strokeWidth="1" className="text-orange-300" />
                </svg>
            </div>
        </div>

        {/* Orbiting Micro Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-80 md:h-80 lg:w-[22rem] lg:h-[22rem] animate-spin-slow" style={{ animationDuration: '30s' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-orange-400/60" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-400/60" />
        </div>
    </div>
);

// ----- CONNECTOR LINE -----
const ConnectorLine = ({ angle, isVisible, isActive }: { angle: number, isVisible: boolean, isActive: boolean }) => {
    // Calculate line position based on angle
    const length = 120; // Length from center
    const startOffset = 60; // Start distance from center

    return (
        <div
            className="absolute top-1/2 left-1/2 hidden lg:block"
            style={{
                transform: `rotate(${angle}deg)`,
                transformOrigin: '0 0'
            }}
        >
            <div
                className={cn(
                    "h-[1px] transition-all duration-700",
                    isVisible ? "opacity-100" : "opacity-0"
                )}
                style={{
                    width: `${length}px`,
                    marginLeft: `${startOffset}px`,
                    background: isActive
                        ? 'linear-gradient(90deg, transparent, hsl(24, 80%, 60%), transparent)'
                        : 'linear-gradient(90deg, transparent, hsl(220, 20%, 80%), transparent)'
                }}
            >
                {/* Pulse Animation */}
                <div
                    className={cn(
                        "absolute inset-0 animate-pulse",
                        isActive ? "bg-orange-400/30" : "bg-slate-400/20"
                    )}
                    style={{ animationDuration: '2s' }}
                />
            </div>
            {/* Dot at end */}
            <div
                className={cn(
                    "absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500",
                    isActive ? "bg-orange-400" : "bg-slate-300"
                )}
                style={{ left: `${startOffset + length - 2}px` }}
            />
        </div>
    );
};

// ----- SERVICE LABEL (FLOATING) -----
const ServiceLabel = ({
    service,
    index,
    isVisible,
    isActive,
    onHover,
    onLeave
}: {
    service: typeof services[0],
    index: number,
    isVisible: boolean,
    isActive: boolean,
    onHover: () => void,
    onLeave: () => void
}) => {
    const [showOutcomes, setShowOutcomes] = useState(false);

    return (
        <Link
            to={`/services/${service.id}`}
            className={cn(
                "absolute hidden lg:block transition-all duration-700 cursor-pointer",
                isVisible ? "opacity-100" : "opacity-0 translate-y-4",
                // Z-Index Handling: Ensure active/hovered item renders above everything else (including CTA)
                isActive || showOutcomes ? "z-50" : "z-10"
            )}
            style={{
                ...service.position.desktop,
                transitionDelay: isVisible ? `${index * 150}ms` : '0ms'
            }}
            onMouseEnter={() => { onHover(); setShowOutcomes(true); }}
            onMouseLeave={() => { onLeave(); setShowOutcomes(false); }}
        >
            <div className={cn(
                "transition-all duration-300",
                isActive ? "scale-[1.03]" : "scale-100",
                !isActive && "opacity-70"
            )}>
                {/* Service Title */}
                <h3 className={cn(
                    "text-lg md:text-xl font-display font-semibold transition-colors duration-300",
                    isActive ? "text-primary" : "text-slate-100"
                )}>
                    {service.title}
                </h3>

                {/* Animated Underline */}
                <div className={cn(
                    "h-[2px] bg-primary mt-1 transition-all duration-300 origin-left",
                    isActive ? "w-full" : "w-0"
                )} />

                {/* Descriptor */}
                <p className={cn(
                    "text-sm mt-2 max-w-[200px] transition-all duration-300",
                    isActive ? "opacity-100 translate-y-0 text-slate-300" : "opacity-0 -translate-y-2"
                )}>
                    {service.descriptor}
                </p>
            </div>

            {/* Floating Outcome Panel - Position based on service location */}
            <div className={cn(
                "absolute p-3 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg border border-border/50 transition-all duration-300 min-w-[180px] z-20",
                // Position panel to avoid overlap with CTA
                // For bottom items (Vendor Audit, Payroll, Licenses), show panel ABOVE the label
                (service.id === 'vendor-audit' || service.id === 'payroll-compliance' || service.id === 'licenses-registrations')
                    ? 'bottom-full mb-2'
                    : 'mt-3',
                showOutcomes && isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                {service.outcomes.map((outcome, i) => (
                    <div
                        key={outcome}
                        className="flex items-center gap-2 text-xs text-foreground/80 py-1"
                        style={{ transitionDelay: `${i * 50}ms` }}
                    >
                        <div className="w-1 h-1 rounded-full bg-primary" />
                        {outcome}
                    </div>
                ))}
            </div>
        </Link>
    );
};

// ----- MOBILE/TABLET SERVICE ITEM -----
const MobileServiceItem = ({
    service,
    index,
    isVisible
}: {
    service: typeof services[0],
    index: number,
    isVisible: boolean
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Service-specific icon paths
    const iconPaths: Record<string, string> = {
        "labor-law-compliance": "M9 12l2 2 4-4 M12 3v1m6.364 1.636l-.707.707M21 12h-1M18.364 18.364l-.707-.707M12 21v-1M4.636 18.364l.707-.707M3 12h1M5.636 4.636l.707.707",
        "records-registers": "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
        "licenses-registrations": "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
        "vendor-audit": "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
        "payroll-compliance": "M9 7h6m-6 4h6m-6 4h4m-7 4h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z",
        "remittances-returns": "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    };

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50/50 border border-border/40 transition-all duration-500 cursor-pointer",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                isExpanded ? "shadow-lg" : "shadow-sm hover:shadow-md"
            )}
            style={{ transitionDelay: `${index * 100}ms` }}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Accent Line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/60 to-transparent" />

            <div className="p-5 pl-6">
                <div className="flex items-center gap-4">
                    {/* Service Icon */}
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary">
                            <path
                                d={iconPaths[service.id] || iconPaths["labor-law-compliance"]}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-base font-display font-semibold text-foreground">
                            {service.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                            {service.descriptor.slice(0, 40)}...
                        </p>
                    </div>

                    {/* Expand Indicator */}
                    <div className={cn(
                        "w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center transition-all duration-300",
                        isExpanded && "rotate-180 bg-primary/10"
                    )}>
                        <svg viewBox="0 0 24 24" className="w-4 h-4 text-muted-foreground">
                            <path d="M6 9 L12 15 L18 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>

                {/* Expandable Content */}
                <div className={cn(
                    "overflow-hidden transition-all duration-400 ease-out",
                    isExpanded ? "max-h-60 opacity-100 mt-4" : "max-h-0 opacity-0"
                )}>
                    <div className="pt-4 border-t border-border/30">
                        <p className="text-sm text-muted-foreground mb-4">
                            {service.descriptor}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {service.outcomes.map((outcome) => (
                                <span
                                    key={outcome}
                                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium"
                                >
                                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12l5 5L20 7" />
                                    </svg>
                                    {outcome}
                                </span>
                            ))}
                        </div>
                        <Link
                            to={`/services/${service.id}`}
                            className="inline-flex items-center text-xs font-bold text-primary hover:underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            Learn more <svg className="w-3 h-3 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" /></svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ----- MAIN COMPONENT -----
const LivingComplianceSystem = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [activeService, setActiveService] = useState<string | null>(null);

    // Intersection Observer for scroll-triggered animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full min-h-screen py-20 lg:py-0 lg:h-screen bg-[#0F172A] overflow-hidden"
        >
            {/* Animated Background */}
            <AnimatedBackground />

            {/* Section Header */}
            <div className={cn(
                "relative z-10 text-center pt-12 lg:pt-20 px-6 transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
                <div className="inline-flex items-center gap-2 mb-4">
                    <span className="h-[2px] w-8 bg-primary rounded-full" />
                    <span className="text-sm font-semibold uppercase tracking-widest text-primary">Our Services</span>
                    <span className="h-[2px] w-8 bg-primary rounded-full" />
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">
                    Our Compliance <span className="text-primary"> Solutions </span>
                </h2>
            </div>

            {/* Desktop Layout - System View */}
            <div className="hidden lg:block relative w-full h-[calc(100vh-200px)]">
                {/* Central Core */}
                <ComplianceCore isVisible={isInView} />

                {/* Connector Lines */}
                {services.map((service) => (
                    <ConnectorLine
                        key={`line-${service.id}`}
                        angle={service.position.angle}
                        isVisible={isInView}
                        isActive={activeService === service.id}
                    />
                ))}

                {/* Service Labels */}
                {services.map((service, index) => (
                    <ServiceLabel
                        key={service.id}
                        service={service}
                        index={index}
                        isVisible={isInView}
                        isActive={activeService === service.id || activeService === null}
                        onHover={() => setActiveService(service.id)}
                        onLeave={() => setActiveService(null)}
                    />
                ))}
            </div>

            {/* Mobile/Tablet Layout - Vertical Flow */}
            <div className="lg:hidden relative z-10 px-4 sm:px-6 mt-8">
                {/* Subtle Core Background for Mobile */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-64 h-64 opacity-10 pointer-events-none">
                    <div className="w-full h-full rounded-full border-2 border-dashed border-primary/30 animate-spin-slow" style={{ animationDuration: '30s' }} />
                    <div className="absolute inset-8 rounded-full border border-dashed border-primary/20 animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }} />
                </div>

                {/* Mobile Service List */}
                <div className="relative space-y-4">
                    {services.map((service, index) => (
                        <MobileServiceItem
                            key={service.id}
                            service={service}
                            index={index}
                            isVisible={isInView}
                        />
                    ))}
                </div>
            </div>

            {/* CTA Button */}
            <div className={cn(
                "relative z-20 text-center mt-12 mb-8 lg:mb-0 lg:absolute lg:bottom-6 lg:left-1/2 lg:-translate-x-1/2 transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
                style={{ transitionDelay: '600ms' }}
            >
                <Link
                    to="/services"
                    className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105"
                >
                    {/* Glow */}
                    <span className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:blur-2xl transition-all duration-500 -z-10" />

                    <span className="relative">Explore All Services</span>
                    <svg className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </section>
    );
};

export default LivingComplianceSystem;
