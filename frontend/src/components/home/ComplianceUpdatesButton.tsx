import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ComplianceUpdatesModal from "./ComplianceUpdatesModal";

const ComplianceUpdatesButton = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isPulsing, setIsPulsing] = useState(false);

    // Pulse animation every 7 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIsPulsing(true);
            setTimeout(() => setIsPulsing(false), 1000);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                size="lg"
                variant="outline"
                className={cn(
                    "relative text-base group overflow-hidden",
                    "rounded-full px-6",
                    "bg-transparent backdrop-blur-sm",
                    "border-2 border-transparent",
                    "transition-all duration-300 ease-out",
                    // Gradient border using background-clip trick
                    "before:absolute before:inset-0 before:-z-10 before:rounded-full",
                    "before:p-[2px] before:bg-gradient-to-r before:from-primary before:to-amber-400",
                    "before:content-['']",
                    "after:absolute after:inset-[2px] after:-z-10 after:rounded-full",
                    "after:bg-card after:content-['']",
                    "after:transition-all after:duration-300",
                    // Hover states
                    "hover:after:bg-primary/5",
                    "hover:-translate-y-0.5",
                    "hover:shadow-glow",
                    // Pulse animation class
                    isPulsing && "animate-compliance-pulse"
                )}
            >
                {/* Icon with animation */}
                <span className="relative mr-2">
                    <Bell className={cn(
                        "w-5 h-5 transition-transform duration-300",
                        "group-hover:scale-110",
                        isPulsing && "animate-wiggle"
                    )} />
                    {/* Notification dot */}
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
                </span>

                {/* Text with hover lift */}
                <span className="relative transition-transform duration-200 group-hover:-translate-y-px">
                    Latest Compliance Updates
                </span>

                {/* Border draw effect on hover */}
                <span className={cn(
                    "absolute inset-0 rounded-full opacity-0",
                    "border-2 border-primary",
                    "transition-opacity duration-300",
                    "group-hover:opacity-100 group-hover:animate-border-draw"
                )} />
            </Button>

            <ComplianceUpdatesModal open={isOpen} onOpenChange={setIsOpen} />
        </>
    );
};

export default ComplianceUpdatesButton;
