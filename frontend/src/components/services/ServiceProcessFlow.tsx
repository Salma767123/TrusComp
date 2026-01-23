import { motion } from "framer-motion";
import { Search, BarChart2, ClipboardList, Settings, ShieldCheck, Activity } from "lucide-react";

interface Step {
    id: string;
    label: string;
    icon: any;
}

const steps: Step[] = [
    { id: "audit", label: "AS-IS Audit", icon: Search },
    { id: "gap", label: "Gap Analysis", icon: BarChart2 },
    { id: "plan", label: "Plan", icon: ClipboardList },
    { id: "implement", label: "Implement", icon: Settings },
    { id: "comply", label: "Comply", icon: ShieldCheck },
    { id: "monitor", label: "Monitor", icon: Activity },
];

export const ServiceProcessFlow = () => {
    return (
        <div className="w-full mt-16 max-w-6xl mx-auto px-4 overflow-x-auto no-scrollbar">
            <div className="relative min-w-[800px] py-8">
                {/* Background Progress Line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/10 -translate-y-1/2" />

                {/* Animated Progress Line */}
                <motion.div
                    className="absolute top-1/2 left-0 h-[2px] bg-primary -translate-y-1/2 origin-left shadow-[0_0_15px_rgba(255,140,0,0.5)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
                />

                <div className="relative flex justify-between items-center z-10">
                    {steps.map((step, index) => (
                        <div key={step.id} className="relative flex flex-col items-center group">
                            {/* Step Icon Container */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.3, duration: 0.8 }}
                                className="relative z-10"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.15 }}
                                    className="w-16 h-16 rounded-2xl bg-[#1c1c1e] border border-white/10 flex items-center justify-center text-white/50 group-hover:text-primary group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(255,140,0,0.2)] transition-all duration-300"
                                >
                                    <step.icon className="w-7 h-7" />
                                </motion.div>

                                {/* Pulsing Arrow/Connector Dot */}
                                {index < steps.length - 1 && (
                                    <motion.div
                                        className="absolute top-1/2 -right-12 w-3 h-3 rounded-full bg-primary/30"
                                        animate={{
                                            x: [0, 40, 0],
                                            opacity: [0, 1, 0],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            delay: index * 0.5
                                        }}
                                    />
                                )}
                            </motion.div>

                            {/* Step Label */}
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: (index * 0.3) + 0.5, duration: 0.5 }}
                                className="mt-6 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors"
                            >
                                {step.label}
                            </motion.span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </div>
    );
};
