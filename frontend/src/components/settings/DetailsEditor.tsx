import { useState, useEffect } from "react";
import { FiUser, FiPhone, FiMail, FiSave, FiEdit3 } from "react-icons/fi";
import useAuth from "../../hooks/auth/useAuth";
import { z } from "zod";
import Reassure from "../Reassure";

// ----------------------------------- Zod for validation ------------------------------->

const detailsSchema = z
    .object({
        username: z
            .string()
            .min(3, { message: "Username must be 3-50 characters." })
            .max(50, { message: "Username must be 3-50 characters." }),
        phone: z
            .string()
            .regex(/^[0-9]+$/, { message: "Phone must contain only numbers." })
            .min(10, { message: "Please enter a valid phone number." })
            .max(15, { message: "Please enter a valid phone number." }),
        email: z.string().email({ message: "Invalid email address." }),
    });

type FieldErrors = Record<string, string>;

interface DetailsEditorProps {
    onSave?: (data: any) => void;
}

const DetailsEditor: React.FC<DetailsEditorProps> = ({ onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [showReassure, setShowReassure] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        email: ""
    });
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

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

    // ------------------------------------ Live validation ------------------------------------>

    useEffect(() => {
        if (!isEditing) return;
        
        const result = detailsSchema.safeParse(formData);
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
    }, [formData, isEditing]);

    // ---------------------------------- Determine validity ------------------------------------>

    const isFormValid = detailsSchema.safeParse(formData).success;

    const handleSaveClick = () => {
        if (!isFormValid) return;
        setShowReassure(true);
    };

    const handleConfirmSave = () => {
        setShowReassure(false);
        setIsEditing(false);
        
        // Execute the save function passed as prop
        if (onSave) {
            onSave(formData);
        } else {
            // Default behavior if no onSave prop provided
            console.log('Details update requested', formData);
        }
    };

    const handleCancelSave = () => {
        setShowReassure(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        // Reset form data to original user data
        if (user) {
            setFormData({
                username: user.username || "",
                phone: user.phone || "",
                email: user.email || ""
            });
        }
        setFieldErrors({});
    };

    return (
        <>
            <div className="space-y-6">
                {/* Header Actions */}
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-montserrat-bold text-emerald-900">Personal Information</h4>
                    <div className="flex gap-3">
                        {isEditing ? (
                            <>
                                <button 
                                    onClick={handleSaveClick}
                                    disabled={!isFormValid}
                                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-montserrat-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    ? fieldErrors.username
                                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                                    : 'border-gray-200 bg-gray-50 text-gray-600'
                            }`}
                            placeholder="Enter your username"
                        />
                        {isEditing && fieldErrors.username && (
                            <span className="text-red-600 text-sm mt-1">{fieldErrors.username}</span>
                        )}
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
                                    ? fieldErrors.phone
                                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                                    : 'border-gray-200 bg-gray-50 text-gray-600'
                            }`}
                            placeholder="Enter your phone number"
                        />
                        {isEditing && fieldErrors.phone && (
                            <span className="text-red-600 text-sm mt-1">{fieldErrors.phone}</span>
                        )}
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
                                    ? fieldErrors.email
                                        ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                        : 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200'
                                    : 'border-gray-200 bg-gray-50 text-gray-600'
                            }`}
                            placeholder="Enter your email address"
                        />
                        {isEditing && fieldErrors.email && (
                            <span className="text-red-600 text-sm mt-1">{fieldErrors.email}</span>
                        )}
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
                            <span>Username must be 3-50 characters long</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Phone number must contain only numbers (10-15 digits)</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full mt-2 flex-shrink-0"></span>
                            <span>Email must be a valid email address</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Reassure Modal */}
            <Reassure
                isOpen={showReassure}
                title="Save Changes?"
                message="Are you sure you want to save these changes to your account details?"
                onConfirm={handleConfirmSave}
                onCancel={handleCancelSave}
                confirmText="Save Changes"
                cancelText="Cancel"
            />
        </>
    )
}

export default DetailsEditor;