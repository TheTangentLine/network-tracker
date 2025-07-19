import apiClient from "./apiClient";
import { generateUrlQuery } from "../utils/urlQuery";
import type { SpeedTestReport } from "../entities/Network";
import type { Filter } from "../entities/Filter"

export async function saveReport(data: SpeedTestReport) {
    return apiClient.post('/reports/create', data);
}

export async function readReport(username: string | undefined, page: number, filter: Filter | undefined, searchText: string) {
    const baseString = generateUrlQuery(username, page, filter, searchText);
    return apiClient.get(baseString);
}
