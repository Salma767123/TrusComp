import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WhyChooseItem } from "@/data/testimonialsData";

const FeatureItem = ({ item, index }: { item: WhyChooseItem; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    const Icon = item.icon;

    return (
        <motion.div
            ref={ref}
            className="relative flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-gray-100 transition-all duration-300 group overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileHover={{
                y: -10,
                boxShadow: "0 20px 40px -15px rgba(255, 140, 0, 0.15)",
                borderColor: "rgba(255, 140, 0, 0.3)"
            }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            {/* Hover Glow Effect Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF8C00]/0 via-[#FF8C00]/0 to-[#FF8C00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <motion.div
                className="w-16 h-16 mb-6 rounded-2xl bg-orange-50 text-[#FF8C00] flex items-center justify-center relative z-10"
                whileHover={{ scale: 1.1, rotate: 5 }}
            >
                {/* Icon Draw Animation */}
                <Icon size={32} strokeWidth={1.5} />
            </motion.div>

            <h3 className="relative z-10 text-xl font-bold text-gray-900 mb-3 group-hover:text-[#FF8C00] transition-colors duration-300">{item.title}</h3>
            <p className="relative z-10 text-gray-500 leading-relaxed font-light">
                {item.description}
            </p>
        </motion.div>
    );
};

const WhyChooseSection = ({ items }: { items: WhyChooseItem[] }) => {
    return (
        <section className="relative py-10 md:py-24 bg-[#FAFAFA] border-t border-gray-100 overflow-hidden">
            {/* Background Flying Particles Animation */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-[#FF8C00]/10 blur-xl"
                        style={{
                            width: Math.random() * 200 + 50,
                            height: Math.random() * 200 + 50,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -50, 0],
                            x: [0, 30, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-6">
                        Why Our Clients <br /><span className="text-[#FF8C00]">Choose TrusComp?</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        Delivering more than just reports. We deliver peace of mind.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                        <FeatureItem key={item.id} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;
