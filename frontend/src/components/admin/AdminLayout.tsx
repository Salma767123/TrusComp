import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    MessageSquare,
    Briefcase,
    FileText,
    Zap,
    Star,
    Calendar,
    Settings,
    Globe,
    BookOpen,
    ChevronLeft,
    ChevronRight,
    LogOut,
    User,
    Search,
    Menu,
    X,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logo from "@/assets/truscomp-logo.webp";
import { useSettings } from "@/hooks/useSettings";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemProps {
    icon: any;
    label: string;
    path: string;
    active: boolean;
    collapsed: boolean;
}

const NavItem = ({ icon: Icon, label, path, active, collapsed }: NavItemProps) => {
    const content = (
        <Link to={path}>
            <div className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative",
                active
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
                collapsed && "justify-center px-2"
            )}>
                <Icon className={cn("w-5 h-5 shrink-0", active ? "text-primary" : "text-slate-400 group-hover:text-slate-600")} />
                {!collapsed && <span className="text-sm truncate">{label}</span>}
            </div>
        </Link>
    );

    if (collapsed) {
        return (
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    {content}
                </TooltipTrigger>
                <TooltipContent side="right" className="bg-slate-900 text-white border-slate-800">
                    <p>{label}</p>
                </TooltipContent>
            </Tooltip>
        );
    }

    return content;
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { data: settings } = useSettings();

    const navItems = [
        { label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
        { label: "Enquiries & Leads", icon: MessageSquare, path: "/admin/enquiries" },
        { label: "Services", icon: Briefcase, path: "/admin/services" },
        { label: "Resource Center", icon: FileText, path: "/admin/resources" },
        { label: "Labour Law Updates", icon: BookOpen, path: "/admin/labour-law-updates" },
        { label: "Blog Management", icon: FileText, path: "/admin/blogs" },
        { label: "Testimonials", icon: Star, path: "/admin/testimonials" },
        { label: "SEO Manager", icon: Globe, path: "/admin/seo" },
        { label: "System Settings", icon: Settings, path: "/admin/settings" },
    ];

    const currentPath = location.pathname;

    return (
        <TooltipProvider>
            <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
                {/* Desktop Sidebar */}
                <aside className={cn(
                    "hidden lg:flex flex-col border-r border-slate-200 bg-white transition-all duration-300 relative",
                    collapsed ? "w-[72px]" : "w-64"
                )}>
                    {/* Sidebar Header */}
                    <div className={cn("h-16 flex items-center border-b border-slate-100 transition-all", collapsed ? "justify-center px-0" : "px-6")}>
                        <Link to="/admin/dashboard" className="flex items-center gap-3 overflow-hidden relative">
                            {/* Full Logo (Expanded) */}
                            <img
                                src={settings?.dashboard_logo || logo}
                                alt="TrusComp Logo"
                                className={cn(
                                    "h-8 w-auto transition-all duration-300 object-contain",
                                    collapsed ? "opacity-0 w-0 absolute left-0" : "opacity-100 w-auto"
                                )}
                            />

                            {/* Icon Logo (Collapsed) */}
                            <div className={cn(
                                "w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0 transition-all duration-300",
                                collapsed ? "opacity-100 scale-100" : "opacity-0 scale-0 w-0 absolute"
                            )}>
                                <ShieldCheck className="w-5 h-5 text-white" />
                            </div>
                        </Link>
                    </div>

                    {/* Sidebar Navigation */}
                    <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.path}
                                {...item}
                                active={currentPath === item.path}
                                collapsed={collapsed}
                            />
                        ))}
                    </div>

                    {/* Sidebar Footer */}
                    <div className="p-3 border-t border-slate-100 space-y-1">
                        <button
                            onClick={() => setCollapsed(!collapsed)}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-all",
                                collapsed && "justify-center px-2"
                            )}
                        >
                            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                            {!collapsed && <span className="text-sm">Collapse Menu</span>}
                        </button>

                        <button
                            onClick={() => navigate("/")}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 transition-all",
                                collapsed && "justify-center px-2"
                            )}
                        >
                            <LogOut className="w-5 h-5" />
                            {!collapsed && <span className="text-sm font-medium">Sign Out</span>}
                        </button>
                    </div>
                </aside>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.4 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileMenuOpen(false)}
                                className="fixed inset-0 bg-black z-40 lg:hidden"
                            />
                            <motion.aside
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed inset-y-0 left-0 w-72 bg-white z-50 lg:hidden flex flex-col shadow-2xl"
                            >
                                <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100">
                                    <Link to="/admin/dashboard" className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                            <ShieldCheck className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="font-bold text-lg text-slate-900 tracking-tight">TrusComp OS</span>
                                    </Link>
                                    <X className="w-6 h-6 text-slate-400 cursor-pointer" onClick={() => setMobileMenuOpen(false)} />
                                </div>
                                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                                    {navItems.map((item) => (
                                        <NavItem
                                            key={item.path}
                                            {...item}
                                            active={currentPath === item.path}
                                            collapsed={false}
                                        />
                                    ))}
                                </div>
                                <div className="p-4 border-t border-slate-100">
                                    <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors">
                                        <LogOut className="w-5 h-5" />
                                        <span className="font-bold">Sign Out</span>
                                    </button>
                                </div>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                    {/* Top Header */}
                    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-4 lg:px-8 z-30">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-500"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                                <span className="hover:text-slate-600 cursor-pointer">Admin</span>
                                <ChevronRight className="w-4 h-4" />
                                <span className="text-slate-900 font-semibold truncate capitalize">
                                    {currentPath.split('/').pop()?.replace('-', ' ')}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 lg:gap-6">


                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="flex items-center gap-2 p-1 pl-2 hover:bg-slate-50 rounded-full transition-colors border border-transparent hover:border-slate-200">
                                            <span className="hidden sm:inline text-xs font-bold text-slate-700">Administrator</span>
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                                <User className="w-5 h-5" />
                                            </div>
                                        </button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl mt-1">
                                        <div className="px-3 py-2">
                                            <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mb-1">Logged in as</p>
                                            <p className="text-sm font-medium text-slate-700 truncate">
                                                {settings?.admin_account_email || 'admin@truscomp.com'}
                                            </p>
                                        </div>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="rounded-lg gap-3 px-3 py-2 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer" onClick={() => navigate("/")}>
                                            <LogOut className="w-4 h-4" /> <span>Sign Out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 overflow-y-auto bg-slate-50">
                        <div className="p-6 lg:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500 h-full">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default AdminLayout;
