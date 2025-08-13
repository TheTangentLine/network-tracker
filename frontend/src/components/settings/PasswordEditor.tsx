import { useState, useEffect } from "react";
import { FiLock, FiEye, FiEyeOff, FiShield, FiSave } from "react-icons/fi";
import { z } from "zod";
import Reassure from "../Reassure";
import Notify from "../Notify";

// ----------------------------------- Zod for validation ------------------------------->

const passwordChangeSchema = z
    .object({
        currentPassword: z.string().min(1, { message: "Current password is required." }),
        newPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
        confirmPassword: z.string().min(1, { message: "Please confirm your password." }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

type FieldErrors = Record<string, string>;

interface PasswordEditorProps {
    onSave?: (data: any) => Promise<boolean>;
    error?: string | null;
    loading?: boolean;
}

const PasswordEditor: React.FC<PasswordEditorProps> = ({ onSave, error, loading }) => {
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [showReassure, setShowReassure] = useState(false);
    const [showNotify, setShowNotify] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

    // ------------------------------------ Live validation ------------------------------------>

    useEffect(() => {
        const result = passwordChangeSchema.safeParse(formData);
        if (result.success) {
            setFieldErrors({});
        } else {
            const flat = result.error.flatten().fieldErrors as Record<string, string[]>;
            const errors: FieldErrors = {};
            Object.entries(flat).forEach(([field, msgs]) => {
                const val = (formData as any)[field] as string;
                if (msgs && msgs.length > 0 && val.trim() !== "") {
                    errors[field] = msgs[0];
                }
            });
            setFieldErrors(errors);
        }
    }, [formData]);

    // ---------------------------------- Determine validity ------------------------------------>

    const isFormValid = passwordChangeSchema.safeParse(formData).success;

    const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSaveClick = () => {
        if (!isFormValid) return;
        setShowReassure(true);
    };

    const handleConfirmSave = async () => {
        setShowReassure(false);
        
        if (onSave) {
            const success = await onSave(formData);
            if (success) {
                setNotifyMessage("Password updated successfully!");
                setIsSuccess(true);
                setShowNotify(true);
                // Reset form after successful save
                setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });
                setFieldErrors({});
            } else {
                // Error will be handled by the parent component
                // The error prop will contain the backend error message
            }
        } else {
            // Default behavior if no onSave prop provided
            console.log('Password change requested', formData);
            setNotifyMessage("Password change requested (no save handler)");
            setIsSuccess(true);
            setShowNotify(true);
        }
    };

    const handleCancelSave = () => {
        setShowReassure(false);
    };

    const handleNotifyClose = () => {
        setShowNotify(false);
    };

    // Show error notification when error prop changes
    useEffect(() => {
        if (error) {
            setNotifyMessage(error);
            setIsSuccess(false);
            setShowNotify(true);
        }
    }, [error]);

    return (
        <>
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-montserrat-bold text-emerald-900">Change Password</h4>
                    <button 
                        onClick={handleSaveClick}
                        disabled={!isFormValid || loading}
                        className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-montserrat-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FiSave className="text-sm" />
                        {loading ? "Updating..." : "Update Password"}
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
                                className={`w-full px-4 py-3 pr-12 rounded-lg border-2 font-montserrat transition-all duration-300 ${
                                    fieldErrors.currentPassword
                                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                                }`}
                                placeholder="Enter your current password"
                            />
                            <button
                                type="button"
                                onClick={() => togglePasswordVisibility('current')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-600 hover:text-emerald-700 cursor-pointer"
                            >
                                {showPasswords.current ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                            </button>
                        </div>
                        {fieldErrors.currentPassword && (
                            <span className="text-red-600 text-sm mt-1">{fieldErrors.currentPassword}</span>
                        )}
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
                                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                                className={`w-full px-4 py-3 pr-12 rounded-lg border-2 font-montserrat transition-all duration-300 ${
                                    fieldErrors.newPassword
                                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                                }`}
                                placeholder="Enter your new password"
                            />
                        </div>
                        {fieldErrors.newPassword && (
                            <span className="text-red-600 text-sm mt-1">{fieldErrors.newPassword}</span>
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
                                    fieldErrors.confirmPassword
                                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                                }`}
                                placeholder="Confirm your new password"
                            />
                        </div>
                        {fieldErrors.confirmPassword && (
                            <span className="text-red-600 text-sm mt-1">{fieldErrors.confirmPassword}</span>
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
                            <span>At least 6 characters long</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Passwords must match</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Reassure Modal */}
            <Reassure
                isOpen={showReassure}
                title="Update Password?"
                message="Are you sure you want to change your password? You'll need to use the new password for future logins."
                onConfirm={handleConfirmSave}
                onCancel={handleCancelSave}
                confirmText="Update Password"
                cancelText="Cancel"
            />

            {/* Notify Modal */}
            <Notify
                isOpen={showNotify}
                message={notifyMessage}
                onClose={handleNotifyClose}
                isSuccess={isSuccess}
                title={isSuccess ? "Success" : "Error"}
            />
        </>
    )
}

export default PasswordEditor;