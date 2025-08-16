import apiClient from "./apiClient";
import { generateUrlQuery } from "../utils/urlQuery";
import type { SpeedTestReport } from "../entities/Network";
import type { Filter } from "../entities/Filter"
import type { Report } from "../entities/Report";

// ------------------------------ Save report ------------------------------------->

export async function saveReport(data: SpeedTestReport) {
    return apiClient.post('/reports/create', data);
}

// ------------------------------ Read reports ------------------------------------>

export async function readReport(username: string | undefined, page: number, filter: Filter | undefined, searchText: string) {
    const baseString = generateUrlQuery(username, page, filter, searchText);
    return apiClient.get(baseString);
}

// ------------------------------ Delete reports ----------------------------------->

export async function deleteReport(id: string) {
    return apiClient.delete(`/reports/delete/${id}`);
}

// ------------------------------ Generate PDF file -------------------------------->

export async function generatePdfFile(input: Report) {
    return apiClient.post('/reports/genpdf', input);
}