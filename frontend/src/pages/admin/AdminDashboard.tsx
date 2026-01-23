import { motion } from "framer-motion";
import {
    Briefcase,
    MessageSquare,
    FileText,
    Zap,
    TrendingUp,
    TrendingDown,
    Clock,
    ArrowUpRight,
    Search,
    Filter,
    MoreHorizontal,
    Plus,
    CheckCircle2,
    AlertCircle,
    Calendar,
    PieChart as PieChartIcon
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    PieChart,
    Pie,
    // Title,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from 'recharts';

interface DashboardStats {
    metrics: {
        totalServices: number;
        totalLabourLaws: { count: number; lastUpdated: string | null };
        totalBlogs: { count: number; lastUpdated: string | null };
        totalEnquiries: number;
    };
    chart: {
        new: number;
        contacted: number;
        confirmed: number;
        closed: number;
        cancelled: number;
    };
    recentEnquiries: any[];
}


const KPICard = ({ title, value, lastUpdated, icon: Icon, color, onClick }: any) => (
    <Card
        onClick={onClick}
        className={`border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 ${onClick ? 'cursor-pointer' : ''}`}
    >
        <CardContent className="p-6">
            <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} bg-opacity-10`}>
                    <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
                </div>
            </div>
            <div className="mt-4">
                <p className="text-sm font-medium text-slate-500">{title}</p>
                {/* Visual helper label for active status */}
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider mb-0.5">Active</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-0">{value}</h3>
                {lastUpdated && (
                    <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Updated: {new Date(lastUpdated).toLocaleDateString()}
                    </p>
                )}
            </div>
        </CardContent>
    </Card>
);

const cn = (...classes: any[]) => classes.filter(Boolean).join(' ');

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [statsData, setStatsData] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [timeFilter, setTimeFilter] = useState('this_week');

    const fetchStats = async () => {
        setLoading(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/admin/dashboard/stats?filter=${timeFilter}`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setStatsData(data);
            }
        } catch (err) {
            console.error('Failed to fetch dashboard stats:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, [timeFilter]);

    const kpis = [
        {
            title: "Total Services",
            value: statsData?.metrics.totalServices || 0,
            icon: Briefcase,
            color: "bg-blue-500",
            path: "/admin/services"
        },
        {
            title: "Labour Law Updates",
            value: statsData?.metrics.totalLabourLaws.count || 0,
            lastUpdated: statsData?.metrics.totalLabourLaws.lastUpdated,
            icon: Zap,
            color: "bg-orange-500",
            path: "/admin/labour-law-updates"
        },
        {
            title: "Total Blogs",
            value: statsData?.metrics.totalBlogs.count || 0,
            lastUpdated: statsData?.metrics.totalBlogs.lastUpdated,
            icon: FileText,
            color: "bg-emerald-500",
            path: "/admin/blogs"
        },
        {
            title: "Total Enquiries",
            value: statsData?.metrics.totalEnquiries || 0,
            icon: MessageSquare,
            color: "bg-purple-500",
            path: "/admin/enquiries"
        },
    ];

    const chartData = [
        { name: 'New', value: statsData?.chart.new || 0, color: '#f97316' }, // Orange
        { name: 'Contacted', value: statsData?.chart.contacted || 0, color: '#3b82f6' }, // Blue
        { name: 'Confirmed', value: statsData?.chart.confirmed || 0, color: '#10b981' }, // Emerald
        { name: 'Closed', value: statsData?.chart.closed || 0, color: '#ef4444' }, // Red (Reusing existing red color as requested, or should I change? User said "Do not modify... colors". So keeping red.)
    ];

    if (loading && !statsData) {
        return (
            <div className="h-full flex flex-col items-center justify-center gap-4">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 text-sm font-medium">Syncing Data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-24">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Overview</h1>
                    <p className="text-slate-500 text-sm">Monitor your organization's performance and inquiries.</p>
                </div>
            </div>

            {/* KPI Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, i) => (
                    <KPICard
                        key={i}
                        {...kpi}
                        onClick={() => navigate(kpi.path)}
                    />
                ))}
            </div>

            {/* Main Section: Chart & Activity */}
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Recent Enquiries (Left - 2 Cols) */}
                <div className="lg:col-span-2">
                    <Card className="border-slate-200 h-full">
                        <CardHeader className="flex flex-row items-center justify-between p-6 pb-2">
                            <div>
                                <CardTitle className="text-lg">Recent Enquiries</CardTitle>
                                <CardDescription>Latest 4 inquiries received.</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary gap-1" onClick={() => navigate('/admin/enquiries')}>
                                View All <ArrowUpRight className="w-4 h-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-slate-100">
                                {(statsData?.recentEnquiries || []).length > 0 ? (
                                    statsData?.recentEnquiries.map((enquiry, i) => (
                                        <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold uppercase shrink-0">
                                                    {enquiry.name?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">{enquiry.name}</p>
                                                    <p className="text-xs text-slate-400 capitalize">{enquiry.service_interest || 'General Inquiry'}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="hidden sm:block text-right">
                                                    <p className="text-xs font-bold text-slate-500">{new Date(enquiry.created_at).toLocaleDateString()}</p>
                                                </div>
                                                <Badge className={cn(
                                                    "px-2 py-0.5 text-[10px] font-bold uppercase",
                                                    enquiry.status === 'new' ? "bg-orange-100 text-orange-600" :
                                                        enquiry.status === 'contacted' ? "bg-blue-100 text-blue-600" :
                                                            enquiry.status === 'confirmed' ? "bg-emerald-100 text-emerald-600" :
                                                                "bg-slate-100 text-slate-600"
                                                )}>
                                                    {enquiry.status}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-12 text-center text-slate-400">
                                        <MessageSquare className="w-10 h-10 mx-auto opacity-20 mb-4" />
                                        <p className="text-sm font-medium">No recent enquiries found.</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Status Chart (Rights - 1 Col) - Pie Chart Update */}
                <div className="space-y-8">
                    <Card className="border-slate-200 h-full flex flex-col">
                        <CardHeader className="p-6 pb-2">
                            <div className="flex items-center justify-between mb-2">
                                <CardTitle className="text-lg">Status Analytics</CardTitle>
                                <Select value={timeFilter} onValueChange={setTimeFilter}>
                                    <SelectTrigger className="w-[120px] h-8 text-xs">
                                        <SelectValue placeholder="Period" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="this_week">This Week</SelectItem>
                                        <SelectItem value="last_week">Last Week</SelectItem>
                                        <SelectItem value="this_month">This Month</SelectItem>
                                        <SelectItem value="last_month">Last Month</SelectItem>
                                        <SelectItem value="last_6_months">Last 6 Months</SelectItem>
                                        <SelectItem value="last_year">Last 1 Year</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <CardDescription>Visual breakdown of all enquiry statuses.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 pt-4 flex-1 min-h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend
                                        verticalAlign="bottom"
                                        height={36}
                                        formatter={(value) => <span className="text-slate-600 text-xs font-medium ml-1">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
