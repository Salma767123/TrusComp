import Layout from "@/components/layout/Layout";
import { useSEO } from "@/hooks/useSEO";
import { PageBackground } from "@/components/ui/PageBackground";
import { PageHeader } from "@/components/ui/PageHeader";
import { FileText, Shield, UserCheck, Scale, AlertTriangle, Gavel, Ban, RefreshCw, Mail } from "lucide-react";
import { motion } from "framer-motion";

const TermsConditions = () => {
    useSEO("Terms & Conditions | TrusComp");

    return (
        <Layout>
            <PageBackground>
                <div className="section-container py-20 lg:py-32">
                    <PageHeader
                        titleStart="Terms &"
                        titleHighlight="Conditions"
                        subtitle="Please read these terms carefully before using our services. They govern your use of TrusComp's platform and compliance solutions."
                        icon={FileText}
                    />

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6">
                            {termsSections.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group"
                                >
                                    {/* Number Watermark */}
                                    <div className="absolute -right-4 -top-6 text-[120px] font-display font-bold text-slate-50 opacity-[0.03] pointer-events-none select-none group-hover:opacity-[0.06] transition-opacity">
                                        {index + 1}
                                    </div>

                                    <div className="flex gap-4 md:gap-6 relative z-10">
                                        <div className="shrink-0">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100/50">
                                                <section.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-xl font-display font-semibold text-slate-900 mb-3 flex items-center gap-2">
                                                <span className="text-slate-400 font-normal text-sm border border-slate-200 rounded px-1.5 py-0.5">
                                                    {String(index + 1).padStart(2, '0')}
                                                </span>
                                                {section.title}
                                            </h2>
                                            <p className="text-slate-600 leading-relaxed">
                                                {section.content}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Contact Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-slate-900 rounded-2xl p-8 border border-slate-800 text-center mt-12 text-white"
                        >
                            <h2 className="text-xl font-display font-semibold mb-2">
                                Need Clarification?
                            </h2>
                            <p className="text-slate-400 mb-4 max-w-lg mx-auto">
                                If you have any questions about our terms, specific clauses, or usage policies, please reach out to our legal team.
                            </p>
                            <a href="mailto:contact@truscomp.com" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 gap-2">
                                <Mail className="w-4 h-4" />
                                contact@truscomp.com
                            </a>
                        </motion.div>
                    </div>
                </div>
            </PageBackground>
        </Layout>
    );
};

const termsSections = [
    {
        title: "Acceptance of Terms",
        icon: UserCheck,
        content: "By accessing or using TrusComp’s services, you agree to these Terms and Conditions."
    },
    {
        title: "Service Usage",
        icon: Shield,
        content: "TrusComp’s services are intended for lawful statutory compliance processes."
    },
    {
        title: "User Responsibilities",
        icon: UserCheck,
        content: "Users are responsible for the accuracy and legality of information provided."
    },
    {
        title: "Intellectual Property",
        icon: FileText,
        content: "All intellectual property related to TrusComp belongs to TrusComp."
    },
    {
        title: "Limitation of Liability",
        icon: AlertTriangle,
        content: "TrusComp is not liable for indirect, incidental, or consequential damages."
    },
    {
        title: "Governing Law",
        icon: Scale,
        content: "These Terms and Conditions are governed by applicable laws."
    },
    {
        title: "Termination",
        icon: Ban,
        content: "TrusComp may suspend or terminate services if terms are violated."
    },
    {
        title: "Changes to Terms",
        icon: RefreshCw,
        content: "Users are responsible for reviewing updated Terms periodically."
    },
    {
        title: "Contact Information",
        icon: Mail,
        content: "For questions, contact contact@truscomp.com"
    }
];

export default TermsConditions;
