import { ResourceCategory, ResourceItem } from "@/data/resourcesData";
import ResourceList from "./ResourceList";
import HolidayViewer from "./HolidayViewer";
import { motion } from "framer-motion";

interface ResourceContentProps {
    category: ResourceCategory;
    data: ResourceItem[];
}

const ResourceContent = ({ category, data }: ResourceContentProps) => {
    // Filter resources for the current category
    const filteredResources = data.filter((item) => item.category === category);

    // Group holidays by state if in Holidays List category
    const groupedHolidays = category === "Holidays List" ? (() => {
        const stateMap = new Map<string, { name: string; date: string; day: string; rawDate: Date }[]>();

        filteredResources.forEach(item => {
            const state = item.state || "Central";
            if (!stateMap.has(state)) {
                stateMap.set(state, []);
            }

            const date = new Date(item.effectiveDate);
            const formattedDate = !isNaN(date.getTime())
                ? `${date.getDate()} ${date.toLocaleDateString('en-US', { month: 'short' })}`
                : item.effectiveDate;

            const dayName = !isNaN(date.getTime())
                ? date.toLocaleDateString('en-US', { weekday: 'long' })
                : "TBA";

            stateMap.get(state)?.push({
                name: item.title,
                date: formattedDate,
                day: dayName,
                rawDate: date
            });
        });

        return Array.from(stateMap.entries()).map(([stateName, holidays]) => ({
            stateName,
            holidays: holidays.sort((a, b) => a.rawDate.getTime() - b.rawDate.getTime())
                .map(({ name, date, day }) => ({ name, date, day }))
        }));
    })() : [];

    return (
        <motion.div
            key={category}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
        >
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900">{category}</h2>
                <p className="text-gray-500 mt-2">
                    Explore the latest {category.toLowerCase()} and compliance updates.
                </p>
            </div>

            {category === "Holidays List" ? (
                <HolidayViewer holidayData={groupedHolidays} />
            ) : (
                <ResourceList resources={filteredResources} />
            )}
        </motion.div>
    );
};

export default ResourceContent;
