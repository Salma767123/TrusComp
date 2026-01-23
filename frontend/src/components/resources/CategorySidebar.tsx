import { CATEGORIES, ResourceCategory } from "@/data/resourcesData";
import { cn } from "@/lib/utils";
import * as Icons from "lucide-react";

interface CategorySidebarProps {
    activeCategory: ResourceCategory;
    onSelectCategory: (category: ResourceCategory) => void;
}

const CategorySidebar = ({ activeCategory, onSelectCategory }: CategorySidebarProps) => {
    return (
        <div className="w-full lg:w-72 flex-shrink-0 bg-white border-r border-gray-100 min-h-[600px] p-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6 px-4">
                Categories
            </h3>
            <div className="flex flex-col space-y-1">
                {CATEGORIES.map((category) => {
                    // Dynamically get the icon component
                    const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ElementType;

                    const isActive = activeCategory === category.id;

                    return (
                        <button
                            key={category.id}
                            onClick={() => onSelectCategory(category.id)}
                            className={cn(
                                "group relative flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 ease-out",
                                isActive
                                    ? "bg-orange-50 text-orange-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            )}
                        >
                            {/* Active Indicator Line */}
                            {isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-orange-500 rounded-r-full animate-fade-in" />
                            )}

                            {/* Icon */}
                            {IconComponent && (
                                <IconComponent
                                    className={cn(
                                        "w-5 h-5 transition-transform duration-300",
                                        isActive ? "scale-110" : "group-hover:scale-105",
                                        isActive ? "text-orange-500" : "text-gray-400 group-hover:text-gray-600"
                                    )}
                                />
                            )}

                            {/* Label */}
                            <span className="relative z-10">{category.label}</span>

                            {/* Hover Arrow (only visible on hover when not active) */}
                            {!isActive && (
                                <Icons.ChevronRight className="w-4 h-4 ml-auto opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-gray-400" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CategorySidebar;
