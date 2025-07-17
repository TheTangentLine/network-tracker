import { useState } from "react";

import { readReport } from "../../services/reportsService";

import type { Report } from "../../entities/Report";

import useAuth from "../auth/useAuth";

export function useReadReports() {
    const { user } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [data, setData] = useState<Report[]>([])


    const readReports = async () => {
        setLoading(true);
        setError("");
        try {
            const dataReturned = (await readReport(user?.username, page)).data
            const reportData = dataReturned.list_user
            const pageData = dataReturned.total_pages

            setData(reportData)
            setTotalPages(pageData)
        }
        catch (e: any) {
            setError(e.response.data.detail)
            return { "hello": "world" }
        }
        finally {
            setLoading(false)
        }
    }

    return { page, totalPages, data, setPage, loading, error, readReports }
}