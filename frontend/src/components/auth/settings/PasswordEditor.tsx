import { useState } from "react";
import { FiLock, FiEye, FiEyeOff, FiShield, FiSave, FiAlertCircle } from "react-icons/fi";

const PasswordEditor: React.FC = () => {
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        setFormData({...formData, newPassword: password});
        
        // Simple password strength calculation
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        setPasswordStrength(strength);
    };

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const getPasswordStrengthColor = () => {
        if (passwordStrength <= 2) return 'bg-red-500';
        if (passwordStrength <= 3) return 'bg-yellow-500';
        if (passwordStrength <= 4) return 'bg-blue-500';
        return 'bg-emerald-500';
    };

    const getPasswordStrengthText = () => {
        if (passwordStrength <= 2) return 'Weak';
        if (passwordStrength <= 3) return 'Fair';
        if (passwordStrength <= 4) return 'Good';
        return 'Strong';
    };

    const handleSave = () => {
        // TODO: Implement password change functionality
        console.log('Password change requested');
    };

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-montserrat-bold text-emerald-900">Change Password</h4>
                <button 
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-montserrat-bold transition-all duration-300"
                >
                    <FiSave className="text-sm" />
                    Update Password
                </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
                {/* Current Password */}
                <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <FiLock className="text-emerald-600 text-sm" />
                        </div>
                        <label className="text-sm font-montserrat-bold text-emerald-700 uppercase tracking-wide">
                            Current Password
                        </label>
                    </div>
                    <div className="relative">
                        <input 
                            type={showPasswords.current ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                            className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 font-montserrat transition-all duration-300"
                            placeholder="Enter your current password"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('current')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700"
                        >
                            {showPasswords.current ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                        </button>
                    </div>
                </div>

                {/* New Password */}
                <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <FiShield className="text-emerald-600 text-sm" />
                        </div>
                        <label className="text-sm font-montserrat-bold text-emerald-700 uppercase tracking-wide">
                            New Password
                        </label>
                    </div>
                    <div className="relative">
                        <input 
                            type={showPasswords.new ? "text" : "password"}
                            value={formData.newPassword}
                            onChange={handlePasswordChange}
                            className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 font-montserrat transition-all duration-300"
                            placeholder="Enter your new password"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('new')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700"
                        >
                            {showPasswords.new ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                        </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {formData.newPassword && (
                        <div className="mt-4">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs font-montserrat-bold text-emerald-700">Password Strength:</span>
                                <span className={`text-xs font-montserrat-bold px-2 py-1 rounded-full ${
                                    passwordStrength <= 2 ? 'bg-red-100 text-red-700' :
                                    passwordStrength <= 3 ? 'bg-yellow-100 text-yellow-700' :
                                    passwordStrength <= 4 ? 'bg-blue-100 text-blue-700' :
                                    'bg-emerald-100 text-emerald-700'
                                }`}>
                                    {getPasswordStrengthText()}
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                    style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Confirm New Password */}
                <div className="bg-white rounded-xl p-6 border border-emerald-200 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <FiLock className="text-emerald-600 text-sm" />
                        </div>
                        <label className="text-sm font-montserrat-bold text-emerald-700 uppercase tracking-wide">
                            Confirm New Password
                        </label>
                    </div>
                    <div className="relative">
                        <input 
                            type={showPasswords.confirm ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            className={`w-full px-4 py-3 pr-12 rounded-lg border-2 font-montserrat transition-all duration-300 ${
                                formData.confirmPassword && formData.newPassword !== formData.confirmPassword
                                    ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                    : 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                            }`}
                            placeholder="Confirm your new password"
                        />
                        <button
                            type="button"
                            onClick={() => togglePasswordVisibility('confirm')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700"
                        >
                            {showPasswords.confirm ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                        </button>
                    </div>
                    
                    {/* Password Match Indicator */}
                    {formData.confirmPassword && (
                        <div className={`flex items-center gap-2 mt-2 ${
                            formData.newPassword === formData.confirmPassword ? 'text-emerald-600' : 'text-red-600'
                        }`}>
                            {formData.newPassword === formData.confirmPassword ? (
                                <>
                                    <span className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                                        <span className="text-white text-xs">✓</span>
                                    </span>
                                    <span className="text-xs font-montserrat-bold">Passwords match</span>
                                </>
                            ) : (
                                <>
                                    <FiAlertCircle className="text-sm" />
                                    <span className="text-xs font-montserrat-bold">Passwords do not match</span>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
                <h5 className="text-sm font-montserrat-bold text-emerald-900 mb-3 flex items-center gap-2">
                    <FiShield className="text-sm" />
                    Password Requirements
                </h5>
                <ul className="space-y-2 text-sm text-emerald-700 font-montserrat">
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span>At least 8 characters long</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Contains at least one uppercase letter</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Contains at least one lowercase letter</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Contains at least one number</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span>Contains at least one special character</span>
                    </li>
                </ul>
            </div>

            {/* Security Notice */}
            <div className="bg-amber-50 rounded-xl p-6 border border-amber-200">
                <div className="flex items-start gap-3">
                    <FiAlertCircle className="text-amber-600 text-lg mt-0.5 flex-shrink-0" />
                    <div>
                        <h5 className="text-sm font-montserrat-bold text-amber-900 mb-2">Security Notice</h5>
                        <p className="text-sm text-amber-700 font-montserrat">
                            After changing your password, you'll be logged out of all devices except this one. 
                            Make sure to remember your new password and update it on any other devices you use.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordEditor;