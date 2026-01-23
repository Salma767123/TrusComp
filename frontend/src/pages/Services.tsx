import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ServiceDoodle } from "@/components/services/ServiceDoodles";
import { ArrowRight } from "lucide-react";
import { ServiceProcessFlow } from "@/components/services/ServiceProcessFlow";

import { useSEO } from "@/hooks/useSEO";

const Services = () => {
  useSEO("services_main");
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL || "";
        const response = await fetch(`${apiBase}/api/v1/services?public_view=true`);
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        }
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <Layout>
      <div className="bg-background text-foreground min-h-screen">
        {/* Immersive Header - Refined Coal Ash Theme */}
        <section className="relative pt-40 pb-40 overflow-hidden bg-[#161618]">
          {/* Advanced Creative Background */}
          <div className="absolute inset-0">
            {/* Coal Ash Base with Subtle Noise Texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f11] via-[#1c1c1e] to-[#0f0f11]" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />

            {/* Unique Motion Element: Kinetic Particle Field */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-primary/20"
                  style={{
                    width: Math.random() * 4 + 2,
                    height: Math.random() * 4 + 2,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    x: [0, Math.random() * 50 - 25, 0],
                    opacity: [0, 0.4, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 15 + Math.random() * 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 10,
                  }}
                />
              ))}
            </div>

            {/* Unique Motion Element: Organic Connection Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none">
              <motion.path
                d="M-50,150 Q200,50 400,200 T800,100 T1200,250"
                stroke="white"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M1400,100 Q1100,300 800,150 T400,350 T0,200"
                stroke="white"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 2 }}
              />
            </svg>

            {/* Parallax Creative Doodles */}
            <motion.div
              className="absolute top-[5%] left-[22%] w-28 h-28 text-primary/10"
              style={{ y: useTransform(useScroll().scrollY, [0, 500], [0, -100]) }}
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            >
              <ServiceDoodle type="shield" />
            </motion.div>

            <motion.div
              className="absolute bottom-[10%] right-[30%] w-36 h-36 text-accent/10"
              style={{ y: useTransform(useScroll().scrollY, [0, 500], [0, 150]) }}
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            >
              <ServiceDoodle type="automation" />
            </motion.div>

            <motion.div
              className="absolute bottom-[35%] right-[5%] w-24 h-24 text-white/5"
              style={{ x: useTransform(useScroll().scrollY, [0, 500], [0, 50]) }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <ServiceDoodle type="audit" />
            </motion.div>
          </div>

          <div className="section-container relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8 backdrop-blur-sm"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
                  The TrusComp Ecosystem
                </span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter leading-[1.1] md:leading-[1] text-white"
              >
                Intelligent <br />
                <span className="relative inline-block mt-4 pb-2">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-shimmer">
                    Compliance Modules
                  </span>
                  {/* Magnetic Underline Effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
                    initial={{ width: 0, x: "-100%" }}
                    animate={{ width: "100%", x: "0%" }}
                    transition={{ duration: 2, delay: 0.5, ease: "circOut" }}
                  />
                  <motion.div
                    className="absolute -bottom-1 left-0 h-[4px] bg-primary/20 blur-md"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 0.7 }}
                  />
                </span>
              </motion.h1>

              <motion.p
                className="mt-10 text-lg md:text-2xl text-white/50 max-w-4xl mx-auto font-light leading-relaxed"
              >
                Explore our modular operating system of automated services,
                engineered to transform regulatory complexity into operational clarity.
              </motion.p>

              <ServiceProcessFlow />
            </motion.div>
          </div>
        </section>

        {/* Kinetic Module Stream */}
        <section className="pb-40">
          <div className="section-container">
            <div className="flex flex-col">
              {services.map((service, index) => (
                <ServiceStreamNode
                  key={service.id}
                  service={service}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Global CTA */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#4a5568] via-[#3d4654] to-[#2d3748]" />

          {/* CTA Background Doodles */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute -top-10 -left-10 w-64 h-64 text-white/5"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <ServiceDoodle type="audit" />
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-10 w-40 h-40 text-white/5"
              animate={{ x: [0, 50, 0], opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            >
              <ServiceDoodle type="payroll" />
            </motion.div>
          </div>

          <div className="section-container text-center relative z-10">
            <h2 className="text-2xl md:text-4xl font-display font-bold mb-12 text-white">Ready to Engineer Your Compliance?</h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-4 bg-primary text-primary-foreground px-10 py-5 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-primary/25"
            >
              Talk to an Expert <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </div >
    </Layout >
  );
};

const ServiceStreamNode = ({ service, index }: any) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "center center"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <motion.div
      ref={container}
      className="group relative py-12 md:py-16 border-b border-border last:border-0"
    >
      <Link to={`/services/${service.slug}`} className="block relative z-10">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          {/* Service Index & Doodle */}
          <div className="flex items-center gap-8 md:w-1/4">
            <span className="text-4xl md:text-6xl font-display font-black text-foreground/5 group-hover:text-primary/20 transition-colors">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="w-20 h-20 md:w-24 md:h-24 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 text-foreground">
              <ServiceDoodle type={service.doodle_type || "shield"} />
            </div>
          </div>

          {/* Service Content */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold uppercase tracking-widest text-primary border border-border">
                {service.category}
              </span>
            </div>
            <h3 className="text-2xl md:text-4xl font-display font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-500 group-hover:translate-x-2">
              {service.title}
            </h3>
            <p className="text-base md:text-lg text-muted-foreground font-light max-w-2xl leading-relaxed group-hover:text-foreground transition-colors">
              {service.overview}
            </p>

            {/* Additional Details (Features Preview) */}
            <div className="flex flex-wrap gap-2 mt-4">
              {service.features && service.features.slice(0, 3).map((feature: any, i: number) => (
                <span key={i} className="text-xs font-medium px-2 py-1 bg-secondary rounded text-muted-foreground border border-border">
                  • {feature.title}
                </span>
              ))}
              {service.features && service.features.length > 3 && (
                <span className="text-xs font-medium px-2 py-1 text-primary">+ {service.features.length - 3} more</span>
              )}
            </div>
          </div>

          {/* Action Arrow */}
          <div className="hidden md:block">
            <motion.div
              style={{ opacity, x }}
              className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-background"
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </div>
        </div>
      </Link>

      {/* Kinetic Background Element - Adjusted for light theme */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-full bg-secondary/50 -z-10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.2 }}
      />
    </motion.div>
  );
};

export default Services;
