/* 

    Context: 
        Check internet speed in 2 modes:
            + Fast: Give faster result but it may not be accurate
            + Slow: Give slow result and it would be more accurate

    Flow: 
        Upload: 
            Upload a file (in asset directory) to the server.
            Mark the time start to upload and also the time the server response ok.

        Download:   
            Download a file from the server (in the database)
            Mark the time start to click the button and client receive the whole file.

*/

import axios from 'axios'
import type { SpeedTestMode, SpeedTestResult } from '../entities/Network'

/**
 * Performs a download speed test by fetching a binary payload.
 */
export async function downloadSpeed(
    mode: SpeedTestMode
): Promise<SpeedTestResult> {
    const start = performance.now()

    const response = await axios.get<ArrayBuffer>(`/speed-test/${mode}`)

    const durationSec = (performance.now() - start) / 1000
    const bytes = response.data.byteLength
    const mbps = (bytes * 8) / durationSec / 1024 / 1024

    return { mbps, bytes, durationSec }
}

/**
 * Performs an upload speed test by posting a Blob payload.
 */
export async function uploadSpeed(
    mode: SpeedTestMode,
    file: Blob
): Promise<SpeedTestResult> {
    const start = performance.now()

    const formData = new FormData()
    formData.append('file', file)

    await axios.post<void>(`/upload-test/${mode}`, formData)

    const durationSec = (performance.now() - start) / 1000
    const bytes = file.size
    const mbps = (bytes * 8) / durationSec / 1024 / 1024

    return { mbps, bytes, durationSec }
}
