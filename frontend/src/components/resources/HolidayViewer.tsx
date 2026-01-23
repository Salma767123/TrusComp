import { useState, useEffect } from "react";
import { StateHolidayList, HOLIDAY_DATA } from "@/data/resourcesData";
import { cn } from "@/lib/utils";
import { MapPin, Calendar, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HolidayViewerProps {
    holidayData?: StateHolidayList[];
}

const HolidayViewer = ({ holidayData = HOLIDAY_DATA }: HolidayViewerProps) => {
    // Check if data is available
    const displayData = holidayData.length > 0 ? holidayData : HOLIDAY_DATA;
    const [selectedState, setSelectedState] = useState(displayData[0]);
    const [searchTerm, setSearchTerm] = useState("");

    // Update selected state if holidayData changes and current selection is not in new data
    useEffect(() => {
        if (holidayData.length > 0 && !holidayData.find(s => s.stateName === selectedState?.stateName)) {
            setSelectedState(holidayData[0]);
        }
    }, [holidayData]);

    const filteredStates = displayData.filter(s =>
        s.stateName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col lg:flex-row h-[700px]">
            {/* Sidebar: State List */}
            <div className="w-full lg:w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/50">
                <div className="p-4 border-b border-gray-100 bg-white">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search state..."
                            className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-orange-500/20 text-gray-900 placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                    {filteredStates.map((state) => (
                        <button
                            key={state.stateName}
                            onClick={() => setSelectedState(state)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left",
                                selectedState.stateName === state.stateName
                                    ? "bg-white shadow-sm ring-1 ring-gray-100 text-orange-600"
                                    : "text-gray-600 hover:bg-white hover:shadow-sm"
                            )}
                        >
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                                selectedState.stateName === state.stateName
                                    ? "bg-orange-50 text-orange-600"
                                    : "bg-gray-100 text-gray-500"
                            )}>
                                {state.stateName.substring(0, 2).toUpperCase()}
                            </div>
                            {state.stateName}
                            {selectedState.stateName === state.stateName && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-orange-500" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content: Holiday List */}
            <div className="flex-1 relative bg-white p-6 lg:p-8 flex flex-col">
                {/* Decorative Background */}
                {/* Decorative Background - Removed as per request */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                    {/* SVG Removed */}
                </div>

                <div className="relative z-10 mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <MapPin className="w-6 h-6 text-orange-500" />
                            {selectedState.stateName}
                        </h2>
                        <p className="text-gray-500 text-sm mt-1">
                            Public Holiday List for 2025
                        </p>
                    </div>
                    <div className="px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full border border-orange-100">
                        {selectedState.holidays.length} Holidays
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedState.stateName}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-3"
                        >
                            {selectedState.holidays.map((holiday, idx) => (
                                <motion.div
                                    key={`${holiday.date}-${idx}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="group flex p-4 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-sm transition-all bg-white"
                                >
                                    {/* Date Box */}
                                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-orange-50 text-orange-700 border border-orange-100 flex-shrink-0">
                                        <span className="text-xs font-medium uppercase opacity-80">{holiday.date.split(' ')[1]}</span>
                                        <span className="text-xl font-bold">{holiday.date.split(' ')[0]}</span>
                                    </div>

                                    {/* Details */}
                                    <div className="ml-4 flex-1 flex flex-col justify-center">
                                        <h4 className="text-base font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                            {holiday.name}
                                        </h4>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {holiday.day}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default HolidayViewer;
