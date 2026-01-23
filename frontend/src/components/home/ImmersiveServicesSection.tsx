import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// ----- SERVICE DATA -----
const services = [
    {
        id: "compliance",
        title: "Always Compliant",
        keywords: ["Zero Risk", "Automated Returns", "Real-time Tracking"],
        color: "orange"
    },
    {
        id: "audits",
        title: "Inspection Ready",
        keywords: ["Gap Analysis", "Mock Inspections", "Notice Resolution"],
        color: "blue"
    },
    {
        id: "payroll",
        title: "Accurate. Automated.",
        keywords: ["PF / ESIC", "Challan Generation", "Direct Deposits"],
        color: "teal"
    },
    {
        id: "consulting",
        title: "Expert Guidance",
        keywords: ["POSH Training", "Risk Workshops", "Labour Law Updates"],
        color: "slate"
    }
];

// ----- DOODLE SVG PATHS -----
const DOODLE_PATHS = {
    compliance: {
        main: "M 50 20 L 50 80 M 30 80 L 70 80 M 35 30 L 65 30 M 35 40 L 55 40",
        accent: "M 50 10 C 30 10, 20 25, 20 40 C 20 60, 50 75, 50 75 C 50 75, 80 60, 80 40 C 80 25, 70 10, 50 10"
    },
    audits: {
        main: "M 60 60 L 85 85 M 45 45 A 20 20 0 1 1 45 45.01",
        accent: "M 20 25 L 55 25 M 20 35 L 50 35 M 20 45 L 45 45 M 20 55 L 40 55"
    },
    payroll: {
        main: "M 25 20 L 75 20 L 75 80 L 25 80 Z M 35 35 L 45 35 M 55 35 L 65 35 M 35 50 L 45 50 M 55 50 L 65 50",
        accent: "M 80 30 Q 90 50 80 70 M 85 40 L 90 45 L 85 50"
    },
    consulting: {
        main: "M 50 25 C 35 25, 30 40, 30 50 C 30 60, 40 70, 40 75 L 60 75 C 60 70, 70 60, 70 50 C 70 40, 65 25, 50 25 M 45 80 L 55 80",
        accent: "M 50 15 L 50 20 M 30 30 L 35 35 M 70 30 L 65 35 M 25 50 L 30 50 M 75 50 L 70 50"
    }
};

