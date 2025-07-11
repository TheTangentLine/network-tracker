import { useState } from 'react'
import type { SpeedTestResult } from '../entities/Network'

import { checkDownload, checkUpload, checkPing } from '../utils/checkSpeed'

import type { HttpServer } from 'vite'

export function useSpeed() {
    const [result, setResult] = useState<SpeedTestResult | null>(null)
    const [mode, setMode] = useState<string>("")

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>("")

    // Run both tests and store result
    const runTest = async () => {
        setLoading(true);
        setError("");
        try {
            const ping = await checkPing()
            const download_mbps = await checkDownload(mode)
            const upload_mbps = await checkUpload(mode)

            setResult({ ping, download_mbps, upload_mbps })
            console.log(result)

        } catch (e: HttpServer) {
            setError(e.response.detail || "Error")
        } finally {
            setLoading(false)
        }
    }

    return { result, mode, loading, error, setMode, runTest }
}