import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Shield, CheckCircle2 } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";

const AboutCTA = () => {
    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground" />

            {/* Animated gradient orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-primary/25 rounded-full blur-3xl animate-float" />
                <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float-delayed" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-full blur-3xl animate-pulse-float" />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--background)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--background)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

            {/* Top decorative line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

            {/* Bottom decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

            <div className="section-container relative">
                <AnimatedSection className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm border border-background/20 text-background text-sm font-medium mb-8">
                        <Shield className="w-4 h-4 text-primary" />
                        Your Trusted Compliance Partner
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-background mb-6">
                        Ready to build{" "}
                        <span className="text-primary">trust?</span>
                    </h2>

                    <p className="text-lg lg:text-xl text-background/70 max-w-2xl mx-auto mb-12">
                        Join 100+ trusted clients who have transformed their compliance journey with TrusComp.
                        Let's write your success story together.
                    </p>

                    <div className="inline-block relative group">
                        {/* Glow effect behind button */}
                        <div className="absolute inset-0 bg-primary/30 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-150" />
                        <Button
                            asChild
                            size="lg"
                            className="relative h-14 px-10 text-lg rounded-full btn-primary group-hover:scale-105 transition-all duration-300"
                        >
                            <Link to="/contact" className="flex items-center gap-3">
                                <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                Take the First Step
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-14 flex flex-wrap justify-center gap-6 md:gap-10 text-background/60 text-sm">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-success" />
                            Free Consultation
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                            Expert Team
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-accent" />
                            24/7 Support
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
};

export default AboutCTA;
