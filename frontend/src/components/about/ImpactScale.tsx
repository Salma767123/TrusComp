import { motion } from "framer-motion";

const metrics = [
    {
        id: "01",
        number: "7+",
        label: "7+ Years of Excellence",
        description: "Delivering customized compliance solutions."
    },
    {
        id: "02",
        number: "60+",
        label: "60+ Compliance Specialists",
        description: "Dedicated experts ensuring your peace of mind."
    },
    {
        id: "03",
        number: "100+",
        label: "100+ Trusted Clients",
        description: "Including industry leaders across sectors."
    }
];

const ImpactScale = () => {
    return (
        <section className="py-32 bg-[#1a1c20] text-white relative overflow-hidden">
            {/* Dark Animated Background - Lightened */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,107,0,0.15)_0%,transparent_60%)] animate-pulse-slow" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>

            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <span className="text-primary font-medium tracking-[0.2em] uppercase text-sm">Impact & Resonance</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold mt-4">Proof Through Presence</h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-16 md:gap-8">
                    {metrics.map((item, index) => (
                        <div key={item.id} className="relative group text-center md:text-left">
                            {/* Large Background Number */}
                            <motion.span
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 0.08, scale: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                viewport={{ once: true }}
                                className="absolute -top-12 left-1/3 -translate-x-1/2 md:left-0 md:translate-x-0 text-[7rem] font-display font-black text-white select-none pointer-events-none"
                            >
                                {item.number}
                            </motion.span>

                            {/* Foreground Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="relative pt-16"
                            >
                                <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-white to-white/70">
                                    {item.label}
                                </h3>
                                <p className="text-white/60 text-lg leading-relaxed max-w-xs mx-auto md:mx-0">
                                    {item.description}
                                </p>

                                {/* Decorative Element */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ delay: 0.6 + (index * 0.2), duration: 1 }}
                                    viewport={{ once: true }}
                                    className="h-[2px] w-20 bg-gradient-to-r from-primary to-transparent mt-8 rounded-full origin-left inline-block"
                                />
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ImpactScale;
