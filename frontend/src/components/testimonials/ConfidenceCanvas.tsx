import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Award, Quote } from "lucide-react";
import { Testimonial } from "@/data/testimonialsData";

// Orbital positions for 5 items (approximate circle)
const POSITIONS = [
    { x: 50, y: -150 }, // Top
    { x: 180, y: -50 }, // Top Right
    { x: 120, y: 120 }, // Bottom Right
    { x: -120, y: 120 }, // Bottom Left
    { x: -180, y: -50 }, // Top Left
];

const ReviewMarker = ({
    item,
    index,
    isActive,
    onActivate,
    isMobile
}: {
    item: Testimonial;
    index: number;
    isActive: boolean;
    onActivate: () => void;
    isMobile: boolean;
}) => {
    // Desktop: Use orbital positions | Mobile: use relative layout handling in parent
    const pos = isMobile ? { x: 0, y: 0 } : POSITIONS[index];

    return (
        <motion.div
            layout
            onClick={onActivate}
            className={`
                cursor-pointer transition-all duration-500
                ${isMobile ? "w-full mb-4 relative" : "absolute"}
                ${isActive ? "z-20" : "z-10 hover:z-20"}
            `}
            style={!isMobile ? { left: "50%", top: "50%", x: pos.x, y: pos.y } : {}}
            initial={false}
            animate={
                !isMobile
                    ? {
                        x: isActive ? 0 : pos.x,
                        y: isActive ? 0 : pos.y,
                        scale: isActive ? 1 : 1,
                        zIndex: isActive ? 50 : 10
                    }
                    : {}
            }
        >
            <motion.div
                layout="position"
                className={`
                    relative overflow-hidden bg-white border shadow-soft hover:shadow-lg rounded-2xl p-6
                    ${isActive ? "border-[#FF8C00] ring-1 ring-[#FF8C00]/20" : "border-gray-100 hover:border-gray-200"}
                    ${isActive ? "w-full md:w-[600px]" : "w-full md:w-auto md:min-w-[200px]"}
                `}
                // Center the active card on desktop using negative margins or transform
                style={!isMobile && isActive ? { x: "-50%", y: "-50%" } : !isMobile ? { x: "-50%", y: "-50%" } : {}}
            >
                {/* Collapsed State Content */}
                <div className={`flex items-center gap-4 ${isActive ? "mb-6" : ""}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isActive ? "bg-[#FF8C00] text-white" : "bg-gray-50 text-gray-400 group-hover:text-[#FF8C00]"}`}>
                        <Building2 size={18} />
                    </div>
                    <div className={`${!isActive && !isMobile ? "block" : "block"}`}>
                        <h4 className={`font-bold text-sm ${isActive ? "text-gray-900" : "text-gray-600"}`}>
                            {item.company}
                        </h4>
                        {!isActive && (
                            <p className="text-xs text-gray-400">View Review</p>
                        )}
                    </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="relative mb-6">
                                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#FF8C00]/10 rotate-180" />
                                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium relative z-10 pl-4">
                                    "{item.quote}"
                                </p>
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-2">
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{item.clientName}</p>
                                    <p className="text-xs text-gray-500">{item.designation}</p>
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 rounded-full border border-orange-100">
                                    <Award className="w-3 h-3 text-[#FF8C00]" />
                                    <span className="text-[10px] font-bold text-[#FF8C00] tracking-wide uppercase">
                                        {item.engagementType}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Draw-on border effect for active state */}
                {isActive && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl">
                        <motion.rect
                            width="100%"
                            height="100%"
                            fill="none"
                            stroke="#FF8C00"
                            strokeWidth="2"
                            strokeOpacity="0.5"
                            rx="16"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </svg>
                )}
            </motion.div>
        </motion.div>
    );
};

const ConfidenceCanvas = ({ testimonials }: { testimonials: Testimonial[] }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0); // Default open first

    // Simple mock for mobile detection - in production use a hook
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    return (
        <section className="relative py-24 bg-[#FAFAFA] overflow-hidden min-h-[800px] md:min-h-[900px]">
            {/* Visual Center Hub (Desktop Only) */}
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
                {/* Hub Rings */}
                <div className="absolute inset-0 border border-gray-200 rounded-full opacity-30 scale-75" />
                <div className="absolute inset-0 border border-dashed border-gray-300 rounded-full opacity-20 animate-spin-slow" />

                {/* Center Pulse */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-soft flex items-center justify-center border border-gray-100 z-0">
                    <div className="w-3 h-3 bg-[#FF8C00] rounded-full animate-pulse shadow-glow" />
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10 h-full flex flex-col md:block">

                {/* Header */}
                <div className="text-center mb-16 md:mb-0 md:absolute md:top-0 md:left-0 md:w-full pointer-events-none">
                    <span className="inline-block py-1 px-3 rounded-full bg-white border border-gray-200 text-gray-500 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
                        Verified Confidence
                    </span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
                        5 Reasons Clients <span className="text-[#FF8C00]">Trust Us</span>
                    </h2>
                </div>

                {/* Canvas Area */}
                <div className="relative w-full h-full md:h-[600px] mt-10 md:mt-32">
                    {/* Items */}
                    <div className="flex flex-col md:block relative h-full">
                        {testimonials.slice(0, 5).map((item, index) => (
                            <ReviewMarker
                                key={item.id}
                                item={item}
                                index={index}
                                isActive={activeIndex === index}
                                onActivate={() => setActiveIndex(activeIndex === index ? null : index)} // Toggle
                                isMobile={isMobile}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConfidenceCanvas;
