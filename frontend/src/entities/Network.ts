export interface SpeedTestResult {
    ping: number,
    download_mbps: number,
    upload_mbps: number,
}

export interface SpeedTestReport {
    username: string | undefined,
    network_data: SpeedTestResult | null,
    date: string,
    time: string,
}