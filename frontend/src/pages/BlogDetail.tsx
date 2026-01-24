import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import {
    ArrowLeft,
    Share2,
    Download,
    FileText,
    Calendar,
    Shield,
    Clock,
    ChevronRight,
    CheckCircle2,
    AlertTriangle,
    Bookmark,
    RotateCw
} from "lucide-react";
import { blogPosts } from "@/data/resourcesData";

// Animated Section Component
const AnimatedContentSection = ({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.section
            id={id}
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`scroll-mt-32 ${className}`}
        >
            {children}
        </motion.section>
    );
};

import { useSEO } from "@/hooks/useSEO";

const BlogDetail = () => {
    const { id } = useParams();
    useSEO("blog", id);
    const [post, setPost] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState("overview");
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.short_description,
                    url,
                });
            } catch (err) {
                console.log("Share skipped", err);
            }
        } else {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const apiBase = import.meta.env.VITE_API_BASE_URL || "";
                const response = await fetch(`${apiBase}/blogs/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    // Parse attachments if they are stringified
                    const parsedData = {
                        ...data,
                        attachments: typeof data.attachments === 'string' ? JSON.parse(data.attachments) : data.attachments || []
                    };
                    setPost(parsedData);
                }
            } catch (err) {
                console.error("Error fetching blog:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    // Track active section for sidebar highlighting
    useEffect(() => {
        const handleScroll = () => {
            const sections = ["overview", "provisions", "obligations", "penalties"];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (loading) {
        return (
            <Layout>
                <div className="p-20 flex flex-col items-center justify-center gap-4 text-gray-400">
                    <RotateCw className="w-8 h-8 animate-spin text-primary" />
                    <span>Summoning expert insights...</span>
                </div>
            </Layout>
        );
    }

    if (!post) return <div className="p-20 text-center">Article not found</div>;

    const SECTIONS = [
        { id: "overview", title: "Overview & Objectives" },
        { id: "provisions", title: "Detailed Analysis" },
        { id: "penalties", title: "Final Thoughts" },
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <Layout>
            <div className="bg-white text-gray-900 min-h-screen">
                {/* Progress Bar */}
                <motion.div
                    className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-[100] origin-left"
                    style={{ scaleX }}
                />

                {/* Hero Section */}
                <div className="relative bg-gradient-to-br from-gray-50 via-white to-orange-50/30 pt-32 pb-20 border-b border-gray-100 overflow-hidden">
                    {/* Banner Image Background */}
                    {post.banner_image && (
                        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                            <img src={post.banner_image} className="w-full h-full object-cover" alt="" />
                        </div>
                    )}

                    {/* Decorative Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
                    </div>

                    <div className="container mx-auto px-4 max-w-5xl relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link
                                to="/resources"
                                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors mb-8 group"
                            >
                                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                Back to Resources
                            </Link>

                            <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider">
                                    {post.category}
                                </span>
                                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                                    <Shield className="w-3.5 h-3.5 text-primary" />
                                    {post.author || "TrusComp Editorial"}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 leading-[1.15] mb-8">
                                {post.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-y-4 gap-x-6 text-sm text-gray-600 font-medium">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>{post.date_text}</span>
                                </div>
                                <div className="w-px h-4 bg-gray-200 hidden sm:block" />
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary" />
                                    <span>{post.read_time}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-7xl pt-16 pb-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                        {/* Main Content */}
                        <main className="lg:col-span-8 space-y-12">
                            {/* Introduction */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="bg-gradient-to-r from-primary/5 to-transparent p-6 md:p-8 rounded-2xl border-l-4 border-primary"
                            >
                                <p className="text-lg md:text-xl leading-relaxed text-gray-700 italic">
                                    {post.short_description}
                                </p>
                            </motion.div>

                            {/* Overview Section */}
                            <AnimatedContentSection id="overview">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-10 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                                    Introduction
                                </h2>
                                <div className="space-y-6">
                                    <p className="text-gray-600 leading-relaxed">
                                        Stay updated with our comprehensive analysis of the latest industry shifts. This article provides a deep dive into {post.title.toLowerCase()}, mapping its trajectory and impact.
                                    </p>
                                </div>
                            </AnimatedContentSection>

                            {/* Provisions Section (Mapped to Long Description) */}
                            <AnimatedContentSection id="provisions">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-10 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                                    Detailed Analysis
                                </h2>
                                <div
                                    className="prose prose-slate max-w-none text-gray-600 leading-relaxed space-y-4 prose-headings:text-gray-900 prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-li:marker:text-primary"
                                    dangerouslySetInnerHTML={{ __html: post.long_description }}
                                />
                            </AnimatedContentSection>

                            {/* Penalties Section (Mapped to Final Thoughts) */}
                            <AnimatedContentSection id="penalties">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <div className="w-10 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                                    Closing Remarks
                                </h2>
                                <div
                                    className="prose prose-slate max-w-none text-gray-700 leading-relaxed font-medium prose-p:text-lg prose-headings:text-gray-900 prose-a:text-primary prose-strong:text-gray-900"
                                    dangerouslySetInnerHTML={{ __html: post.final_thoughts }}
                                />
                            </AnimatedContentSection>

                            {/* Attachments */}
                            {post.attachments && post.attachments.length > 0 && (
                                <div className="pt-12 border-t border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2 uppercase tracking-tight">
                                        <Bookmark className="w-5 h-5 text-primary" />
                                        Resource Catalog
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {post.attachments.map((attachment: any, idx: number) => (
                                            <a
                                                key={idx}
                                                href={attachment.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-lg border border-transparent hover:border-primary/20 transition-all duration-300 group"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <span className="text-sm font-bold text-gray-700 truncate max-w-[150px]">{attachment.name}</span>
                                                </div>
                                                <Download className="w-4 h-4 text-gray-400 group-hover:text-primary" />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </main>

                        {/* Sticky Sidebar */}
                        <aside className="hidden lg:block lg:col-span-4">
                            <div className="sticky top-32 space-y-6">
                                {/* Banner Preview */}
                                {post.banner_image && (
                                    <div className="rounded-3xl overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/50 aspect-video mb-6 group">
                                        <img src={post.banner_image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Article Visual" />
                                    </div>
                                )}

                                {/* Jump Links */}
                                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                                    <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                                        <ChevronRight className="w-4 h-4 text-primary" />
                                        Editorial Navigation
                                    </h4>
                                    <nav className="space-y-1">
                                        {SECTIONS.map((section) => (
                                            <button
                                                key={section.id}
                                                onClick={() => scrollToSection(section.id)}
                                                className={`block w-full text-left px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200
                                                    ${activeSection === section.id
                                                        ? 'bg-primary/10 text-primary border-l-2 border-primary'
                                                        : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                                                    }`}
                                            >
                                                {section.title}
                                            </button>
                                        ))}
                                    </nav>
                                    <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center">
                                        <button
                                            onClick={handleShare}
                                            className="group flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-200"
                                            title="Share this article"
                                        >
                                            {copied ? (
                                                <>
                                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                    <span className="text-sm font-medium text-green-600">Copied!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm font-medium">Share</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </aside>
                    </div>

                    {/* CTA Section */}
                    <section className="mt-20 py-16 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-primary/10 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
                        <div className="container mx-auto px-4 relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-display">
                                    Ready to Experience Effortless Compliance?
                                </h2>
                                <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                                    Join hundreds of businesses that trust TrusComp for their labor law compliance and audit needs.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        to="/contact"
                                        className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:bg-primary/90 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                                    >
                                        Book Free Consultation
                                        <ChevronRight className="w-4 h-4" />
                                    </Link>
                                    <Link
                                        to="/services"
                                        className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl border-2 border-gray-100 hover:border-primary/20 hover:bg-gray-50 transition-all duration-300"
                                    >
                                        Explore Services
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
};

export default BlogDetail;
