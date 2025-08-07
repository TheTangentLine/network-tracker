import { useRef, useEffect, useCallback } from 'react';

// Types
interface SpeedHistory {
    download: number[];
    upload: number[];
    ping: number[];
    time: number[];
}

// Constants
const GRAPH_CONFIG = {
    width: 1200,
    height: 400,
    padding: 40,
};

interface SpeedGraphProps {
    speedHistory: SpeedHistory;
    isLoading?: boolean;
}

const SpeedGraph: React.FC<SpeedGraphProps> = ({ speedHistory, isLoading = false }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Graph rendering functions
    const createSmoothPath = useCallback((
        ctx: CanvasRenderingContext2D,
        data: number[],
        maxValue: number,
        color: string,
        fillColor: string,
        width: number,
        height: number,
        padding: number
    ) => {
        if (data.length < 2) return;

        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Create smooth curve
        ctx.beginPath();
        data.forEach((value, index) => {
            const x = padding + (width - 2 * padding) * (index / (data.length - 1));
            const y = height - padding - (value / maxValue) * (height - 2 * padding);
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                const prevX = padding + (width - 2 * padding) * ((index - 1) / (data.length - 1));
                const prevY = height - padding - (data[index - 1] / maxValue) * (height - 2 * padding);
                const cpx = (prevX + x) / 2;
                ctx.quadraticCurveTo(cpx, prevY, x, y);
            }
        });
        ctx.stroke();

        // Fill area with gradient
        const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
        gradient.addColorStop(0, fillColor);
        gradient.addColorStop(1, fillColor.replace('0.2', '0.05'));

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(padding, height - padding);
        data.forEach((value, index) => {
            const x = padding + (width - 2 * padding) * (index / (data.length - 1));
            const y = height - padding - (value / maxValue) * (height - 2 * padding);
            
            if (index === 0) {
                ctx.lineTo(x, y);
            } else {
                const prevX = padding + (width - 2 * padding) * ((index - 1) / (data.length - 1));
                const prevY = height - padding - (data[index - 1] / maxValue) * (height - 2 * padding);
                const cpx = (prevX + x) / 2;
                ctx.quadraticCurveTo(cpx, prevY, x, y);
            }
        });
        ctx.lineTo(width - padding, height - padding);
        ctx.closePath();
        ctx.fill();
    }, []);

    const drawGraph = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas || speedHistory.download.length === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const { width, height, padding } = GRAPH_CONFIG;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Set background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);

        // Draw subtle background grid
        ctx.strokeStyle = '#f1f5f9';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 10; i++) {
            const y = padding + (height - 2 * padding) * (i / 10);
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
        }

        // Find max speed for scaling
        const maxSpeed = Math.max(...speedHistory.download, ...speedHistory.upload, 100);

        // Draw download line with smooth curves
        if (speedHistory.download.length > 1) {
            createSmoothPath(ctx, speedHistory.download, maxSpeed, '#10b981', 'rgba(16, 185, 129, 0.2)', width, height, padding);
        }

        // Draw upload line with smooth curves
        if (speedHistory.upload.length > 1) {
            createSmoothPath(ctx, speedHistory.upload, maxSpeed, '#f59e0b', 'rgba(245, 158, 11, 0.2)', width, height, padding);
        }
    }, [speedHistory, createSmoothPath]);

    useEffect(() => {
        drawGraph();
    }, [drawGraph]);

    if (!isLoading && speedHistory.download.length === 0) {
        return null;
    }

    return (
        <div className="mb-8 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Speed Test Results</h2>
            <div className="w-full h-80 relative">
                <canvas 
                    ref={canvasRef}
                    width={GRAPH_CONFIG.width}
                    height={GRAPH_CONFIG.height}
                    className="w-full h-full border border-gray-200 rounded-lg"
                />
            </div>
            <p className="text-sm text-gray-500 text-center mt-4">
                Green line: Upload speed | Yellow line: Download speed
            </p>
        </div>
    );
};

export default SpeedGraph; 