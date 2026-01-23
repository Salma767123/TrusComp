import { motion } from "framer-motion";
import { Shield, FileText, Scale, CheckCircle2, Share2 } from "lucide-react";

const nodes = [
    { id: "protection", icon: Shield, label: "Protection", x: -190, y: -70, delay: 0 },
    { id: "documentation", icon: FileText, label: "Documentation", x: -160, y: 150, delay: 1 },
    { id: "ethics", icon: Scale, label: "Ethics", x: 200, y: -80, delay: 0.5 },
    { id: "compliance", icon: CheckCircle2, label: "Compliance", x: 170, y: 140, delay: 1.5 },
    { id: "network", icon: Share2, label: "Ecosystem", x: 0, y: -180, delay: 2 },
];

export const TrustComplianceVisual = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* Extra Orbiting Energy Trails (Topology Style) */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={`orbit-${i}`}
                    className="absolute z-10 rounded-full border border-primary/20"
                    style={{
                        width: 200 + i * 100,
                        height: 200 + i * 100,
                    }}
                    animate={{
                        rotate: 360,
                        scale: [1, 1.05, 1],
                    }}
                    transition={{
                        rotate: { duration: 20 + i * 15, repeat: Infinity, ease: "linear" },
                        scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <motion.div
                        className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#FF8C00]"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </motion.div>
            ))}

            {/* Central Trust Node Glow Layers */}
            <motion.div
                className="absolute z-10 w-48 h-48 md:w-64 md:h-64 rounded-full bg-primary/5 blur-[40px]"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute z-10 w-32 h-32 md:w-48 md:h-48 rounded-full bg-primary/10 blur-[20px]"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Central Trust Node */}
            <motion.div
                className="relative z-20 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white border-4 border-primary/20 flex items-center justify-center shadow-[0_0_50px_rgba(255,140,0,0.15)] ring-8 ring-primary/5"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "circOut" }}
            >
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        boxShadow: [
                            "0 0 20px rgba(255,140,0,0.2)",
                            "0 0 40px rgba(255,140,0,0.4)",
                            "0 0 20px rgba(255,140,0,0.2)"
                        ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-primary to-orange-600 flex flex-col items-center justify-center text-white p-4 text-center"
                >
                    <span className="text-xs font-bold uppercase tracking-tighter opacity-70">Powered By</span>
                    <span className="text-xl md:text-2xl font-display font-black tracking-tight">TRUST</span>
                </motion.div>
            </motion.div>

            {/* Connection Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
                <defs>
                    <radialGradient id="lineGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {nodes.map((node, i) => (
                    <g key={`line-${node.id}`}>
                        {/* Thicker soft "energy" wave path */}
                        <motion.path
                            d={`M 300 300 Q ${300 + node.x / 2} ${300 + (node.y - 40) / 2} ${300 + node.x} ${300 + node.y}`}
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="6"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.03 }}
                            transition={{ duration: 2, delay: node.delay + 0.5 }}
                        />
                        <motion.path
                            d={`M 300 300 Q ${300 + node.x / 2} ${300 + (node.y - 40) / 2} ${300 + node.x} ${300 + node.y}`}
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.15 }}
                            transition={{ duration: 2, delay: node.delay + 0.5 }}
                        />
                        {/* Moving light pulse on path */}
                        <motion.circle
                            r="3"
                            fill="hsl(var(--primary))"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: [0, 1, 0],
                                offsetDistance: ["0%", "100%"]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "linear",
                                delay: node.delay
                            }}
                            style={{
                                offsetPath: `path('M 300 300 Q ${300 + node.x / 2} ${300 + (node.y - 40) / 2} ${300 + node.x} ${300 + node.y}')`
                            }}
                        />
                    </g>
                ))}

                {/* Additional circular orbit lines */}
                <motion.circle
                    cx="300"
                    cy="300"
                    r="200"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                    strokeDasharray="10 20"
                    opacity="0.05"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                />
                <motion.circle
                    cx="300"
                    cy="300"
                    r="100"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1"
                    strokeDasharray="5 15"
                    opacity="0.05"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                />
            </svg>

            {/* Narrative Nodes */}
            {nodes.map((node) => (
                <motion.div
                    key={node.id}
                    className="absolute z-30"
                    initial={{ opacity: 0, scale: 0.8, x: 0, y: 0 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        x: node.x,
                        y: node.y
                    }}
                    transition={{
                        duration: 0.8,
                        delay: node.delay,
                        x: { duration: 0.8, delay: node.delay },
                        y: { duration: 0.8, delay: node.delay }
                    }}
                >
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 1, -1, 0]
                        }}
                        transition={{
                            duration: 5 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="group relative flex flex-col items-center gap-2 p-3 md:p-4 rounded-xl bg-white/60 backdrop-blur-md border border-white/80 shadow-[0_8px_32px_rgba(255,140,0,0.08)] hover:shadow-primary/20 hover:border-primary/40 transition-all duration-300"
                    >
                        {/* Glow Backdrop */}
                        <div className="absolute inset-0 rounded-xl bg-primary/5 opacity-40 group-hover:opacity-100 transition-opacity blur-lg -z-10" />

                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-inner">
                            <node.icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                            {node.label}
                        </span>
                    </motion.div>
                </motion.div>
            ))}

            {/* Floating Regulatory Particles & Orbs */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={`particle-${i}`}
                    className={`absolute rounded-full ${i % 3 === 0 ? "w-2 h-2 bg-primary/20 blur-[2px]" : "w-1 h-1 bg-primary/30"}`}
                    animate={{
                        x: [Math.random() * 600 - 300, Math.random() * 600 - 300],
                        y: [Math.random() * 600 - 300, Math.random() * 600 - 300],
                        opacity: [0, 0.5, 0],
                        scale: [0, 1.2, 0]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 5
                    }}
                />
            ))}

            {/* Compliance Orbs */}
            <motion.div
                className="absolute w-40 h-40 bg-primary/10 rounded-full blur-[80px]"
                animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.3, 0.7, 0.3],
                    x: [-120, 120, -120],
                    y: [-60, 60, -60]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute w-24 h-24 bg-primary/5 rounded-full blur-[40px]"
                animate={{
                    scale: [1.2, 0.8, 1.2],
                    opacity: [0.2, 0.5, 0.2],
                    x: [150, -150, 150],
                    y: [80, -80, 80]
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
            />
        </div>
    );
};
