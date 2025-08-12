import { useRef, useEffect } from 'react';
import type { SpeedTestResult } from '../../entities/Network';
import { drawResultGraph, GRAPH_CONFIG } from '../../utils/graphGenerator';
import ProgressBar from './ProgressBar';

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
    progress?: number;
    phaseText?: string;
}

const SpeedGraph: React.FC<SpeedGraphProps> = ({ 
    speedHistory, 
    result, 
    isLoading = false, 
    progress = 0, 
    phaseText = "" 
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Only draw the graph when we have final results, not during real-time updates
        if (result && !isLoading) {
            drawResultGraph(canvasRef, result);
        }
    }, [result, isLoading]);

    // Show progress bar while loading
    if (isLoading) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-emerald-800">Speed Test Results</h2>
                        <p className="text-sm text-gray-600">
                            Running speed test...
                        </p>
                    </div>
                </div>
                
                <div className="w-full h-80 relative flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <ProgressBar 
                            isLoading={isLoading}
                            progress={progress}
                            phaseText={phaseText}
                        />
                    </div>
                </div>
            </div>
        );
    }

    // Don't show anything if no results
    if (!result) {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-emerald-800">Speed Test Results</h2>
                        <p className="text-sm text-gray-600">
                            No test results available
                        </p>
                    </div>
                </div>
                
                <div className="w-full h-80 relative flex items-center justify-center">
                    <div className="text-gray-400 text-lg">
                        Run a test to see results
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-emerald-800">Speed Test Results</h2>
                    <p className="text-sm text-gray-600">
                        Final network performance analysis
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