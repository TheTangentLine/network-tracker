import { useState } from "react";
import { saveReport } from "../../services/reportsService";
import type { SpeedTestReport } from "../../entities/Network";

// Define the custom hook for saving the report
export function useSaveReport() {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const saveFile = async (data: SpeedTestReport) => {
        setError("");
        setLoading(true);
        try {
            if (!data) {
                throw new Error("No data available to save.");
            }
            await saveReport(data);

        } catch (err: any) {
            console.error("Error during save operation:", err);
            throw new Error("Failed to save the report. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return { error, loading, saveFile };
}
