import React, { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Calendar,
    X,
    RotateCw,
    FileText,
    Video,
    Upload,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { DateRange, useNavigation, CaptionProps } from "react-day-picker";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface LabourLawUpdate {
    id: number;
    title: string;
    description: string;
    release_date: string;
    end_date: string | null;
    is_visible: boolean;
    speaker_name: string | null;
    speaker_role: string | null;
    speaker_org: string | null;
    speaker_image: string | null;
    documents: DocumentItem[];
    videos: VideoItem[];
}

interface DocumentItem {
    title: string;
    description: string;
    url: string;
}

interface VideoItem {
    title: string;
    url: string;
}

const LabourLawManager = () => {
    const [updates, setUpdates] = useState<LabourLawUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUpdate, setSelectedUpdate] = useState<LabourLawUpdate | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingDocs, setUploadingDocs] = useState<Record<number, boolean>>({});
    const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);

    useEffect(() => {
        fetchUpdates();
    }, [dateFilter]);

    const fetchUpdates = async () => {
        setLoading(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            let url = `${apiBase}/api/v1/labour-law-updates?include_hidden=true`;
            if (dateFilter) {
                // Filter by release_date on backend
                url += `&date=${format(dateFilter, 'yyyy-MM-dd')}`;
            }

            const response = await fetch(url, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                // Parse JSONB fields
                const parsedData = data.map((item: any) => ({
                    ...item,
                    documents: typeof item.documents === 'string' ? JSON.parse(item.documents) : item.documents || [],
                    videos: typeof item.videos === 'string' ? JSON.parse(item.videos) : item.videos || []
                }));
                // Client-side filtering as fallback/refinement if backend only supports equality
                const filteredByDate = dateFilter
                    ? parsedData.filter((item: any) => {
                        const itemDate = new Date(item.release_date);
                        return (
                            itemDate.getFullYear() === dateFilter.getFullYear() &&
                            itemDate.getMonth() === dateFilter.getMonth() &&
                            itemDate.getDate() === dateFilter.getDate()
                        );
                    })
                    : parsedData;

                setUpdates(filteredByDate);
            }
        } catch (err) {
            toast.error("Connection failed");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (update?: LabourLawUpdate) => {
        if (update) {
            setSelectedUpdate({ ...update });
        } else {
            setSelectedUpdate({
                id: 0,
                title: "",
                description: "",
                release_date: new Date().toISOString().split('T')[0],
                end_date: null,
                is_visible: true,
                speaker_name: null,
                speaker_role: null,
                speaker_org: null,
                speaker_image: null,
                documents: [],
                videos: []
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!selectedUpdate) return;

        if (!selectedUpdate.title || !selectedUpdate.release_date) {
            toast.error("Title and Release Date are required");
            return;
        }

        setIsSaving(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/labour-law-updates/upsert`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedUpdate),
                credentials: 'include'
            });

            if (response.ok) {
                toast.success(selectedUpdate.id === 0 ? "Update created" : "Update saved");
                setIsModalOpen(false);
                fetchUpdates();
            } else {
                toast.error("Save operation failed");
            }
        } catch (err) {
            toast.error("Save operation failed");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Permanently delete this update?")) return;
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/labour-law-updates/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                toast.success("Update deleted");
                fetchUpdates();
            }
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    const handleToggleVisibility = async (update: LabourLawUpdate) => {
        const updatedUpdate = { ...update, is_visible: !update.is_visible };
        setUpdates(prev => prev.map(u => u.id === update.id ? updatedUpdate : u));

        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            await fetch(`${apiBase}/api/v1/labour-law-updates/upsert`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedUpdate),
                credentials: 'include'
            });
        } catch (err) {
            setUpdates(prev => prev.map(u => u.id === update.id ? update : u));
            toast.error("Failed to update visibility");
        }
    };

    const addDocument = () => {
        if (!selectedUpdate) return;
        setSelectedUpdate({
            ...selectedUpdate,
            documents: [...selectedUpdate.documents, { title: "", description: "", url: "" }]
        });
    };

    const removeDocument = (index: number) => {
        if (!selectedUpdate) return;
        setSelectedUpdate({
            ...selectedUpdate,
            documents: selectedUpdate.documents.filter((_, i) => i !== index)
        });
    };

    const updateDocument = (index: number, field: keyof DocumentItem, value: string) => {
        if (!selectedUpdate) return;
        const newDocs = [...selectedUpdate.documents];
        newDocs[index] = { ...newDocs[index], [field]: value };
        setSelectedUpdate({ ...selectedUpdate, documents: newDocs });
    };

    const addVideo = () => {
        if (!selectedUpdate) return;
        setSelectedUpdate({
            ...selectedUpdate,
            videos: [...selectedUpdate.videos, { title: "", url: "" }]
        });
    };

    const removeVideo = (index: number) => {
        if (!selectedUpdate) return;
        setSelectedUpdate({
            ...selectedUpdate,
            videos: selectedUpdate.videos.filter((_, i) => i !== index)
        });
    };

    const updateVideo = (index: number, field: keyof VideoItem, value: string) => {
        if (!selectedUpdate) return;
        const newVids = [...selectedUpdate.videos];
        newVids[index] = { ...newVids[index], [field]: value };
        setSelectedUpdate({ ...selectedUpdate, videos: newVids });
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !selectedUpdate) return;

        setUploadingImage(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            toast.loading("Uploading image...");
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/upload`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setSelectedUpdate({
                    ...selectedUpdate,
                    speaker_image: data.url
                });
                toast.dismiss();
                toast.success("Image uploaded successfully");
            } else {
                toast.dismiss();
                toast.error("Upload failed");
            }
        } catch (err) {
            toast.dismiss();
            toast.error("Upload error");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleDocumentUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !selectedUpdate) return;

        setUploadingDocs(prev => ({ ...prev, [index]: true }));
        const formData = new FormData();
        formData.append('file', file);

        try {
            toast.loading("Uploading document...");
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/upload`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                updateDocument(index, 'url', data.url);
                toast.dismiss();
                toast.success("Document uploaded successfully");
            } else {
                toast.dismiss();
                toast.error("Upload failed");
            }
        } catch (err) {
            toast.dismiss();
            toast.error("Upload error");
        } finally {
            setUploadingDocs(prev => ({ ...prev, [index]: false }));
        }
    };

    const filteredUpdates = updates.filter(u =>
        u.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Format date to DD-MM-YYYY
    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-4 animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Labour Law Updates</h1>
                    <p className="text-slate-500 text-xs mt-0.5">Manage monthly labour law updates and compliance information.</p>
                </div>
                <Button
                    onClick={() => handleOpenModal()}
                    size="sm"
                    className="h-9 px-4 gap-2 bg-primary hover:bg-primary/90 text-xs font-bold uppercase tracking-wider"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Create New
                </Button>
            </div>

            {/* Search Bar */}
            <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <div className="flex flex-wrap items-center gap-3 w-full">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <Input
                            placeholder="Search updates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-9 h-9 text-xs border-slate-200 bg-slate-50/50 w-full"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "h-9 px-3 text-xs font-medium border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 gap-2 min-w-[140px] justify-between",
                                        dateFilter && "border-primary text-primary bg-primary/5"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{dateFilter ? format(dateFilter, "PPP") : "Filter Date"}</span>
                                    </div>
                                    {dateFilter && (
                                        <div
                                            role="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDateFilter(undefined);
                                            }}
                                            className="hover:bg-primary/10 p-1 rounded-full"
                                        >
                                            <X className="w-3 h-3" />
                                        </div>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="end">
                                <CalendarComponent
                                    mode="single"
                                    selected={dateFilter}
                                    onSelect={setDateFilter}
                                    initialFocus
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
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-32">Release Date</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-32">End Date</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-24">Status</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right w-24">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={5} className="px-4 py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2"><RotateCw className="w-4 h-4 animate-spin" /> Loading...</td></tr>
                        ) : filteredUpdates.length > 0 ? (
                            filteredUpdates.map((update) => (
                                <tr key={update.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-4 py-3"><p className="font-semibold text-slate-900 text-xs line-clamp-1" title={update.title}>{update.title}</p></td>
                                    <td className="px-4 py-3 text-xs text-slate-600 font-medium">{formatDate(update.release_date)}</td>
                                    <td className="px-4 py-3 text-xs text-slate-600 font-medium">{formatDate(update.end_date)}</td>
                                    <td className="px-4 py-3">
                                        <Switch checked={update.is_visible} onCheckedChange={() => handleToggleVisibility(update)} className="scale-75 data-[state=checked]:bg-emerald-500" />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-primary" onClick={() => handleOpenModal(update)}><Edit className="w-3.5 h-3.5" /></Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-500" onClick={() => handleDelete(update.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={5} className="px-4 py-12 text-center text-slate-400 text-xs">No updates found.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create/Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-3xl p-0 overflow-hidden border-none shadow-2xl max-h-[90vh] flex flex-col">
                    <DialogHeader className="px-6 py-4 bg-slate-900 border-b border-white/10 shrink-0">
                        <DialogTitle className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                            {selectedUpdate?.id === 0 ? <Plus className="w-4 h-4 text-primary" /> : <Edit className="w-4 h-4 text-primary" />}
                            {selectedUpdate?.id === 0 ? "Create New Update" : "Edit Update"}
                        </DialogTitle>
                    </DialogHeader>
                    {selectedUpdate && (
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                            {/* Basic Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Basic Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title *</label>
                                        <Input value={selectedUpdate.title} onChange={(e) => setSelectedUpdate({ ...selectedUpdate, title: e.target.value })} className="h-9 text-xs" placeholder="e.g., Labour Law Updates - January 2026" />
                                    </div>
                                    <div className="col-span-2 space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description</label>
                                        <Textarea value={selectedUpdate.description} onChange={(e) => setSelectedUpdate({ ...selectedUpdate, description: e.target.value })} rows={3} className="text-xs resize-none" placeholder="Brief description of the update..." />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Release Date *</label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className={cn("w-full h-9 text-xs justify-start text-left font-normal border-slate-200", !selectedUpdate.release_date && "text-slate-400")}>
                                                    <Calendar className="mr-2 h-3.5 w-3.5 text-slate-400" />
                                                    {selectedUpdate.release_date || "Select Date"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <CalendarComponent mode="single" selected={selectedUpdate.release_date ? new Date(selectedUpdate.release_date) : undefined} onSelect={(date) => date && setSelectedUpdate({ ...selectedUpdate, release_date: format(date, 'yyyy-MM-dd') })} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">End Date (Optional)</label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className={cn("w-full h-9 text-xs justify-start text-left font-normal border-slate-200", !selectedUpdate.end_date && "text-slate-400")}>
                                                    <Calendar className="mr-2 h-3.5 w-3.5 text-slate-400" />
                                                    {selectedUpdate.end_date || "Select Date"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <CalendarComponent mode="single" selected={selectedUpdate.end_date ? new Date(selectedUpdate.end_date) : undefined} onSelect={(date) => setSelectedUpdate({ ...selectedUpdate, end_date: date ? format(date, 'yyyy-MM-dd') : null })} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                            {/* Speaker Info */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Speaker Information</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Speaker Name</label>
                                        <Input value={selectedUpdate.speaker_name || ""} onChange={(e) => setSelectedUpdate({ ...selectedUpdate, speaker_name: e.target.value })} className="h-9 text-xs" placeholder="e.g., Mr. Anand Gopalan" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Speaker Role</label>
                                        <Input value={selectedUpdate.speaker_role || ""} onChange={(e) => setSelectedUpdate({ ...selectedUpdate, speaker_role: e.target.value })} className="h-9 text-xs" placeholder="e.g., Managing Partner" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Organization</label>
                                        <Input value={selectedUpdate.speaker_org || ""} onChange={(e) => setSelectedUpdate({ ...selectedUpdate, speaker_org: e.target.value })} className="h-9 text-xs" placeholder="e.g., Advit Law Chamber" />
                                    </div>
                                    <div className="col-span-2 space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Speaker Image</label>
                                        <div className="flex items-center gap-3">
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="h-9 text-xs cursor-pointer"
                                                disabled={uploadingImage}
                                            />
                                            {selectedUpdate.speaker_image && (
                                                <div className="flex items-center gap-2">
                                                    <img src={selectedUpdate.speaker_image} alt="Speaker" className="w-16 h-16 rounded-lg object-cover border border-slate-200" />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-7 px-2 text-xs text-red-500 hover:text-red-600"
                                                        onClick={() => setSelectedUpdate({ ...selectedUpdate, speaker_image: null })}
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Documents (PDFs)</h3>
                                    <Button onClick={addDocument} size="sm" variant="outline" className="h-7 px-3 text-xs gap-1">
                                        <Plus className="w-3 h-3" /> Add Document
                                    </Button>
                                </div>
                                {selectedUpdate.documents.map((doc, index) => (
                                    <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-500">Document {index + 1}</span>
                                            <Button onClick={() => removeDocument(index)} size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-500 hover:text-red-600">
                                                <X className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                        <Input value={doc.title} onChange={(e) => updateDocument(index, 'title', e.target.value)} placeholder="Document Title" className="h-8 text-xs" />
                                        <Input value={doc.description} onChange={(e) => updateDocument(index, 'description', e.target.value)} placeholder="Brief description" className="h-8 text-xs" />
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="file"
                                                accept=".pdf"
                                                onChange={(e) => handleDocumentUpload(index, e)}
                                                className="h-8 text-xs cursor-pointer flex-1"
                                                disabled={uploadingDocs[index]}
                                            />
                                            {doc.url && (
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    size="sm"
                                                    className="h-8 px-3 text-xs"
                                                    onClick={() => window.open(doc.url, '_blank')}
                                                >
                                                    <FileText className="w-3 h-3 mr-1" /> View
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {selectedUpdate.documents.length === 0 && (
                                    <p className="text-xs text-slate-400 text-center py-4">No documents added yet. Click "Add Document" to get started.</p>
                                )}
                            </div>

                            {/* Videos */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Videos (YouTube)</h3>
                                    <Button onClick={addVideo} size="sm" variant="outline" className="h-7 px-3 text-xs gap-1">
                                        <Plus className="w-3 h-3" /> Add Video
                                    </Button>
                                </div>
                                {selectedUpdate.videos.map((video, index) => (
                                    <div key={index} className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-slate-500">Video {index + 1}</span>
                                            <Button onClick={() => removeVideo(index)} size="sm" variant="ghost" className="h-6 w-6 p-0 text-red-500 hover:text-red-600">
                                                <X className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                        <Input value={video.title} onChange={(e) => updateVideo(index, 'title', e.target.value)} placeholder="Video Title" className="h-8 text-xs" />
                                        <Input value={video.url} onChange={(e) => updateVideo(index, 'url', e.target.value)} placeholder="YouTube URL" className="h-8 text-xs" />
                                    </div>
                                ))}
                                {selectedUpdate.videos.length === 0 && (
                                    <p className="text-xs text-slate-400 text-center py-4">No videos added yet. Click "Add Video" to get started.</p>
                                )}
                            </div>
                        </div>
                    )}
                    <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="text-xs font-bold uppercase h-9">Cancel</Button>
                        <Button onClick={handleSave} disabled={isSaving} className="h-9 px-6 bg-primary text-xs font-bold uppercase">{isSaving ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : "Save"}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default LabourLawManager;
