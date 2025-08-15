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

// ----------------------------------- Password Strength Checker ------------------------------->

interface PasswordRequirement {
    label: string;
    test: (password: string) => boolean;
    met: boolean;
}

const createPasswordRequirements = (): PasswordRequirement[] => [
    {
        label: "At least 12 characters long",
        test: (password: string) => password.length >= 12,
        met: false
    },
    {
        label: "Contains at least one uppercase letter",
        test: (password: string) => /[A-Z]/.test(password),
        met: false
    },
    {
        label: "Contains at least one lowercase letter",
        test: (password: string) => /[a-z]/.test(password),
        met: false
    },
    {
        label: "Contains at least one number",
        test: (password: string) => /\d/.test(password),
        met: false
    },
    {
        label: "Contains at least one special character",
        test: (password: string) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
        met: false
    },


];

// ----------------------------------- Zod for validation ------------------------------->

const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, { message: "Username must be 3-50 characters." })
            .max(50, { message: "Username must be 3-50 characters." })
            .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores." }),
        phone: z
            .string()
            .regex(/^\+?[0-9]{10,15}$/, { message: "Please enter a valid phone number (10-15 digits, optionally starting with +)." }),
        email: z.string().email({ message: "Invalid email address." }),
        password: z.string()
            .min(12, { message: "Password must be at least 12 characters." })
            .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
            .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
            .regex(/\d/, { message: "Password must contain at least one number." })
            .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { message: "Password must contain at least one special character." }),
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
    const [passwordRequirements, setPasswordRequirements] = useState(createPasswordRequirements());
    const { register, error, loading } = useRegister();

    const navigate = useNavigate()

    // ----------------------------------- Password strength checker ------------------------------------>

    useEffect(() => {
        const updatedRequirements = passwordRequirements.map(req => ({
            ...req,
            met: req.test(user.password)
        }));
        setPasswordRequirements(updatedRequirements);
    }, [user.password]);

    // ------------------------------------ Live validation ------------------------------------>

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
                            <option value="United States">United States</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                            <option value="Japan">Japan</option>
                            <option value="South Korea">South Korea</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Other">Other</option>
                        </select>
                        {fieldErrors.nationality && (
                            <span className="text-red-600 text-sm font-montserrat mt-1">{fieldErrors.nationality}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading || !isFormValid}
                        className="mt-10 cursor-pointer w-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-montserrat-bold text-lg py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
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
