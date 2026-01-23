import { motion } from "framer-motion";

const ComplianceEngine = () => {
    return (
        <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center">
            {/* Outer Rotating Rings */}
            <motion.div
                className="absolute inset-0 border-[1px] border-primary/20 rounded-full border-dashed"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute inset-4 border-[1px] border-accent/10 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            />

            {/* Core Node */}
            <div className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-full bg-background border-2 border-primary/30 flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(255,107,0,0.1)]">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <svg viewBox="0 0 100 100" className="w-12 h-12 md:w-16 md:h-16 fill-none stroke-primary" strokeWidth="2">
                    <motion.path
                        d="M50 10 L85 25 V50 C85 70 50 90 50 90 C50 90 15 70 15 50 V25 L50 10Z"
                        animate={{ pathLength: [0, 1, 1, 0] }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />
                </svg>
            </div>

            {/* Pulsing Indicators */}
            {[0, 90, 180, 270].map((angle, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary"
                    style={{
                        transform: `rotate(${angle}deg) translateY(-12rem)`,
                        transformOrigin: "center 12rem"
                    }}
                    animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                />
            ))}
        </div>
    );
};

export default ComplianceEngine;
