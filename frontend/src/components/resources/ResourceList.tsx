import { ResourceItem } from "@/data/resourcesData";
import { Download, Calendar, MapPin, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as Icons from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import * as React from "react";

interface ResourceListProps {
    resources: ResourceItem[];
}

const ResourceList = ({ resources }: ResourceListProps) => {
    // Pagination State
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 8;
    const navigate = useNavigate();

    const totalPages = Math.ceil(resources.length / itemsPerPage);
    const paginatedResources = resources.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Reset page when resources change
    React.useEffect(() => {
        setCurrentPage(1);
    }, [resources]);

    return (
        <div className="w-full flex flex-col min-h-[600px]">
            <div className="space-y-4 flex-grow">
                <AnimatePresence mode="popLayout">
                    {paginatedResources.map((resource, index) => (
                        <motion.div
                            key={resource.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-soft hover:border-orange-100 transition-all duration-300"
                        >
                            <div className="flex flex-col md:flex-row gap-6 items-start justify-between">

                                <div className="flex-1 space-y-3">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#FF8C00] transition-colors">
                                            {resource.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2 max-w-3xl">
                                            {resource.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6 text-xs font-medium text-gray-500 pt-1">
                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100 group-hover:bg-white transition-colors">
                                            <Calendar className="w-3.5 h-3.5 text-[#FF8C00]/70" />
                                            <span>Released: <span className="text-gray-900">{resource.releaseDate}</span></span>
                                        </div>

                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100 group-hover:bg-white transition-colors">
                                            <Calendar className="w-3.5 h-3.5 text-[#FF8C00]/70" />
                                            <span>Effective: <span className="text-gray-900">{resource.effectiveDate}</span></span>
                                        </div>

                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100 group-hover:bg-white transition-colors">
                                            <MapPin className="w-3.5 h-3.5 text-[#FF8C00]/70" />
                                            <span>State: <span className="text-gray-900">{resource.state}</span></span>
                                        </div>
                                    </div>
                                </div>

                                {resource.category === "Labour Law Updates" ? (
                                    <button
                                        onClick={() => navigate(`/resources/monthly-labour-law/${resource.id}`)}
                                        className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#FF8C00] rounded-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 group-hover:shadow-orange-500/30 group-hover:-translate-y-0.5"
                                    >
                                        Read More
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                ) : (
                                    <button
                                        disabled={!resource.downloadUrl}
                                        onClick={() => resource.downloadUrl && window.open(resource.downloadUrl, '_blank')}
                                        className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-lg transition-all shadow-lg ${resource.downloadUrl
                                            ? "bg-[#FF8C00] hover:bg-orange-600 shadow-orange-500/20 group-hover:shadow-orange-500/30 group-hover:-translate-y-0.5 cursor-pointer"
                                            : "bg-gray-300 cursor-not-allowed opacity-70 shadow-none scale-100"
                                            }`}
                                    >
                                        PDF
                                        <Download className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {resources.length === 0 && (
                    <div className="text-center py-24 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Icons.Search className="w-8 h-8 text-gray-300" />
                        </div>
                        <p className="text-gray-900 font-medium">No resources found</p>
                        <p className="text-sm text-gray-500">Try checking another category.</p>
                    </div>
                )}
            </div>

            {/* Dynamic Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-end mt-12 mb-4">
                    <motion.div
                        className="flex items-center bg-white p-1 rounded-full shadow-lg shadow-gray-200/40 border border-gray-100"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Previous Arrow */}
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all active:scale-95 group ${currentPage === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-[#FF8C00] hover:bg-orange-50'}`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>

                        {/* Page Numbers */}
                        <div className="flex items-center px-2 gap-1.5">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`relative min-w-[32px] h-8 flex items-center justify-center text-xs font-bold transition-all rounded-full px-2 group overflow-hidden ${page === currentPage ? "text-white" : "text-gray-500 hover:text-[#FF8C00]"
                                        }`}
                                >
                                    {page === currentPage && (
                                        <motion.div
                                            layoutId="active-pill-v2"
                                            className="absolute inset-0 bg-[#FF8C00] rounded-full"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{page}</span>
                                    {page !== currentPage && (
                                        <span className="absolute inset-0 bg-orange-50 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Next Arrow */}
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all active:scale-95 group ${currentPage === totalPages ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-[#FF8C00] hover:bg-orange-50'}`}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ResourceList;
