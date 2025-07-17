export interface Report {
    _id: string;
    user_id: string;
    network_data: {
        ping: number;
        upload_speed: number;
        download_speed: number;
    };
    date: string;
    time: string;
}