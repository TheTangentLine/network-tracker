import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { SpeedTestResult } from '../../entities/Network';

interface ActionButtonsProps {
    onTestClick: () => void;
    onSaveClick: () => void;
    isTestLoading: boolean;
    isSaveLoading: boolean;
    isSaveDisabled: boolean;
    result?: SpeedTestResult;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
    onTestClick,
    onSaveClick,
    isTestLoading,
    isSaveLoading,
    isSaveDisabled,
    result
}) => {
    const navigate = useNavigate();

    const handleAnalyzeClick = () => {
        if (result) {
            navigate('/chatbot', { state: result });
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
                className="cursor-pointer px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg transition-all duration-200 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
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
                className="cursor-pointer px-8 py-3 bg-yellow-600 text-white font-semibold rounded-lg transition-all duration-200 hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                disabled={isSaveDisabled}
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
                className="cursor-pointer px-8 py-3 bg-orange-700 text-white font-semibold rounded-lg transition-all duration-200 hover:bg-orange-800 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                disabled={!result || !result.ping || !result.download_mbps || !result.upload_mbps}
                onClick={handleAnalyzeClick}
            >
                Analyze
            </button>
        </div>
    );
};

export default ActionButtons; 