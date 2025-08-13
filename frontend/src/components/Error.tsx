import React from "react";

interface ErrorProps {
    title?: string;
    message?: string;
    onRetry?: () => void;
}

const Error: React.FC<ErrorProps> = ({ 
    title = "Something went wrong", 
    message = "We encountered an unexpected error. Please try again later.",
    onRetry 
}) => {
    return (
        <div className="h-screen w-full flex flex-col justify-center items-center font-montserrat">
            
            <div className="w-16 h-16 border-6 border-gray-200 border-t-red-600 rounded-full animate-spin mb-4"></div>    

            <div className="mt-6 text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
                <p className="text-sm text-gray-500 mb-6">{message}</p>
                
                {onRetry && (
                    <button 
                        onClick={onRetry}
                        className="cursor-pointer px-6 py-3 rounded-lg text-white font-semibold transition-all duration-200 hover:scale-105 text-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                    >
                        Try Again
                    </button>
                )}
            </div>
            
        </div>
    )
}

export default Error;
