import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import {
    Heart,
    Eye,
    Scale,
    Lightbulb,
    Users,
    Handshake,
    GraduationCap
} from "lucide-react";

const values = [
    {
        icon: Heart,
        label: "Trust",
        description: "Building long-lasting relationships."
    },
    {
        icon: Eye,
        label: "Transparency",
        description: "Open and honest communication."
    },
    {
        icon: Scale,
        label: "Ethical Practices",
        description: "Upholding highest standards."
    },
    {
        icon: Lightbulb,
        label: "Innovation",
        description: "Future-ready solutions."
    },
    {
        icon: Users,
        label: "Client-Centric",
        description: "Exceeding expectations."
    },
    {
        icon: Handshake,
        label: "Collaboration",
        description: "Teamwork for problem-solving."
    },
    {
        icon: GraduationCap,
        label: "Learning",
        description: "Continuous improvement."
    }
];

const CoreValues = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Generate random particles for the background
    const particles = useMemo(() => {
        return Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * -20
        }));
    }, []);

    return (
        <section className="py-32 bg-[#121214] relative overflow-hidden text-white">
            {/* Background Layers */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Dotted Grid / Blueprint lines */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.05)_0%,transparent_70%)] opacity-50" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

                {/* Noise Texture */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

                {/* Drifting Particles */}
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute bg-primary/20 rounded-full"
                        initial={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
                        animate={{
                            top: [`${p.y}%`, `${(p.y + 20) % 100}%`],
                            left: [`${p.x}%`, `${(p.x + 10) % 100}%`]
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: p.delay
                        }}
                    />
                ))}

                {/* Breathing Glow */}
                <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,0,0.03),transparent_70%)]"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="section-container relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <span className="text-primary font-display font-medium tracking-[0.3em] uppercase text-sm">Our DNA</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold">Values in Motion</h2>
                    </motion.div>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12 transition-all duration-500">
                    {values.map((item, index) => (
                        <ValueNode
                            key={index}
                            item={item}
                            index={index}
                            isHovered={hoveredIndex === index}
                            isAnyHovered={hoveredIndex !== null}
                            onHover={() => setHoveredIndex(index)}
                            onLeave={() => setHoveredIndex(null)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ValueNode = ({ item, index, isHovered, isAnyHovered, onHover, onLeave }: any) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group relative transition-all duration-500 ${isAnyHovered && !isHovered ? 'opacity-30 blur-[1px]' : 'opacity-100'}`}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <div className={`flex items-center gap-4 px-8 py-4 rounded-full border transition-all duration-500 cursor-default ${isHovered ? 'border-primary bg-primary/10 shadow-[0_0_20px_rgba(255,107,0,0.2)]' : 'border-white/10 bg-white/5'}`}>
                <item.icon className={`w-5 h-5 transition-all duration-500 ${isHovered ? 'text-primary scale-110' : 'text-white/40'}`} strokeWidth={1.5} />
                <span className={`font-display font-semibold transition-all duration-500 ${isHovered ? 'text-white' : 'text-white/70'}`}>
                    {item.label}
                </span>
            </div>

            {/* Description Reveal */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, height: 0, y: 10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: 10 }}
                        className="relative md:absolute md:left-1/2 md:-translate-x-1/2 mt-4 md:mt-6 w-full md:w-56 text-center pointer-events-none z-30"
                    >
                        <div className="py-2 md:py-0">
                            <p className="text-sm text-white/50 leading-relaxed font-light px-4 md:px-0">
                                {item.description}
                            </p>
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                className="h-[1px] w-12 bg-primary/50 mx-auto mt-4"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default CoreValues;
