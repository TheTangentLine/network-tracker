import React from "react";

interface NotifyProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
    isSuccess: boolean;
    title?: string;
}

const Notify: React.FC<NotifyProps> = ({ isOpen, message, onClose, isSuccess, title }) => {
    if (!isOpen) return null;
    
    return (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-md flex justify-center items-center duration-300 font-montserrat">
            <div className="flex flex-col justify-between items-center bg-white text-gray-800 rounded-2xl shadow-2xl w-140 h-80 p-8 mx-4">
                <div className="text-center">
                    {title && (
                        <h3 className={`text-3xl font-bold ${isSuccess ? 'text-green-600' : 'text-red-600'}`}>
                            {title}
                        </h3>
                    )}
                </div>
                <p className="text-center text-3xl text-gray-700 leading-relaxed">{message}</p>
                <button
                    onClick={onClose}
                    className={`cursor-pointer px-8 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:scale-105 text-lg ${
                        isSuccess 
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
                            : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'
                    }`}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default Notify;
