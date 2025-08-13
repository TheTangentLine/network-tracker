import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center font-montserrat bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-montserrat-bold text-emerald-900 mb-2">Welcome Back</h1>
                    <p className="text-emerald-600 font-montserrat text-lg">Sign in to your account to continue</p>
                </div>
                <LoginForm />
            </div>
        </>
    )
}

export default LoginPage;