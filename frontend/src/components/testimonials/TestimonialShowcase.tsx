import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import { Testimonial } from "@/data/testimonialsData";

const TestimonialItem = ({ item, index }: { item: Testimonial; index: number }) => {
    const isEven = index % 2 === 0;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className={`flex flex-col md:flex-row gap-12 items-center justify-between py-24 border-b border-gray-100 last:border-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"
                }`}
        >
            {/* Text Content */}
            <div className={`flex-1 ${isEven ? "text-left" : "text-left md:text-right"}`}>
                <div className={`mb-6 text-[#FF8C00] opacity-30 ${isEven ? "mr-auto" : "ml-auto"}`}>
                    <Quote size={48} className={isEven ? "" : "ml-auto"} />
                </div>

                <h3 className="text-2xl md:text-4xl font-display font-medium text-gray-900 leading-snug mb-8 relative inline-block">
                    "{item.quote}"
                    <motion.div
                        className="absolute bottom-1 left-0 h-[2px] bg-[#FF8C00]/30"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "100%" } : { width: 0 }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                    />
                </h3>

                <div>
                    <h4 className="text-lg font-bold text-gray-900">{item.clientName}</h4>
                    <p className="text-gray-500">{item.designation}, {item.company}</p>
                    <p className="text-sm font-semibold text-[#FF8C00] mt-2 uppercase tracking-wide">
                        {item.engagementType}
                    </p>
                </div>
            </div>

            {/* Visual Abstract Placeholder */}
            <div className="w-full md:w-1/3 flex justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-gray-50 to-orange-50 border border-white shadow-soft flex items-center justify-center relative overflow-hidden group hover:shadow-lg transition-all duration-500">
                    <div className="absolute inset-0 bg-[#FF8C00]/5 scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full" />
                    <span className="text-6xl font-display font-bold text-gray-200 group-hover:text-[#FF8C00]/20 transition-colors duration-500 select-none">
                        {item.clientName.charAt(0)}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const TestimonialShowcase = ({ testimonials }: { testimonials: Testimonial[] }) => {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
                {testimonials.map((item, index) => (
                    <TestimonialItem key={item.id} item={item} index={index} />
                ))}
            </div>
        </section>
    );
};

export default TestimonialShowcase;
