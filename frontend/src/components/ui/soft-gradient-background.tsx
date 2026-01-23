import { motion } from "framer-motion";
import { Scale, ShieldCheck, ClipboardList, Receipt, Banknote, Scroll, Users } from "lucide-react";

export const SoftGradientBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden bg-[#FAFAFA]">
            {/* 1. Base Gradient Mesh Layer - Flowing Conic Gradients */}
            <div className="absolute inset-0 opacity-40">
                <motion.div
                    className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]"
                    style={{
                        background: "conic-gradient(from 0deg at 50% 50%, #FF8C00 0deg, transparent 60deg, #FDE68A 120deg, transparent 180deg, #FF8C00 240deg, transparent 300deg, #FDE68A 360deg)",
                        filter: "blur(80px)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]"
                    style={{
                        background: "conic-gradient(from 180deg at 50% 50%, #FED7AA 0deg, transparent 80deg, #FFF7ED 160deg, transparent 240deg, #FED7AA 320deg, transparent 360deg)",
                        filter: "blur(100px)",
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                />
            </div>

            {/* 2. Noise Grain Texture Overlay */}
            <div className="absolute inset-0 z-[5] opacity-[0.4] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
                    backgroundSize: '150px 150px'
                }}
            />

            {/* 3. Subtle Grid Lines (Knowledge Flow) */}
            <div className="absolute inset-0 z-[6] opacity-[0.08] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #9ca3af 1px, transparent 1px), linear-gradient(to bottom, #9ca3af 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                    maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                }}>
            </div>

            {/* 4. Mobile-Specific Texture (Lightweight Wave) */}
            <div className="absolute inset-0 z-[10] opacity-30 pointer-events-none md:hidden overflow-hidden">
                <svg className="w-full h-full" preserveAspectRatio="none">
                    <motion.path
                        d="M 0 100 Q 150 20 300 100 T 600 100"
                        stroke="#FF8C00"
                        strokeWidth="1.5"
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.5, d: ["M 0 100 Q 150 20 300 100 T 600 100", "M 0 100 Q 150 180 300 100 T 600 100"] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />
                </svg>
            </div>

            {/* 5. Desktop Visual Motion (Floating Icons & Deep Waves) */}
            <div className="absolute inset-0 z-[20] overflow-hidden pointer-events-none hidden md:block">

                {/* Deep Flowing Wave (Desktop) */}
                <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none">
                    <motion.path
                        d="M -200 600 C 400 900 1000 300 1800 600"
                        stroke="url(#gradient-line)"
                        strokeWidth="2"
                        fill="none"
                        animate={{ d: ["M -200 600 C 400 900 1000 300 1800 600", "M -200 700 C 400 500 1000 100 1800 700", "M -200 600 C 400 900 1000 300 1800 600"] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <defs>
                        <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="20%" stopColor="#FF8C00" />
                            <stop offset="80%" stopColor="#FF8C00" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Outer Floating Icons */}
                {[Scale, ShieldCheck, ClipboardList, Receipt, Banknote, Scroll, Users].map((Icon, i) => {
                    const isLeft = i % 2 === 0;
                    const leftPos = isLeft ? Math.random() * 15 + 2 : 83 + Math.random() * 15; // Kept strictly to sides

                    return (
                        <motion.div
                            key={`icon-${i}`}
                            className="absolute p-4 bg-white/60 backdrop-blur-md border border-white/80 rounded-2xl text-[#c2410c] shadow-sm flex items-center justify-center"
                            style={{
                                left: `${leftPos}%`,
                                top: `${Math.random() * 70 + 15}%`,
                            }}
                            animate={{
                                y: [0, -40, 0],
                                rotate: [0, 5, -5, 0],
                                scale: [1, 1.05, 1],
                                opacity: [0.6, 0.9, 0.6]
                            }}
                            transition={{
                                duration: 12 + Math.random() * 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 5
                            }}
                        >
                            <Icon size={isLeft ? 24 : 32} strokeWidth={1.5} />
                        </motion.div>
                    );
                })}
            </div>

            {/* 6. Soft Fog Overlay (Depth) */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40 z-[25] pointer-events-none" />
        </div>
    );
};
