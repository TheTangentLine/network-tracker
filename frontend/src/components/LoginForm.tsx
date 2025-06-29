import { useState } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(username, password)
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div>
                <button
                    className="bg-emerald-700 w-3xs text-white font-bold text-xl p-4 rounded-2xl mt-6 cursor-pointer
                                        hover:scale-110 duration-155">
                    Sign in
                </button>
            </div>
        </form>
    )
}

export default LoginForm;