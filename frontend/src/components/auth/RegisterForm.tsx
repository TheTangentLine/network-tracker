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
        <form
            className="flex flex-col items-center justify-center shadow-2xl rounded-3xl shadow-green-400 p-12 m-2"
            onSubmit={handleSubmit}
        >
            {/** -------------------------- Username -------------------------------  **/}

            <InputFieldComponent
                label="Username"
                value={user.username}
                onChange={(val) => setUser(prev => ({ ...prev, username: val }))}
                type="text"
                placeholder="Enter your username"
                error={fieldErrors.username}
            />

            {/** -------------------------- Phone -------------------------------  **/}

            <InputFieldComponent
                label="Phone"
                value={user.phone}
                onChange={(val) => setUser(prev => ({ ...prev, phone: val }))}
                type="text"
                placeholder="Enter your phone number"
                error={fieldErrors.phone}
            />

            {/** -------------------------- Email -------------------------------  **/}

            <InputFieldComponent
                label="Email"
                value={user.email}
                onChange={(val) => setUser(prev => ({ ...prev, email: val }))}
                type="email"
                placeholder="Enter your email"
                error={fieldErrors.email}
            />

            {/** -------------------------- Password -------------------------------  **/}

            <InputFieldComponent
                label="Password"
                value={user.password}
                onChange={(val) => setUser(prev => ({ ...prev, password: val }))}
                type="password"
                placeholder="Enter your password"
                error={fieldErrors.password}
            />

            {/** -------------------------- Re-enter the password -------------------------------  **/}

            <InputFieldComponent
                label="Re-enter Password"
                value={repassword}
                onChange={(val) => setRepassword(val)}
                type="password"
                placeholder="Re-enter your password"
                error={fieldErrors.repassword}
            />

            {/** -------------------------- Nationality -------------------------------  **/}

            <div className="flex flex-col mb-4">
                <label className="text-xl font-bold p-2">Nationality</label>
                <select
                    className="h-12 w-xl border-1 rounded-xl p-2 mb-2"
                    value={user.nationality}
                    onChange={(e) => setUser(prev => ({ ...prev, nationality: e.target.value }))}
                >
                    <option value="">Select nationality</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Australia">Australia</option>
                </select>
                {fieldErrors.nationality && (
                    <span className="text-red-600 mt-2">{fieldErrors.nationality}</span>
                )}
            </div>

            {/** -------------------------- Button -------------------------------  **/}

            <button
                className="flex items-center justify-center bg-emerald-700 w-3xs text-white font-bold text-xl p-4 rounded-2xl mt-6 cursor-pointer hover:scale-110 duration-155 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !isFormValid}
            >
                {loading ? "Loading..." : <><FaSignInAlt className="mr-4" /> Sign Up</>}
            </button>

            {/** -------------------------- Error -------------------------------  **/}

            {error && <p className="font-bold text-red-600 mt-5">{error}</p>}

            {/** -------------------------- Direct to Login Page -------------------------------  **/}

            <div className="mt-5">
                <label>Already got an account?</label>
                <a
                    href="/login"
                    className="text-emerald-950 font-bold underline pl-2 cursor-pointer hover:text-xl duration-155"
                >
                    Sign In
                </a>
            </div>

            {/** ------------------------------------------------------------------------------- **/}
        </form>
    );
};

export default RegisterForm;
