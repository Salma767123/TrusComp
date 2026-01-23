import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Zap,
    Plus,
    Search,
    Edit,
    Trash2,
    Save,
    Globe,
    Layout,
    Settings,
    Clock,
    MapPin,
    ChevronRight,
    CheckCircle2,
    Eye,
    AlertCircle,
    X,
    Filter,
    ArrowUpRight,
    ExternalLink,
    FileText,
    Share2,
    Target,
    Activity,
    History,
    Calendar,
    MousePointer2,
    Video
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import SplitView from "@/components/admin/SplitView";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";

interface ComplianceUpdate {
    id: number;
    slug: string;
    title: string;
    summary: string;
    category: string;
    state: string;
    date_text: string;
    impact: string;
    action_required: string;
    overview_content: string;
    what_changed_content: string;
    who_it_impacts_content: string;
    what_you_should_do_content: string;
    status?: 'draft' | 'published';
}

const ComplianceManager = () => {
    const [updates, setUpdates] = useState<ComplianceUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [stateFilter, setStateFilter] = useState("all");
    const [selectedUpdate, setSelectedUpdate] = useState<ComplianceUpdate | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchUpdates();
    }, []);

    const fetchUpdates = async () => {
        setLoading(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/compliance`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setUpdates(data);
                if (data.length > 0 && !selectedUpdate) {
                    setSelectedUpdate(data[0]);
                }
            }
        } catch (err) {
            toast.error("Failed to fetch compliance updates");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!selectedUpdate) return;
        setIsSaving(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/compliance/upsert`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedUpdate),
                credentials: 'include'
            });
            if (response.ok) {
                toast.success("Broadcast synced successfully");
                fetchUpdates();
            } else {
                toast.error("Failed to publish update");
            }
        } catch (err) {
            toast.error("Server connection error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Remove this bulletin from the ledger?")) return;
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/compliance/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                toast.success("Update purged");
                fetchUpdates();
                setSelectedUpdate(null);
            }
        } catch (err) {
            toast.error("Deletion failed");
        }
    };

    const filteredUpdates = updates.filter(u => {
        const matchesSearch = u.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = stateFilter === "all" || u.category === stateFilter;
        return matchesSearch && matchesCategory;
    });

    const states = ["all", ...Array.from(new Set(updates.map(u => u.category)))];

    const ListPanel = (
        <div className="flex flex-col h-full bg-slate-50/30 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
                <div>
                    <h2 className="font-bold text-slate-900 leading-none">Bulletin Ledger</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{updates.length} Updates Clocked</p>
                </div>
                <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full w-8 h-8 border-slate-200"
                    onClick={() => setSelectedUpdate({
                        id: 0,
                        slug: "",
                        title: "",
                        summary: "",
                        category: "Legislative Update",
                        state: "National",
                        date_text: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
                        impact: "Medium",
                        action_required: "Review and implement changes as applicable.",
                        overview_content: "",
                        what_changed_content: "",
                        who_it_impacts_content: "",
                        what_you_should_do_content: "",
                        status: 'draft'
                    })}
                >
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            <div className="p-4 border-b border-slate-100 bg-white/80 backdrop-blur shrink-0 space-y-3">
                <div className="relative group/search">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/search:text-primary transition-colors" />
                    <Input
                        placeholder="Filter chronicles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 h-9 bg-slate-50 border-none rounded-lg text-sm focus:ring-primary/10"
                    />
                </div>
                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    {states.map(s => (
                        <button
                            key={s}
                            onClick={() => setStateFilter(s)}
                            className={cn(
                                "px-3 py-1 text-[9px] font-bold uppercase rounded-full whitespace-nowrap transition-all border",
                                stateFilter === s
                                    ? "bg-primary text-white border-primary"
                                    : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                {/* Timeline vertical bar */}
                <div className="absolute left-[31px] top-0 bottom-0 w-0.5 bg-slate-100 z-0" />

                {filteredUpdates.length > 0 ? (
                    <div className="relative z-10 px-4 py-6 space-y-8">
                        {filteredUpdates.map(update => (
                            <div
                                key={update.id}
                                onClick={() => setSelectedUpdate(update)}
                                className={cn(
                                    "flex gap-4 group cursor-pointer transition-all duration-300",
                                    selectedUpdate?.id === update.id ? "translate-x-1" : ""
                                )}
                            >
                                <div className={cn(
                                    "w-4 h-4 rounded-full mt-1 shrink-0 border-2 border-white shadow-sm transition-all duration-300",
                                    selectedUpdate?.id === update.id ? "bg-primary scale-125 ring-4 ring-primary/10" : "bg-slate-200"
                                )} />
                                <div className={cn(
                                    "flex-1 p-4 rounded-2xl border transition-all duration-300",
                                    selectedUpdate?.id === update.id
                                        ? "bg-white border-primary/20 shadow-lg shadow-primary/5"
                                        : "bg-white/50 border-slate-100 group-hover:border-slate-200"
                                )}>
                                    <div className="flex items-center justify-between gap-3">
                                        <Badge variant="outline" className="text-[8px] font-bold px-1.5 py-0 h-4 uppercase border-slate-200 text-slate-400">{update.category}</Badge>
                                        <span className="text-[10px] font-bold text-slate-300 uppercase">{update.date_text}</span>
                                    </div>
                                    <p className={cn(
                                        "font-bold text-sm mt-2 line-clamp-2",
                                        selectedUpdate?.id === update.id ? "text-slate-900" : "text-slate-600 group-hover:text-slate-900"
                                    )}>{update.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-12 text-center relative z-10">
                        <History className="w-12 h-12 text-slate-100 mx-auto mb-3" />
                        <p className="text-sm font-medium text-slate-300 tracking-wide">No broadcasts recorded</p>
                    </div>
                )}
            </div>
        </div>
    );

    const ContentPanel = (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            {!selectedUpdate ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-200 scale-90">
                    <Zap className="w-20 h-20 opacity-5" />
                    <p className="text-sm font-bold uppercase tracking-widest">Select update to draft broadcast</p>
                </div>
            ) : (
                <>
                    <div className="h-16 flex items-center justify-between px-8 border-b border-slate-100 shrink-0">
                        <div className="flex items-center gap-4">
                            <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 uppercase text-[9px] font-bold tracking-widest px-2 py-0.5">Live Dashboard</Badge>
                            <h2 className="text-base font-bold text-slate-900 truncate max-w-[400px]">
                                {selectedUpdate.id === 0 ? "New Bulletin Entry" : selectedUpdate.title}
                            </h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-slate-400 hover:text-red-500 font-bold text-[10px] uppercase tracking-widest h-9"
                                onClick={() => handleDelete(selectedUpdate.id)}
                            >
                                Purge Record
                            </Button>
                            <Button
                                size="sm"
                                className="gap-2 h-9 px-6 shadow-xl shadow-primary/10"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {selectedUpdate.id === 0 ? "Sync Bulletin" : "Update Broadcast"}
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/20">
                        <div className="mx-auto max-w-5xl p-8 space-y-10">
                            {/* Visual Strategy Section */}
                            <div className="grid grid-cols-5 gap-8">
                                <section className="col-span-3 space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
                                            <Activity className="w-4 h-4 text-primary" />
                                            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Core Information</h3>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Update Heading</label>
                                                    <Input
                                                        value={selectedUpdate.title}
                                                        onChange={(e) => setSelectedUpdate({ ...selectedUpdate, title: e.target.value })}
                                                        className="h-12 text-lg font-bold border-slate-100 focus:bg-slate-50 transition-all font-display"
                                                        placeholder="e.g. Maharashtra Minimum Wage Revision - 2024"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Slug Identifier</label>
                                                    <Input
                                                        value={selectedUpdate.slug}
                                                        onChange={(e) => setSelectedUpdate({ ...selectedUpdate, slug: e.target.value })}
                                                        className="h-10 text-xs font-bold bg-slate-50 border-none"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Target Geography</label>
                                                    <Input
                                                        value={selectedUpdate.state}
                                                        onChange={(e) => setSelectedUpdate({ ...selectedUpdate, state: e.target.value })}
                                                        className="h-10 text-xs font-bold"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Bulletin Category</label>
                                                    <select
                                                        value={selectedUpdate.category}
                                                        onChange={(e) => setSelectedUpdate({ ...selectedUpdate, category: e.target.value })}
                                                        className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-xs font-bold outline-none"
                                                    >
                                                        <option>Legislative Update</option>
                                                        <option>Case Law Insight</option>
                                                        <option>Gazette Notification</option>
                                                        <option>Industry Insight</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Summary (Short Excerpt)</label>
                                                    <Textarea
                                                        rows={3}
                                                        value={selectedUpdate.summary}
                                                        onChange={(e) => setSelectedUpdate({ ...selectedUpdate, summary: e.target.value })}
                                                        className="border-slate-100 bg-slate-50/50 min-h-[80px] text-sm leading-relaxed font-medium focus:bg-white resize-none"
                                                        placeholder="Brief overview for results listing..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 pb-2 border-b border-slate-50">
                                            <FileText className="w-4 h-4 text-primary" />
                                            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Chronicle content Blocks</h3>
                                        </div>

                                        <Tabs defaultValue="overview" className="w-full">
                                            <TabsList className="bg-slate-100/50 p-1 mb-6 rounded-xl border border-slate-100 w-full grid grid-cols-4 h-11">
                                                <TabsTrigger value="overview" className="text-[10px] font-bold uppercase tracking-widest rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Overview</TabsTrigger>
                                                <TabsTrigger value="changed" className="text-[10px] font-bold uppercase tracking-widest rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Changes</TabsTrigger>
                                                <TabsTrigger value="impacts" className="text-[10px] font-bold uppercase tracking-widest rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Impacts</TabsTrigger>
                                                <TabsTrigger value="actions" className="text-[10px] font-bold uppercase tracking-widest rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Next Steps</TabsTrigger>
                                            </TabsList>

                                            <TabsContent value="overview">
                                                <Textarea
                                                    rows={15}
                                                    value={selectedUpdate.overview_content}
                                                    onChange={(e) => setSelectedUpdate({ ...selectedUpdate, overview_content: e.target.value })}
                                                    className="border-slate-100 bg-slate-50/50 min-h-[300px] text-sm leading-relaxed font-medium focus:bg-white resize-none"
                                                    placeholder="What is this update about?"
                                                />
                                            </TabsContent>

                                            <TabsContent value="changed">
                                                <Textarea
                                                    rows={15}
                                                    value={selectedUpdate.what_changed_content}
                                                    onChange={(e) => setSelectedUpdate({ ...selectedUpdate, what_changed_content: e.target.value })}
                                                    className="border-slate-100 bg-slate-50/50 min-h-[300px] text-sm leading-relaxed font-medium focus:bg-white resize-none"
                                                    placeholder="Specific legislative or regulatory changes..."
                                                />
                                            </TabsContent>

                                            <TabsContent value="impacts">
                                                <Textarea
                                                    rows={15}
                                                    value={selectedUpdate.who_it_impacts_content}
                                                    onChange={(e) => setSelectedUpdate({ ...selectedUpdate, who_it_impacts_content: e.target.value })}
                                                    className="border-slate-100 bg-slate-50/50 min-h-[300px] text-sm leading-relaxed font-medium focus:bg-white resize-none"
                                                    placeholder="Which industries or roles are affected?"
                                                />
                                            </TabsContent>

                                            <TabsContent value="actions">
                                                <Textarea
                                                    rows={15}
                                                    value={selectedUpdate.what_you_should_do_content}
                                                    onChange={(e) => setSelectedUpdate({ ...selectedUpdate, what_you_should_do_content: e.target.value })}
                                                    className="border-slate-100 bg-slate-50/50 min-h-[300px] text-sm leading-relaxed font-medium focus:bg-white resize-none"
                                                    placeholder="Specific action items for employers..."
                                                />
                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                </section>

                                <section className="col-span-2 space-y-8">
                                    <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-2xl relative overflow-hidden group">
                                        <div className="relative z-10 space-y-6">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                                    <Target className="w-4 h-4 text-white" />
                                                </div>
                                                <h3 className="text-xs font-bold uppercase tracking-widest">Metadata Protocol</h3>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Date / Period</label>
                                                    <Input
                                                        value={selectedUpdate.date_text}
                                                        onChange={(e) => setSelectedUpdate({ ...selectedUpdate, date_text: e.target.value })}
                                                        className="bg-white/5 border-white/10 text-white text-xs leading-relaxed focus:bg-white/10 transition-all resize-none h-10"
                                                        placeholder="e.g. November 2024"
                                                    />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Update Significance</label>
                                                    <select
                                                        value={selectedUpdate.impact}
                                                        onChange={(e) => setSelectedUpdate({ ...selectedUpdate, impact: e.target.value })}
                                                        className="w-full h-10 px-3 bg-white/5 border border-white/10 rounded-lg text-xs font-bold outline-none text-white"
                                                    >
                                                        <option className="text-slate-900">High</option>
                                                        <option className="text-slate-900">Medium</option>
                                                        <option className="text-slate-900">Low</option>
                                                        <option className="text-slate-900">Critical</option>
                                                    </select>
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Immediate Action Level</label>
                                                    <Input
                                                        value={selectedUpdate.action_required}
                                                        onChange={(e) => setSelectedUpdate({ ...selectedUpdate, action_required: e.target.value })}
                                                        className="bg-white/5 border-white/10 text-white text-xs leading-relaxed focus:bg-white/10 transition-all h-10"
                                                        placeholder="Next steps..."
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                                    </div>

                                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Resource Attachment</h4>
                                            <Button size="sm" variant="ghost" className="h-6 text-[9px] font-bold uppercase tracking-widest text-primary gap-1">
                                                <Plus className="w-3 h-3" /> Connect Document
                                            </Button>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-4 group cursor-pointer hover:bg-slate-100 transition-all">
                                            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-slate-900 truncate">Official_Gazette_Maha_24.pdf</p>
                                                <p className="text-[9px] text-slate-400 font-bold uppercase">Gazette Attachment</p>
                                            </div>
                                            <ExternalLink className="w-3.5 h-3.5 text-slate-200 group-hover:text-slate-400" />
                                        </div>

                                        <div className="flex items-center justify-between pt-2">
                                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Video Overview</h4>
                                            <Button size="sm" variant="ghost" className="h-6 text-[9px] font-bold uppercase tracking-widest text-primary gap-1">
                                                <Plus className="w-3 h-3" /> Embed Link
                                            </Button>
                                        </div>
                                        <div className="aspect-video rounded-2xl bg-slate-100 flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-slate-200 transition-all overflow-hidden relative">
                                            <Video className="w-8 h-8 text-slate-300 group-hover:text-primary/50 transition-colors" />
                                            <span className="text-[10px] font-bold text-slate-400">Add Video Context</span>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );

    return (
        <div className="h-full bg-slate-50/20">
            {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 text-slate-400">
                    <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm font-medium tracking-wide">Syncing Law Bulletins...</p>
                </div>
            ) : (
                <SplitView
                    list={ListPanel}
                    content={ContentPanel}
                    listWidth="w-[320px]"
                />
            )}
        </div>
    );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

const RefreshCw = ({ className }: { className?: string }) => (
    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className={className}>
        <RefreshCwIcon className="w-4 h-4" />
    </motion.div>
);

const RefreshCwIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24" height="24"
        viewBox="0 0 24 24"
        fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 16h5v5" />
    </svg>
);

export default ComplianceManager;
