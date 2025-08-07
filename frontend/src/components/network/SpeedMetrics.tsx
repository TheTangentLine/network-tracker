import { useCallback } from 'react';
import type { SpeedTestResult } from '../../entities/Network';

interface SpeedMetricsProps {
    result: SpeedTestResult;
    loading: boolean;
    error: string | null;
}

const SpeedMetrics: React.FC<SpeedMetricsProps> = ({ result, loading, error }) => {
    const getSpeedColor = useCallback((speed: number, type: 'download' | 'upload') => {
        if (type === 'download') {
            if (speed >= 100) return 'text-green-600';
            if (speed >= 50) return 'text-yellow-600';
            return 'text-red-600';
        } else {
            if (speed >= 50) return 'text-green-600';
            if (speed >= 20) return 'text-yellow-600';
            return 'text-red-600';
        }
    }, []);

    const getPingColor = useCallback((ping: number) => {
        if (ping <= 20) return 'text-green-600';
        if (ping <= 50) return 'text-yellow-600';
        return 'text-red-600';
    }, []);

    const renderMetricValue = (value: number, type: 'download' | 'upload' | 'ping') => {
        if (loading) {
            return <div className="animate-pulse text-gray-400">--</div>;
        }
        
        if (error) {
            return <div className="text-red-500 text-lg">{error}</div>;
        }
        
        if (value === 0) {
            return <span className="text-gray-400">--</span>;
        }

        const colorClass = type === 'ping' ? getPingColor(value) : getSpeedColor(value, type as 'download' | 'upload');
        const displayValue = type === 'ping' ? value.toFixed(0) : value.toFixed(2);
        
        return <span className={colorClass}>{displayValue}</span>;
    };

    const renderMetricSubtext = (value: number, type: 'download' | 'upload' | 'ping') => {
        if (value === 0) return null;
        
        if (type === 'ping') {
            return <p className="text-sm text-gray-500">Response time</p>;
        }
        
        return <p className="text-sm text-gray-500">Max. {value.toFixed(2)}</p>;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Download Speed */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Download Speed (Mbps)
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                    {renderMetricValue(result.download_mbps, 'download')}
                </div>
                {renderMetricSubtext(result.download_mbps, 'download')}
            </div>

            {/* Upload Speed */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Upload Speed (Mbps)
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                    {renderMetricValue(result.upload_mbps, 'upload')}
                </div>
                {renderMetricSubtext(result.upload_mbps, 'upload')}
            </div>

            {/* Latency */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Latency (ms)
                </h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                    {renderMetricValue(result.ping, 'ping')}
                </div>
                {renderMetricSubtext(result.ping, 'ping')}
            </div>
        </div>
    );
};

export default SpeedMetrics; 