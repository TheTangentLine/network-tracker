import RegisterForm from "../../components/auth/RegisterForm";

const RegisterPage = () => {

    return (
        <>
            <div className="py-10 min-h-screen flex flex-col items-center justify-center font-montserrat bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-montserrat-bold text-emerald-900 mb-2">Create Account</h1>
                    <p className="text-emerald-600 font-montserrat text-lg">Join us and start tracking your network speed</p>
                </div>
                <RegisterForm />
            </div>
        </>
    )
}

export default RegisterPage;