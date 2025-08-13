export interface Report {
    _id: string,
    user_id: string,
    network_data: {
        ping: number,
        upload_mbps: number,
        download_mbps: number,
    },
    date: string,
    time: string,
}

export interface ReportReturned {
    total_pages: number,
    list_reports: Report[]
}