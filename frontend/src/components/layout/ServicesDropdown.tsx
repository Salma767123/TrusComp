import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Service items in the exact order specified
interface ServicesDropdownProps {
    isMobile?: boolean;
}

const ServicesDropdown = ({ isMobile = false }: ServicesDropdownProps) => {
    // Service items will be fetched dynamically
    const [services, setServices] = useState<any[]>([]);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const apiBase = import.meta.env.VITE_API_BASE_URL || "";
                const response = await fetch(`${apiBase}/services?public_view=true`);
                if (response.ok) {
                    const data = await response.json();
                    setServices(data);
                }
            } catch (error) {
                console.error("Failed to fetch services menu:", error);
            }
        };
        fetchServices();
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const location = useLocation();
    const isServicesActive = location.pathname.startsWith("/services");

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Close dropdown on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 200); // 200ms delay for hover intent
    };

    if (isMobile) {
        // Mobile accordion-style dropdown
        return (
            <div className="w-full">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between
            ${isServicesActive
                            ? "text-primary bg-primary/10"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        }`}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                >
                    <span>Services</span>
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {/* Mobile & Tablet dropdown menu */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="py-2 px-2 md:px-4">
                        <div className="md:columns-2 md:gap-4 space-y-1 md:space-y-0 text-left">
                            {services.map((service) => (
                                <div key={service.id} className="break-inside-avoid md:mb-1">
                                    <Link
                                        to={`/services/${service.slug}`}
                                        onClick={() => setIsOpen(false)}
                                        className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                                    >
                                        {service.title}
                                    </Link>
                                </div>
                            ))}
                            <div className="break-inside-avoid md:mb-1">
                                <Link
                                    to="/services/gcc"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                                >
                                    GCC
                                </Link>
                            </div>
                            <div className="break-inside-avoid mt-2 md:mt-0 md:pt-2">
                                <Link
                                    to="/services"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 text-center md:text-left"
                                >
                                    Explore All Services →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Helper to divide services into roughly equal columns for Desktop Grid
    const desktopColumns = [];
    const desktopItems = [...services];
    // Add GCC and Explore All to the list of items to render in the grid
    desktopItems.push({ id: 'gcc-item', title: 'Global Capability Center (GCC)', slug: 'gcc' });
    desktopItems.push({ id: 'explore-all', title: 'Explore All Services →', slug: '', isAction: true });

    const itemsPerColumn = Math.ceil(desktopItems.length / 4);
    for (let i = 0; i < 4; i++) {
        desktopColumns.push(desktopItems.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn));
    }

    // Desktop hover-activated dropdown
    return (
        <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
        >
            {/* Parent Services link */}
            <Link
                to="/services"
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 focus:outline-none
          ${isServicesActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                Services
                <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </Link>

            {/* Stable Hover Bridge - Invisible div to close the gap between link and menu */}
            {isOpen && (
                <div
                    className="absolute top-full left-0 w-full h-4 bg-transparent z-10"
                    aria-hidden="true"
                />
            )}

            {/* Desktop dropdown menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-[-120px] mt-4 w-[780px] xl:w-[860px] bg-card border border-border rounded-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] overflow-hidden z-[100] origin-top pointer-events-auto"
                        role="menu"
                        aria-orientation="vertical"
                    >
                        <div className="py-5 px-6">
                            <div className="grid grid-cols-4 gap-6">
                                {desktopColumns.map((col, colIdx) => (
                                    <div
                                        key={colIdx}
                                        className={`flex flex-col gap-2 ${colIdx !== 3 ? 'border-r border-black/5 pr-4' : ''}`}
                                    >
                                        {col.map((item) => (
                                            <Link
                                                key={item.id}
                                                to={item.isAction ? '/services' : `/services/${item.slug}`}
                                                className={`group block py-1.5 text-[14px] leading-[20px] transition-all duration-200 
                                                    ${item.isAction ? 'font-semibold text-primary' : 'text-muted-foreground'}
                                                `}
                                                role="menuitem"
                                            >
                                                <span className="block transition-transform duration-200 ease-in-out group-hover:translate-x-[3px] group-hover:text-[#ff8c00]">
                                                    {item.title}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ServicesDropdown;
