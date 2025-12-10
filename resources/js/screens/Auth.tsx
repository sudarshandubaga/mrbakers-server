import React, { useState } from "react";
import {
    ChefHat,
    ArrowRight,
    KeyRound,
    Loader2,
    ArrowLeft,
    Phone,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { doLogin } from "@/redux/actions/authAction";
import { AppDispatch } from "@/redux/store";
import { toast } from "react-toastify";

export const Auth: React.FC = () => {
    const [view, setView] = useState<"LOGIN" | "FORGOT">("LOGIN");
    const [isLoading, setIsLoading] = useState(false);
    const [phone, setPhone] = useState("9012345678");
    const [password, setPassword] = useState("Admin@123");

    const dispatch = useDispatch<AppDispatch>();

    const onLogin = async () => {
        let res = await dispatch(doLogin(phone, password));

        if (!res.success) {
            toast.warning(res.error || "Login failed.");
        } else {
            toast.success(res.message);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            if (view === "LOGIN") {
                onLogin();
            } else {
                alert("Password reset link sent to your phone!");
                setView("LOGIN");
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Image */}
            <div className="hidden lg:flex w-1/2 relative bg-bakery-900">
                <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent z-10" />
                <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072&auto=format&fit=crop"
                    alt="Bakery"
                    className="w-full h-full object-cover"
                />
                <div className="absolute bottom-10 left-10 z-20 text-white p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <ChefHat size={32} className="text-bakery-200" />
                        <h1 className="text-3xl font-bold">Crumb & Crust</h1>
                    </div>
                    <p className="text-bakery-100 max-w-md text-lg">
                        "The secret ingredient is always love, but a little
                        butter and sugar helps too."
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    <div className="mb-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {view === "LOGIN"
                                ? "Welcome Back"
                                : "Reset Password"}
                        </h2>
                        <p className="text-gray-500 mt-2">
                            {view === "LOGIN"
                                ? "Enter your credentials to access the admin panel."
                                : "Enter your phone to receive reset instructions."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Mobile No.
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="tel"
                                    minLength={10}
                                    maxLength={10}
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none transition-all"
                                    placeholder="10 Digit Mobile No."
                                    required
                                />
                            </div>
                        </div>

                        {view === "LOGIN" && (
                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setView("FORGOT")}
                                        className="text-xs text-bakery-600 hover:text-bakery-700 font-medium"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bakery-500/20 focus:border-bakery-500 outline-none transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-bakery-600 hover:bg-bakery-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <>
                                    {view === "LOGIN"
                                        ? "Sign In"
                                        : "Send Reset Link"}
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    {view === "FORGOT" && (
                        <button
                            onClick={() => setView("LOGIN")}
                            className="w-full mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
                        >
                            <ArrowLeft size={16} /> Back to Login
                        </button>
                    )}

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-xs text-gray-400">
                            &copy; 2024 Crumb & Crust. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
