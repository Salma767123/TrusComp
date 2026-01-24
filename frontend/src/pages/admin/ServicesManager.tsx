import React, { useState, useEffect, useRef } from "react";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    X,
    Eye,
    EyeOff,
    RefreshCw,
    Type,
    List,
    ShieldCheck,
    CheckCircle2,
    Tags,
    ChevronDown,
    MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ServiceItem {
    id: number;
    slug: string;
    title: string;
    category: string;
    short_overview: string;
    long_overview: string;
    doodle_type: string;
    state: string;
    is_visible: boolean;
    sort_order: number;
    problems: string[];
    features: { title: string; hint: string }[];
    benefits: { keyword: string; text: string }[];
    whyTrusComp: string[];
}

const EmptyService: ServiceItem = {
    id: 0,
    slug: "",
    title: "",
    category: "",
    short_overview: "",
    long_overview: "",
    doodle_type: "shield",
    state: "All India",
    is_visible: true,
    sort_order: 0,
    problems: [],
    features: [],
    benefits: [],
    whyTrusComp: []
};

const DOODLE_TYPES = ["shield", "audit", "records", "payroll", "license", "training", "vendor", "automation", "risk", "factory", "calendar", "remittance", "employer_audit", "contractor"];

// Component defined outside to prevent re-renders losing focus
const StringArrayInput = ({ label, values, onChange }: { label: string, values: string[], onChange: (v: string[]) => void }) => (
    <div className="space-y-3">
        <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
            <Button variant="ghost" size="sm" onClick={() => onChange([...values, ""])} className="h-6 text-xs text-primary hover:bg-primary/10">+ Add Item</Button>
        </div>
        <div className="space-y-2">
            {(values || []).map((val, idx) => (
                <div key={idx} className="flex gap-2 animate-in slide-in-from-left-2 duration-200" style={{ animationDelay: `${idx * 50}ms` }}>
                    <Input
                        value={val}
                        onChange={(e) => {
                            const newVals = [...values];
                            newVals[idx] = e.target.value;
                            onChange(newVals);
                        }}
                        className="h-9 text-xs bg-white border-slate-200 focus:border-primary transition-colors"
                        placeholder="Enter item text..."
                    />
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-red-500 hover:bg-red-50" onClick={() => onChange(values.filter((_, i) => i !== idx))}><X className="w-4 h-4" /></Button>
                </div>
            ))}
            {(!values || values.length === 0) && (
                <p className="text-[11px] text-slate-400 italic text-center py-2 border border-dashed border-slate-200 rounded-lg">No items added. Click '+ Add Item' to start.</p>
            )}
        </div>
    </div>
);

