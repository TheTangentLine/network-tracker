import { useState, useCallback } from "react";
import useAuth from "../../hooks/auth/useAuth";
import { useSaveReport } from "../../hooks/reports/useSaveReport";
import { useSpeed } from "../../hooks/network/useSpeed";
import { useSpeedSimulation, type SpeedHistory } from "../../hooks/network/useSpeedSimulation";
import { useTestProgress } from "../../hooks/network/useTestProgress";
import Notify from "../../components/Notify";
import SpeedGraph from "./SpeedGraph";
import SpeedMetrics from "./SpeedMetrics";
import ProgressBar from "./ProgressBar";
import ActionButtons from "./ActionButtons";

const NetworkTest: React.FC = () => {
    // Hooks
    const { result, setResult, loading: speedLoading, error: speedError, runTest } = useSpeed();
    const { saveFile, loading: saveLoading, error: saveError } = useSaveReport();
    const { user } = useAuth();
    const { speedHistory, resetHistory, startSimulation } = useSpeedSimulation();
    const { progress, resetProgress, startTest, completeTest, getPhaseText } = useTestProgress(speedLoading);
    
    // State
    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(true);

    // Event handlers
    const handleTestClick = useCallback(async () => {
        startTest();
        resetHistory();
        
        // Start simulation
        startSimulation();
        
        // Run actual test
        await runTest();
        completeTest();
    }, [startTest, resetHistory, startSimulation, runTest, completeTest]);

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
    const isSaveButtonDisabled = useCallback(() => {
        return (
            speedLoading ||
            !result ||
            !result.ping ||
            !result.download_mbps ||
            !result.upload_mbps
        );
    }, [speedLoading, result]);

    return (
        <div className="min-h-screen bg-white flex flex-col font-montserrat">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-6">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-green-700 mb-1">Network Speed Test</h1>
                    <p className="text-gray-600">Test your internet connection performance</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-8">
                <ProgressBar 
                    isLoading={speedLoading}
                    progress={progress}
                    phaseText={getPhaseText()}
                />
                
                <SpeedGraph 
                    speedHistory={speedHistory}
                    isLoading={speedLoading}
                />
                
                <SpeedMetrics 
                    result={result}
                    loading={speedLoading}
                    error={speedError}
                />
                
                <ActionButtons 
                    onTestClick={handleTestClick}
                    onSaveClick={handleSaveClick}
                    isTestLoading={speedLoading}
                    isSaveLoading={saveLoading}
                    isSaveDisabled={isSaveButtonDisabled()}
                    result={result}
                />

                {/* Error Display */}
                {saveError && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                        {saveError}
                    </div>
                )}
            </div>

            {/* Notification */}
            {isNotificationVisible && (
                <Notify
                    title={isSuccess ? "Success" : "Error"}
                    message={notificationMessage}
                    onClose={handleNotificationClose}
                    isSuccess={isSuccess}
                />
            )}
        </div>
    );
};

export default NetworkTest;
