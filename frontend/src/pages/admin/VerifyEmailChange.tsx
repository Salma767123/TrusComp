import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

const VerifyEmailChange = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            setError("Invalid verification link. Token is missing.");
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        setIsSubmitting(true);

        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL || "";
            const response = await fetch(`${apiBase}/auth/verify-email-change`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token, newPassword: password }),
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                toast.success("Email verified successfully!");
                setTimeout(() => {
                    navigate("/admin/login");
                }, 3000);
            } else {
                setError(data.message || "Verification failed");
                toast.error(data.message || "Verification failed");
            }
        } catch (err) {
            console.error("Verification error:", err);
            setError("Network error. Please try again.");
            toast.error("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900">Email Verified!</h2>
                    <p className="text-slate-600">
                        Your admin email has been updated successfully.
                        <br />
                        Redirecting to login...
                    </p>
                    <Button
                        onClick={() => navigate("/admin/login")}
                        className="w-full mt-4"
                    >
                        Go to Login
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-in fade-in zoom-in duration-300">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-slate-900">Set New Password</h2>
                    <p className="text-sm text-slate-500 mt-2">
                        To complete your email change, please set a new secure password for your admin account.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3 text-red-700 text-sm items-start">
                        <XCircle className="w-5 h-5 shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">New Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-11"
                            placeholder="••••••••••••"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Confirm Password</label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="h-11"
                            placeholder="••••••••••••"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isSubmitting || !token}
                        className="w-full h-11 text-sm font-bold uppercase tracking-wider mt-4"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            "Verify & Set Password"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default VerifyEmailChange;