const ServicesManager = () => {
    const [services, setServices] = useState<ServiceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingService, setEditingService] = useState<ServiceItem>(EmptyService);
    const [isSaving, setIsSaving] = useState(false);

    // Permanent Categories from Settings
    const [categories, setCategories] = useState<string[]>([]);
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    // Category Management State
    const [renamingIdx, setRenamingIdx] = useState<number | null>(null);
    const [tempCategoryName, setTempCategoryName] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const [servicesRes, categoriesRes] = await Promise.all([
                fetch(`${apiBase}/services`, { credentials: 'include' }),
                fetch(`${apiBase}/services/categories/all`, { credentials: 'include' })
            ]);

            if (servicesRes.ok) {
                const data = await servicesRes.json();
                setServices(data);
            }

            if (categoriesRes.ok) {
                const cats = await categoriesRes.json();
                setCategories(cats);
            }
        } catch (err) {
            toast.error("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    };

    const handleSave = async () => {
        if (!editingService.title || !editingService.category) {
            toast.error("Title and Category are required");
            return;
        }

        setIsSaving(true);
        try {
            const payload = {
                id: editingService.id,
                title: editingService.title,
                categoryId: editingService.category,
                shortOverview: editingService.short_overview,
                longOverview: editingService.long_overview,
                state: editingService.state,
                commonProblems: editingService.problems || [],
                whyTruscomp: editingService.whyTrusComp || [],
                features: editingService.features || [],
                benefits: editingService.benefits || [],
                doodleType: editingService.doodle_type,
                isActive: editingService.is_visible,
                sort_order: editingService.sort_order
            };

            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/services/upsert`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'include'
            });

            if (response.ok) {
                toast.success(editingService.id === 0 ? "Service created" : "Service saved");
                setIsDialogOpen(false);
                fetchData();
            } else {
                const errorData = await response.json();
                toast.error(errorData.message || "Failed to save service");
            }
        } catch (err) {
            toast.error("An error occurred while saving");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this service?")) return;
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/services/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                toast.success("Service deleted");
                fetchData();
            }
        } catch (err) {
            toast.error("Failed to delete service");
        }
    };

    const handleToggleVisibility = async (service: ServiceItem) => {
        const updatedService = { ...service, is_visible: !service.is_visible };
        setServices(services.map(s => s.id === service.id ? updatedService : s));

        try {
            const payload = {
                id: service.id,
                title: service.title,
                categoryId: service.category,
                isActive: !service.is_visible,
                shortOverview: service.short_overview,
                longOverview: service.long_overview,
                state: service.state,
                doodleType: service.doodle_type,
                sort_order: service.sort_order,
                commonProblems: service.problems || [],
                whyTruscomp: service.whyTrusComp || [],
                features: service.features || [],
                benefits: service.benefits || []
            };

            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/services/upsert`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
                credentials: 'include'
            });
            if (!response.ok) {
                toast.error("Failed to update visibility");
                fetchData();
            }
        } catch (err) {
            toast.error("Failed to update visibility");
            fetchData();
        }
    };

    // --- Category Management ---
    const persistCategories = async (newList: string[]) => {
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const res = await fetch(`${apiBase}/services/categories/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ categories: newList }),
                credentials: 'include'
            });
            if (res.ok) {
                setCategories(newList);
                return true;
            }
            return false;
        } catch (err) {
            toast.error("Network error updating categories");
            return false;
        }
    };

    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;
        const newName = newCategoryName.trim();
        if (categories.includes(newName)) {
            toast.error("Category already exists");
            return;
        }
        const newList = [...categories, newName].sort();
        if (await persistCategories(newList)) {
            setNewCategoryName("");
            setIsAddingCategory(false);
            setEditingService({ ...editingService, category: newName });
            toast.success("Category added");
        }
    };

    const handleRenameCategory = async (oldName: string, newName: string) => {
        if (!newName.trim() || oldName === newName) {
            setRenamingIdx(null);
            return;
        }
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const res = await fetch(`${apiBase}/services/category/rename`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ oldName, newName: newName.trim() }),
                credentials: 'include'
            });
            if (res.ok) {
                fetchData();
                setRenamingIdx(null);
                toast.success("Category renamed");
            }
        } catch (err) {
            toast.error("Failed to rename category");
        }
    };

    const handleDeleteCategory = async (catName: string) => {
        if (!confirm(`Delete category "${catName}"? This will NOT delete services, but they will have an orphaned category.`)) return;
        const newList = categories.filter(c => c !== catName);
        if (await persistCategories(newList)) {
            toast.success("Category removed from list");
        }
    };

    const filteredServices = services.filter(service => {
        const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All Categories" || service.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Services Management</h1>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Live Website Catalog</p>
                    </div>
                </div>
                <Button
                    onClick={() => { setEditingService(EmptyService); setIsDialogOpen(true); }}
                    className="h-10 px-6 gap-2 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                >
                    <Plus className="w-4 h-4" />
                    Create New Service
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200 shadow-sm">
                <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search services by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-11 text-sm border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-primary/5 rounded-xl transition-all"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="h-10 w-full md:w-48 text-xs font-bold bg-white border-slate-200 rounded-xl focus:ring-4 focus:ring-primary/5 text-slate-700 shadow-sm transition-all hover:border-slate-300">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200 shadow-xl max-h-[200px] overflow-y-auto">
                            <SelectItem value="All Categories" className="text-xs font-medium">All Categories</SelectItem>
                            {categories.map(cat => (
                                <SelectItem key={cat} value={cat} className="text-xs font-medium">{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" onClick={fetchData} className="h-10 w-10 rounded-xl bg-white border-slate-200 text-slate-400 hover:text-primary hover:border-primary transition-all">
                        <RefreshCw className={cn("w-4 h-4", loading && "animate-spin")} />
                    </Button>
                </div>
            </div>

            {/* List Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/30 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Service Insight</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-48">Classification</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-20 text-center">Order</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-32 text-center">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right w-28">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan={5} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <RefreshCw className="w-8 h-8 animate-spin text-primary/40" />
                                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Synchronizing Database...</p>
                                    </div>
                                </td></tr>
                            ) : filteredServices.length > 0 ? (
                                filteredServices.map((service, idx) => (
                                    <tr key={service.id} className="hover:bg-slate-50/50 transition-colors group animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${idx * 40}ms` }}>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-black text-slate-800 text-sm group-hover:text-primary transition-colors line-clamp-1">{service.title}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="outline" className="bg-white border-slate-200 text-slate-600 font-black uppercase text-[9px] px-2 py-1 tracking-wider whitespace-nowrap">
                                                {service.category}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="text-xs font-bold text-slate-500">{service.sort_order}</span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center">
                                                <Switch
                                                    checked={service.is_visible}
                                                    onCheckedChange={() => handleToggleVisibility(service)}
                                                    className="data-[state=checked]:bg-emerald-500 scale-75"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-primary transition-all" onClick={() => {
                                                    const apiBase = import.meta.env.VITE_API_BASE_URL || "";
                                                    fetch(`${apiBase}/services/${service.slug}`).then(r => r.json()).then(data => {
                                                        setEditingService(data);
                                                        setIsDialogOpen(true);
                                                    });
                                                }}><Edit className="w-3.5 h-3.5" /></Button>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-500 transition-all" onClick={() => handleDelete(service.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={5} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <Search className="w-8 h-8 text-slate-200" />
                                        <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">No matching services found</p>
                                    </div>
                                </td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit Modal */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-5xl p-0 overflow-hidden border-none shadow-2xl h-[92vh] flex flex-col rounded-2xl">
                    <DialogHeader className="px-8 py-5 bg-slate-900 shrink-0 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
                        <DialogTitle className="text-lg font-black text-white tracking-tight flex items-center gap-3 relative">
                            <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
                                {editingService.id === 0 ? <Plus className="w-5 h-5 text-primary" /> : <Edit className="w-5 h-5 text-primary" />}
                            </div>
                            <div className="flex flex-col">
                                <span>{editingService.id === 0 ? "Create New Service" : "Modify Service"}</span>
                                <span className="text-[10px] text-white/50 font-medium uppercase tracking-[0.2em]">Compliance Repository Entry</span>
                            </div>
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
                        <div className="p-8 space-y-8 max-w-4xl mx-auto">
                            {/* Section 1: Core Configuration */}
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 border-b border-slate-100 pb-4">
                                    <Type className="w-4 h-4 text-primary" />
                                    Core Configuration
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Service Title</label>
                                        <Input
                                            value={editingService.title}
                                            onChange={e => setEditingService({ ...editingService, title: e.target.value })}
                                            placeholder="e.g., Factories Act Compliance"
                                            className="h-11 font-bold rounded-xl border-slate-200 focus:ring-4 focus:ring-primary/5"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Classification Category</label>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                type="button"
                                                onClick={() => setIsAddingCategory(true)}
                                                className="h-5 px-1.5 text-[9px] font-bold text-primary hover:bg-primary/5 uppercase tracking-wider"
                                            >
                                                Manage Categories
                                            </Button>
                                        </div>
                                        <Select
                                            value={editingService.category}
                                            onValueChange={(v) => setEditingService({ ...editingService, category: v })}
                                        >
                                            <SelectTrigger className="h-11 bg-white border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all outline-none">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-slate-200 shadow-xl max-h-60">
                                                {categories.map(cat => (
                                                    <SelectItem key={cat} value={cat} className="text-sm font-medium">{cat}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Icon Style / Doodle</label>
                                        <Select
                                            value={editingService.doodle_type}
                                            onValueChange={(v) => setEditingService({ ...editingService, doodle_type: v })}
                                        >
                                            <SelectTrigger className="h-11 bg-white border-slate-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-primary/5 transition-all outline-none capitalize text-left">
                                                <SelectValue placeholder="Select Icon" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-slate-200 shadow-xl max-h-60">
                                                {DOODLE_TYPES.map(d => (
                                                    <SelectItem key={d} value={d} className="text-sm font-medium capitalize">{d.replace('_', ' ')}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Display Order</label>
                                        <Input
                                            type="number"
                                            className="h-11 font-bold rounded-xl bg-white border-slate-200"
                                            value={editingService.sort_order}
                                            onChange={e => setEditingService({ ...editingService, sort_order: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Applicable State / Region</label>
                                        <Input
                                            value={editingService.state}
                                            onChange={e => setEditingService({ ...editingService, state: e.target.value })}
                                            placeholder="e.g., Maharashtra, All India..."
                                            className="h-11 font-bold rounded-xl border-slate-200 focus:ring-4 focus:ring-primary/5"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Short Overview (Card Hook)</label>
                                        <Textarea
                                            value={editingService.short_overview}
                                            onChange={e => setEditingService({ ...editingService, short_overview: e.target.value })}
                                            rows={2}
                                            placeholder="Enter a brief punchy overview..."
                                            className="text-sm font-medium rounded-xl border-slate-200 focus:ring-4 focus:ring-primary/5 transition-all resize-none p-4"
                                        />
                                    </div>

                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Long Description (Detail Page)</label>
                                        <Textarea
                                            value={editingService.long_overview}
                                            onChange={e => setEditingService({ ...editingService, long_overview: e.target.value })}
                                            rows={4}
                                            placeholder="Enter detailed service explanation..."
                                            className="text-sm font-medium rounded-xl border-slate-200 focus:ring-4 focus:ring-primary/5 transition-all resize-none p-4"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Interactive Content Groups */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <MoreHorizontal className="w-4 h-4 text-primary" />
                                        Common Challenges
                                    </h3>
                                    <StringArrayInput
                                        label="Challenges"
                                        values={editingService.problems || []}
                                        onChange={v => setEditingService({ ...editingService, problems: v })}
                                    />
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                        Why Choose Us
                                    </h3>
                                    <StringArrayInput
                                        label="Points"
                                        values={editingService.whyTrusComp || []}
                                        onChange={v => setEditingService({ ...editingService, whyTrusComp: v })}
                                    />
                                </div>
                            </div>

                            {/* Section 3: Features & Benefits */}
                            <div className="space-y-6 pt-6 border-t border-slate-100">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 border-b border-slate-100 pb-4">
                                    <ShieldCheck className="w-4 h-4 text-primary" />
                                    Features & Benefits
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Features */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Key Features</label>
                                            <Button variant="ghost" size="sm" onClick={() => setEditingService({ ...editingService, features: [...(editingService.features || []), { title: "", hint: "" }] })} className="h-6 text-xs text-primary font-bold">+ Add</Button>
                                        </div>
                                        <div className="space-y-4">
                                            {(editingService.features || []).map((feat, idx) => (
                                                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 group/item hover:border-primary/20 transition-all">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover/item:text-primary/40 transition-colors">Feature #{idx + 1}</span>
                                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" onClick={() => setEditingService({ ...editingService, features: editingService.features.filter((_, i) => i !== idx) })}><X className="w-4 h-4" /></Button>
                                                    </div>
                                                    <Input className="h-10 text-xs font-bold border-slate-200 rounded-lg focus:ring-4 focus:ring-primary/5 transition-all" placeholder="Feature Title" value={feat.title} onChange={e => {
                                                        const newFeats = [...editingService.features];
                                                        newFeats[idx] = { ...feat, title: e.target.value };
                                                        setEditingService({ ...editingService, features: newFeats });
                                                    }} />
                                                    <Input className="h-10 text-xs border-slate-200 rounded-lg focus:ring-4 focus:ring-primary/5 transition-all" placeholder="Description" value={feat.hint} onChange={e => {
                                                        const newFeats = [...editingService.features];
                                                        newFeats[idx] = { ...feat, hint: e.target.value };
                                                        setEditingService({ ...editingService, features: newFeats });
                                                    }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Benefits */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Benefits</label>
                                            <Button variant="ghost" size="sm" onClick={() => setEditingService({ ...editingService, benefits: [...(editingService.benefits || []), { keyword: "", text: "" }] })} className="h-6 text-xs text-primary font-bold">+ Add</Button>
                                        </div>
                                        <div className="space-y-4">
                                            {(editingService.benefits || []).map((ben, idx) => (
                                                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 group/item hover:border-emerald-200/50 transition-all">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover/item:text-emerald-500/40 transition-colors">Benefit #{idx + 1}</span>
                                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" onClick={() => setEditingService({ ...editingService, benefits: editingService.benefits.filter((_, i) => i !== idx) })}><X className="w-4 h-4" /></Button>
                                                    </div>
                                                    <Input className="h-10 text-xs font-bold border-slate-200 rounded-lg focus:ring-4 focus:ring-emerald-500/5 transition-all" placeholder="Benefit Title" value={ben.keyword} onChange={e => {
                                                        const newBens = [...editingService.benefits];
                                                        newBens[idx] = { ...ben, keyword: e.target.value };
                                                        setEditingService({ ...editingService, benefits: newBens });
                                                    }} />
                                                    <Input className="h-10 text-xs border-slate-200 rounded-lg focus:ring-4 focus:ring-emerald-500/5 transition-all" placeholder="Description" value={ben.text} onChange={e => {
                                                        const newBens = [...editingService.benefits];
                                                        newBens[idx] = { ...ben, text: e.target.value };
                                                        setEditingService({ ...editingService, benefits: newBens });
                                                    }} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="px-8 py-5 bg-slate-50 border-t border-slate-100 flex items-center justify-end shrink-0">
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="h-11 px-6 text-slate-500 font-bold uppercase text-[10px] tracking-widest hover:bg-slate-200">Cancel</Button>
                            <Button onClick={handleSave} disabled={isSaving} className="h-11 px-8 gap-2 bg-primary hover:bg-primary/90 text-white font-black uppercase text-[10px] tracking-widest rounded-xl shadow-xl shadow-primary/20">
                                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {isSaving ? "Saving..." : "Save Service"}
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Category Manager Modal (Standalone) */}
            <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
                <DialogContent className="max-w-md p-0 overflow-hidden rounded-2xl border-none shadow-2xl">
                    <DialogHeader className="px-6 py-4 bg-slate-900 flex flex-row items-center justify-between">
                        <DialogTitle className="text-white text-md font-black uppercase tracking-widest flex items-center gap-2">
                            <Tags className="w-4 h-4 text-primary" />
                            Category Manager
                        </DialogTitle>
                    </DialogHeader>
                    <div className="p-6 bg-[#F8FAFC] space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Add New Category</label>
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter category name..."
                                    value={newCategoryName}
                                    onChange={e => setNewCategoryName(e.target.value)}
                                    className="h-10 font-bold border-slate-200 rounded-xl"
                                    onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
                                />
                                <Button onClick={handleAddCategory} className="h-10 px-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">Add</Button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Existing Categories</label>
                            <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                                {categories.map((cat, idx) => (
                                    <div key={cat} className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-primary/30 transition-all group">
                                        {renamingIdx === idx ? (
                                            <div className="flex items-center gap-2 w-full animate-in slide-in-from-left-1 duration-200">
                                                <Input
                                                    value={tempCategoryName}
                                                    onChange={e => setTempCategoryName(e.target.value)}
                                                    className="h-9 text-xs font-bold border-primary/50"
                                                    autoFocus
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') handleRenameCategory(cat, tempCategoryName);
                                                        if (e.key === 'Escape') setRenamingIdx(null);
                                                    }}
                                                />
                                                <Button size="icon" variant="ghost" onClick={() => handleRenameCategory(cat, tempCategoryName)} className="h-9 w-9 text-emerald-600 bg-emerald-50 hover:bg-emerald-100"><CheckCircle2 className="w-4 h-4" /></Button>
                                                <Button size="icon" variant="ghost" onClick={() => setRenamingIdx(null)} className="h-9 w-9 text-slate-400 bg-slate-100 hover:bg-slate-200"><X className="w-4 h-4" /></Button>
                                            </div>
                                        ) : (
                                            <>
                                                <span className="text-sm font-bold text-slate-700">{cat}</span>
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/5"
                                                        onClick={() => {
                                                            setRenamingIdx(idx);
                                                            setTempCategoryName(cat);
                                                        }}
                                                        title="Rename Category"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-50"
                                                        onClick={() => handleDeleteCategory(cat)}
                                                        title="Delete Category"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </Button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

// Re-defining icons not in the core imports
const Save = ({ className }: { className?: string }) => <CheckCircle2 className={className} />;

export default ServicesManager;
