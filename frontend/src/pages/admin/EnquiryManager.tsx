import React, { useState, useEffect } from "react";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Calendar,
    X,
    RotateCw,
    MessageSquare,
    CheckCircle2,
    Eye,
    User,
    Briefcase,
    RefreshCw,
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useNavigation, CaptionProps } from "react-day-picker";
import { cn } from "@/lib/utils";
import {
    validateName,
    validateEmail,
    validatePhone,
    validateService,
    validateMessage
} from "@/lib/validation";

interface Enquiry {
    id: number;
    name: string;
    email: string;
    phone: string;
    service_interest: string;
    message: string;
    status: 'new' | 'contacted' | 'confirmed' | 'closed';
    notes: string | null;
    confirmed_at: string | null;
    created_at: string;
}

interface Service {
    id: number;
    title: string;
}

const EnquiryManager = () => {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedService, setSelectedService] = useState<string>("All Services");
    const [statusFilter, setStatusFilter] = useState<string>("All Statuses");
    const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined);
    const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [services, setServices] = useState<Service[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;
    const [formErrors, setFormErrors] = useState({
        name: null as string | null,
        email: null as string | null,
        phone: null as string | null,
        service_interest: null as string | null,
        message: null as string | null
    });

    const isFormValid = () => {
        if (!selectedEnquiry) return false;
        const newErrors = {
            name: validateName(selectedEnquiry.name),
            email: validateEmail(selectedEnquiry.email),
            phone: validatePhone(selectedEnquiry.phone),
            service_interest: validateService(selectedEnquiry.service_interest),
            message: validateMessage(selectedEnquiry.message)
        };
        // Check if any error is not null
        return !Object.values(newErrors).some(error => error !== null);
    };

    const handleFieldChange = (field: string, value: string) => {
        if (!selectedEnquiry) return;
        setSelectedEnquiry({ ...selectedEnquiry, [field]: value });

        // Validate
        let error = null;
        switch (field) {
            case 'name': error = validateName(value); break;
            case 'email': error = validateEmail(value); break;
            case 'phone': error = validatePhone(value); break;
            case 'service_interest': error = validateService(value); break;
            case 'message': error = validateMessage(value); break;
        }
        setFormErrors(prev => ({ ...prev, [field]: error }));
    };

    useEffect(() => {
        fetchEnquiries();
        fetchServices();
    }, []);

    const fetchEnquiries = async () => {
        setLoading(true);
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/enquiries`, {
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                setEnquiries(data);
            }
        } catch (err) {
            toast.error("Failed to fetch enquiries");
        } finally {
            setLoading(false);
        }
    };

    const fetchServices = async () => {
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/services?public_view=true`);
            if (response.ok) {
                const data = await response.json();
                setServices(data);
            }
        } catch (err) {
            console.error("Failed to fetch services", err);
        }
    };

    const handleOpenModal = (enquiry?: Enquiry) => {
        if (enquiry) {
            setSelectedEnquiry({ ...enquiry });
        } else {
            setSelectedEnquiry({
                id: 0,
                name: "",
                email: "",
                phone: "",
                service_interest: "",
                message: "",
                status: 'new',
                notes: "",
                confirmed_at: null,
                created_at: new Date().toISOString()
            });
        }
        setIsModalOpen(true);
        setFormErrors({
            name: null,
            email: null,
            phone: null,
            service_interest: null,
            message: null
        });
    };

    const handleViewModal = (enquiry: Enquiry) => {
        setSelectedEnquiry({ ...enquiry });
        setIsViewModalOpen(true);
    };

    const handleSave = async () => {
        if (!selectedEnquiry) return;

        const newErrors = {
            name: validateName(selectedEnquiry.name),
            email: validateEmail(selectedEnquiry.email),
            phone: validatePhone(selectedEnquiry.phone),
            service_interest: validateService(selectedEnquiry.service_interest),
            message: validateMessage(selectedEnquiry.message)
        };

        setFormErrors(newErrors);

        if (Object.values(newErrors).some(error => error !== null)) {
            toast.error("Please correct the errors in the form");
            return;
        }

        setIsSaving(true);
        try {
            const isNew = selectedEnquiry.id === 0;
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const url = isNew
                ? `${apiBase}/api/v1/enquiries`
                : `${apiBase}/api/v1/enquiries/${selectedEnquiry.id}`;
            const method = isNew ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedEnquiry),
                credentials: 'include'
            });

            if (response.ok) {
                toast.success(isNew ? "Enquiry created" : "Enquiry updated");
                setIsModalOpen(false);
                fetchEnquiries();
            } else {
                toast.error("Failed to save enquiry");
            }
        } catch (err) {
            toast.error("Connection failed");
        } finally {
            setIsSaving(false);
        }
    };

    const handleChangeStatus = async (id: number, newStatus: string) => {
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/enquiries/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
                credentials: 'include'
            });

            if (response.ok) {
                toast.success(`Status changed to ${newStatus}`);
                fetchEnquiries();
            } else {
                toast.error("Failed to update status");
            }
        } catch (err) {
            toast.error("Connection failed");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Permanently delete this record?")) return;
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/api/v1/enquiries/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                toast.success("Enquiry deleted");
                fetchEnquiries();
            }
        } catch (err) {
            toast.error("Delete failed");
        }
    };

    const filteredEnquiries = enquiries.filter(e => {
        const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            e.phone.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesService = selectedService === "All Services" || e.service_interest === selectedService;
        const matchesStatus = statusFilter === "All Statuses" || e.status === statusFilter;

        let matchesDate = true;
        if (dateFilter) {
            const enquiryDate = new Date(e.created_at);
            const filterDate = new Date(dateFilter);
            matchesDate =
                enquiryDate.getFullYear() === filterDate.getFullYear() &&
                enquiryDate.getMonth() === filterDate.getMonth() &&
                enquiryDate.getDate() === filterDate.getDate();
        }

        return matchesSearch && matchesService && matchesStatus && matchesDate;
    });

    // Pagination logic
    const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);
    const paginatedEnquiries = filteredEnquiries.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedService, statusFilter, dateFilter]);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'new': return <Badge className="bg-orange-50 text-orange-600 border-orange-100 hover:bg-orange-100 font-bold text-[9px] uppercase tracking-wider">New</Badge>;
            case 'contacted': return <Badge className="bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100 font-bold text-[9px] uppercase tracking-wider">Contacted</Badge>;
            case 'confirmed': return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100 font-bold text-[9px] uppercase tracking-wider">Confirmed</Badge>;
            case 'closed': return <Badge className="bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 font-bold text-[9px] uppercase tracking-wider">Closed</Badge>;
            default: return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-4 animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-bold text-slate-900 tracking-tight">Enquiries & Leads</h1>
                    <p className="text-slate-500 text-xs mt-0.5">Manage incoming compliance intake requests</p>
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

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                        placeholder="Search name, email, phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 h-10 text-sm border-slate-200 bg-slate-50/50 focus:bg-white transition-colors"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Select value={selectedService} onValueChange={setSelectedService}>
                        <SelectTrigger className="h-10 w-full md:w-[200px] text-xs font-bold bg-white border-slate-200 rounded-lg focus:ring-4 focus:ring-primary/5 text-slate-600 shadow-sm transition-all hover:border-slate-300">
                            <SelectValue placeholder="All Services" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200 shadow-xl max-h-[200px] overflow-y-auto">
                            <SelectItem value="All Services" className="text-xs font-medium">All Services</SelectItem>
                            {services.map(service => (
                                <SelectItem key={service.id} value={service.title} className="text-xs font-medium">{service.title}</SelectItem>
                            ))}
                            <SelectItem value="Others" className="text-xs font-medium">Others</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="h-10 w-full md:w-[160px] text-xs font-bold bg-white border-slate-200 rounded-lg focus:ring-4 focus:ring-primary/5 text-slate-600 shadow-sm transition-all hover:border-slate-300">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                            <SelectItem value="All Statuses" className="text-xs font-medium">All Statuses</SelectItem>
                            <SelectItem value="new" className="text-xs font-medium">New</SelectItem>
                            <SelectItem value="contacted" className="text-xs font-medium">Contacted</SelectItem>
                            <SelectItem value="confirmed" className="text-xs font-medium">Confirmed</SelectItem>
                            <SelectItem value="closed" className="text-xs font-medium">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className={cn(
                                    "h-10 px-3 text-sm font-medium border-slate-200 bg-white hover:bg-slate-100 text-slate-600 gap-2 min-w-[140px] justify-between",
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
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead className="bg-slate-50">
                        <tr className="bg-slate-50 border-b border-slate-200">
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Phone</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Service</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                            <th className="px-4 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {loading ? (
                            <tr><td colSpan={7} className="px-4 py-12 text-center text-slate-400 text-xs"><div className="flex items-center justify-center gap-2"><RotateCw className="w-4 h-4 animate-spin" /> Loading Lead Engine...</div></td></tr>
                        ) : paginatedEnquiries.length > 0 ? (
                            paginatedEnquiries.map((enquiry) => (
                                <tr key={enquiry.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-4 py-3">
                                        <span className="font-bold text-slate-900 text-xs">{enquiry.name}</span>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-600">{enquiry.phone}</td>
                                    <td className="px-4 py-3 text-xs text-slate-600">{enquiry.email}</td>
                                    <td className="px-4 py-3 text-xs">
                                        <span className="bg-primary/5 px-2 py-0.5 rounded text-primary font-bold uppercase text-[9px]">{enquiry.service_interest}</span>
                                    </td>
                                    <td className="px-4 py-3 text-xs text-slate-600 font-medium">
                                        {format(new Date(enquiry.created_at), "dd-MM-yyyy")}
                                    </td>
                                    <td className="px-4 py-3">
                                        {getStatusBadge(enquiry.status)}
                                    </td>
                                    <td className="px-4 py-3 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-blue-500" onClick={() => handleViewModal(enquiry)} title="View Details"><Eye className="w-3.5 h-3.5" /></Button>

                                            {/* Edit Button - Disabled if status is closed */}
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className={cn(
                                                    "h-7 w-7 transition-colors",
                                                    enquiry.status === 'closed'
                                                        ? "text-slate-200 cursor-not-allowed hover:bg-transparent hover:text-slate-200"
                                                        : "text-slate-400 hover:text-primary"
                                                )}
                                                onClick={() => enquiry.status !== 'closed' && handleOpenModal(enquiry)}
                                                disabled={enquiry.status === 'closed'}
                                                title={enquiry.status === 'closed' ? "Cannot edit closed records" : "Edit"}
                                            >
                                                <Edit className="w-3.5 h-3.5" />
                                            </Button>

                                            {/* Status Change - Disabled if status is closed */}
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className={cn(
                                                            "h-7 w-7 transition-colors",
                                                            enquiry.status === 'closed'
                                                                ? "text-slate-200 cursor-not-allowed hover:bg-transparent hover:text-slate-200"
                                                                : "text-slate-400 hover:text-amber-500"
                                                        )}
                                                        disabled={enquiry.status === 'closed'}
                                                        title={enquiry.status === 'closed' ? "Record is closed" : "Change Status"}
                                                    >
                                                        <RefreshCw className="w-3.5 h-3.5" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-40 p-1" align="end">
                                                    <div className="flex flex-col gap-0.5">
                                                        <button onClick={() => handleChangeStatus(enquiry.id, 'new')} className={cn("text-left px-3 py-1.5 text-xs hover:bg-slate-100 rounded transition-colors", enquiry.status === 'new' && "bg-orange-50 text-orange-600 font-bold")}>New</button>
                                                        <button onClick={() => handleChangeStatus(enquiry.id, 'contacted')} className={cn("text-left px-3 py-1.5 text-xs hover:bg-slate-100 rounded transition-colors", enquiry.status === 'contacted' && "bg-blue-50 text-blue-600 font-bold")}>Contacted</button>
                                                        <button onClick={() => handleChangeStatus(enquiry.id, 'confirmed')} className={cn("text-left px-3 py-1.5 text-xs hover:bg-slate-100 rounded transition-colors", enquiry.status === 'confirmed' && "bg-emerald-50 text-emerald-600 font-bold")}>Confirmed</button>
                                                        <button onClick={() => handleChangeStatus(enquiry.id, 'closed')} className={cn("text-left px-3 py-1.5 text-xs hover:bg-slate-100 rounded transition-colors", enquiry.status === 'closed' && "bg-slate-100 text-slate-600 font-bold")}>Closed</button>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-red-500" onClick={() => handleDelete(enquiry.id)} title="Delete"><Trash2 className="w-3.5 h-3.5" /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan={7} className="px-4 py-12 text-center text-slate-400 text-xs">No records found.</td></tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-white shrink-0">
                        <p className="text-xs text-slate-500">
                            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredEnquiries.length)} of {filteredEnquiries.length} entries
                        </p>
                        <div className="flex items-center gap-1">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? "default" : "outline"}
                                    size="sm"
                                    className={cn("h-8 w-8 p-0 text-xs", currentPage === page && "bg-primary")}
                                    onClick={() => setCurrentPage(page)}
                                >
                                    {page}
                                </Button>
                            ))}
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* View Modal (Read-Only) */}
            <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
                <DialogContent className="max-w-lg p-0 overflow-hidden border-none shadow-2xl">
                    <DialogHeader className="px-6 py-4 bg-slate-900 border-b border-white/10">
                        <DialogTitle className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                            <Eye className="w-4 h-4 text-blue-400" />
                            Lead Details
                        </DialogTitle>
                    </DialogHeader>
                    {selectedEnquiry && (
                        <div className="p-6 space-y-4 bg-white">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Full Name</p>
                                    <p className="text-sm font-bold text-slate-900">{selectedEnquiry.name}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Phone Number</p>
                                    <p className="text-sm text-slate-700">{selectedEnquiry.phone}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Email ID</p>
                                    <p className="text-sm text-slate-700">{selectedEnquiry.email}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Service</p>
                                    <span className="bg-primary/10 px-2 py-0.5 rounded text-primary font-bold uppercase text-[10px]">{selectedEnquiry.service_interest}</span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date of Enquiry</p>
                                    <p className="text-sm text-slate-700">{format(new Date(selectedEnquiry.created_at), "PPP")}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                    {getStatusBadge(selectedEnquiry.status)}
                                </div>
                                {selectedEnquiry.status === 'confirmed' && selectedEnquiry.confirmed_at && (
                                    <div className="col-span-2">
                                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Confirmed At</p>
                                        <p className="text-sm text-emerald-600 font-bold">{format(new Date(selectedEnquiry.confirmed_at), "PPP")}</p>
                                    </div>
                                )}
                            </div>
                            {selectedEnquiry.message && (
                                <div className="pt-4 border-t border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Message</p>
                                    <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg">{selectedEnquiry.message}</p>
                                </div>
                            )}
                            {selectedEnquiry.notes && (
                                <div className="pt-4 border-t border-slate-100">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Internal Notes</p>
                                    <p className="text-xs text-slate-600 bg-amber-50 p-3 rounded-lg border border-amber-100">{selectedEnquiry.notes}</p>
                                </div>
                            )}
                        </div>
                    )}
                    <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                        <Button variant="ghost" onClick={() => setIsViewModalOpen(false)} className="text-xs font-bold uppercase h-9">Close</Button>
                        <Button onClick={() => { setIsViewModalOpen(false); handleOpenModal(selectedEnquiry!); }}
                            className={cn("h-9 px-6 bg-primary text-xs font-bold uppercase", selectedEnquiry?.status === 'closed' ? "hidden" : "flex")}
                        >
                            <Edit className="w-3.5 h-3.5 mr-2" /> Edit Lead
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Create/Edit Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl p-0 overflow-hidden border-none shadow-2xl max-h-[90vh] flex flex-col">
                    <DialogHeader className="px-6 py-4 bg-slate-900 border-b border-white/10 shrink-0">
                        <DialogTitle className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                            {selectedEnquiry?.id === 0 ? <Plus className="w-4 h-4 text-primary" /> : <Edit className="w-4 h-4 text-primary" />}
                            {selectedEnquiry?.id === 0 ? "Create Lead" : "Edit Lead Record"}
                        </DialogTitle>
                    </DialogHeader>
                    {selectedEnquiry && (
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                            {/* Basic Info */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                                    <User className="w-4 h-4 text-primary" />
                                    Lead Information
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2 space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Full Name *</label>
                                        <Input
                                            value={selectedEnquiry.name}
                                            onChange={(e) => handleFieldChange('name', e.target.value)}
                                            className={cn("h-9 text-xs font-bold", formErrors.name && "border-red-500")}
                                            placeholder="Lead Name"
                                        />
                                        {formErrors.name && <span className="text-[10px] text-red-500 font-bold">{formErrors.name}</span>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address *</label>
                                        <Input
                                            value={selectedEnquiry.email}
                                            onChange={(e) => handleFieldChange('email', e.target.value)}
                                            className={cn("h-9 text-xs", formErrors.email && "border-red-500")}
                                            placeholder="email@example.com"
                                        />
                                        {formErrors.email && <span className="text-[10px] text-red-500 font-bold">{formErrors.email}</span>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Phone Number *</label>
                                        <Input
                                            value={selectedEnquiry.phone}
                                            onChange={(e) => handleFieldChange('phone', e.target.value)}
                                            className={cn("h-9 text-xs", formErrors.phone && "border-red-500")}
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                        {formErrors.phone && <span className="text-[10px] text-red-500 font-bold">{formErrors.phone}</span>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Service Interest *</label>
                                        <Select
                                            value={selectedEnquiry.service_interest}
                                            onValueChange={(value) => handleFieldChange('service_interest', value)}
                                        >
                                            <SelectTrigger className={cn("h-9 px-3 w-full bg-white border-slate-200 rounded-md text-xs font-medium outline-none focus:ring-1 focus:ring-primary/20 transition-all", formErrors.service_interest && "border-red-500")}>
                                                <SelectValue placeholder="Select Service" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-slate-200 shadow-xl max-h-60">
                                                {services.map(service => (
                                                    <SelectItem key={service.id} value={service.title} className="text-xs font-medium">{service.title}</SelectItem>
                                                ))}
                                                <SelectItem value="Others" className="text-xs font-medium">Others</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {formErrors.service_interest && <span className="text-[10px] text-red-500 font-bold">{formErrors.service_interest}</span>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Lead Status</label>
                                        <Select
                                            value={selectedEnquiry.status}
                                            onValueChange={(value) => setSelectedEnquiry({ ...selectedEnquiry, status: value as any })}
                                        >
                                            <SelectTrigger className="h-9 px-3 w-full bg-white border-slate-200 rounded-md text-xs font-medium outline-none focus:ring-1 focus:ring-primary/20 transition-all">
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                                                <SelectItem value="new" className="text-xs font-medium">New</SelectItem>
                                                <SelectItem value="contacted" className="text-xs font-medium">Contacted</SelectItem>
                                                <SelectItem value="confirmed" className="text-xs font-medium">Confirmed</SelectItem>
                                                <SelectItem value="closed" className="text-xs font-medium">Closed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 border-b pb-2">
                                    <MessageSquare className="w-4 h-4 text-primary" />
                                    Communication Details
                                </h3>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inquiry Message</label>
                                        <Textarea
                                            value={selectedEnquiry.message}
                                            onChange={(e) => handleFieldChange('message', e.target.value)}
                                            rows={2}
                                            className={cn("text-xs resize-none bg-slate-50/50", formErrors.message && "border-red-500")}
                                            placeholder="Client's initial message..."
                                        />
                                        {formErrors.message && <span className="text-[10px] text-red-500 font-bold">{formErrors.message}</span>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Internal Notes</label>
                                        <Textarea
                                            value={selectedEnquiry.notes || ""}
                                            onChange={(e) => setSelectedEnquiry({ ...selectedEnquiry, notes: e.target.value })}
                                            rows={3}
                                            className="text-xs resize-none bg-slate-50/50"
                                            placeholder="Add updates from your conversation with the lead..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tracking */}
                            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Date of Enquiry</label>
                                    <div className="h-9 px-3 bg-slate-50 border border-slate-100 rounded-md text-xs flex items-center text-slate-500 font-medium">
                                        <Calendar className="w-3.5 h-3.5 mr-2 opacity-50" />
                                        {format(new Date(selectedEnquiry.created_at), "PPP")}
                                    </div>
                                </div>
                                {selectedEnquiry.status === 'confirmed' && (
                                    <div className="space-y-1.5 animate-in slide-in-from-top-2">
                                        <label className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Date of Confirmed</label>
                                        <div className="h-9 px-3 bg-emerald-50 border border-emerald-100 rounded-md text-xs flex items-center text-emerald-600 font-bold">
                                            <CheckCircle2 className="w-3.5 h-3.5 mr-2" />
                                            {selectedEnquiry.confirmed_at ? format(new Date(selectedEnquiry.confirmed_at), "PPP") : "Auto-filled on save"}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <DialogFooter className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                        <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="text-xs font-bold uppercase h-9">Cancel</Button>
                        <Button onClick={handleSave} disabled={isSaving || !isFormValid()} className="h-9 px-8 bg-primary text-xs font-bold uppercase shadow-xl shadow-primary/20">
                            {isSaving ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" /> Save Lead</span>}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default EnquiryManager;
