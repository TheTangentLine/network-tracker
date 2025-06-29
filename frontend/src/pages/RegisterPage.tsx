import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center font-montserrat mt-12">
                <label
                    className="text-5xl font-montserrat-bold tracking-wider drop-shadow-2xl drop-shadow-emerald-200 mb-7">
                    Welcome
                </label>
                <RegisterForm />
            </div>
        </>
    )
}

export default RegisterPage;