import { generateRandomBuffer } from "./generateFile"
import { ping, uploadSpeed, downloadSpeed } from "../services/internetService"

// ------------------ Check Ping ----------------------->

export const checkPing = async () => {
    const pingStart = await ping();
    const pingMs = performance.now() - pingStart

    return pingMs;
}

// ----------------- Check Download Speed ----------------->

export const checkDownload = async (mode: string) => {
    const downloadData = await downloadSpeed(mode)
    const durationSec = (performance.now() - downloadData.start) / 1000

    const bytes = mode === 'slow'
        ? 5 * 1024 * 1024
        : 1 * 1024 * 1024

    const mbps = (bytes * 8) / durationSec / 1024 / 1024
    return mbps
}

// ------------------ Check Upload Speed ------------------->

export const checkUpload = async (mode: string) => {

    const sizeMB = mode === 'slow' ? 10 : 5
    const totalBytes = sizeMB * 1024 * 1024
    const buffer = generateRandomBuffer(totalBytes)
    const blob = new Blob([buffer])

    const uploadData = await uploadSpeed(blob)
    const durationSec = (performance.now() - uploadData.start) / 1000

    const mbps = (totalBytes * 8) / durationSec / 1024 / 1024
    return mbps
}
