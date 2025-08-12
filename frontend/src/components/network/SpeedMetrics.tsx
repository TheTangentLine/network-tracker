import type { SpeedTestResult } from '../../entities/Network';
import { getQualityRating } from '../../utils/getQualityColor';

interface SpeedMetricsProps {
    result: SpeedTestResult;
    loading: boolean;
    error: string | null;
}

const SpeedMetrics: React.FC<SpeedMetricsProps> = ({ result, loading, error }) => {
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

        const colorDisplay = getQualityRating(value, type);
        const displayValue = type === 'ping' ? value.toFixed(0) : value.toFixed(2);
        
        return <span className={`${colorDisplay.color}`}>{displayValue}</span>;
    };

    const renderMetricSubtext = (value: number, type: 'download' | 'upload' | 'ping') => {
        if (value === 0) return null;
        
        if (type === 'ping') {
            return <p className="text-sm text-gray-500">Response time</p>;
        }

        const quality = getQualityRating(value, type);

        return <p className={`text-sm font-medium ${quality.color}`}>{quality.text}</p>;
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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