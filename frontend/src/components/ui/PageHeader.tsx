import { motion } from "framer-motion";

interface PageHeaderProps {
    titleStart: string;
    titleHighlight: string;
    titleEnd?: string;
    subtitle?: string;
    icon?: React.ElementType;
}

export const PageHeader = ({
    titleStart,
    titleHighlight,
    titleEnd = "",
    subtitle,
    icon: Icon,
}: PageHeaderProps) => {
    return (
        <div className="mb-12 lg:mb-20 text-center relative max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
            >
                {Icon && (
                    <div className="flex justify-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center rotate-3 hover:rotate-6 transition-transform duration-300">
                            <Icon className="w-8 h-8 text-primary" />
                        </div>
                    </div>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-900 tracking-tight">
                    {titleStart} <span className="text-primary relative inline-block">
                        {titleHighlight}
                        {/* Subtle underline decoration */}
                        <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </span> {titleEnd}
                </h1>

                {subtitle && (
                    <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>
                )}
            </motion.div>
        </div>
    );
};
