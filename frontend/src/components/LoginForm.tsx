// ---- Hooks ----
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useLogin from "../hooks/useLogin";
import useAuth from "../hooks/useAuth";

// ---- Components ----
import InputFieldComponent from "./InputField";

// ---- Entities ----
import type { UserLogin } from "../entities/User";

// ---- Icons ----
import { FaSignInAlt } from "react-icons/fa";

// ---- Validation ----
import { z } from "zod";

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
    const { user: authUser } = useAuth();

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
        <form
            className="flex flex-col items-center justify-center shadow-2xl rounded-3xl shadow-green-400 p-12 m-2"
            onSubmit={handleSubmit}
        >
            {/** -------------------------- Username -------------------------------  **/}

            <InputFieldComponent
                label="Username"
                value={user.username}
                onChange={(value) => setUser(prev => ({ ...prev, username: value }))}
                placeholder="Enter your username or email"
                type="text"
                error={fieldErrors.username}
            />

            {/** -------------------------- Password -------------------------------  **/}

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

            {/** -------------------------- Button -------------------------------  **/}

            <button
                className="flex items-center justify-center bg-emerald-700 w-3xs text-white font-bold text-xl p-4 rounded-2xl mt-6 cursor-pointer hover:scale-110 duration-155 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || !isFormValid}
            >
                {loading ? "Loading..." : (<><FaSignInAlt className="mr-4" /> Sign In</>)}
            </button>

            {/** -------------------------- Error -------------------------------  **/}

            {error && <p className="font-bold text-red-600 mt-5">{error}</p>}

            {/** ---------------------- Redirect to Register page --------------------------  **/}

            <div className="mt-5">
                <label>Haven't got an account?</label>
                <a
                    href="/register"
                    className="text-emerald-950 font-bold underline pl-2 cursor-pointer hover:text-xl duration-155"
                >
                    Register
                </a>
            </div>

            {/** ----------------------------------------------------------------------------  **/}

        </form>
    );
};

export default LoginForm;