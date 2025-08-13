// ---- Hooks ----
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useLogin from "../../hooks/auth/useLogin";

// ---- Components ----
import InputFieldComponent from "./InputField";

// ---- Entities ----
import type { UserLogin } from "../../entities/User";

// ---- Icons ----
import { FaSignInAlt } from "react-icons/fa";

// ---- Validation ----
import { z } from "zod";
import useFetch from "../../hooks/auth/useFetch";

// ----------------------------------- Zod for validation ------------------------------->

const loginSchema = z
    .object({
        username: z.string().min(3, { message: "Username must be at least 3 characters" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    });

type FieldErrors = Record<string, string>;

// ===================================== Main components =====================================>

const LoginForm = () => {

    // ----------------------------------- State management ----------------------------------->

    const [user, setUser] = useState<UserLogin>({ username: "", password: "" });
    const { user: authUser } = useFetch();

    const { login, error, loading } = useLogin();
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    // ----------------------------------- Live validation ------------------------------------>

    useEffect(() => {
        const result = loginSchema.safeParse(user);
        if (result.success) {
            setFieldErrors({});
        } else {
            const flat = result.error.flatten().fieldErrors as Record<string, string[]>;
            const errors: FieldErrors = {};
            Object.entries(flat).forEach(([field, msgs]) => {
                if (msgs && msgs.length > 0) {
                    const value = (user as any)[field] as string;
                    if (value.trim() !== "") {
                        errors[field] = msgs[0];
                    }
                }
            });
            setFieldErrors(errors);
        }
    }, [user]);

    // ---------------------------------- Determine validity ------------------------------------>

    const isFormValid = loginSchema.safeParse(user).success;

    // ---------------------------------- Redirect for first time login ----------------------------->

    useEffect(() => {
        if (authUser) {
            navigate('/testing');
        }
    }, [authUser, navigate]);

    // ---------------------------------- Handle submission ----------------------------------->

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid) return;
        const auth = await login(user);
        if (auth) {
            navigate('/testing');
        }
    };

    // ================================ Rendering =====================================>

    return (
        <div className="w-full max-w-md">
            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-2xl shadow-emerald-600/20 p-8 border border-emerald-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field */}
                    <InputFieldComponent
                        label="Username or Email"
                        value={user.username}
                        onChange={(value) => setUser(prev => ({ ...prev, username: value }))}
                        placeholder="Enter your username or email"
                        type="text"
                        error={fieldErrors.username}
                    />

                    {/* Password Field */}
                    <InputFieldComponent
                        label="Password"
                        value={user.password}
                        onChange={(value) => setUser(prev => ({ ...prev, password: value }))}
                        placeholder="Enter your password"
                        type={!showPassword ? "password" : "text"}
                        error={fieldErrors.password}
                        showButton={true}
                        show={!showPassword ? false : true}
                        onToggleShow={() => setShowPassword(prev => !prev)}
                    />

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !isFormValid}
                        className="cursor-pointer w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-montserrat-bold text-lg py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Signing In...
                            </div>
                        ) : (
                            <>
                                <FaSignInAlt className="mr-3" />
                                Sign In
                            </>
                        )}
                    </button>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-600 font-montserrat-bold text-center">{error}</p>
                    )}

                    {/* Register Link */}
                    <div className="text-center pt-4 border-t border-emerald-100">
                        <p className="text-emerald-600 font-montserrat">
                            Haven't got an account?{" "}
                            <a
                                href="/register"
                                className="text-emerald-700 font-montserrat-bold hover:text-emerald-900 transition-colors duration-200 underline"
                            >
                                Register here
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;