import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { z } from "zod";
import useLogin from "../hooks/useLogin";
import useAuth from "../hooks/useAuth";
import type { UserLogin } from "../entities/User";
import { FaSignInAlt } from "react-icons/fa";

// Zod schema for login validation
const loginSchema = z
    .object({
        username: z.string().min(1, { message: "Username or email is required." }),
        password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    });

type FieldErrors = Record<string, string>;

const LoginForm = () => {
    const [user, setUser] = useState<UserLogin>({ username: "", password: "" });
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const { login, error, loading } = useLogin();
    const { user: authUser } = useAuth();
    const navigate = useNavigate();

    // Determine form validity based on Zod schema
    const isFormValid = loginSchema.safeParse(user).success;

    useEffect(() => {
        if (authUser) {
            navigate('/testing');
        }
    }, [authUser, navigate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Validate against Zod schema
        const result = loginSchema.safeParse(user);
        if (!result.success) {
            const flattened = result.error.flatten().fieldErrors as Record<string, string[]>;
            const errors: FieldErrors = {};
            Object.keys(flattened).forEach((field) => {
                const msgs = flattened[field];
                if (msgs && msgs[0]) errors[field] = msgs[0];
            });
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});
        const auth = await login(result.data);
        if (auth) {
            navigate('/testing');
        }
    };

    return (
        <form
            className="flex flex-col items-center justify-center shadow-2xl rounded-3xl shadow-green-400 p-12 m-2"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col">
                <label className="text-xl font-bold p-2">Name</label>
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2"
                    type="text"
                    placeholder="Enter your username or email"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                {fieldErrors.username && (
                    <span className="text-red-600">{fieldErrors.username}</span>
                )}
            </div>

            <div className="flex flex-col">
                <label className="text-xl font-bold p-2 mt-4">Password</label>
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2 mb-4"
                    type="password"
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                {fieldErrors.password && (
                    <span className="text-red-600">{fieldErrors.password}</span>
                )}
            </div>

            <button
                className="flex items-center justify-center bg-emerald-700 w-3xs text-white font-bold text-xl p-4 rounded-2xl mt-6 cursor-pointer
                hover:scale-110 duration-155 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                disabled={loading || !isFormValid}
            >
                {loading ? "Loading..." : <><FaSignInAlt className="mr-4" /> Sign In</>}
            </button>

            {error && <p className="font-bold text-red-600 mt-5">{error}</p>}

            <div className="mt-5">
                <label>Haven't got an account?</label>
                <a
                    href="/register"
                    className="text-emerald-950 font-bold underline pl-2 cursor-pointer hover:text-xl duration-155"
                >
                    Register
                </a>
            </div>
        </form>
    );
};

export default LoginForm;
