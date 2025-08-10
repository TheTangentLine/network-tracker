import { useRef, useEffect } from 'react';
import type { SpeedTestResult } from '../../entities/Network';
import { drawResultGraph, GRAPH_CONFIG } from '../../utils/graphGenerator';

// Types
interface SpeedHistory {
    download: number[];
    upload: number[];
    ping: number[];
    time: number[];
}

interface SpeedGraphProps {
    speedHistory?: SpeedHistory;
    result?: SpeedTestResult;
    isLoading?: boolean;
}

const SpeedGraph: React.FC<SpeedGraphProps> = ({ speedHistory, result, isLoading = false }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (result) {
            drawResultGraph(canvasRef, result);
        } else if (speedHistory && speedHistory.download.length > 0) {
            drawResultGraph(canvasRef, {
                download_mbps: speedHistory.download[speedHistory.download.length - 1] || 0,
                upload_mbps: speedHistory.upload[speedHistory.upload.length - 1] || 0,
                ping: speedHistory.ping[speedHistory.ping.length - 1] || 0
            });
        }
    }, [result, speedHistory]);

    if (!isLoading && !result && (!speedHistory || speedHistory.download.length === 0)) {
        return null;
    }

    return (
        <div className="mb-8 bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-emerald-800">Speed Test Results</h2>
                    <p className="text-sm text-gray-600">
                        {result ? 'Final network performance analysis' : 'Real-time network performance analysis'}
                    </p>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                        <span className="text-gray-700">Download</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                        <span className="text-gray-700">Upload</span>
                    </div>
                </div>
            </div>
            
            <div className="w-full h-80 relative">
                <canvas 
                    ref={canvasRef}
                    width={GRAPH_CONFIG.width}
                    height={GRAPH_CONFIG.height}
                    className="w-full h-full border border-gray-100 rounded-lg"
                />
            </div>
        </div>
    );
};

export default SpeedGraph; 