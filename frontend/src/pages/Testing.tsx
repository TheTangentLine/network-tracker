import { FiLogOut } from "react-icons/fi";
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';


const Testing = () => {
    const { user } = useAuth();
    const { logout, loading } = useLogout();

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center font-montserrat text-4xl">
            <div className="flex flex-row items-center justify-center mb-8">
                <label className="font-bold mr-5">
                    Your name is:
                </label>
                <p>
                    {user?.username || "No user logged in"}
                </p>
            </div>

            <div className="flex flex-row items-center justify-center mb-8">
                <label className="font-bold mr-5">
                    Your email is:
                </label>
                <p>
                    {user?.email || "No email available"}
                </p>
            </div>

            <div className="text-6xl mt-10">
                <button
                    className="hover:text-7xl transition-all duration-300 cursor-pointer"
                    onClick={logout}
                >
                    {loading ? "Loading..." : <FiLogOut />}
                </button>
            </div>

        </div>
    );
};

export default Testing;
