import { motion } from "framer-motion";
import { User, Award, BookOpen } from "lucide-react";

const founders = [
    {
        name: "Mr. S. Deenadayalan",
        role: "Founder",
        image: "/images/leadership/deenadayalan.png",
        expertise: ["50+ Years Experience", "Centre for Excellence CEO", "Pioneered Self-Managed Teams"],
        description: "A visionary leader who has shaped the landscape of organizational excellence in India."
    },
    {
        name: "Mr. PPK Mahindhra",
        role: "Co-Founder",
        image: "/images/leadership/ppk-mahindhra.png",
        expertise: ["26+ Years Experience", "Automation Pioneer", "RPA-Powered Tools"],
        description: "Driving the digital transformation of compliance through high-performance systems."
    },
    {
        name: "Mr. Anand Gopalan",
        role: "Knowledge Partner",
        image: "/images/leadership/anand-gopalan.png",
        expertise: ["Barrister", "Industrial Relations", "Policy Reform Contributor"],
        description: "Providing the legal backbone and deep insights into labor law complexities."
    }
];

const leadership = [
    { name: "Mr. Ramesh", role: "Head of Operations" },
    { name: "Mr. C. Sreetharan", role: "Chief Operating Officer" },
    { name: "Mr. M.V. Prakash", role: "Senior Vice President" }
];

const FoundersLeadership = () => {
    return (
        <section className="py-20 md:py-24 bg-background relative">
            <div className="section-container max-w-5xl">
                <div className="text-center mb-24">
                    <h2 className="text-4xl md:text-5xl font-display font-bold">Leadership That Built the System</h2>
                </div>

                {/* Founders Vertical Flow */}
                <div className="space-y-24">
                    {founders.map((founder, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}
                        >
                            {/* Minimal Avatar/Image Representation */}
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-secondary flex items-center justify-center border-4 border-background shadow-xl relative overflow-hidden group">
                                <img
                                    src={founder.image}
                                    alt={founder.name}
                                    className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 border border-primary/20 rounded-full animate-spin-slow pointer-events-none" />
                            </div>

                            {/* Content */}
                            <div className={`flex-1 text-center ${index % 2 === 1 ? 'md:text-right' : 'md:text-left'}`}>
                                <span className="text-primary font-medium tracking-widest uppercase text-sm">{founder.role}</span>
                                <h3 className="text-3xl font-bold mt-2 mb-4">{founder.name}</h3>
                                <p className="text-lg text-muted-foreground mb-6 leading-relaxed bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                                    {founder.description}
                                </p>

                                {/* Floating Keywords */}
                                <div className={`flex flex-wrap gap-3 ${index % 2 === 1 ? 'md:justify-end' : 'md:justify-start'} justify-center`}>
                                    {founder.expertise.map((exp, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 rounded-full bg-secondary/50 border border-border text-sm text-foreground/80"
                                        >
                                            {exp}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Leadership Team Collective */}
                <div className="mt-32 pt-20 border-t border-border/50">
                    <h3 className="text-2xl font-bold text-center mb-12">Operational Leadership</h3>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {leadership.map((leader, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-2xl bg-secondary/20 hover:bg-secondary/40 transition-colors"
                            >
                                <h4 className="font-bold text-lg">{leader.name}</h4>
                                <p className="text-primary text-sm mt-1">{leader.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FoundersLeadership;
