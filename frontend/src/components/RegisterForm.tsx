import { useState } from "react";

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("")
    const [role, setRole] = useState("")

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
                    Username
                </label>
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xl font-bold p-2 mt-4">
                    Phone
                </label>
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2"
                    type="text"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>


            <div className="flex flex-col">
                <label className="text-xl font-bold p-2 mt-4">
                    Email
                </label>
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2"
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xl font-bold p-2 mt-4">
                    Password
                </label>
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2"
                    type="text"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xl font-bold p-2 mt-4">
                    Re-enter Password
                </label>
                <input
                    className="h-12 w-xl border-1 rounded-xl p-2"
                    type="password"
                    placeholder="Re-enter your password"
                    value={repassword}
                    onChange={(e) => setRepassword(e.target.value)}
                />
            </div>

            <div className="flex flex-col">
                <label className="text-xl font-bold p-2 mt-4">
                    Nationality
                </label>
                <select
                    className="h-12 w-xl border-1 rounded-xl p-2 mb-4"
                    onChange={(e) => setRole(e.target.value)}
                    value={role}
                >
                    <option> Vietnam </option>
                    <option> Australia </option>
                </select>
            </div>

            <div>
                <button
                    className="bg-emerald-700 w-3xs text-white font-bold text-xl p-4 rounded-2xl mt-6 cursor-pointer
                                        hover:scale-110 duration-155">
                    Sign up
                </button>
            </div>

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
    )
}

export default RegisterForm;