import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SoftGradientBackground } from "../ui/soft-gradient-background";


// --- Main Component ---

const ResourcesBanner = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax Transforms
    const yBackground = useTransform(scrollY, [0, 500], [0, 200]);
    const yText = useTransform(scrollY, [0, 300], [0, 50]);

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden bg-white py-12 md:py-24 flex items-center justify-center border-b border-gray-50"
        >
            <SoftGradientBackground />


            {/* 3. Hero Content */}
            <div className="container mx-auto px-4 relative z-10 text-center">
                <motion.div
                    style={{ y: yText }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-orange-100 shadow-soft mb-6 hover:shadow-lg transition-shadow duration-300"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#FF8C00] animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-600">Compliance • Statutes • Forms</span>
                    </motion.div>

                    {/* Headline - Significantly Reduced Font Size */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-gray-900 mb-6 tracking-tight leading-tight">
                        TrusComp's <br />
                        <span className="relative inline-block text-[#FF8C00]">
                            Digital Library
                            <div className="absolute -bottom-2 left-0 w-full text-[#FF8C00] opacity-80">
                                {/* <SketchUnderline /> */}
                            </div>
                        </span>
                    </h1>

                    <p className="text-base md:text-lg text-gray-500 font-light max-w-xl mx-auto mb-8 leading-relaxed">
                        Navigate the complexity of Indian Labor Laws with our digital library.
                        <span className="block mt-1 font-medium text-gray-900">Updated daily. Searchable instantly.</span>
                    </p>

                </motion.div>
            </div>
        </div>
    );
};

export default ResourcesBanner;
