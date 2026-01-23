
import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
    ArrowRight,
    ChevronDown,
    FileDown,
    Clock,
    MapPin,
    CheckCircle2,
    AlertCircle,
    HelpCircle,
    Filter,
    Search,
    Scale,
    Shield,
    ScrollText,
    Calendar
} from "lucide-react";
import { actsData, formsData, gazetteData, lwfData, indianStates, holidaysData } from "@/data/resourcesData";
import { cn } from "@/lib/utils";

// --- SHARED COMPONENTS FOR LEGAL LIBRARY ---

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number, totalPages: number, onPageChange: (p: number) => void }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-10 py-10 bg-gray-50/50">
            <div className="flex items-center gap-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Page {currentPage} of {totalPages}</p>
            </div>
            <div className="flex items-center gap-1">
                {pages.map((p) => (
                    <button
                        key={p}
                        onClick={() => onPageChange(p)}
                        className={cn(
                            "w-10 h-10 rounded-xl text-xs font-black transition-all flex items-center justify-center",
                            currentPage === p
                                ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110"
                                : "text-gray-400 hover:text-gray-900 hover:bg-white"
                        )}
                    >
                        {p}
                    </button>
                ))}
            </div>
        </div>
    );
};

const LegalLibraryItem = ({
    title,
    description,
    icon: Icon,
    meta,
    downloadUrl,
    isLast
}: {
    title: string,
    description: string,
    icon: any,
    meta: { label: string, value: string, icon?: any }[],
    downloadUrl?: string,
    isLast?: boolean
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
                "group relative flex flex-col lg:flex-row items-start lg:items-center gap-8 p-10 transition-all duration-500 hover:bg-gray-50/50",
                !isLast && "border-b border-gray-100"
            )}
        >
            {/* Left Accent Indicator */}
            <div className="absolute left-0 top-0 bottom-0 w-0 bg-primary transition-all duration-500 group-hover:w-1" />

            <div className="flex-1 space-y-4">
                <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-primary transition-colors group-hover:bg-white border border-gray-100 shadow-sm group-hover:shadow-md">
                        {Icon ? <Icon className="w-6 h-6" /> : <Shield className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl md:text-2xl font-display font-black text-gray-900 group-hover:text-primary transition-colors tracking-tight mb-2">
                            {title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-500 font-light leading-relaxed line-clamp-2 max-w-4xl">
                            {description}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
                    {meta.map((m, i) => (
                        <div key={i} className="flex items-center gap-2">
                            {m.icon && <m.icon className="w-4 h-4 text-gray-300" />}
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{m.label}:</span>
                            <span className="text-xs font-bold text-gray-600">{m.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-end w-full lg:w-auto">
                <a
                    href={downloadUrl || "#"}
                    className="w-14 h-14 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-400 transition-all duration-300 hover:bg-primary hover:text-white hover:border-primary hover:scale-110 shadow-sm"
                    title="Download PDF"
                >
                    <FileDown className="w-5 h-5" />
                </a>
            </div>
        </motion.div>
    );
};

const SkeletonRow = () => (
    <div className="p-10 border-b border-gray-100 animate-pulse">
        <div className="flex gap-6 mb-6">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl" />
            <div className="flex-1 space-y-4">
                <div className="h-6 bg-gray-100 rounded w-1/3" />
                <div className="h-4 bg-gray-50 rounded w-2/3" />
            </div>
        </div>
        <div className="flex gap-4">
            <div className="h-3 bg-gray-50 rounded w-20" />
            <div className="h-3 bg-gray-50 rounded w-24" />
        </div>
    </div>
);

// --- ACTS VIEW ---
export const ActsView = () => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const itemsPerPage = 8;

    const filteredItems = actsData.filter(act =>
        act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handlePageChange = (p: number) => {
        setIsLoading(true);
        setPage(p);
        window.scrollTo({ top: 400, behavior: "smooth" });
        setTimeout(() => setIsLoading(false), 500);
    };

    const displayItems = filteredItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="p-10 md:p-14 border-b border-gray-50 bg-gray-50/20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-display font-black text-gray-900 tracking-tighter mb-2">Central & State Acts</h2>
                        <p className="text-sm font-bold text-primary uppercase tracking-[0.3em]">Compliance Directory 2026</p>
                    </div>
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search acts..."
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setPage(1);
                            }}
                            className="bg-white border border-gray-200 rounded-full py-3 pl-12 pr-6 text-sm font-bold text-gray-900 focus:outline-none focus:border-primary transition-all w-full md:w-64"
                        />
                    </div>
                </div>
            </div>

            <div className="divide-y divide-gray-100 min-h-[600px]">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {[...Array(itemsPerPage)].map((_, i) => <SkeletonRow key={i} />)}
                        </motion.div>
                    ) : (
                        <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {displayItems.length > 0 ? (
                                displayItems.map((act, i) => (
                                    <LegalLibraryItem
                                        key={act.id}
                                        title={act.title}
                                        description={act.shortDesc}
                                        icon={Shield}
                                        downloadUrl={act.downloadUrl}
                                        isLast={i === displayItems.length - 1}
                                        meta={[
                                            { label: "Jurisdiction", value: act.state || "Central", icon: MapPin },
                                            { label: "Released", value: act.released || "N/A", icon: Clock },
                                            { label: "Effective", value: act.effectiveDate || act.released || "N/A", icon: Scale }
                                        ]}
                                    />
                                ))
                            ) : (
                                <div className="py-20 text-center text-gray-400 font-light italic">
                                    No acts found matching your criteria.
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {totalPages > 1 && (
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            )}
        </div>
    );
};

// --- FORMS VIEW ---
export const FormsView = () => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const itemsPerPage = 8;
    const totalPages = Math.ceil(formsData.length / itemsPerPage);

    const handlePageChange = (p: number) => {
        setIsLoading(true);
        setPage(p);
        window.scrollTo({ top: 300, behavior: "smooth" });
        setTimeout(() => setIsLoading(false), 500);
    };

    const displayItems = formsData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="bg-white rounded-[40px] lg:rounded-[64px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 lg:p-14 border-b border-gray-50 bg-gray-50/30">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl lg:text-5xl font-display font-black text-gray-900 tracking-tighter">Compliance Forms</h2>
                    <div className="flex gap-2">
                        <button className="px-6 py-2 bg-white border border-gray-200 rounded-full text-xs font-black uppercase tracking-widest text-gray-500">All Forms</button>
                    </div>
                </div>
            </div>

            <div className="divide-y divide-gray-100">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {[...Array(itemsPerPage)].map((_, i) => <SkeletonRow key={i} />)}
                        </motion.div>
                    ) : (
                        <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {displayItems.map((form, i) => (
                                <LegalLibraryItem
                                    key={i}
                                    title={form.form}
                                    description={form.act}
                                    icon={FileDown}
                                    downloadUrl={form.downloadUrl}
                                    meta={[
                                        { label: "Code", value: form.formCode || "N/A" },
                                        { label: "State", value: form.state, icon: MapPin },
                                        { label: "Updated", value: form.updated, icon: Clock }
                                    ]}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

// --- GAZETTE VIEW ---
export const GazetteView = () => {
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(gazetteData.length / itemsPerPage);

    const handlePageChange = (p: number) => {
        setIsLoading(true);
        setPage(p);
        window.scrollTo({ top: 300, behavior: "smooth" });
        setTimeout(() => setIsLoading(false), 500);
    };

    const displayItems = gazetteData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="bg-white rounded-[40px] lg:rounded-[64px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 lg:p-14 border-b border-gray-50 bg-gray-50/30">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl lg:text-5xl font-display font-black text-gray-900 tracking-tighter">Gazette Notifications</h2>
                </div>
            </div>

            <div className="divide-y divide-gray-100 relative">
                {/* Timeline Visual Line */}
                <div className="absolute left-[39px] top-0 bottom-0 w-[2px] bg-gray-100 hidden md:block" />

                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {[...Array(itemsPerPage)].map((_, i) => <SkeletonRow key={i} />)}
                        </motion.div>
                    ) : (
                        <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {displayItems.map((item, i) => (
                                <LegalLibraryItem
                                    key={i}
                                    title={item.title}
                                    description={`Notification released for ${item.state} regarding latest compliance standards.`}
                                    icon={Clock}
                                    downloadUrl={item.downloadUrl || "#"}
                                    meta={[
                                        { label: "Released", value: item.released, icon: CheckCircle2 },
                                        { label: "Effective", value: item.effective, icon: AlertCircle },
                                        { label: "State", value: item.state, icon: MapPin }
                                    ]}
                                />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
};

// --- HOLIDAYS VIEW ---
const HolidayTimelineItem = ({ holiday, isLast }: { holiday: any, isLast: boolean }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
                "group relative flex flex-col md:flex-row items-center gap-6 p-8 transition-all duration-500 hover:bg-gray-50/50",
                !isLast && "border-b border-gray-100"
            )}
        >
            <div className="w-20 text-center md:text-left">
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{holiday.day}</p>
                <p className="text-xl font-black text-gray-900 group-hover:text-primary transition-colors">{holiday.date.split(',')[0] || holiday.date}</p>
            </div>

            <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                    <span className={cn(
                        "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider",
                        holiday.type === "Gazetted" ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"
                    )}>
                        {holiday.type}
                    </span>
                    <h4 className="text-lg font-display font-black text-gray-900 group-hover:text-primary transition-colors">{holiday.name}</h4>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <a
                    href={holiday.gazette_pdf_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary hover:scale-105 transition-transform hover:underline"
                >
                    <FileDown className="w-3 h-3" />
                    View Gazette
                </a>
            </div>
        </motion.div>
    );
};

export const HolidaysView = () => {
    const [selectedState, setSelectedState] = useState<string>("MH");
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const filteredStates = indianStates.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleStateChange = (id: string) => {
        setIsLoading(true);
        setSelectedState(id);
        setTimeout(() => setIsLoading(false), 400);
    };

    const currentHolidays = holidaysData[selectedState] || [];
    const stateName = indianStates.find(s => s.id === selectedState)?.name;

    return (
        <div className="bg-white rounded-[40px] border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
            {/* Left: Searchable State List */}
            <div className="w-full lg:w-80 border-r border-gray-100 flex flex-col bg-gray-50/20">
                <div className="p-8 border-b border-gray-100">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">India State Selector</p>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input
                            type="text"
                            placeholder="Find your state..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-gray-900 focus:outline-none focus:border-primary w-full shadow-sm"
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto no-scrollbar max-h-[600px] lg:max-h-none">
                    {filteredStates.map(s => (
                        <button
                            key={s.id}
                            onClick={() => handleStateChange(s.id)}
                            className={cn(
                                "w-full px-8 py-5 text-left text-xs font-black transition-all border-b border-gray-50 flex items-center justify-between group",
                                selectedState === s.id ? "bg-white text-primary border-l-4 border-l-primary" : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
                            )}
                        >
                            {s.name}
                            <ArrowRight className={cn("w-3 h-3 group-hover:translate-x-1 transition-transform", selectedState === s.id ? "opacity-100" : "opacity-0")} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Right: Dynamic Holiday Panel */}
            <div className="flex-1 flex flex-col min-w-0">
                <div className="p-10 md:p-14 border-b border-gray-50 bg-gray-50/10">
                    <div className="flex items-center justify-between gap-6">
                        <div className="min-w-0 flex-1">
                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2">{selectedState} Gazette</p>
                            <h2 className="text-3xl md:text-5xl font-display font-black text-gray-900 tracking-tighter truncate">{stateName}</h2>
                        </div>
                        <div className="w-16 h-16 bg-white rounded-2xl border border-gray-100 flex items-center justify-center shadow-sm flex-shrink-0">
                            <Calendar className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-gray-100">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-10 space-y-8">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="animate-pulse flex gap-6">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl" />
                                        <div className="flex-1 space-y-3">
                                            <div className="h-4 bg-gray-100 rounded w-1/4" />
                                            <div className="h-4 bg-gray-50 rounded w-3/4" />
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : currentHolidays.length > 0 ? (
                            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                {currentHolidays.map((h, i) => (
                                    <HolidayTimelineItem
                                        key={i}
                                        holiday={h}
                                        isLast={i === currentHolidays.length - 1}
                                    />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 flex flex-col items-center justify-center text-center p-20 py-40"
                            >
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
                                    <AlertCircle className="w-10 h-10" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">No Holidays Listed</h4>
                                <p className="text-sm text-gray-400 max-w-xs font-light leading-relaxed">
                                    We are currently updating the gazette records for {stateName}. Please check back in a few hours.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// --- LWF VIEW ---
export const LWFView = () => {
    return (
        <div className="space-y-12">
            <h2 className="text-3xl font-display font-bold text-gray-900">Labour Welfare Fund</h2>

            <div className="bg-white rounded-[40px] lg:rounded-[64px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-10 space-y-12">
                    <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
                        <div className="space-y-3">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">State: Punjab</span>
                            <h3 className="text-4xl font-bold text-gray-900 leading-tight tracking-tight">Contribution Spectrum</h3>
                        </div>
                        <div className="flex gap-4">
                            <div className="text-center p-4 bg-gray-50 rounded-3xl border border-gray-100 w-24">
                                <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Employee</p>
                                <p className="text-xl font-black text-gray-900">₹5</p>
                            </div>
                            <div className="text-center p-4 bg-gray-50 rounded-3xl border border-gray-100 w-24">
                                <p className="text-[9px] font-bold text-gray-400 uppercase mb-1">Employer</p>
                                <p className="text-xl font-black text-gray-900">₹20</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Applicability", value: "20+ Employees", icon: <CheckCircle2 className="w-4 h-4" /> },
                            { label: "Frequency", value: "Monthly", icon: <Clock className="w-4 h-4" /> },
                            { label: "Sub. Date", value: "15th Apr / Oct", icon: <AlertCircle className="w-4 h-4" /> },
                            { label: "Total Cont.", value: "₹25 / Employee", icon: <Filter className="w-4 h-4" /> },
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-gray-50 space-y-3 hover:border-primary/20 transition-all hover:shadow-md">
                                <div className="text-primary">{item.icon}</div>
                                <div>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase">{item.label}</p>
                                    <p className="text-sm font-bold text-gray-700">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- LEAVE & WORKING HOURS ---
export const LeaveView = () => {
    return (
        <div className="space-y-12">
            <h2 className="text-3xl font-display font-bold text-gray-900">Policy Framework</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-10">
                    <div className="relative group p-6 rounded-[40px] hover:bg-gray-50 transition-colors">
                        <div className="relative space-y-4">
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-primary" /> Working Hours
                            </h4>
                            <div className="flex items-end gap-2">
                                <span className="text-6xl font-black text-gray-900 leading-none">09</span>
                                <span className="text-xl font-bold text-gray-400 pb-1">Hours / Day</span>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed font-light">
                                Standards set under Shops & Establishment Acts, ensuring work-life balance and operational efficiency.
                            </p>
                        </div>
                    </div>

                    <div className="relative group p-6 rounded-[40px] hover:bg-gray-50 transition-colors">
                        <div className="relative space-y-4">
                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-accent" /> Overtime Cap
                            </h4>
                            <div className="flex items-end gap-2">
                                <span className="text-6xl font-black text-gray-900 leading-none">50</span>
                                <span className="text-xl font-bold text-gray-400 pb-1">Hours / Quarter</span>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed font-light">
                                Statutory limit for overtime work, calculated at double the ordinary rate of wages.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-10 bg-white rounded-[48px] border border-gray-100 shadow-sm space-y-8 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-primary/5 rounded-bl-[100px]" />
                    <h4 className="text-lg font-bold text-gray-900 mb-6">Leave Entitlements</h4>
                    <div className="space-y-6">
                        {[
                            { label: "Privilege Leave", value: "15 Days", color: "bg-primary" },
                            { label: "Casual Leave", value: "08 Days", color: "bg-accent" },
                            { label: "Sick Leave", value: "08 Days", color: "bg-warning" },
                        ].map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-xs font-bold text-gray-600">
                                    <span>{item.label}</span>
                                    <span>{item.value}</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                    <motion.div
                                        className={cn("h-full", item.color)}
                                        initial={{ width: 0 }}
                                        animate={{ width: "60%" }}
                                        transition={{ delay: i * 0.1, duration: 1 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-6 border-t border-gray-100">
                        <p className="text-[10px] text-gray-400 font-bold uppercase italic leading-relaxed">
                            Note: Leave policies vary significantly based on state-specific notifications and establishment type.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MINIMUM WAGES ---
export const WagesView = () => {
    const [wage, setWage] = useState(18000);

    return (
        <div className="space-y-12">
            <h2 className="text-3xl font-display font-bold text-gray-900">Minimum Wages</h2>

            <div className="p-10 bg-white rounded-[40px] border border-gray-100 shadow-sm space-y-12">
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-gray-500">Estimated Monthly Bracket</span>
                        <span className="text-3xl font-black text-primary font-mono tracking-tighter">₹{wage.toLocaleString()}</span>
                    </div>

                    <div className="relative py-4">
                        <input
                            type="range"
                            min="12000"
                            max="35000"
                            step="100"
                            value={wage}
                            onChange={(e) => setWage(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-100 rounded-full appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                        <span>Unskilled</span>
                        <span>Semi-Skilled</span>
                        <span>Skilled</span>
                        <span>Highly Skilled</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 space-y-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-gray-900">VDA Included</h4>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed font-light">
                            Variable Dearness Allowance is adjusted semi-annually based on the Consumer Price Index (CPI).
                        </p>
                    </div>

                    <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 space-y-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h4 className="font-bold text-gray-900">State Authority</h4>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed font-light">
                            Each state identifies specific employments and determines the minimum wage floor for their region.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- PROFESSIONAL TAX ---
export const ProfessionalTaxView = () => {
    return (
        <div className="space-y-12">
            <h2 className="text-3xl font-display font-bold text-gray-900">Professional Tax</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-10 bg-primary/10 rounded-[40px] border border-primary/10 flex flex-col items-center text-center gap-4 hover:shadow-lg transition-all duration-500">
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Max Annual Limit</span>
                    <span className="text-5xl font-black text-gray-900 tracking-tighter">₹2,500</span>
                    <p className="text-xs text-gray-500 font-medium">Statutory cap across all Indian states</p>
                </div>

                <div className="md:col-span-2 p-10 bg-gray-50 rounded-[40px] border border-gray-100 hover:shadow-md transition-all duration-500">
                    <h4 className="text-xl font-black text-gray-900 mb-8 tracking-tight">Payment Frequency</h4>
                    <div className="space-y-8 relative">
                        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gray-200" />

                        <div className="relative pl-12">
                            <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-white z-10 shadow-sm" />
                            <p className="font-black text-gray-900">Monthly (&gt;20 Employees)</p>
                            <p className="text-sm text-gray-500 font-light mt-1">Pay within 15 days of month end.</p>
                        </div>

                        <div className="relative pl-12">
                            <div className="absolute left-4 top-1.5 w-4 h-4 rounded-full bg-gray-300 border-4 border-white z-10 shadow-sm" />
                            <p className="font-black text-gray-900">Quarterly (&lt;20 Employees)</p>
                            <p className="text-sm text-gray-500 font-light mt-1">Pay by the 15th of the following quarter.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Applicable States</h4>
                <div className="flex flex-wrap gap-3">
                    {["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Telangana", "West Bengal", "Madhya Pradesh"].map(s => (
                        <span key={s} className="px-5 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-gray-700 hover:border-primary hover:text-primary transition-all cursor-default hover:shadow-sm">
                            {s}
                        </span>
                    ))}
                    <span className="px-5 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-bold text-gray-400 italic font-light">+ 14 more</span>
                </div>
            </div>
        </div>
    );
};

// --- PROVIDENT FUND ---
export const ProvidentFundView = () => {
    return (
        <div className="space-y-12">
            <h2 className="text-3xl font-display font-black text-gray-900 tracking-tight">Provident Fund (EPFO)</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-10 bg-gray-50 rounded-[48px] border border-gray-100 space-y-8 hover:shadow-md transition-all">
                    <div className="space-y-2">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Established 1952</span>
                        <h3 className="text-3xl font-black text-gray-900 leading-tight">Social Security Mechanism</h3>
                    </div>

                    <div className="relative p-8 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                        <div className="absolute right-0 top-0 w-24 h-24 bg-primary/5 rounded-bl-[100px]" />
                        <div className="space-y-6 relative z-10">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mandatory for wage</span>
                                <span className="text-3xl font-black text-gray-900 leading-none tracking-tighter">₹21,000</span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: "70%" }}
                                    transition={{ duration: 2 }}
                                />
                            </div>
                            <p className="text-xs text-gray-400 italic font-medium">Current proposed revision threshold.</p>
                        </div>
                    </div>
                </div>

                <div className="p-10 bg-gray-50 rounded-[48px] border border-gray-100 space-y-8 hover:shadow-md transition-all">
                    <h4 className="text-xl font-black text-gray-900 flex items-center gap-3 tracking-tight">
                        <HelpCircle className="w-6 h-6 text-primary" /> International Workers
                    </h4>
                    <div className="space-y-5">
                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-primary/20 transition-colors">
                            <p className="text-xs font-black text-gray-900 mb-2 uppercase tracking-wider">What is SSA?</p>
                            <p className="text-sm text-gray-500 font-light leading-relaxed">
                                Social Security Agreements prevent double coverage for workers operating internationally.
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-primary/20 transition-colors">
                            <p className="text-xs font-black text-gray-900 mb-2 uppercase tracking-wider">COC Certificate</p>
                            <p className="text-sm text-gray-500 font-light leading-relaxed">
                                Obtain Certificate of Coverage from EPFO to remain exempt from foreign host country schemes.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- RULES VIEW ---
export const RulesView = () => {
    return (
        <div className="space-y-10">
            <h2 className="text-3xl font-display font-black text-gray-900">Labor Rules</h2>

            <div className="aspect-video bg-gray-50 rounded-[48px] border border-gray-100 flex items-center justify-center relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-700">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <svg viewBox="0 0 100 100" className="w-full h-full stroke-primary/30 fill-none" strokeWidth="0.5">
                        <motion.path
                            d="M10 10 L90 90 M90 10 L10 90"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 5, repeat: Infinity }}
                        />
                        <circle cx="50" cy="50" r="40" />
                    </svg>
                </div>

                <div className="text-center space-y-8 relative z-10 px-8">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-primary border border-gray-100 shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <HelpCircle className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight mb-4">Interactive Navigation Hub</h3>
                        <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed font-light">
                            Use the visual navigator to browse through state-specific labor rules and local body implementation guidelines.
                        </p>
                    </div>
                    <button className="px-10 py-4 bg-primary text-white rounded-full font-black text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                        Enter Rule Engine
                    </button>
                </div>

                {/* Floating nodes */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-4 h-4 rounded-full bg-primary/20 blur-md"
                        animate={{
                            x: [Math.random() * 100, Math.random() * 100],
                            y: [Math.random() * 100, Math.random() * 100],
                        }}
                        transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, repeatType: "reverse" }}
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    />
                ))}
            </div>
        </div>
    );
};

// --- ESIC VIEW ---
export const ESICView = () => {
    return (
        <div className="space-y-12">
            <h2 className="text-3xl font-display font-black text-gray-900 tracking-tight">ESIC Scheme</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-10">
                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.3em]">Eligibility Funnel</h4>
                    <div className="space-y-6">
                        {[
                            { label: "Threshold", value: "10+ Employees", bar: "100%" },
                            { label: "Wage Limit", value: "₹21,000 / month", bar: "80%" },
                            { label: "Excluded", value: "Overtime Wages", bar: "40%" },
                        ].map((item, i) => (
                            <div key={i} className="space-y-3">
                                <div className="flex justify-between text-[11px] font-black uppercase tracking-wider">
                                    <span className="text-gray-400">{item.label}</span>
                                    <span className="text-primary">{item.value}</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-primary to-primary/40"
                                        initial={{ width: 0 }}
                                        animate={{ width: item.bar }}
                                        transition={{ delay: i * 0.2, duration: 1.5 }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-10 bg-gray-50 rounded-[48px] border border-gray-100 space-y-8 relative overflow-hidden hover:shadow-md transition-all">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
                    <h4 className="text-xl font-black text-gray-900 leading-tight tracking-tight">Key Benefits</h4>
                    <div className="grid grid-cols-2 gap-4 relative z-10">
                        {["Medical Care", "Sickness Benefit", "Maternity Benefit", "Disabled Benefit"].map(b => (
                            <div key={b} className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-primary/20 transition-all">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                <span className="text-[10px] font-black text-gray-700 uppercase tracking-wider">{b}</span>
                            </div>
                        ))}
                    </div>
                    <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Registration</span>
                        <span className="text-sm font-black text-gray-900">Unique IP Number</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
