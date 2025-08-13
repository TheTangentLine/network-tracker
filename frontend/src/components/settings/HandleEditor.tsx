import { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import DetailsEditor from "./DetailsEditor";
import PasswordEditor from "./PasswordEditor";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const HandleEditor: React.FC = () => {
    const [showDetails, setShowDetails] = useState(true);
    const [light, setLight] = useState(false)

    const handleClick = () => {
        setShowDetails(prev => !prev);
    }

    // Save functions for both editors
    const handleDetailsSave = (data: any) => {
        // TODO: Implement details save functionality
        console.log('Saving details:', data);
        // Here you would typically make an API call to update user details
    };

    const handlePasswordSave = (data: any) => {
        // TODO: Implement password save functionality
        console.log('Saving password:', data);
        // Here you would typically make an API call to update password
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                            {light ? <MdLightMode className="text-white text-lg" /> : <MdDarkMode className="text-white text-lg" />}
                        </div>
                        <div>
                            <h3 className="text-lg font-montserrat-bold text-emerald-900">Theme</h3>
                            <p className="text-emerald-600 font-montserrat text-sm">Choose your preferred theme</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setLight(prev => !prev)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl shadow-lg shadow-emerald-600/30 transition-all duration-300 cursor-pointer"
                    >
                        {light ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
                    </button>
                </div>
            </div>
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
                        <DetailsEditor onSave={handleDetailsSave} />
                    ) : (
                        <PasswordEditor onSave={handlePasswordSave} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default HandleEditor;
