import React from "react";

interface NotifyProps {
    message: string;
    onClose: () => void;
    isSuccess: boolean;  // To determine if it's a success or error message
}

const Notify: React.FC<NotifyProps> = ({ message, onClose, isSuccess }) => {
    return (
        <div className="fixed inset-0 z-50 bg-opacity-50 backdrop-blur-lg flex justify-center items-center duration-300 font-bold">
            <div
                className={`flex flex-col justify-center items-center bg-white text-black rounded-4xl shadow-2xl w-xl h-64`}
            >
                <p>{message}</p>
                <button
                    onClick={onClose}
                    className={`mt-12 bg${isSuccess ? '-emerald-600' : '-amber-600'} text-white text-3xl
                     px-7 py-2 rounded-xl hover:scale-125 duration-300 cursor-pointer`}
                >
                    Ok
                </button>
            </div>
        </div>
    );
};

export default Notify;
