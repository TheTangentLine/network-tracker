// ---- Hooks ----
import React, { useState, useEffect } from "react";
import useRegister from "../../hooks/auth/useRegister";

// ---- Components ----
import InputFieldComponent from "./InputField";

// ---- Entities ----
import type { UserRegister } from "../../entities/User";

// ---- Icons ----
import { FaSignInAlt } from "react-icons/fa";

// ---- Validation ----
import { z } from "zod";
import { useNavigate } from "react-router-dom";

// ----------------------------------- Zod for validation ------------------------------->

const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, { message: "Username must be 3-50 characters." })
            .max(50, { message: "Username must be 3-50 characters." }),
        phone: z
            .string()
            .regex(/^[0-9]+$/, { message: "Phone must contain only numbers." })
            .min(10, { message: "Please enter a valid phone number." })
            .max(15, { message: "Please enter a valid phone number." }),
        email: z.string().email({ message: "Invalid email address." }),
        password: z.string().min(6, { message: "Password must be at least 6 characters." }),
        repassword: z.string().nonempty({ message: "Passwords do not match." }),
        nationality: z.string().nonempty({ message: "Nationality is required." }),
    })
    .refine((data) => data.password === data.repassword, {
        message: "Passwords do not match.",
        path: ["repassword"],
    });

type FieldErrors = Record<string, string>;

// ===================================== Main components =====================================>

const RegisterForm = () => {

    // ----------------------------------- State management ----------------------------------->

    const [user, setUser] = useState<UserRegister>({
        username: "",
        phone: "",
        email: "",
        password: "",
        nationality: "Vietnam",
    });
    const [repassword, setRepassword] = useState("");
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const { register, error, loading } = useRegister();

    const navigate = useNavigate()

    // ---------------s-------------------- Live validation ------------------------------------>

    useEffect(() => {
        const data = { ...user, repassword };
        const result = registerSchema.safeParse(data);
        if (result.success) {
            setFieldErrors({});
        } else {
            const flat = result.error.flatten().fieldErrors as Record<string, string[]>;
            const errors: FieldErrors = {};
            Object.entries(flat).forEach(([field, msgs]) => {
                const val = (data as any)[field] as string;
                if (msgs && msgs.length > 0 && val.trim() !== "") {
                    errors[field] = msgs[0];
                }
            });
            setFieldErrors(errors);
        }
    }, [user, repassword]);

    // ---------------------------------- Determine validity ------------------------------------>

    const isFormValid = registerSchema.safeParse({ ...user, repassword }).success;

    // ---------------------------------- Handle submission ----------------------------------->

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isFormValid) return;
        const { repassword: _rp, ...validData } = registerSchema.parse({ ...user, repassword });
        const data = await register(validData);
        if (data && !loading)
            navigate('/login')
    };

    // ================================ Rendering =====================================>

    return (
        <div className="w-full max-w-lg">
            {/* Form Card */}
            <div className="bg-white rounded-2xl shadow-2xl shadow-emerald-600/20 p-8 border border-emerald-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username Field */}
                    <InputFieldComponent
                        label="Username"
                        value={user.username}
                        onChange={(val) => setUser(prev => ({ ...prev, username: val }))}
                        type="text"
                        placeholder="Enter your username"
                        error={fieldErrors.username}
                    />

                    {/* Phone Field */}
                    <InputFieldComponent
                        label="Phone"
                        value={user.phone}
                        onChange={(val) => setUser(prev => ({ ...prev, phone: val }))}
                        type="text"
                        placeholder="Enter your phone number"
                        error={fieldErrors.phone}
                    />

                    {/* Email Field */}
                    <InputFieldComponent
                        label="Email"
                        value={user.email}
                        onChange={(val) => setUser(prev => ({ ...prev, email: val }))}
                        type="email"
                        placeholder="Enter your email"
                        error={fieldErrors.email}
                    />

                    {/* Password Field */}
                    <InputFieldComponent
                        label="Password"
                        value={user.password}
                        onChange={(val) => setUser(prev => ({ ...prev, password: val }))}
                        type="password"
                        placeholder="Enter your password"
                        error={fieldErrors.password}
                    />

                    {/* Re-enter Password Field */}
                    <InputFieldComponent
                        label="Re-enter Password"
                        value={repassword}
                        onChange={(val) => setRepassword(val)}
                        type="password"
                        placeholder="Re-enter your password"
                        error={fieldErrors.repassword}
                    />

                    {/* Nationality Field */}
                    <div className="flex flex-col mb-4">
                        <label className="text-sm font-montserrat-bold text-emerald-700 uppercase tracking-wide p-2">Nationality</label>
                        <select
                            className={`h-12 w-full px-4 py-3 rounded-lg border-2 font-montserrat transition-all duration-300 ${
                                fieldErrors.nationality
                                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                    : 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                            }`}
                            value={user.nationality}
                            onChange={(e) => setUser(prev => ({ ...prev, nationality: e.target.value }))}
                        >
                            <option value="">Select nationality</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="Australia">Australia</option>
                        </select>
                        {fieldErrors.nationality && (
                            <span className="text-red-600 text-sm font-montserrat mt-1">{fieldErrors.nationality}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !isFormValid}
                        className="cursor-pointer w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-montserrat-bold text-lg py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Creating Account...
                            </div>
                        ) : (
                            <>
                                <FaSignInAlt className="mr-3" />
                                Sign Up
                            </>
                        )}
                    </button>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-600 font-montserrat-bold text-center">{error}</p>
                    )}

                    {/* Login Link */}
                    <div className="text-center pt-4 border-t border-emerald-100">
                        <p className="text-emerald-600 font-montserrat">
                            Already got an account?{" "}
                            <a
                                href="/login"
                                className="text-emerald-700 font-montserrat-bold hover:text-emerald-900 transition-colors duration-200 underline"
                            >
                                Sign in here
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
