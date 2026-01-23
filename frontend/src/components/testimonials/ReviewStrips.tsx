import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Quote, Building2, User } from "lucide-react";

interface Testimonial {
    id: number;
    client_name: string;
    designation: string;
    company: string;
    quote: string;
    engagement_type: string;
    rating?: number;
    image_url?: string;
}

const ReviewBlock = ({ item, index }: { item: Testimonial; index: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
            className="group relative overflow-hidden py-12 md:py-20 border-b border-border/40 last:border-0 hover:bg-white/50 transition-colors duration-500"
        >
            {/* Background Animation on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50/0 via-orange-50/30 to-orange-50/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-12 gap-8 md:gap-16 items-start">

                    {/* Left: Client Info */}
                    <motion.div
                        className="lg:col-span-4 lg:sticky lg:top-32"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300 shadow-sm overflow-hidden">
                                {item.image_url ? (
                                    <img src={item.image_url} alt={item.client_name} className="w-full h-full object-cover" />
                                ) : (
                                    <Building2 size={24} />
                                )}
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">{item.company}</h4>
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider group-hover:text-primary/80 transition-colors">
                                    {item.engagement_type}
                                </span>
                            </div>
                        </div>
                        <div className="pl-16 relative">
                            {/* Accent Line - Grows on Hover */}
                            <motion.div
                                className="absolute left-6 top-0 bottom-0 w-[2px] bg-border group-hover:bg-primary transition-colors duration-300"
                                initial={{ height: "100%" }}
                            />
                            <p className="font-bold text-foreground">{item.client_name}</p>
                            <p className="text-sm text-muted-foreground">{item.designation}</p>
                        </div>
                    </motion.div>

                    {/* Right: Quote Content (Reduced Size + Hover Effect) */}
                    <div className="lg:col-span-8 relative">
                        {/* Background Quote Mark - Animates on Hover */}
                        <Quote className="absolute -top-6 -left-8 w-20 h-20 text-primary/5 -z-10 rotate-180 transition-transform duration-500 group-hover:scale-110 group-hover:text-primary/10" />

                        <blockquote className="text-lg md:text-2xl font-display font-medium text-foreground leading-relaxed tracking-tight mb-8 group-hover:text-gray-900 transition-colors duration-300">
                            "{item.quote}"
                        </blockquote>

                        {/* Subtle Read More Hint? Optional, keeping it clean for now */}
                    </div>

                </div>
            </div>
        </motion.div>
    );
};

const ReviewStrips = ({ testimonials }: { testimonials: Testimonial[] }) => {
    return (
        <section className="bg-background relative">
            {/* Overall Subtle Background Texture/Motion */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none mix-blend-multiply" />

            {testimonials.length > 0 ? (
                testimonials.map((item, index) => (
                    <ReviewBlock key={item.id} item={item} index={index} />
                ))
            ) : (
                <div className="py-20 text-center text-muted-foreground">
                    <p>No testimonials available at the moment.</p>
                </div>
            )}
        </section>
    );
};

export default ReviewStrips;
