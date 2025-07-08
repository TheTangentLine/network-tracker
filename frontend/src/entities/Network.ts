// src/entities/Network.ts

/**
 * Which testing mode to run:
 * - 'fast': shorter payload, quicker but less accurate
 * - 'slow': larger payload, slower but more accurate
 */
export type SpeedTestMode = 'fast' | 'slow'

/**
 * The result of a speed test.
 */
export interface SpeedTestResult {
    /** Measured throughput in megabits per second. */
    mbps: number
    /** Total bytes transferred during the test. */
    bytes: number
    /** Duration of the test in seconds. */
    durationSec: number
}
