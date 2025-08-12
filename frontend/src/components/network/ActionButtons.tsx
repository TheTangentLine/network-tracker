import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { SpeedTestResult } from '../../entities/Network';

interface ActionButtonsProps {
    onTestClick: () => void;
    onSaveClick: () => void;
    isTestLoading: boolean;
    isSaveLoading: boolean;
    isButtonDisabled: boolean;
    result?: SpeedTestResult;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    onTestClick,
    onSaveClick,
    isTestLoading,
    isSaveLoading,
    isButtonDisabled,
    result
}) => {
    const navigate = useNavigate();

    const handleAnalyzeClick = () => {
        if (result) {
            navigate('/chatbot', { state: result });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
                className="w-full sm:w-auto cursor-pointer px-8 py-4 bg-emerald-600 text-white font-montserrat-bold rounded-xl transition-all duration-300 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-600/30 hover:shadow-xl"
                disabled={isTestLoading}
                onClick={onTestClick}
            >
                {isTestLoading ? (
                    <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Testing...
                    </span>
                ) : (
                    "Start Test"
                )}
            </button>

            <button
                className="w-full sm:w-auto cursor-pointer px-8 py-4 bg-emerald-500 text-white font-montserrat-bold rounded-xl transition-all duration-300 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/30 hover:shadow-xl"
                disabled={isButtonDisabled}
                onClick={onSaveClick}
            >
                {isSaveLoading ? (
                    <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Saving...
                    </span>
                ) : (
                    "Save Report"
                )}
            </button>

            <button
                className="w-full sm:w-auto cursor-pointer px-8 py-4 bg-emerald-700 text-white font-montserrat-bold rounded-xl transition-all duration-300 hover:bg-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-700/30 hover:shadow-xl"
                disabled={isButtonDisabled}
                onClick={handleAnalyzeClick}
            >
                Analyze Results
            </button>
        </div>
    );
};

export default ActionButtons; 