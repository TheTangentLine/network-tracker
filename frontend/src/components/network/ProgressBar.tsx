interface ProgressBarProps {
    isLoading: boolean;
    progress: number;
    phaseText: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ isLoading, progress, phaseText }) => {
    if (!isLoading) return null;

    return (
        <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-800">{phaseText}</span>
                <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                />
            </div>
        </div>
    );
};

export default ProgressBar; 