import { motion } from "framer-motion";
import { useMemo } from "react";

const phases = [
    { step: "01", title: "Needs Analysis", range: "Week 1-2" },
    { step: "02", title: "Project Planning", range: "Week 3" },
    { step: "03", title: "Technical Setup", range: "Week 4" },
    { step: "04", title: "User Onboarding", range: "Week 4-5" },
    { step: "05", title: "Pilot Testing", range: "Week 6-7" },
    { step: "06", title: "Full-Scale Deployment", range: "Week 8-9" },
    { step: "07", title: "Ongoing Support", range: "Ongoing" },
];

const DeliveryFramework = () => {
    const particles = useMemo(() => {
        return Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            width: Math.random() * 40 + 20,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * -10
        }));
    }, []);

    return (
        <section className="py-32 bg-[#0d0d0f] text-white relative overflow-hidden border-t border-white/5">
            {/* Premium Dark Animated Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Subtle Dotted Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                {/* Data Flow Lines (Particles) */}
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"
                        style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.width }}
                        animate={{
                            x: [-100, 200],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: p.delay
                        }}
                    />
                ))}

                {/* Breathing Glows */}
                <motion.div
                    className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full"
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full"
                    animate={{ opacity: [0.2, 0.5, 0.2], scale: [1.1, 1, 1.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                />
            </div>

            <div className="section-container relative z-10">
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-primary font-display font-medium tracking-[0.3em] uppercase text-sm">Our Methodology</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold mt-4 tracking-tight">Compliance, Engineered in Phases</h2>
                        <p className="text-white/40 mt-6 max-w-2xl mx-auto text-lg font-light leading-relaxed">
                            A meticulously structured framework designed for seamless operational transition and long-term stability.
                        </p>
                    </motion.div>
                </div>

                {/* Desktop Timeline (Horizontal) */}
                <div className="hidden lg:block relative py-12">
                    {/* Connecting Line */}
                    <div className="absolute top-[60px] left-0 right-0 h-[1px] bg-white/5 z-0">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary via-accent to-primary origin-left shadow-[0_0_10px_rgba(255,107,0,0.3)]"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            viewport={{ once: true }}
                        />
                    </div>

                    <div className="grid grid-cols-7 gap-6 relative z-10 text-center">
                        {phases.map((phase, index) => (
                            <TimelineNode key={index} phase={phase} index={index} />
                        ))}
                    </div>
                </div>

                {/* Mobile/Tablet Timeline (Vertical) */}
                <div className="lg:hidden relative pl-10 border-l border-white/5 ml-4 space-y-16">
                    {phases.map((phase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Node Indicator */}
                            <div className="absolute -left-[51px] top-1 w-5 h-5 rounded-full bg-[#0d0d0f] border-2 border-primary/50 shadow-[0_0_15px_rgba(255,107,0,0.2)]" />

                            <div>
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{phase.range}</span>
                                <h3 className="text-2xl font-bold mt-2 tracking-tight">{phase.title}</h3>
                                <p className="text-white/30 mt-2 text-sm font-light">Stage {phase.step}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const TimelineNode = ({ phase, index }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.15, duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col items-center group"
    >
        {/* Circle Node */}
        <div className="w-5 h-5 rounded-full bg-[#0d0d0f] border-[1.5px] border-white/20 group-hover:border-primary group-hover:shadow-[0_0_15px_rgba(255,107,0,0.4)] transition-all duration-500 mb-8 z-10 flex items-center justify-center shadow-lg" />

        <div className="bg-white/[0.03] backdrop-blur-md p-6 rounded-2xl border border-white/5 group-hover:border-primary/30 transition-all duration-500 w-full min-h-[170px] flex flex-col justify-center text-left hover:bg-white/[0.05]">
            <span className="text-[10px] font-bold text-primary mb-3 block uppercase tracking-[0.25em] leading-none">{phase.range}</span>
            <h4 className="font-bold text-sm leading-tight group-hover:text-white transition-colors tracking-tight">{phase.title}</h4>
            <div className="w-6 h-[1px] bg-white/10 mt-4 group-hover:w-10 group-hover:bg-primary/50 transition-all duration-500" />
            <span className="text-[9px] text-white/20 mt-4 block uppercase font-medium tracking-widest">{phase.step}</span>
        </div>
    </motion.div>
);

export default DeliveryFramework;
