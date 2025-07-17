import apiClient from "./apiClient";
import type { SpeedTestReport } from "../entities/Network";

export async function saveReport(data: SpeedTestReport) {
    return apiClient.post('/reports/create', data);
}

export async function readReport(username: string | undefined, page: number) {
    return apiClient.get(`/reports/read?username=${username}&page=${page}`)
}