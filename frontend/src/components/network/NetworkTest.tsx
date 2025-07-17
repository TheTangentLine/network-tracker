import { useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import { useSaveReport } from "../../hooks/reports/useSaveReport";
import { useSpeed } from "../../hooks/network/useSpeed";
import Notify from "../../components/Notify";  // Import the Notify component

const NetworkTest: React.FC = () => {
    const { result, setResult, loading: speedLoading, error: speedError, runTest } = useSpeed();
    const { saveFile, loading: saveLoading, error: saveError } = useSaveReport();
    const { user } = useAuth();

    const [isNotificationVisible, setNotificationVisible] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(true);  // Track success or failure

    const handleTestClick = async () => {
        await runTest();
    };

    const handleSaveClick = async () => {
        const data = {
            username: user?.username, // Assuming result contains username or user is accessible via another method
            network_data: result,     // Pass the result data directly
            date: new Date().toISOString().split("T")[0], // Format: YYYY-MM-DD
            time: new Date().toTimeString().slice(0, 5),  // Format: HH:mm:ss
        };

        try {
            await saveFile(data);  // Pass the data to save
            setIsSuccess(true);
            setNotificationMessage("Report saved successfully!");
            setNotificationVisible(true);
        } catch (error) {
            setIsSuccess(false);
            setNotificationMessage("Failed to save the report. Please try again.");
            setNotificationVisible(true);
        }
    };

    const handleNotificationClose = () => {
        setNotificationVisible(false);
        if (isSuccess) {
            setResult({ ping: 0, upload_mbps: 0, download_mbps: 0 });
        }
    };

    const isSaveButtonDisabled = () => {
        return (
            speedLoading || // Disable Save if speed test is still running
            !result ||       // Disable Save if there's no result
            !result.ping ||  // Disable Save if result is incomplete
            !result.download_mbps ||
            !result.upload_mbps
        );
    };

    return (
        <>
            <div className="w-full h-screen flex flex-col items-center justify-center font-montserrat text-4xl">
                {/* Speed Test Result */}
                <div className="grid mb-8 w-2xl h-70 rounded-4xl bg-gray-200 p-5 shadow-emerald-700 shadow-2xl">
                    <div className="flex flex-row">
                        <label className="font-bold mr-10">Ping:</label>
                        <p>
                            {speedLoading ? (
                                "Loading..."
                            ) : speedError ? (
                                speedError
                            ) : result && result.ping !== 0 && result.upload_mbps !== 0 && result.download_mbps !== 0 ? (
                                `${result.ping.toFixed(2)} ms`
                            ) : (
                                ""
                            )}
                        </p>
                    </div>
                    <div className="flex flex-row">
                        <label className="font-bold mr-10">Download speed:</label>
                        <p>
                            {speedLoading ? (
                                "Loading..."
                            ) : speedError ? (
                                speedError
                            ) : result && result.ping !== 0 && result.upload_mbps !== 0 && result.download_mbps !== 0 ? (
                                `${result.download_mbps.toFixed(2)} Mbps`
                            ) : (
                                ""
                            )}
                        </p>
                    </div>
                    <div className="flex flex-row">
                        <label className="font-bold mr-10">Upload speed:</label>
                        <p>
                            {speedLoading ? (
                                "Loading..."
                            ) : speedError ? (
                                speedError
                            ) : result && result.ping !== 0 && result.upload_mbps !== 0 && result.download_mbps !== 0 ? (
                                `${result.upload_mbps.toFixed(2)} Mbps`
                            ) : (
                                ""
                            )}
                        </p>
                    </div>
                </div>

                {/* Speed Test Controls */}
                <div className="flex flex-row items-center justify-center mb-8">
                    <button
                        className="w-2xs h-17 bg-emerald-700 text-white font-bold rounded-2xl hover:scale-125 transition-all duration-300 cursor-pointer disabled:bg-emerald-900 disabled:scale-100"
                        disabled={speedLoading}
                        onClick={handleTestClick}
                    >
                        {speedLoading ? "Testing..." : "Test"}
                    </button>
                    <div className="flex flex-col">
                        <button
                            className="w-2xs h-17 bg-amber-700 text-white font-bold rounded-2xl hover:scale-125 transition-all duration-300 cursor-pointer ml-10 disabled:bg-amber-950 disabled:text-gray-300 disabled:hover:scale-100 disabled:cursor-not-allowed"
                            disabled={isSaveButtonDisabled()}
                            onClick={handleSaveClick}
                        >
                            {saveLoading ? "Saving..." : "Save"}
                        </button>
                        {saveError && <p className="text-red-500">{saveError}</p>}
                    </div>
                </div>

                {/* Notification (Visible if saving is successful or failed) */}
                {isNotificationVisible && (
                    <Notify
                        message={notificationMessage}
                        onClose={handleNotificationClose}
                        isSuccess={isSuccess}
                    />
                )}
            </div>
        </>
    );
};

export default NetworkTest;
