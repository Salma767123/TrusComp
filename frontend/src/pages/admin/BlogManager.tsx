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
    Upload,
    Image as ImageIcon,
    Type,
    CheckCircle2,
    Eye,
    Tags,
    Check,
    ChevronLeft,
    ChevronRight
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
import { useNavigation, CaptionProps } from "react-day-picker";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { authenticatedFetch } from "@/lib/utils";

// Editor configuration
const editorModules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'link'],
        [{ 'header': [2, 3, 4, false] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['clean']
    ],
};


interface Attachment {
    name: string;
    url: string;
}

interface Blog {
    id: number;
    title: string;
    slug: string;
    category: string;
    author: string;
    tags: string[];
    published_date: string;
    date_text: string | null;
    read_time: string | null;
    short_description: string;
    long_description: string;
    final_thoughts: string;
    banner_image: string | null;
    attachments: Attachment[];
    is_visible: boolean;
}

const BlogManager = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
    const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [uploadingBanner, setUploadingBanner] = useState(false);
    const [uploadingAttachments, setUploadingAttachments] = useState(false);

    // Dynamic Categories
    const [categories, setCategories] = useState<string[]>([
        "Articles", "Compliance Updates", "Expert Insights", "Technology", "Case Studies"
    ]);
    const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    // Category Management State
    const [renamingIdx, setRenamingIdx] = useState<number | null>(null);
    const [tempCategoryName, setTempCategoryName] = useState("");

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        setLoading(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await authenticatedFetch(`${apiBase}/blogs?include_hidden=true`, {
                // credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                // Parse JSONB fields
                const parsedData = data.map((item: any) => ({
                    ...item,
                    tags: typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags || [],
                    attachments: typeof item.attachments === 'string' ? JSON.parse(item.attachments) : item.attachments || []
                }));
                setBlogs(parsedData);

                // Extract unique categories from data
                const uniqueCats = Array.from(new Set(parsedData.map((item: any) => item.category))).filter(Boolean) as string[];
                setCategories(prev => Array.from(new Set([...prev, ...uniqueCats])).sort());
            }
        } catch (err) {
            toast.error("Connection failed");
        } finally {
            setLoading(false);
        }
    };

    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return;
        const newName = newCategoryName.trim();
        if (categories.includes(newName)) {
            toast.error("Category already exists");
            return;
        }
        const newList = [...categories, newName].sort();
        setCategories(newList);
        setNewCategoryName("");
        toast.success("Category added");
    };

    const handleRenameCategory = (oldName: string, newName: string) => {
        if (!newName.trim() || oldName === newName) {
            setRenamingIdx(null);
            return;
        }
        const newList = categories.map(c => c === oldName ? newName.trim() : c).sort();
        setCategories(newList);
        setRenamingIdx(null);
        toast.success("Category renamed");
        // Note: This only updates the dropdown list. Existing blogs with old category name are not updated here.
    };

    const handleDeleteCategory = (catName: string) => {
        if (!confirm(`Delete category "${catName}"?`)) return;
        const newList = categories.filter(c => c !== catName);
        setCategories(newList);
        toast.success("Category removed from list");
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    };

    const handleOpenModal = (blog?: Blog) => {
        if (blog) {
            setSelectedBlog({ ...blog });
        } else {
            const today = new Date().toISOString().split('T')[0];
            setSelectedBlog({
                id: 0,
                title: "",
                slug: "",
                category: "Articles",
                author: "TrusComp Editorial",
                tags: [],
                published_date: today,
                date_text: format(new Date(), "MMMM dd, yyyy"),
                read_time: "5 min read",
                short_description: "",
                long_description: "",
                final_thoughts: "",
                banner_image: null,
                attachments: [],
                is_visible: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        if (!selectedBlog) return;

        if (!selectedBlog.title || !selectedBlog.published_date) {
            toast.error("Title and Release Date are required");
            return;
        }

        setIsSaving(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await authenticatedFetch(`${apiBase}/blogs/upsert`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedBlog),
                // credentials: 'include'
            });

            if (response.ok) {
                toast.success(selectedBlog.id === 0 ? "Blog created" : "Blog saved");
                setIsModalOpen(false);
                fetchBlogs();
            } else {
                const errorData = await response.json();
                console.error("Save error:", errorData);
                toast.error(errorData.message || "Save operation failed");
            }
        } catch (err) {
            console.error("Save exception:", err);
            toast.error("Connection failed. Check console.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Permanently delete this blog?")) return;
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await authenticatedFetch(`${apiBase}/blogs/${id}`, {
                method: 'DELETE',
                // credentials: 'include'
            });
            if (response.ok) {
                toast.success("Blog deleted");
                fetchBlogs();
            }
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    const handleToggleVisibility = async (blog: Blog) => {
        const updatedBlog = { ...blog, is_visible: !blog.is_visible };
        setBlogs(prev => prev.map(b => b.id === blog.id ? updatedBlog : b));

        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            await authenticatedFetch(`${apiBase}/blogs/upsert`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedBlog),
                // credentials: 'include'
            });
        } catch (err) {
            setBlogs(prev => prev.map(b => b.id === blog.id ? blog : b));
            toast.error("Failed to update status");
        }
    };

    const handleBannerUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !selectedBlog) return;

        setUploadingBanner(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            toast.loading("Uploading banner...");
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await authenticatedFetch(`${apiBase}/upload`, {
                method: 'POST',
                body: formData,
                // credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setSelectedBlog({
                    ...selectedBlog,
                    banner_image: data.url
                });
                toast.dismiss();
                toast.success("Banner uploaded");
            } else {
                toast.dismiss();
                toast.error("Upload failed");
            }
        } catch (err) {
            toast.dismiss();
            toast.error("Upload error");
        } finally {
            setUploadingBanner(false);
        }
    };

    const handleAttachmentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files || files.length === 0 || !selectedBlog) return;

        setUploadingAttachments(true);
        try {
            toast.loading("Uploading attachments...");
            const newAttachments = [...selectedBlog.attachments];

            for (let i = 0; i < files.length; i++) {
                const formData = new FormData();
                formData.append('file', files[i]);
                const apiBase = import.meta.env.VITE_API_BASE_URL || "";
                const response = await authenticatedFetch(`${apiBase}/upload`, {
                    method: 'POST',
                    body: formData,
                    // credentials: 'include'
                });
                if (response.ok) {
                    const data = await response.json();
                    newAttachments.push({ name: files[i].name, url: data.url });
                }
            }

            setSelectedBlog({ ...selectedBlog, attachments: newAttachments });
            toast.dismiss();
            toast.success("Attachments uploaded");
        } catch (err) {
            toast.dismiss();
            toast.error("Some uploads failed");
        } finally {
            setUploadingAttachments(false);
        }
    };

    const filteredBlogs = blogs
        .filter(b => {
            const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === "All Categories" || b.category === selectedCategory;

            let matchesDate = true;
            if (dateFilter) {
                const blogDate = new Date(b.published_date);
                const filterDate = new Date(dateFilter);
                // Compare Year, Month, Day
                matchesDate =
                    blogDate.getFullYear() === filterDate.getFullYear() &&
                    blogDate.getMonth() === filterDate.getMonth() &&
                    blogDate.getDate() === filterDate.getDate();
            }

            return matchesSearch && matchesCategory && matchesDate;
        })
        .sort((a, b) => {
            // Always sort by release date descending (Newest First)
            return new Date(b.published_date).getTime() - new Date(a.published_date).getTime();
        });

    // Format date to DD-MM-YYYY for display
    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
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
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Blog Management</h1>
                    <p className="text-slate-500 text-xs mt-0.5">Website section: Updates & Articles</p>
                </div>
                <Button
                    onClick={() => handleOpenModal()}
                    size="sm"
                    className="h-9 px-4 gap-2 bg-primary hover:bg-primary/90 text-xs font-bold uppercase tracking-wider"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Create New Blog
                </Button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 h-10 text-sm border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="h-10 w-full md:w-[180px] text-xs font-medium bg-slate-50 border-slate-200 rounded-lg text-slate-600 shadow-sm transition-all hover:bg-slate-100">
                            <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200 shadow-xl max-h-[200px] overflow-y-auto">
                            <SelectItem value="All Categories" className="text-xs font-medium">All Categories</SelectItem>
                            {categories.map(cat => (
                                <SelectItem key={cat} value={cat} className="text-xs font-medium">{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "h-10 px-3 text-sm font-medium border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 gap-2 min-w-[140px] justify-between",
                                    dateFilter && "border-primary text-primary bg-primary/5"
                                )}
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
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

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-40">Release Date</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-40">Category</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest w-32">Status</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right w-24">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={5} className="px-4 py-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2"><RotateCw className="w-4 h-4 animate-spin" /> Loading Editorial Studio...</td></tr>
                        ) : filteredBlogs.length > 0 ? (
                            filteredBlogs.map((blog) => (
                                <tr key={blog.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-4 py-3"><p className="font-semibold text-slate-900 text-xs line-clamp-1" title={blog.title}>{blog.title}</p></td>
                                    <td className="px-4 py-3 text-xs text-slate-600 font-medium">{formatDate(blog.published_date)}</td>
                                    <td className="px-4 py-3 text-xs">
                                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-bold uppercase text-[9px]">{blog.category}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <Switch checked={blog.is_visible} onCheckedChange={() => handleToggleVisibility(blog)} title={blog.is_visible ? "Enabled" : "Disabled"} className="scale-75 data-[state=checked]:bg-emerald-500" />
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-primary" onClick={() => handleOpenModal(blog)}><Edit className="w-3.5 h-3.5" /></Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-500" onClick={() => handleDelete(blog.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={5} className="px-4 py-12 text-center text-slate-400 text-xs">No blogs found in the archive.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Create/Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-4xl p-0 overflow-hidden border-none shadow-2xl max-h-[90vh] flex flex-col">
                    <DialogHeader className="px-6 py-4 bg-slate-900 border-b border-white/10 shrink-0">
                        <DialogTitle className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                            {selectedBlog?.id === 0 ? <Plus className="w-4 h-4 text-primary" /> : <Edit className="w-4 h-4 text-primary" />}
                            {selectedBlog?.id === 0 ? "Create Blog" : "Edit Blog"}
                        </DialogTitle>
                    </DialogHeader>
                    {selectedBlog && (
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                            {/* Basic Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                                    <Type className="w-4 h-4 text-primary" />
                                    Blog Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Title *</label>
                                        <Input
                                            value={selectedBlog.title}
                                            onChange={(e) => setSelectedBlog({ ...selectedBlog, title: e.target.value })}
                                            className="h-9 text-xs font-bold"
                                            placeholder="e.g., The Future of Labour Compliance"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</label>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                type="button"
                                                onClick={() => setIsCategoryManagerOpen(true)}
                                                className="h-5 px-1.5 text-[9px] font-bold text-primary hover:bg-primary/5 uppercase tracking-wider"
                                            >
                                                Manage Categories
                                            </Button>
                                        </div>
                                        <Select
                                            value={selectedBlog.category}
                                            onValueChange={(v) => setSelectedBlog({ ...selectedBlog, category: v })}
                                        >
                                            <SelectTrigger className="h-9 w-full text-xs font-medium bg-white border border-slate-200 rounded-md outline-none">
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent className="max-h-60">
                                                {categories.map(cat => (
                                                    <SelectItem key={cat} value={cat} className="text-xs font-medium">{cat}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Release Date *</label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className={cn("w-full h-9 text-xs justify-start text-left font-normal border-slate-200", !selectedBlog.published_date && "text-slate-400")}>
                                                    <Calendar className="mr-2 h-3.5 w-3.5 text-slate-400" />
                                                    {selectedBlog.published_date || "Select Date"}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <CalendarComponent
                                                    mode="single"
                                                    selected={selectedBlog.published_date ? new Date(selectedBlog.published_date) : undefined}
                                                    onSelect={(date) => date && setSelectedBlog({
                                                        ...selectedBlog,
                                                        published_date: format(date, 'yyyy-MM-dd'),
                                                        date_text: format(date, 'MMMM dd, yyyy')
                                                    })}
                                                    initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Read Time</label>
                                        <Input
                                            value={selectedBlog.read_time || ""}
                                            onChange={(e) => setSelectedBlog({ ...selectedBlog, read_time: e.target.value })}
                                            className="h-9 text-xs"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Descriptions */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                                    <FileText className="w-4 h-4 text-primary" />
                                    Blog Content
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Short Description</label>
                                        <Textarea
                                            value={selectedBlog.short_description}
                                            onChange={(e) => setSelectedBlog({ ...selectedBlog, short_description: e.target.value })}
                                            rows={2}
                                            className="text-xs resize-none bg-slate-50/50"
                                            placeholder="Enter a brief summary..."
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Article Body (Rich Text)</label>
                                            <span className="text-[8px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded tracking-widest uppercase">WYSIWYG Mode</span>
                                        </div>
                                        <div className="prose-editor">
                                            <ReactQuill
                                                theme="snow"
                                                value={selectedBlog.long_description}
                                                onChange={(value) => setSelectedBlog({ ...selectedBlog, long_description: value })}
                                                modules={editorModules}
                                                className="bg-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Final Thoughts & Key Points</label>
                                        </div>
                                        <div className="prose-editor">
                                            <ReactQuill
                                                theme="snow"
                                                value={selectedBlog.final_thoughts}
                                                onChange={(value) => setSelectedBlog({ ...selectedBlog, final_thoughts: value })}
                                                modules={editorModules}
                                                className="bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Assets */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                                    <ImageIcon className="w-4 h-4 text-primary" />
                                    Media & Files
                                </h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Banner Image *</label>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className="relative group flex-1">
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleBannerUpload}
                                                        disabled={uploadingBanner}
                                                        className="h-14 opacity-0 absolute inset-0 z-10 cursor-pointer"
                                                    />
                                                    <div className="h-14 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-3 bg-slate-50 group-hover:bg-white group-hover:border-primary/50 transition-all">
                                                        {uploadingBanner ? <RotateCw className="w-5 h-5 animate-spin text-primary" /> : <Upload className="w-5 h-5 text-slate-400 group-hover:text-primary" />}
                                                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Asset</span>
                                                    </div>
                                                </div>
                                                {selectedBlog.banner_image && (
                                                    <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                                                        <img src={selectedBlog.banner_image} className="w-full h-full object-cover" />
                                                        <button
                                                            onClick={() => setSelectedBlog({ ...selectedBlog, banner_image: null })}
                                                            className="absolute top-0 right-0 bg-red-500 p-0.5 text-white hover:bg-red-600 shadow-lg"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Attachments</label>
                                        <div className="space-y-2">
                                            <div className="relative group">
                                                <Input
                                                    type="file"
                                                    multiple
                                                    onChange={handleAttachmentUpload}
                                                    disabled={uploadingAttachments}
                                                    className="h-14 opacity-0 absolute inset-0 z-10 cursor-pointer"
                                                />
                                                <div className="h-14 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center gap-3 bg-slate-50 group-hover:bg-white group-hover:border-primary/50 transition-all">
                                                    {uploadingAttachments ? <RotateCw className="w-5 h-5 animate-spin text-primary" /> : <Plus className="w-5 h-5 text-slate-400 group-hover:text-primary" />}
                                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Queue Assets</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedBlog.attachments.map((file, idx) => (
                                                    <div key={idx} className="flex items-center gap-1.5 bg-slate-100 rounded-full pl-3 pr-1 py-1 border border-slate-200">
                                                        <span className="text-[9px] font-bold text-slate-600 truncate max-w-[80px]">{file.name}</span>
                                                        <button onClick={() => setSelectedBlog({ ...selectedBlog, attachments: selectedBlog.attachments.filter((_, i) => i !== idx) })} className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="text-xs font-bold uppercase h-9">Cancel</Button>
                        <Button onClick={handleSave} disabled={isSaving} className="h-9 px-8 bg-primary text-xs font-bold uppercase shadow-xl shadow-primary/20">
                            {isSaving ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" /> Save</span>}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Category Manager Modal */}
            <Dialog open={isCategoryManagerOpen} onOpenChange={setIsCategoryManagerOpen}>
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

export default BlogManager;
