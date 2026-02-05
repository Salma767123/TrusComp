import { motion } from "framer-motion";
import { TrustComplianceVisual } from "./TrustComplianceVisual";
import { TopologyBackground } from "../ui/topology-background";

const AboutHero = () => {
    return (
        <section className="relative pt-6 md:pt-12 pb-6 md:pb-24 min-h-[0vh] flex items-center overflow-hidden bg-white">
            <TopologyBackground />

            <div className="section-container relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-4 md:gap-8 items-center">
                    {/* Left: Typography */}
                    <div className="space-y-6 md:space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
                                Our Identity
                            </span>
                            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight">
                                Compliance, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-warning to-primary bg-[length:300%_100%] animate-shimmer">
                                    Powered by TrusComp
                                </span>
                            </h1>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
                        >
                            TrusComp Private Limited is a trusted leader in compliance solutions,
                            combining labor law expertise, consulting, and technology to
                            transform regulatory adherence into a competitive advantage.
                        </motion.p>
                    </div>

                    {/* Right: Trust-Centric Compliance Visual */}
                    <div className="relative h-[250px] md:h-[500px] flex items-center justify-center scale-[0.45] md:scale-100 mt-0 lg:mt-0">
                        <TrustComplianceVisual />
                    </div>
                </div>
            </div>
        </section>
    );
};

const FloatingNode = ({ icon: Icon, label, className, delay, color, bg }: any) => (
    <motion.div
        className={`absolute ${className} p-4 rounded-2xl backdrop-blur-md border border-border shadow-lg ${bg}`}
        animate={{
            y: [0, -20, 0],
            rotate: [0, 2, -2, 0]
        }}
        transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }}
    >
        <div className={`flex flex-col items-center gap-2 ${color}`}>
            <Icon className="w-8 h-8" />
            <span className="text-sm font-semibold text-foreground/80">{label}</span>
        </div>
    </motion.div>
);

export default AboutHero;
