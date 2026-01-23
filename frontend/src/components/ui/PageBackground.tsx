import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageBackgroundProps {
    children?: ReactNode;
    className?: string;
}

export const PageBackground = ({ children, className = "" }: PageBackgroundProps) => {
    return (
        <div className={`relative min-h-screen bg-white overflow-hidden ${className}`}>
            {/* 
        Background Layer 
        - Light gradient overlays (white -> very light orange -> off-white)
        - Continuous loop animation
      */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    className="absolute inset-0 opacity-60 bg-[radial-gradient(circle_at_20%_20%,#FFFFFF_0%,#FFF5EF_50%,#FFFFFF_100%),radial-gradient(circle_at_80%_80%,#FFFBF7_0%,#FFF5EF_50%,#FFFFFF_100%)]"
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />

                {/* Subtle Animated Abstract Elements */}

                {/* Floating Dots - Group 1 */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={`dot-${i}`}
                            className="absolute rounded-full bg-primary/10"
                            style={{
                                width: Math.random() * 6 + 4 + "px",
                                height: Math.random() * 6 + 4 + "px",
                                left: Math.random() * 100 + "%",
                                top: Math.random() * 100 + "%",
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, Math.random() * 20 - 10, 0],
                                opacity: [0.3, 0.6, 0.3],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: Math.random() * 5,
                            }}
                        />
                    ))}
                </div>

                {/* Soft Radial Rings */}
                <motion.div
                    className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full border border-primary/5"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                        rotate: [0, 10, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] rounded-full border border-primary/5"
                    animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.2, 0.4, 0.2],
                        rotate: [0, -10, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />

            </div>

            {/* Content Layer */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};
