import { motion } from "framer-motion";

export const TopologyBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden bg-white pointer-events-none">
            {/* Soft Base Gradient */}
            <motion.div
                className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_20%_20%,#FFF5EF_0%,#FFFFFF_50%),radial-gradient(circle_at_80%_80%,#FEECE2_0%,#FFFFFF_50%)]"
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            {/* Topology Waves / Energy Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 1440 800" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="50%" stopColor="#FF8C00" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>

                {/* Fluid Flowing Paths */}
                {[...Array(6)].map((_, i) => (
                    <motion.path
                        key={`wave-${i}`}
                        d={`M -100 ${200 + i * 80} C 200 ${100 + i * 40} 600 ${400 + i * 20} 1540 ${200 + i * 60}`}
                        stroke="url(#waveGradient)"
                        strokeWidth="2"
                        fill="none"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                            pathLength: [0, 1, 1, 0],
                            opacity: [0, 1, 1, 0],
                            d: [
                                `M -100 ${200 + i * 80} C 200 ${100 + i * 40} 600 ${400 + i * 20} 1540 ${200 + i * 60}`,
                                `M -100 ${250 + i * 80} C 300 ${50 + i * 40} 800 ${350 + i * 20} 1540 ${250 + i * 60}`,
                                `M -100 ${200 + i * 80} C 200 ${100 + i * 40} 600 ${400 + i * 20} 1540 ${200 + i * 60}`
                            ]
                        }}
                        transition={{
                            duration: 15 + i * 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 2
                        }}
                    />
                ))}

                {/* Light Trails (Fast-moving pulses) */}
                {[...Array(4)].map((_, i) => (
                    <motion.path
                        key={`trail-${i}`}
                        d={`M -200 ${150 + i * 150} Q 400 ${300 + i * 50} 1640 ${150 + i * 100}`}
                        stroke="#FF8C00"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="100 1000"
                        animate={{ strokeDashoffset: [-1100, 1100] }}
                        transition={{
                            duration: 6 + i * 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 3
                        }}
                    />
                ))}
            </svg>

            {/* Floating Regulatory Particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`p-${i}`}
                        className="absolute rounded-full bg-[#FF8C00]"
                        style={{
                            width: Math.random() * 4 + 2 + "px",
                            height: Math.random() * 4 + 2 + "px",
                            left: Math.random() * 100 + "%",
                            top: Math.random() * 100 + "%",
                            opacity: 0.1,
                            filter: "blur(2px)"
                        }}
                        animate={{
                            y: [0, -40, 0],
                            x: [0, 20, 0],
                            opacity: [0.1, 0.3, 0.1],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            {/* Soft Radial Glows */}
            <motion.div
                className="absolute top-1/4 right-1/4 w-[40vw] h-[40vw] rounded-full bg-[#FF8C00]/5 blur-[120px]"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] rounded-full bg-gray-200/40 blur-[100px]"
                animate={{
                    scale: [1.3, 1, 1.3],
                    opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
        </div>
    );
};
