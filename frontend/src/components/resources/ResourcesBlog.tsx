import { useState, useEffect } from "react";
import { ArrowRight, Clock, Sparkles, TrendingUp, BookOpen, RotateCw } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ResourcesBlog = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const apiBase = import.meta.env.VITE_API_BASE_URL || "";
                const response = await fetch(`${apiBase}/api/v1/blogs`);
                if (response.ok) {
                    const data = await response.json();
                    // Sort by published_date descending (Newest First)
                    const sortedData = data.sort((a: any, b: any) =>
                        new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
                    );
                    setBlogs(sortedData);
                }
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div className="py-20 flex items-center justify-center gap-3 text-gray-400 font-medium">
                <RotateCw className="w-5 h-5 animate-spin text-primary" />
                Loading latest insights...
            </div>
        );
    }

    if (blogs.length === 0) return null;

    const featuredPost = blogs[0];
    const secondaryPosts = blogs.slice(1);

    return (
        <section className="relative">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-12">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                        <Sparkles className="w-3.5 h-3.5" />
                        Knowledge Hub
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Latest Updates & Articles
                    </h2>
                    <p className="text-gray-600 mt-3 max-w-xl">
                        Stay informed with the latest trends in labour law compliance and HR technology.
                    </p>
                </div>
            </div>

            {/* Magazine Layout */}
            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

                {/* Featured Article - Hero Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="lg:col-span-3 relative group"
                >
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 md:p-10 min-h-[400px] flex flex-col justify-end">
                        {/* Banner Image Background */}
                        {featuredPost.banner_image && (
                            <div className="absolute inset-0 z-0">
                                <img src={featuredPost.banner_image} alt="" className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                            </div>
                        )}

                        {/* Animated Background Elements */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-float" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/15 rounded-full blur-3xl animate-float-delayed" />
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
                        </div>

                        {/* Decorative Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-80" />

                        {/* Content */}
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wide">
                                    Featured
                                </span>
                                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs font-medium uppercase">
                                    {featuredPost.category}
                                </span>
                            </div>

                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight group-hover:text-primary transition-colors duration-300">
                                {featuredPost.title}
                            </h3>

                            <p className="text-white/70 text-base md:text-lg mb-6 max-w-2xl leading-relaxed line-clamp-2">
                                {featuredPost.short_description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6">
                                <Link
                                    to={`/blog/${featuredPost.slug || featuredPost.id}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-primary hover:text-white transition-all duration-300 group/btn"
                                >
                                    Read Full Article
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                                <div className="flex items-center gap-4 text-white/50 text-sm font-medium">
                                    <span>{featuredPost.date_text}</span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3.5 h-3.5" />
                                        {featuredPost.read_time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Secondary Articles - Timeline Style with Scrollable Container */}
                <div className="lg:col-span-2">
                    <div className="relative max-h-[420px] overflow-y-auto pr-2 scrollbar-thin">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-primary/50 via-accent/30 to-transparent hidden md:block" />

                        {secondaryPosts.map((post: any, index: number) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <Link
                                    to={`/blog/${post.slug || post.id}`}
                                    className="group block relative pl-0 md:pl-8 py-6 border-b border-gray-100 last:border-b-0 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent transition-all duration-300"
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute left-0 top-8 w-2.5 h-2.5 rounded-full bg-primary/60 group-hover:bg-primary group-hover:scale-125 transition-all duration-300 hidden md:block" />

                                    {/* Article Content */}
                                    <div className="flex items-start gap-4">
                                        {/* Icon */}
                                        <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary overflow-hidden border border-slate-100`}>
                                            {post.banner_image ? (
                                                <img src={post.banner_image} className="w-full h-full object-cover" />
                                            ) : (
                                                <BookOpen className="w-5 h-5" />
                                            )}
                                        </div>

                                        {/* Text */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">
                                                    {post.category}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{post.date_text}</span>
                                            </div>
                                            <h4 className="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                                                {post.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                                                {post.short_description}
                                            </p>
                                            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-400 group-hover:text-primary transition-colors uppercase tracking-wider">
                                                Discover
                                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ResourcesBlog;
