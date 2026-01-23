import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Sparkles } from "lucide-react";

// --- Reuse Custom Sketch Doodles (Law & Trust Theme) ---
const SketchScale = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
            d="M50 20 L 50 80 M 20 40 L 80 40 M 20 40 L 15 60 L 25 60 L 20 40 M 80 40 L 75 60 L 85 60 L 80 40"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
        />
    </svg>
);

const SketchGavel = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
            d="M30 70 L 70 30 M 60 20 L 80 40 L 70 50 L 50 30 L 60 20 Z"
            initial={{ pathLength: 0, rotate: -45 }}
            animate={{ pathLength: 1, rotate: 0 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.5 }}
        />
        <motion.path d="M 25 75 L 35 65" initial={{ opacity: 0 }} animate={{ opacity: 1, x: -5, y: 5 }} transition={{ delay: 1.2 }} />
    </svg>
);

const SketchDocument = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <motion.path
            d="M30 20 L 70 20 L 70 80 L 30 80 Z M 40 35 H 60 M 40 50 H 60 M 40 65 H 55"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
        />
    </svg>
);

const SketchShield = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
            d="M 50 20 C 20 20 20 50 20 50 C 20 80 50 90 50 90 C 50 90 80 80 80 50 C 80 50 80 20 50 20"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
        />
        <motion.path
            d="M 50 35 V 75 M 35 50 H 65"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 1.5 }}
        />
    </svg>
);

const SketchChecklist = ({ className }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <motion.path d="M 30 30 L 40 40 L 70 20" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        <motion.path d="M 30 55 L 40 65 L 70 45" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
        <motion.path d="M 30 80 L 40 90 L 70 70" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 1 }} />
    </svg>
);


const TestimonialsHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax Transforms
    const yBackground = useTransform(scrollY, [0, 500], [0, 300]);
    const yText = useTransform(scrollY, [0, 300], [0, 100]);
    const yDoodleFast = useTransform(scrollY, [0, 500], [0, -200]);
    const yDoodleSlow = useTransform(scrollY, [0, 500], [0, -50]);
    const rotateDoodle = useTransform(scrollY, [0, 500], [0, 45]);

    // Mouse Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const moveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), { stiffness: 100, damping: 20 });
    const moveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-30, 30]), { stiffness: 100, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX / innerWidth - 0.5);
        mouseY.set(clientY / innerHeight - 0.5);
    };

    return (
        <section
            ref={containerRef}
            className="relative py-24 md:py-32 flex items-center overflow-hidden bg-background border-b border-border/40"
            onMouseMove={handleMouseMove}
        >
            {/* 1. Animated Background Glows & Motion */}
            <motion.div style={{ y: yBackground }} className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Dotted Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)] opacity-60" />

                {/* Moving Gradient Orbs */}
                <motion.div
                    className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-primary/20 rounded-full blur-[100px] mix-blend-multiply"
                    animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-orange-400/20 rounded-full blur-[80px] mix-blend-multiply"
                    animate={{ x: [0, -30, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Subtle Particle Motion Layer */}
                <div className="absolute inset-0 opacity-30">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-primary/30 blur-sm"
                            style={{
                                width: Math.random() * 10 + 5,
                                height: Math.random() * 10 + 5,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -100, 0],
                                x: [0, Math.random() * 50 - 25, 0],
                                scale: [0, 1, 0],
                                opacity: [0, 0.5, 0]
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                ease: "linear",
                                delay: Math.random() * 5
                            }}
                        />
                    ))}
                </div>
            </motion.div>

            {/* 2. Floating Sketch Doodles (Expanded Variety) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Left Top - Gavel */}
                <motion.div
                    style={{ y: yDoodleFast, rotate: rotateDoodle, x: moveX, opacity: 0.1 }}
                    className="absolute top-[10%] left-[8%] text-[#FF8C00]"
                >
                    <SketchGavel className="w-24 h-24 md:w-32 md:h-32" />
                </motion.div>

                {/* Right Bottom - Scale */}
                <motion.div
                    style={{ y: yDoodleFast, x: useTransform(moveX, x => -x), opacity: 0.08 }}
                    className="absolute bottom-[20%] right-[5%] text-gray-800"
                >
                    <SketchScale className="w-32 h-32 md:w-48 md:h-48" />
                </motion.div>

                {/* Center Left - Document */}
                <motion.div
                    style={{ y: yDoodleSlow, x: moveX, opacity: 0.15 }}
                    className="absolute top-[60%] left-[15%] text-[#FF8C00]"
                >
                    <SketchDocument className="w-20 h-20 -rotate-12" />
                </motion.div>

                {/* Top Right - Shield - NEW */}
                <motion.div
                    style={{ y: yDoodleSlow, x: useTransform(moveX, x => x * 0.8), opacity: 0.12 }}
                    className="absolute top-[15%] right-[20%] text-primary"
                >
                    <SketchShield className="w-28 h-28 rotate-12" />
                </motion.div>

                {/* Bottom Center - Checklist - NEW */}
                <motion.div
                    style={{ y: yDoodleFast, x: useTransform(moveX, x => x * -0.5), opacity: 0.1 }}
                    className="absolute bottom-[15%] left-[40%] text-gray-600"
                >
                    <SketchChecklist className="w-16 h-16 -rotate-6" />
                </motion.div>

                {/* Extra Sparkles */}
                <motion.div
                    style={{ y: yDoodleSlow, x: moveY }}
                    className="absolute top-[30%] left-[70%] text-primary opacity-30"
                >
                    <Sparkles className="w-10 h-10" />
                </motion.div>
            </div>

            {/* 3. Hero Content */}
            <div className="section-container relative z-10 w-full text-center">
                <motion.div
                    style={{ y: yText }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium mb-8 shadow-sm"
                    >
                        Client Success Stories
                    </motion.span>

                    <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground leading-[1.1] tracking-tight mb-8">
                        The Voice of <br />
                        <span className="relative inline-block text-[#FF8C00]">
                            Confidence
                            {/* Underline Removed as requested */}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
                        Trust isn't claimed; it's earned. Read how TrusComp is redefining compliance for organizations across the globe.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialsHero;
