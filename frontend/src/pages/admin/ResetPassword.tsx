import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Eye, EyeOff, Loader2, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import logo from "@/assets/truscomp-logo-full.png";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (!token) {
            toast.error("Invalid or missing reset token.");
            navigate("/admin/login");
        }
    }, [token, navigate]);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setIsLoading(true);

        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/auth/reset-password`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Password reset successful!");
                setIsSuccess(true);
                setTimeout(() => navigate("/admin/login"), 2000);
            } else {
                toast.error(data.message || "Failed to reset password");
            }
        } catch (error) {
            toast.error("Server connection error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden font-sans selection:bg-orange-500/30">
            {/* --- Background System (Same as Login) --- */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                <motion.div animate={{ y: [0, -40, 0], scale: [1, 1.05, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[15%] -left-[10%] w-[900px] h-[900px] rounded-full opacity-90 blur-3xl mix-blend-screen" style={{ background: "radial-gradient(circle at 30% 30%, #fed7aa, #f97316, #c2410c, transparent 70%)" }} />
                <motion.div animate={{ y: [0, 40, 0], scale: [1, 1.1, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute -bottom-[20%] -right-[10%] w-[1000px] h-[1000px] rounded-full opacity-80 blur-3xl mix-blend-screen" style={{ background: "radial-gradient(circle at 70% 70%, #94a3b8, #475569, #1e293b, transparent 70%)" }} />
                <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
            </div>

            {/* --- Main Content --- */}
            <div className="relative z-10 w-full max-w-[500px] p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="relative bg-white/10 backdrop-blur-3xl rounded-[40px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden">
                        <div className="absolute inset-0 rounded-[40px] ring-1 ring-white/30 pointer-events-none" />

                        <div className="p-10 sm:p-14 space-y-8">
                            {/* Header */}
                            <div className="text-center space-y-4">
                                <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
                                    <img src={logo} alt="TrusComp Logo" className="h-16 mx-auto drop-shadow-2xl" />
                                </Link>
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">Reset Password</h1>
                                    <p className="text-base text-slate-200 font-medium tracking-wide drop-shadow">Create a new secure password</p>
                                </div>
                            </div>

                            {/* Success State */}
                            {isSuccess ? (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6 py-4">
                                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto ring-1 ring-emerald-500/50">
                                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-bold text-white">Password Updated</h3>
                                        <p className="text-slate-200">Your password has been securely reset.</p>
                                    </div>
                                    <Button onClick={() => navigate("/admin/login")} className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all">
                                        Return to Login
                                    </Button>
                                </motion.div>
                            ) : (
                                /* Form */
                                <form onSubmit={handleReset} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <div className="relative group/input">
                                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                                                    <Lock className="h-5 w-5 text-slate-400 group-focus-within/input:text-orange-500 transition-colors duration-300" />
                                                </div>
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="New Password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    required
                                                    className="pl-12 pr-14 h-14 bg-white/90 border-0 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-orange-500/50 transition-all rounded-2xl text-base font-medium shadow-sm"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none z-10"
                                                >
                                                    <span className="text-[10px] font-bold uppercase tracking-wider">{showPassword ? "HIDE" : "SHOW"}</span>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <div className="relative group/input">
                                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none z-10">
                                                    <ShieldCheck className="h-5 w-5 text-slate-400 group-focus-within/input:text-orange-500 transition-colors duration-300" />
                                                </div>
                                                <Input
                                                    type="password"
                                                    placeholder="Confirm New Password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    required
                                                    className="pl-12 h-14 bg-white/90 border-0 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-orange-500/50 transition-all rounded-2xl text-base font-medium shadow-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full h-14 bg-orange-500 hover:bg-orange-400 text-white font-bold text-base tracking-wide rounded-2xl shadow-[0_10px_20px_-5px_rgba(249,115,22,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(249,115,22,0.5)] active:scale-[0.98] transition-all relative overflow-hidden group border-t border-white/20"
                                    >
                                        <AnimatePresence mode="wait">
                                            {isLoading ? (
                                                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    <span>Updating Securely...</span>
                                                </motion.div>
                                            ) : (
                                                <motion.div key="reset" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-between w-full px-4">
                                                    <span className="flex-1 text-center">Set New Password</span>
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ResetPassword;
