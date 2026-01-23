import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import WageCalculator from "./pages/WageCalculator";
import Resources from "./pages/Resources";
import BlogDetail from "./pages/BlogDetail";
import UpdateDetail from "./pages/UpdateDetail";
import MonthlyLabourLawDetail from "./components/resources/MonthlyLabourLawDetail";
import Contact from "./pages/Contact";
import Testimonials from "./pages/Testimonials";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SEOManager from "./pages/admin/SEOManager";
import EnquiryManager from "./pages/admin/EnquiryManager";
import SettingsManager from "./pages/admin/SettingsManager";
import VerifyEmailChange from "./pages/admin/VerifyEmailChange";
import ResetPassword from "./pages/admin/ResetPassword";
import ServicesManager from "./pages/admin/ServicesManager";
import AdminLayout from "./components/admin/AdminLayout";
import ResourceManager from "./pages/admin/ResourceManager";
import BlogManager from "./pages/admin/BlogManager";
import TestimonialsManager from "./pages/admin/TestimonialsManager";
import LabourLawManager from "./pages/admin/LabourLawManager";
import { useSettings } from "./hooks/useSettings";
import { useEffect } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const { data: settings } = useSettings();

  useEffect(() => {
    if (settings?.favicon) {
      const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = settings.favicon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
  }, [settings?.favicon]);

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/calculator" element={<WageCalculator />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/updates" element={<Resources />} />
          <Route path="/updates/:id" element={<UpdateDetail />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/monthly-labour-law/:id" element={<MonthlyLabourLawDetail />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/verify-email" element={<VerifyEmailChange />} />
          <Route path="/admin/reset-password" element={<ResetPassword />} />

          {/* Protected Admin Routes with Layout */}
          <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
          <Route path="/admin/seo" element={<AdminLayout><SEOManager /></AdminLayout>} />
          <Route path="/admin/enquiries" element={<AdminLayout><EnquiryManager /></AdminLayout>} />
          <Route path="/admin/settings" element={<AdminLayout><SettingsManager /></AdminLayout>} />
          <Route path="/admin/services" element={<AdminLayout><ServicesManager /></AdminLayout>} />
          <Route path="/admin/resources" element={<AdminLayout><ResourceManager /></AdminLayout>} />
          <Route path="/admin/labour-law-updates" element={<AdminLayout><LabourLawManager /></AdminLayout>} />
          <Route path="/admin/blogs" element={<AdminLayout><BlogManager /></AdminLayout>} />
          <Route path="/admin/testimonials" element={<AdminLayout><TestimonialsManager /></AdminLayout>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContent />
  </QueryClientProvider>
);

export default App;
