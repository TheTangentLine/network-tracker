import LoginForm from "../components/LoginForm";

const LoginPage = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center font-montserrat">
                <label
                    className="text-5xl font-montserrat-bold tracking-wider drop-shadow-2xl drop-shadow-emerald-200 mb-7">
                    Welcome Back
                </label>
                <LoginForm />
            </div>
        </>
    )
}

export default LoginPage;