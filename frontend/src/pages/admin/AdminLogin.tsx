import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logo from "@/assets/truscomp-logo-full.png";

const AdminLogin = () => {
    const [view, setView] = useState<"login" | "forgot">("login");

    // Login State
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Forgot Password State
    const [forgotEmail, setForgotEmail] = useState("");
    const [isResetLoading, setIsResetLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Login successful! Redirecting...");
                setTimeout(() => navigate("/admin/dashboard"), 1500);
            } else {
                toast.error(data.message || "Invalid credentials. Please try again.");
            }
        } catch (error) {
            toast.error("Unable to connect to the server. Is the backend running?");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsResetLoading(true);

        try {
            // Check if backend is reachable first
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            await fetch(`${apiBase}/auth/forgot-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: forgotEmail }),
            });

            // Security Best Practice: valid or invalid email, show same success message
            toast.success("If your email exists, you will receive a reset link shortly.");

            // Auto return to login after a delay
            setTimeout(() => setView("login"), 3000);

        } catch (error) {
            console.error(error);
            toast.error("Unable to request password reset. Please try again later.");
        } finally {
            setIsResetLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden font-sans selection:bg-orange-500/30">
            {/* --- Reference Style Background System (3D Volumetric Spheres) --- */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* 1. Deep Base Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

                {/* 2. Primary 3D Sphere (Top Left - Brand Orange) */}
                <motion.div animate={{ y: [0, -40, 0], scale: [1, 1.05, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[15%] -left-[10%] w-[900px] h-[900px] rounded-full opacity-90 blur-3xl mix-blend-screen" style={{ background: "radial-gradient(circle at 30% 30%, #fed7aa, #f97316, #c2410c, transparent 70%)" }} />

                {/* 3. Secondary 3D Sphere (Bottom Right - Deep Slate/Blue) */}
                <motion.div animate={{ y: [0, 40, 0], scale: [1, 1.1, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute -bottom-[20%] -right-[10%] w-[1000px] h-[1000px] rounded-full opacity-80 blur-3xl mix-blend-screen" style={{ background: "radial-gradient(circle at 70% 70%, #94a3b8, #475569, #1e293b, transparent 70%)" }} />

                {/* 4. Floating Accent Sphere (Small - Center Right) */}
                <motion.div animate={{ x: [0, -30, 0], y: [0, 20, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-[40%] right-[15%] w-[300px] h-[300px] rounded-full opacity-60 blur-2xl mix-blend-screen" style={{ background: "radial-gradient(circle at 50% 50%, #60a5fa, #2563eb, transparent 70%)" }} />

                {/* Glass Distortion Overlay */}
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
            </div>

            {/* --- Main Content (Reference Glass Card) --- */}
            <div className="relative z-10 w-full max-w-[500px] p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="relative bg-white/10 backdrop-blur-3xl rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden min-h-[600px] flex flex-col justify-center">
                        <div className="absolute inset-0 rounded-[40px] ring-1 ring-white/30 pointer-events-none" />

                        <div className="p-10 sm:p-14 space-y-10 relative">

                            {/* Animated View Switcher */}
                            <AnimatePresence mode="wait">
                                {view === "login" ? (
                                    <motion.div
                                        key="login-form"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-10"
                                    >
                                        {/* Header */}
                                        <div className="text-center space-y-4">
                                            <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
                                                <img src={logo} alt="TrusComp Logo" className="h-16 mx-auto drop-shadow-2xl" />
                                            </Link>
                                            <div className="space-y-2">
                                                <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">Admin Portal</h1>
                                                <p className="text-base text-orange-400 font-medium tracking-wide drop-shadow">Welcome Back, Administrator</p>
                                            </div>
                                        </div>

                                        <form onSubmit={handleLogin} className="space-y-6">
                                            <div className="space-y-1">
                                                <div className="relative group/input">
                                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within/input:text-orange-500 transition-colors duration-300" />
                                                    </div>
                                                    <Input type="email" placeholder="admin@truscomp.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="pl-12 h-14 bg-white/90 border-0 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-orange-500/50 transition-all rounded-2xl text-base font-medium shadow-sm" />
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <div className="relative group/input">
                                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                                                        <Lock className="h-5 w-5 text-slate-400 group-focus-within/input:text-orange-500 transition-colors duration-300" />
                                                    </div>
                                                    <Input type={showPassword ? "text" : "password"} placeholder="••••••••" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required className="pl-12 pr-14 h-14 bg-white/90 border-0 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-orange-500/50 transition-all rounded-2xl text-base font-medium shadow-sm" />
                                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none z-10">
                                                        <span className="text-[10px] font-bold uppercase tracking-wider">{showPassword ? "HIDE" : "SHOW"}</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center px-2">
                                                <div className="flex items-center gap-2">
                                                    <input type="checkbox" id="remember" className="w-4 h-4 rounded border-white/30 bg-white/20 text-orange-500 focus:ring-2 focus:ring-orange-500/50 cursor-pointer" />
                                                    <label htmlFor="remember" className="text-sm font-medium text-slate-200 cursor-pointer select-none">Remember</label>
                                                </div>
                                                <button type="button" onClick={() => setView("forgot")} className="text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors focus:outline-none">Forgot Password?</button>
                                            </div>

                                            <Button type="submit" disabled={isLoading} className="w-full h-14 bg-orange-500 hover:bg-orange-400 text-white font-bold text-base tracking-wide rounded-2xl shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(249,115,22,0.5)] active:scale-[0.98] transition-all relative overflow-hidden group border-t border-white/20">
                                                <AnimatePresence mode="wait">
                                                    {isLoading ? (
                                                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                            <span>Accessing System...</span>
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-between w-full px-4">
                                                            <span className="flex-1 text-center">Proceed to my Account</span>
                                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </Button>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="forgot-form"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-10"
                                    >
                                        {/* Header */}
                                        <div className="text-center space-y-4">
                                            <div onClick={() => setView("login")} className="inline-block cursor-pointer hover:opacity-80 transition-opacity">
                                                <img src={logo} alt="TrusComp Logo" className="h-16 mx-auto drop-shadow-2xl" />
                                            </div>
                                            <div className="space-y-2">
                                                <h1 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">Account Recovery</h1>
                                                <p className="text-base text-orange-400 font-medium tracking-wide drop-shadow">Enter your verified email to proceed</p>
                                            </div>
                                        </div>

                                        <form onSubmit={handleForgot} className="space-y-6">
                                            <div className="space-y-1">
                                                <div className="relative group/input">
                                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                                                        <Mail className="h-5 w-5 text-slate-400 group-focus-within/input:text-orange-500 transition-colors duration-300" />
                                                    </div>
                                                    <Input type="email" placeholder="name@example.com" autoComplete="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required className="pl-12 h-14 bg-white/90 border-0 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-orange-500/50 transition-all rounded-2xl text-base font-medium shadow-sm" />
                                                </div>
                                            </div>

                                            <Button type="submit" disabled={isResetLoading} className="w-full h-14 bg-orange-500 hover:bg-orange-400 text-white font-bold text-base tracking-wide rounded-2xl shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(249,115,22,0.5)] active:scale-[0.98] transition-all relative overflow-hidden group border-t border-white/20">
                                                <AnimatePresence mode="wait">
                                                    {isResetLoading ? (
                                                        <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                                            <Loader2 className="w-5 h-5 animate-spin" />
                                                            <span>Verifying Email...</span>
                                                        </motion.div>
                                                    ) : (
                                                        <motion.div key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-between w-full px-4">
                                                            <span className="flex-1 text-center">Send Recovery Link</span>
                                                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </Button>

                                            <div className="text-center pt-2">
                                                <button type="button" onClick={() => setView("login")} className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                                                    Back to Secure Login
                                                </button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    {/* Footer / Copyright */}
                    <div className="mt-8 text-center">
                        <p className="text-xs font-medium text-slate-500/80 tracking-wide">
                            &copy; {new Date().getFullYear()} TrusComp. Secure Operating Environment.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;
