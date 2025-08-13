import { useState } from "react";
import useAuth from "../auth/useAuth";

import { deleteReport, readReport, generatePdfFile } from "../../services/reportsService";

import type { Report, ReportReturned } from "../../entities/Report";
import type { Filter } from "../../entities/Filter"
import type { SpeedTestResult } from "../../entities/Network";


export function useReadReports() {
    const { user } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    const [data, setData] = useState<Report[]>([])

    const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
    const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);


    const readReports = async (filter: Filter | undefined, searchText: string) => {
        setLoading(true);
        setError("");
        try {
            const dataReturned: ReportReturned = (await readReport(user?.username, page, filter, searchText)).data
            const reportData = dataReturned.list_reports
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

    const deleteReports = async (id: string) => {
        setLoading(true);
        setError("");
        try {
            await deleteReport(id)
            const newData = data.filter(report => report._id !== id);
            setData(newData);
        }
        catch (e: any) {
            setError(e.response.data.detail)
        }
        finally {
            setLoading(false)
        }
    }

    const generatePdf = async (input: SpeedTestResult) => {
        setLoading(true);
        setError("");
        try {
            const response = await generatePdfFile(input);
            if (response.status === 200 && response.data) {
                const pdfFile = new Blob([response.data], { type: "application/pdf" });
                setPdfBlob(pdfFile);
                setPreviewModalOpen(true); // Open the modal to preview the PDF
            } else {
                setError("Failed to generate PDF.");
            }
        } catch (e: any) {
            setError(e.response?.data?.detail || "Failed to generate PDF");
        } finally {
            setLoading(false);
        }
    }

    const handleSavePdf = () => {
        if (pdfBlob) {
            const url = window.URL.createObjectURL(pdfBlob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "Network_Speed_Report.pdf";
            link.click();
        }
    }


    return {
        loading, error,
        page, totalPages, setPage,
        data, setData, readReports,
        setPreviewModalOpen, previewModalOpen, pdfBlob,
        deleteReports, 
        generatePdf,
        handleSavePdf,
    }
}