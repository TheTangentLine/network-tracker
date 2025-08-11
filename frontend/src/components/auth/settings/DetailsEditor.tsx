import { useState } from "react";
import { FiUser, FiPhone, FiMail, FiSave, FiEdit3 } from "react-icons/fi";

const DetailsEditor: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: "john_doe",
        phone: "+1 (555) 123-4567",
        email: "john.doe@example.com"
    });

    const handleSave = () => {
        setIsEditing(false);
        // TODO: Implement save functionality
    };

    const handleCancel = () => {
        setIsEditing(false);
        // TODO: Reset form data
    };

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-montserrat-bold text-emerald-900">Personal Information</h4>
                <div className="flex gap-3">
                    {isEditing ? (
                        <>
                            <button 
                                onClick={handleSave}
                                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-montserrat-bold transition-all duration-300"
                            >
                                <FiSave className="text-sm" />
                                Save Changes
                            </button>
                            <button 
                                onClick={handleCancel}
                                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-montserrat-bold transition-all duration-300"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-montserrat-bold transition-all duration-300"
                        >
                            <FiEdit3 className="text-sm" />
                            Edit Details
                        </button>
                    )}
                </div>
            </div>

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
                    <input 
                        type="text" 
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-lg border-2 font-montserrat transition-all duration-300 ${
                            isEditing 
                                ? 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200' 
                                : 'border-gray-200 bg-gray-50 text-gray-600'
                        }`}
                        placeholder="Enter your username"
                    />
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
                    <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-lg border-2 font-montserrat transition-all duration-300 ${
                            isEditing 
                                ? 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200' 
                                : 'border-gray-200 bg-gray-50 text-gray-600'
                        }`}
                        placeholder="Enter your phone number"
                    />
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
                    <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 rounded-lg border-2 font-montserrat transition-all duration-300 ${
                            isEditing 
                                ? 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200' 
                                : 'border-gray-200 bg-gray-50 text-gray-600'
                        }`}
                        placeholder="Enter your email address"
                    />
                    <p className="text-xs text-emerald-600 mt-2 font-montserrat">
                        This is your primary account email
                    </p>
                </div>
            </div>

            {/* Additional Information */}
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h5 className="text-sm font-montserrat-bold text-emerald-900 mb-3">Important Notes</h5>
                <ul className="space-y-2 text-sm text-emerald-700 font-montserrat">
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Username changes are limited to once per month</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Email changes require verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Phone number is used for two-factor authentication</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DetailsEditor;