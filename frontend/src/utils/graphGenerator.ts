import type { SpeedTestResult } from '../entities/Network';

// Constants
export const GRAPH_CONFIG = {
    width: 1200,
    height: 400,
    padding: 40,
};

// Graph rendering functions



export const drawResultGraph = (canvasRef: React.RefObject<HTMLCanvasElement | null>, result: SpeedTestResult) => {
    const canvas = canvasRef.current;
    if (!canvas || !result) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height, padding } = GRAPH_CONFIG;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw subtle background grid
    ctx.strokeStyle = '#f8fafc';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 10; i++) {
        const y = padding + (height - 2 * padding) * (i / 10);
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    // Create data points for the result
    const maxSpeed = Math.max(result.download_mbps, result.upload_mbps, 100);
    const dataPoints = 50; // Create smooth curve with 50 points
    
    // Generate download data with realistic variations
    const downloadData = Array.from({ length: dataPoints }, (_, i) => {
        const progress = i / (dataPoints - 1);
        const baseValue = result.download_mbps;
        const variation = Math.sin(progress * Math.PI * 2) * 0.1; // 10% variation
        const noise = (Math.random() - 0.5) * 0.05; // 5% random noise
        return Math.max(0, baseValue * (1 + variation + noise));
    });

    // Generate upload data with realistic variations
    const uploadData = Array.from({ length: dataPoints }, (_, i) => {
        const progress = i / (dataPoints - 1);
        const baseValue = result.upload_mbps;
        const variation = Math.sin(progress * Math.PI * 2 + Math.PI) * 0.1; // Different phase
        const noise = (Math.random() - 0.5) * 0.05; // 5% random noise
        return Math.max(0, baseValue * (1 + variation + noise));
    });

    // Draw download line with smooth curves (emerald green)
    createSmoothPath(ctx, downloadData, maxSpeed, '#10b981', 'rgba(16, 185, 129, 0.15)', width, height, padding);

    // Draw upload line with smooth curves (emerald-600)
    createSmoothPath(ctx, uploadData, maxSpeed, '#059669', 'rgba(5, 150, 105, 0.15)', width, height, padding);

};

export const createSmoothPath = (
    ctx: CanvasRenderingContext2D,
    data: number[],
    maxValue: number,
    color: string,
    fillColor: string,
    width: number,
    height: number,
    padding: number,
    progress: number = 1
) => {
    if (data.length < 2) return;

    // Calculate how many points to draw based on animation progress
    const pointsToDraw = Math.floor(data.length * progress);
    const visibleData = data.slice(0, pointsToDraw);

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Create smooth curve
    ctx.beginPath();
    visibleData.forEach((value, index) => {
        const x = padding + (width - 2 * padding) * (index / (data.length - 1));
        const y = height - padding - (value / maxValue) * (height - 2 * padding);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            const prevX = padding + (width - 2 * padding) * ((index - 1) / (data.length - 1));
            const prevY = height - padding - (visibleData[index - 1] / maxValue) * (height - 2 * padding);
            const cpx = (prevX + x) / 2;
            ctx.quadraticCurveTo(cpx, prevY, x, y);
        }
    });
    ctx.stroke();

    // Fill area with gradient (only if animation is complete)
    if (progress >= 1) {
        const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
        gradient.addColorStop(0, fillColor);
        gradient.addColorStop(1, fillColor.replace('0.15', '0.03'));

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
    }
};