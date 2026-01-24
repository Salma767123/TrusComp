import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Save,
    Globe,
    Search,
    Layout,
    RefreshCw,
    ChevronRight,
    X,
    Plus,
    FileCode,
    ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import SplitView from '@/components/admin/SplitView';
import { Badge } from '@/components/ui/badge';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { authenticatedFetch } from "@/lib/utils";

interface DiscoveryItem {
    id: string;
    label: string;
    type: string;
    reference_id: string | null;
    children?: DiscoveryItem[];
}

const SEOManager = () => {
    const [discoveryData, setDiscoveryData] = useState<DiscoveryItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<DiscoveryItem | null>(null);
    const [subSelectionId, setSubSelectionId] = useState<string>('');
    const [isFetching, setIsFetching] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [keywordInput, setKeywordInput] = useState('');

    const [seoData, setSeoData] = useState({
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
        og_title: '',
        og_description: '',
        og_image: '',
        twitter_title: '',
        twitter_description: '',
        schema_type: 'Organization',
        status: 'published'
    });

    const keywords = typeof seoData.meta_keywords === 'string' ? seoData.meta_keywords.split(',').filter(k => k.trim()) : [];

    const fetchDiscovery = async () => {
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await authenticatedFetch(`${apiBase}/seo/discovery`, {
                // credentials: 'include'
            });
            const data = await response.json();

            // Defensive: Ensure data is an array
            const safeData = Array.isArray(data) ? data : [];
            setDiscoveryData(safeData);

            if (safeData.length > 0 && !selectedItem) {
                setSelectedItem(safeData[0]);
            }
        } catch (err) {
            console.error("Discovery fetch error:", err);
            toast.error('Failed to load page list');
            setDiscoveryData([]); // Fallback to empty array
        }
    };

    // Determine the active item to fetch/save SEO for
    const getActiveSEOItem = () => {
        if (!selectedItem) return null;
        if (selectedItem.type === 'collection' && subSelectionId) {
            return selectedItem.children?.find(c => c.id === subSelectionId) || null;
        }
        if (selectedItem.type === 'collection' && !subSelectionId) {
            return null; // Return null if collection selected but no child selected
        }
        return selectedItem;
    };

    const fetchSEO = async (item: DiscoveryItem) => {
        setIsFetching(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const url = new URL(`${apiBase}/seo`);

            const pageType = item.type === 'static' ? item.id : item.type;
            url.searchParams.append('page_type', pageType || '');

            if (item.reference_id) {
                url.searchParams.append('page_reference_id', item.reference_id);
            }

            const response = await authenticatedFetch(url.toString(), {
                // credentials: 'include'
            });
            const data = await response.json();

            if (data) {
                setSeoData({
                    meta_title: String(data.meta_title || ''),
                    meta_description: String(data.meta_description || ''),
                    meta_keywords: String(data.meta_keywords || ''),
                    og_title: String(data.og_title || ''),
                    og_description: String(data.og_description || ''),
                    og_image: String(data.og_image || ''),
                    twitter_title: String(data.twitter_title || ''),
                    twitter_description: String(data.twitter_description || ''),
                    schema_type: String(data.schema_type || 'Organization'),
                    status: String(data.status || 'published')
                });
            } else {
                setSeoData({
                    meta_title: '',
                    meta_description: '',
                    meta_keywords: '',
                    og_title: '',
                    og_description: '',
                    og_image: '',
                    twitter_title: '',
                    twitter_description: '',
                    schema_type: 'Organization',
                    status: 'published'
                });
            }
        } catch (err) {
            console.error("SEO fetch error:", err);
            toast.error('Failed to load SEO data');
        } finally {
            setIsFetching(false);
        }
    };

    useEffect(() => {
        fetchDiscovery();
    }, []);

    // Effect to handle selection changes
    useEffect(() => {
        const activeItem = getActiveSEOItem();
        if (activeItem) {
            fetchSEO(activeItem);
        } else {
            // Reset if waiting for dropdown selection
            setSeoData({
                meta_title: '',
                meta_description: '',
                meta_keywords: '',
                og_title: '',
                og_description: '',
                og_image: '',
                twitter_title: '',
                twitter_description: '',
                schema_type: 'Organization',
                status: 'published'
            });
        }
    }, [selectedItem, subSelectionId]);

    // Reset sub-selection when main selection changes
    useEffect(() => {
        if (selectedItem?.children && selectedItem.children.length > 0) {
            setSubSelectionId("");
        } else {
            setSubSelectionId("");
        }
    }, [selectedItem]);

    const handleSave = async () => {
        const activeItem = getActiveSEOItem();
        if (!activeItem) return;

        setIsSaving(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const page_type = activeItem.type === 'static' ? activeItem.id : activeItem.type;
            const response = await authenticatedFetch(`${apiBase}/seo/upsert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...seoData,
                    page_type,
                    page_reference_id: activeItem.reference_id
                })
            });

            if (response.ok) {
                toast.success('SEO metadata saved successfully');
            } else {
                toast.error('Failed to save SEO metadata');
            }
        } catch (err) {
            toast.error('Error connecting to server');
        } finally {
            setIsSaving(false);
        }
    };

    const addKeyword = () => {
        if (!keywordInput.trim()) return;
        const newKeywords = [...keywords, keywordInput.trim()];
        setSeoData({ ...seoData, meta_keywords: newKeywords.join(', ') });
        setKeywordInput('');
    };

    const removeKeyword = (index: number) => {
        const newKeywords = keywords.filter((_, i) => i !== index);
        setSeoData({ ...seoData, meta_keywords: newKeywords.join(', ') });
    };

    const ListPanel = (
        <div className="flex flex-col h-full bg-slate-50/50">
            <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Search className="w-4 h-4" />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-900 text-sm">Target Pages</h2>
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Select page to optimize</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
                {Array.isArray(discoveryData) && discoveryData.length > 0 ? (
                    discoveryData.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setSelectedItem(item)}
                            className={cn(
                                "w-full text-left p-3 rounded-lg transition-all duration-200 group flex items-start gap-3",
                                selectedItem?.id === item.id
                                    ? "bg-white border border-slate-200 shadow-sm"
                                    : "hover:bg-slate-100/50 border border-transparent"
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-md flex items-center justify-center shrink-0 transition-colors",
                                selectedItem?.id === item.id ? "bg-primary text-white" : "bg-slate-200 text-slate-400 group-hover:bg-slate-300"
                            )}>
                                <Layout className="w-4 h-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className={cn(
                                    "font-bold text-xs truncate",
                                    selectedItem?.id === item.id ? "text-slate-900" : "text-slate-600"
                                )}>{item.label}</p>
                                <Badge variant="outline" className="text-[9px] h-4 px-1 text-slate-400 uppercase font-bold mt-1">
                                    {item.type === 'collection' ? 'Dynamic List' : item.type}
                                </Badge>
                            </div>
                            {selectedItem?.id === item.id && (
                                <ChevronRight className="w-3.5 h-3.5 text-primary ml-auto mt-1" />
                            )}
                        </button>
                    ))
                ) : (
                    <div className="p-4 text-center text-slate-400 text-xs">
                        {isFetching && discoveryData.length === 0 ? "Loading pages..." : "No pages found."}
                    </div>
                )}
            </div>
        </div>
    );

    const activeItem = getActiveSEOItem();
    const isCollectionSelected = selectedItem?.type === 'collection';

    const ContentPanel = (
        <div className="flex flex-col h-full bg-white">
            <div className="h-16 flex items-center justify-between px-8 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-primary" />
                        <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">SEO Hub</h2>
                    </div>
                    {selectedItem && (
                        <div className="h-4 w-[1px] bg-slate-200 mx-2" />
                    )}
                    {selectedItem && (
                        <span className="text-xs font-medium text-slate-500 truncate max-w-[300px]">
                            Optimizing: <span className="text-slate-900 font-bold">{isCollectionSelected && !subSelectionId ? "Select Item..." : activeItem?.label}</span>
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <Button size="sm" onClick={handleSave} disabled={isSaving || !activeItem} className="h-9 gap-2 shadow-sm">
                        {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {isSaving ? 'Saving...' : 'Save Meta Data'}
                    </Button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {selectedItem ? (
                    <div className="p-10 space-y-12 max-w-4xl mx-auto">

                        {/* Dynamic Dropdown for Collections */}
                        {isCollectionSelected && selectedItem.children && (
                            <div className="space-y-2 max-w-md animate-in fade-in slide-in-from-top-4 duration-300">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                                    Select {selectedItem.label} Page
                                </label>
                                <Select value={subSelectionId} onValueChange={setSubSelectionId}>
                                    <SelectTrigger className="h-10 font-bold text-slate-700 bg-slate-50 border-slate-200">
                                        <SelectValue placeholder={`Choose ${selectedItem.label}...`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {selectedItem.children.map(child => (
                                            <SelectItem key={child.id} value={child.id} className="font-medium text-xs">
                                                {child.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}

                        {activeItem ? (
                            <section className="space-y-8 animate-in fade-in duration-500">
                                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                                    <FileCode className="w-4 h-4 text-primary" />
                                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest leading-none font-enterprise">Search Metadata</h3>
                                </div>

                                <div className="grid gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Meta Title (H1)</label>
                                        <Input
                                            value={seoData.meta_title}
                                            onChange={(e) => setSeoData({ ...seoData, meta_title: e.target.value })}
                                            placeholder="Enter SEO title..."
                                            className="font-bold text-slate-900 h-12 border-slate-200 text-base"
                                        />
                                        <div className="flex justify-between px-1">
                                            <span className="text-[10px] text-slate-400 font-medium italic">Recommended 50–60 characters</span>
                                            <span className={cn("text-[10px] font-bold", seoData.meta_title.length > 60 ? "text-rose-500" : "text-slate-400")}>
                                                {seoData.meta_title.length}/60
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Meta Description</label>
                                        <Textarea
                                            rows={4}
                                            value={seoData.meta_description}
                                            onChange={(e) => setSeoData({ ...seoData, meta_description: e.target.value })}
                                            placeholder="Enter SEO description..."
                                            className="font-medium text-slate-700 border-slate-200 min-h-[120px] resize-none text-sm leading-relaxed"
                                        />
                                        <div className="flex justify-between px-1">
                                            <span className="text-[10px] text-slate-400 font-medium italic">Recommended 150–160 characters</span>
                                            <span className={cn("text-[10px] font-bold", seoData.meta_description.length > 160 ? "text-rose-500" : "text-slate-400")}>
                                                {seoData.meta_description.length}/160
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Meta Keywords</label>
                                        <div className="flex gap-2">
                                            <Input
                                                value={keywordInput}
                                                onChange={(e) => setKeywordInput(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' && addKeyword()}
                                                placeholder="Add a focus keyword..."
                                                className="h-10 border-slate-200 text-sm font-medium"
                                            />
                                            <Button
                                                onClick={addKeyword}
                                                variant="secondary"
                                                className="shrink-0 h-10 px-4 gap-2"
                                            >
                                                <Plus className="w-4 h-4" />
                                                Add
                                            </Button>
                                        </div>
                                        <div className="flex justify-between px-1 mt-1">
                                            <span className="text-[10px] text-slate-400 font-medium italic">Separate keywords with commas</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {keywords.length > 0 ? (
                                                keywords.map((keyword, index) => (
                                                    <Badge
                                                        key={index}
                                                        variant="secondary"
                                                        className="pl-3 pr-1 py-1 gap-2 bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 font-medium"
                                                    >
                                                        {keyword}
                                                        <button
                                                            onClick={() => removeKeyword(index)}
                                                            className="w-5 h-5 rounded-md hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center transition-colors"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </Badge>
                                                ))
                                            ) : (
                                                <span className="text-[10px] text-slate-400 italic px-1">No keywords added yet.</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-100 rounded-2xl">
                                <div className="text-slate-300 mb-2">
                                    <Search className="w-8 h-8 opacity-50" />
                                </div>
                                <p className="text-slate-500 text-sm font-medium">
                                    {isCollectionSelected
                                        ? "Select a specific page from the dropdown above to start editing."
                                        : "Select a page to optimize."}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 mb-4 animate-pulse">
                            <Globe className="w-8 h-8" />
                        </div>
                        <h3 className="text-slate-900 font-bold">No Page Selected</h3>
                        <p className="text-slate-500 text-sm mt-1 max-w-xs">Please select a page from the list on the left to start optimizing it for search engines.</p>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="h-full bg-white">
            <SplitView
                list={ListPanel}
                content={ContentPanel}
                listWidth="w-[300px]"
            />
        </div>
    );
};

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

export default SEOManager;
