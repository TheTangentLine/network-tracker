// src/hooks/useSpeed.ts

import { useState, useCallback } from 'react'
import type { SpeedTestMode, SpeedTestResult } from '../entities/Network'
import { downloadSpeed, uploadSpeed } from '../services/internetService'

export interface UseSpeed {
    result: SpeedTestResult | null
    loading: boolean
    error: Error | null
    runDownload: (mode: SpeedTestMode) => Promise<void>
    runUpload: (mode: SpeedTestMode, file: Blob) => Promise<void>
}

export function useSpeed(): UseSpeed {
    const [result, setResult] = useState<SpeedTestResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const runDownload = useCallback(
        async (mode: SpeedTestMode) => {
            setLoading(true)
            setError(null)
            try {
                const res = await downloadSpeed(mode)
                setResult(res)
            } catch (err: any) {
                setError(err)
            } finally {
                setLoading(false)
            }
        },
        []
    )

    const runUpload = useCallback(
        async (mode: SpeedTestMode, file: Blob) => {
            setLoading(true)
            setError(null)
            try {
                const res = await uploadSpeed(mode, file)
                setResult(res)
            } catch (err: any) {
                setError(err)
            } finally {
                setLoading(false)
            }
        },
        []
    )

    return { result, loading, error, runDownload, runUpload }
}
