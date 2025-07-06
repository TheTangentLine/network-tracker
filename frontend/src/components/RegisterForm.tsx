import React, { useState } from "react";
import { z } from "zod";
import useRegister from "../hooks/useRegister";
import type { UserRegister } from "../entities/User";
import { FaSignInAlt } from "react-icons/fa";

// Zod schema for form validation
const registerSchema = z
    .object({
        username: z
            .string()
            .min(3, { message: "Username must be 3-50 characters." })
            .max(50, { message: "Username must be 3-50 characters." }),
        phone: z
            .string()
            .min(10, { message: "Phone must be 10-15 characters." })
            .max(15, { message: "Phone must be 10-15 characters." }),
        email: z.string().email({ message: "Invalid email address." }),
        password: z.string().min(6, { message: "Password must be at least 6 characters." }),
        repassword: z.string().nonempty({ message: "Passwords do not match." }),
        nationality: z.string().nonempty({ message: "Nationality is required." }),
    })
    .refine((data) => data.password === data.repassword, {
        message: "Passwords do not match.",
        path: ["repassword"],
    });

const RegisterForm = () => {
    const [user, setUser] = useState<UserRegister>({
        username: "",
        phone: "",
        email: "",
        password: "",
        nationality: "Vietnam",
    });
    const [repassword, setRepassword] = useState("");
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const { register, error, loading } = useRegister();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validate against Zod schema
        const result = registerSchema.safeParse({ ...user, repassword });
        if (!result.success) {
            // Cast to allow dynamic indexing
            const flattened = result.error.flatten().fieldErrors as Record<string, string[]>;
            const errors: { [key: string]: string } = {};
            Object.keys(flattened).forEach((field) => {
                const msgs = flattened[field];
                if (msgs && msgs[0]) errors[field] = msgs[0];
            });
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});
        const { repassword: _, ...validData } = result.data;
        await register(validData);
    };

    const isFormValid = Object.keys(fieldErrors).length === 0;

    return (
        <form
            className="flex flex-col items-center justify-center shadow-2xl rounded-3xl shadow-green-400 p-12 m-2"
            onSubmit={handleSubmit}
        >
            {/** Username Field **/}
            <div className="flex flex-col">
                <label className="text-xl font-bold p-2">Username</label>
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2"
                    type="text"
                    placeholder="Enter your username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                {fieldErrors.username && (
                    <span className="text-red-600">{fieldErrors.username}</span>
                )}
            </div>

            {/** Phone Field **/}
            <div className="flex flex-col">
                <label className="text-xl font-bold p-2 mt-4">Phone</label>
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2"
                    type="text"
                    placeholder="Enter your phone number"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
                {fieldErrors.phone && (
                    <span className="text-red-600">{fieldErrors.phone}</span>
                )}
            </div>

            {/** Email Field **/}
            <div className="flex flex-col">
                <label className="text-xl font-bold p-2 mt-4">Email</label>
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2"
                    type="email"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                {fieldErrors.email && (
                    <span className="text-red-600">{fieldErrors.email}</span>
                )}
            </div>

            {/** Password Field **/}
            <div className="flex flex-col">
                <label className="text-xl font-bold p-2 mt-4">Password</label>
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2"
                    type="password"
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                {fieldErrors.password && (
                    <span className="text-red-600">{fieldErrors.password}</span>
                )}
            </div>

            {/** Re-enter Password **/}
            <div className="flex flex-col">
                <label className="text-xl font-bold p-2 mt-4">Re-enter Password</label>
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2"
                    type="password"
                    placeholder="Re-enter your password"
                    value={repassword}
                    onChange={(e) => setRepassword(e.target.value)}
                />
                {fieldErrors.repassword && (
                    <span className="text-red-600">{fieldErrors.repassword}</span>
                )}
            </div>

            {/** Nationality Field **/}
            <div className="flex flex-col">
                <label className="text-xl font-bold p-2 mt-4">Nationality</label>
                <select
                    className="h-12 w-xl border-1 rounded-xl p-2 mb-4"
                    value={user.nationality}
                    onChange={(e) => setUser({ ...user, nationality: e.target.value })}
                >
                    <option value="">Select nationality</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Australia">Australia</option>
                </select>
                {fieldErrors.nationality && (
                    <span className="text-red-600">{fieldErrors.nationality}</span>
                )}
            </div>

            {/** Submit Button **/}
            <button
                className="flex items-center justify-center bg-emerald-700 w-3xs text-white font-bold text-xl p-4 rounded-2xl mt-6 cursor-pointer
                hover:scale-110 duration-155 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                disabled={loading || !isFormValid}
            >
                {loading ? "Loading..." : <><FaSignInAlt className="mr-4" /> Sign Up</>}
            </button>

            {error && <p className="font-bold text-red-600 mt-5">{error}</p>}

            <div className="mt-5">
                <label>
                    Already got an account?
                </label>
                <a
                    href="/login"
                    className="text-emerald-950 font-bold underline pl-2 cursor-pointer hover:text-xl duration-155"
                >
                    Sign in
                </a>
            </div>
        </form>
    );
};

export default RegisterForm;