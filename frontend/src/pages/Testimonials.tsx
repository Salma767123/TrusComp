import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import TestimonialsHero from "@/components/testimonials/TestimonialsHero";
import ReviewStrips from "@/components/testimonials/ReviewStrips";
import WhyChooseSection from "@/components/testimonials/WhyChooseSection";
import { WHY_CHOOSE_ITEMS } from "@/data/testimonialsData";
import { useSEO } from "@/hooks/useSEO";

const Testimonials = () => {
  useSEO("testimonials");
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_BASE_URL || "";
        const response = await fetch(`${apiBase}/api/v1/testimonials?public_view=true`);
        if (response.ok) {
          const data = await response.json();
          setTestimonials(data);
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-white">
        <TestimonialsHero />
        <ReviewStrips testimonials={testimonials} />
        <WhyChooseSection items={WHY_CHOOSE_ITEMS} />
      </div>
    </Layout>
  );
};

export default Testimonials;
