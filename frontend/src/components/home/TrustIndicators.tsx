import { Award, Users, Building2, Calendar } from "lucide-react";
import AnimatedCounter from "@/components/ui/animated-counter";
import AnimatedSection from "@/components/ui/animated-section";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const metrics = [
  {
    icon: Calendar,
    value: 7,
    suffix: "+",
    label: "Years of Excellence",
    tooltip: "Over 7 years of dedicated service in labor law compliance",
    gradient: "from-primary to-accent",
  },
  {
    icon: Users,
    value: 60,
    suffix: "+",
    label: "Expert Specialists",
    tooltip: "A team of 60+ compliance, legal, and technology experts",
    gradient: "from-accent to-success",
  },
  {
    icon: Building2,
    value: 100,
    suffix: "+",
    label: "Clients Served",
    tooltip: "Trusted by over 100 businesses across industries",
    gradient: "from-success to-info",
  },
  {
    icon: Award,
    value: 15,
    suffix: "+",
    label: "Compliance Domains",
    tooltip: "Expertise across 15+ major labor law compliance areas",
    gradient: "from-info to-primary",
  },
];

const TrustIndicators = () => {
  return (
    <section className="relative py-16 bg-card overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-transparent to-accent/3" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="section-container relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((metric, index) => (
            <AnimatedSection key={index} animation="scale" delay={index * 100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="group metric-card cursor-help hover:shadow-glow transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Hover gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${metric.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                      <metric.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-2">
                      <AnimatedCounter
                        end={metric.value}
                        suffix={metric.suffix}
                        duration={1500 + index * 200}
                      />
                    </div>
                    <div className="text-sm font-medium text-muted-foreground">{metric.label}</div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-card border-border">
                  <p className="max-w-xs">{metric.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