// ----- BACKGROUND ANIMATION COMPONENT -----
const BackgroundAnimation = ({ scrollProgress, mouseX, mouseY }: { scrollProgress: number, mouseX: number, mouseY: number }) => {
    // Calculate gradient position based on scroll
    const gradientShift = scrollProgress * 100;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated Gradient Mesh */}
            <div
                className="absolute inset-0 transition-all duration-1000 ease-out"
                style={{
                    background: `
                        radial-gradient(circle at ${30 + mouseX * 10}% ${40 + mouseY * 10}%, hsl(24, 90%, 95%) 0%, transparent 50%),
                        radial-gradient(circle at ${70 - mouseX * 5}% ${60 - mouseY * 5}%, hsl(220, 20%, 96%) 0%, transparent 40%),
                        linear-gradient(${180 + gradientShift}deg, hsl(24, 70%, 97%) 0%, hsl(0, 0%, 99%) 50%, hsl(220, 10%, 98%) 100%)
                    `
                }}
            />

            {/* Floating Dotted Paths */}
            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                    d="M 0 30 Q 25 20 50 30 T 100 30"
                    fill="none"
                    stroke="hsl(24, 80%, 60%)"
                    strokeWidth="0.3"
                    strokeDasharray="2 2"
                    className="animate-float"
                    style={{ animationDuration: '20s' }}
                />
                <path
                    d="M 0 70 Q 30 80 60 70 T 100 75"
                    fill="none"
                    stroke="hsl(220, 30%, 70%)"
                    strokeWidth="0.2"
                    strokeDasharray="3 3"
                    className="animate-float"
                    style={{ animationDuration: '25s', animationDelay: '5s' }}
                />
            </svg>

            {/* Drifting Particles */}
            <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-orange-300/30 animate-float"
                        style={{
                            left: `${10 + (i * 7)}%`,
                            top: `${20 + (i % 4) * 20}%`,
                            animationDuration: `${15 + i * 2}s`,
                            animationDelay: `${i * 0.5}s`,
                            transform: `translate(${mouseX * (i % 3) * 5}px, ${mouseY * (i % 2) * 5}px)`
                        }}
                    />
                ))}
            </div>

            {/* Data Flow Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line
                    x1="20" y1="0" x2="20" y2="100"
                    stroke="hsl(24, 60%, 70%)"
                    strokeWidth="0.1"
                    className="animate-pulse"
                    style={{ animationDuration: '4s' }}
                />
                <line
                    x1="80" y1="0" x2="80" y2="100"
                    stroke="hsl(220, 40%, 80%)"
                    strokeWidth="0.1"
                    className="animate-pulse"
                    style={{ animationDuration: '5s', animationDelay: '2s' }}
                />
            </svg>
        </div>
    );
};

// ----- SERVICE MOMENT COMPONENT -----
const ServiceMoment = ({
    service,
    isActive,
    progress
}: {
    service: typeof services[0],
    isActive: boolean,
    progress: number
}) => {
    // Animation phases:
    // 0-0.2: Fade in
    // 0.2-0.8: Active
    // 0.8-1.0: Fade out

    const opacity = isActive
        ? (progress < 0.2 ? progress * 5 : progress > 0.8 ? (1 - progress) * 5 : 1)
        : 0;

    const translateY = isActive
        ? (progress < 0.2 ? 50 * (1 - progress * 5) : progress > 0.8 ? -50 * (progress - 0.8) * 5 : 0)
        : 50; // Start below when not active

    const paths = DOODLE_PATHS[service.id as keyof typeof DOODLE_PATHS];

    return (
        <div
            className={cn(
                "absolute inset-0 flex flex-col lg:flex-row items-center justify-center px-8 lg:px-16 transition-opacity duration-500",
                isActive ? "pointer-events-auto" : "pointer-events-none"
            )}
            style={{ opacity, transform: `translateY(${translateY}px)` }}
        >
            {/* Doodle Visual */}
            <div className="w-full lg:w-1/2 flex items-center justify-center mb-8 lg:mb-0">
                <svg
                    viewBox="0 0 100 100"
                    className="w-48 h-48 lg:w-80 lg:h-80"
                >
                    <path
                        d={paths.main}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className={cn(
                            "text-slate-400",
                            isActive && progress > 0.15 && "animate-draw"
                        )}
                        style={{
                            strokeDasharray: 200,
                            strokeDashoffset: isActive && progress > 0.15 ? 0 : 200,
                            transition: 'stroke-dashoffset 1s ease-out'
                        }}
                    />
                    <path
                        d={paths.accent}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className={cn(
                            service.color === 'orange' && "text-orange-500",
                            service.color === 'blue' && "text-blue-500",
                            service.color === 'teal' && "text-teal-500",
                            service.color === 'slate' && "text-slate-500"
                        )}
                        style={{
                            strokeDasharray: 300,
                            strokeDashoffset: isActive && progress > 0.3 ? 0 : 300,
                            transition: 'stroke-dashoffset 1.2s ease-out 0.2s'
                        }}
                    />
                </svg>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
                {/* Title - Large Typography */}
                <h2 className="text-4xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground mb-8 leading-tight">
                    {service.title.split('').map((char, i) => (
                        <span
                            key={i}
                            className="inline-block transition-all duration-300"
                            style={{
                                opacity: isActive && progress > 0.1 + i * 0.02 ? 1 : 0,
                                transform: isActive && progress > 0.1 + i * 0.02 ? 'translateY(0)' : 'translateY(20px)',
                                transitionDelay: `${i * 30}ms`
                            }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h2>

                {/* Keywords - Floating */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                    {service.keywords.map((keyword, i) => (
                        <span
                            key={keyword}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-500",
                                service.color === 'orange' && "bg-orange-100/80 text-orange-700",
                                service.color === 'blue' && "bg-blue-100/80 text-blue-700",
                                service.color === 'teal' && "bg-teal-100/80 text-teal-700",
                                service.color === 'slate' && "bg-slate-100/80 text-slate-700"
                            )}
                            style={{
                                opacity: isActive && progress > 0.4 + i * 0.1 ? 1 : 0,
                                transform: isActive && progress > 0.4 + i * 0.1 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                                transitionDelay: `${400 + i * 100}ms`
                            }}
                        >
                            {keyword}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ----- FINAL CTA COMPONENT -----
const FinalCTA = ({ isVisible }: { isVisible: boolean }) => (
    <div
        className={cn(
            "absolute inset-0 flex items-center justify-center transition-all duration-700",
            isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
    >
        <Link
            to="/services"
            className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
            <span className="relative z-10">Explore All Services →</span>
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:blur-2xl transition-all duration-500 -z-10" />
        </Link>
    </div>
);

// ----- PROGRESS INDICATOR -----
const ProgressIndicator = ({ activeIndex, total }: { activeIndex: number, total: number }) => (
    <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-20">
        {[...Array(total)].map((_, i) => (
            <div
                key={i}
                className={cn(
                    "w-2 h-2 rounded-full transition-all duration-500",
                    i === activeIndex
                        ? "bg-primary scale-150"
                        : "bg-slate-300 hover:bg-slate-400"
                )}
            />
        ))}
    </div>
);

// ----- MAIN COMPONENT -----
const ImmersiveServicesSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

    // Calculate which service is active based on scroll progress
    const numServices = services.length;
    const serviceProgressWindow = 1 / (numServices + 1); // +1 for final CTA

    const getActiveServiceIndex = useCallback(() => {
        if (scrollProgress >= 1 - serviceProgressWindow) return -1; // CTA phase
        return Math.min(Math.floor(scrollProgress / serviceProgressWindow), numServices - 1);
    }, [scrollProgress, serviceProgressWindow, numServices]);

    const getServiceProgress = useCallback((index: number) => {
        const start = index * serviceProgressWindow;
        const end = (index + 1) * serviceProgressWindow;
        if (scrollProgress < start) return 0;
        if (scrollProgress > end) return 1;
        return (scrollProgress - start) / serviceProgressWindow;
    }, [scrollProgress, serviceProgressWindow]);

    const activeIndex = getActiveServiceIndex();
    const showCTA = scrollProgress >= 1 - serviceProgressWindow * 0.5;

    // Scroll handler
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const { top, height } = containerRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const scrollDist = -top;
            const totalScrollable = height - viewportHeight;

            let progress = scrollDist / totalScrollable;
            progress = Math.max(0, Math.min(1, progress));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mouse handler for parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight
            });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[500vh]" // Extended height for scroll narrative
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
                {/* Background Animation Layer */}
                <BackgroundAnimation
                    scrollProgress={scrollProgress}
                    mouseX={mousePosition.x}
                    mouseY={mousePosition.y}
                />

                {/* Progress Indicator */}
                <ProgressIndicator activeIndex={activeIndex} total={numServices} />

                {/* Service Moments */}
                {services.map((service, index) => (
                    <ServiceMoment
                        key={service.id}
                        service={service}
                        isActive={index === activeIndex}
                        progress={getServiceProgress(index)}
                    />
                ))}

                {/* Final CTA */}
                <FinalCTA isVisible={showCTA} />
            </div>
        </section>
    );
};

export default ImmersiveServicesSection;
