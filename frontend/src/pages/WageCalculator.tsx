import Layout from "@/components/layout/Layout";
import { Calculator as CalcIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTASection from "@/components/home/CTASection";
import { useSEO } from "@/hooks/useSEO";

const WageCalculator = () => {
  useSEO("wage_calculator");

  const handleRedirect = () => {
    window.open("https://app.truscomp.com/WagecodeCalculator/wagecalculator", "_blank", "noopener,noreferrer");
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-background via-secondary/30 to-background border-b border-border/50">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <CalcIcon className="w-4 h-4" />
              Free Compliance Tool
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-foreground mb-6">
              Wage Impact <span className="gradient-text">Calculator</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-10 leading-relaxed">
              Plan and simulate the impact of the new wage codes on your organization with our specialized calculator.
            </p>

            {/* Redirect Button Section */}
            <div className="flex justify-center mt-4">
              <Button
                onClick={handleRedirect}
                size="lg"
                className="btn-primary px-8 py-7 lg:px-12 lg:py-8 text-lg font-bold rounded-xl shadow-[0_10px_30px_rgba(255,140,0,0.3)] hover:shadow-[0_15px_40px_rgba(255,140,0,0.4)] transition-all flex items-center gap-3 group"
              >
                TrusComp Wage Code Calculator
                <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section from Home Page */}
      <CTASection />
    </Layout>
  );
};

export default WageCalculator;
