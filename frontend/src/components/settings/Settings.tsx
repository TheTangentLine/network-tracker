import { FiShield } from "react-icons/fi";
import HandleEditor from "./HandleEditor";

const Settings = () => {
    return (
        <>      
            {/**------------------------- Header ------------------------------- **/}

            <div className="bg-white border-b border-gray-200 px-6 py-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-green-700 mb-1">General Settings</h1>
                    <p className="text-gray-600">Manage your account and preferences</p>
                </div>
            </div>

            {/**------------------------- Main Content ------------------------------- **/}

            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-emerald-100 overflow-hidden">
                        <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 px-6 py-4">
                            <h2 className="text-2xl font-montserrat-bold text-white flex items-center gap-3">
                                <FiShield className="text-2xl" />
                                Settings
                            </h2>
                        </div>
                        <div className="p-6">
                            <HandleEditor />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Settings;