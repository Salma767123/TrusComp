import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Plus,
    Search,
    Edit,
    Trash2,
    Save,
    MapPin,
    ChevronRight,
    CheckCircle2,
    Eye,
    AlertCircle,
    X,
    Filter,
    ArrowUpRight,
    ExternalLink,
    Clock,
    Flag,
    Shield,
    History,
    MoreHorizontal,
    CheckCircle,
    RefreshCw as RefreshCwIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import SplitView from "@/components/admin/SplitView";

interface Holiday {
    id: number;
    holiday_name: string;
    holiday_date: string;
    state_code: string;
    holiday_type: string;
    day_name?: string;
}

const HolidayManager = () => {
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [stateFilter, setStateFilter] = useState("all");
    const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchHolidays();
    }, []);

    const fetchHolidays = async () => {
        setLoading(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/holidays`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setHolidays(data);
                if (data.length > 0 && !selectedHoliday) {
                    setSelectedHoliday(data[0]);
                }
            }
        } catch (err) {
            toast.error("Failed to access holiday vault");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!selectedHoliday) return;
        setIsSaving(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/holidays/upsert`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedHoliday),
                credentials: 'include'
            });
            if (response.ok) {
                toast.success("Calendar entry committed");
                fetchHolidays();
            } else {
                toast.error("Failed to sync record");
            }
        } catch (err) {
            toast.error("Synchronization protocol failure");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Expunge this event from the master calendar?")) return;
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/holidays/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                toast.success("Event retracted");
                fetchHolidays();
                setSelectedHoliday(null);
            }
        } catch (err) {
            toast.error("Retraction failed");
        }
    };

    const filteredHolidays = holidays.filter(h => {
        const matchesSearch = h.holiday_name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesState = stateFilter === "all" || h.state_code === stateFilter;
        return matchesSearch && matchesState;
    });

    const states = ["all", ...Array.from(new Set(holidays.map(h => h.state_code)))];

    const ListPanel = (
        <div className="flex flex-col h-full bg-slate-50/10 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
                <div>
                    <h2 className="font-bold text-slate-900 leading-none">Chronos Ledger</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{holidays.length} Registered Events</p>
                </div>
                <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full w-8 h-8 border-slate-200"
                    onClick={() => setSelectedHoliday({
                        id: 0,
                        holiday_name: "",
                        holiday_date: new Date().toISOString().split('T')[0],
                        state_code: "National",
                        holiday_type: "Statutory",
                        day_name: new Date().toLocaleDateString('en-IN', { weekday: 'long' })
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
                                "px-3 py-1 text-[9px] font-bold uppercase rounded-full whitespace-nowrap transition-all border shrink-0",
                                stateFilter === s
                                    ? "bg-primary text-white border-primary shadow-sm"
                                    : "bg-white text-slate-400 border-slate-200 hover:border-slate-300"
                            )}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                {filteredHolidays.length > 0 ? (
                    filteredHolidays.map(holiday => (
                        <div
                            key={holiday.id}
                            onClick={() => setSelectedHoliday(holiday)}
                            className={cn(
                                "p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all duration-200 border-l-2",
                                selectedHoliday?.id === holiday.id
                                    ? "bg-white border-primary shadow-sm border-y border-r border-slate-100"
                                    : "hover:bg-slate-50 border-transparent text-slate-500"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-colors",
                                selectedHoliday?.id === holiday.id ? "bg-primary border-primary text-white" : "bg-white border-slate-100 text-slate-300"
                            )}>
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className={cn(
                                    "font-bold text-xs truncate leading-tight",
                                    selectedHoliday?.id === holiday.id ? "text-slate-900" : "text-slate-600"
                                )}>{holiday.holiday_name}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{new Date(holiday.holiday_date).toLocaleDateString([], { month: 'short', day: 'numeric' })}</span>
                                    <span className="w-0.5 h-0.5 rounded-full bg-slate-200" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-primary/60">{holiday.state_code}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center text-slate-300">
                        <History className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p className="text-xs font-bold uppercase tracking-widest">Temporal Void</p>
                    </div>
                )}
            </div>
        </div>
    );

    const ContentPanel = (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            {!selectedHoliday ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-200 scale-90">
                    <Clock className="w-20 h-20 opacity-5" />
                    <p className="text-sm font-bold uppercase tracking-widest">Select event to modify timeline</p>
                </div>
            ) : (
                <>
                    <div className="h-16 flex items-center justify-between px-8 border-b border-slate-100 shrink-0 bg-white">
                        <div className="flex items-center gap-4">
                            <Badge variant="outline" className="bg-slate-900 text-white border-slate-900 uppercase text-[9px] font-bold tracking-widest px-2 py-0.5">Statutory Ledger</Badge>
                            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Calendar Management Protocol</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                className="h-9 px-3 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold text-[10px] uppercase tracking-widest"
                                onClick={() => handleDelete(selectedHoliday.id)}
                            >
                                Retract
                            </Button>
                            <Button
                                size="sm"
                                className="h-9 gap-2 px-6 shadow-xl shadow-primary/10"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {selectedHoliday.id === 0 ? "Commit Event" : "Sync Ledger"}
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/10">
                        <div className="mx-auto max-w-2xl p-8 py-20">
                            <section className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-2xl space-y-10 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-all group-hover:bg-primary/10" />

                                <div className="relative z-10 space-y-8">
                                    <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-200">
                                            <Flag className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 tracking-tight">{selectedHoliday.id === 0 ? 'Establish New Event' : 'Refine Event Profile'}</h3>
                                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Registry Details</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Event Designation</label>
                                            <Input
                                                value={selectedHoliday.holiday_name}
                                                onChange={(e) => setSelectedHoliday({ ...selectedHoliday, holiday_name: e.target.value })}
                                                className="h-14 text-lg font-bold border-slate-200 focus:bg-slate-50 focus:ring-primary/5 transition-all"
                                                placeholder="e.g. Independence Day"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Target Geography</label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                    <Input
                                                        value={selectedHoliday.state_code}
                                                        onChange={(e) => setSelectedHoliday({ ...selectedHoliday, state_code: e.target.value })}
                                                        className="h-12 pl-10 text-sm font-bold border-slate-200 focus:bg-slate-50 transition-all font-display"
                                                        placeholder="Tamil Nadu"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Registry Date</label>
                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                                    <Input
                                                        type="date"
                                                        value={selectedHoliday.holiday_date.split('T')[0]}
                                                        onChange={(e) => {
                                                            const newDate = e.target.value;
                                                            setSelectedHoliday({
                                                                ...selectedHoliday,
                                                                holiday_date: newDate,
                                                                day_name: new Date(newDate).toLocaleDateString('en-IN', { weekday: 'long' })
                                                            });
                                                        }}
                                                        className="h-12 pl-10 text-sm font-bold border-slate-200 focus:bg-slate-50 transition-all"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Event Classification</label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {['Statutory', 'National', 'State Specific', 'Restricted'].map(type => (
                                                    <button
                                                        key={type}
                                                        onClick={() => setSelectedHoliday({ ...selectedHoliday, holiday_type: type })}
                                                        className={cn(
                                                            "h-12 border rounded-xl flex items-center px-4 gap-3 transition-all duration-300",
                                                            selectedHoliday.holiday_type === type
                                                                ? "bg-primary/5 border-primary text-primary shadow-sm"
                                                                : "bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50"
                                                        )}
                                                    >
                                                        <div className={cn(
                                                            "w-2 h-2 rounded-full transition-colors",
                                                            selectedHoliday.holiday_type === type ? "bg-primary" : "bg-slate-200"
                                                        )} />
                                                        <span className="text-xs font-bold uppercase tracking-wider">{type}</span>
                                                        {selectedHoliday.holiday_type === type && <CheckCircle className="w-4 h-4 ml-auto" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Shield className="w-4 h-4 text-primary opacity-40" />
                                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none">Global Compliance Integrity Verified</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Entry ID: {selectedHoliday.id || 'Pending'}</div>
                                    </div>
                                </div>
                            </section>

                            <div className="mt-8 bg-blue-50/50 border border-blue-100 rounded-3xl p-6 flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                                    <AlertCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-blue-900 uppercase tracking-wider">State Compliance Note</h4>
                                    <p className="text-xs text-blue-700 mt-1 leading-relaxed">
                                        Statutory holidays are state-mandated. Changes to these records will reflect instantly across all client compliance dashboards for the selected geography.
                                    </p>
                                </div>
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
                    <p className="text-sm font-medium tracking-wide">Syncing Calendar Ledger...</p>
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

export default HolidayManager;
