import Layout from "@/components/layout/Layout";
import { useState, useEffect } from "react";
import {
  validateName,
  validateEmail,
  validatePhone,
  validateService,
  validateMessage
} from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSettings } from "@/hooks/useSettings";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, CheckCircle2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSEO } from "@/hooks/useSEO";

interface Service {
  id: number;
  title: string;
}

const Contact = () => {
  useSEO("contact");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const { data: settings } = useSettings();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });

  const [errors, setErrors] = useState({
    name: null as string | null,
    email: null as string | null,
    phone: null as string | null,
    service: null as string | null,
    message: null as string | null
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name': return validateName(value);
      case 'email': return validateEmail(value);
      case 'phone': return validatePhone(value);
      case 'service': return validateService(value);
      case 'message': return validateMessage(value);
      default: return null;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const isFormValid = () => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      service: validateService(formData.service),
      message: validateMessage(formData.message)
    };

    // Check if any error is not null
    const isValid = !Object.values(newErrors).some(error => error !== null);
    return isValid;
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "";
      const response = await fetch(`${apiBase}/services?public_view=true`);
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      }
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields on submit attempt
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      service: validateService(formData.service),
      message: validateMessage(formData.message)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some(error => error !== null)) {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "";
      const response = await fetch(`${apiBase}/enquiries/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service_interest: formData.service,
          message: formData.message
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        const error = await response.json();
        toast({
          title: "Submission Failed",
          description: error.message || "Failed to submit request. Please try again.",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Connection Error",
        description: "Could not reach the server. Please check your internet.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Contact Section with Integrated Header */}
      <section className="pt-6 lg:pt-12 pb-6 lg:pb-24 bg-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Gradient Blobs */}
          <motion.div
            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-orange-100/40 blur-[100px]"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 12, repeat: Infinity }}
          />

          {/* Animated Dots/Particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/20"
              style={{
                width: Math.random() * 8 + 4 + "px",
                height: Math.random() * 8 + 4 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, -80, 0],
                x: [0, Math.random() * 40 - 20, 0],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <div className="section-container relative z-10">
          {/* Page Header */}
          <div className="text-center mb-12 lg:mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-orange-50 text-primary text-sm font-medium border border-orange-100 mb-6"
            >
              Contact Us
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-display font-bold text-slate-900 mb-6 tracking-tight"
            >
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Touch</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
            >
              Ready to simplify your compliance? We're here to help you navigate complex labor laws with ease.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-500" />

                <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 relative z-10">
                  Contact Information
                </h2>
                <p className="text-slate-600 mb-8 relative z-10">
                  Reach out to us for a free compliance consultation.
                  Our experts are ready to help.
                </p>

                <div className="space-y-6 relative z-10">
                  {/* Address */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 text-primary shadow-sm border border-orange-100">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Address</h4>
                      <p className="text-sm text-slate-600">
                        {settings?.office_address ? (
                          [
                            settings.office_address.line1,
                            settings.office_address.street,
                            settings.office_address.district,
                            settings.office_address.state,
                            settings.office_address.country
                          ].filter(Boolean).join(', ') + (settings.office_address.pincode ? ` - ${settings.office_address.pincode}` : '')
                        ) : (
                          "No 9, Pe Ve Plaza, Lakshmi Nagar, Porur, Chennai - 600116"
                        )}
                      </p>
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 text-primary shadow-sm border border-orange-100">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Phone</h4>
                      <a href={`tel:${settings?.contact_phone || '+914449006000'}`} className="text-sm text-slate-600 hover:text-primary transition-colors block">
                        {settings?.contact_phone || '+91 44 4900 6000'}
                      </a>
                    </div>
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 text-primary shadow-sm border border-orange-100">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                      <a href={`mailto:${settings?.contact_email || 'contact@truscomp.com'}`} className="text-sm text-slate-600 hover:text-primary transition-colors block">
                        {settings?.contact_email || 'contact@truscomp.com'}
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-xl shadow-slate-900/10">
                <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Office Hours
                </h4>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex justify-between border-b border-slate-800 pb-2">
                    <span>Monday - Friday</span>
                    <span className="font-medium text-white">9:00 AM - 6:00 PM</span>
                  </li>
                  <li className="flex justify-between border-b border-slate-800 pb-2">
                    <span>Saturday</span>
                    <span className="font-medium text-white">9:00 AM - 1:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-orange-400">Closed</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="dashboard-card p-8">
                <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                  Compliance Intake Form
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        required
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={errors.phone ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                      {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email ID *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                      />
                      {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Service *</Label>
                    <Select
                      onValueChange={(value) => handleInputChange('service', value)}
                      value={formData.service}
                    >
                      <SelectTrigger className={errors.service ? "border-red-500 focus:ring-red-500" : ""}>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map(service => (
                          <SelectItem key={service.id} value={service.title}>{service.title}</SelectItem>
                        ))}
                        <SelectItem value="Others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.service && <p className="text-xs text-red-500 font-medium">{errors.service}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us about your compliance needs</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your current compliance challenges..."
                      rows={4}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {errors.message && <p className="text-xs text-red-500 font-medium">{errors.message}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="btn-primary w-full"
                    size="lg"
                    disabled={isSubmitting || !isFormValid()}
                  >
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      <AnimatePresence>
        {isSubmitted && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative text-center"
            >
              <button
                onClick={() => setIsSubmitted(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-success" />
              </div>

              <h3 className="text-2xl font-display font-bold text-slate-900 mb-3">
                Submission Successful
              </h3>

              <p className="text-slate-600 mb-8 leading-relaxed">
                Your compliance request has been submitted successfully. Our team will review your details and reach out to you shortly.
              </p>

              <Button
                onClick={() => setIsSubmitted(false)}
                className="btn-primary w-full"
              >
                Great, Thank You
              </Button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Contact;
