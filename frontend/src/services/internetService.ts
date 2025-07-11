import apiClient from './apiClient'

// ---------------- Check Ping ------------------->

export async function ping() {
    const start = performance.now()
    await apiClient.get('/speed/ping')

    return start
}

// ---------------- Check Download Speed ------------------->

export async function downloadSpeed() {
    const start = performance.now()
    const response = await apiClient.post<ArrayBuffer>('/speed/download')
    return { start, response }
}

// --------------- Check Upload Speed ------------->

export async function uploadSpeed(file: Blob) {
    const start = performance.now()
    const formData = new FormData()
    formData.append('file', file)

    await apiClient.post('/speed/upload', formData)
    return { start }
}