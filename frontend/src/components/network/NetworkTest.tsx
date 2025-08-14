import { useState, useCallback } from "react";
import useAuth from "../../hooks/auth/useAuth";
import { useSaveReport } from "../../hooks/reports/useSaveReport";
import { useSpeed } from "../../hooks/network/useSpeed";
import { useSpeedSimulation } from "../../hooks/network/useSpeedSimulation";
import { useTestProgress } from "../../hooks/network/useTestProgress";
import Notify from "../../components/Notify";
import SpeedGraph from "./SpeedGraph";
import SpeedMetrics from "./SpeedMetrics";
import ActionButtons from "./ActionButtons";

const NetworkTest: React.FC = () => {
    // Hooks
    const { result, setResult, loading: speedLoading, error: speedError, runTest } = useSpeed();
    const { saveFile, loading: saveLoading, error: saveError } = useSaveReport();
    const { user } = useAuth();
    const { resetHistory } = useSpeedSimulation();
    const { progress, resetProgress, startTest, completeTest, getPhaseText } = useTestProgress(speedLoading);
    
    // State
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(true);

    // Event handlers
    const handleTestClick = useCallback(async () => {
        startTest();
        resetHistory();
        
        // Disable real-time simulation - only run the actual test
        // startSimulation();
        
        // Run actual test
        await runTest();
        completeTest();
    }, [startTest, resetHistory, runTest, completeTest]);

    const handleSaveClick = useCallback(async () => {
        const data = {
            username: user?.username,
            network_data: result,
            date: new Date().toISOString().split("T")[0],
            time: new Date().toTimeString().slice(0, 5),
        };

        try {
            await saveFile(data);
            setIsSuccess(true);
            setNotificationMessage("Report saved successfully!");
            setNotificationVisible(true);
        } catch (error) {
            setIsSuccess(false);
            setNotificationMessage("Failed to save the report. Please try again.");
            setNotificationVisible(true);
        }
    }, [user?.username, result, saveFile]);

    const handleNotificationClose = useCallback(() => {
        setNotificationVisible(false);
        if (isSuccess) {
            setResult({ ping: 0, upload_mbps: 0, download_mbps: 0 });
            resetProgress();
        }
    }, [isSuccess, setResult, resetProgress]);

    // Utility functions
    const isButtonDisabled = useCallback(() => {
        return (
            speedLoading ||
            !result ||
            !result.ping ||
            !result.download_mbps ||
            !result.upload_mbps
        );
    }, [speedLoading, result]);

    return (
        <div className="min-h-screen flex flex-col font-montserrat bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-6 w-full">
                <div className="max-w-6xl mx-auto w-full">
                    <h1 className="text-2xl font-bold text-emerald-700 mb-1">Network Speed Test</h1>
                    <p className="text-gray-600">Test your internet connection performance</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto p-6">
                <div className="max-w-6xl mx-auto">
                    <div className="space-y-8">
                        {/* Speed Graph Section */}
                        <div className="bg-white rounded-2xl shadow-xl shadow-emerald-900/10 border border-emerald-100 overflow-hidden">
                            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
                                <h2 className="text-2xl font-montserrat-bold text-white flex items-center gap-3">
                                    Speed Test
                                </h2>
                            </div>
                            <div className="p-6">
                                <SpeedGraph 
                                    result={result}
                                    isLoading={speedLoading}
                                    progress={progress}
                                    phaseText={getPhaseText()}
                                />
                            </div>
                            <div className="p-6">
                                <SpeedMetrics 
                                    result={result}
                                    loading={speedLoading}
                                    error={speedError}
                                />
                            </div>
                        </div>
                        
                        {/* Action Buttons Section */}

                        <div className="p-6">
                            <ActionButtons 
                                onTestClick={handleTestClick}
                                onSaveClick={handleSaveClick}
                                isTestLoading={speedLoading}
                                isSaveLoading={saveLoading}
                                isButtonDisabled={isButtonDisabled()}
                                result={result}
                            />
                        </div>

                        {/* Error Display */}
                        {saveError && (
                            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700 text-center font-montserrat">
                                {saveError}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Notification */}
            {isNotificationVisible && (
                <Notify
                    title={isSuccess ? "Success" : "Error"}
                    message={notificationMessage}
                    isOpen={isSuccess}
                    onClose={handleNotificationClose}
                    isSuccess={isSuccess}
                />
            )}
        </div>
    );
};

export default NetworkTest;
