import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Play, Calendar, FileText, CheckCircle2, User, ChevronRight, ArrowRight } from "lucide-react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useState, useEffect } from "react";

import { useSEO } from "@/hooks/useSEO";

interface LabourLawUpdate {
    id: number;
    title: string;
    description: string;
    release_date: string;
    end_date: string | null;
    speaker_name: string | null;
    speaker_role: string | null;
    speaker_org: string | null;
    speaker_image: string | null;
    documents: Array<{ title: string; description: string; url: string }>;
    videos: Array<{ title: string; url: string }>;
}

const MonthlyLabourLawDetail = () => {
    const { id } = useParams();
    // Extract numeric ID from the labour-{id} format or use as is
    const numericId = id?.startsWith('labour-') ? id.replace('labour-', '') : id;

    useSEO("labour_law_update", numericId);

    const navigate = useNavigate();
    const [resource, setResource] = useState<LabourLawUpdate | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUpdate = async () => {
            try {
                const apiBase = import.meta.env.VITE_API_BASE_URL || "";
                const response = await fetch(`${apiBase}/labour-law-updates/${numericId}`);
                if (response.ok) {
                    const data = await response.json();
                    // Parse JSONB fields
                    const parsedData = {
                        ...data,
                        documents: typeof data.documents === 'string' ? JSON.parse(data.documents) : data.documents || [],
                        videos: typeof data.videos === 'string' ? JSON.parse(data.videos) : data.videos || []
                    };
                    setResource(parsedData);
                }
            } catch (err) {
                console.error("Failed to fetch labour law update:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUpdate();
    }, [id]);

    // Format date to DD-MM-YYYY
    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "N/A";
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Extract YouTube video ID from URL
    const getYouTubeId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // Graceful fallback
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-gray-400 font-medium mt-4">Loading...</p>
            </div>
        );
    }

    if (!resource) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold text-gray-900">Resource Not Found</h2>
                <button onClick={() => navigate("/resources")} className="mt-4 text-[#FF8C00] hover:underline">
                    Back to Resources
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <main className="flex-grow pt-0 lg:pt-0">
                {/* 1. Dark Premium Hero Banner */}
                <div className="relative overflow-hidden bg-slate-900 py-12 md:py-20 border-b border-white/10">
                    {/* Abstract Dark Background Animation */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-[-50%] left-[-20%] w-[80vw] h-[80vw] bg-[#FF8C00]/10 rounded-full blur-[100px] animate-pulse-slow" />
                        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-[#FF8C00]/5 rounded-full blur-[80px]" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/90 to-slate-800/80 z-10" />
                        {/* Noise Texture */}
                        <div className="absolute inset-0 z-20 opacity-[0.03] pointer-events-none mix-blend-overlay"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
                            }}
                        />
                    </div>

                    <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <button
                            onClick={() => navigate("/resources")}
                            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#FF8C00] transition-colors mb-8"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Resources
                        </button>

                        <div className="grid lg:grid-cols-12 gap-12 items-center">
                            {/* Left Content: Title & Speaker */}
                            <div className="lg:col-span-8 space-y-8">
                                <div>
                                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-[#FF8C00] text-xs font-semibold uppercase tracking-wider rounded-full border border-white/10 mb-4">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(resource.release_date)}
                                    </span>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
                                    >
                                        {resource.title}
                                    </motion.h1>
                                    <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
                                        {resource.description} Ensure your organization remains compliant with the latest legislative changes.
                                    </p>
                                </div>

                                {/* Speaker Card */}
                                {resource.speaker_name && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm max-w-2xl"
                                    >
                                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF8C00] to-orange-600 p-[2px] flex-shrink-0 shadow-lg shadow-orange-900/20">
                                            {resource.speaker_image ? (
                                                <img src={resource.speaker_image} alt={resource.speaker_name || "Speaker"} className="w-full h-full rounded-full object-cover border-2 border-slate-900" />
                                            ) : (
                                                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-900">
                                                    <User className="w-10 h-10 text-orange-200" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-center sm:text-left">
                                            <h3 className="text-xl font-bold text-white mb-1">{resource.speaker_name}</h3>
                                            <p className="text-[#FF8C00] font-medium text-sm mb-1">{resource.speaker_role}</p>
                                            <p className="text-gray-400 text-sm">{resource.speaker_org}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Right Content: CTA conversion focus */}
                            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="relative group"
                                >
                                    <div className="absolute -inset-1 bg-[#FF8C00] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
                                    <button
                                        onClick={() => { }}
                                        className="relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-5 bg-[#FF8C00] text-white text-lg font-bold rounded-xl shadow-xl shadow-orange-900/40 hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                    >
                                        Register Now
                                        <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                                    </button>
                                </motion.div>
                                <p className="mt-4 text-sm text-gray-400 text-center lg:text-right">
                                    Limited seats available for the live session.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Enhanced Resource Materials Section */}
                <section className="relative py-20 bg-gray-50 overflow-hidden">
                    {/* Subtle animated background */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-orange-100/50 rounded-full blur-[80px]"
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 10, repeat: Infinity }}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,140,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,140,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="mb-10 border-l-4 border-[#FF8C00] pl-6">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Resource Materials</h2>
                            <p className="text-gray-600">Download curated compliance documents and reference materials</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {resource.documents && resource.documents.length > 0 ? (
                                resource.documents.map((doc, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ y: -8, boxShadow: "0 20px 40px -10px rgba(255, 140, 0, 0.15)" }}
                                        className="group bg-white p-6 rounded-2xl border border-gray-100 hover:border-orange-200 transition-all duration-300 relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <FileText className="w-24 h-24 text-[#FF8C00] -rotate-12 transform translate-x-4 -translate-y-4" />
                                        </div>
                                        <div className="flex justify-between items-start mb-6 relative">
                                            <div className="p-3 bg-orange-50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                                <FileText className="w-6 h-6 text-[#FF8C00]" />
                                            </div>
                                            <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase border border-gray-100 px-2 py-1 rounded-md bg-white">PDF</span>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-[#FF8C00] transition-colors relative">
                                            {doc.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-6 relative">{doc.description}</p>
                                        <button
                                            onClick={() => window.open(doc.url, '_blank')}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 border border-transparent rounded-xl text-sm font-semibold text-gray-700 group-hover:bg-[#FF8C00] group-hover:text-white transition-all relative overflow-hidden"
                                        >
                                            <span className="relative z-10 flex items-center gap-2">Download Now <Download className="w-4 h-4" /></span>
                                        </button>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-12 text-gray-400">
                                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p>No documents available for this update.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* 3. Enhanced Expert Insights Section */}
                <section className="relative py-20 bg-gray-900 overflow-hidden text-white">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
                    <motion.div
                        className="absolute inset-0 opacity-20"
                        animate={{
                            backgroundPosition: ["0% 0%", "100% 100%"]
                        }}
                        style={{
                            backgroundImage: "radial-gradient(circle at center, #FF8C00 1px, transparent 1px)",
                            backgroundSize: "40px 40px"
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="border-l-4 border-[#FF8C00] pl-6">
                                <h2 className="text-3xl font-bold text-white mb-2">Expert Insights</h2>
                                <p className="text-gray-400">Learn directly from industry experts and compliance leaders</p>
                            </div>
                            {/* <button className="text-[#FF8C00] font-semibold flex items-center gap-2 hover:translate-x-1 transition-transform">
                            View All Videos <ArrowRight className="w-4 h-4" />
                        </button> */}
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {resource.videos && resource.videos.length > 0 ? (
                                resource.videos.map((video, i) => {
                                    const videoId = getYouTubeId(video.url);
                                    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;

                                    return (
                                        <motion.div
                                            key={`vid-${i}`}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            whileHover={{ y: -5 }}
                                            onClick={() => window.open(video.url, '_blank')}
                                            className="group cursor-pointer bg-gray-800/50 rounded-2xl p-3 border border-gray-700/50 hover:border-[#FF8C00]/50 transition-all duration-300"
                                        >
                                            <div className="relative overflow-hidden rounded-xl aspect-video bg-gray-800 mb-4 shadow-lg">
                                                {/* YouTube Thumbnail */}
                                                {thumbnailUrl && (
                                                    <img
                                                        src={thumbnailUrl}
                                                        alt={video.title}
                                                        className="absolute inset-0 w-full h-full object-cover"
                                                        onError={(e) => {
                                                            // Fallback to default thumbnail if maxresdefault fails
                                                            e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                                                        }}
                                                    />
                                                )}
                                                {/* Play icon overlay */}
                                                <div className="absolute inset-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-500 z-10">
                                                    <div className="w-16 h-16 bg-[#FF8C00]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,140,0,0.4)] group-hover:shadow-[0_0_30px_rgba(255,140,0,0.6)] transition-all">
                                                        <Play className="w-6 h-6 text-white ml-1 fill-white" />
                                                    </div>
                                                </div>
                                                {/* Gradient overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60" />
                                            </div>
                                            <div className="px-2 pb-2">
                                                <h3 className="text-lg font-bold text-white group-hover:text-[#FF8C00] transition-colors leading-snug mb-2">
                                                    {video.title}
                                                </h3>
                                                <p className="text-sm text-gray-400 line-clamp-2">
                                                    Click to watch on YouTube
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full text-center py-12 text-gray-400">
                                    <Play className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p>No videos available for this update.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* 4. Meaningful Conversion CTA Section */}
                <section className="relative py-24 bg-gray-900 border-t border-gray-800 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/10 via-gray-900 to-gray-900" />
                        <motion.div
                            className="absolute inset-0 opacity-30"
                            animate={{
                                backgroundPosition: ["0% 0%", "100% 100%"]
                            }}
                            style={{
                                backgroundImage: "radial-gradient(circle at center, #FF8C00 1px, transparent 1px)",
                                backgroundSize: "60px 60px"
                            }}
                        />
                    </div>

                    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight"
                        >
                            Start Your Journey
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <p className="text-xl text-[#FF8C00] font-semibold mb-3">Ready to Simplify Your Compliance?</p>
                            <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
                                Schedule a free consultation with our compliance experts and discover how we can help protect your business from regulatory risks.
                            </p>
                        </motion.div>

                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Link to="/contact" className="w-full sm:w-auto px-8 py-4 bg-[#FF8C00] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(255,140,0,0.3)] hover:bg-orange-600 hover:shadow-[0_0_30px_rgba(255,140,0,0.5)] hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                                Book Free Consultation
                                <ChevronRight className="w-5 h-5 stroke-[3]" />
                            </Link>
                            <Link to="/services" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-gray-600 text-white font-semibold rounded-xl hover:bg-white hover:text-gray-900 hover:border-white transition-all duration-300 text-center">
                                Explore Services
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div >
    );
};

export default MonthlyLabourLawDetail;
