import { useState } from 'react';
import type { SpeedTestResult } from '../../entities/Network';
import { runSpeedTest } from '../../utils/checkSpeed';

export const useSpeed = () => {
    const [result, setResult] = useState<SpeedTestResult>({ ping: 0, upload_mbps: 0, download_mbps: 0 });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const runTest = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const speedResult = await runSpeedTest();
            setResult(speedResult);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Speed test failed');
        } finally {
            setLoading(false);
        }
    };

    return {
        result,
        setResult,
        loading,
        error,
        runTest,
    };
};