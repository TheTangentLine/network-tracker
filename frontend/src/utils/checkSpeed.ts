import { generateRandomBuffer } from "./generateFile"
import { ping, uploadSpeed, downloadSpeed } from "../services/internetService"

// ------------------ Check Ping ----------------------->

export const checkPing = async () => {
    const pingStart = await ping();
    const pingMs = performance.now() - pingStart

    return pingMs;
}

// ----------------- Check Download Speed ----------------->

export const checkDownload = async () => {
    const downloadData = await downloadSpeed()
    const durationSec = (performance.now() - downloadData.start) / 1000

    const bytes = 10 * 1024 * 1024

    const mbps = (bytes * 8) / durationSec / 1024 / 1024
    return mbps
}

// ------------------ Check Upload Speed ------------------->

export const checkUpload = async () => {
    const totalBytes = 10 * 1024 * 1024
    const buffer = generateRandomBuffer(totalBytes)
    const blob = new Blob([buffer])
    
    const startTime = performance.now()
    await uploadSpeed(blob)
    const endTime = performance.now()
    
    const durationSec = (endTime - startTime) / 1000
    const mbps = (totalBytes * 8) / durationSec / 1024 / 1024
    
    return mbps
}

// ------------------ Comprehensive Speed Test ------------------->

export const runSpeedTest = async () => {
    const pingResult = await checkPing();
    const downloadMbps = await checkDownload();
    const uploadMbps = await checkUpload();
    
    return {
        ping: Math.round(pingResult * 100) / 100,
        download_mbps: Math.round(downloadMbps * 100) / 100,
        upload_mbps: Math.round(uploadMbps * 100) / 100,
    };
};
