import { useState, useEffect } from "react";
import { FiUser, FiPhone, FiMail, FiCopy, FiCheck } from "react-icons/fi";
import useAuth from "../../hooks/auth/useAuth";


const DetailsEditor: React.FC = () => {
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        email: ""
    });

    const [copiedStates, setCopiedStates] = useState({
        username: false,
        phone: false,
        email: false
    });

    const { user } = useAuth();

    // Initialize form data with user data
    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || "",
                phone: user.phone || "",
                email: user.email || ""
            });
        }
    }, [user]);

    const copyToClipboard = async (text: string, stateKey: string) => {
        try {
            await navigator.clipboard.writeText(text);
            
            // Set the copied state for the specific field
            setCopiedStates(prev => ({
                ...prev,
                [stateKey]: true
            }));

            // Reset the copied state after 2 seconds
            setTimeout(() => {
                setCopiedStates(prev => ({
                    ...prev,
                    [stateKey]: false
                }));
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <>
            <div className="space-y-6">
                {/* Header Actions */}
                <h4 className="text-lg font-montserrat-bold text-emerald-900">Personal Information</h4>
       

                {/* Form Fields */}
                <div className="space-y-6">
                    {/* Username Field */}
                    <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <FiUser className="text-emerald-600 text-sm" />
                            </div>
                            <label className="text-sm font-montserrat-bold text-emerald-700 uppercase tracking-wide">
                                Username
                            </label>
                        </div>
                        <div className="relative">
                            <input 
                                type="text" 
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                disabled={true}
                                className="w-full px-4 py-3 pr-12 rounded-lg border-2 font-montserrat transition-all duration-300 border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                placeholder="Enter your username"
                            />
                            <button
                                type="button"
                                onClick={() => copyToClipboard(formData.username, 'username')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700 cursor-pointer transition-all duration-200"
                                title="Copy username to clipboard"
                            >
                                {copiedStates.username ? (
                                    <FiCheck className="text-lg text-green-600" />
                                ) : (
                                    <FiCopy className="text-lg" />
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-emerald-600 mt-2 font-montserrat">
                            This is your public display name
                        </p>
                    </div>

                    {/* Phone Field */}
                    <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <FiPhone className="text-emerald-600 text-sm" />
                            </div>
                            <label className="text-sm font-montserrat-bold text-emerald-700 uppercase tracking-wide">
                                Phone Number
                            </label>
                        </div>
                        <div className="relative">
                            <input 
                                type="tel" 
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                disabled={true}
                                className="w-full px-4 py-3 pr-12 rounded-lg border-2 font-montserrat transition-all duration-300 border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                placeholder="Enter your phone number"
                            />
                            <button
                                type="button"
                                onClick={() => copyToClipboard(formData.phone, 'phone')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700 cursor-pointer transition-all duration-200"
                                title="Copy phone number to clipboard"
                            >
                                {copiedStates.phone ? (
                                    <FiCheck className="text-lg text-green-600" />
                                ) : (
                                    <FiCopy className="text-lg" />
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-emerald-600 mt-2 font-montserrat">
                            We'll use this for important notifications
                        </p>
                    </div>

                    {/* Email Field */}
                    <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <FiMail className="text-emerald-600 text-sm" />
                            </div>
                            <label className="text-sm font-montserrat-bold text-emerald-700 uppercase tracking-wide">
                                Email Address
                            </label>
                        </div>
                        <div className="relative">
                            <input 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                disabled={true}
                                className="w-full px-4 py-3 pr-12 rounded-lg border-2 font-montserrat transition-all duration-300 border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                                placeholder="Enter your email address"
                            />
                            <button
                                type="button"
                                onClick={() => copyToClipboard(formData.email, 'email')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700 cursor-pointer transition-all duration-200"
                                title="Copy email address to clipboard"
                            >
                                {copiedStates.email ? (
                                    <FiCheck className="text-lg text-green-600" />
                                ) : (
                                    <FiCopy className="text-lg" />
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-emerald-600 mt-2 font-montserrat">
                            This is your primary account email
                        </p>
                    </div>
                </div>

            </div>

        </>
    )
}

export default DetailsEditor;