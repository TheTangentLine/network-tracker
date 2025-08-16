import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import DetailsEditor from "./DetailsEditor";
import PasswordEditor from "./PasswordEditor";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import useUpdatePassword from "../../hooks/auth/useUpdatePassword";
import useFetch from "../../hooks/auth/useFetch";
import type { UserUpdatePassword } from "../../entities/User";
import useDarkMode from "../../hooks/useDarkMode";

const HandleEditor: React.FC = () => {
    const [showDetails, setShowDetails] = useState(true);
    const { toggleDarkMode, isDarkMode } = useDarkMode();
    const { updatePassword, error, loading } = useUpdatePassword();
    const { user: currentUser } = useFetch();

    const handleClick = () => {
        setShowDetails(prev => !prev);
    }

    const handlePasswordSave = async (data: any) => {
        if (!currentUser) {
            return false;
        }
        
        // Create the complete user update data with current user info
        const updateData: UserUpdatePassword = {
            username: currentUser.username,
            email: currentUser.email,
            phone: currentUser.phone,
            current_password: data.currentPassword,
            new_password: data.newPassword
        };
        
        return await updatePassword(updateData);
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h3 className="text-lg font-montserrat-bold text-emerald-900">Theme</h3>
                        <p className="text-emerald-600 font-montserrat text-sm">Choose your preferred theme</p>
                    </div>
                    <button 
                        onClick={toggleDarkMode}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl shadow-lg shadow-emerald-600/30 transition-all duration-300 cursor-pointer"
                    >
                        {!isDarkMode ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
                    </button>
                </div>
            </div>

            <hr className="text-emerald-200 shadow-emerald-300"/>

            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-emerald-100 p-2 rounded-xl">
                <button 
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg font-montserrat-bold transition-all duration-300 cursor-pointer ${
                        showDetails 
                            ? 'bg-white text-emerald-700 shadow-lg shadow-emerald-600/20' 
                            : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`} 
                    onClick={handleClick}
                >
                    <FiUser className="text-lg" />
                    Account Details
                </button>
                <button 
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg font-montserrat-bold transition-all duration-300 cursor-pointer ${
                        !showDetails 
                            ? 'bg-white text-emerald-700 shadow-lg shadow-emerald-600/20' 
                            : 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`} 
                    onClick={handleClick}
                >
                    <FiLock className="text-lg" />
                    Password & Security
                </button>
            </div>

            {/* Content Area */}
            <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl border border-emerald-200 overflow-hidden">
                <div className="p-6">
                    {showDetails ? (
                        <DetailsEditor />
                    ) : (
                        <PasswordEditor 
                            onSave={handlePasswordSave} 
                            error={error}
                            loading={loading}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default HandleEditor;
