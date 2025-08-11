import { useState } from "react";
import useAuth from "../../../hooks/auth/useAuth";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { FiCamera, FiEdit3, FiUser, FiMail, FiCalendar } from "react-icons/fi";
import UploadImages from "./UploadImages";

const InformationPanel: React.FC = () => {
    const { user } = useAuth();
    const [light, setLight] = useState(false)
    const [showUpload, setShowUpload] = useState(false);

    if (!user) return <p>Error</p>
    
    return (
        <>
            {showUpload && <UploadImages onHandleShow={() => setShowUpload(prev => !prev)} />}
            
            <div className="space-y-6">
                {/* Profile Picture Section */}
                <div className="flex flex-col items-center">
                    <div className="relative group">
                        <div className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-xl shadow-emerald-600/30 mb-4 overflow-hidden">
                            <FiUser className="text-6xl text-white" />
                        </div>
                        <button 
                            className="absolute bottom-2 right-2 w-10 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110"
                            onClick={() => setShowUpload(prev => !prev)}
                        >
                            <FiCamera className="text-lg" />
                        </button>
                    </div>
                    <button 
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-montserrat-bold shadow-lg shadow-emerald-600/30 transition-all duration-300 flex items-center gap-2"
                        onClick={() => setShowUpload(prev => !prev)}
                    >
                        <FiEdit3 className="text-lg" />
                        Upload Photo
                    </button>
                </div>

                {/* User Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Username Card */}
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                                <FiUser className="text-white text-lg" />
                            </div>
                            <div>
                                <h3 className="text-lg font-montserrat-bold text-emerald-900">Username</h3>
                                <p className="text-emerald-600 font-montserrat text-sm">Your display name</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-emerald-200">
                            <p className="text-emerald-900 font-montserrat-bold text-lg">{user.username}</p>
                        </div>
                        <button className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-montserrat-bold transition-all duration-300 flex items-center justify-center gap-2">
                            <FiEdit3 className="text-sm" />
                            Edit Username
                        </button>
                    </div>

                    {/* Email Card */}
                    <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                                <FiMail className="text-white text-lg" />
                            </div>
                            <div>
                                <h3 className="text-lg font-montserrat-bold text-emerald-900">Email Address</h3>
                                <p className="text-emerald-600 font-montserrat text-sm">Your account email</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-emerald-200">
                            <p className="text-emerald-900 font-montserrat text-lg">{user.email}</p>
                        </div>
                        <button className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-montserrat-bold transition-all duration-300 flex items-center justify-center gap-2">
                            <FiEdit3 className="text-sm" />
                            Change Email
                        </button>
                    </div>
                </div>

                {/* Account Details */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border border-emerald-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                            <FiCalendar className="text-white text-lg" />
                        </div>
                        <div>
                            <h3 className="text-lg font-montserrat-bold text-emerald-900">Account Details</h3>
                            <p className="text-emerald-600 font-montserrat text-sm">Additional account information</p>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4 border border-emerald-200">
                            <p className="text-emerald-600 font-montserrat text-sm">Member Since</p>
                            <p className="text-emerald-900 font-montserrat-bold">January 2024</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-emerald-200">
                            <p className="text-emerald-600 font-montserrat text-sm">Account Type</p>
                            <p className="text-emerald-900 font-montserrat-bold">Premium</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-emerald-200">
                            <p className="text-emerald-600 font-montserrat text-sm">Status</p>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm font-montserrat-bold">
                                Active
                            </span>
                        </div>
                    </div>
                </div>

                {/* Theme Toggle */}
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
                            className="bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl shadow-lg shadow-emerald-600/30 transition-all duration-300"
                        >
                            {light ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InformationPanel;