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

    const uploadData = await uploadSpeed(blob)
    const durationSec = (performance.now() - uploadData.start) / 1000

    const mbps = (totalBytes * 8) / durationSec / 1024 / 1024
    return mbps
}
