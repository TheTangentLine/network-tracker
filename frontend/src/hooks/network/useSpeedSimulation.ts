import { useState, useCallback } from 'react';

// Types
export interface SpeedHistory {
    download: number[];
    upload: number[];
    ping: number[];
    time: number[];
}

// Constants
const SIMULATION_CONFIG = {
    fps: 60,
    frameInterval: 16, // 1000ms / 60fps
    maxFrames: 300, // 5 seconds
    baseDownloadRange: { min: 100, max: 250 },
    baseUploadRange: { min: 40, max: 120 },
    pingRange: { min: 10, max: 40 }
};

export const useSpeedSimulation = () => {
    const [speedHistory, setSpeedHistory] = useState<SpeedHistory>({
        download: [],
        upload: [],
        ping: [],
        time: []
    });

    const resetHistory = useCallback(() => {
        setSpeedHistory({ download: [], upload: [], ping: [], time: [] });
    }, []);

    const startSimulation = useCallback(() => {
        let frameCount = 0;
        const { maxFrames, frameInterval, baseDownloadRange, baseUploadRange, pingRange } = SIMULATION_CONFIG;
        const baseDownload = Math.random() * (baseDownloadRange.max - baseDownloadRange.min) + baseDownloadRange.min;
        const baseUpload = Math.random() * (baseUploadRange.max - baseUploadRange.min) + baseUploadRange.min;
        
        const interval = setInterval(() => {
            frameCount++;
            const progress = frameCount / maxFrames;
            
            setSpeedHistory(prev => {
                // Create smooth, realistic speed variations
                const timeVariation = Math.sin(progress * Math.PI * 4) * 0.3; // 4 cycles
                const noise = (Math.random() - 0.5) * 0.1; // Small random noise
                
                const newDownload = baseDownload * (1 + timeVariation + noise);
                const newUpload = baseUpload * (1 + timeVariation * 0.8 + noise * 0.5);
                
                return {
                    download: [...prev.download, Math.max(0, newDownload)],
                    upload: [...prev.upload, Math.max(0, newUpload)],
                    ping: [...prev.ping, Math.random() * (pingRange.max - pingRange.min) + pingRange.min],
                    time: [...prev.time, frameCount]
                };
            });
            
            if (frameCount >= maxFrames) {
                clearInterval(interval);
            }
        }, frameInterval);

        return () => clearInterval(interval);
    }, []);

    return {
        speedHistory,
        resetHistory,
        startSimulation
    };
}; 