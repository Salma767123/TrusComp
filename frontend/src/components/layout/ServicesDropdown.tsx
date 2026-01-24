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

                {/* Mobile dropdown menu */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="py-2 pl-4 space-y-1">
                        {services.map((service) => (
                            <Link
                                key={service.id}
                                to={`/services/${service.slug}`}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
                            >
                                {service.title}
                            </Link>
                        ))}
                        <Link
                            to="/services"
                            className="block px-4 py-2.5 text-sm font-semibold text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
                        >
                            Explore All
                        </Link>
                    </div>
                </div>
            </div>
        );
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
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-[100] origin-top pointer-events-auto"
                        role="menu"
                        aria-orientation="vertical"
                    >
                        <div className="py-2 px-1">
                            {services.map((service, index) => (
                                <Link
                                    key={service.id}
                                    to={`/services/${service.slug}`}
                                    className="group block px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200 relative overflow-hidden"
                                    role="menuitem"
                                    style={{
                                        animationDelay: `${index * 30}ms`,
                                    }}
                                >
                                    {/* Hover accent line */}
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary rounded-r-full transition-all duration-300 group-hover:h-8" />

                                    {/* Service title */}
                                    <span className="block pl-2 transition-transform duration-200 group-hover:translate-x-1">
                                        {service.title}
                                    </span>
                                </Link>
                            ))}

                            {/* Divider */}
                            <div className="my-2 mx-3 border-t border-border" />

                            {/* Explore All link */}
                            <Link
                                to="/services"
                                className="group block px-4 py-3 text-sm font-semibold text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 relative overflow-hidden"
                                role="menuitem"
                            >
                                <span className="flex items-center justify-between">
                                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                                        Explore All
                                    </span>
                                    <span className="text-xs opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
                                        →
                                    </span>
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ServicesDropdown;
