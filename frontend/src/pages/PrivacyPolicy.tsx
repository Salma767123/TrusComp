import Layout from "@/components/layout/Layout";
import { useSEO } from "@/hooks/useSEO";
import { PageBackground } from "@/components/ui/PageBackground";
import { PageHeader } from "@/components/ui/PageHeader";
import { ShieldCheck, Lock, FileText, Share2, Database, Eye, Bell, User, Cookie, Mail } from "lucide-react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
    useSEO("Privacy Policy | TrusComp");

    return (
        <Layout>
            <PageBackground>
                <div className="section-container py-20 lg:py-32">
                    <PageHeader
                        titleStart="Privacy"
                        titleHighlight="Policy"
                        subtitle="Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information."
                        icon={ShieldCheck}
                    />

                    <div className="max-w-4xl mx-auto space-y-8">
                        {/* Intro Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <h2 className="text-xl font-display font-semibold text-slate-900 mb-4 flex items-center gap-3">
                                <span className="w-1 h-6 bg-primary rounded-full" />
                                General Information
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                This Privacy Policy outlines how TrusComp collects, uses, and protects your personal information. By using our services, you agree to the terms outlined in this policy.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {policySections.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                                >
                                    <div className="mb-4 w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <section.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-display font-semibold text-slate-900 mb-3">
                                        {section.title}
                                    </h3>
                                    <div className="text-slate-600 leading-relaxed text-sm">
                                        {section.content}
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
                            className="bg-primary/5 rounded-2xl p-8 border border-primary/10 text-center mt-12"
                        >
                            <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-6 h-6 text-primary" />
                            </div>
                            <h2 className="text-xl font-display font-semibold text-slate-900 mb-2">
                                Questions or Concerns?
                            </h2>
                            <p className="text-slate-600 mb-4">
                                For questions regarding this Privacy Policy, please contact us.
                            </p>
                            <a href="mailto:contact@truscomp.com" className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-primary text-white font-medium shadow-md hover:bg-primary/90 transition-all hover:-translate-y-0.5">
                                contact@truscomp.com
                            </a>
                        </motion.div>
                    </div>
                </div>
            </PageBackground>
        </Layout>
    );
};

const policySections = [
    {
        title: "Information We Collect",
        icon: Database,
        content: "We collect personal information such as names, contact details, and professional details to facilitate statutory compliance processes. This information is used solely for generating ESI IP numbers and PF UAN numbers through automated processes."
    },
    {
        title: "When Policy Applies",
        icon: FileText,
        content: "This policy applies to all users who utilize TrusComp’s services."
    },
    {
        title: "Exceptions",
        icon: Eye,
        content: (
            <ul className="list-disc pl-4 space-y-1">
                <li>Third-party websites or services linked from our website</li>
                <li>Information collected offline</li>
            </ul>
        )
    },
    {
        title: "Sharing Information",
        icon: Share2,
        content: "We do not share your personal information with third parties unless required by law."
    },
    {
        title: "Data Retention",
        icon: Database,
        content: "We retain your information only for the duration necessary to fulfill the purposes outlined in this policy."
    },
    {
        title: "Security Measures",
        icon: Lock,
        content: "TrusComp employs industry-standard security measures to protect your personal information."
    },
    {
        title: "Your Rights",
        icon: User,
        content: "You have the right to access, correct, or delete your personal information. Contact us for assistance."
    },
    {
        title: "Policy Updates",
        icon: Bell,
        content: "TrusComp may update this policy periodically. Please check our website for updates."
    },
    {
        title: "Account Information",
        icon: User,
        content: "Your account information is securely stored and can be updated through the user dashboard."
    },
    {
        title: "Cookies",
        icon: Cookie,
        content: "TrusComp uses cookies to enhance user experience. Cookie preferences can be managed through browser settings."
    }
];

export default PrivacyPolicy;
