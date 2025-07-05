import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import useLogin from "../hooks/useLogin";

import { FaSignInAlt } from "react-icons/fa";

import type { UserLogin } from "../entities/User";
import useAuth from "../hooks/useAuth";

const LoginForm = () => {
    const [user, setUser] = useState<UserLogin>({ username: '', password: '' });
    const { login, error, loading } = useLogin();
    const { user: authUser } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (authUser) {
            navigate('/testing')
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const authUser = await login(user);
        if (authUser) {
            navigate('/testing');
        }
    }

    return (
        <form
            className="flex flex-col items-center justify-center shadow-2xl rounded-3xl shadow-green-400 p-12 m-2"
            onSubmit={handleSubmit}
        >
            <div className="flex flex-col">
                <label className="text-xl font-bold p-2">
                    Name
                </label>
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2"
                    type="text"
                    placeholder="Enter your username or email"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xl font-bold p-2 mt-4">
                    Password
                </label>
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2 mb-4"
                    type="password"
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
            </div>

            <button
                className="flex items-center justify-center bg-emerald-700 w-3xs text-white font-bold text-xl p-4 rounded-2xl mt-6 cursor-pointer
                hover:scale-110 duration-155">
                {loading ? "Loading..." : <><FaSignInAlt className="mr-4" /> Sign In</>}
            </button>

            {error && <p className="font-bold text-red-600 mt-5">
                {error}
            </p>}

            <div className="mt-5">
                <label>
                    Haven't got an account?
                </label>
                <a
                    href="/register"
                    className="text-emerald-950 font-bold underline pl-2 cursor-pointer hover:text-xl duration-155"
                >
                    Register
                </a>
            </div>
        </form>
    )
}

export default LoginForm;