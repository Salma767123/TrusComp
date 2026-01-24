import React, { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Save,
    Calendar,
    Scale,
    FileText,
    Bell,
    Wallet,
    Clock,
    IndianRupee,
    BadgePercent,
    PiggyBank,
    Book,
    HeartPulse,
    X,
    RotateCw,
    Check,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DateRange, useNavigation, CaptionProps } from "react-day-picker";
import { authenticatedFetch } from "@/lib/utils";

interface Resource {
    id: number;
    title: string;
    category: string;
    description: string;
    download_url: string;
    release_date: string;
    effective_date: string;
    state: string;
    is_visible: boolean;
    public_id?: string;
}

const CATEGORIES = [
    { id: 'Acts', label: 'Acts', icon: Scale },
    { id: 'Forms', label: 'Forms', icon: FileText },
    { id: 'Gazette Notifications', label: 'Gazette', icon: Bell },
    { id: 'Holidays List', label: 'Holidays', icon: Calendar },
    { id: 'Labour Welfare Fund', label: 'LWF', icon: Wallet },
    { id: 'Leave & Working Hours', label: 'Leave', icon: Clock },
    { id: 'Minimum Wages', label: 'Wages', icon: IndianRupee },
    { id: 'Professional Tax', label: 'Prof. Tax', icon: BadgePercent },
    { id: 'Provident Fund', label: 'PF', icon: PiggyBank },
    { id: 'Rules', label: 'Rules', icon: Book },
    { id: 'ESIC', label: 'ESIC', icon: HeartPulse },
];

