import React from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SplitViewProps {
    list: React.ReactNode;
    content: React.ReactNode;
    showContent?: boolean;
    listWidth?: string;
    className?: string;
}

const SplitView = ({
    list,
    content,
    showContent = true,
    listWidth = "w-[400px]",
    className
}: SplitViewProps) => {
    return (
        <div className={cn("flex h-full gap-6", className)}>
            {/* List Panel */}
            <div className={cn(
                "flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden shrink-0 transition-all duration-300",
                listWidth,
                !showContent && "w-full"
            )}>
                {list}
            </div>

            {/* Content / Editor Panel */}
            <AnimatePresence mode="wait">
                {showContent && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="flex-1 flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden min-w-0"
                    >
                        {content}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SplitView;
