import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    X,
    ArrowRight,
    Bell,
    Scale,
    FileText,
    BookOpen,
    PiggyBank,
    HeartPulse,
    IndianRupee,
    Wallet,
    Clock,
    RotateCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

interface UnifiedUpdate {
    id: string;
    title: string;
    summary: string;
    date: string;
    displayDate: string;
    category: string;
    type: 'resource' | 'labour-law' | 'blog';
    link: string;
    icon: any;
}

interface ComplianceUpdatesModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ComplianceUpdatesModal = ({ open, onOpenChange }: ComplianceUpdatesModalProps) => {
    const isMobile = useIsMobile();
    const [searchQuery, setSearchQuery] = useState("");
    const [cardsVisible, setCardsVisible] = useState(false);
    const [updates, setUpdates] = useState<UnifiedUpdate[]>([]);
    const [loading, setLoading] = useState(true);

    const formatRelativeTime = (dateStr: string) => {
        try {
            const now = new Date();
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) return "Recent";

            const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

            if (diffInSeconds < 60) return 'Just now';
            if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
            if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
            if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
            if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
            return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
        } catch (e) {
            return "Recent";
        }
    };

    const getIcon = (type: string, category: string) => {
        if (type === 'blog') return BookOpen;
        if (type === 'labour-law') return Bell;

        const cat = category.toLowerCase();
        if (cat.includes('pf')) return PiggyBank;
        if (cat.includes('esic')) return HeartPulse;
        if (cat.includes('wage')) return IndianRupee;
        if (cat.includes('lwf') || cat.includes('welfare')) return Wallet;
        if (cat.includes('leave') || cat.includes('hour') || cat.includes('clock')) return Clock;
        if (cat.includes('rule') || cat.includes('act')) return Scale;
        return FileText;
    };

    useEffect(() => {
        const fetchAllUpdates = async () => {
            setLoading(true);
            try {
                const apiBase = import.meta.env.VITE_API_BASE_URL || "";
                const [resResponse, lawResponse, blogResponse] = await Promise.all([
                    fetch(`${apiBase}/resources`),
                    fetch(`${apiBase}/labour-law-updates`),
                    fetch(`${apiBase}/blogs`)
                ]);

                let unified: UnifiedUpdate[] = [];

                if (resResponse.ok) {
                    const data = await resResponse.json();
                    const mapped = data
                        .filter((item: any) => item.is_visible && item.category !== 'Holidays List')
                        .map((item: any) => ({
                            id: `res-${item.id}`,
                            title: item.title,
                            summary: item.description,
                            date: item.release_date || item.created_at,
                            displayDate: formatRelativeTime(item.release_date || item.created_at),
                            category: item.category,
                            type: 'resource',
                            link: `/resources?category=${encodeURIComponent(item.category)}`,
                            icon: getIcon('resource', item.category)
                        }));
                    unified = [...unified, ...mapped];
                }

                if (lawResponse.ok) {
                    const data = await lawResponse.json();
                    const mapped = data.filter((item: any) => item.is_visible).map((item: any) => ({
                        id: `law-${item.id}`,
                        title: item.title,
                        summary: item.description,
                        date: item.release_date || item.created_at,
                        displayDate: formatRelativeTime(item.release_date || item.created_at),
                        category: 'Labour Law',
                        type: 'labour-law',
                        link: `/resources/monthly-labour-law/labour-${item.id}`,
                        icon: getIcon('labour-law', '')
                    }));
                    unified = [...unified, ...mapped];
                }

                if (blogResponse.ok) {
                    const data = await blogResponse.json();
                    const mapped = data.filter((item: any) => item.is_visible).map((item: any) => ({
                        id: `blog-${item.id}`,
                        title: item.title,
                        summary: item.short_description,
                        date: item.published_date || item.created_at,
                        displayDate: formatRelativeTime(item.published_date || item.created_at),
                        category: item.category || 'Article',
                        type: 'blog',
                        link: `/blog/${item.slug || item.id}`,
                        icon: getIcon('blog', '')
                    }));
                    unified = [...unified, ...mapped];
                }

                // Sort by date DESC
                unified.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setUpdates(unified);
            } catch (err) {
                console.error("Failed to fetch unified updates:", err);
            } finally {
                setLoading(false);
            }
        };

        if (open) {
            fetchAllUpdates();
            const timer = setTimeout(() => setCardsVisible(true), 200);
            return () => clearTimeout(timer);
        } else {
            setCardsVisible(false);
            setSearchQuery("");
        }
    }, [open]);

    const filteredUpdates = updates.filter(update =>
        update.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        update.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        update.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        update.type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const ModalContent = () => (
        <div className="flex flex-col h-full max-h-[70vh] md:max-h-[600px]">
            {/* Header */}
            <div className="px-6 pt-8 pb-6">
                {/* Title with animated underline */}
                <h2 className="text-xl md:text-2xl font-display font-bold text-foreground relative inline-block mb-3">
                    Latest Compliance & Labor Law Updates
                    <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-primary to-amber-400 origin-left" />
                </h2>

                <p className="text-sm text-muted-foreground mb-6">
                    Stay ahead of statutory changes that impact your business.
                </p>

                {/* Search Bar (Top Priority) */}
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
                    <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by PF, ESIC, Payroll, Audit…"
                        className={cn(
                            "pl-10 pr-4 h-11 bg-secondary/50 border-border rounded-full transition-all duration-300",
                            "focus:ring-2 focus:ring-primary/20 focus:border-primary/40 focus:bg-background focus:shadow-[0_0_15px_rgba(var(--primary),0.1)]",
                            "placeholder:text-muted-foreground/60"
                        )}
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full transition-colors"
                        >
                            <X className="w-3 h-3 text-muted-foreground" />
                        </button>
                    )}
                </div>
            </div>

            {/* Updates list */}
            <ScrollArea className="flex-1 px-6">
                <div className="space-y-4 pb-6">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <RotateCw className="w-8 h-8 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground animate-pulse">Synchronizing update feed...</p>
                        </div>
                    ) : filteredUpdates.length > 0 ? (
                        filteredUpdates.map((update, index) => (
                            <div
                                key={update.id}
                                className={cn(
                                    "group relative p-4 rounded-xl bg-card border border-border/50",
                                    "transition-all duration-500 ease-out",
                                    "hover:shadow-medium hover:border-primary/20",
                                    "cursor-pointer overflow-hidden",
                                    // Stagger animation
                                    cardsVisible
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-4",
                                )}
                                style={{
                                    transitionDelay: cardsVisible ? `${index * 50}ms` : "0ms",
                                }}
                            >
                                {/* Subtle background glow on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative flex gap-4">
                                    {/* Icon */}
                                    <div className={cn(
                                        "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
                                        "bg-secondary/50 text-primary transition-all duration-300",
                                        "group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110"
                                    )}>
                                        <update.icon className="w-6 h-6" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1.5">
                                            <h3 className="font-display font-semibold text-foreground text-sm md:text-base leading-tight">
                                                {update.title}
                                            </h3>
                                            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70 bg-secondary/50 px-2 py-0.5 rounded-full">
                                                {update.displayDate}
                                            </span>
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 leading-relaxed">
                                            {update.summary}
                                        </p>
                                        <Link
                                            to={update.link}
                                            onClick={() => onOpenChange(false)}
                                            className={cn(
                                                "inline-flex items-center gap-1.5 text-xs font-semibold text-primary",
                                                "transition-all duration-300",
                                                "hover:gap-2.5"
                                            )}
                                        >
                                            Read more
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-12 text-center">
                            <p className="text-muted-foreground text-sm">No updates found matching your search.</p>
                        </div>
                    )}
                </div>
            </ScrollArea>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-border/50 bg-secondary/5">
                <Button
                    asChild
                    className={cn(
                        "w-full h-12 bg-primary text-primary-foreground font-display font-bold",
                        "transition-all duration-300",
                        "hover:shadow-glow hover:-translate-y-1 active:scale-[0.98]"
                    )}
                >
                    <Link to="/resources" onClick={() => onOpenChange(false)}>
                        View All Updates
                        <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
            </div>
        </div>
    );

    // Mobile: Use Drawer (bottom sheet)
    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent className={cn(
                    "max-h-[90vh]",
                    "bg-card/95 backdrop-blur-xl",
                    "border-t border-border/50"
                )}>
                    <DrawerHeader className="sr-only">
                        <DrawerTitle>Compliance Updates</DrawerTitle>
                        <DrawerDescription>Latest labor law and compliance updates</DrawerDescription>
                    </DrawerHeader>
                    <ModalContent />
                </DrawerContent>
            </Drawer>
        );
    }

    // Desktop: Use Dialog
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={cn(
                "max-w-xl p-0 gap-0 overflow-hidden",
                "bg-card/95 backdrop-blur-xl",
                "border border-border/30",
                "shadow-[0_20px_50px_rgba(0,0,0,0.2)]",
                "data-[state=open]:animate-in data-[state=closed]:animate-out",
                "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
                "data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95",
                "data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2",
            )}>
                <DialogHeader className="sr-only">
                    <DialogTitle>Compliance Updates</DialogTitle>
                    <DialogDescription>Latest labor law and compliance updates</DialogDescription>
                </DialogHeader>
                <ModalContent />
            </DialogContent>
        </Dialog>
    );
};

export default ComplianceUpdatesModal;
