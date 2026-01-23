import { motion } from "framer-motion";
import { Repeat } from "lucide-react";

const ContinuousSupport = () => {
    return (
        <section className="py-24 bg-card overflow-hidden">
            <div className="section-container text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-accent/10 text-accent mb-8"
                >
                    <Repeat className="w-4 h-4 animate-spin-slow" />
                    <span className="font-medium">Beyond Go-Live</span>
                </motion.div>

                <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 max-w-2xl mx-auto">
                    Compliance doesn't end at implementation. <br />
                    <span className="text-muted-foreground">We stay with you.</span>
                </h2>

                {/* Infinite Loop Animation Visual */}
                <div className="relative h-40 max-w-4xl mx-auto mt-12 opacity-40">
                    <svg className="w-full h-full" viewBox="0 0 1000 200" fill="none">
                        <path
                            d="M 50 100 C 250 100 250 50 500 50 C 750 50 750 100 950 100"
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="10 10"
                            className="animate-[shimmer_20s_linear_infinite]"
                        />
                        <motion.circle
                            r="6"
                            fill="hsl(var(--primary))"
                            initial={{ offsetDistance: "0%" }}
                            animate={{ offsetDistance: "100%" }}
                            transition={{
                                duration: 10,
                                ease: "linear",
                                repeat: Infinity
                            }}
                            style={{ offsetPath: "path('M 50 100 C 250 100 250 50 500 50 C 750 50 750 100 950 100')" }}
                        />

                        {/* Antigravity Loop */}
                        <path
                            d="M 50 100 C 250 100 250 150 500 150 C 750 150 750 100 950 100"
                            stroke="hsl(var(--accent))"
                            strokeWidth="2"
                            fill="none"
                            strokeDasharray="10 10"
                            className="animate-[shimmer_15s_linear_infinite]"
                        />
                        <motion.circle
                            r="6"
                            fill="hsl(var(--accent))"
                            initial={{ offsetDistance: "0%" }}
                            animate={{ offsetDistance: "100%" }}
                            transition={{
                                duration: 8,
                                ease: "linear",
                                repeat: Infinity
                            }}
                            style={{ offsetPath: "path('M 50 100 C 250 100 250 150 500 150 C 750 150 750 100 950 100')" }}
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
};

export default ContinuousSupport;