const STATES = [
    "All States", "Central", "Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chandigarh", "Chhattisgarh", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
    "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const ResourceManager = () => {
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Initialize activeTab from URL param if present, otherwise default to first category
    const [activeTab, setActiveTab] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const categoryParam = params.get('category');
        return categoryParam && CATEGORIES.find(c => c.id === categoryParam)
            ? categoryParam
            : CATEGORIES[0].id;
    });

    // Standard Resource State
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Holiday State
    const [isHolidayModalOpen, setIsHolidayModalOpen] = useState(false);
    const [holidayState, setHolidayState] = useState<string>("Maharashtra");
    const [holidayDates, setHolidayDates] = useState<Date[] | undefined>([]);
    const [holidayNames, setHolidayNames] = useState<Record<string, string>>({});

    const [isSaving, setIsSaving] = useState(false);

    // Filters
    const [filterState, setFilterState] = useState("All States");
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    useEffect(() => {
        // Update URL when activeTab changes (optional but good for UX persistence)
        const params = new URLSearchParams(window.location.search);
        if (activeTab) {
            params.set('category', activeTab);
            window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
        }
        fetchResources();
    }, [activeTab, filterState, dateRange]);

    const fetchResources = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append('include_hidden', 'true');
            if (activeTab) params.append('category', activeTab);
            // ...
            // Fix Calendar Lint Error by separating conditional render 
            <div className="border border-slate-200 rounded-lg p-2 flex justify-center bg-slate-50">
                {selectedResource ? (
                    <CalendarComponent
                        mode="single"
                        selected={holidayDates?.[0]}
                        onSelect={(date) => setHolidayDates(date ? [date] : [])}
                        className="rounded-md border-0"
                    />
                ) : (
                    <CalendarComponent
                        mode="multiple"
                        selected={holidayDates}
                        onSelect={setHolidayDates}
                        className="rounded-md border-0"
                    />
                )}
            </div>
            if (filterState !== "All States") params.append('state', filterState);
            if (dateRange?.from) params.append('startDate', format(dateRange.from, 'yyyy-MM-dd'));
            if (dateRange?.to) params.append('endDate', format(dateRange.to, 'yyyy-MM-dd'));

            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await authenticatedFetch(`${apiBase}/resources?${params.toString()}`, {
                // credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setResources(data);
            }
        } catch (err) {
            toast.error("Connection failed");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !selectedResource) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            toast.loading("Uploading to Cloudinary...");
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await authenticatedFetch(`${apiBase}/upload`, {
                method: 'POST',
                body: formData,
                // credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setSelectedResource({
                    ...selectedResource,
                    download_url: data.url,
                    public_id: data.public_id
                });
                toast.dismiss();
                toast.success("Document uploaded successfully");
            } else {
                toast.dismiss();
                toast.error("Upload failed");
            }
        } catch (err) {
            toast.dismiss();
            toast.error("Upload error");
        }
    };

    const handleOpenModal = (resource?: Resource) => {
        if (activeTab === 'Holidays List') {
            if (resource) {
                // Editing a holiday - prefill
                setHolidayState(resource.state);
                const date = new Date(resource.effective_date);
                setHolidayDates([date]);
                setHolidayNames({ [date.toISOString()]: resource.title });
                setIsHolidayModalOpen(true);
                setSelectedResource(resource); // Keep track for ID
            } else {
                // New Holiday
                setHolidayState("Maharashtra");
                setHolidayDates([]);
                setHolidayNames({});
                setSelectedResource(null);
                setIsHolidayModalOpen(true);
            }
            return;
        }

        if (resource) {
            setSelectedResource({ ...resource });
        } else {
            setSelectedResource({
                id: 0,
                title: "",
                category: activeTab,
                description: "",
                download_url: "",
                release_date: new Date().toISOString().split('T')[0],
                effective_date: "",
                state: "Central",
                is_visible: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSaveResource = async () => {
        if (!selectedResource) return;

        if (!selectedResource.title || !selectedResource.effective_date) {
            toast.error("Title and Effective Date are required");
            return;
        }

        setIsSaving(true);
        try {
            await upsertResource(selectedResource);
            toast.success(selectedResource.id === 0 ? "Resource created" : "Resource updated");
            setIsModalOpen(false);
            fetchResources();
        } catch (err) {
            toast.error("Save operation failed");
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveHoliday = async () => {
        if (!holidayDates || holidayDates.length === 0) {
            toast.error("Please select at least one date");
            return;
        }

        setIsSaving(true);
        try {
            // If editing single resource
            if (selectedResource && selectedResource.id !== 0) {
                const date = holidayDates[0];
                const name = holidayNames[date.toISOString()];
                if (!name) {
                    toast.error("Holiday name is required");
                    setIsSaving(false);
                    return;
                }

                await upsertResource({
                    ...selectedResource,
                    state: holidayState,
                    effective_date: format(date, 'yyyy-MM-dd'),
                    release_date: format(date, 'yyyy-MM-dd'), // Use same date for holidays
                    title: name
                });
            } else {
                // Bulk Create
                const promises = holidayDates.map(date => {
                    const name = holidayNames[date.toISOString()] || "Public Holiday";
                    return upsertResource({
                        id: 0,
                        title: name,
                        category: 'Holidays List',
                        description: `Holiday in ${holidayState}`,
                        download_url: "",
                        state: holidayState,
                        effective_date: format(date, 'yyyy-MM-dd'),
                        release_date: format(date, 'yyyy-MM-dd'),
                        is_visible: true
                    } as Resource);
                });
                await Promise.all(promises);
            }

            toast.success("Holidays saved successfully");
            setIsHolidayModalOpen(false);
            fetchResources();
        } catch (err) {
            toast.error("Failed to save holidays");
        } finally {
            setIsSaving(false);
        }
    };

    const upsertResource = async (resource: Resource) => {
        const apiBase = import.meta.env.VITE_API_BASE_URL || "";
        const response = await authenticatedFetch(`${apiBase}/resources/upsert`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resource),
            // credentials: 'include'
        });
        if (!response.ok) throw new Error("Failed");
        return response.json();
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Permanently delete this resource?")) return;
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await authenticatedFetch(`${apiBase}/resources/${id}`, {
                method: 'DELETE',
                // credentials: 'include'
            });
            if (response.ok) {
                toast.success("Resource deleted");
                fetchResources();
            }
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    const handleToggleVisibility = async (resource: Resource) => {
        const updatedResource = { ...resource, is_visible: !resource.is_visible };
        setResources(prev => prev.map(r => r.id === resource.id ? updatedResource : r)); // Optimistic

        try {
            await upsertResource(updatedResource);
        } catch (err) {
            setResources(prev => prev.map(r => r.id === resource.id ? resource : r)); // Revert
            toast.error("Failed to update visibility");
        }
    };

    const clearFilters = () => {
        setFilterState("All States");
        setDateRange(undefined);
        setSearchTerm("");
    };

    const filteredResources = resources.filter(r =>
        r.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-4 animate-in fade-in duration-300">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Categories</h1>
                    <p className="text-slate-500 text-xs mt-0.5">Manage resource library and compliance documents.</p>
                </div>
                <Button
                    onClick={() => handleOpenModal()}
                    size="sm"
                    className="h-9 px-4 gap-2 bg-primary hover:bg-primary/90 text-xs font-bold uppercase tracking-wider"
                >
                    <Plus className="w-3.5 h-3.5" />
                    {activeTab === 'Holidays List' ? "Add New Holiday" : "New Resource"}
                </Button>
            </div>

            {/* Category Tabs */}
            <div className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur pt-2 pb-1 -mx-2 px-2">
                <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm flex items-center overflow-x-auto no-scrollbar gap-1">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={cn(
                                "flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap shrink-0",
                                activeTab === cat.id
                                    ? "bg-slate-900 text-white shadow-md"
                                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                            )}
                        >
                            <cat.icon className={cn(
                                "w-3.5 h-3.5",
                                activeTab === cat.id ? "text-primary" : "text-slate-400"
                            )} />
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 h-9 text-xs border-slate-200 bg-slate-50/50"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" size="sm" className={cn(
                                "h-9 border-slate-200 text-xs font-medium justify-start text-left font-normal",
                                !dateRange?.from && "text-slate-500"
                            )}>
                                <Calendar className="mr-2 h-3.5 w-3.5" />
                                {dateRange?.from ? (
                                    dateRange.to ? `${format(dateRange.from, "LLL dd")} - ${format(dateRange.to, "LLL dd")}` : format(dateRange.from, "LLL dd, y")
                                ) : "Date Range"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <CalendarComponent
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange?.from}
                                selected={dateRange}
                                onSelect={setDateRange}
                                numberOfMonths={1}
                                className="p-3"
                                components={{
                                    Caption: ({ displayMonth }: CaptionProps) => {
                                        const { goToMonth, nextMonth, previousMonth } = useNavigation();
                                        const currentYear = new Date().getFullYear();
                                        const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);
                                        const months = [
                                            "January", "February", "March", "April", "May", "June",
                                            "July", "August", "September", "October", "November", "December"
                                        ];

                                        const handleMonthChange = (value: string) => {
                                            const newMonth = new Date(displayMonth);
                                            newMonth.setMonth(months.indexOf(value));
                                            goToMonth?.(newMonth);
                                        };

                                        const handleYearChange = (value: string) => {
                                            const newMonth = new Date(displayMonth);
                                            newMonth.setFullYear(parseInt(value));
                                            goToMonth?.(newMonth);
                                        };

                                        return (
                                            <div className="flex items-center justify-between pt-1 relative px-1">
                                                <div className="flex items-center gap-1">
                                                    <Select value={months[displayMonth.getMonth()]} onValueChange={handleMonthChange}>
                                                        <SelectTrigger className="h-7 w-[100px] text-xs font-medium border-0 shadow-none hover:bg-slate-100 focus:ring-0 px-2 gap-1">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent className="max-h-[200px]">
                                                            {months.map((month) => (
                                                                <SelectItem key={month} value={month} className="text-xs">{month}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <Select value={displayMonth.getFullYear().toString()} onValueChange={handleYearChange}>
                                                        <SelectTrigger className="h-7 w-[70px] text-xs font-medium border-0 shadow-none hover:bg-slate-100 focus:ring-0 px-2 gap-1">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent className="max-h-[200px]">
                                                            {years.map((year) => (
                                                                <SelectItem key={year} value={year.toString()} className="text-xs">{year}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 text-slate-500 hover:text-slate-900"
                                                        onClick={() => previousMonth && goToMonth?.(previousMonth)}
                                                        disabled={!previousMonth}
                                                    >
                                                        <ChevronLeft className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 text-slate-500 hover:text-slate-900"
                                                        onClick={() => nextMonth && goToMonth?.(nextMonth)}
                                                        disabled={!nextMonth}
                                                    >
                                                        <ChevronRight className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    }
                                }}
                            />
                        </PopoverContent>
                    </Popover>

                    <Select value={filterState} onValueChange={setFilterState}>
                        <SelectTrigger className="h-9 w-[140px] text-xs border-slate-200">
                            <SelectValue placeholder="All States" />
                        </SelectTrigger>
                        <SelectContent>
                            {STATES.map(s => <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    {
                        (filterState !== "All States" || dateRange?.from || searchTerm) && (
                            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-9 w-9 p-0 text-slate-400 hover:text-red-500">
                                <X className="w-4 h-4" />
                            </Button>
                        )
                    }
                </div >
            </div >

            {/* Content Table */}
            < div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden" >
                <table className="w-full text-left border-collapse table-fixed">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            {activeTab === 'Holidays List' ? (
                                <>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-[15%]">Date</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-[10%]">Day</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-[40%]">Holiday Name</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-[15%]">State</th>
                                </>
                            ) : (
                                <>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-[35%]">Heading</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-[15%]">Released</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-[15%]">Effective</th>
                                    <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-[15%]">State</th>
                                </>
                            )}
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-[10%]">Status</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right w-[10%]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2"><RotateCw className="w-4 h-4 animate-spin" /> Loading...</td></tr>
                        ) : filteredResources.length > 0 ? (
                            filteredResources.map((resource) => (
                                <tr key={resource.id} className="hover:bg-slate-50/80 transition-colors">
                                    {activeTab === 'Holidays List' ? (
                                        <>
                                            <td className="px-4 py-3 text-xs font-medium text-slate-900">
                                                {(() => {
                                                    try {
                                                        const d = new Date(resource.effective_date);
                                                        return isNaN(d.getTime()) ? "-" : format(d, "MMM dd, yyyy");
                                                    } catch (e) { return "-"; }
                                                })()}
                                            </td>
                                            <td className="px-4 py-3 text-xs text-slate-500">
                                                {(() => {
                                                    try {
                                                        const d = new Date(resource.effective_date);
                                                        return isNaN(d.getTime()) ? "-" : format(d, "EEEE");
                                                    } catch (e) { return "-"; }
                                                })()}
                                            </td>
                                            <td className="px-4 py-3 text-xs font-semibold text-slate-900">{resource.title}</td>
                                            <td className="px-4 py-3"><Badge variant="outline" className="text-[10px]">{resource.state}</Badge></td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="px-4 py-3"><p className="font-semibold text-slate-900 text-xs line-clamp-1" title={resource.title}>{resource.title}</p></td>
                                            <td className="px-4 py-3 text-xs text-slate-600 font-medium">{resource.release_date}</td>
                                            <td className="px-4 py-3 text-xs text-slate-600 font-medium">{resource.effective_date}</td>
                                            <td className="px-4 py-3"><Badge variant="outline" className="text-[10px]">{resource.state}</Badge></td>
                                        </>
                                    )}
                                    <td className="px-4 py-3">
                                        <Switch checked={resource.is_visible} onCheckedChange={() => handleToggleVisibility(resource)} className="scale-75 data-[state=checked]:bg-emerald-500" />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-primary" onClick={() => handleOpenModal(resource)}><Edit className="w-3.5 h-3.5" /></Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-500" onClick={() => handleDelete(resource.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={6} className="px-4 py-12 text-center text-slate-400 text-xs">No records found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div >

            {/* Standard Resource Modal */}
            < Dialog open={isModalOpen} onOpenChange={setIsModalOpen} >
                <DialogContent className="max-w-xl p-0 overflow-hidden border-none shadow-2xl max-h-[85vh] flex flex-col">
                    <DialogHeader className="px-6 py-4 bg-slate-900 border-b border-white/10 shrink-0">
                        <DialogTitle className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                            {selectedResource?.id === 0 ? <Plus className="w-4 h-4 text-primary" /> : <Edit className="w-4 h-4 text-primary" />}
                            {selectedResource?.id === 0 ? "Add New Resource" : "Edit Resource"}
                        </DialogTitle>
                    </DialogHeader>
                    {selectedResource && (
                        <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-white">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Heading / Title</label>
                                    <Input value={selectedResource.title} onChange={(e) => setSelectedResource({ ...selectedResource, title: e.target.value })} className="h-9 text-xs" placeholder="Enter title" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</label>
                                    <Select value={selectedResource.category} onValueChange={(v) => setSelectedResource({ ...selectedResource, category: v })}>
                                        <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {CATEGORIES.filter(c => c.id !== 'Holidays List').map(cat => (
                                                <SelectItem key={cat.id} value={cat.id} className="text-xs">{cat.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">State</label>
                                    <Select value={selectedResource.state} onValueChange={(v) => setSelectedResource({ ...selectedResource, state: v })}>
                                        <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            {STATES.filter(s => s !== "All States").map(state => (
                                                <SelectItem key={state} value={state} className="text-xs">{state}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Released Date</label>
                                    <div className="relative">
                                        <Input
                                            value={selectedResource.release_date}
                                            readOnly
                                            className="h-9 text-xs bg-slate-50 text-slate-500"
                                        />
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-9 w-9 text-slate-400">
                                                    <Calendar className="w-4 h-4" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="end">
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={selectedResource.release_date ? new Date(selectedResource.release_date) : undefined}
                                                    onSelect={(date) => date && setSelectedResource({ ...selectedResource, release_date: format(date, 'yyyy-MM-dd') })}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Effective Date</label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className={cn(
                                                "w-full h-9 text-xs justify-start text-left font-normal border-slate-200",
                                                !selectedResource.effective_date && "text-slate-400"
                                            )}>
                                                <Calendar className="mr-2 h-3.5 w-3.5 text-slate-400" />
                                                {selectedResource.effective_date || "Select Date"}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="end">
                                            <CalendarComponent mode="single" selected={selectedResource.effective_date ? new Date(selectedResource.effective_date) : undefined} onSelect={(date) => date && setSelectedResource({ ...selectedResource, effective_date: format(date, 'yyyy-MM-dd') })} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="col-span-2 space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description</label>
                                    <Textarea value={selectedResource.description} onChange={(e) => setSelectedResource({ ...selectedResource, description: e.target.value })} rows={3} className="text-xs resize-none" />
                                </div>
                                <div className="col-span-2 space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Document (PDF)</label>
                                    <div className="flex items-center gap-3">
                                        <Input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="h-9 text-xs cursor-pointer" />
                                        {selectedResource.download_url && (
                                            <Button type="button" variant="secondary" size="sm" className="h-9 px-3 gap-2 text-xs" onClick={() => window.open(selectedResource.download_url, '_blank')}>
                                                <FileText className="w-3.5 h-3.5" /> View
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="text-xs font-bold uppercase h-9">Cancel</Button>
                        <Button onClick={handleSaveResource} disabled={isSaving} className="h-9 px-6 bg-primary text-xs font-bold uppercase">{isSaving ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : "Save"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >

            {/* Holiday Modal */}
            < Dialog open={isHolidayModalOpen} onOpenChange={setIsHolidayModalOpen} >
                <DialogContent className="max-w-lg p-0 overflow-hidden border-none shadow-2xl max-h-[85vh] flex flex-col">
                    <DialogHeader className="px-6 py-4 bg-slate-900 border-b border-white/10">
                        <DialogTitle className="text-base font-bold text-white flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            {selectedResource ? "Edit Holiday" : "Add New Holidays"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-white">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">State</label>
                            <Select value={holidayState} onValueChange={setHolidayState}>
                                <SelectTrigger className="h-9 text-xs"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {STATES.filter(s => s !== "All States").map(state => (
                                        <SelectItem key={state} value={state} className="text-xs">{state}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Select Holiday Dates</label>
                            <div className="border border-slate-200 rounded-lg p-2 flex justify-center bg-slate-50">
                                {selectedResource ? (
                                    <CalendarComponent
                                        mode="single"
                                        selected={holidayDates?.[0]}
                                        onSelect={(date) => setHolidayDates(date ? [date] : [])}
                                        className="rounded-md border-0"
                                    />
                                ) : (
                                    <CalendarComponent
                                        mode="multiple"
                                        selected={holidayDates}
                                        onSelect={setHolidayDates}
                                        className="rounded-md border-0"
                                    />
                                )}
                            </div>
                        </div>
                        {holidayDates && holidayDates.length > 0 && (
                            <div className="space-y-3 pt-2">
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Holiday Names</label>
                                <div className="space-y-2">
                                    {holidayDates.map(date => (
                                        <div key={date.toISOString()} className="flex items-center gap-2 animate-in slide-in-from-left-2 duration-300">
                                            <div className="w-24 shrink-0 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1.5 rounded">{format(date, "MMM dd")}</div>
                                            <Input
                                                placeholder="Enter holiday name..."
                                                className="h-8 text-xs"
                                                value={holidayNames[date.toISOString()] || ""}
                                                onChange={(e) => setHolidayNames(prev => ({ ...prev, [date.toISOString()]: e.target.value }))}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                        <Button variant="ghost" onClick={() => setIsHolidayModalOpen(false)} className="text-xs font-bold uppercase h-9">Cancel</Button>
                        <Button onClick={handleSaveHoliday} disabled={isSaving} className="h-9 px-6 bg-primary text-xs font-bold uppercase">{isSaving ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : "Save Holidays"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </div >
    );
};

export default ResourceManager;
