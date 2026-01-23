import { Shield, Award, Settings, TrendingUp, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: Shield,
    title: "Comprehensive Solutions",
    description: "End-to-end compliance management covering all aspects of labor law requirements.",
    gradient: "from-primary via-primary/80 to-accent",
  },
  {
    icon: Award,
    title: "Trusted Expertise",
    description: "Team of seasoned professionals with deep expertise in labor laws and regulations.",
    gradient: "from-accent via-accent/80 to-success",
  },
  {
    icon: Settings,
    title: "Customizable Approach",
    description: "Tailored solutions that adapt to your specific industry and business needs.",
    gradient: "from-success via-success/80 to-info",
  },
  {
    icon: TrendingUp,
    title: "Proven Track Record",
    description: "Consistent delivery of results with 100+ satisfied clients across industries.",
    gradient: "from-info via-info/80 to-primary",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-secondary/50 to-secondary/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--accent)/0.1),transparent_50%)]" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.2)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.2)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="section-container relative">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Why Choose <span className="gradient-text">TrusComp?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We combine technology innovation with compliance expertise to deliver 
            unmatched value for your business.
          </p>
        </AnimatedSection>

        {/* Pillars Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <AnimatedSection key={index} animation="fade-up" delay={index * 100}>
              <div 
                className="group relative text-center p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-glow overflow-hidden h-full"
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.gradient} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <pillar.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                {/* Content */}
                <h3 className="relative text-xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {pillar.title}
                </h3>
                <p className="relative text-sm text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>

                {/* Bottom line animation */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* CTA */}
        <AnimatedSection delay={400} className="text-center mt-12">
          <Link 
            to="/about" 
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all group"
          >
            Learn More About Us
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default WhyChooseUs;
