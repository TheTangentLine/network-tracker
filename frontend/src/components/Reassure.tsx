import React from "react";

interface ReassureProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

const Reassure: React.FC<ReassureProps> = ({
    isOpen,
    title = "Are you sure?",
    message = "This action cannot be undone. Please confirm to continue.",
    onConfirm,
    onCancel,
    confirmText = "Continue",
    cancelText = "Cancel"
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-md flex justify-center items-center duration-300 font-montserrat">
            <div className="bg-white text-gray-800 rounded-2xl shadow-2xl w-140 p-8 mx-4 flex flex-col items-center justify-center">
                <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">{message}</p>
                </div>
                
                <div className="flex space-x-4">
                    <button
                        onClick={onCancel}
                        className="cursor-pointer px-8 py-3 rounded-lg text-gray-700 font-semibold transition-all duration-200 hover:scale-105 text-lg bg-gradient-to-r from-gray-200 to-gray-300 hover:from-gray-300 hover:to-gray-400"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="cursor-pointer px-8 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:scale-105 text-lg bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reassure;
