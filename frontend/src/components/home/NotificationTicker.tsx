import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationItem {
    id: string;
    title: string;
    type: 'Labour Law' | 'Resource' | 'Blog';
    link: string;
    date: Date;
}

const NotificationTicker = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiBase = import.meta.env.VITE_API_BASE_URL || "/api/v1";
                const [labourRes, resourcesRes] = await Promise.all([
                    fetch(`${apiBase}/labour-law-updates`),
                    fetch(`${apiBase}/resources`)
                ]);

                let allItems: NotificationItem[] = [];

                if (labourRes.ok) {
                    const res = await labourRes.json();
                    const data = res.data || [];
                    allItems = [...allItems, ...data.map((item: any) => ({
                        id: `labour-${item.id}`,
                        title: item.title,
                        type: 'Labour Law' as const,
                        link: `/resources/monthly-labour-law/labour-${item.id}`,
                        date: new Date(item.release_date || item.createdAt || item.created_at)
                    }))];
                }

                if (resourcesRes.ok) {
                    const res = await resourcesRes.json();
                    const data = res.resources || [];
                    allItems = [...allItems, ...data.map((item: any) => ({
                        id: `resource-${item.id}`,
                        title: item.title,
                        type: 'Resource' as const,
                        link: item.category === "Labour Law Updates"
                            ? `/resources/monthly-labour-law/resource-${item.id}`
                            : `/resources/monthly-labour-law/${item.id}`,
                        date: new Date(item.release_date || item.createdAt || item.created_at)
                    }))];
                }

                // Sort by date descending
                allItems = allItems
                    .filter(item => !isNaN(item.date.getTime()))
                    .sort((a, b) => b.date.getTime() - a.date.getTime());

                setNotifications(allItems.slice(0, 10)); // Keep latest 10 for the ticker
            } catch (err) {
                console.error("Error fetching notifications for ticker:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading || notifications.length === 0) return null;

    return (
        <div className="bg-white border-b border-gray-100 relative overflow-hidden h-12 md:h-14 flex items-center">
            {/* Left Static Label - "Latest" */}
            <div className="absolute left-0 top-0 bottom-0 z-20 bg-white/95 backdrop-blur-sm border-r border-gray-100 flex items-center px-3 md:px-8 shadow-[10px_0_15px_-5px_rgba(0,0,0,0.02)]">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.15em] text-gray-500 whitespace-nowrap">
                        Latest
                    </span>
                </div>
            </div>

            {/* Scrolling Content Bar */}
            <div
                className="flex-1 overflow-hidden relative h-full flex items-center touch-pan-x"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    animate={{
                        x: isHovered ? undefined : ["0%", "-5%"]
                    }}
                    transition={{
                        duration: 5, // Slightly faster for horizontal
                        ease: "linear",
                        repeat: Infinity,
                        repeatType: "loop"
                    }}
                    className="flex items-center whitespace-nowrap gap-8 md:gap-12 pl-[100px] md:pl-[140px]"
                >
                    {/* Render notifications twice for seamless looping */}
                    {[...notifications, ...notifications].map((item, idx) => (
                        <Link
                            key={`${item.id}-${idx}`}
                            to={item.link}
                            className="flex items-center gap-2 group/item py-2"
                        >
                            <span className="text-sm md:text-base font-medium text-gray-700 group-hover/item:text-primary transition-colors flex items-center gap-2 min-w-max">
                                {item.title}
                                <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover/item:text-primary transition-all group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5" />
                            </span>
                            {/* Dot Separator */}
                            <div className="w-1 h-1 rounded-full bg-gray-200 mx-2 md:mx-4" />
                        </Link>
                    ))}
                </motion.div>
            </div>

            {/* Right Side Gradient Fade */}
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </div>
    );
};

export default NotificationTicker;
