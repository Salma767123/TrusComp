import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Play, Calendar, FileText, CheckCircle2, User, ChevronRight, ArrowRight, Sparkles, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
    webinar_link: string | null;
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
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        if (resource?.webinar_link) {
            navigator.clipboard.writeText(resource.webinar_link);
            setCopied(true);
            toast.success("Link copied successfully!");
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const isRegistrationExpired = resource?.end_date
        ? new Date(new Date().setHours(0, 0, 0, 0)) > new Date(new Date(resource.end_date).setHours(0, 0, 0, 0))
        : false;

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

                            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
                                {resource.webinar_link && (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="relative group w-full sm:w-auto"
                                        >
                                            {!isRegistrationExpired && (
                                                <div className="absolute -inset-1 bg-[#FF8C00] rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
                                            )}

                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <button
                                                            onClick={() => !isRegistrationExpired && setIsRegisterModalOpen(true)}
                                                            disabled={isRegistrationExpired}
                                                            className={cn(
                                                                "relative flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-5 text-white text-lg font-bold rounded-xl transition-all shadow-xl",
                                                                isRegistrationExpired
                                                                    ? "bg-gray-500 cursor-not-allowed shadow-none"
                                                                    : "bg-[#FF8C00] shadow-orange-900/40 hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98]"
                                                            )}
                                                        >
                                                            Register Now
                                                            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                                                        </button>
                                                    </TooltipTrigger>
                                                    {isRegistrationExpired && (
                                                        <TooltipContent className="bg-slate-900 border-white/10 text-white px-4 py-2 font-bold">
                                                            <p>Registration Closed</p>
                                                        </TooltipContent>
                                                    )}
                                                </Tooltip>
                                            </TooltipProvider>
                                        </motion.div>
                                        <p className="mt-4 text-sm text-gray-400 text-center lg:text-right">
                                            {isRegistrationExpired
                                                ? "Registration for this session has ended."
                                                : "Limited seats available for the live session."}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Enhanced Resource Materials Section - Redesigned List UI */}
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

                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="mb-10 border-l-4 border-[#FF8C00] pl-6">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Resource Materials</h2>
                            <p className="text-gray-600">Download curated compliance documents and reference materials</p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {resource.documents && resource.documents.length > 0 ? (
                                resource.documents.map((doc, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                                        className="group relative flex flex-col md:flex-row items-start md:items-center gap-6 p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm hover:shadow-md hover:border-orange-200/50 transition-all duration-300"
                                    >
                                        {/* Icon Container */}
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                <FileText className="w-6 h-6 text-[#FF8C00]" />
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="flex-grow min-w-0 space-y-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#FF8C00] transition-colors line-clamp-1">
                                                    {doc.title}
                                                </h3>
                                                <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-500 border border-gray-200">
                                                    PDF
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-1 leading-relaxed">
                                                {doc.description}
                                            </p>
                                        </div>

                                        {/* Action Area */}
                                        <div className="flex-shrink-0 w-full md:w-auto mt-2 md:mt-0">
                                            <button
                                                onClick={() => window.open(doc.url, '_blank')}
                                                className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-[#FF8C00] hover:text-white hover:border-[#FF8C00] transition-all group-active:scale-[0.98]"
                                            >
                                                <span>Download</span>
                                                <Download className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-16 bg-white/40 rounded-3xl border border-dashed border-gray-200">
                                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                                    <p className="text-gray-400 font-medium">No documents available at the moment.</p>
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
                        </div >
                    </div >
                </section >

                {/* 4. Meaningful Conversion CTA Section */}
                < section className="relative py-24 bg-gray-900 border-t border-gray-800 overflow-hidden" >
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
                </section >
            </main >
            <Footer />

            {/* Registration Modal */}
            <Dialog open={isRegisterModalOpen} onOpenChange={setIsRegisterModalOpen}>
                <DialogContent className="sm:max-w-md bg-slate-900 border-white/10 text-white rounded-2xl overflow-hidden shadow-2xl">
                    <DialogHeader className="pt-8 px-6 pb-2">
                        <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#FF8C00]/20 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-[#FF8C00]" />
                            </div>
                            Webinar Registration
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 text-base mt-2">
                            Secure your spot for the <span className="text-white font-semibold">"{resource.title}"</span> session.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-6 space-y-6">
                        <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-[#FF8C00] rounded-full animate-pulse" />
                                <span className="text-sm font-medium text-gray-300 uppercase tracking-widest">Live Interactive Session</span>
                            </div>
                            <p className="text-sm text-gray-400 leading-relaxed">
                                Join our experts for an in-depth discussion on the latest labour law updates and compliance strategies.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            {resource.webinar_link && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Webinar URL</label>
                                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1.5 focus-within:border-[#FF8C00]/50 transition-colors group/input">
                                        <div className="flex-1 px-3 py-2 text-sm text-gray-300 truncate font-mono">
                                            {resource.webinar_link}
                                        </div>
                                        <button
                                            onClick={handleCopyLink}
                                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-[#FF8C00] transition-all active:scale-95"
                                            title="Copy link"
                                        >
                                            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <button
                                onClick={() => {
                                    window.open(resource.webinar_link || '', '_blank');
                                    setIsRegisterModalOpen(false);
                                }}
                                className="w-full py-4 bg-[#FF8C00] text-white font-bold rounded-xl shadow-lg shadow-orange-900/20 hover:bg-orange-600 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
                            >
                                {resource.webinar_link?.includes('zoom') || resource.webinar_link?.includes('meet.google')
                                    ? "Open Meeting Link"
                                    : "Complete Registration"}
                                <ArrowRight className="w-5 h-5" />
                            </button>
                            <p className="text-center text-[11px] text-gray-500 italic">
                                Clicking will open the registration page in a new tab safely.
                            </p>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default MonthlyLabourLawDetail;
