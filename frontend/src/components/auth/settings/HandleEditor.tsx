import { useState } from "react";
import { FiUser, FiLock, FiShield } from "react-icons/fi";
import DetailsEditor from "./DetailsEditor";
import PasswordEditor from "./PasswordEditor";

const HandleEditor: React.FC = () => {
    const [showDetails, setShowDetails] = useState(true);

    const handleClick = () => {
        setShowDetails(prev => !prev);
    }

    return (
        <div className="space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-emerald-100 p-2 rounded-xl">
                <button 
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg font-montserrat-bold transition-all duration-300 ${
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
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg font-montserrat-bold transition-all duration-300 ${
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
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
                    <div className="flex items-center gap-3">
                        {showDetails ? (
                            <>
                                <FiUser className="text-2xl text-white" />
                                <div>
                                    <h3 className="text-xl font-montserrat-bold text-white">Account Details</h3>
                                    <p className="text-emerald-100 font-montserrat text-sm">Update your personal information</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <FiShield className="text-2xl text-white" />
                                <div>
                                    <h3 className="text-xl font-montserrat-bold text-white">Password & Security</h3>
                                    <p className="text-emerald-100 font-montserrat text-sm">Manage your password and security settings</p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="p-6">
                    {showDetails ? <DetailsEditor /> : <PasswordEditor />}
                </div>
            </div>
        </div>
    )
}

export default HandleEditor;
