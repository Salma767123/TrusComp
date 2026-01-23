import { useParams, Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    ArrowRight,
    ChevronRight,
    Sparkles,
    ShieldAlert,
    Timer
} from "lucide-react";
import { cn } from "@/lib/utils";
import { complianceUpdates } from "@/data/complianceData";
import NotFound from "./NotFound";

import { useSEO } from "@/hooks/useSEO";

const UpdateDetail = () => {
    const { slug } = useParams<{ slug: string }>();
    useSEO("labour_law_update", slug);
    const update = complianceUpdates.find(u => u.slug === slug);

    const observerRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up");
                        entry.target.classList.remove("opacity-0");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        observerRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [update]);

    if (!update) {
        return <NotFound />;
    }

    const sections = [
        { title: "Overview", content: update.content.overview },
        { title: "What Changed", content: update.content.whatChanged },
        { title: "Who It Impacts", content: update.content.whoItImpacts },
        { title: "What You Should Do", content: update.content.whatYouShouldDo },
    ];

    return (
        <Layout>
            <div className="relative min-h-screen pt-24 pb-20 overflow-hidden">
                {/* Background Grid Texture */}
                <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
                </div>

                <div className="section-container relative z-10">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 mb-8 text-sm text-muted-foreground animate-fade-in">
                        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link to="/resources" className="hover:text-primary transition-colors">Resources</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-none">
                            {update.title}
                        </span>
                    </nav>

                    <div className="grid lg:grid-cols-[1fr_300px] gap-12">
                        {/* Main Content */}
                        <article className="max-w-3xl">
                            {/* Hero Section */}
                            <header className="mb-12">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 animate-fade-in">
                                    <update.icon className="w-4 h-4" />
                                    {update.category} Update
                                </span>
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold text-foreground leading-[1.1] mb-6 relative">
                                    {update.title}
                                    <span className="absolute -bottom-2 left-0 h-1.5 w-32 bg-primary rounded-full origin-left animate-draw-line" />
                                </h1>
                                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
                                    {update.summary}
                                </p>
                            </header>

                            {/* Content Blocks */}
                            <div className="space-y-16">
                                {sections.map((section, index) => (
                                    <section
                                        key={section.title}
                                        ref={(el) => (observerRefs.current[index] = el)}
                                        className="opacity-0 transition-all duration-700"
                                    >
                                        <div className="flex items-center gap-4 mb-6">
                                            <h2 className="text-2xl font-display font-bold text-foreground">
                                                {section.title}
                                            </h2>
                                            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                                        </div>
                                        <div className="prose prose-lg dark:prose-invert max-w-none">
                                            <p className="text-muted-foreground leading-relaxed text-lg">
                                                {section.content}
                                            </p>
                                        </div>
                                    </section>
                                ))}
                            </div>

                            {/* End CTA */}
                            <div className="mt-20 p-8 rounded-3xl bg-secondary/30 border border-border/50 relative overflow-hidden group animate-fade-in-up">
                                <div className="absolute top-0 right-0 -trnaslate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />

                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div>
                                        <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                                            Need help with this update?
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Our experts can help you implement these changes seamlessly.
                                        </p>
                                    </div>
                                    <Button asChild className="btn-primary h-12 px-8 rounded-xl shrink-0">
                                        <Link to="/contact">
                                            Book Compliance Review
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </article>

                        {/* Sidebar Highlights */}
                        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
                            <div className="p-6 rounded-2xl bg-card border border-border shadow-soft animate-fade-in-up">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
                                    Quick Highlights
                                </h4>

                                <div className="space-y-6">
                                    {/* Info Chips */}
                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10 animate-float">
                                        <ShieldAlert className="w-5 h-5 text-primary" />
                                        <div>
                                            <p className="text-[10px] font-bold text-primary/70 uppercase">Impact</p>
                                            <p className="text-sm font-semibold text-primary">{update.impact}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/5 border border-accent/10 animate-float-delayed">
                                        <Timer className="w-5 h-5 text-accent" />
                                        <div>
                                            <p className="text-[10px] font-bold text-accent/70 uppercase">Priority</p>
                                            <p className="text-sm font-semibold text-accent">{update.actionRequired}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 rounded-xl bg-orange-500/5 border border-orange-500/10 animate-pulse-float">
                                        <Sparkles className="w-5 h-5 text-orange-500" />
                                        <div>
                                            <p className="text-[10px] font-bold text-orange-500/70 uppercase">Status</p>
                                            <p className="text-sm font-semibold text-orange-500">Live & Final</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent border border-primary/5">
                                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">Last Updated</p>
                                <p className="text-sm font-medium text-foreground">{update.date}</p>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UpdateDetail;
