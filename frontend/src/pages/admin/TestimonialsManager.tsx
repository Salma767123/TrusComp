import React, { useState, useEffect } from "react";
import {
    Star,
    Plus,
    Search,
    Save,
    User,
    ChevronRight,
    ShieldCheck,
    MessageSquareQuote,
    RefreshCw,
    Trash2,
    Eye,
    EyeOff,
    Upload,
    ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import SplitView from "@/components/admin/SplitView";
import { cn } from "@/lib/utils";

interface Testimonial {
    id: number;
    client_name: string;
    designation: string;
    company: string;
    quote: string;
    engagement_type: string;
    rating: number;
    image_url?: string;
    is_visible: boolean;
    created_at?: string;
}

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedItem, setSelectedItem] = useState<Testimonial | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/testimonials`, { credentials: 'include' });
            if (response.ok) {
                const data = await response.json();
                setTestimonials(data);
                // If selected item exists, refresh it with new data
                if (selectedItem) {
                    const updatedItem = data.find((t: Testimonial) => t.id === selectedItem.id);
                    if (updatedItem) setSelectedItem(updatedItem);
                }
            }
        } catch (err) {
            toast.error("Failed to fetch testimonials");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!selectedItem) return;
        setIsSaving(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/testimonials/upsert`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedItem),
                credentials: 'include'
            });
            if (response.ok) {
                toast.success("Testimonial saved successfully");
                fetchData();
                // Select the new item if it was a create action
                const savedItem = await response.json();
                setSelectedItem(savedItem);
            } else {
                toast.error("Failed to save testimonial");
            }
        } catch (err) {
            toast.error("An error occurred while saving");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/testimonials/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                toast.success("Testimonial deleted");
                setSelectedItem(null);
                fetchData();
            }
        } catch (err) {
            toast.error("Failed to delete testimonial");
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !selectedItem) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/upload`, {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setSelectedItem({ ...selectedItem, image_url: data.url });
                toast.success("Image uploaded successfully");
            } else {
                toast.error("Image upload failed");
            }
        } catch (error) {
            toast.error("Error uploading image");
        } finally {
            setIsUploading(false);
        }
    };

    const filteredItems = testimonials.filter(item =>
        (item.client_name || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ListPanel = (
        <div className="flex flex-col h-full bg-slate-50/20 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between shrink-0">
                <div>
                    <h2 className="font-bold text-slate-900 leading-none">Reputation Desk</h2>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1.5">{testimonials.length} Testimonials</p>
                </div>
                <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full w-8 h-8 border-slate-200"
                    onClick={() => setSelectedItem({
                        id: 0,
                        client_name: "",
                        designation: "",
                        company: "",
                        quote: "",
                        engagement_type: "Global Compliance",
                        rating: 5,
                        image_url: "",
                        is_visible: true
                    })}
                >
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            <div className="p-4 border-b border-slate-100 bg-white/80 backdrop-blur shrink-0">
                <div className="relative group/search">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/search:text-primary transition-colors" />
                    <Input
                        placeholder="Search testimonials..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 h-9 bg-slate-50 border-none rounded-lg text-sm focus:ring-primary/10"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <div
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={cn(
                                "p-3 rounded-2xl cursor-pointer transition-all duration-300 border",
                                selectedItem?.id === item.id
                                    ? "bg-white border-primary/20 shadow-xl shadow-slate-200/50"
                                    : "bg-white/40 border-slate-50 hover:bg-white hover:border-slate-100"
                            )}
                        >
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0 overflow-hidden border border-slate-100 flex items-center justify-center text-slate-300">
                                    {item.image_url ? (
                                        <img src={item.image_url} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <User className="w-6 h-6" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <div className="flex items-center justify-between">
                                        <p className={cn(
                                            "font-bold text-xs truncate",
                                            selectedItem?.id === item.id ? "text-slate-900" : "text-slate-600"
                                        )}>{item.client_name || "New Testimonial"}</p>
                                        {!item.is_visible && (
                                            <EyeOff className="w-3 h-3 text-slate-300" />
                                        )}
                                    </div>
                                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{item.company || "No Company"}</p>
                                </div>
                                <ChevronRight className={cn(
                                    "w-3 h-3 self-center transition-transform",
                                    selectedItem?.id === item.id ? "text-primary translate-x-1" : "text-slate-200"
                                )} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-12 text-center text-slate-300">
                        <MessageSquareQuote className="w-12 h-12 mx-auto mb-3 opacity-10" />
                        <p className="text-[10px] font-bold uppercase tracking-widest">No testimonials found</p>
                    </div>
                )}
            </div>
        </div>
    );

    const ContentPanel = (
        <div className="flex flex-col h-full bg-white overflow-hidden">
            {!selectedItem ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-slate-200">
                    <ShieldCheck className="w-20 h-20 opacity-5" />
                    <p className="text-sm font-bold uppercase tracking-widest">Select a testimonial to edit</p>
                </div>
            ) : (
                <>
                    <div className="h-16 flex items-center justify-between px-8 border-b border-slate-100 shrink-0 bg-white">
                        <div className="flex items-center gap-4">
                            <Badge variant="outline" className="bg-slate-900 text-white border-slate-900 uppercase text-[9px] font-bold tracking-widest px-2 py-0.5">Testimonial Editor</Badge>
                            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                                {selectedItem.id === 0 ? "Create New" : "Edit Details"}
                            </h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 px-3 font-bold text-[10px] uppercase tracking-widest text-slate-500 hover:bg-slate-50"
                                onClick={() => setSelectedItem(null)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className={cn(
                                    "h-9 px-3 font-bold text-[10px] uppercase tracking-widest gap-2",
                                    selectedItem.is_visible ? "text-slate-500 hover:text-slate-700" : "text-amber-500 bg-amber-50"
                                )}
                                onClick={() => setSelectedItem({ ...selectedItem, is_visible: !selectedItem.is_visible })}
                            >
                                {selectedItem.is_visible ? (
                                    <><Eye className="w-4 h-4" /> Enabled</>
                                ) : (
                                    <><EyeOff className="w-4 h-4" /> Disabled</>
                                )}
                            </Button>
                            {selectedItem.id !== 0 && (
                                <Button
                                    variant="ghost"
                                    className="h-9 px-3 text-red-500 hover:bg-red-50 hover:text-red-600 font-bold text-[10px] uppercase tracking-widest"
                                    onClick={() => handleDelete(selectedItem.id)}
                                >
                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                </Button>
                            )}
                            <Button
                                size="sm"
                                className="h-9 gap-2 px-6 shadow-xl shadow-primary/10"
                                onClick={handleSave}
                                disabled={isSaving}
                            >
                                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Save
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/10">
                        <div className="mx-auto max-w-4xl p-8 space-y-8 py-12">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                {/* Left Column: Profile & Basics */}
                                <div className="md:col-span-4 space-y-6">
                                    {/* Profile Image Upload */}
                                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/50 text-center space-y-4">
                                        <div className="w-24 h-24 rounded-full bg-slate-100 mx-auto relative overflow-hidden group">
                                            {selectedItem.image_url ? (
                                                <img src={selectedItem.image_url} alt="Profile" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <User className="w-10 h-10" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <label className="cursor-pointer p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors">
                                                    <Upload className="w-5 h-5 text-white" />
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={handleFileUpload}
                                                        disabled={isUploading}
                                                    />
                                                </label>
                                            </div>
                                            {isUploading && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                    <RefreshCw className="w-6 h-6 text-white animate-spin" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Profile Image</p>
                                            <p className="text-[10px] text-slate-400 mt-1">Click image to upload</p>
                                        </div>
                                        <div className="flex justify-center gap-1 mt-4">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    type="button"
                                                    onClick={() => setSelectedItem({ ...selectedItem, rating: star })}
                                                    className="focus:outline-none"
                                                >
                                                    <Star className={cn(
                                                        "w-5 h-5 transition-colors",
                                                        star <= (selectedItem.rating || 5) ? "text-yellow-400 fill-yellow-400" : "text-slate-200 hover:text-yellow-200"
                                                    )} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <Input
                                                value={selectedItem.client_name}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, client_name: e.target.value })}
                                                className="h-10 text-sm font-bold"
                                                placeholder="e.g. John Doe"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Designation</label>
                                            <Input
                                                value={selectedItem.designation}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, designation: e.target.value })}
                                                className="h-10 text-sm"
                                                placeholder="e.g. HR Director"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Organization</label>
                                            <Input
                                                value={selectedItem.company}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, company: e.target.value })}
                                                className="h-10 text-sm"
                                                placeholder="e.g. Acme Corp"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Engagement Type</label>
                                            <Input
                                                value={selectedItem.engagement_type}
                                                onChange={(e) => setSelectedItem({ ...selectedItem, engagement_type: e.target.value })}
                                                className="h-10 text-sm"
                                                placeholder="e.g. Compliance Audit"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Content */}
                                <div className="md:col-span-8 space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Testimonial Content</label>
                                        <Textarea
                                            value={selectedItem.quote}
                                            onChange={(e) => setSelectedItem({ ...selectedItem, quote: e.target.value })}
                                            className="min-h-[400px] p-6 text-base leading-relaxed font-medium bg-white border-slate-200 rounded-3xl shadow-sm resize-none focus:ring-primary/10"
                                            placeholder="Enter the testimonial quote here..."
                                        />
                                    </div>
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
                    <p className="text-sm font-medium tracking-wide">Loading Testimonials...</p>
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

export default TestimonialsManager;
