import { FiBell, FiDroplet, FiGlobe, FiMonitor, FiShield, FiUser } from "react-icons/fi";
import InformationPanel from "./InformationPanel";
import HandleEditor from "./HandleEditor";

const Settings = () => {
    return (
        <>      
            {/**------------------------- Header ------------------------------- **/}

            <div className="bg-white border-b border-gray-200 px-6 py-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-green-700 mb-1">Settings</h1>
                    <p className="text-gray-600">Manage your account and preferences</p>
                </div>
            </div>

            {/**------------------------- Main Content ------------------------------- **/}

            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Settings Navigation */}
                    <div className="mb-8">
                        <div className="flex flex-wrap gap-4">
                            <button className="flex items-center gap-3 px-6 py-3 bg-emerald-600 text-white rounded-xl font-montserrat-bold shadow-lg shadow-emerald-600/30 hover:bg-emerald-700 transition-all duration-300">
                                <FiUser className="text-xl" />
                                Profile
                            </button>
                            <button className="flex items-center gap-3 px-6 py-3 bg-white text-emerald-700 rounded-xl font-montserrat border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300">
                                <FiShield className="text-xl" />
                                Security
                            </button>
                            <button className="flex items-center gap-3 px-6 py-3 bg-white text-emerald-700 rounded-xl font-montserrat border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300">
                                <FiBell className="text-xl" />
                                Notifications
                            </button>
                            <button className="flex items-center gap-3 px-6 py-3 bg-white text-emerald-700 rounded-xl font-montserrat border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300">
                                <FiDroplet className="text-xl" />
                                Appearance
                            </button>
                            <button className="flex items-center gap-3 px-6 py-3 bg-white text-emerald-700 rounded-xl font-montserrat border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300">
                                <FiGlobe className="text-xl" />
                                Language
                            </button>
                            <button className="flex items-center gap-3 px-6 py-3 bg-white text-emerald-700 rounded-xl font-montserrat border-2 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300">
                                <FiMonitor className="text-xl" />
                                Display
                            </button>
                        </div>
                    </div>

                    {/* Settings Content */}
                    <div className="space-y-8">
                        {/* Profile Section */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-emerald-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
                                <h2 className="text-2xl font-montserrat-bold text-white flex items-center gap-3">
                                    <FiUser className="text-2xl" />
                                    Profile Information
                                </h2>
                            </div>
                            <div className="p-6">
                                <InformationPanel />
                            </div>
                        </div>

                        {/* Security Settings */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-emerald-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 px-6 py-4">
                                <h2 className="text-2xl font-montserrat-bold text-white flex items-center gap-3">
                                    <FiShield className="text-2xl" />
                                    Security Settings
                                </h2>
                            </div>
                            <div className="p-6">
                                <HandleEditor />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings;